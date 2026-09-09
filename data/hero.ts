import type { Localized, MediaImage } from "@/lib/types";
import { IMG } from "./images";

export interface HeroContent {
  eyebrow: Localized;
  headline: Localized;
  headlineAccent: Localized;
  description: Localized;
  image: MediaImage;
}

type HeroKey = "home" | "about" | "services" | "contact";

/**
 * One hero design, four sets of copy + cover image. Every page's <Hero>
 * pulls its content from here by key.
 */
export const heroes: Record<HeroKey, HeroContent> = {
  home: {
    eyebrow: {
      en: "Andrology · Men's Health · Male Fertility",
      ar: "أمراض الذكورة · صحة الرجل · الخصوبة",
    },
    headline: {
      en: "Confident Men's Health Care,",
      ar: "رعاية واثقة لصحة الرجل،",
    },
    headlineAccent: {
      en: "Handled with Total Discretion",
      ar: "بسرية تامة واحترافية",
    },
    description: {
      en: "Dr. Walid Moussa is a consultant andrologist treating erectile dysfunction, male infertility, varicocele and hormonal health — precise microsurgery and evidence-based therapy, from a first private consultation to full recovery.",
      ar: "د. وليد موسى استشاري أمراض الذكورة، يعالج ضعف الانتصاب والعقم عند الرجال ودوالي الخصية والصحة الهرمونية — جراحة دقيقة وعلاج قائم على الدليل العلمي، من أول استشارة خاصة وحتى التعافي الكامل.",
    },
    image: {
      src: IMG.doctorHero,
      alt: {
        en: "Dr. Walid Moussa, consultant andrologist",
        ar: "د. وليد موسى، استشاري أمراض الذكورة",
      },
      position: "center 20%",
    },
  },

  about: {
    eyebrow: { en: "About Dr. Walid Moussa", ar: "عن د. وليد موسى" },
    headline: { en: "Two Decades Devoted to", ar: "عقدان من العمل المتخصص في" },
    headlineAccent: { en: "Men's Health", ar: "صحة الرجل" },
    description: {
      en: "A consultant andrologist and microsurgeon whose practice is built on precision, privacy and a genuine understanding of how personal these concerns are.",
      ar: "استشاري أمراض ذكورة وجرّاح ميكروسكوبي، بُنيت ممارسته على الدقة والخصوصية والتفهّم الحقيقي لمدى خصوصية هذه المشكلات.",
    },
    image: {
      src: IMG.doctorConsult,
      alt: {
        en: "Dr. Walid Moussa in consultation",
        ar: "د. وليد موسى أثناء الاستشارة",
      },
      position: "center 25%",
    },
  },

  services: {
    eyebrow: { en: "Services", ar: "الخدمات" },
    headline: { en: "Complete Andrology Care", ar: "رعاية متكاملة لأمراض الذكورة" },
    headlineAccent: { en: "Under One Roof", ar: "في مكان واحد" },
    description: {
      en: "Diagnostic work-ups, microsurgery, sexual-health therapy and hormonal management — every service explained clearly so you know exactly what to expect.",
      ar: "فحوصات تشخيصية، وجراحة ميكروسكوبية، وعلاج للصحة الجنسية، وإدارة هرمونية — كل خدمة مشروحة بوضوح لتعرف تمامًا ما الذي تتوقعه.",
    },
    image: {
      src: IMG.operatingRoom,
      alt: {
        en: "Modern operating theatre",
        ar: "غرفة عمليات حديثة",
      },
      position: "center 40%",
    },
  },

  contact: {
    eyebrow: { en: "Contact Us", ar: "تواصل معنا" },
    headline: { en: "Book a Private", ar: "احجز استشارة" },
    headlineAccent: { en: "Consultation", ar: "خاصة" },
    description: {
      en: "Reach the clinic by phone, WhatsApp or the form below. Every message is read in strict confidence and answered quickly.",
      ar: "تواصل مع العيادة عبر الهاتف أو واتساب أو النموذج أدناه. تُقرأ كل رسالة بسرية تامة ويتم الرد بسرعة.",
    },
    image: {
      src: IMG.consultRoom,
      alt: {
        en: "Welcoming clinic consultation room",
        ar: "غرفة استشارة مريحة بالعيادة",
      },
      position: "center 35%",
    },
  },
};
