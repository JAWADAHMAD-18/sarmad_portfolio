import Link from "next/link";
import { DraftTag } from "@/components/ui/draft-tag";
import { SectionHeading } from "@/components/ui/section-heading";

export function ExperiencePreview({
  items,
}: {
  items: Array<{
    role: string;
    company: string;
    period?: string | null;
    industry?: string | null;
    responsibilities?: string | string[] | null;
    achievements?: string | string[] | null;
    tools?: string[] | null;
    needsApproval?: boolean;
  }>;
}) {
  const latest = items[0];
  if (!latest || !latest.role || !latest.company) return null;

  const responsibilities = Array.isArray(latest.responsibilities)
    ? latest.responsibilities
    : latest.responsibilities
      ? [latest.responsibilities]
      : [];

  return (
    <section
      className="shell section-space"
      aria-labelledby="experience-heading"
    >
      <SectionHeading
        id="experience-heading"
        eyebrow="Career"
        title="Experience"
      />

      <div className="mt-10 border-t border-line pt-8 md:mt-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              {latest.company}
              {latest.industry ? ` · ${latest.industry}` : ""}
            </p>
            <div className="mt-1.5 flex flex-wrap items-baseline gap-2">
              <h3 className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">
                {latest.role}
              </h3>
              <DraftTag needsApproval={latest.needsApproval} />
            </div>
          </div>
          {latest.period ? (
            <div className="font-mono text-sm tabular-nums text-muted sm:text-right">
              {latest.period}
            </div>
          ) : null}
        </div>

        {responsibilities.length > 0 ? (
          <ul className="mt-6 grid grid-cols-1 gap-x-10 gap-y-2.5 text-sm leading-relaxed text-muted md:grid-cols-2">
            {responsibilities.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-accent"
                />
                <span>{item}</span>
                <DraftTag needsApproval={latest.needsApproval} />
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-8 border-t border-line/70 pt-5">
          <Link
            href="/experience"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink underline-offset-4 hover:text-accent hover:underline"
          >
            See full experience & education →
          </Link>
        </div>
      </div>
    </section>
  );
}
