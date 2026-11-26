import type { Metadata } from "next";
import { AccaPath } from "@/components/sections/acca-path";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { Button } from "@/components/ui/button";
import { EditorialSection } from "@/components/ui/editorial-section";
import { getContent } from "@/lib/content";
import { getPublicContent } from "@/lib/getPublicContent";
import { getRobotsMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const content = getPublicContent();
  const employer = content.experience.items[0]?.company;
  const description = employer
    ? `${content.meta.name} — ${content.acca.level ?? "ACCA"} (${content.acca.institute ?? ""}) and ${content.experience.items[0]?.role ?? "Accounting"} at ${employer}.`
    : content.meta.tagline;
  return {
    title: "Experience",
    description,
    alternates: { canonical: "/experience" },
    robots: getRobotsMetadata(),
    openGraph: {
      title: `Experience | ${content.meta.name}`,
      description,
      url: "/experience",
    },
    twitter: {
      card: "summary_large_image",
      title: `Experience | ${content.meta.name}`,
      description,
    },
  };
}

export default function ExperiencePage() {
  const content = getPublicContent();
  const source = getContent();
  const pdfUrl = content.cv.pdfUrl;
  const acca = content.acca.visible ? content.acca : null;

  const qualificationRows = [
    ...(content.certifications.visible
      ? content.certifications.items.map((item) => ({
          title: item.name,
          details: [item.institute, item.year === null ? null : String(item.year)]
            .filter((value): value is string => Boolean(value))
            .join(" · "),
        }))
      : []),
    ...(content.education.visible
      ? content.education.items
          .filter((item) => item.qualification.trim().toLowerCase() !== "acca")
          .map((item) => ({
            title: item.qualification,
            details: [item.institute, item.period, item.grade]
              .filter((value): value is string => Boolean(value))
              .join(" · "),
          }))
      : []),
  ].filter((item, index, rows) =>
    rows.findIndex(
      (candidate) => candidate.title.toLowerCase() === item.title.toLowerCase(),
    ) === index,
  );

  const timelineItems = content.experience.visible
    ? content.experience.items.map((item, index) => ({
        role: item.role,
        company: item.company,
        period: item.period,
        responsibilities: (
          Array.isArray(item.responsibilities)
            ? item.responsibilities
            : item.responsibilities
              ? [item.responsibilities]
              : []
        ).filter((value) => value.trim().length > 0),
        tools: (item.tools ?? []).filter((tool) => tool.trim().length > 0),
        needsApproval: source.experience.items[index]?.needsApproval,
      }))
    : [];
  const showQualifications = Boolean(
    (acca?.level && acca.level.trim()) || qualificationRows.length > 0,
  );

  return (
    <div className="shell pb-12">
      {showQualifications ? (
        <EditorialSection
          id="qualifications-heading"
          as="h1"
          eyebrow="Credentials"
          title="Qualifications"
        >
          {acca?.level ? (
            <div className="border border-line bg-surface p-6 sm:p-8">
              <AccaPath
                level={acca.level}
                levelNote={acca.levelNote}
                institute={acca.institute}
                since={acca.since}
              />
            </div>
          ) : null}

          {qualificationRows.length > 0 ? (
            <div
              className={`${acca?.level ? "mt-8" : ""} divide-y divide-line border-y border-line`}
            >
              {qualificationRows.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <p className="text-base font-medium text-ink">{item.title}</p>
                  {item.details ? (
                    <p className="font-mono text-xs tabular-nums text-muted">
                      {item.details}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          ) : null}
        </EditorialSection>
      ) : null}

      {timelineItems.length > 0 ? (
        <EditorialSection
          id="experience-heading"
          eyebrow="Career"
          title="Experience"
        >
          <ExperienceTimeline items={timelineItems} />
        </EditorialSection>
      ) : null}

      <EditorialSection
        id="cv-heading"
        eyebrow="Next steps"
        title="Curriculum Vitae"
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button href="/cv">View CV</Button>
          {pdfUrl ? (
            <Button href={pdfUrl} variant="secondary" external>
              {content.hero.ctaPrimary}
            </Button>
          ) : null}
        </div>
      </EditorialSection>
    </div>
  );
}
