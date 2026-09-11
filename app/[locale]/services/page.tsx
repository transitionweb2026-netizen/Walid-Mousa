import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { heroes } from "@/data/hero";
import { buildPageMetadata } from "@/lib/cms/publicSeo";
import { getServicesSections } from "@/lib/cms/publicSections";
import { getSpecialties, getSurgeries, getTechnologies, getOtherServices, getFaqs } from "@/lib/cms/publicContent";
import { getFinalCta, getContactInfo, getSocialLinks } from "@/lib/cms/publicSettings";
import { surgeryToCard, surgeryToDetail, technologyToCard, technologyToDetail } from "@/lib/careAdapters";

import { Hero } from "@/components/layout/Hero";
import { SpecialtySelector } from "@/components/services/SpecialtySelector";
import { SpecialtyTreatmentsSection } from "@/components/services/SpecialtyTreatmentsSection";
import { CareAnchorSection } from "@/components/sections/CareAnchorSection";
import { OtherServices } from "@/components/sections/OtherServices";
import { ServicesFaq } from "@/components/services/ServicesFaq";
import { CtaSection } from "@/components/sections/CtaSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const h = heroes.services;
  return buildPageMetadata({
    locale,
    path: "services",
    fallbackTitle: `${h.headline[locale]} ${h.headlineAccent[locale]}`,
    fallbackDescription: h.description[locale],
  });
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;

  const [sections, specialties, surgeries, technologies, otherServices, faqs, cta, contact, social] = await Promise.all([
    getServicesSections(),
    getSpecialties(),
    getSurgeries(),
    getTechnologies(),
    getOtherServices(),
    getFaqs("services"),
    getFinalCta(),
    getContactInfo(),
    getSocialLinks(),
  ]);

  const cref = (c: { url: string }) => `/${locale}${c.url}`;
  const surgeryItems = surgeries.map((s) => ({ id: s.id, slug: s.slug, card: surgeryToCard(s), detail: surgeryToDetail(s) }));
  const techItems = technologies.map((t) => ({ id: t.id, slug: t.slug, card: technologyToCard(t), detail: technologyToDetail(t) }));

  return (
    <>
      <Hero
        locale={locale}
        content={sections.hero.content}
        primaryCta={{ label: sections.hero.primaryCta.label, href: cref(sections.hero.primaryCta) }}
        secondaryCta={{ label: sections.hero.secondaryCta.label, href: cref(sections.hero.secondaryCta) }}
        showPanel
        contact={contact}
        social={social}
      />

      <SpecialtySelector locale={locale} specialties={specialties} intro={sections.specialtiesIntro} />

      {specialties.map((specialty, i) => (
        <SpecialtyTreatmentsSection key={specialty.id} specialty={specialty} locale={locale} index={i} />
      ))}

      {sections.surgeriesIntro && (
        <CareAnchorSection
          id="surgeries"
          hashPrefix="surgery"
          locale={locale}
          eyebrow={sections.surgeriesIntro.eyebrow}
          title={sections.surgeriesIntro.title}
          description={sections.surgeriesIntro.description}
          tone="teal"
          tint="teal"
          glow="teal"
          framed
          columns={3}
          items={surgeryItems}
        />
      )}

      {sections.technologiesIntro && (
        <CareAnchorSection
          id="technologies"
          hashPrefix="technology"
          locale={locale}
          eyebrow={sections.technologiesIntro.eyebrow}
          title={sections.technologiesIntro.title}
          description={sections.technologiesIntro.description}
          tone="teal"
          tint="neutral"
          columns={4}
          items={techItems}
        />
      )}

      {sections.otherServicesIntro && (
        <OtherServices locale={locale} items={otherServices} intro={sections.otherServicesIntro} />
      )}
      <ServicesFaq locale={locale} faqs={faqs} intro={sections.faqIntro} />
      {cta.isVisible && <CtaSection locale={locale} cta={cta} contact={contact} />}
    </>
  );
}
