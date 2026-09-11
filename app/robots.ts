import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getSiteBranding } from "@/lib/cms/publicSettings";

// Flipping site_settings.default_robots to noindex must take effect without
// a rebuild — same reasoning as `[locale]/layout.tsx`'s `force-dynamic`.
export const dynamic = "force-dynamic";

/**
 * Reads `site_settings.default_robots` (e.g. "index,follow" / "noindex,nofollow")
 * so an admin can take the whole site out of search results (staging, etc.)
 * without a code change. Falls back to "index,follow" when unset/unconfigured.
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const branding = await getSiteBranding();
  const disallowAll = branding.defaultRobots.toLowerCase().includes("noindex");

  return {
    rules: disallowAll ? { userAgent: "*", disallow: "/" } : { userAgent: "*", allow: "/", disallow: "/admin" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
