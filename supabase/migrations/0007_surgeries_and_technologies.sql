-- ============================================================================
-- 0007: Surgeries and Technologies
-- ============================================================================
-- Two independent collections. `surgeries` = the "Important Surgeries" cards
-- (Home shows is_featured; Services shows the full list under #surgeries).
-- `technologies` = the equipment cards (no CTA anywhere).

create table public.surgeries (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  icon text not null default 'procedure',
  title_en text not null,
  title_ar text not null,
  short_description_en text not null,
  short_description_ar text not null,
  full_description_en text[] not null default '{}',
  full_description_ar text[] not null default '{}',
  benefits_en text[] not null default '{}',
  benefits_ar text[] not null default '{}',
  recovery_en text,
  recovery_ar text,
  image_id uuid references public.media (id) on delete set null,
  image_alt_en text,
  image_alt_ar text,
  display_order int not null default 0,
  is_active boolean not null default true,
  is_featured boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.surgery_seo (
  id uuid primary key default gen_random_uuid(),
  surgery_id uuid not null references public.surgeries (id) on delete cascade unique,
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

create table public.technologies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  icon text not null default 'microscope',
  name_en text not null,
  name_ar text not null,
  explanation_en text not null,
  explanation_ar text not null,
  details_en text[] not null default '{}',
  details_ar text[] not null default '{}',
  image_id uuid references public.media (id) on delete set null,
  image_alt_en text,
  image_alt_ar text,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index surgeries_display_order_idx on public.surgeries (display_order);
create index surgeries_is_featured_idx on public.surgeries (is_featured) where is_featured = true;
create index technologies_display_order_idx on public.technologies (display_order);

create trigger set_surgeries_updated_at before update on public.surgeries for each row execute function public.set_updated_at();
create trigger set_surgery_seo_updated_at before update on public.surgery_seo for each row execute function public.set_updated_at();
create trigger set_technologies_updated_at before update on public.technologies for each row execute function public.set_updated_at();

alter table public.surgeries enable row level security;
alter table public.surgery_seo enable row level security;
alter table public.technologies enable row level security;

create policy "read active surgeries" on public.surgeries for select using (is_active = true);
create policy "manage surgeries" on public.surgeries for all using (public.is_admin()) with check (public.is_admin());
create policy "read surgery_seo" on public.surgery_seo for select using (true);
create policy "manage surgery_seo" on public.surgery_seo for all using (public.is_admin()) with check (public.is_admin());
create policy "read active technologies" on public.technologies for select using (is_active = true);
create policy "manage technologies" on public.technologies for all using (public.is_admin()) with check (public.is_admin());
