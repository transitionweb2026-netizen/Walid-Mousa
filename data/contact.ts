import type { Localized } from "@/lib/types";
import type { IconName } from "@/components/icons/Icon";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  PLACEHOLDER CONTACT DETAILS — replace every value below with the clinic's
 *  real information before going live. This one file feeds the Navbar CTA,
 *  the Footer, the Home hero panel, the Final CTA and the whole Contact page.
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const contactInfo = {
  /** International format for links; `phoneDisplay` is what users see. */
  phone: "+201000000000",
  phoneDisplay: { en: "+20 100 000 0000", ar: "+20 100 000 0000" } satisfies Localized,
  /** Digits only, no + — used for wa.me. Env var overrides this at runtime. */
  whatsapp: "201000000000",
  email: "reception@drwalidmoussa.com",
  address: {
    en: "Nile Medical Tower, 5th Floor, 12 El-Batal Ahmed Abdel Aziz St., Mohandessin, Giza, Egypt",
    ar: "برج النيل الطبي، الدور الخامس، ١٢ شارع البطل أحمد عبد العزيز، المهندسين، الجيزة، مصر",
  } satisfies Localized,
  addressShort: { en: "Mohandessin, Giza", ar: "المهندسين، الجيزة" } satisfies Localized,

  /* ─────────────────────────────────────────────────────────────────────────
   *  CLINIC LOCATION — all placeholder. To drop in the real location later:
   *   1. `mapEmbedSrc`  — paste the Google Maps → Share → "Embed a map"
   *      iframe `src`. Leave it as "" to show the styled placeholder panel
   *      instead of a live map (nothing else needs to change).
   *   2. `mapQuery`     — the exact place name / "lat,lng" used to build the
   *      "open in Google Maps" and "directions" links.
   *  The <ClinicMap> component reads only these three values.
   * ───────────────────────────────────────────────────────────────────────── */
  mapEmbedSrc:
    "https://www.openstreetmap.org/export/embed.html?bbox=31.1930%2C30.0470%2C31.2160%2C30.0700&layer=mapnik&marker=30.0585%2C31.2016",
  mapQuery: "Mohandessin, Giza, Egypt",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Mohandessin%2C+Giza%2C+Egypt",
  mapDirectionsLink: "https://www.google.com/maps/dir/?api=1&destination=Mohandessin%2C+Giza%2C+Egypt",
};

export interface WorkingHoursRow {
  day: Localized;
  hours: Localized;
  closed?: boolean;
}

export const workingHours: WorkingHoursRow[] = [
  { day: { en: "Saturday – Wednesday", ar: "السبت – الأربعاء" }, hours: { en: "4:00 PM – 9:00 PM", ar: "٤:٠٠ م – ٩:٠٠ م" } },
  { day: { en: "Thursday", ar: "الخميس" }, hours: { en: "12:00 PM – 4:00 PM", ar: "١٢:٠٠ ظ – ٤:٠٠ م" } },
  { day: { en: "Friday", ar: "الجمعة" }, hours: { en: "Closed", ar: "مغلق" }, closed: true },
];

export interface SocialLink {
  key: string;
  label: string;
  icon: IconName;
  href: string;
}

/** TODO: replace `#` with the clinic's real profile URLs. */
export const socialLinks: SocialLink[] = [
  { key: "facebook", label: "Facebook", icon: "facebook", href: "#" },
  { key: "instagram", label: "Instagram", icon: "instagram", href: "#" },
  { key: "youtube", label: "YouTube", icon: "youtube", href: "#" },
  { key: "tiktok", label: "TikTok", icon: "tiktok", href: "#" },
];

export const contactIntro = {
  channelsTitle: { en: "Direct Lines", ar: "خطوط مباشرة" } satisfies Localized,
  channelsNote: {
    en: "Calls and messages are answered by a clinic coordinator, in confidence.",
    ar: "يرد على المكالمات والرسائل منسّق العيادة، بسرية تامة.",
  } satisfies Localized,
  formTitle: { en: "Send a Private Message", ar: "أرسل رسالة خاصة" } satisfies Localized,
  formNote: {
    en: "Fill in what you're comfortable sharing. Submitting opens WhatsApp with your details ready to send — nothing is stored on this website.",
    ar: "اكتب ما ترتاح لمشاركته. الإرسال يفتح واتساب ببياناتك جاهزة — لا يُحفَظ شيء على هذا الموقع.",
  } satisfies Localized,
  locationTitle: { en: "Find the Clinic", ar: "موقع العيادة" } satisfies Localized,
  openInMaps: { en: "Open in Maps", ar: "افتح في الخرائط" } satisfies Localized,
  getDirections: { en: "Get directions", ar: "احصل على الاتجاهات" } satisfies Localized,
  mapHint: {
    en: "Tap the map to open Google Maps with directions.",
    ar: "اضغط على الخريطة لفتح خرائط جوجل مع الاتجاهات.",
  } satisfies Localized,
  mapPending: {
    en: "The exact clinic map is being finalised. Tap here for the area on Google Maps.",
    ar: "يجري إعداد خريطة العيادة الدقيقة. اضغط هنا لعرض المنطقة على خرائط جوجل.",
  } satisfies Localized,
};

export interface ContactFormCopy {
  fullName: { label: Localized; placeholder: Localized };
  phone: { label: Localized; placeholder: Localized };
  topic: { label: Localized; options: { value: string; label: Localized }[] };
  preferredTime: { label: Localized; placeholder: Localized };
  message: { label: Localized; placeholder: Localized };
  submit: Localized;
  actionsNote: Localized;
  required: Localized;
  invalidPhone: Localized;
  fixErrors: Localized;
  success: Localized;
  whatsappTemplate: Localized;
}

export const contactFormCopy: ContactFormCopy = {
  fullName: {
    label: { en: "Name (or initials)", ar: "الاسم (أو الأحرف الأولى)" },
    placeholder: { en: "How should we address you?", ar: "كيف نخاطبك؟" },
  },
  phone: {
    label: { en: "Phone / WhatsApp", ar: "الهاتف / واتساب" },
    placeholder: { en: "+20 1XX XXX XXXX", ar: "+20 1XX XXX XXXX" },
  },
  topic: {
    label: { en: "What is it about?", ar: "بخصوص ماذا؟" },
    options: [
      { value: "general", label: { en: "General enquiry", ar: "استفسار عام" } },
      { value: "ed", label: { en: "Erectile / sexual health", ar: "صحة الانتصاب / الصحة الجنسية" } },
      { value: "fertility", label: { en: "Fertility / low sperm count", ar: "الخصوبة / ضعف الحيوانات المنوية" } },
      { value: "hormones", label: { en: "Hormones / low testosterone", ar: "الهرمونات / نقص التستوستيرون" } },
      { value: "surgery", label: { en: "Surgery / second opinion", ar: "جراحة / رأي ثانٍ" } },
    ],
  },
  preferredTime: {
    label: { en: "Best time to reach you", ar: "أفضل وقت للتواصل معك" },
    placeholder: { en: "e.g. weekday evenings", ar: "مثال: مساء أيام العمل" },
  },
  message: {
    label: { en: "Anything you'd like Dr. Moussa to know", ar: "أي شيء تود أن يعرفه د. موسى" },
    placeholder: { en: "Optional — a sentence or two is plenty.", ar: "اختياري — جملة أو اثنتان تكفيان." },
  },
  submit: { en: "Send on WhatsApp", ar: "أرسل عبر واتساب" },
  actionsNote: {
    en: "“Send on WhatsApp” opens WhatsApp with everything above written out, ready to send. Prefer to talk? Call the clinic directly.",
    ar: "«أرسل عبر واتساب» يفتح واتساب وكل ما بالأعلى مكتوب وجاهز للإرسال. تفضّل التحدث؟ اتصل بالعيادة مباشرة.",
  },
  required: { en: "This field is required.", ar: "هذا الحقل مطلوب." },
  invalidPhone: { en: "Please enter a valid phone number.", ar: "يرجى إدخال رقم هاتف صحيح." },
  fixErrors: { en: "Please complete the highlighted fields.", ar: "يرجى إكمال الحقول المميّزة." },
  success: {
    en: "WhatsApp should have opened in a new tab with your message ready — just press send.",
    ar: "من المفترض أن واتساب فُتح في تبويب جديد ورسالتك جاهزة — فقط اضغط إرسال.",
  },
  whatsappTemplate: {
    en: "New enquiry for Dr. Walid Moussa\nName: {name}\nPhone: {phone}\nTopic: {contact}\nBest time: {date}\nMessage: {message}",
    ar: "استفسار جديد لعيادة د. وليد موسى\nالاسم: {name}\nالهاتف: {phone}\nالموضوع: {contact}\nأفضل وقت: {date}\nالرسالة: {message}",
  },
};
