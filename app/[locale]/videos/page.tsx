import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { heroes } from "@/data/hero";
import { buildPageMetadata } from "@/lib/cms/publicSeo";
import { getVideosSections } from "@/lib/cms/publicSections";
import { getVideos } from "@/lib/cms/publicContent";
import { getFinalCta, getContactInfo, getSocialLinks } from "@/lib/cms/publicSettings";
import { navigationItems } from "@/data/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildWebPageJsonLd, buildBreadcrumbJsonLd } from "@/lib/structuredData";
import { SITE_URL } from "@/lib/seo";

import { Hero } from "@/components/layout/Hero";
import { Section } from "@/components/ui/Section";
import { VideoLibrary } from "@/components/videos/VideoLibrary";
import { CtaSection } from "@/components/sections/CtaSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const h = heroes.videos;
  return buildPageMetadata({
    locale,
    path: "videos",
    fallbackTitle: `${h.headline[locale]} ${h.headlineAccent[locale]}`.replace(/،|,/g, ""),
    fallbackDescription: h.description[locale],
  });
}

export default async function VideosPage({ params }: PageProps<"/[locale]/videos">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;

  const [sections, videos, cta, contact, social] = await Promise.all([
    getVideosSections(),
    getVideos(),
    getFinalCta(),
    getContactInfo(),
    getSocialLinks(),
  ]);
  const cref = (c: { url: string }) => `/${locale}${c.url}`;
  const h = heroes.videos;
  const nav = navigationItems.find((n) => n.key === "videos");

  return (
    <>
      <JsonLd
        data={[
          buildWebPageJsonLd({
            locale,
            path: "videos",
            name: `${h.headline[locale]} ${h.headlineAccent[locale]}`.replace(/،|,/g, ""),
            description: h.description[locale],
          }),
          buildBreadcrumbJsonLd([
            { name: navigationItems[0].label[locale], url: `${SITE_URL}/${locale}` },
            { name: nav?.label[locale] ?? h.headline[locale], url: `${SITE_URL}/${locale}/videos` },
          ]),
        ]}
      />
      <Hero
        locale={locale}
        content={sections.hero.content}
        primaryCta={{ label: sections.hero.primaryCta.label, href: cref(sections.hero.primaryCta) }}
        secondaryCta={{ label: sections.hero.secondaryCta.label, href: cref(sections.hero.secondaryCta) }}
        showPanel
        contact={contact}
        social={social}
      />

      <Section tint="duo" glow="both" aria-labelledby="video-library-heading">
        <h1 id="video-library-heading" className="sr-only">
          {sections.galleryIntro.title[locale]}
        </h1>
        <VideoLibrary locale={locale} videos={videos} />
      </Section>

      {cta.isVisible && <CtaSection locale={locale} cta={cta} contact={contact} />}
    </>
  );
}
