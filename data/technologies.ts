import type { Localized, MediaImage } from "@/lib/types";
import type { IconName } from "@/components/icons/Icon";
import { IMG } from "./images";

export interface TechnologyItem {
  id: string;
  slug: string;
  icon: IconName;
  image: MediaImage;
  name: Localized;
  explanation: Localized;
  /** Extra detail for the Services page. */
  details: Localized<string[]>;
}

export const technologiesIntro = {
  eyebrow: { en: "Technology", ar: "التقنيات" } satisfies Localized,
  title: { en: "The equipment behind the results", ar: "الأجهزة وراء النتائج" } satisfies Localized,
  description: {
    en: "Precise diagnosis and precise surgery both depend on the right tools — here is what the clinic relies on.",
    ar: "التشخيص الدقيق والجراحة الدقيقة يعتمدان على الأدوات المناسبة — إليك ما تعتمد عليه العيادة.",
  } satisfies Localized,
};

export const technologies: TechnologyItem[] = [
  {
    id: "operating-microscope",
    slug: "operating-microscope",
    icon: "microscope",
    image: { src: IMG.microscope, alt: { en: "Surgical operating microscope", ar: "مجهر جراحي" } },
    name: { en: "Surgical Operating Microscope", ar: "المجهر الجراحي" },
    explanation: {
      en: "Up to 25× magnification for varicocele repair, vasectomy reversal and micro-TESE — the difference between good and excellent outcomes.",
      ar: "تكبير يصل إلى 25 مرة لإصلاح الدوالي وعكس القطع وميكرو-تيسي — الفرق بين النتائج الجيدة والممتازة.",
    },
    details: {
      en: [
        "Microsurgery means operating on structures a millimetre or less across — the testicular artery, individual sperm-carrying channels, the fine lymphatics that must be spared to avoid a hydrocele.",
        "The microscope, combined with micro-instruments and sutures finer than hair, lets Dr. Moussa preserve exactly what matters and repair exactly what is damaged. Published data consistently show microsurgical techniques outperform open and laparoscopic ones on recurrence, complications and pregnancy rates.",
      ],
      ar: [
        "الجراحة الميكروسكوبية تعني العمل على تراكيب لا يتجاوز عرضها مليمترًا واحدًا — شريان الخصية، والقنوات الناقلة للحيوانات المنوية، والأوعية اللمفاوية الدقيقة التي يجب الحفاظ عليها لتجنّب الاستسقاء.",
        "المجهر، مع أدوات وخيوط ميكروسكوبية أدق من الشعر، يتيح لد. موسى الحفاظ على ما يهم بالضبط وإصلاح ما هو تالف بالضبط. وتُظهر البيانات المنشورة باستمرار تفوّق التقنيات الميكروسكوبية على المفتوحة وبالمنظار في الانتكاس والمضاعفات ومعدلات الحمل.",
      ],
    },
  },
];
