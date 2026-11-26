# Sarmad Ali — Portfolio & Live CV

Personal portfolio and live CV website for **Sarmad Ali**, ACCA finalist and Junior Accountant working in UK taxation.

Built with Next.js (App Router, TypeScript), Tailwind CSS, Framer Motion (`motion`), `next-themes`, Zod, and Resend. All copy and visibility flags live in [`docs/content.json`](docs/content.json).

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). In development, a floating status badge links to `/status` showing hidden sections, missing (`null`) fields, and unapproved drafts.

### 3. Build for production

```bash
npm run build
npm run start
```

### 4. Verify content & code quality

```bash
npm run typecheck
npm run lint
npm run check
```

#### Pre-launch strict check

Before deploying to production for launch, run:

```bash
npm run check -- --strict
```

`npm run check -- --strict` **fails with exit code 1** if:
- any visible section is missing its minimum required data,
- any required field (`meta.name`, `meta.title`, `hero.headline`, `hero.subheadline`) is `null`, or
- any item still has `"needsApproval": true`.

---

## Managing Content (`docs/content.json`)

[`docs/content.json`](docs/content.json) is the single source of truth for all copy, links, and section visibility.

- **Editing copy:** Update the text directly in `docs/content.json`. `null` values are automatically omitted from the rendered site.
- **Showing or hiding a section:** Set `"visible": true` or `"visible": false` on any top-level section (for example `services`, `process`, `taxCalendar`, `languages`, `projects`, `testimonials`). Hidden sections are also removed from `sitemap.xml`.
- **Approving a draft item:** Drafted items carry `"needsApproval": true` (and show a subtle `Draft` tag in development or when `NEXT_PUBLIC_SHOW_DRAFTS=true`). Once reviewed and approved, set `"needsApproval": false` (or remove the key) in `docs/content.json`.
- **Privacy:** `contact.phone` and `contact.whatsapp` are stripped on the server by `lib/getPublicContent.ts` whenever their `public` flag is `false`.

### Adding the CV PDF

1. Place the PDF file at `public/cv/Sarmad-Ali-CV.pdf`.
2. In `docs/content.json`, set:
   ```json
   "cv": {
     "pdfUrl": "/cv/Sarmad-Ali-CV.pdf"
   }
   ```
   When `cv.pdfUrl` is `null`, the site links to the printable `/cv` web page instead.

### Updating the Portrait Photo

1. Place the portrait image in `public/` (currently `public/sarmad.png`).
2. In `docs/content.json`, set:
   ```json
   "meta": {
     "photo": {
       "src": "sarmad.png",
       "alt": "Portrait of Sarmad Ali"
     }
   }
   ```
   If `meta.photo` is `null` or the image fails to load, the framed `"SA"` monogram is shown automatically.

---

## Environment Variables

Copy `.env.example` to `.env.local` for local testing, and configure the same variables in Vercel for production:

| Variable | Description |
| --- | --- |
| `RESEND_API_KEY` | Resend API key for sending contact form emails. If omitted, the contact form degrades gracefully to a `mailto:` link. |
| `CONTACT_TO_EMAIL` | Destination inbox for contact form submissions (falls back to `contact.formRecipientEmail`, then `contact.email.value` in `content.json`). |
| `CONTACT_FROM_EMAIL` | Verified sender address in Resend (e.g. `Portfolio <no-reply@yourdomain.com>`). |
| `NEXT_PUBLIC_SITE_URL` | Canonical public URL of the deployed site (e.g. `https://sarmadali.uk`), used for canonical tags, OpenGraph, `sitemap.xml`, and `robots.txt`. |
| `NEXT_PUBLIC_ALLOW_INDEXING` | **Indexing safety switch** (default `false`). While not `"true"`, `robots.txt` disallows all crawlers and every page outputs `noindex, nofollow`. Switch to `"true"` **only at launch**. |
| `NEXT_PUBLIC_SHOW_DRAFTS` | Optional (`false` by default). Set to `"true"` only if you want `Draft` tags visible in a non-local preview build. |

---

## Deploying to Vercel

1. Push the repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com) (Next.js preset is detected automatically).
3. Add the environment variables from `.env.example` in **Project Settings → Environment Variables**. Keep `NEXT_PUBLIC_ALLOW_INDEXING=false` for preview/staging.
4. Before going live:
   - Clear all `needsApproval: true` drafts and confirm required fields in `docs/content.json`.
   - Run `npm run check -- --strict` and verify it exits with `0`.
   - Run `npm run typecheck`, `npm run lint`, and `npm run build`.
5. At launch, attach the custom domain in Vercel, set `NEXT_PUBLIC_SITE_URL` to the production `https://` URL, set `NEXT_PUBLIC_ALLOW_INDEXING=true`, and trigger a redeploy.
