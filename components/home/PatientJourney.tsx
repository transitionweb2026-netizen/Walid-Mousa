"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Icon } from "@/components/icons/Icon";
import { EASE_PREMIUM } from "@/lib/motion";
import { journeyIntro, journeySteps as fallbackSteps } from "@/data/journey";
import type { JourneyStep } from "@/data/journey";
import type { IntroContent } from "@/lib/cms/publicSections";
import type { Locale } from "@/lib/i18n";

interface Props {
  locale: Locale;
  steps?: JourneyStep[];
  intro?: IntroContent | null;
}

export function PatientJourney({ locale, steps = fallbackSteps, intro }: Props) {
  const header = intro ?? journeyIntro;
  const cols = steps.length > 0 && steps.length <= 6 ? steps.length : 6;

  return (
    <Section tint="duo" glow="both" aria-labelledby="journey-heading">
      <SectionHeader
        locale={locale}
        headingId="journey-heading"
        eyebrow={header.eyebrow}
        title={header.title}
        description={header.description}
      />

      <div className="relative mt-16">
        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute inset-x-0 top-7 h-0.5 rounded-full bg-brand-line" />
            <motion.div
              className="absolute inset-x-0 top-7 h-0.5 origin-left rounded-full bg-gradient-to-r from-brand-teal to-brand-pink rtl:origin-right"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: EASE_PREMIUM }}
            />
            <ol className="relative grid gap-4" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
              {steps.map((step, i) => (
                <motion.li
                  key={step.id}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.12, ease: EASE_PREMIUM }}
                >
                  <span className="glass-card-strong relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl text-brand-teal-deep">
                    <Icon name={step.icon} className="h-6 w-6" />
                    <span className="absolute -end-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-pink text-[0.6rem] font-black text-white">
                      {step.step}
                    </span>
                  </span>
                  <h3 className="mt-4 text-sm font-bold text-brand-ink">{step.title[locale]}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-brand-muted">{step.description[locale]}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>

        <ol className="relative space-y-6 ps-2 lg:hidden">
          <div className="absolute bottom-4 start-[1.85rem] top-4 w-0.5 rounded-full bg-gradient-to-b from-brand-teal to-brand-pink" />
          {steps.map((step, i) => (
            <motion.li
              key={step.id}
              className="relative flex gap-4"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, ease: EASE_PREMIUM }}
            >
              <span className="glass-card-strong relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-brand-teal-deep">
                <Icon name={step.icon} className="h-6 w-6" />
                <span className="absolute -end-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-pink text-[0.6rem] font-black text-white">
                  {step.step}
                </span>
              </span>
              <div className="pt-1">
                <h3 className="text-sm font-bold text-brand-ink">{step.title[locale]}</h3>
                <p className="mt-1 text-xs leading-relaxed text-brand-muted">{step.description[locale]}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
