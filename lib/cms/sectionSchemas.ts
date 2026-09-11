export interface SectionFieldDef {
  path: string; // dot-path into content, e.g. "primaryCta.url" or "eyebrow" (bilingual root)
  label: string;
  type: "text" | "textarea" | "media" | "url" | "stringArray";
  bilingual?: boolean; // true => actual paths are `${path}.en` / `${path}.ar`
  mediaCategory?: string;
  help?: string;
}

const INTRO_FIELDS: SectionFieldDef[] = [
  { path: "eyebrow", label: "Eyebrow", type: "text", bilingual: true },
  { path: "title", label: "Title", type: "text", bilingual: true },
  { path: "description", label: "Description", type: "textarea", bilingual: true },
];

const HERO_FIELDS: SectionFieldDef[] = [
  { path: "eyebrow", label: "Eyebrow", type: "text", bilingual: true },
  { path: "headline", label: "Headline", type: "text", bilingual: true },
  { path: "headlineAccent", label: "Headline (accent, gradient-colored word)", type: "text", bilingual: true },
  { path: "description", label: "Description", type: "textarea", bilingual: true },
  { path: "image_id", label: "Hero Cover Image", type: "media", mediaCategory: "hero" },
  { path: "image_position", label: "Image Focal Point (e.g. \"center 20%\")", type: "text" },
  { path: "primaryCta.url", label: "Primary Button URL", type: "url" },
  { path: "primaryCta.label", label: "Primary Button Label", type: "text", bilingual: true },
  { path: "secondaryCta.url", label: "Secondary Button URL", type: "url" },
  { path: "secondaryCta.label", label: "Secondary Button Label", type: "text", bilingual: true },
];

const DOCTOR_INTRO_FIELDS: SectionFieldDef[] = [
  { path: "eyebrow", label: "Eyebrow", type: "text", bilingual: true },
  { path: "heading", label: "Heading", type: "text", bilingual: true },
  { path: "paragraphs", label: "Paragraphs (one per line)", type: "stringArray", bilingual: true },
  { path: "cta.url", label: "\"More About the Doctor\" URL", type: "url" },
  { path: "cta.label", label: "\"More About the Doctor\" Label", type: "text", bilingual: true },
  { path: "video_cover_media_id", label: "Video Cover", type: "media", mediaCategory: "doctor", help: "The poster image shown before playback." },
  { path: "video_media_id", label: "Actual Video File (leave empty to use the YouTube ID below)", type: "media", mediaCategory: "doctor" },
  { path: "youtube_id", label: "YouTube Video ID (the part after v= in the URL)", type: "text" },
  { path: "video_alt", label: "Video Cover Alt Text", type: "text", bilingual: true },
];

const ABOUT_DOCTOR_FIELDS: SectionFieldDef[] = [
  { path: "eyebrow", label: "Eyebrow", type: "text", bilingual: true },
  { path: "heading", label: "Heading", type: "text", bilingual: true },
  { path: "paragraphs", label: "Biography Paragraphs (one per line)", type: "stringArray", bilingual: true },
  { path: "highlight.value", label: "Highlight Stat (e.g. \"18+ years\")", type: "text", bilingual: true },
  { path: "highlight.label", label: "Highlight Caption", type: "textarea", bilingual: true },
  { path: "portrait_media_id", label: "Main Portrait", type: "media", mediaCategory: "doctor" },
  { path: "portrait_layer_1_media_id", label: "Layered Photo (behind, top)", type: "media", mediaCategory: "doctor" },
  { path: "portrait_layer_2_media_id", label: "Layered Photo (behind, bottom)", type: "media", mediaCategory: "doctor" },
  { path: "signature_name", label: "Signature Name", type: "text", bilingual: true },
  { path: "signature_role", label: "Signature Role", type: "text", bilingual: true },
];

const WHY_FIELDS: SectionFieldDef[] = [
  { path: "eyebrow", label: "Eyebrow", type: "text", bilingual: true },
  { path: "heading", label: "Heading", type: "text", bilingual: true },
  { path: "description", label: "Description", type: "textarea", bilingual: true },
  { path: "image_id", label: "Doctor Image", type: "media", mediaCategory: "doctor" },
  { path: "image_alt", label: "Image Alt Text", type: "text", bilingual: true },
];

const WORD_FROM_DOCTOR_FIELDS: SectionFieldDef[] = [
  { path: "eyebrow", label: "Eyebrow", type: "text", bilingual: true },
  { path: "heading", label: "Heading (visually hidden, for screen readers)", type: "text", bilingual: true },
  { path: "image_id", label: "Doctor Image", type: "media", mediaCategory: "doctor" },
  { path: "image_alt", label: "Image Alt Text", type: "text", bilingual: true },
  { path: "quote", label: "Message Paragraphs (one per line)", type: "stringArray", bilingual: true },
  { path: "name", label: "Signature Name", type: "text", bilingual: true },
  { path: "role", label: "Signature Role", type: "text", bilingual: true },
];

const CONTACT_INTRO_FIELDS: SectionFieldDef[] = [
  { path: "eyebrow", label: "Eyebrow", type: "text", bilingual: true },
  { path: "title", label: "Title", type: "text", bilingual: true },
  { path: "description", label: "Description", type: "textarea", bilingual: true },
];

export const SECTION_SCHEMAS: Record<string, SectionFieldDef[]> = {
  hero: HERO_FIELDS,
  doctor_intro: DOCTOR_INTRO_FIELDS,
  stats_intro: INTRO_FIELDS,
  surgeries_intro: INTRO_FIELDS,
  conditions_intro: INTRO_FIELDS,
  technologies_intro: INTRO_FIELDS,
  journey_intro: INTRO_FIELDS,
  reviews_intro: INTRO_FIELDS,
  featured_videos_intro: INTRO_FIELDS,
  faq_intro: INTRO_FIELDS,
  featured_articles_intro: INTRO_FIELDS,
  about_doctor: ABOUT_DOCTOR_FIELDS,
  certificates_intro: INTRO_FIELDS,
  career_intro: INTRO_FIELDS,
  why: WHY_FIELDS,
  expertise_intro: INTRO_FIELDS,
  word_from_doctor: WORD_FROM_DOCTOR_FIELDS,
  achievements_intro: INTRO_FIELDS,
  specialties_intro: INTRO_FIELDS,
  other_services_intro: INTRO_FIELDS,
  video_gallery_intro: INTRO_FIELDS,
  featured_article_intro: INTRO_FIELDS,
  articles_intro: INTRO_FIELDS,
  contact_intro: CONTACT_INTRO_FIELDS,
  map_intro: INTRO_FIELDS,
};

export const SECTION_LABELS: Record<string, string> = {
  hero: "Hero",
  doctor_intro: "Doctor Introduction",
  stats_intro: "Statistics",
  surgeries_intro: "Important Surgeries",
  conditions_intro: "Find Your Treatment",
  technologies_intro: "Technologies Used",
  journey_intro: "Patient Journey",
  reviews_intro: "Patient Reviews",
  featured_videos_intro: "Featured Videos",
  faq_intro: "FAQ",
  featured_articles_intro: "Featured Articles",
  about_doctor: "About the Doctor",
  certificates_intro: "Certificates",
  career_intro: "Career / Professional Journey",
  why: "Why Dr. Walid Moussa?",
  expertise_intro: "Areas of Expertise",
  word_from_doctor: "A Word from the Doctor",
  achievements_intro: "Achievements & Gallery",
  specialties_intro: "Choose Your Specialty",
  other_services_intro: "Other Services",
  video_gallery_intro: "Video Gallery",
  featured_article_intro: "Main Featured Article",
  articles_intro: "Articles Grid",
  contact_intro: "Contact Form Intro",
  map_intro: "Location / Map Intro",
};

export const SECTION_NOTES: Record<string, string> = {
  stats_intro: "The numbers themselves come from Content → Statistics.",
  surgeries_intro: "The cards themselves come from Content → Surgeries.",
  conditions_intro: "The cards themselves come from Content → Conditions (the featured ones).",
  technologies_intro: "The cards themselves come from Content → Technologies.",
  journey_intro: "The steps themselves come from Content → Patient Journey Steps.",
  reviews_intro: "The reviews themselves come from Content → Patient Reviews.",
  featured_videos_intro: "The cards themselves come from Content → Videos (the ones marked Featured).",
  faq_intro: "The questions themselves come from Content → FAQs (scope: Home or All).",
  featured_articles_intro: "The cards themselves come from Content → Articles (the ones marked Featured).",
  certificates_intro: "The certificates themselves come from Content → Certificates.",
  career_intro: "The timeline itself comes from Content → Career Journey.",
  expertise_intro: "The cards themselves come from Content → Areas of Expertise.",
  achievements_intro: "The achievement cards and photo gallery come from Content → Clinic Gallery.",
  specialties_intro: "The specialty cards and their treatment sections come from Content → Conditions / Treatments.",
  other_services_intro: "The cards themselves come from Content → Other Services.",
  video_gallery_intro: "The videos themselves come from Content → Videos.",
  articles_intro: "The article cards come from Content → Articles.",
};
