-- ============================================================================
-- 0017: Achievement items (About page's "Recognition" cards) become editable
-- ============================================================================
-- The 4 icon/title/text cards under the About page's Recognition section
-- (currently hardcoded in data/about.ts's aboutContent.achievements.items)
-- get their own admin-managed collection, same shape as why_items.

create table public.achievement_items (
  id uuid primary key default gen_random_uuid(),
  icon text not null default 'award',
  title_en text not null,
  title_ar text not null,
  text_en text not null,
  text_ar text not null,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index achievement_items_display_order_idx on public.achievement_items (display_order);

create trigger set_achievement_items_updated_at before update on public.achievement_items for each row execute function public.set_updated_at();
alter table public.achievement_items enable row level security;
create policy "read active achievement_items" on public.achievement_items for select using (is_active = true);
create policy "manage achievement_items" on public.achievement_items for all using (public.is_admin()) with check (public.is_admin());

insert into public.achievement_items (icon, title_en, title_ar, text_en, text_ar, display_order) values
  ('microscope', '4,500+ microsurgical procedures', 'أكثر من 4,500 عملية ميكروسكوبية', 'One of the highest reproductive-microsurgery volumes in the region.', 'من أعلى معدلات الجراحة الميكروسكوبية للخصوبة في المنطقة.', 1),
  ('consultation', 'Teaching faculty', 'هيئة تدريس', 'Trains urology residents in andrology and microsurgical technique.', 'يدرّب أطباء المسالك البولية على أمراض الذكورة والتقنية الميكروسكوبية.', 2),
  ('plan', 'Guideline contributor', 'مساهم في الإرشادات', 'Contributed to regional consensus statements on male infertility and TRT.', 'أسهم في بيانات التوافق الإقليمية حول عقم الرجال والعلاج بالتستوستيرون.', 3),
  ('youtube', 'Public education', 'توعية عامة', 'Regular talks and videos demystifying men''s health for a general audience.', 'محاضرات وفيديوهات منتظمة تبسّط صحة الرجل للجمهور العام.', 4);
