import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildAlternates } from "@/lib/seo";
import { heroes } from "@/data/hero";
import { surgeries, surgeriesIntro } from "@/data/surgeries";
import { technologies, technologiesIntro } from "@/data/technologies";
import { specialties } from "@/data/specialties";
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
  return {
    title: `${h.headline[locale]} ${h.headlineAccent[locale]}`,
    description: h.description[locale],
    alternates: buildAlternates(locale, "services"),
  };
}

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;

  const surgeryItems = surgeries.map((s) => ({ id: s.id, slug: s.slug, card: surgeryToCard(s), detail: surgeryToDetail(s) }));
  const techItems = technologies.map((t) => ({ id: t.id, slug: t.slug, card: technologyToCard(t), detail: technologyToDetail(t) }));

  return (
    <>
      <Hero locale={locale} variant="services" showPanel />

      <SpecialtySelector locale={locale} />

      {specialties.map((specialty, i) => (
        <SpecialtyTreatmentsSection key={specialty.id} specialty={specialty} locale={locale} index={i} />
      ))}

      <CareAnchorSection
        id="surgeries"
        hashPrefix="surgery"
        locale={locale}
        eyebrow={surgeriesIntro.eyebrow}
        title={surgeriesIntro.title}
        description={surgeriesIntro.description}
        tone="teal"
        tint="teal"
        glow="teal"
        framed
        columns={3}
        items={surgeryItems}
      />

      <CareAnchorSection
        id="technologies"
        hashPrefix="technology"
        locale={locale}
        eyebrow={technologiesIntro.eyebrow}
        title={technologiesIntro.title}
        description={technologiesIntro.description}
        tone="teal"
        tint="neutral"
        columns={4}
        items={techItems}
      />

      <OtherServices locale={locale} />
      <ServicesFaq locale={locale} />
      <CtaSection locale={locale} />
    </>
  );
}
