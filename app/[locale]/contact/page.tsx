import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";
import { buildAlternates } from "@/lib/seo";
import { heroes } from "@/data/hero";

import { Hero } from "@/components/layout/Hero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/icons/Icon";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactChannels } from "@/components/contact/ContactChannels";
import { ClinicMap } from "@/components/contact/ClinicMap";
import { CtaSection } from "@/components/sections/CtaSection";

const assurances = {
  en: [
    ["lock", "Held in confidence", "Your message goes only to a clinic coordinator — never a shared inbox."],
    ["clock", "A quick reply", "Enquiries are usually answered the same working day."],
    ["consultation", "No obligation", "A first message is just that. You decide every step after it."],
  ],
  ar: [
    ["lock", "بسرية تامة", "تصل رسالتك إلى منسّق العيادة فقط — لا إلى بريد مشترك."],
    ["clock", "رد سريع", "يُرد على الاستفسارات عادةً في نفس يوم العمل."],
    ["consultation", "دون أي التزام", "الرسالة الأولى مجرد بداية. أنت من يقرر كل خطوة بعدها."],
  ],
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const h = heroes.contact;
  return {
    title: `${h.headline[locale]} ${h.headlineAccent[locale]}`,
    description: h.description[locale],
    alternates: buildAlternates(locale, "contact"),
  };
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;

  return (
    <>
      <Hero
        locale={locale}
        variant="contact"
        compact
        primaryCta={{ label: { en: "Book an Appointment", ar: "احجز موعدك" }, href: `/${locale}/contact` }}
        secondaryCta={{ label: { en: "Explore Services", ar: "استكشف الخدمات" }, href: `/${locale}/services` }}
      />

      <Section tint="duo" glow="both" aria-labelledby="contact-heading">
        <h1 id="contact-heading" className="sr-only">
          {heroes.contact.headline[locale]} {heroes.contact.headlineAccent[locale]}
        </h1>

        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <Reveal className="flex flex-col gap-6">
            <ContactForm locale={locale} />
            <div className="glass-card glass-sheen grid gap-5 rounded-3xl p-6 sm:grid-cols-3 sm:p-7">
              {assurances[locale].map(([icon, title, text]) => (
                <div key={title} className="flex flex-col gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-teal-tint text-brand-teal-deep">
                    <Icon name={icon as "lock"} className="h-5 w-5" />
                  </span>
                  <h3 className="text-sm font-bold text-brand-ink">{title}</h3>
                  <p className="text-xs leading-relaxed text-brand-muted">{text}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactChannels locale={locale} />
          </Reveal>
        </div>

        <Reveal className="mt-8">
          <ClinicMap locale={locale} />
        </Reveal>
      </Section>

      <CtaSection locale={locale} />
    </>
  );
}
