import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Icon } from "@/components/icons/Icon";
import { aboutContent } from "@/data/about";
import type { Locale } from "@/lib/i18n";

export function WordFromDoctor({ locale }: { locale: Locale }) {
  const word = aboutContent.word;

  return (
    <Section tint="duo" glow="both" aria-labelledby="word-heading">
      <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        {/* Portrait */}
        <Reveal className="relative mx-auto w-full max-w-xs lg:max-w-none">
          <span aria-hidden className="glow-pink absolute -bottom-10 -end-6 h-40 w-40 rounded-full opacity-40" />
          <div className="glass-card glass-sheen relative overflow-hidden rounded-[2rem] p-2.5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.6rem]">
              <Image
                src={word.image.src}
                alt={word.image.alt[locale]}
                fill
                sizes="(min-width:1024px) 22rem, 80vw"
                style={{ objectPosition: word.image.position }}
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>

        {/* Quote */}
        <Reveal delay={0.1}>
          <span className="chip-pink inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] shadow-glass">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" />
            {word.eyebrow[locale]}
          </span>

          <figure className="glass-card-strong glass-sheen relative mt-5 overflow-hidden rounded-[2rem] p-7 sm:p-9">
            <span aria-hidden className="glow-teal absolute -start-12 -top-12 h-44 w-44 rounded-full opacity-45" />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-6 start-0 w-1 rounded-full bg-gradient-to-b from-brand-teal to-brand-pink"
            />
            <Icon name="quote" className="relative h-9 w-9 text-brand-pink-soft" />

            <h2 id="word-heading" className="sr-only">
              {word.heading[locale]}
            </h2>

            <blockquote className="relative mt-4 space-y-4">
              {word.quote[locale].map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-pretty text-lg font-medium leading-relaxed text-brand-ink"
                      : "text-pretty leading-relaxed text-brand-ink-soft"
                  }
                >
                  {p}
                </p>
              ))}
            </blockquote>

            <figcaption className="relative mt-6 flex items-center gap-3 border-t border-brand-line/70 pt-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-glass">
                <Icon name="stethoscope" className="h-5 w-5" />
              </span>
              <span className="flex flex-col">
                <span className="font-heading text-sm font-extrabold text-brand-ink">{word.name[locale]}</span>
                <span className="text-xs text-brand-muted">{word.role[locale]}</span>
              </span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  );
}
