# AGENTS.md — Rules for the AI coding agent

You are building a personal portfolio website ("live CV") for **Sarmad Ali**, an ACCA finalist and Junior Accountant working in UK taxation. It will be sent to clients and attached to job applications, so it must look credible, calm and professional.

Copy this file to the **repo root** as `AGENTS.md`. Keep the rest of the files inside `/docs`.

## Read these first, in this order
1. `docs/01-PROJECT-BRIEF.md` — goal, audience, scope
2. `docs/02-DESIGN.md` — visual direction, tokens, motion
3. `docs/03-PAGES-AND-SECTIONS.md` — every page and section
4. `docs/04-FEATURES.md` — visibility system, contact form, CV page, SEO, deploy
5. `docs/content.json` — the ONLY source of copy
6. `docs/TODO.md` — what is still missing

## Stack (fixed, do not swap)
- Next.js (latest stable, App Router), TypeScript in strict mode
- Tailwind CSS, Framer Motion (`motion`), `next-themes` for dark mode
- `next/font` with Instrument Serif (headings), Geist (body), Geist Mono (numbers)
- Zod for validation, Resend for the contact email
- No CMS, no database, no auth. Deploy target: Vercel

## Hard rules
1. **`content.json` is the single source of truth.** Never hardcode copy, links or numbers in components.
2. **`null` means missing.** Hide the field, item or section that depends on it. The words "TBD", "null", "undefined" or lorem ipsum must never appear on the rendered site.
3. **Never invent** facts, numbers, clients, logos, certificates, testimonials, or responsibilities. If content is missing, hide it.
4. **Phone number privacy:** if `contact.phone.public` is `false`, the number must not be rendered, put in the HTML, the JSON-LD, or shipped to the client bundle. Filter it out on the server through one helper (`getPublicContent()`).
5. Items marked `"needsApproval": true` are drafts. Render them, but list them in `npm run check` output.
6. Every section has a `visible` flag in `content.json` and respects it (see `docs/04-FEATURES.md`).
7. No stock photos, no illustration packs, no emoji as icons. Use a single consistent line-icon set (Lucide).
8. Accessibility is not optional: semantic HTML, visible focus states, AA contrast in both themes, `prefers-reduced-motion` respected, alt text.
9. Performance targets: Lighthouse 95+ on Performance, Accessibility, Best Practices and SEO (mobile).
10. Do not add libraries beyond the stack without asking first.
Add one more rule: in development, or when NEXT_PUBLIC_SHOW_DRAFTS=true, every item with needsApproval: true shows a small subtle "Draft" tag next to it (services detail lists, process steps, experience bullets, tax calendar notes). The tags never render in a production build unless that env var is set. When the owner approves an item, he only sets needsApproval to false in content.json and the tag disappears.

## Suggested structure
```
/app
  layout.tsx, page.tsx, about/, experience/, contact/, cv/, status/ (dev only)
  api/contact/route.ts
  sitemap.ts, robots.ts, opengraph-image.tsx
/components   (ui/, sections/, layout/)
/lib          (content.ts, getPublicContent.ts, schema.ts)
/scripts      (check-content.ts)
/public       (cv/, images/)
/docs         (these files)
```

## How to work
- **Plan first.** Before writing code, post a short plan and wait for approval.
- Work in the phases below. Stop at the end of each phase with a summary and what to review.
- Before reporting a phase done, run: lint, typecheck, `next build`, and `npm run check`.

### Phases
1. **Scaffold:** project setup, tokens, fonts, theme (light/dark), layout shell (header, footer), content loader, `getPublicContent()`, `npm run check`.
2. **Home page:** all Home sections wired to `content.json`, with hidden-state behaviour working.
3. **Other pages:** About, Experience & Education, Contact (with working form), `/cv` page.
4. **Polish:** motion, responsive pass at 360 / 768 / 1024 / 1440 px, a11y pass, dev badge and `/status`.
5. **SEO and launch prep:** metadata, OG image, sitemap, robots, JSON-LD, env docs, README with setup and deploy steps.

## Definition of done
- All 4 pages and `/cv` work on mobile and desktop in both themes
- Turning a section's `visible` flag off removes it from the page and from navigation
- `npm run check` lists hidden sections and every null field
- Contact form sends an email in production and degrades to a `mailto:` link if env vars are missing
- No console errors, build passes, Lighthouse targets met

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
