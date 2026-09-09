import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { CareGrid } from "@/components/cards/CareGrid";
import { featuredSurgeries, surgeriesIntro } from "@/data/surgeries";
import { surgeryToCard, surgeryToDetail } from "@/lib/careAdapters";
import { siteContent } from "@/data/site";
import type { Locale } from "@/lib/i18n";

export function SurgeriesSection({ locale }: { locale: Locale }) {
  const items = featuredSurgeries.map((s) => ({
    id: s.id,
    slug: s.slug,
    card: surgeryToCard(s),
    detail: surgeryToDetail(s),
  }));

  return (
    <Section tint="teal" glow="teal" aria-labelledby="surgeries-heading">
      <SectionHeader
        locale={locale}
        headingId="surgeries-heading"
        eyebrow={surgeriesIntro.eyebrow}
        title={surgeriesIntro.title}
        description={surgeriesIntro.description}
      />

      {/* Large translucent glass frame the cards sit inside. */}
      <Reveal className="mt-14">
        <div className="glass-frame relative p-5 sm:p-8">
          <span aria-hidden className="glow-pink absolute -end-10 -top-10 h-44 w-44 rounded-full opacity-40" />
          <CareGrid items={items} locale={locale} hashPrefix="surgery" columns={4} tilt />
        </div>
      </Reveal>

      <Reveal className="mt-10 flex justify-center">
        <Button href={`/${locale}/services#surgeries`} withArrow>
          {siteContent.actions.viewAllSurgeries[locale]}
        </Button>
      </Reveal>
    </Section>
  );
}
