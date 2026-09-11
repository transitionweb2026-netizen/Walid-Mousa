import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { siteContent } from "@/data/site";
import { buildPageMetadata } from "@/lib/cms/publicSeo";
import { getHomeSections } from "@/lib/cms/publicSections";
import {
  getStatistics,
  getFeaturedSurgeries,
  getFeaturedConditions,
  getTechnologies,
  getJourneySteps,
  getReviews,
  getFeaturedVideos,
  getFaqs,
  getFeaturedArticles,
} from "@/lib/cms/publicContent";
import { getFinalCta, getContactInfo, getSocialLinks } from "@/lib/cms/publicSettings";

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
  return buildPageMetadata({
    locale,
    path: "",
    fallbackTitle: siteContent.seo.defaultTitle[locale],
    fallbackDescription: siteContent.seo.defaultDescription[locale],
  });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;

  const [
    sections,
    stats,
    surgeries,
    conditions,
    technologies,
    journey,
    reviews,
    videos,
    faqs,
    articles,
    cta,
    contact,
    social,
  ] = await Promise.all([
    getHomeSections(),
    getStatistics(),
    getFeaturedSurgeries(),
    getFeaturedConditions(),
    getTechnologies(),
    getJourneySteps(),
    getReviews(),
    getFeaturedVideos(),
    getFaqs("home"),
    getFeaturedArticles(),
    getFinalCta(),
    getContactInfo(),
    getSocialLinks(),
  ]);

  const localeRoot = `/${locale}`;
  const href = (cta: { url: string }) => `${localeRoot}${cta.url}`;

  return (
    <>
      <Hero
        locale={locale}
        content={sections.hero.content}
        primaryCta={{ label: sections.hero.primaryCta.label, href: href(sections.hero.primaryCta) }}
        secondaryCta={{ label: sections.hero.secondaryCta.label, href: href(sections.hero.secondaryCta) }}
        showPanel
        contact={contact}
        social={social}
      />
      {sections.doctorIntro && <DoctorIntro locale={locale} content={sections.doctorIntro} />}
      {sections.statsIntro && <StatsSection locale={locale} stats={stats} intro={sections.statsIntro} />}
      {sections.surgeriesIntro && <SurgeriesSection locale={locale} surgeries={surgeries} intro={sections.surgeriesIntro} />}
      {sections.conditionsIntro && <TreatmentsSection locale={locale} conditions={conditions} intro={sections.conditionsIntro} />}
      {sections.technologiesIntro && <TechnologiesSection locale={locale} technologies={technologies} intro={sections.technologiesIntro} />}
      {sections.journeyIntro && <PatientJourney locale={locale} steps={journey} intro={sections.journeyIntro} />}
      {sections.reviewsIntro && <ReviewsSection locale={locale} reviews={reviews} intro={sections.reviewsIntro} />}
      {sections.featuredVideosIntro && <FeaturedVideos locale={locale} videos={videos} intro={sections.featuredVideosIntro} />}
      {(sections.faqIntro || sections.featuredArticlesIntro) && (
        <FaqArticles
          locale={locale}
          faqs={faqs}
          articles={articles}
          faqIntro={sections.faqIntro}
          articlesIntro={sections.featuredArticlesIntro}
        />
      )}
      {cta.isVisible && <CtaSection locale={locale} cta={cta} contact={contact} />}
    </>
  );
}
