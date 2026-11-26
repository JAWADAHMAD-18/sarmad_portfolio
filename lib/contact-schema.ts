import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name must be at most 80 characters"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address"),
  subject: z
    .string()
    .trim()
    .max(120, "Subject must be at most 120 characters")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(3000, "Message must be at most 3000 characters"),
  website: z.string().max(0, "Spam detected").optional(),
  startedAt: z.number().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
