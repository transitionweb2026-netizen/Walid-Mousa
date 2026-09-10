import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Icon } from "@/components/icons/Icon";
import { aboutContent } from "@/data/about";
import type { Locale } from "@/lib/i18n";

export function WhyDoctor({ locale }: { locale: Locale }) {
  const why = aboutContent.why;

  return (
    <Section tint="pink" glow="pink" aria-labelledby="why-heading">
      <SectionHeader
        locale={locale}
        tone="pink"
        headingId="why-heading"
        eyebrow={why.eyebrow}
        title={why.heading}
        description={why.description}
      />

      <div className="mt-14 grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        {/* Image */}
        <Reveal className="relative lg:sticky lg:top-24">
          <span aria-hidden className="glow-teal absolute -start-8 -top-8 h-40 w-40 rounded-full opacity-45" />
          <div className="glass-card glass-sheen relative overflow-hidden rounded-[2rem] p-2.5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.6rem]">
              <Image
                src={why.image.src}
                alt={why.image.alt[locale]}
                fill
                sizes="(min-width:1024px) 24rem, 90vw"
                style={{ objectPosition: why.image.position }}
                className="object-cover"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-brand-ink/35 via-transparent to-transparent" />
            </div>
          </div>
        </Reveal>

        {/* Feature points */}
        <Stagger className="grid gap-4 sm:grid-cols-2">
          {why.points.map((point, i) => (
            <StaggerItem key={i} className="h-full">
              <div className="glass-card glass-card-hover glass-sheen flex h-full flex-col rounded-3xl p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glass">
                  <Icon name={point.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-bold text-brand-ink">{point.title[locale]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{point.text[locale]}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
