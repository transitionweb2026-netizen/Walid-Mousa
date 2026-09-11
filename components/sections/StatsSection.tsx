import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IconBadge } from "@/components/ui/IconBadge";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { stats as fallbackStats, statsIntro } from "@/data/stats";
import type { StatItem } from "@/data/stats";
import type { IntroContent } from "@/lib/cms/publicSections";
import { localeTag, type Locale } from "@/lib/i18n";

interface Props {
  locale: Locale;
  stats?: StatItem[];
  intro?: IntroContent | null;
  showHeader?: boolean;
}

export function StatsSection({ locale, stats = fallbackStats, intro, showHeader = true }: Props) {
  const header = intro ?? statsIntro;
  return (
    <Section tint="duo" glow="both" aria-labelledby="stats-heading">
      {showHeader && (
        <SectionHeader
          locale={locale}
          headingId="stats-heading"
          eyebrow={header.eyebrow}
          title={header.title}
          description={header.description}
        />
      )}

      <Reveal className="mt-14" scale>
        <div className="glass-frame relative grid grid-cols-2 gap-px overflow-hidden rounded-4xl lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex flex-col items-center gap-3 bg-white/35 p-7 text-center backdrop-blur-sm sm:p-9"
            >
              <IconBadge icon={stat.icon} tone="glass" size="md" />
              <div className="font-heading text-3xl font-extrabold text-brand-ink sm:text-4xl lg:text-[2.7rem]">
                <span className="text-gradient-brand">
                  <Counter value={stat.value} suffix={stat.suffix} localeTag={localeTag[locale]} />
                </span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted sm:text-sm">
                {stat.label[locale]}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
