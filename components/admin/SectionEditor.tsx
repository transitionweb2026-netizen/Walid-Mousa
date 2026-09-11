"use client";

import { useEffect, useRef, useState } from "react";
import { updatePageSection } from "@/app/admin/actions/pageSections";
import { MediaPicker } from "@/components/admin/MediaPicker";
import { SECTION_LABELS, SECTION_NOTES, SECTION_SCHEMAS, type SectionFieldDef } from "@/lib/cms/sectionSchemas";
import { getPath, setPath } from "@/lib/cms/jsonPath";
import type { MediaRow } from "@/lib/cms/media";
import { cn } from "@/lib/utils";

interface SectionEditorProps {
  id: string;
  sectionType: string;
  displayOrder: number;
  initialContent: Record<string, unknown>;
  initialVisible: boolean;
  /** Media rows for every *_media_id already referenced in initialContent, so pickers preview correctly on load. */
  initialMedia?: Record<string, MediaRow>;
}

/**
 * One collapsible section on a Pages screen. Fields come from
 * lib/cms/sectionSchemas.ts — dot-path get/set into the section's `content`
 * jsonb (lib/cms/jsonPath.ts) so a nested shape like `primaryCta.url` is just
 * another field. Media fields hold the full MediaRow locally (for the
 * picker's preview) and are flattened to a bare id right before saving.
 */
export function SectionEditor({ id, sectionType, displayOrder, initialContent, initialVisible, initialMedia = {} }: SectionEditorProps) {
  const fields = SECTION_SCHEMAS[sectionType] ?? [];
  const label = SECTION_LABELS[sectionType] ?? sectionType;
  const note = SECTION_NOTES[sectionType];

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<Record<string, unknown>>(initialContent);
  const [visible, setVisible] = useState(initialVisible);
  const [lang, setLang] = useState<"en" | "ar">("en");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [mediaCache, setMediaCache] = useState<Record<string, MediaRow | null>>(initialMedia);
  const dirtyRef = useRef(false);

  useEffect(() => {
    function warn(e: BeforeUnloadEvent) {
      if (!dirtyRef.current) return;
      e.preventDefault();
    }
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);

  function fieldPath(f: SectionFieldDef): string {
    return f.bilingual ? `${f.path}.${lang}` : f.path;
  }

  function setField(f: SectionFieldDef, value: unknown) {
    dirtyRef.current = true;
    setSaveState("idle");
    setContent((prev) => setPath(prev, fieldPath(f), value));
  }

  async function handleSave() {
    setSaveState("saving");
    // Media fields store the id at their path; mediaCache only feeds previews.
    const result = await updatePageSection(id, content, visible);
    setSaveState(result.ok ? "saved" : "error");
    if (result.ok) dirtyRef.current = false;
  }

  const generalFields = fields.filter((f) => !f.bilingual);
  const bilingualFields = fields.filter((f) => f.bilingual);

  return (
    <div className="glass-card overflow-hidden rounded-2xl">
      <button type="button" onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between gap-3 p-4 text-start sm:p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-teal-tint text-xs font-bold text-brand-teal-deep">{displayOrder}</span>
          <span className="font-semibold text-brand-ink">{label}</span>
          {!visible && <span className="rounded-full bg-brand-pink-tint px-2 py-0.5 text-[0.65rem] font-bold uppercase text-brand-pink-deep">Hidden</span>}
        </div>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={cn("h-4 w-4 shrink-0 text-brand-muted transition-transform", open && "rotate-180")}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="border-t border-brand-line/60 p-4 sm:p-5">
          {note && <p className="mb-4 rounded-xl bg-brand-teal-tint/50 p-3 text-xs leading-relaxed text-brand-ink-soft">{note}</p>}

          <label className="mb-4 flex items-center gap-2 text-sm text-brand-ink">
            <input
              type="checkbox"
              checked={visible}
              onChange={(e) => {
                dirtyRef.current = true;
                setVisible(e.target.checked);
                setSaveState("idle");
              }}
            />
            Visible on the live page
          </label>

          {generalFields.length > 0 && (
            <div className="flex flex-col gap-4">
              {generalFields.map((f) => (
                <SectionFieldInput
                  key={f.path}
                  field={f}
                  value={getPath(content, f.path)}
                  media={mediaCache}
                  setMedia={(k, m) => setMediaCache((prev) => ({ ...prev, [k]: m }))}
                  onChange={(v) => setField(f, v)}
                />
              ))}
            </div>
          )}

          {bilingualFields.length > 0 && (
            <>
              <div className="mt-5 inline-flex rounded-full bg-white/60 p-1">
                <button type="button" onClick={() => setLang("en")} className={cn("rounded-full px-4 py-1.5 text-xs font-bold", lang === "en" ? "bg-gradient-brand text-white" : "text-brand-muted")}>
                  English
                </button>
                <button type="button" onClick={() => setLang("ar")} className={cn("rounded-full px-4 py-1.5 text-xs font-bold", lang === "ar" ? "bg-gradient-brand text-white" : "text-brand-muted")}>
                  العربية
                </button>
              </div>
              <div className="mt-4 flex flex-col gap-4" dir={lang === "ar" ? "rtl" : "ltr"}>
                {bilingualFields.map((f) => (
                  <SectionFieldInput
                    key={fieldPath(f)}
                    field={f}
                    value={getPath(content, fieldPath(f))}
                    media={mediaCache}
                    setMedia={(k, m) => setMediaCache((prev) => ({ ...prev, [k]: m }))}
                    onChange={(v) => setField(f, v)}
                  />
                ))}
              </div>
            </>
          )}

          <div className="mt-6 flex items-center justify-end gap-3">
            {saveState === "saved" && <span className="text-xs font-semibold text-brand-teal-deep">Saved ✓</span>}
            {saveState === "error" && <span className="text-xs font-semibold text-brand-pink-deep">Could not save</span>}
            <button
              type="button"
              onClick={handleSave}
              disabled={saveState === "saving"}
              className="rounded-full bg-gradient-brand px-6 py-2.5 text-sm font-semibold text-white shadow-glass disabled:opacity-60"
            >
              {saveState === "saving" ? "Saving…" : "Save Section"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionFieldInput({
  field,
  value,
  media,
  setMedia,
  onChange,
}: {
  field: SectionFieldDef;
  value: unknown;
  media: Record<string, MediaRow | null>;
  setMedia: (key: string, m: MediaRow | null) => void;
  onChange: (v: unknown) => void;
}) {
  const baseClasses =
    "glass-panel w-full rounded-xl border-transparent px-4 py-2.5 text-sm text-brand-ink outline-none focus-visible:outline-2 focus-visible:outline-brand-teal-strong";

  if (field.type === "media") {
    const id = typeof value === "string" ? value : undefined;
    return (
      <MediaPicker
        label={field.label}
        bucket="media"
        category={(field.mediaCategory as MediaRow["category"]) ?? "general"}
        value={id ? (media[id] ?? null) : null}
        onChange={(m) => {
          if (m) setMedia(m.id, m);
          onChange(m?.id ?? null);
        }}
      />
    );
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-brand-ink">{field.label}</label>
      {field.type === "textarea" ? (
        <textarea rows={3} value={(value as string) ?? ""} onChange={(e) => onChange(e.target.value)} className={cn(baseClasses, "resize-y")} />
      ) : field.type === "stringArray" ? (
        <textarea
          rows={4}
          value={Array.isArray(value) ? (value as string[]).join("\n") : ""}
          onChange={(e) => onChange(e.target.value.split("\n").filter((l) => l.trim().length > 0))}
          placeholder="One item per line"
          className={cn(baseClasses, "resize-y")}
        />
      ) : (
        <input
          type={field.type === "url" ? "url" : "text"}
          dir={field.type === "url" ? "ltr" : undefined}
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className={baseClasses}
        />
      )}
      {field.help && <p className="mt-1 text-xs text-brand-muted">{field.help}</p>}
    </div>
  );
}
