import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildAlternates } from "@/lib/seo";
import { heroes } from "@/data/hero";

import { Hero } from "@/components/layout/Hero";
import { BiographySection } from "@/components/about/BiographySection";
import { ExperienceTimeline } from "@/components/about/ExperienceTimeline";
import { EducationCertifications } from "@/components/about/EducationCertifications";
import { AchievementsGallery } from "@/components/about/AchievementsGallery";
import { StatsSection } from "@/components/sections/StatsSection";
import { CtaSection } from "@/components/sections/CtaSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const h = heroes.about;
  return {
    title: `${h.headline[locale]} ${h.headlineAccent[locale]}`,
    description: h.description[locale],
    alternates: buildAlternates(locale, "about"),
  };
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;

  return (
    <>
      <Hero
        locale={locale}
        variant="about"
        primaryCta={{ label: { en: "Book an Appointment", ar: "احجز موعدك" }, href: `/${locale}/contact` }}
        secondaryCta={{ label: { en: "Explore Services", ar: "استكشف الخدمات" }, href: `/${locale}/services` }}
      />
      <BiographySection locale={locale} />
      <StatsSection locale={locale} showHeader={false} />
      <ExperienceTimeline locale={locale} />
      <EducationCertifications locale={locale} />
      <AchievementsGallery locale={locale} />
      <CtaSection locale={locale} />
    </>
  );
}
