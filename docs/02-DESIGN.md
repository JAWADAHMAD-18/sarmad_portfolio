# 02 — Design Direction

## Intent
Calm, precise, trustworthy. Think "well-designed financial publication", not "developer portfolio" and not "SaaS landing page". Modern, but never trendy for its own sake.

## Avoid the generic AI-template look
Do NOT use: purple/blue gradients, gradient text, glassmorphism blobs, floating 3D shapes, glowing borders, neon accents, emoji icons, stock illustrations, centered "Hi, I'm ___ 👋" heroes, rows of identical rounded cards with big shadows, or Inter-on-white-with-indigo defaults.

## Signature idea: the ledger
Use subtle accounting-ledger cues as the one recognisable motif:
- thin horizontal rule lines between rows (Experience, Skills, Education read like ledger rows)
- tabular numerals (Geist Mono) for years, levels and any figures
- a restrained double-rule under the section headings, like a total line
Keep it subtle. It should feel designed, not themed.

## Typography
- Headings: **Instrument Serif** (large, tight tracking, sentence case)
- Body / UI: **Geist** (400, 500, 600)
- Numbers, years, small labels: **Geist Mono**, tabular-nums
- Scale (desktop): H1 72–88px, H2 44–56px, H3 24px, body 17–18px, small 14px. Scale down fluidly with `clamp()`.
- Line length 60–72 characters for body text

## Colour tokens (CSS variables, Tailwind-mapped)
Light:
- `--bg: #FAFAF7` (warm off-white)
- `--surface: #FFFFFF`
- `--ink: #0B1B2E` (deep navy for text)
- `--muted: #5B6675`
- `--line: #E4E4DD`
- `--accent: #0F7B5F` (deep emerald, used sparingly: links, key highlights, focus ring, one CTA)
- `--accent-ink: #FFFFFF`

Dark:
- `--bg: #0A0F14`
- `--surface: #111922`
- `--ink: #EAF0F6`
- `--muted: #9AA7B6`
- `--line: #223040`
- `--accent: #3CC79A`
- `--accent-ink: #06231A`

Rules: one accent only. Check AA contrast for text and for the accent on both backgrounds. Dark mode is designed, not auto-inverted.

## Layout
- 12-column grid, max content width 1320px with fluid side padding clamp(20px, 4vw, 64px), kept centred above 1600px, generous purposeful spacing (section padding `clamp(56px, 7vw, 96px)`)
- Left-aligned, asymmetric hero: big serif headline on the left, portrait on the right
- **Portrait slot:** real portrait (`/public/sarmad.png`) via `next/image` with `object-position` tuned for a face at the top, soft radius, thin ledger rule offset, subtle accent block behind, and one floating glass chip (`ACCA level · Since 2023`). Falls back to a refined "SA" monogram if missing
- **Glass (limited use):** translucent surface + `backdrop-blur` + 1px light border ONLY on: sticky header (`bg-bg/92 backdrop-blur-md` with subtle shadow on scroll), icon tiles, the floating photo chip, and button hover highlights
- Header: simple wordmark ("Sarmad Ali"), nav links with animated active underline, theme toggle, "Download CV" / "CV" link, and primary "Contact" button
- Footer: name, short line, email, nav, copyright

## Components
- **Button:** primary (emerald fill with soft inner highlight and gentle lift on hover), secondary (outline with fill sweep on hover). 44px min height. Clear focus ring
- **Section heading:** small mono eyebrow label + serif heading + double-rule
- **Ledger row:** label left, value right, rule below (used for skills, education, ACCA details)
- **Tag/chip:** small, mono, 1px border (for tools, with Lucide icons)
- **Interactive visuals:** ACCA pathway track (3 levels with animated scroll fill), Services explorer (numbered expandable rows), How I work (4 steps with scroll-drawn line), UK tax-year calendar (6 April to 5 April interactive timeline)
- **Form fields:** large, clear labels, visible errors, no placeholder-only labels

## Motion (medium)
- Library: Framer Motion (`motion/react`). Duration 200–850ms, ease-out, no bounce
- Scroll reveal: fade + 12px rise, once per element, small stagger on lists, animated ACCA track fill, process line draw, and tax calendar line draw
- Number count-up only for real numeric stats, once
- Hover: gentle colour/underline changes, fill sweep on secondary buttons, 1–2px lift max
- Page transitions: quick fade
- Theme switch: short colour transition
- Respect `prefers-reduced-motion`: disable transforms and line/track draws, keep opacity transitions only
- No parallax, no cursor effects, no looping animations

## Responsive
Design mobile-first. Test at 360, 768, 1024, 1440. Nav collapses to a clean full-screen or drop-down menu on mobile. Tap targets 44px.

## Imagery and icons
- Icons: Lucide, 1.5px stroke, used sparingly
- Photo (when it arrives): natural crop, soft rounded corners, no filters
- OG image: generated with `next/og`, on-brand (name, title, ledger rule)

## Quality bar
If a section could belong to any other person's site without changing a word, it is too generic. Prefer specific, confident typography and spacing over decoration.
