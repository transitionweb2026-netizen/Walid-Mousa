import type { Localized } from "@/lib/types";

export interface FaqItem {
  id: string;
  question: Localized;
  answer: Localized;
}

export const faqIntro = {
  eyebrow: { en: "FAQ", ar: "أسئلة شائعة" } satisfies Localized,
  title: { en: "The questions men ask before they call", ar: "الأسئلة التي يطرحها الرجال قبل الاتصال" } satisfies Localized,
  description: {
    en: "If yours isn't here, ask it in confidence through the contact form.",
    ar: "إن لم يكن سؤالك هنا، اطرحه بسرية عبر نموذج التواصل.",
  } satisfies Localized,
};

export const faqItems: FaqItem[] = [
  {
    id: "confidential",
    question: { en: "Is my visit really confidential?", ar: "هل زيارتي سرية فعلًا؟" },
    answer: {
      en: "Yes, without exception. Appointments are scheduled discreetly, records are held under medical confidentiality, and nothing is shared with anyone — including a partner or family member — without your explicit consent. Many patients travel from other cities specifically for this privacy.",
      ar: "نعم، دون استثناء. تُحجز المواعيد بتكتّم، وتُحفظ السجلات وفق السرية الطبية، ولا يُشارك أي شيء مع أحد — بما في ذلك الشريك أو أحد أفراد العائلة — دون موافقتك الصريحة. ويسافر كثير من المرضى من مدن أخرى خصيصًا من أجل هذه الخصوصية.",
    },
  },
  {
    id: "ed-reversible",
    question: { en: "Is erectile dysfunction reversible?", ar: "هل ضعف الانتصاب قابل للعلاج؟" },
    answer: {
      en: "In most men, yes — either fully or to a level that restores a satisfying sex life. The key is treating the cause rather than only the symptom. Once we know whether it's vascular, hormonal, neurological or psychological, we match the treatment to it. Even severe, long-standing ED has a reliable solution.",
      ar: "لدى معظم الرجال، نعم — إما بالكامل أو إلى مستوى يعيد حياة جنسية مُرضية. والمفتاح هو علاج السبب لا العرض فقط. وبمجرد معرفة ما إذا كان وعائيًا أو هرمونيًا أو عصبيًا أو نفسيًا، نُطابق العلاج معه. وحتى ضعف الانتصاب الشديد وطويل الأمد له حل موثوق.",
    },
  },
  {
    id: "varicocele-fertility",
    question: { en: "Does every varicocele need surgery?", ar: "هل تحتاج كل حالة دوالي إلى جراحة؟" },
    answer: {
      en: "No. A varicocele is repaired when it is causing a problem — abnormal semen parameters in a couple trying to conceive, a drop in testosterone, testicular shrinkage, or persistent ache. A small, symptom-free varicocele found incidentally is usually just monitored.",
      ar: "لا. تُصلَح الدوالي عندما تسبب مشكلة — نتائج سائل منوي غير طبيعية لدى زوجين يحاولان الإنجاب، أو انخفاض التستوستيرون، أو ضمور الخصية، أو ألم مستمر. أما الدوالي الصغيرة بلا أعراض والمُكتشفة عرضًا فتُراقَب عادةً فقط.",
    },
  },
  {
    id: "trt-safe",
    question: { en: "Is testosterone replacement safe?", ar: "هل تعويض التستوستيرون آمن؟" },
    answer: {
      en: "It can be, when it is genuinely indicated and properly monitored. Two concerns matter most: it suppresses your own sperm production (a problem if you may want children), and it needs regular checks of blood count and prostate markers. For younger men we often use fertility-sparing alternatives instead. It should never be started on a single blood test.",
      ar: "يمكن أن يكون كذلك، عندما يكون ضروريًا فعلًا وتحت متابعة سليمة. هناك أمران مهمان: يثبّط إنتاجك الطبيعي للحيوانات المنوية (مشكلة إن كنت قد ترغب في الإنجاب)، ويحتاج فحوصات دورية لصورة الدم ودلالات البروستاتا. وللرجال الأصغر سنًا نستخدم غالبًا بدائل تحافظ على الخصوبة. ولا ينبغي البدء به بناءً على تحليل دم واحد.",
    },
  },
  {
    id: "recovery-time",
    question: { en: "How long is recovery after varicocele or scrotal surgery?", ar: "كم مدة التعافي بعد جراحة الدوالي أو كيس الصفن؟" },
    answer: {
      en: "Most men go home the same day. Desk work is fine within 2–3 days, driving after a few days, and full activity including the gym at around two weeks. You'll have a supportive dressing, simple pain relief, and a follow-up to check healing. Improvements in semen results are assessed at three and six months.",
      ar: "يعود معظم الرجال إلى المنزل في نفس اليوم. العمل المكتبي ممكن خلال 2–3 أيام، والقيادة بعد بضعة أيام، والنشاط الكامل بما في ذلك النادي بعد نحو أسبوعين. سيكون لديك ضماد داعم ومسكّن بسيط ومتابعة لفحص الالتئام. ويُقيَّم تحسّن نتائج السائل المنوي عند ثلاثة وستة أشهر.",
    },
  },
  {
    id: "partner",
    question: { en: "Should my partner come to the appointment?", ar: "هل ينبغي أن تأتي شريكتي إلى الموعد؟" },
    answer: {
      en: "For fertility concerns it's very helpful — decisions are easier when you're both in the room and infertility is a shared journey. For other concerns it's entirely your choice. Either way, you decide what is discussed and with whom.",
      ar: "بالنسبة لمشكلات الخصوبة يكون ذلك مفيدًا جدًا — فالقرارات أسهل عندما تكونان معًا، والعقم رحلة مشتركة. وبالنسبة للمشكلات الأخرى فالأمر خيارك بالكامل. وفي كل الأحوال، أنت من يقرر ما يُناقَش ومع من.",
    },
  },
  {
    id: "first-visit",
    question: { en: "What should I bring to my first visit?", ar: "ماذا أحضر في زيارتي الأولى؟" },
    answer: {
      en: "Any previous test results (semen analysis, hormone panels, ultrasound reports), a list of your current medications and supplements, and — if fertility is the issue — your partner's basic results if available. If you have none of this, that's fine; we'll start from the beginning.",
      ar: "أي نتائج فحوصات سابقة (تحليل سائل منوي، تحاليل هرمونات، تقارير أشعة)، وقائمة بأدويتك ومكمّلاتك الحالية، وإن كانت المشكلة تتعلق بالخصوبة فنتائج زوجتك الأساسية إن توفّرت. وإن لم يكن لديك أي من ذلك، فلا بأس؛ سنبدأ من البداية.",
    },
  },
  {
    id: "outside-cairo",
    question: { en: "Do you see patients who live outside Cairo or abroad?", ar: "هل تستقبل مرضى من خارج القاهرة أو من الخارج؟" },
    answer: {
      en: "Yes. A significant number of patients travel from other governorates and from abroad, and where possible we condense consultation, tests and treatment into a single visit. Contact the clinic in advance and we'll help plan the trip around your case.",
      ar: "نعم. يسافر عدد كبير من المرضى من محافظات أخرى ومن الخارج، وحيثما أمكن نُجمِّع الاستشارة والفحوصات والعلاج في زيارة واحدة. تواصل مع العيادة مسبقًا وسنساعدك على تنظيم الزيارة وفق حالتك.",
    },
  },
  {
    id: "how-to-book",
    question: { en: "How do I book an appointment?", ar: "كيف أحجز موعدًا؟" },
    answer: {
      en: "The fastest way is WhatsApp — message the clinic directly and a coordinator will confirm a time that suits you. You can also call the clinic or use the contact form on this site.",
      ar: "أسرع طريقة هي واتساب — راسل العيادة مباشرةً وسيؤكد أحد المنسّقين موعدًا يناسبك. يمكنك أيضًا الاتصال بالعيادة أو استخدام نموذج التواصل في هذا الموقع.",
    },
  },
];
