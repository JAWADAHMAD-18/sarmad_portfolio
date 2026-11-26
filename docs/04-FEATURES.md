# 04 — Features, SEO and Deployment

## 1. Content visibility system

### Data rules
- `content.json` is the only source of copy
- `null` (or an empty array/string) = missing → hide that field or item
- Every top-level section has a `"visible": true|false` flag
- A section renders only if `visible === true` **and** it meets its minimum data (see `03-PAGES-AND-SECTIONS.md`)
- Hidden sections are removed from navigation, anchors, sitemap entries and the `/cv` page where relevant
- Items with `"needsApproval": true` are drafts written by the developer; they render normally but are reported by the check script

### Loader
- `lib/content.ts` — typed (Zod schema) loader for `content.json`, fails the build on schema errors
- `lib/getPublicContent.ts` — server-side filter that strips anything not public (phone when `public:false`, membership number when not public, `needsApproval` flags). Only this filtered object may reach client components

### `npm run check`
Script `scripts/check-content.ts` reads `content.json` and prints:
1. A table of every section: ON / OFF, and why (flag off, or missing minimum data)
2. A list of every `null` field by path (e.g. `experience[0].responsibilities`)
3. A list of items with `needsApproval: true`
4. A summary count

Also writes the same output to `docs/STATUS.generated.md`.
Flag `--strict` exits with code 1 if any required field is null. Use it as a pre-launch gate.

### Dev badge and `/status`
- In development only: a small floating badge, e.g. "3 sections hidden · 12 fields missing", linking to `/status`
- `/status` lists the same info as `npm run check` in a readable page
- Both are absent in production (`/status` returns 404)

---

## 2. Contact form

- Route: `POST /api/contact`
- Fields: `name` (required, 2–80), `email` (required, valid), `subject` (optional, max 120), `message` (required, 10–3000)
- Validate with Zod on the client **and** the server
- Spam: hidden honeypot field + minimum time-to-submit (3s) + simple per-IP rate limit (e.g. 5 per hour, in-memory is acceptable)
- Email via **Resend**. Env vars:
  - `RESEND_API_KEY`
  - `CONTACT_TO_EMAIL` (falls back to `contact.formRecipientEmail`, then `contact.email`)
  - `CONTACT_FROM_EMAIL` (verified sender, e.g. `Portfolio <no-reply@yourdomain.com>`)
- Set `reply-to` to the visitor's email
- UI states: idle, sending, success, error. Inline field errors, accessible live region for status
- If env vars are missing: show a friendly message and a `mailto:` fallback link to the public email. Never crash
- Never expose keys to the client. Never log message bodies in production

### WhatsApp
Show a "Chat on WhatsApp" button (`https://wa.me/<digits>`) **only** if `contact.whatsapp.public === true`.

---

## 3. CV page `/cv`

- Built from `content.json`, laid out like a one-to-two-page A4 CV: header (name, title, public contact), profile, ACCA, experience, education, skills, certifications
- Hidden/null data is omitted, same rules as the site
- Print stylesheet: A4, black on white, no nav/footer/theme toggle, no motion, sensible page breaks
- Buttons: "Print / Save as PDF" (`window.print()`) and "Download PDF" (shown only if `cv.pdfUrl` is set)
- PDF file location when available: `/public/cv/Sarmad-Ali-CV.pdf`, referenced by `cv.pdfUrl`
- Always renders in light theme regardless of site theme

---

## 4. Dark mode
- `next-themes`, class strategy, default `system`, no flash on load
- Toggle in header (light / dark / system is fine, or a simple two-state toggle)
- Both themes fully designed (see `02-DESIGN.md`)

---

## 5. SEO
- `NEXT_PUBLIC_SITE_URL` env for canonical URLs
- Metadata API on every page: title template `%s | Sarmad Ali`, description from content, canonical, OpenGraph, Twitter card
- Home title: "Sarmad Ali | Junior Accountant, UK Taxation" (from `hero.headline`)
- `opengraph-image.tsx` via `next/og` (name, title, ledger rule, theme colours)
- `sitemap.ts` (only visible pages) and `robots.ts`
- JSON-LD `Person` on Home: name, jobTitle, worksFor (Taxvise Limited), email only if public, `sameAs` for public profile links. **Never include the phone number**
- One H1 per page, semantic landmarks, descriptive link text, alt text on images

---

## 6. Performance and quality
- `next/image` for all images, `next/font` for fonts (no layout shift)
- No client-side JS where a server component works
- Lighthouse mobile 95+ in all four categories
- No console errors, no hydration warnings
- Keyboard-navigable everywhere, visible focus, skip-to-content link

---

## 7. Deployment (Vercel)
- Repo on GitHub, deployed on Vercel from `main`
- Document all env vars in `README.md` and `.env.example`
- Custom domain to be added later by the owner
- README must include: install, dev, build, `npm run check`, how to edit content, how to hide/show a section, how to add the CV PDF and photo
