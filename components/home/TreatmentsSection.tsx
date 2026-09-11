import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { CareGrid } from "@/components/cards/CareGrid";
import { treatmentsIntro } from "@/data/treatments";
import { specialties as fallbackSpecialties } from "@/data/specialties";
import { conditionToCard, conditionToDetail } from "@/lib/careAdapters";
import type { ConditionCardItem } from "@/lib/cms/publicContent";
import { siteContent } from "@/data/site";
import type { IntroContent } from "@/lib/cms/publicSections";
import type { Locale } from "@/lib/i18n";

interface Props {
  locale: Locale;
  conditions?: ConditionCardItem[];
  intro?: IntroContent | null;
}

const fbConditions: ConditionCardItem[] = fallbackSpecialties.slice(0, 4).map((s) => ({
  id: s.id,
  slug: s.slug,
  icon: s.icon,
  image: s.image,
  title: s.title,
  tagline: s.tagline,
  description: s.description,
  details: { en: [s.description.en], ar: [s.description.ar] },
  signs: { en: [], ar: [] },
}));

export function TreatmentsSection({ locale, conditions = fbConditions, intro }: Props) {
  const header = intro ?? treatmentsIntro;
  const items = conditions.slice(0, 4).map((c) => ({
    id: c.id,
    slug: c.slug,
    card: conditionToCard(c),
    detail: conditionToDetail(c),
  }));

  return (
    <Section tint="pink" glow="pink" aria-labelledby="treatments-heading">
      <SectionHeader
        locale={locale}
        tone="pink"
        headingId="treatments-heading"
        eyebrow={header.eyebrow}
        title={header.title}
        description={header.description}
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
