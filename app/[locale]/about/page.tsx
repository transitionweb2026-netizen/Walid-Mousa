import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildAlternates } from "@/lib/seo";
import { heroes } from "@/data/hero";

import { Hero } from "@/components/layout/Hero";
import { AboutDoctorSection } from "@/components/about/AboutDoctorSection";
import { CertificatesCarousel } from "@/components/about/CertificatesCarousel";
import { CareerJourney } from "@/components/about/CareerJourney";
import { WhyDoctor } from "@/components/about/WhyDoctor";
import { AreasOfExpertise } from "@/components/about/AreasOfExpertise";
import { WordFromDoctor } from "@/components/about/WordFromDoctor";
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
      <Hero locale={locale} variant="about" showPanel />
      <AboutDoctorSection locale={locale} />
      <CertificatesCarousel locale={locale} />
      <CareerJourney locale={locale} />
      <WhyDoctor locale={locale} />
      <AreasOfExpertise locale={locale} />
      <WordFromDoctor locale={locale} />
      <AchievementsGallery locale={locale} />
      <StatsSection locale={locale} />
      <CtaSection locale={locale} />
    </>
  );
}
