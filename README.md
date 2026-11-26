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

Optional fields (`cv.pdfUrl`, ACCA paper codes/exemptions, certificates, testimonials, projects) may remain `null` and do not fail `--strict`.

---

## Managing Content (`docs/content.json`)

[`docs/content.json`](docs/content.json) is the single source of truth for all copy, links, and section visibility.

- **Editing copy:** Update the text directly in `docs/content.json`. `null` values are automatically omitted from the rendered site.
- **Showing or hiding a section:** Set `"visible": true` or `"visible": false` on any top-level section (for example `services`, `process`, `taxCalendar`, `languages`, `projects`, `testimonials`). Hidden sections are also removed from `sitemap.xml`.
- **Approving a draft item:** Drafted items carry `"needsApproval": true` (and show a subtle `Draft` tag in development or when `NEXT_PUBLIC_SHOW_DRAFTS=true`). Once reviewed and approved, set `"needsApproval": false` in `docs/content.json`.
- **Privacy:** `contact.phone` and `contact.whatsapp` are stripped on the server by `lib/getPublicContent.ts` whenever their `public` flag is `false`. Phone numbers are never included in JSON-LD, even when public.

### Adding the CV PDF

1. Place the PDF file at `public/cv/Sarmad-Ali-CV.pdf`.
2. In `docs/content.json`, set:
   ```json
   "cv": {
     "pdfUrl": "/cv/Sarmad-Ali-CV.pdf"
   }
   ```
   When `cv.pdfUrl` is `null`, CV buttons read **"View CV"** and link to `/cv`. When `cv.pdfUrl` is set, the primary CV button automatically reads **"Download CV"** and links to the PDF, with **"View CV"** as a secondary link.

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
| `RESEND_API_KEY` | Resend API key for sending contact form emails. When unset, the contact form cleanly degrades to a `mailto:` fallback. |
| `CONTACT_TO_EMAIL` | Destination inbox (`samu631800@gmail.com`). **Note:** without a verified custom domain, Resend only delivers to the email address that owns the Resend account, so `CONTACT_TO_EMAIL` must be that same Gmail. |
| `CONTACT_FROM_EMAIL` | Sender address in Resend (use `"Portfolio <onboarding@resend.dev>"` until a custom domain is verified). |
| `NEXT_PUBLIC_SITE_URL` | Canonical public URL of the deployed site (e.g. `https://sarmadali.vercel.app`), used for canonical tags, OpenGraph, `sitemap.xml`, and `robots.txt`. |
| `NEXT_PUBLIC_ALLOW_INDEXING` | **Indexing safety switch** (default `false`). While not `"true"`, `robots.txt` disallows all crawlers and every page outputs `noindex, nofollow`. Switch to `"true"` **only at launch**. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional Google Search Console verification token (`<meta name="google-site-verification" ...>`). |
| `NEXT_PUBLIC_SHOW_DRAFTS` | Optional (`false` by default). Set to `"true"` only if you want `Draft` tags visible in a non-local preview build. |

---

## Google Search Console Setup

1. Open [Google Search Console](https://search.google.com/search-console) and add a **URL-prefix** property using the live `https://` URL (matching `NEXT_PUBLIC_SITE_URL`).
2. Choose the **HTML tag** verification method and copy the `content` token value.
3. Add `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=<token>` in Vercel **Environment Variables** (alongside `NEXT_PUBLIC_ALLOW_INDEXING=true`) and redeploy.
4. Click **Verify** in Google Search Console.
5. Submit `/sitemap.xml` under **Sitemaps**, then use **URL Inspection** to request indexing for the home page (`/`).

---

## Deploying to Vercel

1. Push the repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com) (Next.js preset is detected automatically).
3. Add the environment variables from `.env.example` in **Project Settings → Environment Variables**. Keep `NEXT_PUBLIC_ALLOW_INDEXING=false` for preview/staging.
4. Before going live, run:
   - `npm run check -- --strict`
   - `npm run typecheck`
   - `npm run lint`
   - `npm run build`
5. At launch, set `NEXT_PUBLIC_SITE_URL` to the production `https://` URL, set `NEXT_PUBLIC_ALLOW_INDEXING=true`, and trigger a redeploy.
