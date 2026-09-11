"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon, type IconName } from "@/components/icons/Icon";
import { EASE_PREMIUM } from "@/lib/motion";
import { aboutContent } from "@/data/about";
import type { CareerMilestone } from "@/lib/cms/publicContent";
import type { IntroContent } from "@/lib/cms/publicSections";
import type { Locale } from "@/lib/i18n";
import type { Localized } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Milestone {
  period: Localized;
  title: Localized;
  place: Localized;
  detail?: Localized;
  icon: IconName;
  sortYear: number;
}

const careerIntro = {
  eyebrow: { en: "Career & Professional Journey", ar: "المسيرة والرحلة المهنية" } satisfies Localized,
  title: { en: "From medical school to a dedicated andrology practice", ar: "من كلية الطب إلى ممارسة متخصصة في أمراض الذكورة" } satisfies Localized,
  description: {
    en: "Two decades of training and practice, each step narrowing the focus toward men's reproductive and sexual health.",
    ar: "عقدان من التدريب والممارسة، كل خطوة تضيّق التركيز نحو الصحة الإنجابية والجنسية للرجل.",
  } satisfies Localized,
};

function leadingYear(value: string): number {
  const match = value.match(/\d{4}/g);
  return match ? Math.max(...match.map(Number)) : 0;
}

interface Props {
  locale: Locale;
  milestones?: CareerMilestone[];
  intro?: IntroContent | null;
}

export function CareerJourney({ locale, milestones: input, intro }: Props) {
  const header = intro ?? careerIntro;
  const source: CareerMilestone[] =
    input ??
    [
      ...aboutContent.experience.items.map((item) => ({ id: item.role.en, period: item.period, title: item.role, place: item.place, detail: item.detail, icon: "procedure" as IconName, kind: "role" as const })),
      ...aboutContent.education.items.map((item) => ({ id: item.title.en, period: item.year, title: item.title, place: item.place, icon: "graduation" as IconName, kind: "education" as const })),
    ];

  const milestones: Milestone[] = source
    .map((m) => ({ period: m.period, title: m.title, place: m.place, detail: m.detail, icon: m.icon, sortYear: leadingYear(m.period.en) }))
    .sort((a, b) => b.sortYear - a.sortYear);

  return (
    <Section tint="neutral" glow="teal" aria-labelledby="career-heading">
      <SectionHeader
        locale={locale}
        headingId="career-heading"
        eyebrow={header.eyebrow}
        title={header.title}
        description={header.description}
      />

      <ol className="relative mx-auto mt-16 max-w-3xl lg:max-w-4xl">
        {/* central spine (lg) / start spine (mobile) */}
        <span
          aria-hidden
          className="absolute bottom-3 top-3 w-0.5 rounded-full bg-gradient-to-b from-brand-teal via-brand-teal-soft to-brand-pink start-[0.9rem] lg:start-1/2 lg:-translate-x-1/2 rtl:lg:translate-x-1/2"
        />

        {milestones.map((m, i) => {
          const right = i % 2 === 1;
          return (
            <motion.li
              key={i}
              className={cn(
                "relative ps-11 pb-8 last:pb-0 lg:w-1/2 lg:ps-0",
                right ? "lg:ms-auto lg:ps-12" : "lg:pe-12 lg:text-end"
              )}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.05 + (i % 4) * 0.05, ease: EASE_PREMIUM }}
            >
              {/* node */}
              <span
                className={cn(
                  "glass-card-strong absolute z-10 flex h-8 w-8 items-center justify-center rounded-xl text-brand-teal-deep",
                  "start-0 top-1 lg:top-4",
                  right ? "lg:-start-4" : "lg:-end-4 lg:start-auto"
                )}
              >
                <Icon name={m.icon} className="h-4 w-4" />
              </span>

              <div
                className={cn(
                  "glass-card glass-card-hover glass-sheen rounded-3xl p-5 text-start sm:p-6",
                  !right && "lg:text-end"
                )}
              >
                <span
                  className={cn(
                    "chip-pink inline-flex rounded-full px-3 py-0.5 text-xs font-bold",
                    !right && "lg:ms-auto"
                  )}
                >
                  {m.period[locale]}
                </span>
                <h3 className="mt-2.5 font-heading text-base font-bold text-brand-ink">{m.title[locale]}</h3>
                <p className="mt-1 text-sm font-semibold text-brand-teal-deep">{m.place[locale]}</p>
                {m.detail && (
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">{m.detail[locale]}</p>
                )}
              </div>
            </motion.li>
          );
        })}
      </ol>
    </Section>
  );
}
