"use client";

import { useState } from "react";
import { upsertItemSeo, type ItemSeoTable } from "@/app/admin/actions/pageSeo";
import { MediaPicker } from "@/components/admin/MediaPicker";
import type { MediaRow } from "@/lib/cms/media";
import { cn } from "@/lib/utils";

export interface SeoableItem {
  id: string;
  titleEn: string;
  seo: Record<string, unknown> | null;
}

const FIELDS: { key: string; label: string; multiline?: boolean }[] = [
  { key: "seo_title", label: "SEO Title" },
  { key: "meta_description", label: "Meta Description", multiline: true },
];

/** Per-item SEO (Conditions / Treatments / Surgeries / Articles) — pick an item, edit its *_seo row. */
export function ItemSeoManager({ table, items }: { table: ItemSeoTable; items: SeoableItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const active = items.find((i) => i.id === activeId);
  const [values, setValues] = useState<Record<string, Record<string, unknown>>>(
    Object.fromEntries(items.map((i) => [i.id, { ...i.seo }]))
  );
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [query, setQuery] = useState("");

  if (!active) return <p className="text-sm text-brand-muted">Nothing here yet — add items under Content first.</p>;
  const current = values[active.id] ?? {};
  const filtered = items.filter((i) => i.titleEn.toLowerCase().includes(query.toLowerCase()));

  function setField(key: string, v: unknown) {
    setValues((prev) => ({ ...prev, [active!.id]: { ...prev[active!.id], [key]: v } }));
    setSaveState("idle");
  }

  async function handleSave() {
    setSaveState("saving");
    const payload = { ...current };
    if (payload.og_image_id && typeof payload.og_image_id === "object") {
      payload.og_image_id = (payload.og_image_id as MediaRow).id;
    }
    delete payload.id;
    const result = await upsertItemSeo(table, active!.id, payload);
    setSaveState(result.ok ? "saved" : "error");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
      <div>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search…"
          className="glass-panel w-full rounded-xl border-transparent px-3 py-2 text-sm text-brand-ink outline-none focus-visible:outline-2 focus-visible:outline-brand-teal-strong"
        />
        <div className="mt-3 flex max-h-[60vh] flex-col gap-1 overflow-y-auto">
          {filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveId(item.id)}
              className={cn(
                "truncate rounded-lg px-3 py-2 text-start text-sm font-medium",
                activeId === item.id ? "bg-gradient-brand text-white" : "text-brand-ink-soft hover:bg-white/60"
              )}
            >
              {item.titleEn}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <div className="inline-flex rounded-full bg-white/60 p-1">
            <button type="button" onClick={() => setLang("en")} className={cn("rounded-full px-4 py-1.5 text-xs font-bold", lang === "en" ? "bg-gradient-brand text-white" : "text-brand-muted")}>
              English
            </button>
            <button type="button" onClick={() => setLang("ar")} className={cn("rounded-full px-4 py-1.5 text-xs font-bold", lang === "ar" ? "bg-gradient-brand text-white" : "text-brand-muted")}>
              العربية
            </button>
          </div>
          <div className="flex items-center gap-3">
            {saveState === "saved" && <span className="text-xs font-semibold text-brand-teal-deep">Saved ✓</span>}
            {saveState === "error" && <span className="text-xs font-semibold text-brand-pink-deep">Could not save</span>}
            <button type="button" onClick={handleSave} disabled={saveState === "saving"} className="rounded-full bg-gradient-brand px-6 py-2.5 text-sm font-semibold text-white shadow-glass disabled:opacity-60">
              {saveState === "saving" ? "Saving…" : "Save"}
            </button>
          </div>
        </div>

        <div className="glass-panel mt-3 flex flex-col gap-4 rounded-2xl p-5" dir={lang === "ar" ? "rtl" : "ltr"}>
          {FIELDS.map((f) => {
            const key = `${f.key}_${lang}`;
            return (
              <div key={key}>
                <label className="mb-1.5 block text-sm font-semibold text-brand-ink">{f.label}</label>
                <textarea
                  rows={f.multiline ? 3 : 1}
                  value={(current[key] as string) ?? ""}
                  onChange={(e) => setField(key, e.target.value)}
                  className="glass-panel w-full resize-y rounded-xl border-transparent px-4 py-2.5 text-sm text-brand-ink outline-none focus-visible:outline-2 focus-visible:outline-brand-teal-strong"
                />
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-brand-ink">Canonical URL</label>
            <input
              type="text"
              dir="ltr"
              value={(current.canonical_url as string) ?? ""}
              onChange={(e) => setField("canonical_url", e.target.value)}
              className="glass-panel w-full rounded-xl border-transparent px-4 py-2.5 text-sm text-brand-ink outline-none focus-visible:outline-2 focus-visible:outline-brand-teal-strong"
            />
          </div>
          <MediaPicker label="OG Image" bucket="media" category="seo" value={(current.og_image_id as MediaRow) ?? null} onChange={(media) => setField("og_image_id", media)} />
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm text-brand-ink">
              <input type="checkbox" checked={current.is_indexed !== false} onChange={(e) => setField("is_indexed", e.target.checked)} />
              Index
            </label>
            <label className="flex items-center gap-2 text-sm text-brand-ink">
              <input type="checkbox" checked={current.is_followed !== false} onChange={(e) => setField("is_followed", e.target.checked)} />
              Follow
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
