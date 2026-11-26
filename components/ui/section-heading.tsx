import { DraftTag } from "@/components/ui/draft-tag";

export function SectionHeading({
  id,
  title,
  eyebrow,
  description,
  needsApproval,
  as: Component = "h2",
  className = "",
}: {
  id?: string;
  title: string;
  eyebrow?: string;
  description?: string;
  needsApproval?: boolean;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow ? (
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted">
          {eyebrow}
        </p>
      ) : null}
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
        <Component
          id={id}
          className="font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-tight text-ink"
        >
          {title}
        </Component>
        <DraftTag needsApproval={needsApproval} />
      </div>
      <div className="rule mt-5 max-w-full" />
      <div className="rule" />
      {description ? (
        <p className="mt-4 max-w-[68ch] text-[1.0625rem] leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}
