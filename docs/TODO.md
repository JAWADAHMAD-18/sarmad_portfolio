# TODO — what is still missing

Owner key: **J** = Jawad, **S** = Sarmad (the friend), **AG** = Antigravity / build agent

## Blocking launch (needed from Sarmad)
- [x] **S** Photo (clear, good light, formal or semi-formal) — `public/sarmad.png`
- [ ] **S** CV as PDF (optional if launching with `/cv` web CV; `cv.pdfUrl` is currently `null`)
- [x] **S** Decide whether phone and WhatsApp are public (`+92 321 6006318`, both `public: true`)
- [x] **S** City (`Hasilpur, Punjab`)
- [x] **S** Experience at Taxvise Limited: start date (`November 2024 – Present` / `2024-11`) and approved responsibilities
- [ ] **S** ACCA: papers cleared, paper in progress, exemptions, expected completion (optional)
- [ ] **S** Professional email address (replace the temporary Gmail `samu631800@gmail.com` when ready)

## Needed to make the site stronger
- [ ] **S** Real numbers if he has them (clients handled, kind of UK filings, years of experience). No numbers will be shown until confirmed
- [ ] **S** 2 or 3 real examples behind his strengths (e.g. a deadline he handled)
- [x] **S** Exactly which services he wants to offer (4 services + process steps approved)
- [ ] **S** Diploma in Accounting and Finance: institute and year
- [x] **S** Language levels (Urdu: Fluent, English: Fluent)
- [x] **S** LinkedIn URL (`https://www.linkedin.com/in/sarmad-ali-a42ab03b9`)
- [x] **S** Working hours (`Flexible, available whenever clients need me`) and contact-form recipient email (`samu631800@gmail.com`)
- [ ] **S** Goals / next career step (optional)
- [ ] **S** Certificates (images or PDFs), only if he wants them shown
- [ ] **S** Testimonials from seniors, employers or clients: real, with permission

## Wording check (low priority)
- [ ] **J / S** Confirm the "ACCA finalist" wording and the "Advanced" level for Excel, QuickBooks and Zoho are what he is comfortable defending in an interview

## Jawad's own list
- [ ] **J** Replace email in `content.json` once a custom professional email exists
- [ ] **J** Create GitHub repo, connect to Vercel (own account first, handover later)
- [ ] **J** Resend account (from Sarmad's Gmail), API key in Vercel env vars (`RESEND_API_KEY`, `CONTACT_TO_EMAIL=samu631800@gmail.com`, `CONTACT_FROM_EMAIL="Portfolio <onboarding@resend.dev>"`)
- [ ] **J** Domain decision (Sarmad buys or Jawad buys, then handover) + Google Search Console verification (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`) + set `NEXT_PUBLIC_ALLOW_INDEXING=true` at launch
- [ ] **J** Ask Sarmad for a testimonial **after** the project is delivered

## Build checklist (AG)
- [x] Phase 1 Scaffold
- [x] Phase 2 Home
- [x] Phase 3 About, Experience, Contact, `/cv`
- [x] Phase 4 Polish (motion, responsive, a11y, dev badge and `/status`)
- [x] Phase 5 SEO and launch prep
- [x] Run `npm run check -- --strict` (passes with 0 unapproved drafts)
