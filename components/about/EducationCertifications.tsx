import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Icon } from "@/components/icons/Icon";
import { aboutContent } from "@/data/about";
import type { Locale } from "@/lib/i18n";

export function EducationCertifications({ locale }: { locale: Locale }) {
  const { education, certifications } = aboutContent;

  return (
    <Section tint="neutral" aria-labelledby="education-heading">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Education */}
        <div>
          <SectionHeader
            locale={locale}
            align="start"
            headingId="education-heading"
            eyebrow={education.eyebrow}
            title={education.heading}
          />
          <Stagger className="mt-10 space-y-4">
            {education.items.map((item, i) => (
              <StaggerItem key={i}>
                <div className="glass-card glass-card-hover glass-sheen flex items-start gap-4 rounded-2xl p-5">
                  <span className="chip-teal flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-black">
                    {item.year[locale]}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-brand-ink">{item.title[locale]}</h3>
                    <p className="mt-1 text-xs text-brand-muted">{item.place[locale]}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* Certifications / memberships */}
        <div>
          <SectionHeader
            locale={locale}
            align="start"
            tone="pink"
            eyebrow={certifications.eyebrow}
            title={certifications.heading}
          />
          <Reveal className="mt-10">
            <ul className="flex flex-col gap-3">
              {certifications.items.map((item, i) => (
                <li
                  key={i}
                  className="glass-panel flex items-center gap-3 rounded-2xl px-4 py-3.5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-white">
                    <Icon name="shield" className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-brand-ink">{item.title[locale]}</p>
                    <p className="text-xs text-brand-muted">{item.issuer[locale]}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
