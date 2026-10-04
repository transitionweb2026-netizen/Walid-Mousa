"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { BUCKET_LIMITS, type MediaBucket } from "@/lib/cms/mediaLimits";
import type { Database } from "@/lib/supabase/types";

type MediaCategory = Database["public"]["Tables"]["media"]["Row"]["category"];
type MediaRowDb = Database["public"]["Tables"]["media"]["Row"];

export interface ActionResult {
  ok: boolean;
  error?: string;
  id?: string;
  media?: MediaRowDb;
}

export interface MediaRecordInput {
  bucket: MediaBucket;
  /** Storage object path, e.g. "videos/3f2c…-uuid.mp4" — set by the browser after its direct upload. */
  path: string;
  fileName: string;
  mimeType: string;
  fileSize: number;
  category: MediaCategory;
  altEn: string;
  altAr: string;
}

const PATH_PATTERN = /^[a-z-]+\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.[a-z0-9]+$/;

/**
 * Creates the `media` row for a file the browser has ALREADY uploaded straight
 * to Supabase Storage. The file bytes never pass through this action, so the
 * request is a few hundred bytes regardless of how large the video is — which
 * is what lets 500 MB videos work on Vercel at all (see MediaPicker/uploadMediaFile).
 * Re-checks every limit server-side and confirms the object really exists before
 * recording it, so a crafted request can't register a row for a file that isn't there.
 */
export async function registerMediaRecord(input: MediaRecordInput): Promise<ActionResult> {
  const limits = BUCKET_LIMITS[input.bucket];
  if (!limits) return { ok: false, error: "Unknown storage bucket." };
  if (!limits.mimeTypes.includes(input.mimeType)) {
    return { ok: false, error: "That file type isn't allowed in this bucket." };
  }
  if (input.fileSize <= 0 || input.fileSize > limits.maxBytes) {
    return { ok: false, error: "File size is outside this bucket's limit." };
  }
  if (!PATH_PATTERN.test(input.path) || !input.path.startsWith(`${input.category}/`)) {
    return { ok: false, error: "Invalid storage path." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Your session has expired — please sign in again." };

  const { data: exists } = await supabase.storage.from(input.bucket).exists(input.path);
  if (!exists) return { ok: false, error: "The uploaded file wasn't found in storage." };

  const { data, error } = await supabase
    .from("media")
    .insert({
      bucket_id: input.bucket,
      storage_path: input.path,
      file_name: input.fileName,
      mime_type: input.mimeType,
      file_size: input.fileSize,
      kind: input.mimeType.startsWith("video/") ? "video" : "image",
      category: input.category,
      alt_text_en: input.altEn || null,
      alt_text_ar: input.altAr || null,
      uploaded_by: user.id,
    } as never)
    .select("*")
    .single();

  if (error || !data) {
    return { ok: false, error: error?.message ?? "Could not save the file record." };
  }

  revalidatePath("/admin/media");
  const row = data as MediaRowDb;
  return { ok: true, id: row.id, media: row };
}

export async function updateMediaAltText(id: string, altEn: string, altAr: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { error } = await supabase.from("media").update({ alt_text_en: altEn, alt_text_ar: altAr } as never).eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/media");
  return { ok: true };
}

export async function deleteMedia(id: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: row } = await supabase.from("media").select("bucket_id, storage_path").eq("id", id).maybeSingle();

  const { error } = await supabase.from("media").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };

  if (row?.bucket_id && row.storage_path) {
    await supabase.storage.from(row.bucket_id).remove([row.storage_path]);
  }

  revalidatePath("/admin/media");
  return { ok: true };
}
