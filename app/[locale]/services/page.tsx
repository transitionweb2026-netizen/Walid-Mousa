import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildAlternates } from "@/lib/seo";
import { heroes } from "@/data/hero";
import { surgeries, surgeriesIntro } from "@/data/surgeries";
import { treatments, treatmentsIntro } from "@/data/treatments";
import { technologies, technologiesIntro } from "@/data/technologies";
import { surgeryToCard, surgeryToDetail, treatmentToCard, treatmentToDetail, technologyToCard, technologyToDetail } from "@/lib/careAdapters";

import { Hero } from "@/components/layout/Hero";
import { CareAnchorSection } from "@/components/sections/CareAnchorSection";
import { OtherServices } from "@/components/sections/OtherServices";
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
  const treatmentItems = treatments.map((t) => ({ id: t.id, slug: t.slug, card: treatmentToCard(t), detail: treatmentToDetail(t) }));
  const techItems = technologies.map((t) => ({ id: t.id, slug: t.slug, card: technologyToCard(t), detail: technologyToDetail(t) }));

  return (
    <>
      <Hero
        locale={locale}
        variant="services"
        primaryCta={{ label: { en: "Book a Consultation", ar: "احجز استشارة" }, href: `/${locale}/contact` }}
        secondaryCta={{ label: { en: "See the Surgeries", ar: "شاهد العمليات" }, href: `/${locale}/services#surgeries` }}
      />

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

      {/* "Medical problems" and "treatments" are the same list for andrology —
          both anchors resolve here. */}
      <span id="problems" className="block h-0 scroll-mt-24" aria-hidden />
      <CareAnchorSection
        id="treatments"
        hashPrefix="treatment"
        locale={locale}
        eyebrow={treatmentsIntro.eyebrow}
        title={treatmentsIntro.title}
        description={treatmentsIntro.description}
        tone="pink"
        tint="pink"
        glow="pink"
        columns={3}
        items={treatmentItems}
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
      <CtaSection locale={locale} />
    </>
  );
}
