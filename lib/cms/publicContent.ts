import "server-only";
import { getPublicClient } from "./publicClient";
import { toMediaImage, type MediaRow } from "./media";
import type { IconName } from "@/components/icons/Icon";
import type { Localized } from "@/lib/types";

import { stats as fbStats, type StatItem } from "@/data/stats";
import { journeySteps as fbJourney, type JourneyStep } from "@/data/journey";
import { reviews as fbReviews, type ReviewItem } from "@/data/reviews";
import { faqItems as fbFaqs, type FaqItem } from "@/data/faq";
import { technologies as fbTech, type TechnologyItem } from "@/data/technologies";
import { surgeries as fbSurgeries, type SurgeryItem } from "@/data/surgeries";
import { videos as fbVideos, type VideoItem } from "@/data/videos";
import { articles as fbArticles, type ArticleItem } from "@/data/articles";
import { specialties as fbSpecialties, type Specialty, type SpecialtyTreatment } from "@/data/specialties";
import { aboutContent } from "@/data/about";

/**
 * Every content collection. Each getter returns the SAME shape as its
 * /data/*.ts fallback, so the frontend components consuming them need only
 * switch from `import` to `prop`. Supabase-first, active/published rows only,
 * ordered by display_order; falls back to the bundled array otherwise.
 */

type PC = NonNullable<Awaited<ReturnType<typeof getPublicClient>>>;

async function mediaMap(supabase: PC, ids: (string | null | undefined)[]): Promise<Map<string, MediaRow>> {
  const unique = [...new Set(ids.filter((i): i is string => Boolean(i)))];
  if (unique.length === 0) return new Map();
  const { data } = await supabase.from("media").select("*").in("id", unique);
  return new Map((data ?? []).map((m) => [m.id, m] as const));
}
const img = (m: Map<string, MediaRow>, id: string | null, altFallback: Localized, alt?: { en: string | null; ar: string | null }) =>
  toMediaImage(id ? (m.get(id) ?? null) : null, altFallback, {
    alt: alt?.en && alt?.ar ? { en: alt.en, ar: alt.ar } : undefined,
  });

// ── statistics ────────────────────────────────────────────────────────────
export async function getStatistics(): Promise<StatItem[]> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("statistics").select("*").order("display_order");
      if (data && data.length > 0) {
        return data.map((r) => ({
          id: r.id,
          value: Number(r.value),
          suffix: r.suffix,
          label: { en: r.label_en, ar: r.label_ar },
          icon: r.icon as IconName,
        }));
      }
    } catch (e) {
      console.error("[cms] getStatistics failed:", e);
    }
  }
  return fbStats;
}

// ── journey steps ─────────────────────────────────────────────────────────
export async function getJourneySteps(): Promise<JourneyStep[]> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("journey_steps").select("*").order("display_order");
      if (data && data.length > 0) {
        return data.map((r) => ({
          id: r.id,
          step: r.step_number,
          icon: r.icon as IconName,
          title: { en: r.title_en, ar: r.title_ar },
          description: { en: r.description_en, ar: r.description_ar },
        }));
      }
    } catch (e) {
      console.error("[cms] getJourneySteps failed:", e);
    }
  }
  return fbJourney;
}

// ── reviews ───────────────────────────────────────────────────────────────
export async function getReviews(): Promise<ReviewItem[]> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("reviews").select("*").order("display_order");
      if (data && data.length > 0) {
        return data.map((r) => ({
          id: r.id,
          name: { en: r.display_name, ar: r.display_name },
          context: { en: r.context_en, ar: r.context_ar },
          rating: r.rating,
          quote: { en: r.quote_en, ar: r.quote_ar },
        }));
      }
    } catch (e) {
      console.error("[cms] getReviews failed:", e);
    }
  }
  return fbReviews;
}

// ── faqs ──────────────────────────────────────────────────────────────────
export async function getFaqs(scope: "home" | "services"): Promise<FaqItem[]> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase
        .from("faqs")
        .select("*")
        .in("scope", ["all", scope])
        .order("display_order");
      if (data && data.length > 0) {
        return data.map((r) => ({
          id: r.id,
          question: { en: r.question_en, ar: r.question_ar },
          answer: { en: r.answer_en, ar: r.answer_ar },
        }));
      }
    } catch (e) {
      console.error("[cms] getFaqs failed:", e);
    }
  }
  return fbFaqs;
}

// ── technologies ──────────────────────────────────────────────────────────
export async function getTechnologies(): Promise<TechnologyItem[]> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("technologies").select("*").order("display_order");
      if (data && data.length > 0) {
        const m = await mediaMap(supabase, data.map((r) => r.image_id));
        return data.map((r) => ({
          id: r.id,
          slug: r.slug,
          icon: r.icon as IconName,
          image: img(m, r.image_id, { en: r.name_en, ar: r.name_ar }, { en: r.image_alt_en, ar: r.image_alt_ar }),
          name: { en: r.name_en, ar: r.name_ar },
          explanation: { en: r.explanation_en, ar: r.explanation_ar },
          details: { en: r.details_en, ar: r.details_ar },
        }));
      }
    } catch (e) {
      console.error("[cms] getTechnologies failed:", e);
    }
  }
  return fbTech;
}

// ── surgeries ─────────────────────────────────────────────────────────────
export async function getSurgeries(): Promise<SurgeryItem[]> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("surgeries").select("*").order("display_order");
      if (data && data.length > 0) {
        const m = await mediaMap(supabase, data.map((r) => r.image_id));
        return data.map((r) => ({
          id: r.id,
          slug: r.slug,
          icon: r.icon as IconName,
          image: img(m, r.image_id, { en: r.title_en, ar: r.title_ar }, { en: r.image_alt_en, ar: r.image_alt_ar }),
          title: { en: r.title_en, ar: r.title_ar },
          shortDescription: { en: r.short_description_en, ar: r.short_description_ar },
          details: { en: r.full_description_en, ar: r.full_description_ar },
          benefits: { en: r.benefits_en, ar: r.benefits_ar },
          recovery: { en: r.recovery_en ?? "", ar: r.recovery_ar ?? "" },
          featured: r.is_featured,
        }));
      }
    } catch (e) {
      console.error("[cms] getSurgeries failed:", e);
    }
  }
  return fbSurgeries;
}
export async function getFeaturedSurgeries(): Promise<SurgeryItem[]> {
  return (await getSurgeries()).filter((s) => s.featured);
}

// ── videos ────────────────────────────────────────────────────────────────
export async function getVideos(): Promise<VideoItem[]> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("videos").select("*").order("display_order");
      if (data && data.length > 0) {
        const m = await mediaMap(supabase, data.flatMap((r) => [r.cover_media_id, r.video_media_id]));
        return data.map((r) => ({
          id: r.id,
          slug: r.slug,
          title: { en: r.title_en, ar: r.title_ar },
          description: { en: r.description_en ?? "", ar: r.description_ar ?? "" },
          thumbnail: img(m, r.cover_media_id, { en: r.title_en, ar: r.title_ar }, { en: r.cover_alt_en, ar: r.cover_alt_ar }),
          youtubeId: r.youtube_id ?? "",
          aspect: r.aspect,
          duration: r.duration_label ?? "",
          category: { en: r.category_en ?? "", ar: r.category_ar ?? "" },
          featured: r.is_featured,
          publishedAt: r.published_at,
        }));
      }
    } catch (e) {
      console.error("[cms] getVideos failed:", e);
    }
  }
  return fbVideos;
}
export async function getFeaturedVideos(): Promise<VideoItem[]> {
  return (await getVideos()).filter((v) => v.featured).slice(0, 3);
}

// ── articles ──────────────────────────────────────────────────────────────
function tiptapToParagraphs(doc: unknown): string[] {
  if (!doc || typeof doc !== "object") return [];
  const content = (doc as { content?: unknown[] }).content;
  if (!Array.isArray(content)) return [];
  const out: string[] = [];
  const walk = (nodes: unknown[]) => {
    for (const node of nodes) {
      if (!node || typeof node !== "object") continue;
      const n = node as { type?: string; content?: unknown[] };
      if ((n.type === "paragraph" || n.type === "heading" || n.type === "blockquote") && Array.isArray(n.content)) {
        const text = n.content.map((c) => (c && typeof c === "object" && typeof (c as { text?: string }).text === "string" ? (c as { text: string }).text : "")).join("");
        if (text) out.push(text);
      }
      if (Array.isArray(n.content) && (n.type === "bulletList" || n.type === "orderedList" || n.type === "listItem")) walk(n.content);
    }
  };
  walk(content);
  return out;
}

export async function getArticles(): Promise<ArticleItem[]> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase
        .from("articles")
        .select("*")
        .eq("status", "published")
        .order("display_order");
      if (data && data.length > 0) {
        const m = await mediaMap(supabase, data.map((r) => r.image_id));
        return data.map((r) => ({
          id: r.id,
          slug: r.slug,
          title: { en: r.title_en, ar: r.title_ar },
          excerpt: { en: r.excerpt_en ?? "", ar: r.excerpt_ar ?? "" },
          image: img(m, r.image_id, { en: r.title_en, ar: r.title_ar }, { en: r.image_alt_en, ar: r.image_alt_ar }),
          category: { en: r.category_en ?? "", ar: r.category_ar ?? "" },
          date: r.published_at ?? r.created_at.slice(0, 10),
          readTimeMinutes: r.read_time_minutes,
          content: { en: tiptapToParagraphs(r.content_en), ar: tiptapToParagraphs(r.content_ar) },
          featured: r.is_featured,
        }));
      }
    } catch (e) {
      console.error("[cms] getArticles failed:", e);
    }
  }
  return fbArticles;
}
export async function getFeaturedArticles(): Promise<ArticleItem[]> {
  return (await getArticles()).filter((a) => a.featured).slice(0, 4);
}

// ── conditions + treatments (Specialty shape) ─────────────────────────────
function treatmentFromRow(r: MediaRow extends never ? never : Record<string, unknown>, m: Map<string, MediaRow>): SpecialtyTreatment {
  const row = r as {
    id: string; slug: string; icon: string;
    title_en: string; title_ar: string; short_description_en: string; short_description_ar: string;
    full_description_en: string[]; full_description_ar: string[];
    bullets: unknown; footnote: unknown;
    image_id: string | null; image_alt_en: string | null; image_alt_ar: string | null;
  };
  return {
    id: row.id,
    slug: row.slug,
    icon: row.icon as IconName,
    image: img(m, row.image_id, { en: row.title_en, ar: row.title_ar }, { en: row.image_alt_en, ar: row.image_alt_ar }),
    title: { en: row.title_en, ar: row.title_ar },
    shortDescription: { en: row.short_description_en, ar: row.short_description_ar },
    details: { en: row.full_description_en, ar: row.full_description_ar },
    bullets: (Array.isArray(row.bullets) ? row.bullets : []) as SpecialtyTreatment["bullets"],
    footnote: (row.footnote ?? undefined) as SpecialtyTreatment["footnote"],
  };
}

export interface ConditionCardItem {
  id: string;
  slug: string;
  icon: IconName;
  image: { src: string; alt: Localized; position?: string };
  title: Localized;
  tagline: Localized;
  description: Localized;
  details: Localized<string[]>;
  signs: Localized<string[]>;
}

/** The condition cards for Home ("Find Your Treatment") — with modal content. */
export async function getConditions(): Promise<ConditionCardItem[]> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("conditions").select("*").order("display_order");
      if (data && data.length > 0) {
        const m = await mediaMap(supabase, data.map((r) => r.image_id));
        return data.map((r) => ({
          id: r.id,
          slug: r.slug,
          icon: r.icon as IconName,
          image: img(m, r.image_id, { en: r.title_en, ar: r.title_ar }, { en: r.image_alt_en, ar: r.image_alt_ar }),
          title: { en: r.title_en, ar: r.title_ar },
          tagline: { en: r.tagline_en, ar: r.tagline_ar },
          description: { en: r.short_description_en, ar: r.short_description_ar },
          details: { en: r.full_description_en, ar: r.full_description_ar },
          signs: { en: r.signs_en, ar: r.signs_ar },
        }));
      }
    } catch (e) {
      console.error("[cms] getConditions failed:", e);
    }
  }
  return fbSpecialties.map((s) => ({
    id: s.id,
    slug: s.slug,
    icon: s.icon,
    image: s.image,
    title: s.title,
    tagline: s.tagline,
    description: s.description,
    details: { en: [s.description.en], ar: [s.description.ar] },
    signs: { en: [], ar: [] },
  }));
}
export async function getFeaturedConditions(): Promise<ConditionCardItem[]> {
  return (await getConditions()).slice(0, 4);
}

export async function getSpecialties(): Promise<Specialty[]> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const [{ data: conditions }, { data: links }, { data: treatments }] = await Promise.all([
        supabase.from("conditions").select("*").order("display_order"),
        supabase.from("condition_treatments").select("*").order("display_order"),
        supabase.from("treatments").select("*"),
      ]);
      if (conditions && conditions.length > 0 && treatments) {
        const m = await mediaMap(supabase, [
          ...conditions.map((c) => c.image_id),
          ...treatments.map((t) => t.image_id),
        ]);
        const treatmentById = new Map(treatments.map((t) => [t.id, t]));
        return conditions.map((c) => {
          const myLinks = (links ?? [])
            .filter((l) => l.condition_id === c.id)
            .sort((a, b) => a.display_order - b.display_order);
          const myTreatments = myLinks
            .map((l) => treatmentById.get(l.treatment_id))
            .filter((t): t is NonNullable<typeof t> => Boolean(t))
            .map((t) => treatmentFromRow(t as unknown as Record<string, unknown>, m));
          return {
            id: c.id,
            slug: c.slug,
            icon: c.icon as IconName,
            image: img(m, c.image_id, { en: c.title_en, ar: c.title_ar }, { en: c.image_alt_en, ar: c.image_alt_ar }),
            title: { en: c.title_en, ar: c.title_ar },
            tagline: { en: c.tagline_en, ar: c.tagline_ar },
            description: { en: c.short_description_en, ar: c.short_description_ar },
            treatments: myTreatments,
          } satisfies Specialty;
        });
      }
    } catch (e) {
      console.error("[cms] getSpecialties failed:", e);
    }
  }
  return fbSpecialties;
}

// ── about-page collections ────────────────────────────────────────────────
export interface CertificateItem {
  id: string;
  title: Localized;
  issuer: Localized;
  year: Localized;
  image: { src: string; alt: Localized };
}
export async function getCertificates(): Promise<CertificateItem[]> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("certificates").select("*").order("display_order");
      if (data && data.length > 0) {
        const m = await mediaMap(supabase, data.map((r) => r.image_id));
        return data.map((r) => ({
          id: r.id,
          title: { en: r.title_en, ar: r.title_ar },
          issuer: { en: r.institution_en, ar: r.institution_ar },
          year: { en: r.year, ar: r.year },
          image: img(m, r.image_id, { en: r.title_en, ar: r.title_ar }, { en: r.image_alt_en, ar: r.image_alt_ar }),
        }));
      }
    } catch (e) {
      console.error("[cms] getCertificates failed:", e);
    }
  }
  return aboutContent.certifications.items.map((c) => ({ id: c.title.en, title: c.title, issuer: c.issuer, year: c.year, image: c.image }));
}

export interface CareerMilestone {
  id: string;
  period: Localized;
  title: Localized;
  place: Localized;
  detail?: Localized;
  icon: IconName;
  kind: "role" | "education";
}
export async function getCareerItems(): Promise<CareerMilestone[]> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("career_items").select("*").order("display_order");
      if (data && data.length > 0) {
        return data.map((r) => ({
          id: r.id,
          period: { en: r.year, ar: r.year },
          title: { en: r.position_en, ar: r.position_ar },
          place: { en: r.institution_en, ar: r.institution_ar },
          detail: r.description_en || r.description_ar ? { en: r.description_en ?? "", ar: r.description_ar ?? "" } : undefined,
          icon: r.icon as IconName,
          kind: r.kind,
        }));
      }
    } catch (e) {
      console.error("[cms] getCareerItems failed:", e);
    }
  }
  return [
    ...aboutContent.experience.items.map((e) => ({ id: e.role.en, period: e.period, title: e.role, place: e.place, detail: e.detail, icon: "procedure" as IconName, kind: "role" as const })),
    ...aboutContent.education.items.map((e) => ({ id: e.title.en, period: e.year, title: e.title, place: e.place, icon: "graduation" as IconName, kind: "education" as const })),
  ];
}

export interface WhyPoint { id: string; icon: IconName; title: Localized; text: Localized }
export async function getWhyItems(): Promise<WhyPoint[]> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("why_items").select("*").order("display_order");
      if (data && data.length > 0) {
        return data.map((r) => ({ id: r.id, icon: r.icon as IconName, title: { en: r.title_en, ar: r.title_ar }, text: { en: r.text_en, ar: r.text_ar } }));
      }
    } catch (e) {
      console.error("[cms] getWhyItems failed:", e);
    }
  }
  return aboutContent.why.points.map((p, i) => ({ id: String(i), ...p }));
}

export interface ExpertiseItem { id: string; icon: IconName; image: { src: string; alt: Localized }; title: Localized; description: Localized }
export async function getExpertiseAreas(): Promise<ExpertiseItem[]> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("expertise_areas").select("*").order("display_order");
      if (data && data.length > 0) {
        const m = await mediaMap(supabase, data.map((r) => r.image_id));
        return data.map((r) => ({
          id: r.id,
          icon: r.icon as IconName,
          image: img(m, r.image_id, { en: r.title_en, ar: r.title_ar }, { en: r.image_alt_en, ar: r.image_alt_ar }),
          title: { en: r.title_en, ar: r.title_ar },
          description: { en: r.description_en, ar: r.description_ar },
        }));
      }
    } catch (e) {
      console.error("[cms] getExpertiseAreas failed:", e);
    }
  }
  return aboutContent.expertise.items.map((x, i) => ({ id: String(i), ...x }));
}

export interface OtherServiceItem { id: string; icon: IconName; title: Localized; text: Localized }
export async function getOtherServices(): Promise<OtherServiceItem[]> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("other_services").select("*").order("display_order");
      if (data && data.length > 0) {
        return data.map((r) => ({ id: r.id, icon: r.icon as IconName, title: { en: r.title_en, ar: r.title_ar }, text: { en: r.text_en, ar: r.text_ar } }));
      }
    } catch (e) {
      console.error("[cms] getOtherServices failed:", e);
    }
  }
  return OTHER_SERVICES_FALLBACK;
}

export interface GalleryImage { id: string; src: string; alt: Localized; caption?: Localized }
export async function getGalleryImages(): Promise<GalleryImage[]> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("gallery_images").select("*").order("display_order");
      if (data && data.length > 0) {
        const m = await mediaMap(supabase, data.map((r) => r.image_id));
        return data.map((r) => {
          const image = img(m, r.image_id, { en: "", ar: "" }, { en: r.image_alt_en, ar: r.image_alt_ar });
          return { id: r.id, src: image.src, alt: image.alt, caption: r.caption_en || r.caption_ar ? { en: r.caption_en ?? "", ar: r.caption_ar ?? "" } : undefined };
        });
      }
    } catch (e) {
      console.error("[cms] getGalleryImages failed:", e);
    }
  }
  return aboutContent.gallery.images.map((g, i) => ({ id: String(i), src: g.src, alt: g.alt }));
}

export interface ContactAssurance { id: string; icon: IconName; title: Localized; text: Localized }
export async function getContactAssurances(): Promise<ContactAssurance[]> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("contact_assurances").select("*").order("display_order");
      if (data && data.length > 0) {
        return data.map((r) => ({ id: r.id, icon: r.icon as IconName, title: { en: r.title_en, ar: r.title_ar }, text: { en: r.text_en, ar: r.text_ar } }));
      }
    } catch (e) {
      console.error("[cms] getContactAssurances failed:", e);
    }
  }
  return ASSURANCES_FALLBACK;
}

// Fallbacks for content that currently lives inline in a component (not a data file).
const OTHER_SERVICES_FALLBACK: OtherServiceItem[] = [
  { id: "0", icon: "consultation", title: { en: "Second-Opinion Consultations", ar: "استشارات الرأي الثاني" }, text: { en: "A structured review of an existing diagnosis or a recommended operation, with a written summary you can keep.", ar: "مراجعة منظّمة لتشخيص قائم أو عملية موصى بها، مع ملخّص مكتوب تحتفظ به." } },
  { id: "1", icon: "lab", title: { en: "On-Site Andrology Laboratory", ar: "مختبر أمراض ذكورة في الموقع" }, text: { en: "WHO-standard semen analysis, DNA-fragmentation and hormone testing processed without delay.", ar: "تحليل سائل منوي بمعايير منظمة الصحة العالمية، وفحص تفتّت الحمض النووي والهرمونات دون تأخير." } },
  { id: "2", icon: "globe", title: { en: "Care for Travelling Patients", ar: "رعاية المرضى المسافرين" }, text: { en: "Consolidated work-up and surgery scheduling for patients coming from other cities or abroad.", ar: "تجميع الفحوصات وجدولة الجراحة للمرضى القادمين من مدن أخرى أو من الخارج." } },
  { id: "3", icon: "follow-up", title: { en: "Couple & Partner Support", ar: "دعم الزوجين والشريك" }, text: { en: "Joint appointments for fertility decisions, and referral to counselling when it helps.", ar: "مواعيد مشتركة لقرارات الخصوبة، وتحويل للاستشارة النفسية عند الفائدة." } },
];

const ASSURANCES_FALLBACK: ContactAssurance[] = [
  { id: "0", icon: "lock", title: { en: "Held in confidence", ar: "بسرية تامة" }, text: { en: "Your message goes only to a clinic coordinator — never a shared inbox.", ar: "تصل رسالتك إلى منسّق العيادة فقط — لا إلى بريد مشترك." } },
  { id: "1", icon: "clock", title: { en: "A quick reply", ar: "رد سريع" }, text: { en: "Enquiries are usually answered the same working day.", ar: "يُرد على الاستفسارات عادةً في نفس يوم العمل." } },
  { id: "2", icon: "consultation", title: { en: "No obligation", ar: "دون أي التزام" }, text: { en: "A first message is just that. You decide every step after it.", ar: "الرسالة الأولى مجرد بداية. أنت من يقرر كل خطوة بعدها." } },
];
