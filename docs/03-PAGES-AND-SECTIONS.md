# 03 — Pages and Sections

All copy comes from `content.json`. Paths below refer to keys in that file. A section renders only if its `visible` flag is `true` AND it has the minimum data listed. Hidden sections also disappear from navigation and anchors.

## Global
- **Header:** wordmark, nav (Home, About, Experience, Contact), theme toggle, "Download CV" (only if `cv.pdfUrl` exists, otherwise link to `/cv`), primary "Contact" button
- **Footer:** name, title, email (if public), nav, copyright year auto-generated

---

## Home `/`
Sections in order:

1. **Hero** (`hero`, `meta`, `acca`) — required: headline, subheadline
   - Eyebrow: availability (`meta.availability`)
   - H1: `hero.headline`; subheadline below
   - CTAs: primary = CV (PDF if available, else `/cv`), secondary = Contact
   - Portrait frame (`meta.photo` with `next/image` and floating glass chip for `acca.level` + `Since ${acca.since}`; "SA" monogram fallback if missing)

2. **Credentials strip + ACCA path** (`credentials`, `acca`) — merged ledger-style row of confirmed facts plus the horizontal 3-level ACCA pathway track (`Applied Knowledge`, `Applied Skills`, `Strategic Professional`) highlighting `acca.level` and `acca.levelNote`. Levels only, no unconfirmed paper codes

3. **Services explorer** (`services`) — required: at least 1 service
   - Interactive numbered rows (`01`–`04`); hover (desktop) or tap/keyboard (mobile) expands each row to show a Lucide icon tile and its `"What is included"` list
   - Draft copy: items carry `needsApproval: true`

4. **How I work** (`process`) — 4 steps (`Brief`, `Records`, `Prepare and file`, `Review and report`) with Lucide icon tiles and a connecting line that draws on scroll. Draft copy carries `needsApproval: true`

5. **UK tax-year calendar** (`taxCalendar`) — interactive horizontal timeline (`6 April` to `5 April`) with clickable/keyboard-accessible key date markers (`6 April`, `31 July`, `5 October`, `31 October`, `31 January`, `5 April`) and `"General information, not advice"` note

6. **Skills** (`skills`) — tools as chips with Lucide icons; technical and soft skills as clean inline lists (no framed boxes). Hide any empty group

7. **Experience preview** (`experience`) — latest role, company, period, drafted responsibilities (when present), and `"See full experience & education"` link

8. **Testimonials** (`testimonials`) — **hidden** until at least one entry has `permission: true`. Layout when enabled: 1–3 quotes, name, role

9. **Closing CTA** (`closing`) — short line + Contact button

---

## About `/about`
1. **Intro:** H1 "About" + `about.bio` (split into readable paragraphs) beside portrait
2. **Strengths:** `about.strengths` as ledger rows (title only, no filler descriptions)
3. **How I work:** `about.workStyle` (list)
4. **Languages:** `languages` — hidden while levels are null
5. **Goals:** `about.goals` — hidden while null
6. **Interests:** hidden while null
7. CTA to Contact

---

## Experience & Education `/experience`
Order matters, recruiters look for ACCA first.
1. **ACCA block** (same data as Home, fuller): level, institute, dates, papers (when present)
2. **Experience timeline:** each role as a ledger row: period | role, company | responsibilities & achievements (only if non-empty) | tools (chips, only if present). If responsibilities are null, show just role, company and period, cleanly
3. **Education:** ledger rows (institute, qualification, period, grade only if present)
4. **Certifications:** name always, institute and year only if present
5. **Projects / case studies:** `projects` — hidden until real data
6. CV download button + link to `/cv`

---

## Contact `/contact`
1. H1 + one line inviting UK clients and employers
2. **Contact form:** name, email, message (subject optional). See `04-FEATURES.md`
3. **Direct details:** email (if public), WhatsApp (only if `whatsapp.public`), LinkedIn (if present), city (if present), working hours (if present). Phone only if `phone.public`
4. Availability note from `meta.availability`

---

## CV `/cv`
Printable A4 web version of the CV built from the same JSON. Full details in `04-FEATURES.md`. Not shown in main nav, linked from hero, header and footer.

## Dev only `/status`
Visible only when `NODE_ENV !== 'production'`; returns 404 in production. Shows section visibility and missing fields. Details in `04-FEATURES.md`.

## 404
Clean on-brand 404 with links back to Home and Contact.
