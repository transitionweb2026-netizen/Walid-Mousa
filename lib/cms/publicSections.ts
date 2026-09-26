import "server-only";
import { getPublicClient } from "./publicClient";
import { toMediaImage, type MediaRow } from "./media";
import { asRecord, localized, localizedArray, optionalStr, nestedCta, localizedPairArray, type JsonRecord } from "./jsonContent";
import { siteContent } from "@/data/site";
import { heroes, type HeroContent } from "@/data/hero";
import { doctorIntro as fbDoctorIntro } from "@/data/doctorIntro";
import { statsIntro } from "@/data/stats";
import { surgeriesIntro } from "@/data/surgeries";
import { treatmentsIntro } from "@/data/treatments";
import { technologiesIntro } from "@/data/technologies";
import { journeyIntro } from "@/data/journey";
import { reviewsIntro } from "@/data/reviews";
import { videosIntro } from "@/data/videos";
import { faqIntro } from "@/data/faq";
import { articlesIntro } from "@/data/articles";
import { specialtiesIntro, servicesFaqIntro } from "@/data/specialties";
import { aboutContent } from "@/data/about";
import { contactIntro } from "@/data/contact";
import type { Localized, MediaImage, MediaVideo } from "@/lib/types";

/**
 * The `pages` / `page_sections` layer — one function per real page, each
 * returning a bundle shaped for that page's exact components. A section
 * Supabase can't see (hidden by an admin) maps to `null` so the page skips
 * rendering it — that's how the CMS's per-section visibility toggle works.
 * `hero` always falls back to bundled copy rather than leaving a page
 * headerless. Supabase unconfigured/unreachable → everything falls back.
 */

export interface IntroContent {
  eyebrow: Localized;
  title: Localized;
  description: Localized;
}
export interface CtaRef {
  label: Localized;
  url: string; // relative to the locale root, with a leading slash
}
export interface PageHero {
  content: HeroContent;
  primaryCta: CtaRef;
  secondaryCta: CtaRef;
}

const BOOK: CtaRef = { label: siteContent.actions.bookAppointment, url: "/contact" };
const EXPLORE: CtaRef = { label: siteContent.actions.exploreServices, url: "/services" };
// Same actions, but pointed at an anchor on the CURRENT page instead of
// navigating to it — used where the hero already lives on that page (a
// hero button linking to its own page is a dead click).
const VIEW_SPECIALTIES: CtaRef = { label: siteContent.actions.exploreServices, url: "/services#specialties" };
const BOOK_HERE: CtaRef = { label: siteContent.actions.bookAppointment, url: "/contact#contact-heading" };

// ── section-content mappers ───────────────────────────────────────────────
function toHero(content: JsonRecord, fallback: HeroContent, media: Map<string, MediaRow>): HeroContent {
  const imageId = optionalStr(content, "image_id");
  const position = optionalStr(content, "image_position") ?? fallback.image.position;
  const mobileImageId = optionalStr(content, "image_mobile_id");
  const mobilePosition = optionalStr(content, "image_mobile_position") ?? fallback.imageMobile?.position;
  return {
    eyebrow: localized(content, "eyebrow", fallback.eyebrow),
    headline: localized(content, "headline", fallback.headline),
    headlineAccent: localized(content, "headlineAccent", fallback.headlineAccent),
    description: localized(content, "description", fallback.description),
    image: toMediaImage(imageId ? (media.get(imageId) ?? null) : null, fallback.image.alt, { position }),
    imageMobile: mobileImageId
      ? toMediaImage(media.get(mobileImageId) ?? null, fallback.imageMobile?.alt ?? fallback.image.alt, { position: mobilePosition })
      : fallback.imageMobile,
  };
}
function toIntro(content: JsonRecord, fallback: IntroContent): IntroContent {
  return {
    eyebrow: localized(content, "eyebrow", fallback.eyebrow),
    title: localized(content, "title", fallback.title),
    description: localized(content, "description", fallback.description),
  };
}
const introFrom = (o: { eyebrow: Localized; title: Localized; description: Localized }): IntroContent => o;

// ── shared loader ─────────────────────────────────────────────────────────
type PC = NonNullable<Awaited<ReturnType<typeof getPublicClient>>>;
type Loaded = { supabase: PC; sections: Map<string, JsonRecord>; media: Map<string, MediaRow> } | "unavailable";

const MEDIA_KEYS = [
  "image_id", "image_mobile_id", "video_cover_media_id", "video_media_id", "portrait_media_id",
  "portrait_layer_1_media_id", "portrait_layer_2_media_id",
];

async function loadPage(slug: string): Promise<Loaded> {
  const supabase = await getPublicClient();
  if (!supabase) return "unavailable";
  try {
    const { data: page } = await supabase.from("pages").select("id").eq("slug", slug).maybeSingle();
    if (!page) return "unavailable";
    const { data: rows } = await supabase.from("page_sections").select("*").eq("page_id", page.id);
    if (!rows) return "unavailable";
    const sections = new Map(rows.map((r) => [r.section_type, (asRecord(r.content) ?? {}) as JsonRecord]));
    const ids = new Set<string>();
    for (const content of sections.values()) for (const k of MEDIA_KEYS) { const id = optionalStr(content, k); if (id) ids.add(id); }
    const media = ids.size ? new Map(((await supabase.from("media").select("*").in("id", [...ids])).data ?? []).map((m) => [m.id, m] as const)) : new Map<string, MediaRow>();
    return { supabase, sections, media };
  } catch (e) {
    console.error(`[cms] loadPage(${JSON.stringify(slug)}) failed:`, e);
    return "unavailable";
  }
}

function buildHero(loaded: Exclude<Loaded, "unavailable">, fallback: HeroContent, ctas: { primary: CtaRef; secondary: CtaRef }): PageHero {
  const raw = loaded.sections.get("hero");
  if (!raw) return { content: fallback, primaryCta: ctas.primary, secondaryCta: ctas.secondary };
  return {
    content: toHero(raw, fallback, loaded.media),
    primaryCta: nestedCta(raw, "primaryCta", ctas.primary),
    secondaryCta: nestedCta(raw, "secondaryCta", ctas.secondary),
  };
}

// ── HOME ──────────────────────────────────────────────────────────────────
export interface DoctorIntroContent {
  eyebrow: Localized;
  heading: Localized;
  paragraphs: Localized<string[]>;
  highlights: { value: Localized; label: Localized }[];
  cta: CtaRef;
  video: MediaVideo;
}
export interface HomeSections {
  hero: PageHero;
  doctorIntro: DoctorIntroContent | null;
  statsIntro: IntroContent | null;
  surgeriesIntro: IntroContent | null;
  conditionsIntro: IntroContent | null;
  technologiesIntro: IntroContent | null;
  journeyIntro: IntroContent | null;
  reviewsIntro: IntroContent | null;
  featuredVideosIntro: IntroContent | null;
  faqIntro: IntroContent | null;
  featuredArticlesIntro: IntroContent | null;
}

const fbDoctorIntroContent: DoctorIntroContent = {
  eyebrow: fbDoctorIntro.eyebrow,
  heading: fbDoctorIntro.heading,
  paragraphs: fbDoctorIntro.paragraphs,
  highlights: fbDoctorIntro.highlights,
  cta: { label: siteContent.actions.learnMoreAboutDoctor, url: "/about" },
  video: fbDoctorIntro.video,
};

function toDoctorIntro(content: JsonRecord, media: Map<string, MediaRow>): DoctorIntroContent {
  const coverId = optionalStr(content, "video_cover_media_id");
  const poster = toMediaImage(coverId ? (media.get(coverId) ?? null) : null, fbDoctorIntro.video.poster.alt, {
    alt: localized(content, "video_alt", fbDoctorIntro.video.poster.alt),
  });
  return {
    eyebrow: localized(content, "eyebrow", fbDoctorIntro.eyebrow),
    heading: localized(content, "heading", fbDoctorIntro.heading),
    paragraphs: localizedArray(content, "paragraphs", fbDoctorIntro.paragraphs),
    highlights: localizedPairArray(content, "highlights", fbDoctorIntro.highlights),
    cta: nestedCta(content, "cta", { label: siteContent.actions.learnMoreAboutDoctor, url: "/about" }),
    video: {
      poster,
      youtubeId: optionalStr(content, "youtube_id") ?? fbDoctorIntro.video.youtubeId,
      aspect: fbDoctorIntro.video.aspect,
      duration: fbDoctorIntro.video.duration,
    } satisfies MediaVideo,
  };
}

export async function getHomeSections(): Promise<HomeSections> {
  const loaded = await loadPage("");
  if (loaded === "unavailable") {
    return {
      hero: { content: heroes.home, primaryCta: BOOK, secondaryCta: EXPLORE },
      doctorIntro: fbDoctorIntroContent,
      statsIntro: introFrom(statsIntro),
      surgeriesIntro: introFrom(surgeriesIntro),
      conditionsIntro: introFrom(treatmentsIntro),
      technologiesIntro: introFrom(technologiesIntro),
      journeyIntro: introFrom(journeyIntro),
      reviewsIntro: introFrom(reviewsIntro),
      featuredVideosIntro: introFrom(videosIntro),
      faqIntro: introFrom(faqIntro),
      featuredArticlesIntro: introFrom(articlesIntro),
    };
  }
  const { sections, media } = loaded;
  const has = (t: string) => sections.has(t);
  const g = (t: string) => sections.get(t)!;
  return {
    hero: buildHero(loaded, heroes.home, { primary: BOOK, secondary: EXPLORE }),
    doctorIntro: has("doctor_intro") ? toDoctorIntro(g("doctor_intro"), media) : null,
    statsIntro: has("stats_intro") ? toIntro(g("stats_intro"), introFrom(statsIntro)) : null,
    surgeriesIntro: has("surgeries_intro") ? toIntro(g("surgeries_intro"), introFrom(surgeriesIntro)) : null,
    conditionsIntro: has("conditions_intro") ? toIntro(g("conditions_intro"), introFrom(treatmentsIntro)) : null,
    technologiesIntro: has("technologies_intro") ? toIntro(g("technologies_intro"), introFrom(technologiesIntro)) : null,
    journeyIntro: has("journey_intro") ? toIntro(g("journey_intro"), introFrom(journeyIntro)) : null,
    reviewsIntro: has("reviews_intro") ? toIntro(g("reviews_intro"), introFrom(reviewsIntro)) : null,
    featuredVideosIntro: has("featured_videos_intro") ? toIntro(g("featured_videos_intro"), introFrom(videosIntro)) : null,
    faqIntro: has("faq_intro") ? toIntro(g("faq_intro"), introFrom(faqIntro)) : null,
    featuredArticlesIntro: has("featured_articles_intro") ? toIntro(g("featured_articles_intro"), introFrom(articlesIntro)) : null,
  };
}

// ── ABOUT ─────────────────────────────────────────────────────────────────
export interface AboutDoctorContent {
  eyebrow: Localized;
  heading: Localized;
  paragraphs: Localized<string[]>;
  highlight: { value: Localized; label: Localized };
  portrait: MediaImage;
  portraitLayers: MediaImage[];
  signatureName: Localized;
  signatureRole: Localized;
}
export interface WhySection {
  eyebrow: Localized;
  heading: Localized;
  description: Localized;
  image: MediaImage;
}
export interface WordFromDoctorContent {
  eyebrow: Localized;
  heading: Localized;
  image: MediaImage;
  quote: Localized<string[]>;
  name: Localized;
  role: Localized;
}
export interface AboutSections {
  hero: PageHero;
  aboutDoctor: AboutDoctorContent;
  certificatesIntro: IntroContent | null;
  careerIntro: IntroContent | null;
  why: WhySection | null;
  expertiseIntro: IntroContent | null;
  wordFromDoctor: WordFromDoctorContent | null;
  statsIntro: IntroContent | null;
  achievementsIntro: IntroContent | null;
}

const careerIntroFb: IntroContent = {
  eyebrow: { en: "Career & Professional Journey", ar: "المسيرة والرحلة المهنية" },
  title: { en: "From medical school to a dedicated andrology practice", ar: "من كلية الطب إلى ممارسة متخصصة في أمراض الذكورة" },
  description: { en: "Two decades of training and practice, each step narrowing the focus toward men's reproductive and sexual health.", ar: "عقدان من التدريب والممارسة، كل خطوة تضيّق التركيز نحو الصحة الإنجابية والجنسية للرجل." },
};
const fbAboutDoctor: AboutDoctorContent = {
  eyebrow: aboutContent.bio.eyebrow,
  heading: aboutContent.bio.heading,
  paragraphs: aboutContent.bio.paragraphs,
  highlight: aboutContent.bio.highlight,
  portrait: aboutContent.bio.portrait,
  portraitLayers: aboutContent.bio.portraitLayers,
  signatureName: aboutContent.bio.signatureName,
  signatureRole: aboutContent.bio.signatureRole,
};
const fbWhy: WhySection = {
  eyebrow: aboutContent.why.eyebrow, heading: aboutContent.why.heading,
  description: aboutContent.why.description, image: aboutContent.why.image,
};
const fbWord: WordFromDoctorContent = {
  eyebrow: aboutContent.word.eyebrow, heading: aboutContent.word.heading, image: aboutContent.word.image,
  quote: aboutContent.word.quote, name: aboutContent.word.name, role: aboutContent.word.role,
};
const certIntroFb: IntroContent = { eyebrow: aboutContent.certifications.eyebrow, title: aboutContent.certifications.heading, description: aboutContent.certifications.description };
const expertiseIntroFb: IntroContent = { eyebrow: aboutContent.expertise.eyebrow, title: aboutContent.expertise.heading, description: aboutContent.expertise.description };
const achievementsIntroFb: IntroContent = { eyebrow: aboutContent.achievements.eyebrow, title: aboutContent.achievements.heading, description: { en: "", ar: "" } };

export async function getAboutSections(): Promise<AboutSections> {
  const loaded = await loadPage("about");
  if (loaded === "unavailable") {
    return {
      hero: { content: heroes.about, primaryCta: BOOK, secondaryCta: EXPLORE },
      aboutDoctor: fbAboutDoctor,
      certificatesIntro: certIntroFb,
      careerIntro: careerIntroFb,
      why: fbWhy,
      expertiseIntro: expertiseIntroFb,
      wordFromDoctor: fbWord,
      statsIntro: introFrom(statsIntro),
      achievementsIntro: achievementsIntroFb,
    };
  }
  const { sections, media } = loaded;
  const has = (t: string) => sections.has(t);
  const g = (t: string) => sections.get(t)!;
  const mi = (c: JsonRecord, key: string, altFb: Localized): MediaImage => {
    const id = optionalStr(c, key);
    return toMediaImage(id ? (media.get(id) ?? null) : null, altFb, { alt: localized(c, "image_alt", altFb) });
  };
  let aboutDoctor = fbAboutDoctor;
  if (has("about_doctor")) {
    const c = g("about_doctor");
    aboutDoctor = {
      eyebrow: localized(c, "eyebrow", fbAboutDoctor.eyebrow),
      heading: localized(c, "heading", fbAboutDoctor.heading),
      paragraphs: localizedArray(c, "paragraphs", fbAboutDoctor.paragraphs),
      highlight: {
        value: localized(asRecord(c.highlight), "value", fbAboutDoctor.highlight.value),
        label: localized(asRecord(c.highlight), "label", fbAboutDoctor.highlight.label),
      },
      portrait: (() => { const id = optionalStr(c, "portrait_media_id"); return toMediaImage(id ? (media.get(id) ?? null) : null, fbAboutDoctor.portrait.alt, { position: fbAboutDoctor.portrait.position }); })(),
      portraitLayers: [
        toMediaImage(media.get(optionalStr(c, "portrait_layer_1_media_id") ?? "") ?? null, fbAboutDoctor.portraitLayers[0]?.alt ?? { en: "", ar: "" }),
        toMediaImage(media.get(optionalStr(c, "portrait_layer_2_media_id") ?? "") ?? null, fbAboutDoctor.portraitLayers[1]?.alt ?? { en: "", ar: "" }),
      ],
      signatureName: localized(c, "signature_name", fbAboutDoctor.signatureName),
      signatureRole: localized(c, "signature_role", fbAboutDoctor.signatureRole),
    };
  }
  return {
    hero: buildHero(loaded, heroes.about, { primary: BOOK, secondary: EXPLORE }),
    aboutDoctor,
    certificatesIntro: has("certificates_intro") ? toIntro(g("certificates_intro"), certIntroFb) : null,
    careerIntro: has("career_intro") ? toIntro(g("career_intro"), careerIntroFb) : null,
    why: has("why")
      ? {
          eyebrow: localized(g("why"), "eyebrow", fbWhy.eyebrow),
          heading: localized(g("why"), "heading", fbWhy.heading),
          description: localized(g("why"), "description", fbWhy.description),
          image: mi(g("why"), "image_id", fbWhy.image.alt),
        }
      : null,
    expertiseIntro: has("expertise_intro") ? toIntro(g("expertise_intro"), expertiseIntroFb) : null,
    wordFromDoctor: has("word_from_doctor")
      ? {
          eyebrow: localized(g("word_from_doctor"), "eyebrow", fbWord.eyebrow),
          heading: localized(g("word_from_doctor"), "heading", fbWord.heading),
          image: mi(g("word_from_doctor"), "image_id", fbWord.image.alt),
          quote: localizedArray(g("word_from_doctor"), "quote", fbWord.quote),
          name: localized(g("word_from_doctor"), "name", fbWord.name),
          role: localized(g("word_from_doctor"), "role", fbWord.role),
        }
      : null,
    statsIntro: has("stats_intro") ? toIntro(g("stats_intro"), introFrom(statsIntro)) : null,
    achievementsIntro: has("achievements_intro") ? toIntro(g("achievements_intro"), achievementsIntroFb) : null,
  };
}

// ── SERVICES ──────────────────────────────────────────────────────────────
export interface ServicesSections {
  hero: PageHero;
  specialtiesIntro: IntroContent;
  surgeriesIntro: IntroContent | null;
  technologiesIntro: IntroContent | null;
  otherServicesIntro: IntroContent | null;
  faqIntro: IntroContent;
}
const otherIntroFb: IntroContent = {
  eyebrow: { en: "Also Available", ar: "متاح أيضًا" },
  title: { en: "Beyond procedures and prescriptions", ar: "أبعد من الإجراءات والوصفات" },
  description: { en: "Supporting services that make the whole experience easier and more thorough.", ar: "خدمات مساندة تجعل التجربة بأكملها أسهل وأكثر شمولًا." },
};
export async function getServicesSections(): Promise<ServicesSections> {
  const loaded = await loadPage("services");
  if (loaded === "unavailable") {
    return {
      hero: { content: heroes.services, primaryCta: BOOK, secondaryCta: VIEW_SPECIALTIES },
      specialtiesIntro: introFrom(specialtiesIntro),
      surgeriesIntro: introFrom(surgeriesIntro),
      technologiesIntro: introFrom(technologiesIntro),
      otherServicesIntro: otherIntroFb,
      faqIntro: introFrom(servicesFaqIntro),
    };
  }
  const { sections } = loaded;
  const has = (t: string) => sections.has(t);
  const g = (t: string) => sections.get(t)!;
  return {
    hero: buildHero(loaded, heroes.services, { primary: BOOK, secondary: VIEW_SPECIALTIES }),
    specialtiesIntro: has("specialties_intro") ? toIntro(g("specialties_intro"), introFrom(specialtiesIntro)) : introFrom(specialtiesIntro),
    surgeriesIntro: has("surgeries_intro") ? toIntro(g("surgeries_intro"), introFrom(surgeriesIntro)) : null,
    technologiesIntro: has("technologies_intro") ? toIntro(g("technologies_intro"), introFrom(technologiesIntro)) : null,
    otherServicesIntro: has("other_services_intro") ? toIntro(g("other_services_intro"), otherIntroFb) : null,
    faqIntro: has("faq_intro") ? toIntro(g("faq_intro"), introFrom(servicesFaqIntro)) : introFrom(servicesFaqIntro),
  };
}

// ── VIDEOS / ARTICLES / CONTACT ───────────────────────────────────────────
export interface VideosSections { hero: PageHero; galleryIntro: IntroContent }
export async function getVideosSections(): Promise<VideosSections> {
  const loaded = await loadPage("videos");
  const galleryFb = introFrom(videosIntro);
  if (loaded === "unavailable") return { hero: { content: heroes.videos, primaryCta: BOOK, secondaryCta: EXPLORE }, galleryIntro: galleryFb };
  return {
    hero: buildHero(loaded, heroes.videos, { primary: BOOK, secondary: EXPLORE }),
    galleryIntro: loaded.sections.has("video_gallery_intro") ? toIntro(loaded.sections.get("video_gallery_intro")!, galleryFb) : galleryFb,
  };
}

export interface ArticlesSections { hero: PageHero; featuredIntro: IntroContent; gridIntro: IntroContent }
export async function getArticlesSections(): Promise<ArticlesSections> {
  const loaded = await loadPage("articles");
  const featuredFb: IntroContent = { eyebrow: articlesIntro.eyebrow, title: articlesIntro.title, description: articlesIntro.description };
  const gridFb: IntroContent = { eyebrow: { en: "Reading Room", ar: "غرفة القراءة" }, title: { en: "More from the reading room", ar: "المزيد من غرفة القراءة" }, description: articlesIntro.description };
  if (loaded === "unavailable") return { hero: { content: heroes.articles, primaryCta: BOOK, secondaryCta: EXPLORE }, featuredIntro: featuredFb, gridIntro: gridFb };
  return {
    hero: buildHero(loaded, heroes.articles, { primary: BOOK, secondary: EXPLORE }),
    featuredIntro: loaded.sections.has("featured_article_intro") ? toIntro(loaded.sections.get("featured_article_intro")!, featuredFb) : featuredFb,
    gridIntro: loaded.sections.has("articles_intro") ? toIntro(loaded.sections.get("articles_intro")!, gridFb) : gridFb,
  };
}

export interface ContactSections { hero: PageHero; contactIntro: IntroContent; mapIntro: IntroContent }
export async function getContactSections(): Promise<ContactSections> {
  const loaded = await loadPage("contact");
  const contactFb: IntroContent = { eyebrow: heroes.contact.eyebrow, title: contactIntro.formTitle, description: contactIntro.formNote };
  const mapFb: IntroContent = { eyebrow: { en: "Location", ar: "الموقع" }, title: contactIntro.locationTitle, description: { en: "", ar: "" } };
  if (loaded === "unavailable") return { hero: { content: heroes.contact, primaryCta: BOOK_HERE, secondaryCta: EXPLORE }, contactIntro: contactFb, mapIntro: mapFb };
  return {
    hero: buildHero(loaded, heroes.contact, { primary: BOOK_HERE, secondary: EXPLORE }),
    contactIntro: loaded.sections.has("contact_intro") ? toIntro(loaded.sections.get("contact_intro")!, contactFb) : contactFb,
    mapIntro: loaded.sections.has("map_intro") ? toIntro(loaded.sections.get("map_intro")!, mapFb) : mapFb,
  };
}
