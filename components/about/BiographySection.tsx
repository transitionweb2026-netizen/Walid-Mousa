import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/icons/Icon";
import { aboutContent } from "@/data/about";
import type { Locale } from "@/lib/i18n";

export function BiographySection({ locale }: { locale: Locale }) {
  const bio = aboutContent.bio;
  return (
    <Section tint="neutral" aria-labelledby="bio-heading">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="relative">
          <span aria-hidden className="glow-teal absolute -start-8 -top-8 h-44 w-44 rounded-full opacity-50" />
          <span aria-hidden className="glow-pink absolute -bottom-10 -end-6 h-40 w-40 rounded-full opacity-40" />
          <div className="glass-card glass-sheen relative overflow-hidden rounded-[2rem] p-2.5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.6rem]">
              <Image
                src={bio.portrait.src}
                alt={bio.portrait.alt[locale]}
                fill
                sizes="(min-width:1024px) 30rem, 90vw"
                style={{ objectPosition: bio.portrait.position }}
                className="object-cover"
              />
            </div>
            <div className="flex items-center gap-3 p-4">
              <span className="h-10 w-10 shrink-0 rounded-xl bg-gradient-brand" />
              <div>
                <p className="font-heading text-sm font-extrabold text-brand-ink">{bio.signatureName[locale]}</p>
                <p className="text-xs text-brand-muted">{bio.signatureRole[locale]}</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="chip-teal inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] shadow-glass">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
            {bio.eyebrow[locale]}
          </span>
          <h2 id="bio-heading" className="mt-5 text-3xl font-extrabold leading-tight text-brand-ink sm:text-4xl">
            {bio.heading[locale]}
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-brand-ink-soft">
            {bio.paragraphs[locale].map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Philosophy points */}
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {aboutContent.philosophy.points.map((point, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="glass-card glass-card-hover glass-sheen flex h-full flex-col rounded-3xl p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glass">
                <Icon name={point.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-bold text-brand-ink">{point.title[locale]}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">{point.text[locale]}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
