import "server-only";
import type { Metadata } from "next";
import { getPublicClient } from "./publicClient";
import { getSiteBranding } from "./publicSettings";
import { buildAlternates } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";
import type { Localized } from "@/lib/types";

/**
 * Merges a page's / content item's CMS SEO row over sensible defaults and
 * returns a Next.js `Metadata` object. Falls back to the given title/
 * description when Supabase is unconfigured or a row is empty.
 */

interface SeoInput {
  locale: Locale;
  path: string; // "" | "about" | "services/#..." etc — locale-relative, no leading slash
  fallbackTitle: string;
  fallbackDescription: string;
}

function mediaUrl(row: { external_url: string | null; bucket_id: string | null; storage_path: string | null } | null): string | undefined {
  if (!row) return undefined;
  if (row.external_url) return row.external_url;
  if (row.bucket_id && row.storage_path && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${row.bucket_id}/${row.storage_path}`;
  }
  return undefined;
}

const pick = (loc: Locale, en: string | null | undefined, ar: string | null | undefined) => (loc === "ar" ? ar : en) || undefined;

async function ogImageUrl(supabase: NonNullable<Awaited<ReturnType<typeof getPublicClient>>>, id: string | null | undefined): Promise<string | undefined> {
  if (!id) return undefined;
  const { data } = await supabase.from("media").select("external_url, bucket_id, storage_path").eq("id", id).maybeSingle();
  return mediaUrl(data ?? null);
}

export async function buildPageMetadata(input: SeoInput): Promise<Metadata> {
  const { locale, path, fallbackTitle, fallbackDescription } = input;
  const base: Metadata = {
    title: fallbackTitle,
    description: fallbackDescription,
    alternates: buildAlternates(locale, path),
  };

  const supabase = await getPublicClient();
  if (!supabase) return base;

  try {
    const { data: page } = await supabase.from("pages").select("id").eq("slug", path).maybeSingle();
    if (!page) return base;
    const { data: seo } = await supabase.from("page_seo").select("*").eq("page_id", page.id).maybeSingle();
    if (!seo) return base;

    const branding = await getSiteBranding();
    const title = pick(locale, seo.seo_title_en, seo.seo_title_ar) ?? fallbackTitle;
    const description = pick(locale, seo.meta_description_en, seo.meta_description_ar) ?? fallbackDescription;
    const ogTitle = pick(locale, seo.og_title_en, seo.og_title_ar) ?? title;
    const ogDescription = pick(locale, seo.og_description_en, seo.og_description_ar) ?? description;
    const [og, tw] = await Promise.all([ogImageUrl(supabase, seo.og_image_id), ogImageUrl(supabase, seo.twitter_image_id)]);
    const ogImage = og ?? branding.defaultOgImage ?? undefined;

    return {
      title,
      description,
      alternates: { ...buildAlternates(locale, path), canonical: seo.canonical_url || buildAlternates(locale, path).canonical },
      robots: { index: seo.is_indexed, follow: seo.is_followed },
      openGraph: { title: ogTitle, description: ogDescription, images: ogImage ? [ogImage] : undefined },
      twitter: {
        card: "summary_large_image",
        title: pick(locale, seo.twitter_title_en, seo.twitter_title_ar) ?? ogTitle,
        description: pick(locale, seo.twitter_description_en, seo.twitter_description_ar) ?? ogDescription,
        images: tw ? [tw] : ogImage ? [ogImage] : undefined,
      },
    };
  } catch (e) {
    console.error("[cms] buildPageMetadata failed:", e);
    return base;
  }
}

/** Per-item SEO (condition / treatment / surgery / article) for OG tags. */
export interface ItemSeo {
  title: Localized;
  description: Localized;
  canonical: string | null;
  ogImage: string | null;
  isIndexed: boolean;
  isFollowed: boolean;
}
export async function getItemSeo(
  table: "condition_seo" | "treatment_seo" | "surgery_seo" | "article_seo",
  fkColumn: string,
  id: string
): Promise<ItemSeo | null> {
  const supabase = await getPublicClient();
  if (!supabase) return null;
  try {
    const { data } = await supabase.from(table).select("*").eq(fkColumn, id).maybeSingle();
    if (!data) return null;
    const og = await ogImageUrl(supabase, data.og_image_id);
    return {
      title: { en: data.seo_title_en ?? "", ar: data.seo_title_ar ?? "" },
      description: { en: data.meta_description_en ?? "", ar: data.meta_description_ar ?? "" },
      canonical: data.canonical_url ?? null,
      ogImage: og ?? null,
      isIndexed: data.is_indexed,
      isFollowed: data.is_followed,
    };
  } catch (e) {
    console.error(`[cms] getItemSeo(${table}) failed:`, e);
    return null;
  }
}
