import type { Localized } from "@/lib/types";

export interface ReviewItem {
  id: string;
  name: Localized;
  context: Localized;
  rating: number;
  quote: Localized;
}

export const reviewsIntro = {
  eyebrow: { en: "Patient Words", ar: "كلمات المرضى" } satisfies Localized,
  title: { en: "Quiet results people are glad they came for", ar: "نتائج هادئة سعِد أصحابها بأنهم جاؤوا من أجلها" } satisfies Localized,
  description: {
    en: "Shared with permission. Names are shortened to protect privacy.",
    ar: "منشورة بإذن أصحابها. الأسماء مختصرة حفاظًا على الخصوصية.",
  } satisfies Localized,
};

export const reviews: ReviewItem[] = [
  {
    id: "r1",
    name: { en: "Ahmed S.", ar: "أحمد س." },
    context: { en: "Varicocele microsurgery", ar: "جراحة دوالي ميكروسكوبية" },
    rating: 5,
    quote: {
      en: "I had put this off for two years out of embarrassment. Dr. Moussa made the whole thing feel routine and matter-of-fact. Six months after the operation my results had more than doubled and my wife is now pregnant.",
      ar: "أجّلت هذا الأمر عامين بسبب الإحراج. جعله د. موسى يبدو أمرًا روتينيًا وطبيعيًا تمامًا. بعد ستة أشهر من العملية تضاعفت نتائجي أكثر من مرتين، وزوجتي الآن حامل.",
    },
  },
  {
    id: "r2",
    name: { en: "M. K.", ar: "م. ك." },
    context: { en: "Erectile dysfunction", ar: "ضعف الانتصاب" },
    rating: 5,
    quote: {
      en: "What stood out was that he actually investigated the cause instead of just handing me a prescription. It turned out to be blood pressure and hormones. Fixing those fixed most of the problem.",
      ar: "ما لفت انتباهي أنه بحث فعلًا عن السبب بدلًا من مجرد إعطائي وصفة. تبيّن أنه ضغط الدم والهرمونات. وعلاج ذلك عالج معظم المشكلة.",
    },
  },
  {
    id: "r3",
    name: { en: "Karim H.", ar: "كريم ح." },
    context: { en: "Penile implant", ar: "دعامة القضيب" },
    rating: 5,
    quote: {
      en: "After prostate cancer I thought that part of my life was over. The implant gave it back completely. The consultation was honest about what to expect and the reality matched it exactly.",
      ar: "بعد سرطان البروستاتا ظننت أن هذا الجزء من حياتي قد انتهى. أعادته الدعامة بالكامل. كانت الاستشارة صادقة بشأن ما يجب توقعه، وطابق الواقع ذلك تمامًا.",
    },
  },
  {
    id: "r4",
    name: { en: "Y. A.", ar: "ي. ع." },
    context: { en: "Vasectomy reversal", ar: "عكس قطع الحبل المنوي" },
    rating: 5,
    quote: {
      en: "Remarried and wanted a child with my wife. The reversal was done in a morning and I was home by lunch. Sperm were back in the test at three months, exactly as he said.",
      ar: "تزوجت مجددًا وأردت طفلًا مع زوجتي. أُجريت عملية العكس في صباح واحد وعدت للمنزل وقت الغداء. عادت الحيوانات المنوية في التحليل خلال ثلاثة أشهر، تمامًا كما قال.",
    },
  },
  {
    id: "r5",
    name: { en: "Tarek B.", ar: "طارق ب." },
    context: { en: "Low testosterone", ar: "نقص هرمون الذكورة" },
    rating: 4,
    quote: {
      en: "I came in convinced I needed testosterone injections. He showed me the sleep apnoea and weight were driving it, and started a plan that kept my fertility intact. Energy is back and we're still trying for a second child.",
      ar: "جئت وأنا مقتنع أنني أحتاج حقن تستوستيرون. أراني أن انقطاع النفس النومي والوزن هما السبب، وبدأ خطة حافظت على خصوبتي. عادت طاقتي وما زلنا نحاول لإنجاب طفل ثانٍ.",
    },
  },
];
