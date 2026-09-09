# Dr. Walid Moussa — Andrology & Men's Health

A premium, bilingual (English / Arabic) marketing website for **Dr. Walid
Moussa**, consultant andrologist. Built with **Next.js 16** (App Router,
React 19, TypeScript, Turbopack) and **Tailwind CSS v4**, with a
liquid-glass design system in turquoise (`#2DC4B6`) and pink (`#FF3366`).

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000 — redirects to /en or /ar
npm run build    # production build (all pages are static)
npm run start    # serve the production build
npm run lint     # ESLint (flat config)
```

Optional env vars (`cp .env.local.example .env.local`):

| Variable | Effect |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for sitemap / robots / OG URLs |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Overrides `data/contact.ts` for every WhatsApp link |

The site runs fully without either.

## Pages

`app/[locale]/` — `en` and `ar`, six routes: `/` (home), `/about`,
`/services`, `/videos`, `/articles`, `/contact`. `proxy.ts` (Next 16's
renamed `middleware.ts`) redirects bare paths to the visitor's locale.
Home CTAs deep-link into the Services page via anchors
(`/services#surgeries`, `/services#treatments`) and card modals open from
`#surgery-<slug>` / `#treatment-<slug>` hashes (`lib/useHashSelection.ts`).

## Content model — everything lives in `/data/*.ts`

No CMS, no database. Every string is `{ en, ar }` (`Localized<T>` in
`lib/types.ts`) and components receive content by import/props. To change
copy, images or numbers, edit the data file — never the components.

| File | Owns |
|---|---|
| `site.ts` | Brand name, SEO defaults, shared button labels, footer text |
| `navigation.ts` | The 6 nav items |
| `hero.ts` | Per-page hero copy + cover image + focal point |
| `doctorIntro.ts`, `stats.ts`, `journey.ts`, `reviews.ts`, `faq.ts`, `cta.ts` | Home sections |
| `surgeries.ts`, `treatments.ts`, `technologies.ts` | Services (home shows a `featured` subset) |
| `videos.ts` | All videos; `featured` (3) surface on the home page |
| `articles.ts` | All articles; `featured` (4) surface on the home page |
| `about.ts` | Bio, philosophy, experience, education, certifications, achievements, gallery |
| `contact.ts` | **Placeholder** phone / WhatsApp / email / address / hours / socials / map |
| `images.ts` | Central image registry (see below) |

### Going live — the checklist

1. **`data/contact.ts`** — replace every placeholder (phone, WhatsApp
   digits, email, address, `mapEmbedSrc`, `socialLinks` URLs, working hours).
2. **`data/images.ts`** — every photo is royalty-free Unsplash stock
   hotlinked via the Unsplash CDN. Replace each URL with a real photo of
   Dr. Moussa / the clinic (drop files in `public/images/…` and point the
   registry at them). Re-check the `position` focal points in the data
   files after swapping. `next.config.ts` allow-lists the image hosts.
3. **`data/*` — `youtubeId` fields** in `doctorIntro.ts` and `videos.ts`
   are placeholder YouTube ids. Replace with the real clip ids.
4. **Stats & credentials** — `data/stats.ts`, `data/about.ts` currently
   hold representative numbers and a plausible CV; confirm with the doctor.
5. **`NEXT_PUBLIC_SITE_URL`** — set to the production domain.

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

## Tech notes (Next.js 16)

`middleware.ts` → `proxy.ts`; route `params` are Promises
(`await props.params`); `PageProps<'/route'>` / `LayoutProps<'/route'>`
are auto-generated global types (run `next dev` / `next build` to
regenerate). Turbopack's workspace root and the build's file-tracing root
are pinned to this folder in `next.config.ts` because the parent directory
contains unrelated projects. See `AGENTS.md`.
