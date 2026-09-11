import "server-only";
import { getPublicClient } from "./publicClient";
import { toMediaImage, type MediaRow } from "./media";
import { siteContent } from "@/data/site";
import { navigationItems as fallbackNav, type NavItem } from "@/data/navigation";
import {
  contactInfo as fallbackContact,
  socialLinks as fallbackSocial,
  workingHours as fallbackHours,
  contactIntro as fallbackContactIntro,
  contactFormCopy as fallbackFormCopy,
  type SocialLink,
  type WorkingHoursRow,
} from "@/data/contact";
import { ctaContent } from "@/data/cta";
import type { Localized, MediaImage } from "@/lib/types";

/**
 * Every "Global Settings" screen's data. Each getter is Supabase-first with a
 * typed fallback to the matching /data/*.ts constant — an unconfigured or
 * unreachable project never breaks a page (see publicClient.ts).
 */

// ── branding ──────────────────────────────────────────────────────────────
export interface SiteBranding {
  name: Localized;
  credentials: Localized;
  specialty: Localized;
  websiteTitle: string;
  websiteUrl: string;
  orgName: Localized;
  defaultMetaDescription: Localized;
  defaultRobots: string;
  logo: MediaImage | null;
  favicon: string | null;
  appleTouchIcon: string | null;
  defaultOgImage: string | null;
}

export async function getSiteBranding(): Promise<SiteBranding> {
  const fallback: SiteBranding = {
    name: siteContent.brand.nameLocalized,
    credentials: siteContent.brand.credentials,
    specialty: { en: "Consultant Andrologist & Reproductive Microsurgeon", ar: "استشاري أمراض الذكورة وجرّاح الخصوبة الميكروسكوبي" },
    websiteTitle: siteContent.brand.name,
    websiteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.drwalidmoussa.com",
    orgName: siteContent.brand.nameLocalized,
    defaultMetaDescription: siteContent.seo.defaultDescription,
    defaultRobots: "index,follow",
    logo: null,
    favicon: null,
    appleTouchIcon: null,
    defaultOgImage: null,
  };
  const supabase = await getPublicClient();
  if (!supabase) return fallback;
  try {
    const { data } = await supabase.from("site_settings").select("*").eq("id", true).maybeSingle();
    if (!data) return fallback;
    const media = await loadMedia(supabase, [data.logo_media_id, data.favicon_media_id, data.apple_touch_icon_media_id, data.default_og_image_id]);
    const url = (id: string | null) => (id ? (media.get(id)?.external_url ?? mediaStorageUrl(media.get(id))) : null);
    return {
      name: { en: data.org_name_en, ar: data.org_name_ar },
      credentials: { en: data.doctor_credentials_en, ar: data.doctor_credentials_ar },
      specialty: { en: data.doctor_specialty_en, ar: data.doctor_specialty_ar },
      websiteTitle: data.website_title,
      websiteUrl: data.website_url,
      orgName: { en: data.org_name_en, ar: data.org_name_ar },
      defaultMetaDescription: { en: data.default_meta_description_en ?? fallback.defaultMetaDescription.en, ar: data.default_meta_description_ar ?? fallback.defaultMetaDescription.ar },
      defaultRobots: data.default_robots,
      logo: data.logo_media_id ? toMediaImage(media.get(data.logo_media_id) ?? null, fallback.name) : null,
      favicon: url(data.favicon_media_id),
      appleTouchIcon: url(data.apple_touch_icon_media_id),
      defaultOgImage: url(data.default_og_image_id),
    };
  } catch (error) {
    console.error("[cms] getSiteBranding failed:", error);
    return fallback;
  }
}

// ── navbar ────────────────────────────────────────────────────────────────
export interface NavbarSettings {
  items: NavItem[];
  appointmentLabel: Localized;
  appointmentUrl: string;
  showLanguageSwitcher: boolean;
}

export async function getNavbarSettings(): Promise<NavbarSettings> {
  const fallback: NavbarSettings = {
    items: fallbackNav,
    appointmentLabel: siteContent.actions.bookAppointment,
    appointmentUrl: "/contact",
    showLanguageSwitcher: true,
  };
  const supabase = await getPublicClient();
  if (!supabase) return fallback;
  try {
    const [{ data: nav }, { data: settings }] = await Promise.all([
      supabase.from("navigation_items").select("*").order("display_order"),
      supabase.from("navbar_settings").select("*").eq("id", true).maybeSingle(),
    ]);
    return {
      items:
        nav && nav.length > 0
          ? nav.map((r) => ({ key: r.id, label: { en: r.label_en, ar: r.label_ar }, path: r.url === "/" ? "" : r.url.replace(/^\/+/, "") }))
          : fallbackNav,
      appointmentLabel: settings ? { en: settings.appointment_label_en, ar: settings.appointment_label_ar } : fallback.appointmentLabel,
      appointmentUrl: settings?.appointment_url ?? "/contact",
      showLanguageSwitcher: settings?.show_language_switcher ?? true,
    };
  } catch (error) {
    console.error("[cms] getNavbarSettings failed:", error);
    return fallback;
  }
}

// ── social links ──────────────────────────────────────────────────────────
export async function getSocialLinks(): Promise<SocialLink[]> {
  const supabase = await getPublicClient();
  if (!supabase) return fallbackSocial;
  try {
    const { data } = await supabase.from("social_links").select("*").order("display_order");
    if (data && data.length > 0) {
      return data.map((r) => ({ key: r.platform as SocialLink["key"], label: r.label_en, icon: r.icon as SocialLink["icon"], href: r.value }));
    }
  } catch (error) {
    console.error("[cms] getSocialLinks failed:", error);
  }
  return fallbackSocial;
}

// ── footer ────────────────────────────────────────────────────────────────
export interface FooterContent {
  tagline: Localized;
  quickLinksTitle: Localized;
  contactTitle: Localized;
  hoursTitle: Localized;
  copyright: Localized;
  credit: Localized;
  creditUrl: string;
  privacyNote: Localized;
}

export async function getFooterContent(): Promise<FooterContent> {
  const fallback: FooterContent = {
    tagline: siteContent.footer.tagline,
    quickLinksTitle: siteContent.footer.quickLinksTitle,
    contactTitle: siteContent.footer.contactTitle,
    hoursTitle: siteContent.footer.hoursTitle,
    copyright: siteContent.footer.rights,
    credit: siteContent.footer.credit,
    creditUrl: "",
    privacyNote: siteContent.footer.privacyNote,
  };
  const supabase = await getPublicClient();
  if (!supabase) return fallback;
  try {
    const { data } = await supabase.from("footer_settings").select("*").eq("id", true).maybeSingle();
    if (!data) return fallback;
    return {
      tagline: { en: data.tagline_en || fallback.tagline.en, ar: data.tagline_ar || fallback.tagline.ar },
      quickLinksTitle: { en: data.quick_links_title_en, ar: data.quick_links_title_ar },
      contactTitle: { en: data.contact_title_en, ar: data.contact_title_ar },
      hoursTitle: { en: data.hours_title_en, ar: data.hours_title_ar },
      copyright: { en: data.copyright_en, ar: data.copyright_ar },
      credit: { en: data.credit_label_en, ar: data.credit_label_ar },
      creditUrl: data.credit_url,
      privacyNote: { en: data.privacy_note_en || fallback.privacyNote.en, ar: data.privacy_note_ar || fallback.privacyNote.ar },
    };
  } catch (error) {
    console.error("[cms] getFooterContent failed:", error);
    return fallback;
  }
}

// ── contact info ──────────────────────────────────────────────────────────
export interface ContactInfo {
  phone: string;
  phoneDisplay: Localized;
  whatsapp: string;
  email: string;
  address: Localized;
  addressShort: Localized;
  workingHours: WorkingHoursRow[];
  mapEmbedSrc: string;
  mapLink: string;
  mapDirectionsLink: string;
  locationImage: MediaImage | null;
}

export async function getContactInfo(): Promise<ContactInfo> {
  const fallback: ContactInfo = {
    phone: fallbackContact.phone,
    phoneDisplay: fallbackContact.phoneDisplay,
    whatsapp: fallbackContact.whatsapp,
    email: fallbackContact.email,
    address: fallbackContact.address,
    addressShort: fallbackContact.addressShort,
    workingHours: fallbackHours,
    mapEmbedSrc: fallbackContact.mapEmbedSrc,
    mapLink: fallbackContact.mapLink,
    mapDirectionsLink: fallbackContact.mapDirectionsLink,
    locationImage: null,
  };
  const supabase = await getPublicClient();
  if (!supabase) return fallback;
  try {
    const { data } = await supabase.from("contact_settings").select("*").eq("id", true).maybeSingle();
    if (!data || !data.phone_display) return fallback;
    const hours = Array.isArray(data.working_hours) ? (data.working_hours as unknown as WorkingHoursRow[]) : fallbackHours;
    const locImg = data.location_image_id ? await loadOne(supabase, data.location_image_id) : null;
    return {
      phone: data.phone_href.replace(/^tel:/, ""),
      phoneDisplay: { en: data.phone_display, ar: data.phone_display },
      whatsapp: data.whatsapp_number,
      email: data.email,
      address: { en: data.address_en, ar: data.address_ar },
      addressShort: { en: data.address_short_en, ar: data.address_short_ar },
      workingHours: hours,
      mapEmbedSrc: data.map_embed_url,
      mapLink: data.map_link_url,
      mapDirectionsLink: data.map_directions_url,
      locationImage: locImg
        ? toMediaImage(locImg, { en: data.location_image_alt_en ?? "", ar: data.location_image_alt_ar ?? "" })
        : null,
    };
  } catch (error) {
    console.error("[cms] getContactInfo failed:", error);
    return fallback;
  }
}

// ── final CTA ─────────────────────────────────────────────────────────────
export interface FinalCta {
  eyebrow: Localized;
  title: Localized;
  description: Localized;
  primaryLabel: Localized;
  primaryIsWhatsapp: boolean;
  primaryUrl: string;
  whatsappMessage: Localized;
  secondaryLabel: Localized;
  secondaryUrl: string;
  backgroundImage: MediaImage | null;
  isVisible: boolean;
}

export async function getFinalCta(): Promise<FinalCta> {
  const fallback: FinalCta = {
    eyebrow: ctaContent.eyebrow,
    title: ctaContent.title,
    description: ctaContent.description,
    primaryLabel: ctaContent.whatsappLabel,
    primaryIsWhatsapp: true,
    primaryUrl: "",
    whatsappMessage: ctaContent.whatsappMessage,
    secondaryLabel: ctaContent.contactLabel,
    secondaryUrl: "/contact",
    backgroundImage: null,
    isVisible: true,
  };
  const supabase = await getPublicClient();
  if (!supabase) return fallback;
  try {
    const { data } = await supabase.from("cta_settings").select("*").eq("id", true).maybeSingle();
    if (!data) return fallback;
    const bg = data.background_image_id ? await loadOne(supabase, data.background_image_id) : null;
    return {
      eyebrow: { en: data.eyebrow_en, ar: data.eyebrow_ar },
      title: { en: data.heading_en, ar: data.heading_ar },
      description: { en: data.description_en || fallback.description.en, ar: data.description_ar || fallback.description.ar },
      primaryLabel: { en: data.primary_label_en, ar: data.primary_label_ar },
      primaryIsWhatsapp: data.primary_is_whatsapp,
      primaryUrl: data.primary_url,
      whatsappMessage: { en: data.whatsapp_message_en, ar: data.whatsapp_message_ar },
      secondaryLabel: { en: data.secondary_label_en, ar: data.secondary_label_ar },
      secondaryUrl: data.secondary_url,
      backgroundImage: bg ? toMediaImage(bg, { en: "", ar: "" }) : null,
      isVisible: data.is_visible,
    };
  } catch (error) {
    console.error("[cms] getFinalCta failed:", error);
    return fallback;
  }
}

// ── contact form ──────────────────────────────────────────────────────────
export interface ContactFormSettings {
  title: Localized;
  description: Localized;
  fields: {
    fullName: { label: Localized; placeholder: Localized };
    phone: { label: Localized; placeholder: Localized };
    topic: { label: Localized };
    preferredTime: { label: Localized; placeholder: Localized };
    message: { label: Localized; placeholder: Localized };
  };
  topicOptions: { value: string; label: Localized }[];
  submitLabel: Localized;
  actionsNote: Localized;
  requiredMessage: Localized;
  invalidPhone: Localized;
  fixErrors: Localized;
  successMessage: Localized;
  whatsappTemplate: Localized;
}

export async function getContactFormSettings(): Promise<ContactFormSettings> {
  const c = fallbackFormCopy;
  const fallback: ContactFormSettings = {
    title: fallbackContactIntro.formTitle,
    description: fallbackContactIntro.formNote,
    fields: {
      fullName: c.fullName,
      phone: c.phone,
      topic: { label: c.topic.label },
      preferredTime: c.preferredTime,
      message: c.message,
    },
    topicOptions: c.topic.options,
    submitLabel: c.submit,
    actionsNote: c.actionsNote,
    requiredMessage: c.required,
    invalidPhone: c.invalidPhone,
    fixErrors: c.fixErrors,
    successMessage: c.success,
    whatsappTemplate: {
      en: c.whatsappTemplate.en.replace(/\{name\}/g, "{{name}}").replace(/\{phone\}/g, "{{phone}}").replace(/\{contact\}/g, "{{topic}}").replace(/\{date\}/g, "{{time}}").replace(/\{message\}/g, "{{message}}"),
      ar: c.whatsappTemplate.ar.replace(/\{name\}/g, "{{name}}").replace(/\{phone\}/g, "{{phone}}").replace(/\{contact\}/g, "{{topic}}").replace(/\{date\}/g, "{{time}}").replace(/\{message\}/g, "{{message}}"),
    },
  };
  const supabase = await getPublicClient();
  if (!supabase) return fallback;
  try {
    const { data } = await supabase.from("contact_form_settings").select("*").eq("id", true).maybeSingle();
    if (!data) return fallback;
    const fl = (data.field_labels ?? {}) as Record<string, { label?: Localized; placeholder?: Localized }>;
    const merge = (key: keyof typeof fallback.fields) => ({
      label: fl[key]?.label ?? fallback.fields[key].label,
      placeholder: (fl[key]?.placeholder ?? (fallback.fields[key] as { placeholder?: Localized }).placeholder ?? { en: "", ar: "" }),
    });
    return {
      title: { en: data.title_en, ar: data.title_ar },
      description: { en: data.description_en || fallback.description.en, ar: data.description_ar || fallback.description.ar },
      fields: {
        fullName: merge("fullName"),
        phone: merge("phone"),
        topic: { label: fl.topic?.label ?? fallback.fields.topic.label },
        preferredTime: merge("preferredTime"),
        message: merge("message"),
      },
      topicOptions: Array.isArray(data.topic_options) && data.topic_options.length > 0 ? (data.topic_options as unknown as { value: string; label: Localized }[]) : fallback.topicOptions,
      submitLabel: { en: data.submit_label_en, ar: data.submit_label_ar },
      actionsNote: { en: data.actions_note_en ?? fallback.actionsNote.en, ar: data.actions_note_ar ?? fallback.actionsNote.ar },
      requiredMessage: { en: data.required_message_en, ar: data.required_message_ar },
      invalidPhone: { en: data.invalid_phone_en, ar: data.invalid_phone_ar },
      fixErrors: { en: data.fix_errors_en, ar: data.fix_errors_ar },
      successMessage: { en: data.success_message_en, ar: data.success_message_ar },
      whatsappTemplate: { en: data.whatsapp_template_en, ar: data.whatsapp_template_ar },
    };
  } catch (error) {
    console.error("[cms] getContactFormSettings failed:", error);
    return fallback;
  }
}

// ── contact intro copy (Direct Lines / hours / map labels) ────────────────
export async function getContactIntro() {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("ui_strings").select("strings").eq("id", true).maybeSingle();
      const s = (data?.strings ?? {}) as Record<string, Localized>;
      return { ...fallbackContactIntro, ...pickLocalized(s, Object.keys(fallbackContactIntro)) };
    } catch (error) {
      console.error("[cms] getContactIntro failed:", error);
    }
  }
  return fallbackContactIntro;
}

// ── ui strings ────────────────────────────────────────────────────────────
export type UiStrings = typeof siteContent.actions & Record<string, Localized>;

export async function getUiStrings(): Promise<UiStrings> {
  const supabase = await getPublicClient();
  if (supabase) {
    try {
      const { data } = await supabase.from("ui_strings").select("strings").eq("id", true).maybeSingle();
      const s = (data?.strings ?? {}) as Record<string, Localized>;
      return { ...siteContent.actions, ...s } as UiStrings;
    } catch (error) {
      console.error("[cms] getUiStrings failed:", error);
    }
  }
  return { ...siteContent.actions } as UiStrings;
}

// ── 404 ───────────────────────────────────────────────────────────────────
export interface NotFoundSettings {
  code: string;
  heading: Localized;
  description: Localized;
  primaryLabel: Localized;
  primaryUrl: string;
  secondaryLabel: Localized;
  secondaryUrl: string;
}

export async function getNotFoundSettings(): Promise<NotFoundSettings> {
  const fallback: NotFoundSettings = {
    code: "404",
    heading: { en: "This page could not be found", ar: "تعذّر العثور على هذه الصفحة" },
    description: { en: "The page may have moved or the link may be incomplete.", ar: "ربما تم نقل الصفحة أو أن الرابط غير مكتمل." },
    primaryLabel: { en: "Back to Home", ar: "العودة للرئيسية" },
    primaryUrl: "/",
    secondaryLabel: { en: "Contact", ar: "تواصل معنا" },
    secondaryUrl: "/contact",
  };
  const supabase = await getPublicClient();
  if (!supabase) return fallback;
  try {
    const { data } = await supabase.from("not_found_settings").select("*").eq("id", true).maybeSingle();
    if (!data) return fallback;
    return {
      code: data.code,
      heading: { en: data.heading_en, ar: data.heading_ar },
      description: { en: data.description_en, ar: data.description_ar },
      primaryLabel: { en: data.primary_label_en, ar: data.primary_label_ar },
      primaryUrl: data.primary_url,
      secondaryLabel: { en: data.secondary_label_en, ar: data.secondary_label_ar },
      secondaryUrl: data.secondary_url,
    };
  } catch (error) {
    console.error("[cms] getNotFoundSettings failed:", error);
    return fallback;
  }
}

// ── helpers ───────────────────────────────────────────────────────────────
type PC = NonNullable<Awaited<ReturnType<typeof getPublicClient>>>;

async function loadMedia(supabase: PC, ids: (string | null)[]): Promise<Map<string, MediaRow>> {
  const unique = [...new Set(ids.filter((i): i is string => Boolean(i)))];
  if (unique.length === 0) return new Map();
  const { data } = await supabase.from("media").select("*").in("id", unique);
  return new Map((data ?? []).map((m) => [m.id, m] as const));
}
async function loadOne(supabase: PC, id: string): Promise<MediaRow | null> {
  const { data } = await supabase.from("media").select("*").eq("id", id).maybeSingle();
  return data ?? null;
}
function mediaStorageUrl(m: MediaRow | undefined): string | null {
  if (!m) return null;
  if (m.external_url) return m.external_url;
  if (m.bucket_id && m.storage_path && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${m.bucket_id}/${m.storage_path}`;
  }
  return null;
}
function pickLocalized(source: Record<string, Localized>, keys: string[]): Record<string, Localized> {
  const out: Record<string, Localized> = {};
  for (const k of keys) if (source[k]) out[k] = source[k];
  return out;
}
