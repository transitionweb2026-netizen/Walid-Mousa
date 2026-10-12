-- ============================================================================
-- 0015: Final CTA becomes a per-page section instead of one global singleton
-- ============================================================================
-- Each of the 6 pages now owns its own `final_cta` page_sections row (see
-- lib/cms/sectionSchemas.ts's FINAL_CTA_FIELDS / lib/cms/publicSections.ts's
-- toFinalCta()), rather than every page reading the same cta_settings row.
-- Seed one `final_cta` section per page from the current cta_settings values
-- so no page loses its CTA card, then drop the now-unused singleton table.

insert into public.page_sections (page_id, section_type, display_order, is_visible, content)
select
  p.id,
  'final_cta',
  coalesce((select max(ps.display_order) from public.page_sections ps where ps.page_id = p.id), 0) + 1,
  cta.is_visible,
  jsonb_build_object(
    'eyebrow', jsonb_build_object('en', cta.eyebrow_en, 'ar', cta.eyebrow_ar),
    'title', jsonb_build_object('en', cta.heading_en, 'ar', cta.heading_ar),
    'description', jsonb_build_object('en', coalesce(cta.description_en, ''), 'ar', coalesce(cta.description_ar, '')),
    'primaryLabel', jsonb_build_object('en', cta.primary_label_en, 'ar', cta.primary_label_ar),
    'primaryIsWhatsapp', cta.primary_is_whatsapp,
    'primaryUrl', cta.primary_url,
    'whatsappMessage', jsonb_build_object('en', cta.whatsapp_message_en, 'ar', cta.whatsapp_message_ar),
    'secondaryLabel', jsonb_build_object('en', cta.secondary_label_en, 'ar', cta.secondary_label_ar),
    'secondaryUrl', cta.secondary_url,
    'background_image_id', cta.background_image_id::text
  )
from public.pages p
cross join public.cta_settings cta
on conflict (page_id, section_type) do nothing;

drop table public.cta_settings;
