import type { Localized } from "@/lib/types";

/** The site's single Final CTA card, shown at the foot of every page. */
export const ctaContent: {
  eyebrow: Localized;
  title: Localized;
  description: Localized;
  whatsappLabel: Localized;
  contactLabel: Localized;
  /** Prefilled WhatsApp message. */
  whatsappMessage: Localized;
} = {
  eyebrow: { en: "Take the First Step", ar: "اتخذ الخطوة الأولى" },
  title: {
    en: "A private conversation is where every solution starts",
    ar: "الحوار الخاص هو حيث يبدأ كل حل",
  },
  description: {
    en: "Whatever you've been putting off asking about — bring it to a confidential consultation with Dr. Walid Moussa. Clear answers, no judgement, and a plan that's yours to choose.",
    ar: "أيًّا كان ما أجّلت السؤال عنه — أحضِره إلى استشارة سرية مع د. وليد موسى. إجابات واضحة، دون أحكام، وخطة أنت من يختارها.",
  },
  whatsappLabel: { en: "Message on WhatsApp", ar: "راسلنا على واتساب" },
  contactLabel: { en: "Go to Contact Page", ar: "اذهب لصفحة التواصل" },
  whatsappMessage: {
    en: "Hello Dr. Walid Moussa's clinic, I'd like to book a confidential consultation.",
    ar: "مرحبًا عيادة د. وليد موسى، أود حجز استشارة سرية.",
  },
};
