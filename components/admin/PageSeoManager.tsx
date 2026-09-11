"use client";

import { useState } from "react";
import { updatePageSeo } from "@/app/admin/actions/pageSeo";
import { MediaPicker } from "@/components/admin/MediaPicker";
import type { MediaRow } from "@/lib/cms/media";
import { cn } from "@/lib/utils";
import type { Tables } from "@/lib/supabase/types";

type PageRow = Tables<"pages">;
type PageSeoRow = Omit<Tables<"page_seo">, "og_image_id"> & { og_image_id: MediaRow | null };

const FIELDS: { key: string; label: string; multiline?: boolean }[] = [
  { key: "seo_title", label: "SEO Title" },
  { key: "meta_description", label: "Meta Description", multiline: true },
  { key: "og_title", label: "OG Title" },
  { key: "og_description", label: "OG Description", multiline: true },
];

/** Per-page SEO — one tab per page (Home/About/Services/Videos/Articles/Contact), EN/AR + canonical + OG image + index/follow. */
export function PageSeoManager({ entries }: { entries: { page: PageRow; seo: PageSeoRow | null }[] }) {
  const [activeId, setActiveId] = useState(entries[0]?.page.id);
  const active = entries.find((e) => e.page.id === activeId);
  const [values, setValues] = useState<Record<string, Record<string, unknown>>>(
    Object.fromEntries(entries.map((e) => [e.page.id, { ...e.seo }]))
  );
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  if (!active) return null;
  const current = values[active.page.id] ?? {};

  function setField(key: string, v: unknown) {
    setValues((prev) => ({ ...prev, [active!.page.id]: { ...prev[active!.page.id], [key]: v } }));
    setSaveState("idle");
  }

  async function handleSave() {
    setSaveState("saving");
    const payload = { ...current };
    if (payload.og_image_id && typeof payload.og_image_id === "object") {
      payload.og_image_id = (payload.og_image_id as MediaRow).id;
    }
    const result = await updatePageSeo(active!.page.id, payload);
    setSaveState(result.ok ? "saved" : "error");
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {entries.map(({ page }) => (
          <button
            key={page.id}
            type="button"
            onClick={() => setActiveId(page.id)}
            className={cn("rounded-full px-4 py-2 text-xs font-bold", activeId === page.id ? "bg-gradient-brand text-white" : "glass-panel text-brand-muted")}
          >
            {page.name_en}
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
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
          const value = (current[key] as string) ?? "";
          return (
            <div key={key}>
              <label className="mb-1.5 block text-sm font-semibold text-brand-ink">
                {f.label}
                {!f.multiline && <span className="ms-2 text-xs font-normal text-brand-muted">{value.length}/60</span>}
                {f.multiline && <span className="ms-2 text-xs font-normal text-brand-muted">{value.length}/160</span>}
              </label>
              <textarea
                rows={f.multiline ? 3 : 1}
                value={value}
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

        <div className="mt-2 border-t border-brand-line/70 pt-4">
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-brand-muted">Google preview</p>
          <div className="rounded-xl border border-brand-line/60 bg-white p-3">
            <p className="truncate text-[#1a0dab] text-base">{(current[`seo_title_${lang}`] as string) || active.page.name_en}</p>
            <p className="text-xs text-[#006621]">drwalidmoussa.com{active.page.slug ? `/${active.page.slug}` : ""}</p>
            <p className="mt-0.5 line-clamp-2 text-sm text-[#4d5156]">{(current[`meta_description_${lang}`] as string) || ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
