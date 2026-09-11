import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IconBadge } from "@/components/ui/IconBadge";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Icon } from "@/components/icons/Icon";
import { specialties as fallbackSpecialties, specialtiesIntro as fbIntro } from "@/data/specialties";
import type { Specialty } from "@/data/specialties";
import type { IntroContent } from "@/lib/cms/publicSections";
import type { Locale } from "@/lib/i18n";

interface Props {
  locale: Locale;
  specialties?: Specialty[];
  intro?: IntroContent | null;
}

/**
 * "Choose Your Specialty" — one card per specialty, each anchor-linking to its
 * own treatment section below. Card count == treatment-section count (1:1).
 */
export function SpecialtySelector({ locale, specialties = fallbackSpecialties, intro }: Props) {
  const specialtiesIntro = intro ?? fbIntro;
  const viewLabel = locale === "ar" ? "طرق العلاج" : "Treatment routes";

  return (
    <Section id="specialties" tint="teal" glow="both" aria-labelledby="specialties-heading">
      {/* alias anchors so the Home page's deep links still land here */}
      <span id="treatments" className="block h-0 scroll-mt-24" aria-hidden />
      <span id="problems" className="block h-0 scroll-mt-24" aria-hidden />

      <SectionHeader
        locale={locale}
        headingId="specialties-heading"
        eyebrow={specialtiesIntro.eyebrow}
        title={specialtiesIntro.title}
        description={specialtiesIntro.description}
      />

      <Reveal className="mt-14">
        <div className="glass-frame relative p-5 sm:p-8">
          <span aria-hidden className="glow-pink absolute -end-10 -top-10 h-44 w-44 rounded-full opacity-35" />

          <Stagger className="grid gap-6 sm:grid-cols-2">
            {specialties.map((s) => (
              <StaggerItem key={s.id} className="h-full">
                <a
                  href={`#specialty-${s.slug}`}
                  className="glass-card glass-card-hover glass-sheen group/spec relative flex h-full overflow-hidden rounded-3xl outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal-strong"
                >
                  <span className="relative block w-28 shrink-0 overflow-hidden sm:w-36">
                    <Image
                      src={s.image.src}
                      alt={s.image.alt[locale]}
                      fill
                      sizes="9rem"
                      className="object-cover transition-transform duration-700 group-hover/spec:scale-[1.06]"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-brand-ink/45 to-transparent" />
                  </span>

                  <span className="flex flex-1 flex-col p-5 sm:p-6">
                    <IconBadge icon={s.icon} size="sm" tone="glass" />
                    <span className="mt-3 block font-heading text-base font-bold leading-snug text-brand-ink group-hover/spec:text-brand-teal-deep sm:text-lg">
                      {s.title[locale]}
                    </span>
                    <span className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-brand-muted">
                      {s.tagline[locale]}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-teal-deep">
                      {viewLabel}
                      <span className="chip-pink inline-flex h-5 items-center rounded-full px-2 text-[0.65rem] font-black">
                        {s.treatments.length}
                      </span>
                      <Icon
                        name="chevron-down"
                        className="h-4 w-4 transition-transform duration-300 group-hover/spec:translate-y-0.5"
                      />
                    </span>
                  </span>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Reveal>

      <p className="mt-6 text-center text-xs text-brand-muted">
        {locale === "ar"
          ? "اضغط أي تخصص للانتقال إلى طرق علاجه بالأسفل"
          : "Tap any specialty to jump to its treatment routes below"}
      </p>
    </Section>
  );
}
