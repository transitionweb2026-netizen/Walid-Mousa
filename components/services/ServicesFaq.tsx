import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { faqItems as fbFaqs } from "@/data/faq";
import type { FaqItem } from "@/data/faq";
import { servicesFaqIntro as fbIntro } from "@/data/specialties";
import type { IntroContent } from "@/lib/cms/publicSections";
import type { Locale } from "@/lib/i18n";

interface Props {
  locale: Locale;
  faqs?: FaqItem[];
  intro?: IntroContent | null;
}

/** Services-page FAQ — the Home page's accordion, single-column. */
export function ServicesFaq({ locale, faqs = fbFaqs, intro }: Props) {
  const header = intro ?? fbIntro;
  return (
    <Section id="faq" tint="neutral" glow="teal" aria-labelledby="services-faq-heading">
      <SectionHeader
        locale={locale}
        headingId="services-faq-heading"
        eyebrow={header.eyebrow}
        title={header.title}
        description={header.description}
      />
      <Reveal className="mx-auto mt-12 max-w-3xl">
        <FaqAccordion items={faqs} locale={locale} />
      </Reveal>
    </Section>
  );
}
