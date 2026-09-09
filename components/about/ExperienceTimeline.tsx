import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { aboutContent } from "@/data/about";
import type { Locale } from "@/lib/i18n";

export function ExperienceTimeline({ locale }: { locale: Locale }) {
  const exp = aboutContent.experience;
  return (
    <Section tint="teal" glow="teal" aria-labelledby="experience-heading">
      <SectionHeader
        locale={locale}
        align="start"
        headingId="experience-heading"
        eyebrow={exp.eyebrow}
        title={exp.heading}
      />

      <ol className="relative mt-12 space-y-6 ps-6">
        <span className="absolute bottom-2 start-[0.4rem] top-2 w-0.5 rounded-full bg-gradient-to-b from-brand-teal to-brand-pink" />
        {exp.items.map((item, i) => (
          <Reveal as="li" key={i} delay={i * 0.06} className="relative">
            <span className="absolute -start-[1.35rem] top-5 h-3 w-3 rounded-full border-2 border-white bg-brand-teal shadow-glass" />
            <div className="glass-card glass-card-hover glass-sheen rounded-3xl p-6">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="chip-pink rounded-full px-3 py-0.5 text-xs font-bold">{item.period[locale]}</span>
                <h3 className="font-heading text-base font-bold text-brand-ink">{item.role[locale]}</h3>
              </div>
              <p className="mt-1.5 text-sm font-semibold text-brand-teal-deep">{item.place[locale]}</p>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">{item.detail[locale]}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
