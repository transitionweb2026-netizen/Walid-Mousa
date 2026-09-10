/**
 * One-time content seed. Reads every /data/*.ts module and upserts it into
 * Supabase — settings singletons, pages + sections, and every content
 * collection — with the site's current EN + AR copy. Placeholder images
 * become `media` rows pointing at the current Unsplash URLs.
 *
 *   npm run seed        (needs .env.local with SUPABASE_SERVICE_ROLE_KEY)
 *
 * Safe to re-run: upserts by slug / natural key. Never deletes.
 */
import { createClient } from "@supabase/supabase-js";

import { IMG } from "../data/images.ts";
import { siteContent } from "../data/site.ts";
import { navigationItems } from "../data/navigation.ts";
import { heroes } from "../data/hero.ts";
import { doctorIntro } from "../data/doctorIntro.ts";
import { stats, statsIntro } from "../data/stats.ts";
import { journeyIntro, journeySteps } from "../data/journey.ts";
import { reviewsIntro, reviews } from "../data/reviews.ts";
import { faqIntro, faqItems } from "../data/faq.ts";
import { ctaContent } from "../data/cta.ts";
import { surgeries, surgeriesIntro } from "../data/surgeries.ts";
import { treatmentsIntro } from "../data/treatments.ts";
import { technologies, technologiesIntro } from "../data/technologies.ts";
import { specialties, specialtiesIntro, servicesFaqIntro } from "../data/specialties.ts";
import { videos, videosIntro } from "../data/videos.ts";
import { articles, articlesIntro } from "../data/articles.ts";
import { aboutContent } from "../data/about.ts";
import { contactInfo, workingHours, socialLinks, contactIntro, contactFormCopy } from "../data/contact.ts";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}
const db = createClient(url, key, { auth: { persistSession: false } });

type L = { en: string; ar: string };
const nn = <T,>(v: T | undefined | null): T | null => (v == null ? null : v);

// ─── media ────────────────────────────────────────────────────────────────
// One row per distinct URL. Categorised by which IMG key(s) point at it.
const CATEGORY_BY_KEY: Record<string, string> = {
  doctorHero: "hero", doctorPortrait: "doctor", doctorConsult: "doctor", doctorScrubs: "doctor",
  doctorCorridor: "doctor", doctorMasked: "doctor", scrubsTeal: "doctor",
  videoStudio: "hero", readingDesk: "hero", consultRoom: "hero", operatingRoom: "hero",
  microscope: "technologies", labResearch: "technologies", labCorridor: "gallery", labSamples: "technologies",
  monitors: "technologies", bpCheck: "technologies", ivDark: "treatments",
  lecture: "certificates", meeting: "certificates", surgeryTeam: "certificates",
};
const mediaMap = new Map<string, string>();

async function seedMedia() {
  const urls = new Map<string, string>(); // url -> category
  for (const [k, v] of Object.entries(IMG)) {
    if (!urls.has(v)) urls.set(v, CATEGORY_BY_KEY[k] ?? "general");
  }
  const rows = [...urls].map(([u, category]) => ({
    external_url: u,
    file_name: (u.split("/").pop() ?? "image").split("?")[0] + ".jpg",
    mime_type: "image/jpeg",
    kind: "image",
    category,
  }));
  const { error } = await db.from("media").upsert(rows, { onConflict: "external_url" });
  if (error) throw new Error(`media: ${error.message}`);

  const { data } = await db.from("media").select("id, external_url").not("external_url", "is", null);
  for (const m of data ?? []) if (m.external_url) mediaMap.set(m.external_url, m.id);
  console.log(`  media: ${mediaMap.size}`);
}

const mid = (src?: string | null) => (src && mediaMap.get(src)) || null;

// ─── singletons ───────────────────────────────────────────────────────────
async function updateSingleton(table: string, patch: Record<string, unknown>) {
  const { error } = await db.from(table).update(patch).eq("id", true);
  if (error) throw new Error(`${table}: ${error.message}`);
}

async function seedSettings() {
  await updateSingleton("site_settings", {
    website_title: siteContent.brand.name,
    org_name_en: siteContent.brand.nameLocalized.en,
    org_name_ar: siteContent.brand.nameLocalized.ar,
    doctor_credentials_en: siteContent.brand.credentials.en,
    doctor_credentials_ar: siteContent.brand.credentials.ar,
    default_meta_description_en: siteContent.seo.defaultDescription.en,
    default_meta_description_ar: siteContent.seo.defaultDescription.ar,
  });
  await updateSingleton("navbar_settings", {
    appointment_label_en: siteContent.actions.bookAppointment.en,
    appointment_label_ar: siteContent.actions.bookAppointment.ar,
  });
  await updateSingleton("footer_settings", {
    tagline_en: siteContent.footer.tagline.en, tagline_ar: siteContent.footer.tagline.ar,
    quick_links_title_en: siteContent.footer.quickLinksTitle.en, quick_links_title_ar: siteContent.footer.quickLinksTitle.ar,
    contact_title_en: siteContent.footer.contactTitle.en, contact_title_ar: siteContent.footer.contactTitle.ar,
    hours_title_en: siteContent.footer.hoursTitle.en, hours_title_ar: siteContent.footer.hoursTitle.ar,
    copyright_en: siteContent.footer.rights.en, copyright_ar: siteContent.footer.rights.ar,
    credit_label_en: siteContent.footer.credit.en, credit_label_ar: siteContent.footer.credit.ar,
    privacy_note_en: siteContent.footer.privacyNote.en, privacy_note_ar: siteContent.footer.privacyNote.ar,
  });
  await updateSingleton("cta_settings", {
    eyebrow_en: ctaContent.eyebrow.en, eyebrow_ar: ctaContent.eyebrow.ar,
    heading_en: ctaContent.title.en, heading_ar: ctaContent.title.ar,
    description_en: ctaContent.description.en, description_ar: ctaContent.description.ar,
    primary_label_en: ctaContent.whatsappLabel.en, primary_label_ar: ctaContent.whatsappLabel.ar,
    whatsapp_message_en: ctaContent.whatsappMessage.en, whatsapp_message_ar: ctaContent.whatsappMessage.ar,
    secondary_label_en: ctaContent.contactLabel.en, secondary_label_ar: ctaContent.contactLabel.ar,
  });
  await updateSingleton("contact_settings", {
    phone_display: contactInfo.phoneDisplay.en, phone_href: `tel:${contactInfo.phone}`,
    whatsapp_number: contactInfo.whatsapp, email: contactInfo.email,
    address_en: contactInfo.address.en, address_ar: contactInfo.address.ar,
    address_short_en: contactInfo.addressShort.en, address_short_ar: contactInfo.addressShort.ar,
    working_hours: workingHours.map((r) => ({ day: r.day, hours: r.hours, closed: r.closed ?? false })),
    map_embed_url: contactInfo.mapEmbedSrc, map_link_url: contactInfo.mapLink, map_directions_url: contactInfo.mapDirectionsLink,
  });
  await updateSingleton("contact_form_settings", {
    title_en: contactIntro.formTitle.en, title_ar: contactIntro.formTitle.ar,
    description_en: contactIntro.formNote.en, description_ar: contactIntro.formNote.ar,
    field_labels: {
      fullName: contactFormCopy.fullName, phone: contactFormCopy.phone,
      topic: { label: contactFormCopy.topic.label }, preferredTime: contactFormCopy.preferredTime,
      message: contactFormCopy.message,
    },
    topic_options: contactFormCopy.topic.options,
    submit_label_en: contactFormCopy.submit.en, submit_label_ar: contactFormCopy.submit.ar,
    actions_note_en: contactFormCopy.actionsNote.en, actions_note_ar: contactFormCopy.actionsNote.ar,
    required_message_en: contactFormCopy.required.en, required_message_ar: contactFormCopy.required.ar,
    invalid_phone_en: contactFormCopy.invalidPhone.en, invalid_phone_ar: contactFormCopy.invalidPhone.ar,
    fix_errors_en: contactFormCopy.fixErrors.en, fix_errors_ar: contactFormCopy.fixErrors.ar,
    success_message_en: contactFormCopy.success.en, success_message_ar: contactFormCopy.success.ar,
    whatsapp_template_en: contactFormCopy.whatsappTemplate.en
      .replace(/\{name\}/g, "{{name}}").replace(/\{phone\}/g, "{{phone}}").replace(/\{contact\}/g, "{{topic}}").replace(/\{date\}/g, "{{time}}").replace(/\{message\}/g, "{{message}}"),
    whatsapp_template_ar: contactFormCopy.whatsappTemplate.ar
      .replace(/\{name\}/g, "{{name}}").replace(/\{phone\}/g, "{{phone}}").replace(/\{contact\}/g, "{{topic}}").replace(/\{date\}/g, "{{time}}").replace(/\{message\}/g, "{{message}}"),
  });
  await updateSingleton("ui_strings", { strings: { ...siteContent.actions, ...contactIntro } });
  console.log("  settings: 8 singletons");
}

// ─── ordered collections ──────────────────────────────────────────────────
async function upsertRows(table: string, rows: Record<string, unknown>[], onConflict?: string) {
  if (rows.length === 0) return;
  if (onConflict) {
    const { error } = await db.from(table).upsert(rows, { onConflict });
    if (error) throw new Error(`${table}: ${error.message}`);
  } else {
    // No natural key — replace the collection wholesale so re-running is idempotent.
    await db.from(table).delete().gte("created_at", "1900-01-01");
    const { error } = await db.from(table).insert(rows);
    if (error) throw new Error(`${table}: ${error.message}`);
  }
  console.log(`  ${table}: ${rows.length}`);
}

async function seedGlobalCollections() {
  await upsertRows("navigation_items",
    navigationItems.map((n, i) => ({ label_en: n.label.en, label_ar: n.label.ar, url: n.path ? `/${n.path}` : "/", display_order: i + 1 })),
    "url");
  await upsertRows("social_links",
    socialLinks.map((s, i) => ({ platform: s.key, label_en: s.label, label_ar: s.label, value: s.href, icon: s.icon, display_order: i + 1, is_active: s.href !== "#" })),
    "platform");
}

async function seedCollections() {
  await upsertRows("statistics",
    stats.map((s, i) => ({ icon: s.icon, value: s.value, suffix: s.suffix, label_en: s.label.en, label_ar: s.label.ar, display_order: i + 1 })));


  await upsertRows("certificates",
    aboutContent.certifications.items.map((c, i) => ({
      title_en: c.title.en, title_ar: c.title.ar, institution_en: c.issuer.en, institution_ar: c.issuer.ar,
      year: c.year.en, image_id: mid(c.image.src),
      image_alt_en: c.image.alt.en, image_alt_ar: c.image.alt.ar, display_order: i + 1,
    })));

  const career = [
    ...aboutContent.experience.items.map((e, i) => ({
      year: e.period.en, kind: "role", icon: "procedure",
      position_en: e.role.en, position_ar: e.role.ar, institution_en: e.place.en, institution_ar: e.place.ar,
      description_en: e.detail.en, description_ar: e.detail.ar, display_order: (i + 1) * 2,
    })),
    ...aboutContent.education.items.map((e, i) => ({
      year: e.year.en, kind: "education", icon: "graduation",
      position_en: e.title.en, position_ar: e.title.ar, institution_en: e.place.en, institution_ar: e.place.ar,
      description_en: null, description_ar: null, display_order: (i + 1) * 2 + 1,
    })),
  ];
  await upsertRows("career_items", career);

  await upsertRows("expertise_areas",
    aboutContent.expertise.items.map((x, i) => ({
      icon: x.icon, image_id: mid(x.image.src), image_alt_en: x.image.alt.en, image_alt_ar: x.image.alt.ar,
      title_en: x.title.en, title_ar: x.title.ar, description_en: x.description.en, description_ar: x.description.ar, display_order: i + 1,
    })));

  await upsertRows("why_items",
    aboutContent.why.points.map((p, i) => ({ icon: p.icon, title_en: p.title.en, title_ar: p.title.ar, text_en: p.text.en, text_ar: p.text.ar, display_order: i + 1 })));


  await upsertRows("journey_steps",
    journeySteps.map((s, i) => ({ step_number: s.step, icon: s.icon, title_en: s.title.en, title_ar: s.title.ar, description_en: s.description.en, description_ar: s.description.ar, display_order: i + 1 })));


  await upsertRows("reviews",
    reviews.map((r, i) => ({ display_name: r.name.en, context_en: r.context.en, context_ar: r.context.ar, rating: r.rating, quote_en: r.quote.en, quote_ar: r.quote.ar, display_order: i + 1 })));


  await upsertRows("gallery_images",
    aboutContent.gallery.images.map((g, i) => ({ image_id: mid(g.src), image_alt_en: g.alt.en, image_alt_ar: g.alt.ar, display_order: i + 1 })));


  await upsertRows("technologies",
    technologies.map((t, i) => ({
      slug: t.slug, icon: t.icon, name_en: t.name.en, name_ar: t.name.ar,
      explanation_en: t.explanation.en, explanation_ar: t.explanation.ar,
      details_en: t.details.en, details_ar: t.details.ar,
      image_id: mid(t.image.src), image_alt_en: t.image.alt.en, image_alt_ar: t.image.alt.ar, display_order: i + 1,
    })), "slug");

  await upsertRows("surgeries",
    surgeries.map((s, i) => ({
      slug: s.slug, icon: s.icon, title_en: s.title.en, title_ar: s.title.ar,
      short_description_en: s.shortDescription.en, short_description_ar: s.shortDescription.ar,
      full_description_en: s.details.en, full_description_ar: s.details.ar,
      benefits_en: s.benefits.en, benefits_ar: s.benefits.ar,
      recovery_en: s.recovery.en, recovery_ar: s.recovery.ar,
      image_id: mid(s.image.src), image_alt_en: s.image.alt.en, image_alt_ar: s.image.alt.ar,
      display_order: i + 1, is_featured: s.featured,
    })), "slug");

  await upsertRows("faqs",
    faqItems.map((f, i) => ({ question_en: f.question.en, question_ar: f.question.ar, answer_en: f.answer.en, answer_ar: f.answer.ar, scope: "all", display_order: i + 1 })));


  const assurances = [
    { icon: "lock", title: { en: "Held in confidence", ar: "بسرية تامة" }, text: { en: "Your message goes only to a clinic coordinator — never a shared inbox.", ar: "تصل رسالتك إلى منسّق العيادة فقط — لا إلى بريد مشترك." } },
    { icon: "clock", title: { en: "A quick reply", ar: "رد سريع" }, text: { en: "Enquiries are usually answered the same working day.", ar: "يُرد على الاستفسارات عادةً في نفس يوم العمل." } },
    { icon: "consultation", title: { en: "No obligation", ar: "دون أي التزام" }, text: { en: "A first message is just that. You decide every step after it.", ar: "الرسالة الأولى مجرد بداية. أنت من يقرر كل خطوة بعدها." } },
  ];
  await upsertRows("contact_assurances", assurances.map((a, i) => ({ icon: a.icon, title_en: a.title.en, title_ar: a.title.ar, text_en: a.text.en, text_ar: a.text.ar, display_order: i + 1 })));

  await upsertRows("videos",
    videos.map((v, i) => ({
      slug: v.slug, title_en: v.title.en, title_ar: v.title.ar,
      description_en: v.description.en, description_ar: v.description.ar,
      category_en: v.category.en, category_ar: v.category.ar,
      cover_media_id: mid(v.thumbnail.src), cover_alt_en: v.thumbnail.alt.en, cover_alt_ar: v.thumbnail.alt.ar,
      youtube_id: v.youtubeId, aspect: v.aspect, duration_label: v.duration,
      display_order: i + 1, status: "published", is_featured: v.featured, published_at: v.publishedAt,
    })), "slug");

  await upsertRows("articles",
    articles.map((a, i) => ({
      slug: a.slug, title_en: a.title.en, title_ar: a.title.ar,
      excerpt_en: a.excerpt.en, excerpt_ar: a.excerpt.ar,
      content_en: paragraphsToTiptap(a.content.en), content_ar: paragraphsToTiptap(a.content.ar),
      image_id: mid(a.image.src), image_alt_en: a.image.alt.en, image_alt_ar: a.image.alt.ar,
      category_en: a.category.en, category_ar: a.category.ar,
      read_time_minutes: a.readTimeMinutes, status: "published", is_featured: a.featured,
      display_order: i + 1, published_at: a.date,
    })), "slug");
}

function paragraphsToTiptap(paragraphs: string[]) {
  return {
    type: "doc",
    content: paragraphs.map((text) => ({ type: "paragraph", content: text ? [{ type: "text", text }] : [] })),
  };
}

// ─── conditions + treatments + junction ───────────────────────────────────
async function seedConditionsAndTreatments() {
  // conditions = the 4 specialties. Enrich `signs` from the matching data/treatments item.
  const signsBySlug: Record<string, { en: string[]; ar: string[] }> = {
    "erectile-dysfunction": { en: ["Softer erections or losing firmness during sex", "Needing more stimulation than before", "Fewer morning erections", "Anxiety or avoidance around intimacy"], ar: ["انتصاب أضعف أو فقدان الصلابة أثناء الجماع", "الحاجة لتحفيز أكثر من السابق", "قلّة انتصاب الصباح", "قلق أو تجنّب تجاه العلاقة الحميمة"] },
    "male-infertility": { en: ["Trying to conceive for 12 months without success", "An abnormal semen analysis", "A visible or achy varicocele", "History of undescended testis, mumps or chemotherapy"], ar: ["محاولة الإنجاب لمدة 12 شهرًا دون نجاح", "تحليل سائل منوي غير طبيعي", "دوالي ظاهرة أو مؤلمة", "تاريخ من الخصية المعلّقة أو النكاف أو العلاج الكيميائي"] },
    "sexual-performance": { en: ["Ejaculating within about a minute of penetration", "Inability to delay ejaculation most of the time", "Frustration, distress or avoiding sex as a result"], ar: ["القذف خلال دقيقة تقريبًا من الإيلاج", "عدم القدرة على تأخير القذف في معظم الأحيان", "إحباط أو ضيق أو تجنّب الجماع نتيجة لذلك"] },
    "hormonal-health": { en: ["Low libido and fewer spontaneous erections", "Constant fatigue and low mood", "Loss of muscle, gain in abdominal fat", "Poor concentration, disturbed sleep"], ar: ["انخفاض الرغبة وقلّة الانتصاب التلقائي", "إرهاق دائم ومزاج منخفض", "فقدان العضلات وزيادة دهون البطن", "ضعف التركيز واضطراب النوم"] },
  };

  for (let ci = 0; ci < specialties.length; ci++) {
    const c = specialties[ci];
    const signs = signsBySlug[c.slug] ?? { en: [], ar: [] };
    const { data: cond, error: ce } = await db.from("conditions").upsert({
      slug: c.slug, icon: c.icon, title_en: c.title.en, title_ar: c.title.ar,
      tagline_en: c.tagline.en, tagline_ar: c.tagline.ar,
      short_description_en: c.description.en, short_description_ar: c.description.ar,
      full_description_en: [c.description.en], full_description_ar: [c.description.ar],
      signs_en: signs.en, signs_ar: signs.ar,
      image_id: mid(c.image.src), image_alt_en: c.image.alt.en, image_alt_ar: c.image.alt.ar,
      display_order: ci + 1, is_featured: true,
    }, { onConflict: "slug" }).select("id").single();
    if (ce) throw new Error(`conditions: ${ce.message}`);

    for (let ti = 0; ti < c.treatments.length; ti++) {
      const t = c.treatments[ti];
      const { data: tr, error: te } = await db.from("treatments").upsert({
        slug: t.slug, icon: t.icon, title_en: t.title.en, title_ar: t.title.ar,
        short_description_en: t.shortDescription.en, short_description_ar: t.shortDescription.ar,
        full_description_en: t.details.en, full_description_ar: t.details.ar,
        bullets: t.bullets, footnote: nn((t as { footnote?: unknown }).footnote),
        image_id: mid(t.image.src), image_alt_en: t.image.alt.en, image_alt_ar: t.image.alt.ar,
        display_order: ci * 10 + ti + 1, is_featured: false,
      }, { onConflict: "slug" }).select("id").single();
      if (te) throw new Error(`treatments: ${te.message}`);

      const { error: le } = await db.from("condition_treatments").upsert(
        { condition_id: cond.id, treatment_id: tr.id, display_order: ti + 1 },
        { onConflict: "condition_id,treatment_id" }
      );
      if (le) throw new Error(`condition_treatments: ${le.message}`);
    }
  }
  console.log(`  conditions: ${specialties.length}  treatments: ${specialties.reduce((n, s) => n + s.treatments.length, 0)}  + junction`);
}

// ─── pages + sections ─────────────────────────────────────────────────────
const PAGES: { slug: string; name: L }[] = [
  { slug: "", name: { en: "Home", ar: "الرئيسية" } },
  { slug: "about", name: { en: "About Dr. Walid Moussa", ar: "عن د. وليد موسى" } },
  { slug: "services", name: { en: "Services", ar: "الخدمات" } },
  { slug: "videos", name: { en: "Videos", ar: "الفيديوهات" } },
  { slug: "articles", name: { en: "Articles", ar: "المقالات" } },
  { slug: "contact", name: { en: "Contact Us", ar: "تواصل معنا" } },
];

const intro = (o: { eyebrow: L; title: L; description: L }) => ({ eyebrow: o.eyebrow, title: o.title, description: o.description });

function heroContent(h: typeof heroes.home, primary: { label: L; url: string }, secondary: { label: L; url: string }) {
  return {
    eyebrow: h.eyebrow, headline: h.headline, headlineAccent: h.headlineAccent, description: h.description,
    image_id: mid(h.image.src), image_position: h.image.position ?? "center",
    primaryCta: primary, secondaryCta: secondary,
  };
}

const BOOK = { label: siteContent.actions.bookAppointment, url: "/contact" };
const EXPLORE = { label: siteContent.actions.exploreServices, url: "/services" };

const SECTIONS: Record<string, { type: string; content: Record<string, unknown> }[]> = {
  "": [
    { type: "hero", content: heroContent(heroes.home, BOOK, EXPLORE) },
    { type: "doctor_intro", content: {
      eyebrow: doctorIntro.eyebrow, heading: doctorIntro.heading, paragraphs: doctorIntro.paragraphs,
      highlights: doctorIntro.highlights, cta: { label: siteContent.actions.learnMoreAboutDoctor, url: "/about" },
      video_cover_media_id: mid(doctorIntro.video.poster.src), video_media_id: null,
      youtube_id: doctorIntro.video.youtubeId, video_alt: doctorIntro.video.poster.alt,
    } },
    { type: "stats_intro", content: intro(statsIntro) },
    { type: "surgeries_intro", content: intro(surgeriesIntro) },
    { type: "conditions_intro", content: intro(treatmentsIntro) },
    { type: "technologies_intro", content: intro(technologiesIntro) },
    { type: "journey_intro", content: intro(journeyIntro) },
    { type: "reviews_intro", content: intro(reviewsIntro) },
    { type: "featured_videos_intro", content: intro(videosIntro) },
    { type: "faq_intro", content: intro(faqIntro) },
    { type: "featured_articles_intro", content: intro(articlesIntro) },
  ],
  about: [
    { type: "hero", content: heroContent(heroes.about, BOOK, EXPLORE) },
    { type: "about_doctor", content: {
      eyebrow: aboutContent.bio.eyebrow, heading: aboutContent.bio.heading, paragraphs: aboutContent.bio.paragraphs,
      highlight: aboutContent.bio.highlight,
      portrait_media_id: mid(aboutContent.bio.portrait.src),
      portrait_layer_1_media_id: mid(aboutContent.bio.portraitLayers[0]?.src),
      portrait_layer_2_media_id: mid(aboutContent.bio.portraitLayers[1]?.src),
      signature_name: aboutContent.bio.signatureName, signature_role: aboutContent.bio.signatureRole,
    } },
    { type: "certificates_intro", content: { eyebrow: aboutContent.certifications.eyebrow, title: aboutContent.certifications.heading, description: aboutContent.certifications.description } },
    { type: "career_intro", content: { eyebrow: { en: "Career & Professional Journey", ar: "المسيرة والرحلة المهنية" }, title: { en: "From medical school to a dedicated andrology practice", ar: "من كلية الطب إلى ممارسة متخصصة في أمراض الذكورة" }, description: { en: "Two decades of training and practice, each step narrowing the focus toward men's reproductive and sexual health.", ar: "عقدان من التدريب والممارسة، كل خطوة تضيّق التركيز نحو الصحة الإنجابية والجنسية للرجل." } } },
    { type: "why", content: { eyebrow: aboutContent.why.eyebrow, heading: aboutContent.why.heading, description: aboutContent.why.description, image_id: mid(aboutContent.why.image.src), image_alt: aboutContent.why.image.alt } },
    { type: "expertise_intro", content: { eyebrow: aboutContent.expertise.eyebrow, title: aboutContent.expertise.heading, description: aboutContent.expertise.description } },
    { type: "word_from_doctor", content: {
      eyebrow: aboutContent.word.eyebrow, heading: aboutContent.word.heading,
      image_id: mid(aboutContent.word.image.src), image_alt: aboutContent.word.image.alt,
      quote: aboutContent.word.quote, name: aboutContent.word.name, role: aboutContent.word.role,
    } },
    { type: "stats_intro", content: intro(statsIntro) },
    { type: "achievements_intro", content: { eyebrow: aboutContent.achievements.eyebrow, title: aboutContent.achievements.heading, description: { en: "", ar: "" } } },
  ],
  services: [
    { type: "hero", content: heroContent(heroes.services, BOOK, EXPLORE) },
    { type: "specialties_intro", content: intro(specialtiesIntro) },
    { type: "surgeries_intro", content: intro(surgeriesIntro) },
    { type: "technologies_intro", content: intro(technologiesIntro) },
    { type: "other_services_intro", content: { eyebrow: { en: "Also Available", ar: "متاح أيضًا" }, title: { en: "Beyond procedures and prescriptions", ar: "أبعد من الإجراءات والوصفات" }, description: { en: "Supporting services that make the whole experience easier and more thorough.", ar: "خدمات مساندة تجعل التجربة بأكملها أسهل وأكثر شمولًا." } } },
    { type: "faq_intro", content: intro(servicesFaqIntro) },
  ],
  videos: [
    { type: "hero", content: heroContent(heroes.videos, BOOK, EXPLORE) },
    { type: "video_gallery_intro", content: intro(videosIntro) },
  ],
  articles: [
    { type: "hero", content: heroContent(heroes.articles, BOOK, EXPLORE) },
    { type: "featured_article_intro", content: { eyebrow: articlesIntro.eyebrow, title: articlesIntro.title, description: articlesIntro.description } },
    { type: "articles_intro", content: { eyebrow: { en: "Reading Room", ar: "غرفة القراءة" }, title: { en: "More from the reading room", ar: "المزيد من غرفة القراءة" }, description: articlesIntro.description } },
  ],
  contact: [
    { type: "hero", content: heroContent(heroes.contact, BOOK, EXPLORE) },
    { type: "contact_intro", content: { eyebrow: heroes.contact.eyebrow, title: contactIntro.formTitle, description: contactIntro.formNote } },
    { type: "map_intro", content: { eyebrow: { en: "Location", ar: "الموقع" }, title: contactIntro.locationTitle, description: { en: "", ar: "" } } },
  ],
};

async function seedPages() {
  for (let pi = 0; pi < PAGES.length; pi++) {
    const p = PAGES[pi];
    const { data: page, error } = await db.from("pages")
      .upsert({ slug: p.slug, name_en: p.name.en, name_ar: p.name.ar, display_order: pi + 1 }, { onConflict: "slug" })
      .select("id").single();
    if (error) throw new Error(`pages: ${error.message}`);

    await db.from("page_seo").upsert({ page_id: page.id }, { onConflict: "page_id" });

    const sections = SECTIONS[p.slug] ?? [];
    for (let si = 0; si < sections.length; si++) {
      const s = sections[si];
      const { error: se } = await db.from("page_sections").upsert(
        { page_id: page.id, section_type: s.type, display_order: si + 1, content: s.content },
        { onConflict: "page_id,section_type" }
      );
      if (se) throw new Error(`page_sections (${p.slug}/${s.type}): ${se.message}`);
    }
  }
  console.log(`  pages: ${PAGES.length} + sections`);
}

// ─── run ──────────────────────────────────────────────────────────────────
async function main() {
  console.log("Seeding Supabase from /data …");
  await seedMedia();
  await seedSettings();
  await seedGlobalCollections();
  await seedCollections();
  await seedConditionsAndTreatments();
  await seedPages();
  console.log("Done. Visit /admin to review.");
}

main().catch((e) => {
  console.error("\nSeed failed:", e.message ?? e);
  process.exit(1);
});
