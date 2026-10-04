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

export function validateMediaFile(bucket: MediaBucket, file: { size: number; type: string }): string | null {
  const limits = BUCKET_LIMITS[bucket];
  if (!limits) return "Unknown storage bucket.";
  if (file.size === 0) return "That file is empty.";
  if (!limits.mimeTypes.includes(file.type)) {
    return `${file.type || "This file type"} isn't allowed in this bucket. Allowed: ${limits.mimeTypes.join(", ")}.`;
  }
  if (file.size > limits.maxBytes) {
    return `File is ${(file.size / 1024 / 1024).toFixed(1)} MB — the maximum for this bucket is ${(limits.maxBytes / 1024 / 1024).toFixed(0)} MB.`;
  }
  return null;
}
