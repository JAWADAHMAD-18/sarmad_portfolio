"use client";

import { useEffect, useId, useRef, useState } from "react";
import { contactFormSchema, type ContactFormData } from "@/lib/contact-schema";

export function ContactForm({ publicEmail }: { publicEmail?: string | null }) {
  const formId = useId();
  const startedAtRef = useRef<number | null>(null);

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    subject: string;
    message: string;
    website: string;
  }>({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [showMailtoFallback, setShowMailtoFallback] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!startedAtRef.current) {
      startedAtRef.current = Date.now();
    }
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name as keyof ContactFormData]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});
    setServerMessage(null);
    setShowMailtoFallback(false);

    const submissionTime = startedAtRef.current ?? Date.now();

    // Client-side validation
    const clientValidation = contactFormSchema.safeParse({
      ...formData,
      startedAt: submissionTime,
    });

    if (!clientValidation.success) {
      const flattened = clientValidation.error.flatten().fieldErrors;
      const formatted: Partial<Record<keyof ContactFormData, string>> = {};
      for (const [key, msgs] of Object.entries(flattened)) {
        if (msgs && msgs[0]) {
          formatted[key as keyof ContactFormData] = msgs[0];
        }
      }
      setFieldErrors(formatted);
      setStatus("idle");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...clientValidation.data,
          startedAt: submissionTime,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setServerMessage("Thank you! Your message has been sent successfully.");
        setFormData({ name: "", email: "", subject: "", message: "", website: "" });
      } else {
        setStatus("error");
        setServerMessage(data.message || data.error || "Unable to send message at this time.");
        if (data.fallbackMailto || !res.ok) {
          setShowMailtoFallback(true);
        }
      }
    } catch {
      setStatus("error");
      setServerMessage("A network error occurred. Please use direct email to get in touch.");
      setShowMailtoFallback(true);
    }
  };

  const mailtoHref = publicEmail
    ? `mailto:${publicEmail}?subject=${encodeURIComponent(
        formData.subject.trim() || "Inquiry from Portfolio",
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\n\n${formData.message}`,
      )}`
    : null;

  return (
    <div className="border border-line bg-surface p-6 sm:p-8 md:p-10">
      <h2 className="font-serif text-2xl tracking-tight text-ink sm:text-3xl">
        Send a Message
      </h2>
      <p className="mt-2 text-sm text-muted">
        Fill in your details below and I will respond to your inquiry promptly.
      </p>

      {/* Live Region for Screen Readers */}
      <div aria-live="polite" className="sr-only">
        {status === "sending" && "Sending your message..."}
        {status === "success" && serverMessage}
        {status === "error" && serverMessage}
      </div>

      {status === "success" ? (
        <div className="mt-8 border border-accent/40 bg-accent/5 p-6">
          <p className="font-medium text-ink">{serverMessage}</p>
          <p className="mt-2 text-sm text-muted">
            I will review your message and reply as soon as possible.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-5 inline-flex min-h-11 items-center justify-center border border-line bg-surface px-4 text-sm font-medium uppercase tracking-wider text-ink hover:border-accent"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
          {/* Honeypot field (hidden from screen readers and visual users) */}
          <div aria-hidden="true" className="hidden">
            <label htmlFor={`${formId}-website`}>Do not fill this</label>
            <input
              id={`${formId}-website`}
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Name Field */}
          <div>
            <label
              htmlFor={`${formId}-name`}
              className="block font-mono text-sm uppercase tracking-wider text-muted"
            >
              Your Name <span className="text-accent">*</span>
            </label>
            <input
              id={`${formId}-name`}
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              disabled={status === "sending"}
              className="mt-2 w-full border border-line bg-bg px-4 py-3 text-base text-ink outline-none transition-colors focus:border-accent"
              placeholder="e.g. Jane Doe"
            />
            {fieldErrors.name ? (
              <p className="mt-1.5 font-mono text-sm text-red-600 dark:text-red-400">
                {fieldErrors.name}
              </p>
            ) : null}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor={`${formId}-email`}
              className="block font-mono text-sm uppercase tracking-wider text-muted"
            >
              Email Address <span className="text-accent">*</span>
            </label>
            <input
              id={`${formId}-email`}
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={status === "sending"}
              className="mt-2 w-full border border-line bg-bg px-4 py-3 text-base text-ink outline-none transition-colors focus:border-accent"
              placeholder="e.g. jane@example.com"
            />
            {fieldErrors.email ? (
              <p className="mt-1.5 font-mono text-sm text-red-600 dark:text-red-400">
                {fieldErrors.email}
              </p>
            ) : null}
          </div>

          {/* Subject Field (Optional) */}
          <div>
            <label
              htmlFor={`${formId}-subject`}
              className="block font-mono text-sm uppercase tracking-wider text-muted"
            >
              Subject <span className="text-muted/60">(Optional)</span>
            </label>
            <input
              id={`${formId}-subject`}
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              disabled={status === "sending"}
              className="mt-2 w-full border border-line bg-bg px-4 py-3 text-base text-ink outline-none transition-colors focus:border-accent"
              placeholder="e.g. UK Bookkeeping & VAT inquiry"
            />
            {fieldErrors.subject ? (
              <p className="mt-1.5 font-mono text-sm text-red-600 dark:text-red-400">
                {fieldErrors.subject}
              </p>
            ) : null}
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor={`${formId}-message`}
              className="block font-mono text-sm uppercase tracking-wider text-muted"
            >
              Message <span className="text-accent">*</span>
            </label>
            <textarea
              id={`${formId}-message`}
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              disabled={status === "sending"}
              className="mt-2 w-full border border-line bg-bg px-4 py-3 text-base text-ink outline-none transition-colors focus:border-accent"
              placeholder="Describe your accounting or tax requirements..."
            />
            {fieldErrors.message ? (
              <p className="mt-1.5 font-mono text-sm text-red-600 dark:text-red-400">
                {fieldErrors.message}
              </p>
            ) : null}
          </div>

          {/* Error & Fallback notice */}
          {status === "error" ? (
            <div className="border border-line bg-bg p-4 text-sm">
              <p className="text-ink">{serverMessage}</p>
              {showMailtoFallback && mailtoHref ? (
                <div className="mt-3">
                  <a
                    href={mailtoHref}
                    className="inline-flex min-h-11 items-center gap-2 font-medium text-accent underline underline-offset-4 hover:text-accent/80"
                  >
                    Open in your email client ({publicEmail}) →
                  </a>
                </div>
              ) : null}
            </div>
          ) : null}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex min-h-11 items-center justify-center bg-accent px-6 text-sm font-medium text-accent-ink transition-colors hover:bg-[color-mix(in_srgb,var(--accent)_86%,black)] disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
