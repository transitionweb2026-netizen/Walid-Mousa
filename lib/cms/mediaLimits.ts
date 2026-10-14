export type MediaBucket = "media" | "video-covers" | "videos";

/**
 * Mirrors the bucket definitions in supabase/migrations/0012_storage.sql. The
 * database enforces the same limits — this copy exists so the browser can
 * reject a bad file before any bytes are sent.
 */
export const BUCKET_LIMITS: Record<MediaBucket, { maxBytes: number; mimeTypes: string[] }> = {
  media: { maxBytes: 10 * 1024 * 1024, mimeTypes: ["image/png", "image/jpeg", "image/webp", "image/svg+xml", "image/gif", "image/avif"] },
  "video-covers": { maxBytes: 5 * 1024 * 1024, mimeTypes: ["image/png", "image/jpeg", "image/webp", "image/avif"] },
  videos: { maxBytes: 500 * 1024 * 1024, mimeTypes: ["video/mp4", "video/webm", "video/quicktime"] },
};

/**
 * Supabase also caps every upload project-wide (Dashboard → Storage →
 * Settings → "Upload file size limit"): 50 MB on the Free plan, higher on paid
 * plans. It applies on top of the bucket limits above, and Storage only
 * reports it after the whole file has been sent — so check it here first.
 * After raising the project limit, set NEXT_PUBLIC_SUPABASE_MAX_UPLOAD_MB to
 * the same number of MB.
 */
export const PROJECT_MAX_UPLOAD_MB = Number(process.env.NEXT_PUBLIC_SUPABASE_MAX_UPLOAD_MB) || 50;

const MB = 1024 * 1024;

/** The largest file this bucket can actually take (bucket and project limits). */
export function maxUploadBytes(bucket: MediaBucket): number {
  return Math.min(BUCKET_LIMITS[bucket].maxBytes, PROJECT_MAX_UPLOAD_MB * MB);
}

/** What to tell the editor when a file is over the project-wide upload limit. */
export function projectLimitMessage(sizeBytes?: number, bucket?: MediaBucket): string {
  const size = sizeBytes ? `This file is ${(sizeBytes / MB).toFixed(1)} MB, but the` : "The";
  const base = `${size} Supabase project accepts uploads of up to ${PROJECT_MAX_UPLOAD_MB} MB.`;
  if (bucket === "videos") {
    return (
      `${base} For a video this size, the easiest fix is to upload it to YouTube instead (even as "Unlisted") ` +
      `and paste its video ID in the "YouTube Video ID" field — no size limit, and it plays the same way on the site. ` +
      `Direct file upload only works for videos under ${PROJECT_MAX_UPLOAD_MB} MB; raising that needs a paid Supabase plan.`
    );
  }
  return `${base} Compress the file below ${PROJECT_MAX_UPLOAD_MB} MB, or raise the upload limit in Supabase → Storage → Settings (above 50 MB needs a paid plan).`;
}

export function validateMediaFile(bucket: MediaBucket, file: { size: number; type: string }): string | null {
  const limits = BUCKET_LIMITS[bucket];
  if (!limits) return "Unknown storage bucket.";
  if (file.size === 0) return "That file is empty.";
  if (!limits.mimeTypes.includes(file.type)) {
    return `${file.type || "This file type"} isn't allowed in this bucket. Allowed: ${limits.mimeTypes.join(", ")}.`;
  }
  if (file.size > limits.maxBytes) {
    return `File is ${(file.size / MB).toFixed(1)} MB — the maximum for this bucket is ${(limits.maxBytes / MB).toFixed(0)} MB.`;
  }
  if (file.size > maxUploadBytes(bucket)) return projectLimitMessage(file.size, bucket);
  return null;
}
