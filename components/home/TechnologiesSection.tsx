import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CareGrid } from "@/components/cards/CareGrid";
import { technologies, technologiesIntro } from "@/data/technologies";
import { technologyToCard, technologyToDetail } from "@/lib/careAdapters";
import type { Locale } from "@/lib/i18n";

export function TechnologiesSection({ locale }: { locale: Locale }) {
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
        eyebrow={technologiesIntro.eyebrow}
        title={technologiesIntro.title}
        description={technologiesIntro.description}
      />
      <div className="mt-14">
        <CareGrid items={items} locale={locale} hashPrefix="technology" columns={4} />
      </div>
    </Section>
  );
}
