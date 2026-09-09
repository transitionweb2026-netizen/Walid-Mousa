import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildAlternates } from "@/lib/seo";
import { videosIntro } from "@/data/videos";

import { Hero } from "@/components/layout/Hero";
import { Section } from "@/components/ui/Section";
import { VideoLibrary } from "@/components/videos/VideoLibrary";
import { CtaSection } from "@/components/sections/CtaSection";
import { IMG } from "@/data/images";
import type { Localized } from "@/lib/types";

const heroCopy: { eyebrow: Localized; headline: Localized; accent: Localized; description: Localized } = {
  eyebrow: { en: "Video Library", ar: "مكتبة الفيديو" },
  headline: { en: "Men's health,", ar: "صحة الرجل،" },
  accent: { en: "explained on screen", ar: "مشروحة على الشاشة" },
  description: {
    en: "Short, direct videos from Dr. Walid Moussa on erectile health, fertility, hormones and surgery.",
    ar: "فيديوهات قصيرة ومباشرة من د. وليد موسى عن صحة الانتصاب والخصوبة والهرمونات والجراحة.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return {
    title: `${heroCopy.headline[locale]} ${heroCopy.accent[locale]}`.replace(/،|,/g, ""),
    description: heroCopy.description[locale],
    alternates: buildAlternates(locale, "videos"),
  };
}

export default async function VideosPage({ params }: PageProps<"/[locale]/videos">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;

  return (
    <>
      <Hero
        locale={locale}
        compact
        content={{
          eyebrow: heroCopy.eyebrow,
          headline: heroCopy.headline,
          headlineAccent: heroCopy.accent,
          description: heroCopy.description,
          image: {
            src: IMG.videoStudio,
            alt: { en: "Recording a health explainer video", ar: "تسجيل فيديو توعوي صحي" },
            position: "center 30%",
          },
        }}
      />

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
