-- ============================================================================
-- 0008: The remaining ordered content collections
-- ============================================================================
-- statistics · certificates · career_items · expertise_areas · why_items ·
-- journey_steps · reviews · other_services · gallery_images ·
-- contact_assurances. Each: bilingual text + an icon and/or image_id +
-- display_order + is_active (+ is_featured where a Home subset exists).
-- `statistics` is shared verbatim between Home and About.

create table public.statistics (
  id uuid primary key default gen_random_uuid(),
  icon text not null default 'experience',
  value numeric not null,
  prefix text not null default '',
  suffix text not null default '+',
  label_en text not null,
  label_ar text not null,
  description_en text,
  description_ar text,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.certificates (
  id uuid primary key default gen_random_uuid(),
  image_id uuid references public.media (id) on delete set null,
  image_alt_en text,
  image_alt_ar text,
  title_en text not null,
  title_ar text not null,
  institution_en text not null,
  institution_ar text not null,
  year text not null default '',
  description_en text,
  description_ar text,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.career_items (
  id uuid primary key default gen_random_uuid(),
  year text not null,
  kind text not null default 'role' check (kind in ('role', 'education')),
  icon text not null default 'procedure',
  position_en text not null,
  position_ar text not null,
  institution_en text not null,
  institution_ar text not null,
  description_en text,
  description_ar text,
  image_id uuid references public.media (id) on delete set null,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.expertise_areas (
  id uuid primary key default gen_random_uuid(),
  icon text not null default 'vitality',
  image_id uuid references public.media (id) on delete set null,
  image_alt_en text,
  image_alt_ar text,
  title_en text not null,
  title_ar text not null,
  description_en text not null,
  description_ar text not null,
  display_order int not null default 0,
  is_active boolean not null default true,
  is_featured boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.why_items (
  id uuid primary key default gen_random_uuid(),
  icon text not null default 'shield',
  title_en text not null,
  title_ar text not null,
  text_en text not null,
  text_ar text not null,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.journey_steps (
  id uuid primary key default gen_random_uuid(),
  step_number int not null default 1,
  icon text not null default 'consultation',
  title_en text not null,
  title_ar text not null,
  description_en text not null,
  description_ar text not null,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  display_name text not null,
  context_en text not null default '',
  context_ar text not null default '',
  rating int not null default 5 check (rating between 1 and 5),
  quote_en text not null,
  quote_ar text not null,
  image_id uuid references public.media (id) on delete set null,
  video_media_id uuid references public.media (id) on delete set null,
  display_order int not null default 0,
  is_active boolean not null default true,
  is_featured boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.other_services (
  id uuid primary key default gen_random_uuid(),
  icon text not null default 'consultation',
  title_en text not null,
  title_ar text not null,
  text_en text not null,
  text_ar text not null,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  image_id uuid references public.media (id) on delete set null,
  image_alt_en text,
  image_alt_ar text,
  caption_en text,
  caption_ar text,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.contact_assurances (
  id uuid primary key default gen_random_uuid(),
  icon text not null default 'lock',
  title_en text not null,
  title_ar text not null,
  text_en text not null,
  text_ar text not null,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index statistics_display_order_idx on public.statistics (display_order);
create index certificates_display_order_idx on public.certificates (display_order);
create index career_items_display_order_idx on public.career_items (display_order);
create index expertise_areas_display_order_idx on public.expertise_areas (display_order);
create index why_items_display_order_idx on public.why_items (display_order);
create index journey_steps_display_order_idx on public.journey_steps (display_order);
create index reviews_display_order_idx on public.reviews (display_order);
create index other_services_display_order_idx on public.other_services (display_order);
create index gallery_images_display_order_idx on public.gallery_images (display_order);
create index contact_assurances_display_order_idx on public.contact_assurances (display_order);

do $$
declare t text;
begin
  foreach t in array array[
    'statistics','certificates','career_items','expertise_areas','why_items',
    'journey_steps','reviews','other_services','gallery_images','contact_assurances'
  ]
  loop
    execute format('create trigger set_%1$s_updated_at before update on public.%1$s for each row execute function public.set_updated_at();', t);
    execute format('alter table public.%1$s enable row level security;', t);
    execute format('create policy "read active %1$s" on public.%1$s for select using (is_active = true);', t);
    execute format('create policy "manage %1$s" on public.%1$s for all using (public.is_admin()) with check (public.is_admin());', t);
  end loop;
end $$;
