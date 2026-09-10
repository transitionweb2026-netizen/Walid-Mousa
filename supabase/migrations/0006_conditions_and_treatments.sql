-- ============================================================================
-- 0006: Conditions, Treatments, and the Condition↔Treatment link
-- ============================================================================
-- `conditions` = the medical problems (Erectile Dysfunction, Male Infertility,
-- ...). `treatments` = the individual treatment routes. `condition_treatments`
-- links them many-to-many with a per-link order. The Services page renders one
-- section per active condition (ordered) containing that condition's linked
-- treatments; the Home "Find Your Treatment" section shows featured conditions.
-- Nothing is duplicated — Home and Services reference the same rows.

create table public.conditions (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  icon text not null default 'vitality',
  title_en text not null,
  title_ar text not null,
  tagline_en text not null default '',
  tagline_ar text not null default '',
  short_description_en text not null,
  short_description_ar text not null,
  full_description_en text[] not null default '{}',
  full_description_ar text[] not null default '{}',
  signs_en text[] not null default '{}',
  signs_ar text[] not null default '{}',
  image_id uuid references public.media (id) on delete set null,
  image_alt_en text,
  image_alt_ar text,
  display_order int not null default 0,
  is_active boolean not null default true,
  is_featured boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.condition_seo (
  id uuid primary key default gen_random_uuid(),
  condition_id uuid not null references public.conditions (id) on delete cascade unique,
  seo_title_en text, seo_title_ar text,
  meta_description_en text, meta_description_ar text,
  canonical_url text,
  og_title_en text, og_title_ar text,
  og_description_en text, og_description_ar text,
  og_image_id uuid references public.media (id) on delete set null,
  is_indexed boolean not null default true,
  is_followed boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.treatments (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  icon text not null default 'procedure',
  title_en text not null,
  title_ar text not null,
  short_description_en text not null,
  short_description_ar text not null,
  full_description_en text[] not null default '{}',
  full_description_ar text[] not null default '{}',
  -- [{ label: {en,ar}, items: {en:[],ar:[]}, tone: 'teal'|'pink' }]
  bullets jsonb not null default '[]'::jsonb,
  -- { label: {en,ar}, value: {en,ar} } | null
  footnote jsonb,
  image_id uuid references public.media (id) on delete set null,
  image_alt_en text,
  image_alt_ar text,
  cta_label_en text,
  cta_label_ar text,
  cta_url text,
  display_order int not null default 0,
  is_active boolean not null default true,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.treatment_seo (
  id uuid primary key default gen_random_uuid(),
  treatment_id uuid not null references public.treatments (id) on delete cascade unique,
  seo_title_en text, seo_title_ar text,
  meta_description_en text, meta_description_ar text,
  canonical_url text,
  og_title_en text, og_title_ar text,
  og_description_en text, og_description_ar text,
  og_image_id uuid references public.media (id) on delete set null,
  is_indexed boolean not null default true,
  is_followed boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.condition_treatments (
  condition_id uuid not null references public.conditions (id) on delete cascade,
  treatment_id uuid not null references public.treatments (id) on delete cascade,
  display_order int not null default 0,
  created_at timestamptz not null default now(),
  primary key (condition_id, treatment_id)
);

comment on table public.condition_treatments is
  'Which treatments belong to which condition, and in what order within that condition''s Services-page section. Managed from the CMS "Condition → Treatment links" screen.';

create index conditions_display_order_idx on public.conditions (display_order);
create index treatments_display_order_idx on public.treatments (display_order);
create index condition_treatments_condition_idx on public.condition_treatments (condition_id);
create index condition_treatments_treatment_idx on public.condition_treatments (treatment_id);

create trigger set_conditions_updated_at before update on public.conditions for each row execute function public.set_updated_at();
create trigger set_condition_seo_updated_at before update on public.condition_seo for each row execute function public.set_updated_at();
create trigger set_treatments_updated_at before update on public.treatments for each row execute function public.set_updated_at();
create trigger set_treatment_seo_updated_at before update on public.treatment_seo for each row execute function public.set_updated_at();

alter table public.conditions enable row level security;
alter table public.condition_seo enable row level security;
alter table public.treatments enable row level security;
alter table public.treatment_seo enable row level security;
alter table public.condition_treatments enable row level security;

create policy "read active conditions" on public.conditions for select using (is_active = true);
create policy "manage conditions" on public.conditions for all using (public.is_admin()) with check (public.is_admin());
create policy "read condition_seo" on public.condition_seo for select using (true);
create policy "manage condition_seo" on public.condition_seo for all using (public.is_admin()) with check (public.is_admin());
create policy "read active treatments" on public.treatments for select using (is_active = true);
create policy "manage treatments" on public.treatments for all using (public.is_admin()) with check (public.is_admin());
create policy "read treatment_seo" on public.treatment_seo for select using (true);
create policy "manage treatment_seo" on public.treatment_seo for all using (public.is_admin()) with check (public.is_admin());
create policy "read condition_treatments" on public.condition_treatments for select using (true);
create policy "manage condition_treatments" on public.condition_treatments for all using (public.is_admin()) with check (public.is_admin());
