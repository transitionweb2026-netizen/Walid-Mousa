# Dr. Walid Moussa — Andrology & Men's Health

A premium, bilingual (English / Arabic) marketing website for **Dr. Walid
Moussa**, consultant andrologist, with a full custom CMS. Built with
**Next.js 16** (App Router, React 19, TypeScript, Turbopack), **Tailwind
CSS v4** (liquid-glass design system in turquoise `#2DC4B6` and pink
`#FF3366`), and **Supabase** (Postgres + Storage + Auth + RLS) as the CMS
backend.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000 — redirects to /en or /ar
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint (flat config)
npm run seed     # populate a connected Supabase project from /data/*.ts
```

The site and the `/admin` CMS both run without any setup — every public page
and every `lib/cms/public*.ts` getter falls back to the bundled content in
`/data/*.ts` when Supabase isn't configured. To connect a real Supabase
project (required for `/admin` to actually save anything), follow
**[SETUP.md](./SETUP.md)**.

Env vars (`cp .env.local.example .env.local`):

| Variable | Effect |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Connects the public site + admin to Supabase (see SETUP.md) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only; used for the rare service-role admin operation |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for sitemap / robots / OG URLs |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Overrides `data/contact.ts` for every WhatsApp link (pre-CMS fallback only) |

## Pages

`app/[locale]/` — `en` and `ar`, six routes: `/` (home), `/about`,
`/services`, `/videos`, `/articles`, `/contact`. `proxy.ts` (Next 16's
renamed `middleware.ts`) checks the CMS `redirects` table for the bare
incoming path first (Admin → Redirects), then redirects bare paths to the
visitor's locale. Every page opens with the same full-bleed `<Hero>` +
floating contact panel; only the copy and cover image change (CMS Pages →
each page's Hero section, `data/hero.ts` as fallback).

Home CTAs deep-link into the Services page via anchors (`/services#surgeries`,
`/services#treatments`); card modals open from `#surgery-<slug>` /
`#treatment-<slug>` / `#tx-<specialty>-<slug>` hashes (`lib/useHashSelection.ts`).
On `/services`, the **Choose Your Specialty** grid anchor-scrolls 1:1 to a
matching `#specialty-<slug>` treatment section (4 cards + modals each).

## Content model — Supabase-backed CMS, `/data/*.ts` as seed + fallback

Every editable string, image, video, and relationship on the site is a real
Postgres row, managed from `/admin` (Supabase Auth-gated) and read by the
public site through `lib/cms/public*.ts`. `/data/*.ts` is **not** the live
content source anymore — it is:

1. the **seed data** `npm run seed` (`scripts/seed.ts`) loads into a freshly
   migrated Supabase project, and
2. the **offline fallback** every `lib/cms/public*.ts` getter returns to when
   Supabase is unset/unreachable, so the site never hard-fails.

To change live content, use the CMS at `/admin` (see below) — editing
`/data/*.ts` after go-live only changes the fallback/reseed content, not what
visitors see.

| Layer | Where |
|---|---|
| Database schema | `supabase/migrations/0001…0012` (~30 tables, RLS everywhere) |
| Supabase clients | `lib/supabase/{client,server,admin,proxy}.ts` |
| Public data layer (Supabase-first, `/data` fallback) | `lib/cms/public{Client,Settings,Sections,Content,Seo}.ts`, `media.ts`, `jsonContent.ts`, `jsonPath.ts` |
| Section field schemas | `lib/cms/sectionSchemas.ts` |
| Admin UI | `app/admin/**` — Dashboard, Pages (section editors), Content (18 collections), Media Library, Global Settings (9 singletons), SEO (Global/Page/Condition/Treatment/Surgery/Article), Redirects |
| Admin write path | `app/admin/actions/*.ts` — generic CRUD (`collections.ts`), page sections, settings, media upload, SEO, condition↔treatment links |
| Structured data | `lib/structuredData.ts` + `components/seo/JsonLd.tsx` — Physician/MedicalOrganization/WebSite sitewide, WebPage/BreadcrumbList per page, Article per published article |
| Seed script | `scripts/seed.ts` (`npm run seed`) |

See **[SETUP.md](./SETUP.md)** to connect a Supabase project, run the
migrations, seed, and create the first admin user.

### Going live — the checklist

Everything below is editable from `/admin` once Supabase is connected —
no code changes needed:

1. **Media Library** — replace every Unsplash placeholder with real photos
   of Dr. Moussa / the clinic / equipment.
2. **Content → Videos** — upload real video files (or set a YouTube id) and
   real covers; cover and file are independent fields.
3. **Global Settings → Contact Information** — real phone, WhatsApp digits,
   email, address, working hours, Google Maps embed + links.
4. **Global Settings → Social Media** — real profile URLs.
5. **Content → Statistics / Certificates / Career / Expertise** — confirm
   numbers and CV with the doctor.
6. **SEO** — Global + per-page meta/canonical/OG/favicon, plus per-item SEO
   for conditions/treatments/surgeries/articles.
7. **`NEXT_PUBLIC_SITE_URL`** — set to the production domain (used by
   `app/sitemap.ts`, `app/robots.ts`, and every JSON-LD/OG URL).

## Design system

- **Tokens + liquid-glass utilities**: `app/globals.css` — the `@theme`
  block (all colours derived from the two brand hexes) plus
  `.glass-panel`, `.glass-card`, `.glass-card-strong`, `.glass-frame`,
  `.glass-sheen`, `.text-gradient-brand`, `.bg-gradient-brand`,
  `.chip-teal` / `.chip-pink`, `.section-wash-*`, `.glow-*`, and the
  ambient keyframes. RTL is handled with CSS logical properties
  (`ms-*`, `me-*`, `start-*`, `end-*`) and the `rtl:` variant.
- **UI primitives**: `components/ui/*` (`Button`, `GlassCard`, `Modal`,
  `SectionHeader`, `IconBadge`, `Rating`, `Section`).
- **Icons**: `components/icons/Icon.tsx` — one dependency-free line set.
- **Motion**: `components/motion/*` (`Reveal`, `Stagger`, `Counter`,
  `PageTransition`, `TiltCard`, `MotionProvider`). Everything respects
  `prefers-reduced-motion` via `MotionConfig reducedMotion="user"`;
  scroll-revealed content also has a `@media (scripting: none)` fallback.
- **Layout**: `components/layout/*` (`Navbar`, `MobileMenu`,
  `LanguageSwitcher`, `Footer`, `Hero`, `HeroContactPanel`).
- **Shared card/modal system**: `components/cards/*` — `CareCard` +
  `CareGrid` + `CareDetailModal` back the Home surgeries/treatments grids and
  every Services treatment section (fed via `lib/careAdapters.ts`);
  `ArticleCard` / `ArticleModal` back both Home and the Articles page.
- **Page sections**: `components/{home,about,services,videos,articles,contact}/*`
  composed in each `app/[locale]/*/page.tsx`. All are data-driven — no copy
  or imagery is hardcoded in JSX.

## Tech notes (Next.js 16)

`middleware.ts` → `proxy.ts`; route `params` are Promises
(`await props.params`); `PageProps<'/route'>` / `LayoutProps<'/route'>`
are auto-generated global types (run `next dev` / `next build` to
regenerate). Turbopack's workspace root and the build's file-tracing root
are pinned to this folder in `next.config.ts` because the parent directory
contains unrelated projects. See `AGENTS.md`.
