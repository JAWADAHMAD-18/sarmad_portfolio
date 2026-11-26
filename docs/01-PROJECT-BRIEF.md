# 01 — Project Brief

## What this is
A personal portfolio / "live CV" website for **Sarmad Ali**, ACCA finalist and Junior Accountant (UK taxation, Pakistan-based, works remotely). One link he can send to clients and attach to job applications.

## Audiences
1. **UK sole traders and small companies** looking for remote bookkeeping, tax, payroll and financial-statement help.
2. **Recruiters / hiring managers** in accounting and finance, who scan for: ACCA level and papers, current employer, tools, location, and a CV they can download.

Both should understand within 10 seconds: who he is, what he does, his ACCA level, and how to contact him.

## Goals
- Build trust quickly (clear, precise, no fluff, no fake claims)
- Make the CV and contact route one click away from every page
- Look modern and professional, never template-like or flashy
- Be easy to update by editing a single JSON file

## Non-goals
- No pricing, no blog, no e-commerce, no login, no CMS
- No fake numbers, fake testimonials or fake client logos
- No heavy animation, 3D, parallax or auto-playing media

## Language
Website copy is **English only**. (Source content was written in Roman Urdu and has been translated into `content.json`.)

## Scope
- Pages: Home, About, Experience & Education, Contact
- Extra route: `/cv` (printable web version of the CV)
- Light and dark themes (system default, manual toggle)
- Contact form + email link; WhatsApp button only if the number is public
- Testimonials and Projects sections exist in the code but stay **hidden** until real data arrives

## Success criteria
- A recruiter can find ACCA level, employer, tools and contact in under 15 seconds
- Content edits need only `content.json`, no component changes
- Fast, accessible, SEO-ready (see `AGENTS.md` targets)

## Constraints
- Contact details currently in the file are placeholders for launch and will change: the Gmail address is temporary, the phone is not approved for public display
- Several fields are still missing (see `TODO.md`). The site must look complete and intentional even before they arrive
