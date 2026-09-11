import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { HeroContactPanel } from "./HeroContactPanel";
import type { HeroContent } from "@/data/hero";
import { localeDirection, type Locale } from "@/lib/i18n";
import type { Localized } from "@/lib/types";
import type { ContactInfo } from "@/lib/cms/publicSettings";
import type { SocialLink } from "@/data/contact";
import { cn } from "@/lib/utils";

interface HeroCta {
  label: Localized;
  href: string;
}

interface HeroProps {
  locale: Locale;
  content: HeroContent;
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  compact?: boolean;
  showPanel?: boolean;
  contact?: ContactInfo;
  social?: SocialLink[];
  contactTitle?: Localized;
}

/**
 * The site's one Hero — full-bleed cover image, legibility scrim, ambient
 * glow, optional floating contact panel. Content, image and CTAs come from
 * the CMS (page_sections.hero); the design never changes.
 */
export function Hero({
  locale,
  content: data,
  primaryCta,
  secondaryCta,
  compact = false,
  showPanel = false,
  contact,
  social,
  contactTitle,
}: HeroProps) {
  const isRtl = localeDirection[locale] === "rtl";

  return (
    <section className="mx-3 mt-3 sm:mx-6 sm:mt-4 lg:mx-8" aria-label="Hero">
      <div
        className={cn(
          "relative isolate overflow-hidden rounded-[1.75rem] lg:rounded-[2.5rem]",
          compact ? "min-h-[380px] sm:min-h-[440px]" : "min-h-[600px] sm:min-h-[680px] lg:min-h-[760px]"
        )}
      >
        <Image
          src={data.image.src}
          alt={data.image.alt[locale]}
          fill
          priority
          sizes="100vw"
          style={{ objectPosition: data.image.position }}
          className="object-cover"
        />

        <div
          aria-hidden
          className={cn(
            "absolute inset-0",
            isRtl ? "bg-gradient-to-l" : "bg-gradient-to-r",
            "from-[var(--color-hero-scrim)] from-[8%] via-[var(--color-hero-scrim)]/72 via-[42%] to-transparent"
          )}
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand-ink/45 via-transparent to-transparent" />

        <div aria-hidden className="glow-teal animate-float-slower absolute -top-16 end-[-4rem] h-64 w-64 rounded-full opacity-60" />
        <div aria-hidden className="glow-pink animate-float-slow absolute bottom-8 start-[-4rem] h-56 w-56 rounded-full opacity-45 [animation-delay:-3s]" />

        <div
          className={cn(
            "relative z-10 flex h-full flex-col justify-center px-6 sm:px-10 lg:px-16",
            compact ? "py-12 lg:max-w-xl" : "py-16 lg:max-w-2xl lg:py-24"
          )}
        >
          <Reveal>
            <span className="chip-teal inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] shadow-glass">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
              {data.eyebrow[locale]}
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1
              className={cn(
                "mt-5 text-balance font-extrabold leading-[1.12] text-brand-ink",
                compact ? "text-3xl sm:text-4xl lg:text-5xl" : "text-4xl sm:text-5xl lg:text-6xl"
              )}
            >
              {data.headline[locale]} <span className="text-gradient-brand">{data.headlineAccent[locale]}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-brand-ink-soft sm:text-lg">
              {data.description[locale]}
            </p>
          </Reveal>

          {!compact && (
            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <Button href={primaryCta.href} size="lg" withArrow>
                  {primaryCta.label[locale]}
                </Button>
                <Button href={secondaryCta.href} size="lg" variant="secondary">
                  {secondaryCta.label[locale]}
                </Button>
              </div>
            </Reveal>
          )}
        </div>

        {showPanel && contact && social && (
          <HeroContactPanel
            locale={locale}
            contact={contact}
            social={social}
            contactTitle={contactTitle}
            className="relative z-10 mx-6 mb-8 sm:mx-10 lg:absolute lg:bottom-10 lg:end-10 lg:mx-0 lg:mb-0"
          />
        )}
      </div>
    </section>
  );
}
