# First prompt for Antigravity

Setup before you paste:
1. Create an empty folder / repo, e.g. `sarmad-portfolio`
2. Put the `docs` folder inside it
3. Copy `docs/AGENTS.md` to the repo root as `AGENTS.md`

Then paste this into Antigravity:

---

You are building a portfolio website for an ACCA finalist and Junior Accountant. Read `AGENTS.md` first, then every file in `/docs` in the order it lists: `01-PROJECT-BRIEF.md`, `02-DESIGN.md`, `03-PAGES-AND-SECTIONS.md`, `04-FEATURES.md`, `content.json`, `TODO.md`.

Do not write any code yet. First reply with:
1. A short summary of what you understood (3–5 lines)
2. Your implementation plan for the 5 phases in `AGENTS.md`
3. Any questions or conflicts you found in the docs

Wait for my approval. After I approve, build **Phase 1 only**, run lint, typecheck, build and `npm run check`, then stop and show me what to review.

Follow the rules strictly: `content.json` is the only source of copy, never invent content, hide anything that is `null`, and never expose the phone number unless `contact.phone.public` is true.

---

For each next phase, paste: "Approved. Build Phase N only, run all checks, then stop for review."
