import { cache } from "react";
import { getContent } from "./content";
import type { Content } from "./schema";

export type PublicContent = Omit<Content, "contact" | "acca"> & {
  acca: Omit<Content["acca"], "membershipNumber"> & {
    membershipNumber: null | string;
  };
  contact: Omit<Content["contact"], "email" | "phone" | "whatsapp"> & {
    email: { public: false } | { public: true; value: string; temporary?: boolean };
    phone: { public: false } | { public: true; value: string };
    whatsapp: { public: false } | { public: true; value: string | null };
  };
};

function stripNeedsApproval(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stripNeedsApproval);
  if (!value || typeof value !== "object") return value;
  const next: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(value)) {
    if (key === "needsApproval") continue;
    next[key] = stripNeedsApproval(child);
  }
  return next;
}

export const getPublicContent = cache((): PublicContent => {
  const content = structuredClone(getContent());
  const stripped = stripNeedsApproval(content) as Content;

  const email = content.contact.email.public
    ? {
        public: true as const,
        value: content.contact.email.value,
        temporary: content.contact.email.temporary,
      }
    : { public: false as const };

  const phone = content.contact.phone.public
    ? { public: true as const, value: content.contact.phone.value }
    : { public: false as const };

  const whatsapp = content.contact.whatsapp.public
    ? { public: true as const, value: content.contact.whatsapp.value }
    : { public: false as const };

  const membershipNumber = content.acca.membershipNumberPublic
    ? content.acca.membershipNumber
    : null;

  return {
    ...stripped,
    acca: {
      ...stripped.acca,
      membershipNumber,
    },
    contact: {
      ...stripped.contact,
      email,
      phone,
      whatsapp,
    },
  };
});
