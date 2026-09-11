import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CareGrid } from "@/components/cards/CareGrid";
import { technologies as fallbackTech, technologiesIntro } from "@/data/technologies";
import type { TechnologyItem } from "@/data/technologies";
import { technologyToCard, technologyToDetail } from "@/lib/careAdapters";
import type { IntroContent } from "@/lib/cms/publicSections";
import type { Locale } from "@/lib/i18n";

interface Props {
  locale: Locale;
  technologies?: TechnologyItem[];
  intro?: IntroContent | null;
}

export function TechnologiesSection({ locale, technologies = fallbackTech, intro }: Props) {
  const header = intro ?? technologiesIntro;
  const items = technologies.map((t) => ({
    id: t.id,
    slug: t.slug,
    card: technologyToCard(t),
    detail: technologyToDetail(t),
  }));

  return (
    <Section tint="neutral" aria-labelledby="technologies-heading">
      <SectionHeader
        locale={locale}
        headingId="technologies-heading"
        eyebrow={header.eyebrow}
        title={header.title}
        description={header.description}
      />
      <div className="mt-14">
        <CareGrid items={items} locale={locale} hashPrefix="technology" columns={4} />
      </div>
    </Section>
  );
}
