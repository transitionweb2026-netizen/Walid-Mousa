import type { Localized } from "@/lib/types";
import type { IconName } from "@/components/icons/Icon";

export interface JourneyStep {
  id: string;
  step: number;
  icon: IconName;
  title: Localized;
  description: Localized;
}

export const journeyIntro = {
  eyebrow: { en: "The Patient Journey", ar: "رحلة المريض" } satisfies Localized,
  title: { en: "What happens from your first message to your last follow-up", ar: "ما يحدث من أول رسالة حتى آخر متابعة" } satisfies Localized,
  description: {
    en: "A clear, unhurried path — you always know what the next step is and why.",
    ar: "مسار واضح وغير متعجّل — تعرف دائمًا ما هي الخطوة التالية ولماذا.",
  } satisfies Localized,
};

export const journeySteps: JourneyStep[] = [
  {
    id: "contact",
    step: 1,
    icon: "consultation",
    title: { en: "Confidential Contact", ar: "تواصل سري" },
    description: {
      en: "Reach out by phone, WhatsApp or form. A coordinator answers your questions and finds a discreet appointment time.",
      ar: "تواصل عبر الهاتف أو واتساب أو النموذج. يجيب منسّق على أسئلتك ويحدد موعدًا خاصًا مناسبًا.",
    },
  },
  {
    id: "consultation",
    step: 2,
    icon: "consultation",
    title: { en: "Private Consultation", ar: "استشارة خاصة" },
    description: {
      en: "An unrushed conversation and focused examination. Nothing is assumed; every question is welcome.",
      ar: "حوار غير متعجّل وفحص مركّز. لا شيء يُفترض؛ وكل سؤال مُرحَّب به.",
    },
  },
  {
    id: "diagnosis",
    step: 3,
    icon: "diagnosis",
    title: { en: "Diagnosis & Testing", ar: "التشخيص والفحوصات" },
    description: {
      en: "Targeted labs, hormone panels, ultrasound or semen analysis — only the tests that will actually change the plan.",
      ar: "تحاليل مستهدفة، وهرمونات، وأشعة أو تحليل سائل منوي — فقط الفحوصات التي ستغيّر الخطة فعلًا.",
    },
  },
  {
    id: "plan",
    step: 4,
    icon: "plan",
    title: { en: "Personalized Plan", ar: "خطة مخصّصة" },
    description: {
      en: "Your results explained plainly, with every reasonable option, its evidence, and its trade-offs. You choose the direction.",
      ar: "نتائجك مشروحة ببساطة، مع كل خيار معقول ودليله وموازناته. أنت من يختار الاتجاه.",
    },
  },
  {
    id: "procedure",
    step: 5,
    icon: "procedure",
    title: { en: "Treatment or Procedure", ar: "العلاج أو الإجراء" },
    description: {
      en: "Medical therapy, in-clinic treatment, or microsurgery in an accredited theatre — most procedures are same-day.",
      ar: "علاج دوائي، أو علاج بالعيادة، أو جراحة ميكروسكوبية في غرفة عمليات معتمدة — معظم الإجراءات في نفس اليوم.",
    },
  },
  {
    id: "followup",
    step: 6,
    icon: "follow-up",
    title: { en: "Follow-up & Support", ar: "المتابعة والدعم" },
    description: {
      en: "Scheduled reviews to confirm progress, adjust treatment, and support you — and your partner — through the outcome.",
      ar: "مراجعات مجدولة لتأكيد التقدّم وضبط العلاج ودعمك — وشريكتك — حتى الوصول للنتيجة.",
    },
  },
];
