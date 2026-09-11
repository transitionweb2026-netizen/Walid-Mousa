import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";
import { getPublicClient } from "@/lib/cms/publicClient";

const FALLBACK_PATHS = ["", "about", "services", "videos", "articles", "contact"];

// A page hidden from search (page_seo.is_indexed = false) or a status-code
// change in `redirects` must appear without a rebuild — same reasoning as
// `[locale]/layout.tsx`'s `force-dynamic`.
export const dynamic = "force-dynamic";

/**
 * Dynamic sitemap — reads `pages` + `page_seo` from Supabase so a page an
 * admin sets to noindex (or renames) drops out automatically; falls back to
 * the fixed 6-route list when Supabase is unconfigured/unreachable. Articles
 * have no dedicated route (they're shown in a modal on /articles) so they
 * aren't listed as separate URLs — listing fragment URLs that 404 would be
 * worse for SEO than omitting them.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries = await getEntries();
  return locales.flatMap((locale) =>
    entries.map(({ path, lastModified }) => ({
      url: `${SITE_URL}/${locale}${path ? `/${path}` : ""}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path ? `/${path}` : ""}`])),
      },
    }))
  );
}

async function getEntries(): Promise<{ path: string; lastModified: Date }[]> {
  const fallback = FALLBACK_PATHS.map((path) => ({ path, lastModified: new Date() }));
  const supabase = await getPublicClient();
  if (!supabase) return fallback;
  try {
    const { data: pages } = await supabase.from("pages").select("id, slug, updated_at");
    if (!pages || pages.length === 0) return fallback;
    const { data: seoRows } = await supabase.from("page_seo").select("page_id, is_indexed");
    const indexed = new Map((seoRows ?? []).map((r) => [r.page_id, r.is_indexed]));
    return pages
      .filter((p) => indexed.get(p.id) !== false)
      .map((p) => ({ path: p.slug, lastModified: new Date(p.updated_at) }));
  } catch (e) {
    console.error("[cms] sitemap failed:", e);
    return fallback;
  }
}
