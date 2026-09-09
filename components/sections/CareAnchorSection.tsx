import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { CareGrid } from "@/components/cards/CareGrid";
import type { CareCardData } from "@/components/cards/CareCard";
import type { CareDetailItem } from "@/components/cards/CareDetailModal";
import type { Locale } from "@/lib/i18n";
import type { Localized } from "@/lib/types";

interface CareAnchorSectionProps {
  id: string;
  hashPrefix: string;
  locale: Locale;
  eyebrow: Localized;
  title: Localized;
  description: Localized;
  tone?: "teal" | "pink";
  tint?: "teal" | "pink" | "neutral" | "duo";
  glow?: "none" | "teal" | "pink" | "both";
  framed?: boolean;
  columns?: 2 | 3 | 4;
  items: { id: string; slug: string; card: CareCardData; detail: CareDetailItem }[];
}

/** A reusable Services-page section: anchor id + header + interactive grid. */
export function CareAnchorSection({
  id,
  hashPrefix,
  locale,
  eyebrow,
  title,
  description,
  tone = "teal",
  tint = "neutral",
  glow = "none",
  framed = false,
  columns = 3,
  items,
}: CareAnchorSectionProps) {
  return (
    <Section id={id} tint={tint} glow={glow} aria-labelledby={`${id}-heading`}>
      <SectionHeader
        locale={locale}
        tone={tone}
        headingId={`${id}-heading`}
        eyebrow={eyebrow}
        title={title}
        description={description}
      />
      {framed ? (
        <Reveal className="mt-14">
          <div className="glass-frame relative p-5 sm:p-8">
            <span aria-hidden className="glow-pink absolute -end-10 -top-10 h-44 w-44 rounded-full opacity-35" />
            <CareGrid items={items} locale={locale} hashPrefix={hashPrefix} columns={columns} tilt />
          </div>
        </Reveal>
      ) : (
        <div className="mt-14">
          <CareGrid items={items} locale={locale} hashPrefix={hashPrefix} columns={columns} />
        </div>
      )}
    </Section>
  );
}
