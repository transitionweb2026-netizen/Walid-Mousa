-- ============================================================================
-- 0014: independent Home-page image for conditions
-- ============================================================================
-- conditions.image_id was used for BOTH the Services "Choose Your Specialty"
-- card and the Home "Find Your Treatment" card, so uploading a new photo on
-- one page silently changed the other. This adds a second, independent
-- image slot for Home; image_id remains the Services-page (and detail-view)
-- image. When home_image_id is left unset, the Home card falls back to
-- image_id so nothing breaks for existing rows.

alter table public.conditions
  add column home_image_id uuid references public.media (id) on delete set null,
  add column home_image_alt_en text,
  add column home_image_alt_ar text;

comment on column public.conditions.image_id is
  'Image for the Services page "Choose Your Specialty" card and its detail view.';
comment on column public.conditions.home_image_id is
  'Image for the Home page "Find Your Treatment" card. Falls back to image_id when null.';
