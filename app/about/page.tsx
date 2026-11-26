import type { Metadata } from "next";
import {
  BriefcaseBusiness,
  Clock3,
  MapPin,
  Target,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { DraftTag } from "@/components/ui/draft-tag";
import { EditorialSection } from "@/components/ui/editorial-section";
import { PortraitFrame } from "@/components/ui/portrait-frame";
import { getContent } from "@/lib/content";
import { getPublicContent } from "@/lib/getPublicContent";
import { getRobotsMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const content = getPublicContent();
  const description = content.about.bio
    ? content.about.bio.slice(0, 155).trim()
    : content.meta.tagline;
  return {
    title: "About",
    description,
    alternates: { canonical: "/about" },
    robots: getRobotsMetadata(),
    openGraph: {
      title: `About | ${content.meta.name}`,
      description,
      url: "/about",
    },
    twitter: {
      card: "summary_large_image",
      title: `About | ${content.meta.name}`,
      description,
    },
  };
}

function splitBioIntoParagraphs(bio: string): string[] {
  const sentences = bio.split(/(?<=\.)\s+/);
  if (sentences.length <= 2) return [bio];
  const mid = Math.ceil(sentences.length / 2);
  return [
    sentences.slice(0, mid).join(" "),
    sentences.slice(mid).join(" "),
  ].filter(Boolean);
}

type GlanceItem = {
  label: string;
  value: string;
  Icon: LucideIcon;
  needsApproval?: boolean;
};

export default function AboutPage() {
  const content = getPublicContent();
  const source = getContent();
  const aboutVisible = content.about.visible;
  const bioParagraphs = content.about.bio
    ? splitBioIntoParagraphs(content.about.bio)
    : [];
  const strengths = aboutVisible ? content.about.strengths : [];
  const workStyle = aboutVisible ? content.about.workStyle : [];
  const location = [
    content.contact.city ?? content.meta.location.city,
    content.meta.location.country,
  ]
    .filter((value): value is string => Boolean(value))
    .join(", ");
  const focus = content.credentials.visible
    ? content.credentials.items.find((item) => item.label === "Focus")?.value
    : null;
  const currentRole = content.experience.visible
    ? content.experience.items[0]
    : null;
  const tools = content.skills.visible
    ? content.skills.tools
        .map((tool) => tool.name)
        .filter((name) => name.trim().length > 0)
    : [];
  const availability = [
    content.meta.availability,
    content.meta.availabilityDetail,
  ]
    .filter((value): value is string => Boolean(value))
    .join(" · ");

  const glanceItems: GlanceItem[] = [];
  if (location) glanceItems.push({ label: "Location", value: location, Icon: MapPin });
  if (focus) glanceItems.push({ label: "Focus", value: focus, Icon: Target });
  if (currentRole) {
    glanceItems.push({
      label: "Current role",
      value: `${currentRole.role} · ${currentRole.company}`,
      Icon: BriefcaseBusiness,
      needsApproval: source.experience.items[0]?.needsApproval,
    });
  }
  if (tools.length > 0) {
    glanceItems.push({ label: "Tools", value: tools.join(", "), Icon: Wrench });
  }
  if (availability) {
    glanceItems.push({
      label: "Availability",
      value: availability,
      Icon: Clock3,
    });
  }

  const showHowIWork = strengths.length > 0 || workStyle.length > 0;

  return (
    <div className="shell pb-12">
      {aboutVisible ? (
        <EditorialSection
          id="about-heading"
          as="h1"
          eyebrow="Profile"
          title={`About ${content.meta.name}`}
        >
          <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(220px,0.8fr)] md:items-start">
            <div>
              {bioParagraphs.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={`leading-relaxed text-muted ${
                    index === 0
                      ? "text-[clamp(1.25rem,2vw,1.375rem)]"
                      : "mt-5 text-base"
                  }`}
                >
                  {paragraph}
                </p>
              ))}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button href="/contact">{content.hero.ctaSecondary}</Button>
                <Button
                  href={content.cv.pdfUrl ?? "/cv"}
                  variant="secondary"
                  external={Boolean(content.cv.pdfUrl)}
                >
                  {content.hero.ctaPrimary}
                </Button>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[340px] md:mx-0 md:justify-self-end">
              <PortraitFrame
                photo={content.meta.photo}
                priority
                accaLevel={content.acca.level}
                accaSince={content.acca.since}
                largeLabels
              />
            </div>
          </div>
        </EditorialSection>
      ) : null}

      {aboutVisible && glanceItems.length > 0 ? (
        <EditorialSection
          id="glance-heading"
          eyebrow="Profile"
          title="At a glance"
        >
          <div className="divide-y divide-line border border-line bg-surface px-5 sm:px-7">
            {glanceItems.map(({ label, value, Icon, needsApproval }) => (
              <div
                key={label}
                className="flex items-center gap-4 py-4 first:pt-5 last:pb-5"
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
                  <div className="mt-0.5 flex flex-wrap items-baseline gap-2">
                    <p className="text-base leading-relaxed text-ink">
                      {value}
                    </p>
                    <span className="min-w-0">
                      <DraftTag needsApproval={needsApproval} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </EditorialSection>
      ) : null}

      {aboutVisible && showHowIWork ? (
        <EditorialSection
          id="how-i-work-heading"
          eyebrow="Approach"
          title="How I work"
        >
          {strengths.length > 0 ? (
            <ol className="grid grid-cols-1 border-y border-line sm:grid-cols-2">
              {strengths.map((strength, index) => (
                <li
                  key={strength}
                  className="border-b border-line py-5 last:border-b-0 sm:odd:pr-6 sm:even:border-l sm:even:pl-6"
                >
                  <span className="font-mono text-xs tabular-nums text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 font-serif text-3xl tracking-tight text-ink sm:text-4xl">
                    {strength}
                  </p>
                </li>
              ))}
            </ol>
          ) : null}
          {workStyle.length > 0 ? (
            <div className={`${strengths.length > 0 ? "mt-7" : ""}`}>
              <p className="mb-3 font-mono text-sm uppercase tracking-wider text-muted">
                Work style
              </p>
              <div className="flex flex-wrap gap-2">
                {workStyle.map((item) => (
                  <Chip
                    key={item}
                    className="font-sans text-sm motion-safe:transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {item}
                  </Chip>
                ))}
              </div>
            </div>
          ) : null}
        </EditorialSection>
      ) : null}

      {content.closing.visible ? (
        <EditorialSection
          id="closing-heading"
          eyebrow="Next steps"
          title={content.closing.heading}
          needsApproval={source.closing.needsApproval}
        >
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[60ch] text-base leading-relaxed text-muted">
              {content.closing.text}
            </p>
            <Button href="/contact">{content.hero.ctaSecondary}</Button>
          </div>
        </EditorialSection>
      ) : null}
    </div>
  );
}
