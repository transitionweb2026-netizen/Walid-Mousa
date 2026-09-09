import type { Localized } from "@/lib/types";
import type { IconName } from "@/components/icons/Icon";

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: Localized;
  icon: IconName;
}

export const statsIntro = {
  eyebrow: { en: "Track Record", ar: "سجل الإنجاز" } satisfies Localized,
  title: { en: "Numbers built on careful, repeatable work", ar: "أرقام مبنية على عمل دقيق ومتكرر" } satisfies Localized,
  description: {
    en: "Every figure below reflects real andrology practice — not marketing.",
    ar: "كل رقم أدناه يعكس ممارسة حقيقية في أمراض الذكورة — لا دعاية.",
  } satisfies Localized,
};

/** Placeholder figures — replace with the clinic's verified numbers. */
export const stats: StatItem[] = [
  {
    id: "experience",
    value: 18,
    suffix: "+",
    label: { en: "Years of Experience", ar: "سنوات الخبرة" },
    icon: "experience",
  },
  {
    id: "patients",
    value: 12000,
    suffix: "+",
    label: { en: "Patients Cared For", ar: "مريض تمت رعايته" },
    icon: "patients",
  },
  {
    id: "procedures",
    value: 4500,
    suffix: "+",
    label: { en: "Microsurgical Procedures", ar: "عملية ميكروسكوبية" },
    icon: "procedure",
  },
  {
    id: "satisfaction",
    value: 96,
    suffix: "%",
    label: { en: "Patient Satisfaction", ar: "رضا المرضى" },
    icon: "vitality",
  },
];
