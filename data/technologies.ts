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
  {
    id: "shockwave-therapy",
    slug: "low-intensity-shockwave-therapy",
    icon: "wave",
    image: { src: IMG.bpCheck, alt: { en: "Low-intensity shockwave therapy device", ar: "جهاز العلاج بالموجات التصادمية منخفضة الشدة" } },
    name: { en: "Low-Intensity Shockwave Therapy", ar: "الموجات التصادمية منخفضة الشدة" },
    explanation: {
      en: "A non-invasive, drug-free course of acoustic waves that stimulates new blood-vessel growth in the penis for mild-to-moderate vascular ED.",
      ar: "جلسات غير جراحية وخالية من الأدوية من الموجات الصوتية تحفّز نمو أوعية دموية جديدة في القضيب لضعف الانتصاب الوعائي الخفيف إلى المتوسط.",
    },
    details: {
      en: [
        "Li-ESWT delivers thousands of low-energy pulses across several short sessions. The micro-stress triggers angiogenesis — the body's own repair response — improving inflow over the following weeks to months.",
        "It suits men with vascular ED who want to reduce or stop medication, and it is often combined with cardiometabolic treatment. Sessions are about 20 minutes, painless, and need no anaesthesia or downtime.",
      ],
      ar: [
        "يقدّم العلاج آلاف النبضات منخفضة الطاقة عبر عدة جلسات قصيرة. ويحفّز الإجهاد الدقيق تكوّن أوعية دموية جديدة — استجابة الإصلاح الطبيعية للجسم — مما يحسّن التدفق خلال الأسابيع إلى الأشهر التالية.",
        "يناسب الرجال المصابين بضعف انتصاب وعائي الراغبين في تقليل الدواء أو إيقافه، وغالبًا ما يُدمج مع علاج القلب والأيض. الجلسات نحو 20 دقيقة، بلا ألم، ولا تحتاج تخديرًا أو فترة نقاهة.",
      ],
    },
  },
  {
    id: "penile-doppler",
    slug: "penile-doppler-ultrasound",
    icon: "ultrasound",
    image: { src: IMG.monitors, alt: { en: "Doppler ultrasound machine", ar: "جهاز الموجات فوق الصوتية دوبلر" } },
    name: { en: "Penile Doppler Ultrasound", ar: "دوبلر القضيب بالموجات فوق الصوتية" },
    explanation: {
      en: "A same-visit scan that measures arterial inflow and checks for venous leak — turning 'ED' into a specific, treatable diagnosis.",
      ar: "فحص في نفس الزيارة يقيس تدفق الدم الشرياني ويكشف التسرّب الوريدي — يحوّل «ضعف الانتصاب» إلى تشخيص محدد قابل للعلاج.",
    },
    details: {
      en: [
        "After a small test injection to produce an erection, Dr. Moussa images the cavernosal arteries and measures peak systolic and end-diastolic velocities. Low inflow points to an arterial problem; a failure to hold the erection with high diastolic flow points to venous leak.",
        "This distinction changes everything downstream — from whether shockwave therapy is likely to help, to whether an implant is the sensible endpoint. It also screens for Peyronie's plaques and calcification.",
      ],
      ar: [
        "بعد حقنة اختبار صغيرة لإحداث الانتصاب، يصوّر د. موسى شرايين القضيب ويقيس سرعات الدم الانقباضية والانبساطية. يشير التدفق المنخفض إلى مشكلة شريانية؛ ويشير عدم القدرة على الحفاظ على الانتصاب مع تدفق انبساطي مرتفع إلى تسرّب وريدي.",
        "هذا التمييز يغيّر كل ما يليه — من احتمال فائدة الموجات التصادمية، إلى ما إذا كانت الدعامة هي النهاية المنطقية. كما يكشف لويحات وتكلّسات بيروني.",
      ],
    },
  },
  {
    id: "andrology-lab",
    slug: "andrology-lab-and-semen-analysis",
    icon: "lab",
    image: { src: IMG.labSamples, alt: { en: "Andrology laboratory sample analysis", ar: "تحليل عيّنات في مختبر أمراض الذكورة" } },
    name: { en: "Andrology Lab & Semen Analysis", ar: "مختبر أمراض الذكورة وتحليل السائل المنوي" },
    explanation: {
      en: "WHO-standard, computer-assisted semen analysis plus DNA-fragmentation and oxidative-stress testing — the foundation of any fertility plan.",
      ar: "تحليل سائل منوي بمعايير منظمة الصحة العالمية بمساعدة الحاسوب، مع فحص تفتّت الحمض النووي والإجهاد التأكسدي — أساس أي خطة خصوبة.",
    },
    details: {
      en: [
        "A reliable semen analysis is harder than it looks: it needs a strict abstinence window, rapid processing, a trained technician and calibrated equipment. Computer-assisted analysis (CASA) adds objective, repeatable measures of concentration and motility.",
        "Beyond the basic count, the lab runs sperm DNA-fragmentation and reactive-oxygen-species testing — markers that explain 'unexplained' infertility and recurrent miscarriage, and that often improve after a varicocele repair or an antioxidant and lifestyle programme.",
      ],
      ar: [
        "التحليل الموثوق للسائل المنوي أصعب مما يبدو: يحتاج فترة امتناع محددة، ومعالجة سريعة، وفنيًا مدرَّبًا، وأجهزة معايَرة. ويضيف التحليل بمساعدة الحاسوب مقاييس موضوعية وقابلة للتكرار للتركيز والحركة.",
        "إلى جانب العدّ الأساسي، يجري المختبر فحص تفتّت الحمض النووي للحيوانات المنوية وفحص الشقوق الأكسجينية النشطة — وهي مؤشرات تفسّر العقم «غير المبرَّر» والإجهاض المتكرر، وغالبًا ما تتحسّن بعد إصلاح الدوالي أو برنامج مضادات أكسدة ونمط حياة.",
      ],
    },
  },
];
