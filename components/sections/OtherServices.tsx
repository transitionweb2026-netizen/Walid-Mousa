import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IconBadge } from "@/components/ui/IconBadge";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import type { IconName } from "@/components/icons/Icon";
import type { OtherServiceItem } from "@/lib/cms/publicContent";
import type { IntroContent } from "@/lib/cms/publicSections";
import type { Locale } from "@/lib/i18n";
import type { Localized } from "@/lib/types";

const fbIntro = {
  eyebrow: { en: "Also Available", ar: "متاح أيضًا" } satisfies Localized,
  title: { en: "Beyond procedures and prescriptions", ar: "أبعد من الإجراءات والوصفات" } satisfies Localized,
  description: {
    en: "Supporting services that make the whole experience easier and more thorough.",
    ar: "خدمات مساندة تجعل التجربة بأكملها أسهل وأكثر شمولًا.",
  } satisfies Localized,
};

const fbItems: { icon: IconName; title: Localized; text: Localized }[] = [
  {
    icon: "consultation",
    title: { en: "Second-Opinion Consultations", ar: "استشارات الرأي الثاني" },
    text: {
      en: "A structured review of an existing diagnosis or a recommended operation, with a written summary you can keep.",
      ar: "مراجعة منظّمة لتشخيص قائم أو عملية موصى بها، مع ملخّص مكتوب تحتفظ به.",
    },
  },
  {
    icon: "lab",
    title: { en: "On-Site Andrology Laboratory", ar: "مختبر أمراض ذكورة في الموقع" },
    text: {
      en: "WHO-standard semen analysis, DNA-fragmentation and hormone testing processed without delay.",
      ar: "تحليل سائل منوي بمعايير منظمة الصحة العالمية، وفحص تفتّت الحمض النووي والهرمونات دون تأخير.",
    },
  },
  {
    icon: "globe",
    title: { en: "Care for Travelling Patients", ar: "رعاية المرضى المسافرين" },
    text: {
      en: "Consolidated work-up and surgery scheduling for patients coming from other cities or abroad.",
      ar: "تجميع الفحوصات وجدولة الجراحة للمرضى القادمين من مدن أخرى أو من الخارج.",
    },
  },
  {
    icon: "follow-up",
    title: { en: "Couple & Partner Support", ar: "دعم الزوجين والشريك" },
    text: {
      en: "Joint appointments for fertility decisions, and referral to counselling when it helps.",
      ar: "مواعيد مشتركة لقرارات الخصوبة، وتحويل للاستشارة النفسية عند الفائدة.",
    },
  },
];

interface Props {
  locale: Locale;
  items?: OtherServiceItem[];
  intro?: IntroContent | null;
}

export function OtherServices({ locale, items, intro }: Props) {
  const header = intro ?? fbIntro;
  const list = items ?? fbItems.map((it, i) => ({ id: String(i), ...it }));
  return (
    <Section tint="duo" glow="both" aria-labelledby="other-services-heading">
      <SectionHeader
        locale={locale}
        headingId="other-services-heading"
        eyebrow={header.eyebrow}
        title={header.title}
        description={header.description}
      />
      <Stagger className="mt-14 grid gap-6 sm:grid-cols-2">
        {list.map((item, i) => (
          <StaggerItem key={i} className="h-full">
            <div className="glass-card glass-card-hover glass-sheen flex h-full items-start gap-4 rounded-3xl p-6">
              <IconBadge icon={item.icon} size="md" tone={i % 2 ? "pink" : "solid"} />
              <div>
                <h3 className="text-base font-bold text-brand-ink">{item.title[locale]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{item.text[locale]}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
