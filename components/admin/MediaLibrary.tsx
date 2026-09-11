"use client";

import { useMemo, useRef, useState } from "react";
import { resolveMediaUrl, type MediaRow } from "@/lib/cms/media";
import { uploadMedia, updateMediaAltText, deleteMedia } from "@/app/admin/actions/media";
import { cn } from "@/lib/utils";

const CATEGORIES: MediaRow["category"][] = [
  "doctor", "hero", "services", "conditions", "treatments", "surgeries",
  "technologies", "certificates", "career", "expertise", "videos",
  "articles", "reviews", "gallery", "general", "seo",
];

function formatSize(bytes: number | null): string {
  if (!bytes) return "—";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function MediaLibrary({ initialItems }: { initialItems: MediaRow[] }) {
  const [items, setItems] = useState(initialItems);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [type, setType] = useState<"all" | "image" | "video">("all");
  const [selected, setSelected] = useState<MediaRow | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadBucket, setUploadBucket] = useState<"media" | "video-covers" | "videos">("media");
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (type !== "all" && item.kind !== type) return false;
      if (query && !item.file_name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [items, category, type, query]);

  async function handleUpload(file: File) {
    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", uploadBucket);
    formData.append("category", "general");
    const result = await uploadMedia(formData);
    setUploading(false);
    if (!result.ok) {
      setError(result.error ?? "Upload failed.");
      return;
    }
    window.location.reload();
  }

  async function handleDelete(item: MediaRow) {
    if (!confirm(`Delete "${item.file_name}"? Anything still referencing it will show a placeholder.`)) return;
    const result = await deleteMedia(item.id);
    if (!result.ok) {
      alert(result.error ?? "Could not delete — it may still be referenced.");
      return;
    }
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    setSelected(null);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-brand-ink">Media Library</h1>
        <div className="flex items-center gap-2">
          <select value={uploadBucket} onChange={(e) => setUploadBucket(e.target.value as typeof uploadBucket)} className="glass-panel rounded-lg border-transparent px-3 py-2 text-xs font-semibold text-brand-ink">
            <option value="media">Images</option>
            <option value="video-covers">Video Covers</option>
            <option value="videos">Video Files</option>
          </select>
          <input
            ref={fileInputRef}
            type="file"
            accept={uploadBucket === "videos" ? "video/*" : "image/*"}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleUpload(file);
            }}
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="rounded-full bg-gradient-brand px-4 py-2.5 text-sm font-semibold text-white shadow-glass disabled:opacity-60"
          >
            {uploading ? "Uploading…" : "+ Upload File"}
          </button>
        </div>
      </div>
      {error && <p className="mt-2 text-sm font-medium text-brand-pink-deep">{error}</p>}

      <div className="mt-5 flex flex-wrap gap-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search filename…"
          className="glass-panel w-full max-w-xs rounded-xl border-transparent px-4 py-2 text-sm text-brand-ink outline-none focus-visible:outline-2 focus-visible:outline-brand-teal-strong"
        />
        <select value={type} onChange={(e) => setType(e.target.value as typeof type)} className="glass-panel rounded-xl border-transparent px-3 py-2 text-sm text-brand-ink">
          <option value="all">All types</option>
          <option value="image">Images</option>
          <option value="video">Videos</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="glass-panel rounded-xl border-transparent px-3 py-2 text-sm text-brand-ink">
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {filtered.length === 0 && <p className="col-span-full text-sm text-brand-muted">No files match.</p>}
        {filtered.map((item) => {
          const url = resolveMediaUrl(item);
          return (
            <button key={item.id} type="button" onClick={() => setSelected(item)} className="glass-card glass-card-hover overflow-hidden rounded-2xl text-start">
              <span className="relative block aspect-square w-full overflow-hidden bg-brand-teal-tint">
                {url && item.kind === "image" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={url} alt="" className="h-full w-full object-cover" />
                ) : url && item.kind === "video" ? (
                  <video src={url} className="h-full w-full object-cover" muted />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-xs text-brand-muted">No preview</span>
                )}
              </span>
              <span className="block p-2.5">
                <span className="block truncate text-xs font-semibold text-brand-ink">{item.file_name}</span>
                <span className="mt-0.5 block text-[0.65rem] text-brand-muted">{item.category} · {formatSize(item.file_size)}</span>
              </span>
            </button>
          );
        })}
      </div>

      {selected && <MediaDetailModal item={selected} onClose={() => setSelected(null)} onDelete={() => handleDelete(selected)} onSaved={(updated) => setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)))} />}
    </div>
  );
}

function MediaDetailModal({
  item,
  onClose,
  onDelete,
  onSaved,
}: {
  item: MediaRow;
  onClose: () => void;
  onDelete: () => void;
  onSaved: (item: MediaRow) => void;
}) {
  const [altEn, setAltEn] = useState(item.alt_text_en ?? "");
  const [altAr, setAltAr] = useState(item.alt_text_ar ?? "");
  const [saving, setSaving] = useState(false);
  const url = resolveMediaUrl(item);

  async function save() {
    setSaving(true);
    const result = await updateMediaAltText(item.id, altEn, altAr);
    setSaving(false);
    if (result.ok) onSaved({ ...item, alt_text_en: altEn, alt_text_ar: altAr });
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div className="glass-card-strong max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h3 className="truncate text-lg font-bold text-brand-ink">{item.file_name}</h3>
          <button type="button" onClick={onClose} className="text-sm text-brand-muted hover:text-brand-ink">
            Close
          </button>
        </div>

        <div className="glass-panel mt-4 flex aspect-video items-center justify-center overflow-hidden rounded-2xl">
          {url && item.kind === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt="" className="h-full w-full object-contain" />
          ) : url && item.kind === "video" ? (
            <video src={url} controls className="h-full w-full object-contain" />
          ) : (
            <span className="text-sm text-brand-muted">No preview</span>
          )}
        </div>

        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-brand-muted">
          <dt>Type</dt>
          <dd className="text-brand-ink">{item.mime_type}</dd>
          <dt>Size</dt>
          <dd className="text-brand-ink">{formatSize(item.file_size)}</dd>
          <dt>Category</dt>
          <dd className="text-brand-ink">{item.category}</dd>
          <dt>Uploaded</dt>
          <dd className="text-brand-ink">{new Date(item.created_at).toLocaleDateString()}</dd>
        </dl>

        <div className="mt-4 flex flex-col gap-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-brand-ink">Alt text (English)</label>
            <input value={altEn} onChange={(e) => setAltEn(e.target.value)} className="glass-panel w-full rounded-lg border-transparent px-3 py-2 text-sm text-brand-ink outline-none" />
          </div>
          <div dir="rtl">
            <label className="mb-1 block text-xs font-semibold text-brand-ink">النص البديل (عربي)</label>
            <input value={altAr} onChange={(e) => setAltAr(e.target.value)} className="glass-panel w-full rounded-lg border-transparent px-3 py-2 text-sm text-brand-ink outline-none" />
          </div>
        </div>

        <div className="mt-5 flex justify-between gap-3">
          <button type="button" onClick={onDelete} className={cn("rounded-full px-4 py-2 text-xs font-semibold text-brand-pink-deep hover:bg-brand-pink-tint")}>
            Delete File
          </button>
          <button type="button" onClick={save} disabled={saving} className="rounded-full bg-gradient-brand px-5 py-2 text-xs font-semibold text-white shadow-glass disabled:opacity-60">
            {saving ? "Saving…" : "Save Alt Text"}
          </button>
        </div>
      </div>
    </div>
  );
}
