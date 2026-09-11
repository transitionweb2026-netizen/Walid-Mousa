import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { InlineVideo } from "@/components/media/InlineVideo";
import { doctorIntro as fallback } from "@/data/doctorIntro";
import { siteContent } from "@/data/site";
import type { DoctorIntroContent } from "@/lib/cms/publicSections";
import type { Locale } from "@/lib/i18n";

const fb: DoctorIntroContent = {
  eyebrow: fallback.eyebrow,
  heading: fallback.heading,
  paragraphs: fallback.paragraphs,
  highlights: fallback.highlights,
  cta: { label: siteContent.actions.learnMoreAboutDoctor, url: "/about" },
  video: fallback.video,
};

export function DoctorIntro({ locale, content = fb }: { locale: Locale; content?: DoctorIntroContent }) {
  const localeRoot = `/${locale}`;

  return (
    <Section tint="neutral" aria-labelledby="intro-heading">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <span className="chip-teal inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] shadow-glass">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
            {content.eyebrow[locale]}
          </span>
          <h2 id="intro-heading" className="mt-5 text-3xl font-extrabold leading-tight text-brand-ink sm:text-4xl">
            {content.heading[locale]}
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-brand-ink-soft">
            {content.paragraphs[locale].map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            {content.highlights.map((h, i) => (
              <div key={i} className="glass-panel rounded-2xl px-4 py-3">
                <div className="font-heading text-lg font-extrabold text-brand-teal-deep">{h.value[locale]}</div>
                <div className="text-xs text-brand-muted">{h.label[locale]}</div>
              </div>
            ))}
          </div>

          <Button href={`${localeRoot}${content.cta.url}`} variant="ghost" withArrow className="mt-7 !px-0">
            {content.cta.label[locale]}
          </Button>
        </Reveal>

        <Reveal delay={0.15} className="relative">
          <span aria-hidden className="glow-teal absolute -end-8 -top-8 h-40 w-40 rounded-full opacity-50" />
          <span aria-hidden className="glow-pink absolute -bottom-10 -start-6 h-36 w-36 rounded-full opacity-40" />
          <InlineVideo video={content.video} title={content.heading} locale={locale} className="relative" />
        </Reveal>
      </div>
    </Section>
  );
}
