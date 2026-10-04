"use client";

import type { UploadPhase } from "@/lib/cms/mediaUpload";

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export interface UploadState {
  fileName: string;
  phase: UploadPhase;
  loaded: number;
  total: number;
}

/** Real byte-level progress for a file upload, plus the short "saving" step after the bytes arrive. */
export function UploadProgress({ fileName, phase, loaded, total }: UploadState) {
  const percent = phase === "saving" ? 100 : total > 0 ? Math.min(100, Math.round((loaded / total) * 100)) : 0;
  const status = phase === "saving" ? "Saving to library…" : `Uploading ${percent}%`;

  return (
    <div className="glass-panel rounded-xl p-3">
      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="min-w-0 truncate font-semibold text-brand-ink">{fileName}</span>
        <span className="shrink-0 tabular-nums font-semibold text-brand-teal-deep">{status}</span>
      </div>
      <div
        role="progressbar"
        aria-label={`Uploading ${fileName}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-brand-line/60"
      >
        <div
          className="h-full rounded-full bg-gradient-brand transition-[width] duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-1.5 text-[0.7rem] tabular-nums text-brand-muted">
        {phase === "saving" ? "Upload complete" : `${formatBytes(loaded)} of ${formatBytes(total)}`}
      </p>
    </div>
  );
}
