-- ============================================================================
-- 0013: navigation_items.url and social_links.platform were meant to be
-- natural keys (scripts/seed.ts upserts both `on conflict`) but 0004 never
-- declared them unique — discovered when the seed script was first run
-- against a live database. One social platform per project is also the
-- correct real-world constraint (there is exactly one Facebook page, etc.).
-- ============================================================================

alter table public.navigation_items add constraint navigation_items_url_key unique (url);
alter table public.social_links add constraint social_links_platform_key unique (platform);
