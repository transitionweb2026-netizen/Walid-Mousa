import type { Localized } from "@/lib/types";

/**
 * Defensive readers for `page_sections.content` (a `jsonb` column typed only
 * as `Json`). An admin only writes these through SectionEditor's typed fields
 * (lib/cms/sectionSchemas.ts), so the shape is trusted in practice — these
 * helpers just keep a page rendering its fallback instead of crashing if a
 * row is missing a key or malformed.
 */
export type JsonRecord = Record<string, unknown>;

export function asRecord(value: unknown): JsonRecord | undefined {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as JsonRecord)
    : undefined;
}

export function str(obj: JsonRecord | undefined, key: string, fallback: string): string {
  const v = obj?.[key];
  return typeof v === "string" && v.length > 0 ? v : fallback;
}

export function optionalStr(obj: JsonRecord | undefined, key: string): string | undefined {
  const v = obj?.[key];
  return typeof v === "string" && v.length > 0 ? v : undefined;
}

export function localized(obj: JsonRecord | undefined, key: string, fallback: Localized): Localized {
  const v = asRecord(obj?.[key]);
  if (v && typeof v.en === "string" && typeof v.ar === "string") return { en: v.en, ar: v.ar };
  return fallback;
}

export function localizedArray(
  obj: JsonRecord | undefined,
  key: string,
  fallback: Localized<string[]>
): Localized<string[]> {
  const v = asRecord(obj?.[key]);
  if (v && Array.isArray(v.en) && Array.isArray(v.ar)) {
    return {
      en: v.en.filter((x): x is string => typeof x === "string"),
      ar: v.ar.filter((x): x is string => typeof x === "string"),
    };
  }
  return fallback;
}

export function nestedCta(
  obj: JsonRecord | undefined,
  key: string,
  fallback: { label: Localized; url: string }
): { label: Localized; url: string } {
  const v = asRecord(obj?.[key]);
  return { label: localized(v, "label", fallback.label), url: str(v, "url", fallback.url) };
}

/** [{ value:{en,ar}, label:{en,ar} }] — DoctorIntro highlight chips. */
export function localizedPairArray(
  obj: JsonRecord | undefined,
  key: string,
  fallback: { value: Localized; label: Localized }[]
): { value: Localized; label: Localized }[] {
  const v = obj?.[key];
  if (!Array.isArray(v)) return fallback;
  const out = v
    .map((item) => asRecord(item))
    .filter((r): r is JsonRecord => Boolean(r))
    .map((r) => ({ value: localized(r, "value", { en: "", ar: "" }), label: localized(r, "label", { en: "", ar: "" }) }))
    .filter((p) => p.value.en || p.label.en);
  return out.length > 0 ? out : fallback;
}
