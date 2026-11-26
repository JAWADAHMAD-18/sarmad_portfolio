import { z } from "zod";

const needsApproval = z.boolean().optional();
const textOrList = z.union([z.string(), z.array(z.string())]).nullable();

export const contentSchema = z.object({
  meta: z.object({
    name: z.string(),
    title: z.string(),
    tagline: z.string(),
    location: z.object({
      country: z.string().nullable(),
      city: z.string().nullable(),
    }),
    availability: z.string().nullable(),
    availabilityDetail: z.string().nullable(),
    purpose: z.string().nullable(),
    photo: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .nullable(),
    siteUrl: z.string().nullable(),
  }),
  hero: z.object({
    visible: z.boolean(),
    headline: z.string(),
    subheadline: z.string(),
    ctaPrimary: z.string(),
    ctaSecondary: z.string(),
  }),
  credentials: z.object({
    visible: z.boolean(),
    items: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
        numeric: z.boolean(),
      }),
    ),
  }),
  services: z.object({
    visible: z.boolean(),
    needsApproval,
    heading: z.string(),
    intro: z.string().nullable(),
    items: z.array(
      z.object({
        title: z.string(),
        description: z.string().nullable(),
        included: z.array(z.string()).optional(),
        needsApproval,
      }),
    ),
  }),
  process: z.object({
    visible: z.boolean(),
    needsApproval,
    heading: z.string(),
    intro: z.string().nullable().optional(),
    steps: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        needsApproval,
      }),
    ),
  }),
  taxCalendar: z.object({
    visible: z.boolean(),
    heading: z.string(),
    note: z.string(),
    startLabel: z.string(),
    endLabel: z.string(),
    dates: z.array(
      z.object({
        date: z.string(),
        title: z.string(),
        note: z.string(),
        position: z.number().min(0).max(100),
        needsApproval,
      }),
    ),
  }),
  about: z.object({
    visible: z.boolean(),
    bio: z.string().nullable(),
    strengths: z.array(z.string()),
    workStyle: z.array(z.string()),
    goals: textOrList,
    interests: textOrList,
  }),
  education: z.object({
    visible: z.boolean(),
    items: z.array(
      z.object({
        qualification: z.string(),
        institute: z.string().nullable(),
        period: z.string().nullable(),
        grade: z.string().nullable(),
        notes: z.string().nullable(),
      }),
    ),
  }),
  acca: z.object({
    visible: z.boolean(),
    level: z.string().nullable(),
    levelNote: z.string().nullable(),
    institute: z.string().nullable(),
    since: z.string().nullable(),
    papersCleared: textOrList,
    papersInProgress: textOrList,
    exemptions: textOrList,
    expectedCompletion: z.string().nullable(),
    membershipNumber: z.string().nullable(),
    membershipNumberPublic: z.boolean(),
  }),
  experience: z.object({
    visible: z.boolean(),
    items: z.array(
      z.object({
        role: z.string(),
        company: z.string(),
        industry: z.string().nullable(),
        period: z.string().nullable(),
        startDate: z.string().nullable(),
        responsibilities: textOrList,
        achievements: textOrList,
        tools: z.array(z.string()).nullable(),
        needsApproval,
      }),
    ),
  }),
  skills: z.object({
    visible: z.boolean(),
    tools: z.array(
      z.object({
        name: z.string(),
        level: z.string().nullable(),
      }),
    ),
    technical: z.array(z.string()),
    soft: z.array(z.string()),
    excelSkills: textOrList,
  }),
  languages: z.object({
    visible: z.boolean(),
    items: z.array(
      z.object({
        name: z.string(),
        level: z.string().nullable(),
      }),
    ),
  }),
  certifications: z.object({
    visible: z.boolean(),
    items: z.array(
      z.object({
        name: z.string(),
        institute: z.string().nullable(),
        year: z.union([z.string(), z.number()]).nullable(),
      }),
    ),
  }),
  projects: z.object({
    visible: z.boolean(),
    items: z.array(
      z.looseObject({
        title: z.string().optional(),
        summary: z.string().nullable().optional(),
        needsApproval,
      }),
    ),
  }),
  testimonials: z.object({
    visible: z.boolean(),
    items: z.array(
      z.looseObject({
        quote: z.string().optional(),
        name: z.string().optional(),
        role: z.string().nullable().optional(),
        permission: z.boolean().optional(),
        needsApproval,
      }),
    ),
  }),
  closing: z.object({
    visible: z.boolean(),
    needsApproval,
    heading: z.string(),
    text: z.string(),
  }),
  contact: z.object({
    visible: z.boolean(),
    email: z.object({
      value: z.email(),
      public: z.boolean(),
      temporary: z.boolean().optional(),
    }),
    phone: z.object({
      value: z.string(),
      public: z.boolean(),
    }),
    whatsapp: z.object({
      value: z.string().nullable(),
      public: z.boolean(),
    }),
    linkedin: z.string().nullable(),
    otherLinks: z.array(
      z.looseObject({
        label: z.string().optional(),
        url: z.string().optional(),
      }),
    ),
    city: z.string().nullable(),
    workingHours: z.string().nullable(),
    formRecipientEmail: z.union([z.email(), z.null()]),
  }),
  cv: z.object({
    pdfUrl: z.string().nullable(),
  }),
});

export type Content = z.infer<typeof contentSchema>;
