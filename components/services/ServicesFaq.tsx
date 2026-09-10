import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { faqItems } from "@/data/faq";
import { servicesFaqIntro } from "@/data/specialties";
import type { Locale } from "@/lib/i18n";

/** Services-page FAQ — the Home page's accordion, single-column. */
export function ServicesFaq({ locale }: { locale: Locale }) {
  return (
    <Section id="faq" tint="neutral" glow="teal" aria-labelledby="services-faq-heading">
      <SectionHeader
        locale={locale}
        headingId="services-faq-heading"
        eyebrow={servicesFaqIntro.eyebrow}
        title={servicesFaqIntro.title}
        description={servicesFaqIntro.description}
      />
      <Reveal className="mx-auto mt-12 max-w-3xl">
        <FaqAccordion items={faqItems} locale={locale} />
      </Reveal>
    </Section>
  );
}
