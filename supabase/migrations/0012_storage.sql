-- ============================================================================
-- 0012: Storage buckets and policies
-- ============================================================================
-- Three public-read buckets, split by content type so size limits and
-- allowed MIME types can differ:
--   media          — all images (hero, doctor, cards, certificates, gallery,
--                    articles, OG/SEO images)
--   video-covers   — video thumbnail images only
--   videos         — actual video files (much larger size limit)
--
-- Every bucket is publicly READABLE (the whole site is public marketing
-- content); writes are restricted to authenticated CMS admins/editors.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('media', 'media', true, 10485760, array['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml', 'image/gif', 'image/avif']),
  ('video-covers', 'video-covers', true, 5242880, array['image/png', 'image/jpeg', 'image/webp', 'image/avif']),
  ('videos', 'videos', true, 524288000, array['video/mp4', 'video/webm', 'video/quicktime'])
on conflict (id) do nothing;

do $$
declare b text;
begin
  foreach b in array array['media', 'video-covers', 'videos']
  loop
    execute format($f$create policy "Public read %1$s" on storage.objects for select using (bucket_id = %1$L);$f$, b);
    execute format($f$create policy "Admin insert %1$s" on storage.objects for insert with check (bucket_id = %1$L and public.is_admin());$f$, b);
    execute format($f$create policy "Admin update %1$s" on storage.objects for update using (bucket_id = %1$L and public.is_admin()) with check (bucket_id = %1$L and public.is_admin());$f$, b);
    execute format($f$create policy "Admin delete %1$s" on storage.objects for delete using (bucket_id = %1$L and public.is_admin());$f$, b);
  end loop;
end $$;
