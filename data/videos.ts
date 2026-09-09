import type { Localized, MediaImage } from "@/lib/types";
import { IMG } from "./images";

export interface VideoItem {
  id: string;
  slug: string;
  title: Localized;
  description: Localized;
  thumbnail: MediaImage;
  /**
   * YouTube video id (value after `v=`). PLACEHOLDERS for now — replace each
   * with Dr. Walid Moussa's real clip id; nothing else needs to change.
   */
  youtubeId: string;
  aspect: "portrait" | "landscape";
  duration: string;
  category: Localized;
  featured: boolean;
  publishedAt: string;
}

export const videosIntro = {
  eyebrow: { en: "Watch & Understand", ar: "شاهد وافهم" } satisfies Localized,
  title: { en: "Straight answers, on video", ar: "إجابات مباشرة، بالفيديو" } satisfies Localized,
  description: {
    en: "Short explainers from Dr. Moussa on the questions that come up most in clinic.",
    ar: "شروحات قصيرة من د. موسى حول الأسئلة الأكثر تكرارًا في العيادة.",
  } satisfies Localized,
};

export const videoCategories: { key: string; label: Localized }[] = [
  { key: "all", label: { en: "All", ar: "الكل" } },
  { key: "ed", label: { en: "Erectile Health", ar: "صحة الانتصاب" } },
  { key: "fertility", label: { en: "Fertility", ar: "الخصوبة" } },
  { key: "surgery", label: { en: "Surgery", ar: "الجراحة" } },
  { key: "hormones", label: { en: "Hormones", ar: "الهرمونات" } },
];

export const videos: VideoItem[] = [
  {
    id: "v1",
    slug: "does-varicocele-cause-infertility",
    title: { en: "Does a varicocele really cause infertility?", ar: "هل تسبب دوالي الخصية العقم فعلًا؟" },
    description: {
      en: "How dilated scrotal veins affect sperm — and who actually benefits from surgery.",
      ar: "كيف تؤثر أوردة كيس الصفن المتوسعة على الحيوانات المنوية — ومن يستفيد فعلًا من الجراحة.",
    },
    thumbnail: { src: IMG.labResearch, alt: { en: "Varicocele explainer video", ar: "فيديو عن دوالي الخصية" } },
    youtubeId: "aqz-KE-bpKQ",
    aspect: "portrait",
    duration: "3:48",
    category: { en: "Fertility", ar: "الخصوبة" },
    featured: true,
    publishedAt: "2026-07-20",
  },
  {
    id: "v2",
    slug: "ed-is-a-warning-sign",
    title: { en: "Erectile dysfunction is a warning sign", ar: "ضعف الانتصاب علامة تحذير" },
    description: {
      en: "Why the penile arteries often reveal heart and metabolic problems years early.",
      ar: "لماذا تكشف شرايين القضيب مشكلات القلب والأيض قبل سنوات.",
    },
    thumbnail: { src: IMG.doctorConsult, alt: { en: "ED warning-sign video", ar: "فيديو عن ضعف الانتصاب كعلامة تحذير" } },
    youtubeId: "ScMzIvxBSi4",
    aspect: "portrait",
    duration: "4:12",
    category: { en: "Erectile Health", ar: "صحة الانتصاب" },
    featured: true,
    publishedAt: "2026-06-28",
  },
  {
    id: "v3",
    slug: "testosterone-therapy-and-fertility",
    title: { en: "Testosterone therapy can cause infertility", ar: "علاج التستوستيرون قد يسبب العقم" },
    description: {
      en: "The trade-off nobody explains — and the fertility-sparing alternatives.",
      ar: "الموازنة التي لا يشرحها أحد — والبدائل التي تحافظ على الخصوبة.",
    },
    thumbnail: { src: IMG.manActive, alt: { en: "Testosterone and fertility video", ar: "فيديو عن التستوستيرون والخصوبة" } },
    youtubeId: "aqz-KE-bpKQ",
    aspect: "portrait",
    duration: "5:02",
    category: { en: "Hormones", ar: "الهرمونات" },
    featured: true,
    publishedAt: "2026-06-10",
  },
  {
    id: "v4",
    slug: "what-a-penile-implant-is-really-like",
    title: { en: "What a penile implant is really like", ar: "كيف تبدو دعامة القضيب حقًا" },
    description: {
      en: "How the device works, what partners notice, and realistic recovery.",
      ar: "كيف يعمل الجهاز، وما يلاحظه الشريك، والتعافي الواقعي.",
    },
    thumbnail: { src: IMG.operatingRoom2, alt: { en: "Penile implant explainer video", ar: "فيديو شرح دعامة القضيب" } },
    youtubeId: "ScMzIvxBSi4",
    aspect: "landscape",
    duration: "6:30",
    category: { en: "Surgery", ar: "الجراحة" },
    featured: false,
    publishedAt: "2026-05-18",
  },
  {
    id: "v5",
    slug: "semen-analysis-how-to-read-it",
    title: { en: "How to read your semen analysis", ar: "كيف تقرأ تحليل السائل المنوي" },
    description: {
      en: "Count, motility, morphology and DNA fragmentation — what each number means.",
      ar: "العدد والحركة والشكل وتفتّت الحمض النووي — ماذا يعني كل رقم.",
    },
    thumbnail: { src: IMG.labSamples, alt: { en: "Semen analysis explainer video", ar: "فيديو شرح تحليل السائل المنوي" } },
    youtubeId: "aqz-KE-bpKQ",
    aspect: "landscape",
    duration: "7:15",
    category: { en: "Fertility", ar: "الخصوبة" },
    featured: false,
    publishedAt: "2026-04-30",
  },
  {
    id: "v6",
    slug: "premature-ejaculation-what-works",
    title: { en: "Premature ejaculation: what actually works", ar: "سرعة القذف: ما الذي ينجح فعلًا" },
    description: {
      en: "Behavioural technique, topical agents and medication — combined, not competing.",
      ar: "التقنية السلوكية والدهانات الموضعية والدواء — مجتمعة، لا متنافسة.",
    },
    thumbnail: { src: IMG.coupleSunset, alt: { en: "Premature ejaculation video", ar: "فيديو عن سرعة القذف" } },
    youtubeId: "ScMzIvxBSi4",
    aspect: "portrait",
    duration: "4:40",
    category: { en: "Erectile Health", ar: "صحة الانتصاب" },
    featured: false,
    publishedAt: "2026-04-08",
  },
  {
    id: "v7",
    slug: "vasectomy-reversal-vs-ivf",
    title: { en: "Vasectomy reversal or IVF?", ar: "عكس قطع الحبل المنوي أم أطفال الأنابيب؟" },
    description: {
      en: "Comparing cost, success and time for couples after a vasectomy.",
      ar: "مقارنة التكلفة والنجاح والوقت للأزواج بعد قطع الحبل المنوي.",
    },
    thumbnail: { src: IMG.microscope, alt: { en: "Vasectomy reversal vs IVF video", ar: "فيديو مقارنة عكس القطع بأطفال الأنابيب" } },
    youtubeId: "aqz-KE-bpKQ",
    aspect: "landscape",
    duration: "5:55",
    category: { en: "Surgery", ar: "الجراحة" },
    featured: false,
    publishedAt: "2026-03-15",
  },
  {
    id: "v8",
    slug: "mens-health-check-after-40",
    title: { en: "The men's health check every man needs after 40", ar: "الفحص الذي يحتاجه كل رجل بعد سن الأربعين" },
    description: {
      en: "Hormones, heart, prostate and sexual function — one visit, clear picture.",
      ar: "الهرمونات والقلب والبروستاتا والوظيفة الجنسية — زيارة واحدة وصورة واضحة.",
    },
    thumbnail: { src: IMG.manPortrait, alt: { en: "Men's health check video", ar: "فيديو الفحص الصحي للرجال" } },
    youtubeId: "ScMzIvxBSi4",
    aspect: "landscape",
    duration: "8:20",
    category: { en: "Hormones", ar: "الهرمونات" },
    featured: false,
    publishedAt: "2026-02-22",
  },
];

export const featuredVideos = videos.filter((v) => v.featured).slice(0, 3);
