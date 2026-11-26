import type { Metadata } from "next";
import {
  Clock,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { Button } from "@/components/ui/button";
import { EditorialSection } from "@/components/ui/editorial-section";
import { getContent } from "@/lib/content";
import { getPublicContent } from "@/lib/getPublicContent";
import { formatPhoneDisplay } from "@/lib/phone";
import { getRobotsMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const content = getPublicContent();
  const description = content.meta.availability
    ? `${content.meta.availability}. ${content.closing.text}`
    : content.closing.text;
  return {
    title: "Contact",
    description,
    alternates: { canonical: "/contact" },
    robots: getRobotsMetadata(),
    openGraph: {
      title: `Contact | ${content.meta.name}`,
      description,
      url: "/contact",
    },
    twitter: {
      card: "summary_large_image",
      title: `Contact | ${content.meta.name}`,
      description,
    },
  };
}

type ContactDetail = {
  label: string;
  value: string;
  Icon: LucideIcon;
  href?: string;
  external?: boolean;
};

export default function ContactPage() {
  const content = getPublicContent();
  const source = getContent();
  if (!content.contact.visible) return null;

  const publicEmail = content.contact.email.public
    ? content.contact.email.value
    : null;
  const publicPhone = content.contact.phone.public
    ? content.contact.phone.value
    : null;
  const publicWhatsapp =
    content.contact.whatsapp.public && content.contact.whatsapp.value
      ? content.contact.whatsapp.value
      : null;
  const location = [
    content.contact.city ?? content.meta.location.city,
    content.meta.location.country,
  ]
    .filter((value): value is string => Boolean(value))
    .join(", ");

  const details: ContactDetail[] = [];
  if (publicEmail) {
    details.push({
      label: "Email",
      value: publicEmail,
      Icon: Mail,
      href: `mailto:${publicEmail}`,
    });
  }
  if (publicPhone) {
    details.push({
      label: "Telephone",
      value: formatPhoneDisplay(publicPhone),
      Icon: Phone,
      href: `tel:${publicPhone}`,
    });
  }
  if (publicWhatsapp) {
    details.push({
      label: "WhatsApp",
      value: formatPhoneDisplay(publicWhatsapp),
      Icon: MessageCircle,
      href: `https://wa.me/${publicWhatsapp.replace(/\D/g, "")}`,
      external: true,
    });
  }
  if (content.contact.linkedin) {
    details.push({
      label: "LinkedIn",
      value: "linkedin.com/in/sarmad-ali-a42ab03b9",
      Icon: Globe,
      href: content.contact.linkedin,
      external: true,
    });
  }
  if (location) {
    details.push({ label: "Location", value: location, Icon: MapPin });
  }
  if (content.contact.workingHours) {
    details.push({
      label: "Working hours",
      value: content.contact.workingHours,
      Icon: Clock,
    });
  }
  for (const link of content.contact.otherLinks) {
    if (link.label && link.url) {
      details.push({
        label: link.label,
        value: link.url,
        Icon: Globe,
        href: link.url,
        external: true,
      });
    }
  }
  if (content.meta.availabilityDetail) {
    details.push({
      label: "Availability",
      value: content.meta.availabilityDetail,
      Icon: Clock,
    });
  }

  return (
    <div className="shell pb-12">
      <EditorialSection
        id="contact-heading"
        as="h1"
        eyebrow="Inquiries"
        title="Contact"
        description={content.closing.visible ? content.closing.text : undefined}
        descriptionNeedsApproval={source.closing.needsApproval}
      >
        <ContactForm publicEmail={publicEmail} />
      </EditorialSection>

      {details.length > 0 ? (
        <EditorialSection
          id="contact-details-heading"
          eyebrow="Direct"
          title="Direct channels"
          description={content.meta.availability}
        >
          <div className="divide-y divide-line border-y border-line">
            {details.map(({ label, value, Icon, href, external }) => (
              <div
                key={`${label}-${value}`}
                className="flex items-center gap-4 py-4"
              >
                <span
                  aria-hidden="true"
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-accent/8 text-accent backdrop-blur-sm"
                >
                  <Icon strokeWidth={1.5} className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-sm uppercase tracking-wider text-muted">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="block break-words text-base font-medium text-ink underline-offset-4 hover:text-accent hover:underline"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-base text-ink">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          {publicWhatsapp ? (
            <div className="mt-6">
              <Button
                href={`https://wa.me/${publicWhatsapp.replace(/\D/g, "")}`}
                variant="secondary"
                external
              >
                Chat on WhatsApp
              </Button>
            </div>
          ) : null}
        </EditorialSection>
      ) : null}
    </div>
  );
}
