-- ============================================================================
-- 0011: FAQs
-- ============================================================================
-- One collection. `scope` decides which pages show a given FAQ so the Home
-- and Services FAQ sections can share the same rows without duplication:
--   all      -> shown on both Home and Services
--   home     -> Home only
--   services -> Services only

create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question_en text not null,
  question_ar text not null,
  answer_en text not null,
  answer_ar text not null,
  scope text not null default 'all' check (scope in ('all', 'home', 'services')),
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index faqs_display_order_idx on public.faqs (display_order);
create index faqs_scope_idx on public.faqs (scope);

create trigger set_faqs_updated_at before update on public.faqs for each row execute function public.set_updated_at();

alter table public.faqs enable row level security;

create policy "read active faqs" on public.faqs for select using (is_active = true);
create policy "manage faqs" on public.faqs for all using (public.is_admin()) with check (public.is_admin());
