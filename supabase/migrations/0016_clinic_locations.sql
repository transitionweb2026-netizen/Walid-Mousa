-- ============================================================================
-- 0016: Clinic locations become their own collection (multi-location support)
-- ============================================================================
-- The clinic now has two real locations (Nasr City and Fifth Settlement),
-- each with its own address, map, hours and notes — contact_settings used to
-- hold exactly one of each, which can't represent that. Address/map/hours
-- move to a new ordered `clinic_locations` collection (same shape as every
-- other admin-managed collection, see lib/cms/sectionSchemas-style
-- CollectionManager pages); contact_settings keeps only what's genuinely
-- shared across locations: phone, WhatsApp, email.

create table public.clinic_locations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_en text not null,
  name_ar text not null,
  address_en text not null,
  address_ar text not null,
  address_short_en text not null default '',
  address_short_ar text not null default '',
  notes_en text,
  notes_ar text,
  working_hours jsonb not null default '[]'::jsonb,
  map_embed_url text not null default '',
  map_link_url text not null default '',
  map_directions_url text not null default '',
  location_image_id uuid references public.media (id) on delete set null,
  location_image_alt_en text,
  location_image_alt_ar text,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_clinic_locations_updated_at before update on public.clinic_locations for each row execute function public.set_updated_at();

alter table public.clinic_locations enable row level security;
create policy "read active clinic_locations" on public.clinic_locations for select using (is_active = true);
create policy "manage clinic_locations" on public.clinic_locations for all using (public.is_admin()) with check (public.is_admin());

-- Seed the two real locations. Nasr City carries over the existing
-- contact_settings hours (the clinic's long-standing general hours); Fifth
-- Settlement is new, with the one weekly slot given for it.
insert into public.clinic_locations
  (slug, name_en, name_ar, address_en, address_ar, address_short_en, address_short_ar,
   notes_en, notes_ar, working_hours, map_embed_url, map_link_url, map_directions_url, display_order, is_active)
select
  'nasr-city', 'Nasr City Clinic', 'عيادة مدينة نصر',
  '7 Abbas El-Akkad St., Zone 1, Nasr City, Cairo', '٧ شارع عباس العقاد، الحي الأول، مدينة نصر، القاهرة',
  'Nasr City, Cairo', 'مدينة نصر، القاهرة',
  null, null,
  cs.working_hours,
  '',
  'https://www.google.com/maps/search/?api=1&query=7+Abbas+El-Akkad+St.%2C+Zone+1%2C+Nasr+City%2C+Cairo',
  'https://www.google.com/maps/dir/?api=1&destination=7+Abbas+El-Akkad+St.%2C+Zone+1%2C+Nasr+City%2C+Cairo',
  1, true
from public.contact_settings cs
where cs.id = true;

insert into public.clinic_locations
  (slug, name_en, name_ar, address_en, address_ar, address_short_en, address_short_ar,
   notes_en, notes_ar, working_hours, map_embed_url, map_link_url, map_directions_url, display_order, is_active)
values (
  'fifth-settlement', 'Fifth Settlement Clinic', 'عيادة التجمع الخامس',
  '164 North 90th St. (next to Shifa Hospital), 2nd Floor, Fifth Settlement, Cairo',
  '١٦٤ الشارع التسعين الشمالي (بجوار مستشفى الشفاء)، الدور الثاني، التجمع الخامس، القاهرة',
  'Fifth Settlement, Cairo', 'التجمع الخامس، القاهرة',
  'Entrance via MEWS Cafe', 'المدخل من خلال مقهى MEWS',
  '[{"day":{"en":"Wednesday","ar":"الأربعاء"},"hours":{"en":"8:00 PM – 10:00 PM","ar":"٨:٠٠ م – ١٠:٠٠ م"},"closed":false}]'::jsonb,
  '',
  'https://maps.app.goo.gl/znGs7NjgvcWzYnmAA?g_st=i',
  'https://maps.app.goo.gl/znGs7NjgvcWzYnmAA?g_st=i',
  2, true
);

-- contact_settings keeps only the truly shared fields now (phone/WhatsApp/
-- email). Everything location-specific moved into clinic_locations above.
alter table public.contact_settings
  drop column address_en,
  drop column address_ar,
  drop column address_short_en,
  drop column address_short_ar,
  drop column working_hours,
  drop column map_embed_url,
  drop column map_link_url,
  drop column map_directions_url,
  drop column location_image_id,
  drop column location_image_alt_en,
  drop column location_image_alt_ar;
