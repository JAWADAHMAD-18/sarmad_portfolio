import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/contact-schema";
import { getPublicContent } from "@/lib/getPublicContent";

// In-memory rate limiting: 5 submissions per IP per hour
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  entry.count += 1;
  return false;
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          error: "Too many messages sent. Please wait before trying again or send an email directly.",
          fallbackMailto: true,
        },
        { status: 429 },
      );
    }

    const body = await request.json();
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Validation failed", details: fieldErrors },
        { status: 400 },
      );
    }

    const { name, email, subject, message, website, startedAt } = result.data;

    // Honeypot check: reject bots that populate hidden fields
    if (website && website.length > 0) {
      return NextResponse.json({ success: true }); // Silent drop
    }

    // Minimum time to submit: 3 seconds
    if (startedAt && Date.now() - startedAt < 3000) {
      return NextResponse.json(
        { error: "Submission was too fast. Please take your time." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const content = getPublicContent();
    const recipientEmail =
      process.env.CONTACT_TO_EMAIL ||
      (content.contact.email.public ? content.contact.email.value : "samu631800@gmail.com");

    if (!apiKey) {
      // Graceful degradation when Resend credentials are not set
      return NextResponse.json(
        {
          success: false,
          fallbackMailto: true,
          message:
            "The direct contact service is currently unconfigured. Please use the direct email link below.",
        },
        { status: 200 },
      );
    }

    const resend = new Resend(apiKey);
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

    const emailSubject = subject?.trim()
      ? `Contact Form: ${subject.trim()} (${name})`
      : `Portfolio Message from ${name}`;

    const { error: resendError } = await resend.emails.send({
      from: fromEmail,
      to: recipientEmail,
      replyTo: email,
      subject: emailSubject,
      text: `Name: ${name}\nEmail: ${email}\n\nSubject: ${subject || "(None provided)"}\n\nMessage:\n${message}`,
    });

    if (resendError) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Resend error:", resendError);
      }
      return NextResponse.json(
        {
          success: false,
          fallbackMailto: true,
          message:
            "Failed to dispatch email through the notification service. Please reach out via direct email.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Contact API route error:", err);
    }
    return NextResponse.json(
      {
        error: "An unexpected error occurred. Please use direct email.",
        fallbackMailto: true,
      },
      { status: 500 },
    );
  }
}
