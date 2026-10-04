import { createClient } from "@/lib/supabase/client";
import { validateMediaFile, type MediaBucket } from "@/lib/cms/mediaLimits";
import { registerMediaRecord } from "@/app/admin/actions/media";
import type { MediaRow } from "@/lib/cms/media";

export type UploadPhase = "uploading" | "saving";

export interface UploadProgressEvent {
  phase: UploadPhase;
  loaded: number;
  total: number;
}

export type UploadResult = { ok: true; media: MediaRow } | { ok: false; error: string };

interface UploadOptions {
  file: File;
  bucket: MediaBucket;
  category: string;
  altEn?: string;
  altAr?: string;
  onProgress?: (event: UploadProgressEvent) => void;
}

/**
 * Uploads a file straight from the browser to Supabase Storage, then records
 * it in the `media` table. Going direct is the only way large videos work on
 * Vercel: a server action's body is capped at 1 MB by Next.js and a function
 * request at ~4.5 MB by the platform, and videos can be up to 500 MB. The
 * request is authenticated with the signed-in admin's own session token, so the
 * storage policies (is_admin()) still decide whether the write is allowed.
 *
 * XMLHttpRequest rather than fetch because it's the only browser API that
 * reports upload progress (`xhr.upload.onprogress`).
 */
export async function uploadMediaFile(opts: UploadOptions): Promise<UploadResult> {
  const problem = validateMediaFile(opts.bucket, opts.file);
  if (problem) return { ok: false, error: problem };

  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return { ok: false, error: "Your session has expired — please sign in again." };

  const ext = (opts.file.name.split(".").pop() ?? "").toLowerCase().replace(/[^a-z0-9]/g, "") || "bin";
  const path = `${opts.category}/${crypto.randomUUID()}.${ext}`;

  const uploaded = await putToStorage({
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/${opts.bucket}/${path}`,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    accessToken: session.access_token,
    body: opts.file,
    contentType: opts.file.type,
    onProgress: (loaded, total) => opts.onProgress?.({ phase: "uploading", loaded, total }),
  });
  if (!uploaded.ok) return { ok: false, error: uploaded.error };

  opts.onProgress?.({ phase: "saving", loaded: opts.file.size, total: opts.file.size });
  const record = await registerMediaRecord({
    bucket: opts.bucket,
    path,
    fileName: opts.file.name,
    mimeType: opts.file.type,
    fileSize: opts.file.size,
    category: opts.category as MediaRow["category"],
    altEn: opts.altEn ?? "",
    altAr: opts.altAr ?? "",
  });

  if (!record.ok || !record.media) {
    // Don't leave an orphaned object behind if the database row couldn't be created.
    await supabase.storage.from(opts.bucket).remove([path]);
    return { ok: false, error: record.error ?? "Could not save the file record." };
  }
  return { ok: true, media: record.media as MediaRow };
}

function putToStorage(o: {
  url: string;
  anonKey: string;
  accessToken: string;
  body: File;
  contentType: string;
  onProgress: (loaded: number, total: number) => void;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", o.url);
    xhr.setRequestHeader("Authorization", `Bearer ${o.accessToken}`);
    xhr.setRequestHeader("apikey", o.anonKey);
    xhr.setRequestHeader("x-upsert", "false");
    xhr.setRequestHeader("cache-control", "max-age=3600");
    xhr.setRequestHeader("Content-Type", o.contentType || "application/octet-stream");

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) o.onProgress(e.loaded, e.total);
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) return resolve({ ok: true });
      let message = `Upload failed (HTTP ${xhr.status}).`;
      try {
        const parsed = JSON.parse(xhr.responseText) as { message?: string };
        if (parsed.message) message = parsed.message;
      } catch {
        /* non-JSON error body — keep the generic message */
      }
      resolve({ ok: false, error: message });
    };
    xhr.onerror = () => resolve({ ok: false, error: "Network error — check your connection and try again." });
    xhr.onabort = () => resolve({ ok: false, error: "Upload was cancelled." });
    xhr.send(o.body);
  });
}
