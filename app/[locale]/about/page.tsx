import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { heroes } from "@/data/hero";
import { buildPageMetadata } from "@/lib/cms/publicSeo";
import { getAboutSections } from "@/lib/cms/publicSections";
import {
  getStatistics,
  getCertificates,
  getCareerItems,
  getWhyItems,
  getExpertiseAreas,
  getGalleryImages,
} from "@/lib/cms/publicContent";
import { getFinalCta, getContactInfo, getSocialLinks } from "@/lib/cms/publicSettings";
import { navigationItems } from "@/data/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildWebPageJsonLd, buildBreadcrumbJsonLd } from "@/lib/structuredData";
import { SITE_URL } from "@/lib/seo";

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
  return buildPageMetadata({
    locale,
    path: "about",
    fallbackTitle: `${h.headline[locale]} ${h.headlineAccent[locale]}`,
    fallbackDescription: h.description[locale],
  });
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;

  const [sections, stats, certificates, career, whyPoints, expertise, gallery, cta, contact, social] = await Promise.all([
    getAboutSections(),
    getStatistics(),
    getCertificates(),
    getCareerItems(),
    getWhyItems(),
    getExpertiseAreas(),
    getGalleryImages(),
    getFinalCta(),
    getContactInfo(),
    getSocialLinks(),
  ]);

  const localeRoot = `/${locale}`;
  const cref = (c: { url: string }) => `${localeRoot}${c.url}`;
  const h = heroes.about;
  const nav = navigationItems.find((n) => n.key === "about");

  return (
    <>
      <JsonLd
        data={[
          buildWebPageJsonLd({
            locale,
            path: "about",
            name: `${h.headline[locale]} ${h.headlineAccent[locale]}`,
            description: h.description[locale],
          }),
          buildBreadcrumbJsonLd([
            { name: navigationItems[0].label[locale], url: `${SITE_URL}/${locale}` },
            { name: nav?.label[locale] ?? h.headline[locale], url: `${SITE_URL}/${locale}/about` },
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
      <AboutDoctorSection locale={locale} content={sections.aboutDoctor} />
      {sections.certificatesIntro && <CertificatesCarousel locale={locale} items={certificates} intro={sections.certificatesIntro} />}
      {sections.careerIntro && <CareerJourney locale={locale} milestones={career} intro={sections.careerIntro} />}
      {sections.why && <WhyDoctor locale={locale} section={sections.why} points={whyPoints} />}
      {sections.expertiseIntro && <AreasOfExpertise locale={locale} items={expertise} intro={sections.expertiseIntro} />}
      {sections.wordFromDoctor && <WordFromDoctor locale={locale} content={sections.wordFromDoctor} />}
      {sections.achievementsIntro && <AchievementsGallery locale={locale} images={gallery} intro={sections.achievementsIntro} />}
      {sections.statsIntro && <StatsSection locale={locale} stats={stats} intro={sections.statsIntro} />}
      {cta.isVisible && <CtaSection locale={locale} cta={cta} contact={contact} />}
    </>
  );
}
