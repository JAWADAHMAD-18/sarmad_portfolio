import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

export function Closing({
  heading,
  text,
  cta,
  needsApproval,
}: {
  heading: string;
  text: string;
  cta: string;
  needsApproval?: boolean;
}) {
  return (
    <section
      className="shell section-space border-t border-line"
      aria-labelledby="closing-heading"
    >
      <SectionHeading
        id="closing-heading"
        title={heading}
        needsApproval={needsApproval}
      />
      <p className="mt-6 max-w-[68ch] text-[1.0625rem] leading-relaxed text-muted">
        {text}
      </p>
      <div className="mt-8">
        <Button href="/contact">{cta}</Button>
      </div>
    </section>
  );
}
