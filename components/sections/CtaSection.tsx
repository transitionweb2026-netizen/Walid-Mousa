import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { Icon } from "@/components/icons/Icon";
import { ctaContent } from "@/data/cta";
import { contactInfo } from "@/data/contact";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { Locale } from "@/lib/i18n";

/** The site's single Final CTA — a large horizontal glass object, shown at
 *  the foot of every page. Interactive tilt + reflection on hover. */
export function CtaSection({ locale }: { locale: Locale }) {
  const localeRoot = `/${locale}`;
  const waHref = buildWhatsAppUrl(contactInfo.whatsapp, ctaContent.whatsappMessage[locale]);

  return (
    <Section aria-labelledby="cta-heading">
      <Reveal scale>
        <TiltCard max={4} glare={0.22}>
          <div className="glass-card-strong glass-sheen relative overflow-hidden rounded-[2.25rem] px-6 py-14 text-center sm:px-12 sm:py-16 lg:rounded-[2.75rem] lg:px-16">
            <span aria-hidden className="glow-teal animate-float-slower absolute -start-16 -top-16 h-64 w-64 rounded-full opacity-55" />
            <span aria-hidden className="glow-pink animate-float-slow absolute -bottom-20 -end-12 h-72 w-72 rounded-full opacity-45 [animation-delay:-4s]" />

            <div className="relative z-10 mx-auto max-w-2xl">
              <span className="chip-pink inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] shadow-glass">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" />
                {ctaContent.eyebrow[locale]}
              </span>
              <h2
                id="cta-heading"
                className="mt-5 text-balance text-3xl font-extrabold text-brand-ink sm:text-4xl lg:text-[2.6rem] lg:leading-tight"
              >
                {ctaContent.title[locale]}
              </h2>
              <p className="mt-5 text-pretty text-base leading-relaxed text-brand-ink-soft sm:text-lg">
                {ctaContent.description[locale]}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <Button href={waHref} size="lg" target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" className="h-4 w-4" />
                  {ctaContent.whatsappLabel[locale]}
                </Button>
                <Button href={`${localeRoot}/contact`} size="lg" variant="secondary" withArrow>
                  {ctaContent.contactLabel[locale]}
                </Button>
              </div>
            </div>
          </div>
        </TiltCard>
      </Reveal>
    </Section>
  );
}
