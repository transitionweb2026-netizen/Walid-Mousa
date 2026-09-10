-- ============================================================================
-- 0004: Global settings — everything shared across every page
-- ============================================================================
-- site_settings / navbar_settings / footer_settings / cta_settings /
-- contact_settings / contact_form_settings / not_found_settings / ui_strings
-- are SINGLETON tables (exactly one row). `id boolean primary key default true
-- check (id)` is the standard Postgres "at most one row" trick — a second
-- INSERT would need id=true again, which the primary key forbids.
--
-- navigation_items / social_links / redirects are real ordered collections.

-- ----------------------------------------------------------------------------
-- site_settings — website identity + global SEO defaults
-- ----------------------------------------------------------------------------
create table public.site_settings (
  id boolean primary key default true check (id),
  website_title text not null default 'Dr. Walid Moussa',
  website_url text not null default 'https://www.drwalidmoussa.com',
  org_name_en text not null default 'Dr. Walid Moussa',
  org_name_ar text not null default 'د. وليد موسى',
  doctor_specialty_en text not null default 'Consultant Andrologist & Reproductive Microsurgeon',
  doctor_specialty_ar text not null default 'استشاري أمراض الذكورة وجرّاح الخصوبة الميكروسكوبي',
  doctor_credentials_en text not null default 'Andrology & Male Infertility Specialist',
  doctor_credentials_ar text not null default 'استشاري أمراض الذكورة والعقم عند الرجال',
  logo_media_id uuid references public.media (id) on delete set null,
  favicon_media_id uuid references public.media (id) on delete set null,
  apple_touch_icon_media_id uuid references public.media (id) on delete set null,
  default_meta_description_en text,
  default_meta_description_ar text,
  default_og_image_id uuid references public.media (id) on delete set null,
  default_language text not null default 'en' check (default_language in ('en', 'ar')),
  default_robots text not null default 'index,follow',
  updated_at timestamptz not null default now()
);
insert into public.site_settings (id) values (true);

-- ----------------------------------------------------------------------------
-- navbar_settings — the appointment button (nav links are navigation_items)
-- ----------------------------------------------------------------------------
create table public.navbar_settings (
  id boolean primary key default true check (id),
  appointment_label_en text not null default 'Book an Appointment',
  appointment_label_ar text not null default 'احجز موعدك',
  appointment_url text not null default '/contact',
  show_language_switcher boolean not null default true,
  updated_at timestamptz not null default now()
);
insert into public.navbar_settings (id) values (true);

-- ----------------------------------------------------------------------------
-- footer_settings
-- ----------------------------------------------------------------------------
create table public.footer_settings (
  id boolean primary key default true check (id),
  tagline_en text,
  tagline_ar text,
  quick_links_title_en text not null default 'Quick Links',
  quick_links_title_ar text not null default 'روابط سريعة',
  contact_title_en text not null default 'Get in Touch',
  contact_title_ar text not null default 'تواصل معنا',
  hours_title_en text not null default 'Clinic Hours',
  hours_title_ar text not null default 'مواعيد العيادة',
  copyright_en text not null default 'All rights reserved.',
  copyright_ar text not null default 'جميع الحقوق محفوظة.',
  credit_label_en text not null default 'Crafted by Transition',
  credit_label_ar text not null default 'تصميم وتطوير Transition',
  credit_url text not null default '',
  privacy_note_en text,
  privacy_note_ar text,
  updated_at timestamptz not null default now()
);
insert into public.footer_settings (id) values (true);

-- ----------------------------------------------------------------------------
-- cta_settings — the ONE Final CTA shared verbatim by every page
-- ----------------------------------------------------------------------------
create table public.cta_settings (
  id boolean primary key default true check (id),
  eyebrow_en text not null default 'Take the First Step',
  eyebrow_ar text not null default 'اتخذ الخطوة الأولى',
  heading_en text not null default 'A private conversation is where every solution starts',
  heading_ar text not null default 'الحوار الخاص هو حيث يبدأ كل حل',
  description_en text,
  description_ar text,
  primary_label_en text not null default 'Message on WhatsApp',
  primary_label_ar text not null default 'راسلنا على واتساب',
  primary_is_whatsapp boolean not null default true,
  primary_url text not null default '',
  whatsapp_message_en text not null default 'Hello Dr. Walid Moussa''s clinic, I''d like to book a confidential consultation.',
  whatsapp_message_ar text not null default 'مرحبًا عيادة د. وليد موسى، أود حجز استشارة سرية.',
  secondary_label_en text not null default 'Go to Contact Page',
  secondary_label_ar text not null default 'اذهب لصفحة التواصل',
  secondary_url text not null default '/contact',
  background_image_id uuid references public.media (id) on delete set null,
  is_visible boolean not null default true,
  updated_at timestamptz not null default now()
);
insert into public.cta_settings (id) values (true);

-- ----------------------------------------------------------------------------
-- contact_settings — the single source of truth for phone / WhatsApp /
-- address / map. Never hardcode any of these in the frontend.
-- ----------------------------------------------------------------------------
create table public.contact_settings (
  id boolean primary key default true check (id),
  phone_display text not null default '',
  phone_href text not null default '',
  whatsapp_number text not null default '', -- digits only, e.g. 201000000000
  email text not null default '',
  address_en text not null default '',
  address_ar text not null default '',
  address_short_en text not null default '',
  address_short_ar text not null default '',
  working_hours jsonb not null default '[]'::jsonb,
  map_embed_url text not null default '',
  map_link_url text not null default '',
  map_directions_url text not null default '',
  location_image_id uuid references public.media (id) on delete set null,
  location_image_alt_en text,
  location_image_alt_ar text,
  updated_at timestamptz not null default now()
);
insert into public.contact_settings (id) values (true);

comment on column public.contact_settings.whatsapp_number is
  'Digits only (country code + number, no +). Single source of truth for every WhatsApp link.';
comment on column public.contact_settings.working_hours is
  'jsonb array of { day: {en,ar}, hours: {en,ar}, closed?: bool }.';

-- ----------------------------------------------------------------------------
-- contact_form_settings — the patient form's editable copy + WhatsApp template
-- ----------------------------------------------------------------------------
create table public.contact_form_settings (
  id boolean primary key default true check (id),
  title_en text not null default 'Send a Private Message',
  title_ar text not null default 'أرسل رسالة خاصة',
  description_en text,
  description_ar text,
  field_labels jsonb not null default '{}'::jsonb,
  topic_options jsonb not null default '[]'::jsonb,
  submit_label_en text not null default 'Send on WhatsApp',
  submit_label_ar text not null default 'أرسل عبر واتساب',
  actions_note_en text,
  actions_note_ar text,
  required_message_en text not null default 'This field is required.',
  required_message_ar text not null default 'هذا الحقل مطلوب.',
  invalid_phone_en text not null default 'Please enter a valid phone number.',
  invalid_phone_ar text not null default 'يرجى إدخال رقم هاتف صحيح.',
  fix_errors_en text not null default 'Please complete the highlighted fields.',
  fix_errors_ar text not null default 'يرجى إكمال الحقول المميّزة.',
  success_message_en text not null default 'WhatsApp should have opened in a new tab with your message ready — just press send.',
  success_message_ar text not null default 'من المفترض أن واتساب فُتح في تبويب جديد ورسالتك جاهزة — فقط اضغط إرسال.',
  whatsapp_template_en text not null default
    E'New enquiry for Dr. Walid Moussa\nName: {{name}}\nPhone: {{phone}}\nTopic: {{topic}}\nBest time: {{time}}\nMessage: {{message}}',
  whatsapp_template_ar text not null default
    E'استفسار جديد لعيادة د. وليد موسى\nالاسم: {{name}}\nالهاتف: {{phone}}\nالموضوع: {{topic}}\nأفضل وقت: {{time}}\nالرسالة: {{message}}',
  updated_at timestamptz not null default now()
);
insert into public.contact_form_settings (id) values (true);

comment on column public.contact_form_settings.field_labels is
  'jsonb: { fullName: {label{en,ar}, placeholder{en,ar}}, phone: {...}, topic: {label{en,ar}}, preferredTime: {...}, message: {...} }';
comment on column public.contact_form_settings.whatsapp_template_en is
  'Plain-text template with {{name}} {{phone}} {{topic}} {{time}} {{message}} placeholders, substituted client-side before opening wa.me.';

-- ----------------------------------------------------------------------------
-- not_found_settings — the 404 page
-- ----------------------------------------------------------------------------
create table public.not_found_settings (
  id boolean primary key default true check (id),
  code text not null default '404',
  heading_en text not null default 'This page could not be found',
  heading_ar text not null default 'تعذّر العثور على هذه الصفحة',
  description_en text not null default 'The page may have moved or the link may be incomplete.',
  description_ar text not null default 'ربما تم نقل الصفحة أو أن الرابط غير مكتمل.',
  primary_label_en text not null default 'Back to Home',
  primary_label_ar text not null default 'العودة للرئيسية',
  primary_url text not null default '/',
  secondary_label_en text not null default 'Contact',
  secondary_label_ar text not null default 'تواصل معنا',
  secondary_url text not null default '/contact',
  image_id uuid references public.media (id) on delete set null,
  updated_at timestamptz not null default now()
);
insert into public.not_found_settings (id) values (true);

-- ----------------------------------------------------------------------------
-- ui_strings — every shared, sitewide micro-label as { en, ar }. Editing here
-- is deliberately "advanced" (a JSON-shaped form), because these strings very
-- rarely change; the point is that NOTHING visible is un-editable.
-- ----------------------------------------------------------------------------
create table public.ui_strings (
  id boolean primary key default true check (id),
  strings jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
insert into public.ui_strings (id) values (true);

comment on column public.ui_strings.strings is
  'Flat map of key -> {en,ar}: bookAppointment, exploreServices, readArticle, viewDetails, play, close, menu, minRead, skipToContent, viewAllVideos, viewAllArticles, searchArticles, noResults, keyBenefits, commonSigns, learnMoreAboutDoctor, ...';

-- ----------------------------------------------------------------------------
-- navigation_items — Navbar / Footer / MobileMenu links (ordered collection)
-- ----------------------------------------------------------------------------
create table public.navigation_items (
  id uuid primary key default gen_random_uuid(),
  label_en text not null,
  label_ar text not null,
  url text not null,
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- social_links — Hero contact panel / Footer / Contact page (ordered)
-- ----------------------------------------------------------------------------
create table public.social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null check (platform in ('phone', 'whatsapp', 'facebook', 'instagram', 'youtube', 'tiktok', 'twitter', 'linkedin')),
  label_en text not null,
  label_ar text not null,
  value text not null,
  icon text not null default 'globe',
  display_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on column public.social_links.value is 'Full href — tel:, https://wa.me/..., or a profile URL.';

-- ----------------------------------------------------------------------------
-- redirects — 301/302 managed without code changes (applied in proxy.ts)
-- ----------------------------------------------------------------------------
create table public.redirects (
  id uuid primary key default gen_random_uuid(),
  from_path text not null unique,
  to_path text not null,
  status_code int not null default 301 check (status_code in (301, 302)),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on column public.redirects.from_path is 'Root-relative path to match exactly, e.g. /old-services (no locale prefix).';

-- ----------------------------------------------------------------------------
-- triggers
-- ----------------------------------------------------------------------------
create trigger set_site_settings_updated_at before update on public.site_settings for each row execute function public.set_updated_at();
create trigger set_navbar_settings_updated_at before update on public.navbar_settings for each row execute function public.set_updated_at();
create trigger set_footer_settings_updated_at before update on public.footer_settings for each row execute function public.set_updated_at();
create trigger set_cta_settings_updated_at before update on public.cta_settings for each row execute function public.set_updated_at();
create trigger set_contact_settings_updated_at before update on public.contact_settings for each row execute function public.set_updated_at();
create trigger set_contact_form_settings_updated_at before update on public.contact_form_settings for each row execute function public.set_updated_at();
create trigger set_not_found_settings_updated_at before update on public.not_found_settings for each row execute function public.set_updated_at();
create trigger set_ui_strings_updated_at before update on public.ui_strings for each row execute function public.set_updated_at();
create trigger set_navigation_items_updated_at before update on public.navigation_items for each row execute function public.set_updated_at();
create trigger set_social_links_updated_at before update on public.social_links for each row execute function public.set_updated_at();
create trigger set_redirects_updated_at before update on public.redirects for each row execute function public.set_updated_at();

-- ----------------------------------------------------------------------------
-- RLS — all global content is public-readable (the whole site depends on it
-- rendering for anonymous visitors); only admins write.
-- ----------------------------------------------------------------------------
alter table public.site_settings enable row level security;
alter table public.navbar_settings enable row level security;
alter table public.footer_settings enable row level security;
alter table public.cta_settings enable row level security;
alter table public.contact_settings enable row level security;
alter table public.contact_form_settings enable row level security;
alter table public.not_found_settings enable row level security;
alter table public.ui_strings enable row level security;
alter table public.navigation_items enable row level security;
alter table public.social_links enable row level security;
alter table public.redirects enable row level security;

create policy "read site_settings" on public.site_settings for select using (true);
create policy "manage site_settings" on public.site_settings for all using (public.is_admin()) with check (public.is_admin());
create policy "read navbar_settings" on public.navbar_settings for select using (true);
create policy "manage navbar_settings" on public.navbar_settings for all using (public.is_admin()) with check (public.is_admin());
create policy "read footer_settings" on public.footer_settings for select using (true);
create policy "manage footer_settings" on public.footer_settings for all using (public.is_admin()) with check (public.is_admin());
create policy "read cta_settings" on public.cta_settings for select using (true);
create policy "manage cta_settings" on public.cta_settings for all using (public.is_admin()) with check (public.is_admin());
create policy "read contact_settings" on public.contact_settings for select using (true);
create policy "manage contact_settings" on public.contact_settings for all using (public.is_admin()) with check (public.is_admin());
create policy "read contact_form_settings" on public.contact_form_settings for select using (true);
create policy "manage contact_form_settings" on public.contact_form_settings for all using (public.is_admin()) with check (public.is_admin());
create policy "read not_found_settings" on public.not_found_settings for select using (true);
create policy "manage not_found_settings" on public.not_found_settings for all using (public.is_admin()) with check (public.is_admin());
create policy "read ui_strings" on public.ui_strings for select using (true);
create policy "manage ui_strings" on public.ui_strings for all using (public.is_admin()) with check (public.is_admin());
create policy "read active navigation_items" on public.navigation_items for select using (is_active = true);
create policy "manage navigation_items" on public.navigation_items for all using (public.is_admin()) with check (public.is_admin());
create policy "read active social_links" on public.social_links for select using (is_active = true);
create policy "manage social_links" on public.social_links for all using (public.is_admin()) with check (public.is_admin());
create policy "read active redirects" on public.redirects for select using (is_active = true);
create policy "manage redirects" on public.redirects for all using (public.is_admin()) with check (public.is_admin());
