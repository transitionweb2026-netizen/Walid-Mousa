import { createClient } from "@/lib/supabase/server";
import type { MediaRow } from "@/lib/cms/media";

/**
 * Server-side fetchers for the admin "Content" collection pages. Each
 * selects EVERY row (not just active/published — the CMS needs to see and
 * edit hidden/draft content) and, for tables with a media FK, joins the
 * related `media` row(s) in application code so <CollectionManager>'s
 * MediaPicker can preview the current image immediately (see
 * adminSeoQueries.ts for why this isn't PostgREST's embed syntax).
 */

async function loadMediaMap(supabase: Awaited<ReturnType<typeof createClient>>) {
  const { data } = await supabase.from("media").select("*");
  return new Map((data ?? []).map((m) => [m.id, m] as const));
}

function attachMedia<T extends Record<string, unknown>>(row: T, mediaMap: Map<string, MediaRow>, ...fkKeys: (keyof T)[]): T {
  const next = { ...row };
  for (const key of fkKeys) {
    const id = row[key];
    if (typeof id === "string") (next as Record<string, unknown>)[key as string] = mediaMap.get(id) ?? null;
  }
  return next;
}

async function withMedia(table: "conditions" | "treatments" | "surgeries" | "technologies" | "certificates" | "career_items" | "expertise_areas" | "gallery_images", ...fkKeys: string[]) {
  const supabase = await createClient();
  const [{ data }, mediaMap] = await Promise.all([supabase.from(table).select("*").order("display_order"), loadMediaMap(supabase)]);
  return (data ?? []).map((row) => attachMedia(row as Record<string, unknown>, mediaMap, ...fkKeys));
}

export const getAdminConditions = () => withMedia("conditions", "image_id");
export const getAdminTreatments = () => withMedia("treatments", "image_id");
export const getAdminSurgeries = () => withMedia("surgeries", "image_id");
export const getAdminTechnologies = () => withMedia("technologies", "image_id");
export const getAdminCertificates = () => withMedia("certificates", "image_id");
export const getAdminCareerItems = () => withMedia("career_items", "image_id");
export const getAdminExpertiseAreas = () => withMedia("expertise_areas", "image_id");
export const getAdminGalleryImages = () => withMedia("gallery_images", "image_id");

export async function getAdminStatistics() {
  const supabase = await createClient();
  const { data } = await supabase.from("statistics").select("*").order("display_order");
  return data ?? [];
}
export async function getAdminWhyItems() {
  const supabase = await createClient();
  const { data } = await supabase.from("why_items").select("*").order("display_order");
  return data ?? [];
}
export async function getAdminJourneySteps() {
  const supabase = await createClient();
  const { data } = await supabase.from("journey_steps").select("*").order("display_order");
  return data ?? [];
}
export async function getAdminReviews() {
  const supabase = await createClient();
  const [{ data }, mediaMap] = await Promise.all([supabase.from("reviews").select("*").order("display_order"), loadMediaMap(supabase)]);
  return (data ?? []).map((row) => attachMedia(row as Record<string, unknown>, mediaMap, "image_id", "video_media_id"));
}
export async function getAdminOtherServices() {
  const supabase = await createClient();
  const { data } = await supabase.from("other_services").select("*").order("display_order");
  return data ?? [];
}
export async function getAdminContactAssurances() {
  const supabase = await createClient();
  const { data } = await supabase.from("contact_assurances").select("*").order("display_order");
  return data ?? [];
}
export async function getAdminFaqs() {
  const supabase = await createClient();
  const { data } = await supabase.from("faqs").select("*").order("display_order");
  return data ?? [];
}

export async function getAdminVideos() {
  const supabase = await createClient();
  const [{ data }, mediaMap] = await Promise.all([supabase.from("videos").select("*").order("display_order"), loadMediaMap(supabase)]);
  return (data ?? []).map((row) => attachMedia(row as Record<string, unknown>, mediaMap, "cover_media_id", "video_media_id"));
}

export async function getAdminArticles() {
  const supabase = await createClient();
  const [{ data }, mediaMap] = await Promise.all([supabase.from("articles").select("*").order("display_order"), loadMediaMap(supabase)]);
  return (data ?? []).map((row) => attachMedia(row as Record<string, unknown>, mediaMap, "image_id"));
}

export async function getAdminNavigationItems() {
  const supabase = await createClient();
  const { data } = await supabase.from("navigation_items").select("*").order("display_order");
  return data ?? [];
}
export async function getAdminSocialLinks() {
  const supabase = await createClient();
  const { data } = await supabase.from("social_links").select("*").order("display_order");
  return data ?? [];
}
export async function getAdminRedirects() {
  const supabase = await createClient();
  const { data } = await supabase.from("redirects").select("*").order("created_at", { ascending: false });
  return data ?? [];
}

export async function getAdminConditionTreatments() {
  const supabase = await createClient();
  const { data } = await supabase.from("condition_treatments").select("*").order("display_order");
  return data ?? [];
}

export async function getAdminMedia() {
  const supabase = await createClient();
  const { data } = await supabase.from("media").select("*").order("created_at", { ascending: false });
  return data ?? [];
}
