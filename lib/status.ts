import { getContent } from "./content";
import { sectionStatuses } from "./visibility";

export type ContentStatusReport = {
  sections: Array<{ id: string; state: "ON" | "OFF"; reason: string }>;
  sectionsOn: number;
  sectionsOff: number;
  nullFields: string[];
  drafts: string[];
  notes: string[];
};

function collectNulls(value: unknown, currentPath: string, out: string[]) {
  if (value === null) {
    out.push(currentPath);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      collectNulls(item, `${currentPath}[${index}]`, out);
    });
    return;
  }
  if (!value || typeof value !== "object") return;
  for (const [key, child] of Object.entries(value)) {
    if (currentPath === "" && key === "_readme") continue;
    const next = currentPath ? `${currentPath}.${key}` : key;
    collectNulls(child, next, out);
  }
}

function collectDrafts(value: unknown, currentPath: string, out: string[]) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      collectDrafts(item, `${currentPath}[${index}]`, out);
    });
    return;
  }
  if (!value || typeof value !== "object") return;
  const record = value as Record<string, unknown>;
  if (record.needsApproval === true) out.push(currentPath);
  for (const [key, child] of Object.entries(record)) {
    if (key === "needsApproval") continue;
    if (currentPath === "" && key === "_readme") continue;
    const next = currentPath ? `${currentPath}.${key}` : key;
    collectDrafts(child, next, out);
  }
}

export function getStatusReport(): ContentStatusReport {
  const content = getContent();
  const sections = sectionStatuses(content);
  const nullFields: string[] = [];
  collectNulls(content, "", nullFields);

  const drafts: string[] = [];
  collectDrafts(content, "", drafts);

  const on = sections.filter((s) => s.state === "ON").length;
  const off = sections.length - on;

  const notes: string[] = [];
  if (content.contact.email.temporary) {
    notes.push("contact.email.temporary is true");
  }

  return {
    sections,
    sectionsOn: on,
    sectionsOff: off,
    nullFields,
    drafts,
    notes,
  };
}
