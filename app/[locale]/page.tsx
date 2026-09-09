import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildAlternates } from "@/lib/seo";
import { siteContent } from "@/data/site";

import { Hero } from "@/components/layout/Hero";
import { DoctorIntro } from "@/components/home/DoctorIntro";
import { StatsSection } from "@/components/sections/StatsSection";
import { SurgeriesSection } from "@/components/home/SurgeriesSection";
import { TreatmentsSection } from "@/components/home/TreatmentsSection";
import { TechnologiesSection } from "@/components/home/TechnologiesSection";
import { PatientJourney } from "@/components/home/PatientJourney";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { FeaturedVideos } from "@/components/home/FeaturedVideos";
import { FaqArticles } from "@/components/home/FaqArticles";
import { CtaSection } from "@/components/sections/CtaSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  return {
    title: siteContent.seo.defaultTitle[locale],
    description: siteContent.seo.defaultDescription[locale],
    alternates: buildAlternates(locale, ""),
  };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;

  return (
    <>
      <Hero locale={locale} variant="home" showPanel />
      <DoctorIntro locale={locale} />
      <StatsSection locale={locale} />
      <SurgeriesSection locale={locale} />
      <TreatmentsSection locale={locale} />
      <TechnologiesSection locale={locale} />
      <PatientJourney locale={locale} />
      <ReviewsSection locale={locale} />
      <FeaturedVideos locale={locale} />
      <FaqArticles locale={locale} />
      <CtaSection locale={locale} />
    </>
  );
}
