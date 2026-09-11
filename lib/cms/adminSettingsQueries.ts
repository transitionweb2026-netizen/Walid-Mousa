import { createClient } from "@/lib/supabase/server";
import type { MediaRow } from "@/lib/cms/media";

async function getMedia(supabase: Awaited<ReturnType<typeof createClient>>, id: string | null): Promise<MediaRow | null> {
  if (!id) return null;
  const { data } = await supabase.from("media").select("*").eq("id", id).maybeSingle();
  return data ?? null;
}

export async function getSiteSettings() {
  const supabase = await createClient();
  const { data: site } = await supabase.from("site_settings").select("*").eq("id", true).single();
  if (!site) return null;
  const [logo, favicon, appleTouch, ogImage] = await Promise.all([
    getMedia(supabase, site.logo_media_id),
    getMedia(supabase, site.favicon_media_id),
    getMedia(supabase, site.apple_touch_icon_media_id),
    getMedia(supabase, site.default_og_image_id),
  ]);
  return { ...site, logo_media_id: logo, favicon_media_id: favicon, apple_touch_icon_media_id: appleTouch, default_og_image_id: ogImage };
}

export async function getNavbarSettingsAdmin() {
  const supabase = await createClient();
  const { data } = await supabase.from("navbar_settings").select("*").eq("id", true).single();
  return data;
}
export async function getFooterSettingsAdmin() {
  const supabase = await createClient();
  const { data } = await supabase.from("footer_settings").select("*").eq("id", true).single();
  return data;
}
export async function getCtaSettingsAdmin() {
  const supabase = await createClient();
  const { data: cta } = await supabase.from("cta_settings").select("*").eq("id", true).single();
  if (!cta) return null;
  const background = await getMedia(supabase, cta.background_image_id);
  return { ...cta, background_image_id: background };
}
export async function getContactSettingsAdmin() {
  const supabase = await createClient();
  const { data: contact } = await supabase.from("contact_settings").select("*").eq("id", true).single();
  if (!contact) return null;
  const location = await getMedia(supabase, contact.location_image_id);
  return { ...contact, location_image_id: location };
}
export async function getContactFormSettingsAdmin() {
  const supabase = await createClient();
  const { data } = await supabase.from("contact_form_settings").select("*").eq("id", true).single();
  return data;
}
export async function getNotFoundSettingsAdmin() {
  const supabase = await createClient();
  const { data: nf } = await supabase.from("not_found_settings").select("*").eq("id", true).single();
  if (!nf) return null;
  const image = await getMedia(supabase, nf.image_id);
  return { ...nf, image_id: image };
}
export async function getUiStringsAdmin() {
  const supabase = await createClient();
  const { data } = await supabase.from("ui_strings").select("*").eq("id", true).single();
  return data;
}
