import { Chip } from "@/components/ui/chip";
import { SectionHeading } from "@/components/ui/section-heading";
import { Calculator, FileSpreadsheet, Layers } from "lucide-react";

function ToolIcon({ name }: { name: string }) {
  const lower = name.toLowerCase();
  if (lower.includes("excel")) {
    return <FileSpreadsheet strokeWidth={1.5} className="size-3.5 text-accent" aria-hidden="true" />;
  }
  if (lower.includes("quickbooks")) {
    return <Calculator strokeWidth={1.5} className="size-3.5 text-accent" aria-hidden="true" />;
  }
  return <Layers strokeWidth={1.5} className="size-3.5 text-accent" aria-hidden="true" />;
}

export function Skills({
  tools,
  technical,
  soft,
  excelSkills,
}: {
  tools: Array<{ name: string; level: string | null }>;
  technical: string[];
  soft: string[];
  excelSkills?: string | string[] | null;
}) {
  const hasTools = tools && tools.length > 0;
  const hasTechnical = technical && technical.length > 0;
  const hasSoft = soft && soft.length > 0;
  const hasExcel = Boolean(excelSkills);

  if (!hasTools && !hasTechnical && !hasSoft && !hasExcel) return null;

  return (
    <section
      className="shell section-space"
      aria-labelledby="skills-heading"
    >
      <SectionHeading
        id="skills-heading"
        eyebrow="Competencies"
        title="Skills & Tools"
      />

      <div className="mt-10 space-y-10 md:mt-12">
        {/* Tools as chips with icons */}
        {hasTools ? (
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
              Tools
            </h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {tools.map((tool) => (
                <Chip key={tool.name} level={tool.level}>
                  <span className="inline-flex items-center gap-2">
                    <ToolIcon name={tool.name} />
                    <span>{tool.name}</span>
                  </span>
                </Chip>
              ))}
            </div>
          </div>
        ) : null}

        {/* Technical & Soft skills as clean inline lists (no framed boxes) */}
        <div className="grid grid-cols-1 gap-10 border-t border-line pt-8 md:grid-cols-2 md:gap-12">
          {hasTechnical ? (
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
                Technical
              </h3>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5 text-base text-ink">
                {technical.map((tech) => (
                  <li key={tech} className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="inline-block size-1.5 rounded-full bg-accent"
                    />
                    <span>{tech}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {hasSoft ? (
            <div>
              <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
                Work style
              </h3>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2.5 text-base text-ink">
                {soft.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="inline-block size-1.5 rounded-full bg-accent"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {/* Excel Skills (only when present) */}
        {hasExcel ? (
          <div className="border-t border-line pt-8">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
              Excel
            </h3>
            <p className="mt-3 text-base text-ink">
              {Array.isArray(excelSkills) ? excelSkills.join(", ") : excelSkills}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
