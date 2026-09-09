type ClassValue = string | number | null | undefined | false | ClassValue[];

/** Minimal, dependency-free className combiner (clsx-like). */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) out.push(nested);
    } else {
      out.push(String(input));
    }
  }
  return out.join(" ");
}

/** Formats an ISO date string in the given locale, long month. */
export function formatDate(iso: string, localeTag: string): string {
  return new Date(iso).toLocaleDateString(localeTag, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
