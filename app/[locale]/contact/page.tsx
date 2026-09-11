import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { heroes } from "@/data/hero";
import { siteContent } from "@/data/site";
import { buildPageMetadata } from "@/lib/cms/publicSeo";
import { getContactSections } from "@/lib/cms/publicSections";
import { getContactAssurances } from "@/lib/cms/publicContent";
import {
  getContactInfo,
  getContactFormSettings,
  getContactIntro,
  getSocialLinks,
  getFooterContent,
  getFinalCta,
} from "@/lib/cms/publicSettings";
import { navigationItems } from "@/data/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildWebPageJsonLd, buildBreadcrumbJsonLd } from "@/lib/structuredData";
import { SITE_URL } from "@/lib/seo";

import { Hero } from "@/components/layout/Hero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/icons/Icon";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { ClinicMap } from "@/components/contact/ClinicMap";
import { CtaSection } from "@/components/sections/CtaSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const h = heroes.contact;
  return buildPageMetadata({
    locale,
    path: "contact",
    fallbackTitle: `${h.headline[locale]} ${h.headlineAccent[locale]}`,
    fallbackDescription: h.description[locale],
  });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;

  const [sections, contact, form, intro, social, footer, assurances, cta] = await Promise.all([
    getContactSections(),
    getContactInfo(),
    getContactFormSettings(),
    getContactIntro(),
    getSocialLinks(),
    getFooterContent(),
    getContactAssurances(),
    getFinalCta(),
  ]);
  const cref = (c: { url: string }) => `/${locale}${c.url}`;
  const h = heroes.contact;
  const nav = navigationItems.find((n) => n.key === "contact");

  return (
    <>
      <JsonLd
        data={[
          buildWebPageJsonLd({
            locale,
            path: "contact",
            name: `${h.headline[locale]} ${h.headlineAccent[locale]}`,
            description: h.description[locale],
          }),
          buildBreadcrumbJsonLd([
            { name: navigationItems[0].label[locale], url: `${SITE_URL}/${locale}` },
            { name: nav?.label[locale] ?? h.headline[locale], url: `${SITE_URL}/${locale}/contact` },
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

      <Section tint="duo" glow="both" aria-labelledby="contact-heading">
        <h1 id="contact-heading" className="sr-only">
          {sections.contactIntro.title[locale]}
        </h1>

        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <Reveal className="flex flex-col gap-6">
            <ContactForm locale={locale} settings={form} contact={contact} />
            {assurances.length > 0 && (
              <div className="glass-card glass-sheen grid gap-5 rounded-3xl p-6 sm:grid-cols-3 sm:p-7">
                {assurances.map((a) => (
                  <div key={a.id} className="flex flex-col gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-teal-tint text-brand-teal-deep">
                      <Icon name={a.icon} className="h-5 w-5" />
                    </span>
                    <h3 className="text-sm font-bold text-brand-ink">{a.title[locale]}</h3>
                    <p className="text-xs leading-relaxed text-brand-muted">{a.text[locale]}</p>
                  </div>
                ))}
              </div>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <ContactChannels
              locale={locale}
              contact={contact}
              social={social}
              footer={footer}
              labels={{
                channelsTitle: intro.channelsTitle,
                channelsNote: intro.channelsNote,
                whatsapp: siteContent.actions.whatsapp,
                bookAppointment: siteContent.actions.bookAppointment,
              }}
            />
          </Reveal>
        </div>

        <Reveal className="mt-8">
          <ClinicMap
            locale={locale}
            contact={contact}
            labels={{
              locationTitle: intro.locationTitle,
              openInMaps: intro.openInMaps,
              getDirections: intro.getDirections,
              mapHint: intro.mapHint,
              mapPending: intro.mapPending,
            }}
          />
        </Reveal>
      </Section>

      {cta.isVisible && <CtaSection locale={locale} cta={cta} contact={contact} />}
    </>
  );
}
