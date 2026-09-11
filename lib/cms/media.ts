import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database, Tables } from "@/lib/supabase/types";
import type { Localized, MediaImage } from "@/lib/types";

export type MediaRow = Tables<"media">;

/** Last-resort placeholder when a media reference is unexpectedly null. */
const FALLBACK_IMAGE_SRC =
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=1600";

/**
 * Resolves any media row to a usable URL — a Supabase Storage public URL for
 * uploaded files, or the row's external_url as-is for seed/placeholder assets.
 * Every image/video reference on the frontend and in the CMS goes through here.
 */
export function resolveMediaUrl(
  media: Pick<MediaRow, "bucket_id" | "storage_path" | "external_url"> | null | undefined
): string | null {
  if (!media) return null;
  if (media.external_url) return media.external_url;
  if (media.bucket_id && media.storage_path) {
    const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (!base) return null;
    return `${base}/storage/v1/object/public/${media.bucket_id}/${media.storage_path}`;
  }
  return null;
}

/**
 * Converts a media row (plus an optional alt-text override carried separately
 * in e.g. a page_sections.content field, and an optional focal point) into the
 * frontend's `MediaImage` shape. Falls back to a generic placeholder + the
 * given alt text if the row is missing.
 */
export function toMediaImage(
  media: MediaRow | null | undefined,
  altFallback: Localized,
  options?: { alt?: Localized; position?: string }
): MediaImage {
  const alt =
    options?.alt ??
    (media
      ? { en: media.alt_text_en ?? altFallback.en, ar: media.alt_text_ar ?? altFallback.ar }
      : altFallback);
  return {
    src: resolveMediaUrl(media) ?? FALLBACK_IMAGE_SRC,
    alt,
    position: options?.position,
  };
}

/** Builds a Map<id, MediaRow> for a set of FK ids in one query. */
export async function loadMediaMap(
  supabase: SupabaseClient<Database>,
  ids: (string | null | undefined)[]
): Promise<Map<string, MediaRow>> {
  const unique = [...new Set(ids.filter((id): id is string => Boolean(id)))];
  if (unique.length === 0) return new Map();
  const { data } = await supabase.from("media").select("*").in("id", unique);
  return new Map((data ?? []).map((m) => [m.id, m] as const));
}
