import { locales, type Locale } from "@/lib/i18n";

/** Absolute site origin — shared by sitemap.ts, robots.ts, layout metadata and JSON-LD. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.drwalidmoussa.com";

/**
 * Builds the canonical + hreflang `alternates` block for one page, given its
 * path relative to the locale root (e.g. "" for home, "about" for /about).
 */
export function buildAlternates(locale: Locale, path: string) {
  const suffix = path ? `/${path}` : "";
  const languages = Object.fromEntries(locales.map((loc) => [loc, `/${loc}${suffix}`]));

  return {
    canonical: `/${locale}${suffix}`,
    languages: { ...languages, "x-default": `/en${suffix}` },
  };
}
