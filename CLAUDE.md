@AGENTS.md

# Novice Group Dermatology — Site

Marketing site for Novice Group Dermatology, a practice in Bloomfield Hills, Michigan
with three board-certified dermatologists, a nurse practitioner, and in-house
dermatopathology. This repo is the public site only. No patient data, no auth, no DB.

## Stack

- Next.js 16 (App Router) + React 19, TypeScript strict mode
- Tailwind CSS v4 (via `@tailwindcss/postcss`), framer-motion, lucide-react
- `react-hook-form` on the contact form; three.js types are present for hero visuals
- Deployed on Vercel. `build` is the only CI guard (no lint or test scripts).

## Next.js 16 convention (read this before writing components)

Per AGENTS.md: this is not the Next.js in your training data. Before writing routing,
metadata, or server/client component code, read the relevant guide in
`node_modules/next/dist/docs/`. Heed deprecation notices.

## Layout of the code

- `src/app/**` — routes. Each page exports `metadata: Metadata` for SEO.
- `src/components/{home,layout,services,contact,seo,ui}` — `ui/` holds the shared
  primitives (`PageHero`, `Section`, `SignatureHeadline`, `Reveal`, `Accordion`,
  `Button`, `Container`). Reuse these; do not spin up parallel components.
- `src/lib/site.ts` — single source of truth for nav, the `services` array, provider
  bios, address, phone. `images.ts` maps image keys. `clsx.ts` is the classname helper.
- `src/components/seo/` — `JsonLd.tsx` (MedicalBusiness + Physician schema, driven by
  `site.ts`) and `Analytics.tsx` (GA4). `sitemap.ts` and `robots.ts` live in `src/app`.

## SEO is the point

This is a patient-acquisition site, so SEO plumbing is load-bearing. When adding or
renaming a page: set page `metadata`, add the route to `src/app/sitemap.ts`, and if it
introduces a new schema-worthy entity, extend `JsonLd.tsx`. Keep copy factually correct
against the live `novicegroupderm.com` — several past commits fixed invented details, so
verify practice facts against that source rather than guessing.

## Adding a service page

A new `/services/<slug>` touches FOUR files. Use `/new-service` to scaffold all of them,
or do them by hand: (1) `src/app/services/<slug>/page.tsx`, (2) the `services` array in
`src/lib/site.ts`, (3) the `routes` array in `src/app/sitemap.ts`, (4) the `serviceImages`
map in `src/app/services/page.tsx`. Missing one ships a broken or unlinked page.

## Local automation (this repo's .claude/)

- **Typecheck hook** (`.claude/hooks/typecheck.sh`, wired in `.claude/settings.json`):
  runs `tsc --noEmit` after any `.ts/.tsx` edit and reports type errors back
  immediately. It runs on every such edit, so during a large multi-file change you may
  see transient errors until the set is complete. Comment out the PostToolUse hook in
  `settings.json` to pause it.
- **`/new-service`** — scaffolds a service page across all four registration points.

## Conventions

- Named exports for components; props typed explicitly (strict mode is on).
- Reuse `ui/` primitives and `site.ts` data instead of hardcoding.
- Do not commit `.env*` (gitignored). No secrets belong in this repo.
