import type { PublicContent } from "./getPublicContent";
import type { Content } from "./schema";

export type SectionStatus = {
  id: string;
  state: "ON" | "OFF";
  reason: string;
};

function present(value: unknown): boolean {
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return value != null;
}

function status(
  id: string,
  visible: boolean,
  ok: boolean,
  missing: string,
): SectionStatus {
  if (!visible) return { id, state: "OFF", reason: "flag off" };
  if (!ok) {
    return { id, state: "OFF", reason: `missing minimum data (${missing})` };
  }
  return { id, state: "ON", reason: "visible and minimum data present" };
}

export function sectionStatuses(content: Content | PublicContent): SectionStatus[] {
  const c = content as Content;
  return [
    status(
      "hero",
      c.hero.visible,
      present(c.hero.headline) && present(c.hero.subheadline),
      "headline and subheadline",
    ),
    status(
      "credentials",
      c.credentials.visible,
      c.credentials.items.some(
        (item) => present(item.label) && present(item.value),
      ),
      "at least one fact",
    ),
    status(
      "services",
      c.services.visible,
      c.services.items.some((item) => present(item.title)),
      "at least one service",
    ),
    status(
      "process",
      c.process.visible,
      c.process.steps.length > 0,
      "at least one step",
    ),
    status(
      "taxCalendar",
      c.taxCalendar.visible,
      c.taxCalendar.dates.length > 0,
      "at least one key date",
    ),
    status("about", c.about.visible, present(c.about.bio), "bio"),
    status(
      "education",
      c.education.visible,
      c.education.items.some((item) => present(item.qualification)),
      "at least one qualification",
    ),
    status(
      "acca",
      c.acca.visible,
      present(c.acca.level) && present(c.acca.institute),
      "level and institute",
    ),
    status(
      "experience",
      c.experience.visible,
      c.experience.items.some(
        (item) => present(item.role) && present(item.company),
      ),
      "at least one role and company",
    ),
    status(
      "skills",
      c.skills.visible,
      c.skills.tools.length > 0 ||
        c.skills.technical.length > 0 ||
        c.skills.soft.length > 0,
      "at least one skill group",
    ),
    status(
      "languages",
      c.languages.visible,
      c.languages.items.some((item) => present(item.level)),
      "language levels",
    ),
    status(
      "certifications",
      c.certifications.visible,
      c.certifications.items.some((item) => present(item.name)),
      "at least one certificate name",
    ),
    status(
      "projects",
      c.projects.visible,
      c.projects.items.length > 0,
      "at least one project",
    ),
    status(
      "testimonials",
      c.testimonials.visible,
      c.testimonials.items.some((item) => item.permission === true),
      "at least one testimonial with permission",
    ),
    status(
      "closing",
      c.closing.visible,
      present(c.closing.heading) && present(c.closing.text),
      "heading and text",
    ),
    status("contact", c.contact.visible, true, "section"),
  ];
}

export function isSectionOn(
  id: string,
  content: Content | PublicContent,
): boolean {
  const list = sectionStatuses(content);
  return list.find((s) => s.id === id)?.state === "ON";
}
