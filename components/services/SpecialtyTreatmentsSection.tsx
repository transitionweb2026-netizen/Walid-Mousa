import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { IconBadge } from "@/components/ui/IconBadge";
import { CareGrid } from "@/components/cards/CareGrid";
import { specialtyTreatmentToCard, specialtyTreatmentToDetail } from "@/lib/careAdapters";
import type { Specialty } from "@/data/specialties";
import type { Locale } from "@/lib/i18n";

interface Props {
  specialty: Specialty;
  locale: Locale;
  index: number;
}

const tints = ["neutral", "pink", "teal", "duo"] as const;
const tones = ["teal", "pink"] as const;

/**
 * One specialty's treatment section: header + a 4-card grid whose cards open
 * the shared glass detail modal. `id="specialty-<slug>"` is the scroll target
 * for the matching card in <SpecialtySelector>.
 */
export function SpecialtyTreatmentsSection({ specialty, locale, index }: Props) {
  const items = specialty.treatments.map((t) => ({
    id: t.id,
    slug: t.slug,
    card: specialtyTreatmentToCard(t),
    detail: specialtyTreatmentToDetail(t),
  }));

  const tint = tints[index % tints.length];
  const tone = tones[index % tones.length];
  const headingId = `specialty-${specialty.slug}-heading`;

  return (
    <Section
      id={`specialty-${specialty.slug}`}
      tint={tint}
      glow={index % 2 === 0 ? "teal" : "pink"}
      aria-labelledby={headingId}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <IconBadge icon={specialty.icon} size="lg" tone={index % 2 === 0 ? "solid" : "pink"} />
        <SectionHeader
          locale={locale}
          tone={tone}
          headingId={headingId}
          eyebrow={{ en: "Treatment Routes", ar: "طرق العلاج" }}
          title={specialty.title}
          description={specialty.description}
        />
      </div>

      <Reveal className="mt-14">
        <div className="glass-frame relative p-5 sm:p-8">
          <span
            aria-hidden
            className={`${index % 2 === 0 ? "glow-pink" : "glow-teal"} absolute -end-10 -top-10 h-44 w-44 rounded-full opacity-35`}
          />
          <CareGrid
            items={items}
            locale={locale}
            hashPrefix={`tx-${specialty.slug}`}
            columns={4}
            tilt
          />
        </div>
      </Reveal>
    </Section>
  );
}
