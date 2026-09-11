import { SITE_URL } from "@/lib/seo";
import type { Locale } from "@/lib/i18n";
import type { SiteBranding, ContactInfo } from "@/lib/cms/publicSettings";
import type { SocialLink } from "@/data/contact";
import type { ArticleItem } from "@/data/articles";
import type { ItemSeo } from "@/lib/cms/publicSeo";

/**
 * Pure builders for the schema.org nodes the spec asks for — Physician,
 * MedicalOrganization, WebSite, WebPage, BreadcrumbList and Article. Every
 * value comes from already-fetched CMS data (site_settings, contact_settings,
 * page content) — nothing here is invented or hardcoded.
 */

function origin(url: string): string {
  return (url || SITE_URL).replace(/\/+$/, "");
}

function absoluteUrl(base: string, path: string): string {
  const root = origin(base);
  return `${root}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildPhysicianJsonLd(branding: SiteBranding, contact: ContactInfo, locale: Locale) {
  const site = origin(branding.websiteUrl);
  return {
    "@type": "Physician",
    "@id": `${site}/#physician`,
    name: branding.name[locale],
    description: branding.credentials[locale],
    medicalSpecialty: branding.specialty[locale],
    url: absoluteUrl(site, `/${locale}`),
    image: branding.logo?.src || undefined,
    telephone: contact.phone || undefined,
    email: contact.email || undefined,
    address: contact.address[locale] ? { "@type": "PostalAddress", streetAddress: contact.address[locale] } : undefined,
  };
}

export function buildMedicalOrganizationJsonLd(
  branding: SiteBranding,
  contact: ContactInfo,
  locale: Locale,
  socialLinks: SocialLink[] = []
) {
  const site = origin(branding.websiteUrl);
  return {
    "@type": "MedicalOrganization",
    "@id": `${site}/#organization`,
    name: branding.orgName[locale],
    url: site,
    logo: branding.logo?.src || undefined,
    image: branding.logo?.src || undefined,
    telephone: contact.phone || undefined,
    email: contact.email || undefined,
    address: contact.address[locale] ? { "@type": "PostalAddress", streetAddress: contact.address[locale] } : undefined,
    sameAs: socialLinks.length > 0 ? socialLinks.map((s) => s.href) : undefined,
  };
}

export function buildWebSiteJsonLd(branding: SiteBranding, locale: Locale) {
  const site = origin(branding.websiteUrl);
  return {
    "@type": "WebSite",
    "@id": `${site}/#website`,
    name: branding.orgName[locale],
    url: site,
    inLanguage: locale,
  };
}

export function buildWebPageJsonLd(opts: { locale: Locale; path: string; name: string; description?: string }) {
  const url = absoluteUrl(SITE_URL, `/${opts.locale}${opts.path ? `/${opts.path}` : ""}`);
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: opts.name,
    description: opts.description || undefined,
    inLanguage: opts.locale,
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildArticleJsonLd(opts: { locale: Locale; article: ArticleItem; seo?: ItemSeo | null; authorName: string }) {
  const { locale, article, seo, authorName } = opts;
  const pageUrl = absoluteUrl(SITE_URL, `/${locale}/articles`);
  const headline = (seo?.title[locale] || article.title[locale]) as string;
  const description = (seo?.description[locale] || article.excerpt[locale]) as string | undefined;
  const image = seo?.ogImage || article.image.src;
  return {
    "@type": "Article",
    "@id": `${pageUrl}#article-${article.slug}`,
    headline,
    description: description || undefined,
    image: image ? [image] : undefined,
    author: { "@type": "Person", name: authorName },
    publisher: { "@id": `${SITE_URL}/#organization` },
    datePublished: article.date,
    mainEntityOfPage: pageUrl,
    inLanguage: locale,
    articleSection: article.category[locale] || undefined,
  };
}
