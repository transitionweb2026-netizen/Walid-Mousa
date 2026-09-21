import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { Icon } from "@/components/icons/Icon";
import { ctaContent } from "@/data/cta";
import { contactInfo } from "@/data/contact";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { FinalCta } from "@/lib/cms/publicSettings";
import type { ContactInfo } from "@/lib/cms/publicSettings";
import type { Locale } from "@/lib/i18n";

const fbCta: FinalCta = {
  eyebrow: ctaContent.eyebrow,
  title: ctaContent.title,
  description: ctaContent.description,
  primaryLabel: ctaContent.whatsappLabel,
  primaryIsWhatsapp: true,
  primaryUrl: "",
  whatsappMessage: ctaContent.whatsappMessage,
  secondaryLabel: ctaContent.contactLabel,
  secondaryUrl: "/contact",
  backgroundImage: null,
  isVisible: true,
};

interface Props {
  locale: Locale;
  cta?: FinalCta;
  contact?: Pick<ContactInfo, "whatsapp">;
}

/** The site's single Final CTA — a large horizontal glass object at the foot
 *  of every page. Interactive tilt + reflection on hover. */
export function CtaSection({ locale, cta = fbCta, contact }: Props) {
  const localeRoot = `/${locale}`;
  const whatsapp = contact?.whatsapp ?? contactInfo.whatsapp;
  const primaryHref = cta.primaryIsWhatsapp
    ? buildWhatsAppUrl(whatsapp, cta.whatsappMessage[locale])
    : `${localeRoot}${cta.primaryUrl}`;

  return (
    <Section aria-labelledby="cta-heading">
      <Reveal scale>
        <TiltCard max={4} glare={0.22}>
          <div className="glass-card-strong glass-sheen relative overflow-hidden rounded-[2.25rem] px-6 py-14 text-center sm:px-12 sm:py-16 lg:rounded-[2.75rem] lg:px-16">
            <span aria-hidden className="glow-teal animate-float-slower absolute -start-16 -top-16 h-64 w-64 rounded-full opacity-55" />
            <span aria-hidden className="glow-pink animate-float-slow absolute -bottom-20 -end-12 h-72 w-72 rounded-full opacity-45 [animation-delay:-4s]" />

            <div className="relative z-10 mx-auto max-w-2xl">
              <h2
                id="cta-heading"
                className="text-balance text-3xl font-extrabold text-brand-ink sm:text-4xl lg:text-[2.6rem] lg:leading-tight"
              >
                {cta.title[locale]}
              </h2>
              <p className="mt-5 text-pretty text-base leading-relaxed text-brand-ink-soft sm:text-lg">
                {cta.description[locale]}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                <Button
                  href={primaryHref}
                  size="lg"
                  target={cta.primaryIsWhatsapp ? "_blank" : undefined}
                  rel={cta.primaryIsWhatsapp ? "noopener noreferrer" : undefined}
                >
                  {cta.primaryIsWhatsapp && <Icon name="whatsapp" className="h-4 w-4" />}
                  {cta.primaryLabel[locale]}
                </Button>
                <Button href={`${localeRoot}${cta.secondaryUrl}`} size="lg" variant="secondary" withArrow>
                  {cta.secondaryLabel[locale]}
                </Button>
              </div>
            </div>
          </div>
        </TiltCard>
      </Reveal>
    </Section>
  );
}
