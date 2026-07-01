---
description: Scaffold a new /services/<slug> page wired into every registration point
argument-hint: <slug> "<Service Name>"
allowed-tools: Read, Write, Edit, Bash(ls:*), Bash(git status:*)
---

Scaffold a new service page for this derm site. A service is only "done" when it
exists in FOUR places. Missing any one of them ships a broken or unlinked page,
so create/update all four.

Target: **$ARGUMENTS**
(First token is the URL slug, e.g. `laser-dermatology`. The rest is the display
name, e.g. `Laser Dermatology`. If the name is missing, derive it by title-casing
the slug and confirm with me before writing.)

Steps:

1. **Page** `src/app/services/<slug>/page.tsx`
   - Copy the structure of `src/app/services/medical-dermatology/page.tsx`:
     `export const metadata` (title = service name, description = one SEO sentence
     naming the service + "Bloomfield Hills, Michigan"), a `conditions` array, a
     `faqs` array, and the default component using `PageHero`, `ConditionsGrid`,
     `ProcessSteps`, the FAQ `Section` + `Accordion`, and `BookingCTA`.
   - Match the imports exactly. Do not invent new UI components.
   - Leave the `conditions` and `faqs` content as clearly-marked placeholders for
     me to fill, but keep the shape valid so it typechecks.

2. **Services registry** `src/lib/site.ts`
   - Add an entry to the `services` array: `{ slug, name, short, ... }` matching the
     shape of the existing four entries (read them first to get every field).

3. **Sitemap** `src/app/sitemap.ts`
   - Add `'/services/<slug>'` to the `routes` array.

4. **Listing image** `src/app/services/page.tsx`
   - Add a `serviceImages['<slug>']` entry. If no image exists in `src/lib/images.ts`
     yet, reuse the closest existing one and flag that a real image is still needed.

After writing, run `git status --short` and give me a checklist of the four touch
points showing which you changed, plus anything left for me to fill in (copy,
image). Do NOT commit or push. Do not run the dev server.
