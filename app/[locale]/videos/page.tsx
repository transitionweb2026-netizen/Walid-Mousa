import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildAlternates } from "@/lib/seo";
import { heroes } from "@/data/hero";
import { videosIntro } from "@/data/videos";

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
  return {
    title: `${h.headline[locale]} ${h.headlineAccent[locale]}`.replace(/،|,/g, ""),
    description: h.description[locale],
    alternates: buildAlternates(locale, "videos"),
  };
}

export default async function VideosPage({ params }: PageProps<"/[locale]/videos">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;

  return (
    <>
      <Hero locale={locale} variant="videos" showPanel />

      <Section tint="duo" glow="both" aria-labelledby="video-library-heading">
        <h1 id="video-library-heading" className="sr-only">
          {videosIntro.title[locale]}
        </h1>
        <VideoLibrary locale={locale} />
      </Section>

      <CtaSection locale={locale} />
    </>
  );
}
