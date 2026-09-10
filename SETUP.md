# Connecting Supabase & the CMS

The public website and the CMS admin at `/admin` are both fully built and
wired to Supabase. Until a real Supabase project is connected, the public
site quietly renders the bundled content from `/data/*.ts` and `/admin` shows
a "connect Supabase first" screen. Nothing in the code needs to change — this
is a one-time setup, ~15 minutes, browser + text editor only.

## 1. Create a Supabase project

1. [supabase.com](https://supabase.com) → **New project**. Pick any name /
   region, set a database password (save it).
2. Wait ~2 minutes for provisioning.

## 2. Run the migrations, in order

The full schema — tables, RLS policies, storage buckets — lives in
`supabase/migrations/`, 12 numbered files. In the Supabase Dashboard open
**SQL Editor → New query**, then for each file **in numeric order**, paste
its entire contents and click **Run**:

```
0001_extensions_and_helpers.sql
0002_profiles.sql
0003_media.sql
0004_global_settings.sql
0005_pages_and_sections.sql
0006_conditions_and_treatments.sql
0007_surgeries_and_technologies.sql
0008_content_collections.sql
0009_videos.sql
0010_articles.sql
0011_faqs.sql
0012_storage.sql
```

Order matters — later files reference earlier tables/functions.

(With the Supabase CLI: `supabase link --project-ref <ref>` then
`supabase db push`. Run `supabase init` first — this repo has no
`config.toml`.)

## 3. Set environment variables

**Project Settings → API** gives you three values. Create `.env.local` in the
project root (already gitignored):

```
NEXT_PUBLIC_SUPABASE_URL=https://<your-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...anon
SUPABASE_SERVICE_ROLE_KEY=eyJ...service_role
NEXT_PUBLIC_SITE_URL=https://www.drwalidmoussa.com
```

## 4. Seed the content

With `.env.local` in place, from the project root:

```bash
npm run seed
```

This reads every `/data/*.ts` module and populates all tables — settings,
pages + sections, and every content collection — with the site's current
EN + AR copy. Placeholder images become `media` rows pointing at the current
Unsplash URLs (replace them later from the CMS Media Library). Re-running is
safe: it upserts by slug / key.

## 5. Create your first admin user

**Authentication → Users → Add user** in the Supabase dashboard (set "Auto
confirm"). The **first** user created automatically becomes an `admin` (see
`0002_profiles.sql`); everyone after is an `editor` until an admin promotes
them from the dashboard's Table Editor (`profiles.role`).

## 6. Verify

```bash
npm run dev
```

- Visit `/en` — pages should look identical (now served from Supabase). Any
  `[cms] ... failed` warning in the server log means a query fell back to
  bundled content; the error names the cause.
- Visit `/admin` → sign in → edit e.g. **Content → FAQs**, save, refresh the
  public page — the change appears immediately (`/[locale]` renders
  per-request, not from a build cache).

## 7. Optional: precise TypeScript types

`lib/supabase/types.ts` is hand-written. Once connected you can regenerate it:

```bash
npx supabase gen types typescript --project-id <your-ref> > lib/supabase/types.ts
```

Not required — everything works against the hand-written types.

## Going live — real content checklist

Everything below is editable from the CMS (no code):

1. **Media Library** — replace every Unsplash placeholder with real photos of
   Dr. Moussa, the clinic and equipment.
2. **Content → Videos** — upload real video files (or set the YouTube ID) and
   real covers; the two are independent.
3. **Global Settings → Contact Information** — real phone, WhatsApp digits,
   email, address, working hours, and the Google Maps embed + links.
4. **Global Settings → Social Media** — real profile URLs.
5. **Content → Statistics / Certificates / Career** — confirm the numbers and
   CV with the doctor.
6. **SEO** — set Global + per-page meta, canonical, OG images, favicon.
