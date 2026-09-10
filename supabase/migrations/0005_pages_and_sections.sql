-- ============================================================================
-- 0005: Pages, page sections, and page SEO
-- ============================================================================
-- `pages` mirrors the site's 6 real routes. `page_sections` is one row per
-- section INSTANCE on a page (its type, order, visibility, and its own small
-- amount of bilingual copy). Copy lives in a `content` jsonb column rather
-- than fixed columns, because each `section_type` has a different shape (a
-- Hero has a headline + two CTAs; a "stats intro" has only eyebrow/title,
-- since the numbers live in the separate `statistics` table). Collections
-- like conditions/articles/videos get real normalized tables (0006+)
-- precisely because THEY need independent ordering/filtering/CRUD.
--
-- Section types by page (see lib/cms/sectionSchemas.ts for each shape):
--   home:     hero, doctor_intro, stats_intro, surgeries_intro,
--             conditions_intro, technologies_intro, journey_intro,
--             reviews_intro, featured_videos_intro, faq_intro,
--             featured_articles_intro
--   about:    hero, about_doctor, certificates_intro, career_intro, why,
--             expertise_intro, word_from_doctor, stats_intro,
--             achievements_intro
--   services: hero, specialties_intro, surgeries_intro, technologies_intro,
--             other_services_intro, faq_intro
--   videos:   hero, video_gallery_intro
--   articles: hero, featured_article_intro, articles_intro
--   contact:  hero, contact_intro, map_intro
-- (The Final CTA is global — cta_settings — not a page_section.)

create table public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique, -- '' = home, 'about', 'services', 'videos', 'articles', 'contact'
  name_en text not null,
  name_ar text not null,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.page_sections (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.pages (id) on delete cascade,
  section_type text not null,
  display_order int not null default 0,
  is_visible boolean not null default true,
  content jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (page_id, section_type)
);

comment on column public.page_sections.content is
  'Bilingual copy + media-id references for this section instance. Shape depends on section_type — see lib/cms/sectionSchemas.ts.';

create index page_sections_page_id_idx on public.page_sections (page_id);

create table public.page_seo (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.pages (id) on delete cascade unique,
  seo_title_en text,
  seo_title_ar text,
  meta_description_en text,
  meta_description_ar text,
  canonical_url text,
  og_title_en text,
  og_title_ar text,
  og_description_en text,
  og_description_ar text,
  og_image_id uuid references public.media (id) on delete set null,
  twitter_title_en text,
  twitter_title_ar text,
  twitter_description_en text,
  twitter_description_ar text,
  twitter_image_id uuid references public.media (id) on delete set null,
  is_indexed boolean not null default true,
  is_followed boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_pages_updated_at before update on public.pages for each row execute function public.set_updated_at();
create trigger set_page_sections_updated_at before update on public.page_sections for each row execute function public.set_updated_at();
create trigger set_page_seo_updated_at before update on public.page_seo for each row execute function public.set_updated_at();

alter table public.pages enable row level security;
alter table public.page_sections enable row level security;
alter table public.page_seo enable row level security;

create policy "read pages" on public.pages for select using (true);
create policy "manage pages" on public.pages for all using (public.is_admin()) with check (public.is_admin());
create policy "read visible page_sections" on public.page_sections for select using (is_visible = true);
create policy "manage page_sections" on public.page_sections for all using (public.is_admin()) with check (public.is_admin());
create policy "read page_seo" on public.page_seo for select using (true);
create policy "manage page_seo" on public.page_seo for all using (public.is_admin()) with check (public.is_admin());
