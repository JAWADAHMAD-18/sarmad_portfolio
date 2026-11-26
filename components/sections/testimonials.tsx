import { SectionHeading } from "@/components/ui/section-heading";

export function Testimonials({
  visible,
  items,
}: {
  visible: boolean;
  items: Array<{
    quote?: string;
    name?: string;
    role?: string | null;
    permission?: boolean;
  }>;
}) {
  const approved = items.filter(
    (item) => item.permission === true && item.quote && item.name,
  );

  // Hidden unless visible is true AND at least one approved testimonial exists
  if (!visible || approved.length === 0) return null;

  return (
    <section className="shell py-16 md:py-24" aria-labelledby="testimonials-heading">
      <SectionHeading
        id="testimonials-heading"
        eyebrow="Endorsements"
        title="Testimonials"
      />

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:mt-12">
        {approved.map((item, index) => (
          <blockquote
            key={index}
            className="flex flex-col justify-between border border-line bg-surface p-7"
          >
            <p className="font-serif text-lg leading-relaxed text-ink">
              “{item.quote}”
            </p>
            <footer className="mt-6 border-t border-line pt-4">
              <cite className="not-italic">
                <span className="block font-medium text-ink">{item.name}</span>
                {item.role ? (
                  <span className="block font-mono text-xs text-muted">
                    {item.role}
                  </span>
                ) : null}
              </cite>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
