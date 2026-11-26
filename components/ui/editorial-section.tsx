import { DraftTag } from "@/components/ui/draft-tag";
import { FadeIn } from "@/components/ui/fade-in";
import { SectionHeading } from "@/components/ui/section-heading";
import type { ReactNode } from "react";

export function EditorialSection({
  id,
  eyebrow,
  title,
  description,
  descriptionNeedsApproval,
  needsApproval,
  as,
  children,
  className = "",
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string | null;
  descriptionNeedsApproval?: boolean;
  needsApproval?: boolean;
  as?: "h1" | "h2" | "h3";
  children: ReactNode;
  className?: string;
}) {
  return (
    <FadeIn>
      <section
        aria-labelledby={id}
        className={`grid grid-cols-1 gap-8 border-t border-line py-12 md:gap-12 lg:grid-cols-12 lg:gap-16 ${className}`}
      >
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id={id}
              eyebrow={eyebrow}
              title={title}
              as={as}
              needsApproval={needsApproval}
              className={description ? "mb-0" : ""}
            />
            {description ? (
              <p className="mt-4 flex flex-wrap items-start gap-2 text-base leading-relaxed text-muted">
                <span>{description}</span>
                <DraftTag needsApproval={descriptionNeedsApproval} />
              </p>
            ) : null}
          </div>
        </div>
        <div className="min-w-0 lg:col-span-8">{children}</div>
      </section>
    </FadeIn>
  );
}
