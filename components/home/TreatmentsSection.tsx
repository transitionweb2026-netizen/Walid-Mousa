import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { CareGrid } from "@/components/cards/CareGrid";
import { featuredTreatments, treatmentsIntro } from "@/data/treatments";
import { treatmentToCard, treatmentToDetail } from "@/lib/careAdapters";
import { siteContent } from "@/data/site";
import type { Locale } from "@/lib/i18n";

export function TreatmentsSection({ locale }: { locale: Locale }) {
  const items = featuredTreatments.map((t) => ({
    id: t.id,
    slug: t.slug,
    card: treatmentToCard(t),
    detail: treatmentToDetail(t),
  }));

  return (
    <Section tint="pink" glow="pink" aria-labelledby="treatments-heading">
      <SectionHeader
        locale={locale}
        tone="pink"
        headingId="treatments-heading"
        eyebrow={treatmentsIntro.eyebrow}
        title={treatmentsIntro.title}
        description={treatmentsIntro.description}
      />

      <div className="mt-14">
        <CareGrid items={items} locale={locale} hashPrefix="treatment" columns={4} />
      </div>

      <Reveal className="mt-10 flex justify-center">
        <Button href={`/${locale}/services#treatments`} withArrow>
          {siteContent.actions.exploreTreatments[locale]}
        </Button>
      </Reveal>
    </Section>
  );
}
