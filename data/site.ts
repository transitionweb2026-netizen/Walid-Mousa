import type { Localized } from "@/lib/types";

/**
 * Global site identity, SEO defaults and reusable UI microcopy — one
 * logical content group (the future CMS "Site Settings" singleton).
 */
export const siteContent = {
  brand: {
    name: "Dr. Walid Moussa",
    nameLocalized: {
      en: "Dr. Walid Moussa",
      ar: "د. وليد موسى",
    } satisfies Localized,
    credentials: {
      en: "Andrology & Male Infertility Specialist",
      ar: "استشاري أمراض الذكورة والعقم عند الرجال",
    } satisfies Localized,
  },

  seo: {
    titleTemplate: {
      en: "%s | Dr. Walid Moussa — Andrology Specialist",
      ar: "%s | د. وليد موسى - استشاري أمراض الذكورة",
    } satisfies Localized,
    defaultTitle: {
      en: "Dr. Walid Moussa | Andrology, Men's Health & Male Infertility",
      ar: "د. وليد موسى | أمراض الذكورة وصحة الرجل والعقم",
    } satisfies Localized,
    defaultDescription: {
      en: "Dr. Walid Moussa is a consultant andrologist specializing in erectile dysfunction, male infertility, varicocele microsurgery and hormonal health — discreet, evidence-based care from diagnosis to recovery.",
      ar: "د. وليد موسى استشاري أمراض الذكورة، متخصص في علاج ضعف الانتصاب والعقم عند الرجال وجراحة دوالي الخصية الدقيقة والصحة الهرمونية — رعاية سرية قائمة على الدليل العلمي من التشخيص حتى التعافي.",
    } satisfies Localized,
    keywords: {
      en: [
        "andrologist",
        "male infertility",
        "erectile dysfunction treatment",
        "varicocele surgery",
        "low testosterone",
        "men's sexual health",
        "premature ejaculation",
        "microsurgery",
      ],
      ar: [
        "استشاري ذكورة",
        "علاج العقم عند الرجال",
        "علاج ضعف الانتصاب",
        "جراحة دوالي الخصية",
        "نقص هرمون الذكورة",
        "الصحة الجنسية للرجل",
        "سرعة القذف",
        "الجراحة الميكروسكوبية",
      ],
    } satisfies Localized<string[]>,
  },

  /** Shared action labels reused across Navbar, Hero, CTA, cards, etc. */
  actions: {
    bookAppointment: { en: "Book an Appointment", ar: "احجز موعدك" } satisfies Localized,
    exploreServices: { en: "Explore Services", ar: "استكشف الخدمات" } satisfies Localized,
    contactUs: { en: "Contact Us", ar: "تواصل معنا" } satisfies Localized,
    whatsapp: { en: "Chat on WhatsApp", ar: "تواصل عبر واتساب" } satisfies Localized,
    readArticle: { en: "Read Article", ar: "اقرأ المقال" } satisfies Localized,
    readMore: { en: "Read More", ar: "اقرأ المزيد" } satisfies Localized,
    learnMore: { en: "Learn More", ar: "اعرف المزيد" } satisfies Localized,
    viewDetails: { en: "View Details", ar: "عرض التفاصيل" } satisfies Localized,
    viewAllSurgeries: { en: "View All Surgeries", ar: "عرض كل العمليات" } satisfies Localized,
    exploreTreatments: { en: "Explore Treatments", ar: "استكشف طرق العلاج" } satisfies Localized,
    viewAllVideos: { en: "Watch All Videos", ar: "شاهد كل الفيديوهات" } satisfies Localized,
    viewAllArticles: { en: "Read All Articles", ar: "اقرأ كل المقالات" } satisfies Localized,
    learnMoreAboutDoctor: { en: "More About Dr. Walid Moussa", ar: "المزيد عن د. وليد موسى" } satisfies Localized,
    close: { en: "Close", ar: "إغلاق" } satisfies Localized,
    play: { en: "Play video", ar: "تشغيل الفيديو" } satisfies Localized,
    menu: { en: "Open menu", ar: "افتح القائمة" } satisfies Localized,
    minRead: { en: "min read", ar: "دقائق قراءة" } satisfies Localized,
    skipToContent: { en: "Skip to content", ar: "تخطَّ إلى المحتوى" } satisfies Localized,
    keyBenefits: { en: "Key Benefits", ar: "أبرز المزايا" } satisfies Localized,
    commonSigns: { en: "Common Signs", ar: "الأعراض الشائعة" } satisfies Localized,
    searchArticles: { en: "Search articles…", ar: "ابحث في المقالات…" } satisfies Localized,
    allCategories: { en: "All", ar: "الكل" } satisfies Localized,
    noResults: { en: "Nothing matches your search yet.", ar: "لا توجد نتائج مطابقة لبحثك." } satisfies Localized,
  },

  footer: {
    tagline: {
      en: "Discreet, evidence-based men's health care — guided by modern microsurgery and genuine understanding.",
      ar: "رعاية سرية لصحة الرجل قائمة على الدليل العلمي — بأحدث تقنيات الجراحة الدقيقة وتفهّم حقيقي.",
    } satisfies Localized,
    quickLinksTitle: { en: "Quick Links", ar: "روابط سريعة" } satisfies Localized,
    contactTitle: { en: "Get in Touch", ar: "تواصل معنا" } satisfies Localized,
    hoursTitle: { en: "Clinic Hours", ar: "مواعيد العيادة" } satisfies Localized,
    followTitle: { en: "Follow", ar: "تابعنا" } satisfies Localized,
    rights: { en: "All rights reserved.", ar: "جميع الحقوق محفوظة." } satisfies Localized,
    credit: { en: "Crafted by Transition", ar: "تصميم وتطوير Transition" } satisfies Localized,
    privacyNote: {
      en: "Every consultation and enquiry is handled in strict medical confidence.",
      ar: "تُعامل كل استشارة واستفسار بسرية طبية تامة.",
    } satisfies Localized,
  },
} as const;
