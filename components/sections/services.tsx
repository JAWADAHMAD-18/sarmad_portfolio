"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { DraftTag } from "@/components/ui/draft-tag";
import {
  BookOpen,
  Calculator,
  ChevronDown,
  FileSpreadsheet,
  ReceiptText,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";

const SERVICE_ICONS = [BookOpen, ReceiptText, Calculator, FileSpreadsheet];

export function Services({
  heading,
  intro,
  items,
  needsApproval,
}: {
  heading: string;
  intro?: string | null;
  items: Array<{
    title: string;
    description?: string | null;
    included?: string[];
    needsApproval?: boolean;
  }>;
  needsApproval?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const validItems = items.filter(
    (item) => item.title && item.title.trim().length > 0,
  );

  if (validItems.length === 0) return null;

  return (
    <section
      className="shell section-space"
      aria-labelledby="services-heading"
    >
      <SectionHeading
        id="services-heading"
        eyebrow="Services"
        title={heading}
        description={intro ?? undefined}
        needsApproval={needsApproval}
      />

      <div className="mt-10 border-t border-line md:mt-12">
        {validItems.map((item, index) => {
          const isOpen = openIndex === index;
          const Icon = SERVICE_ICONS[index % SERVICE_ICONS.length];
          const panelId = `${baseId}-panel-${index}`;
          const triggerId = `${baseId}-trigger-${index}`;
          const included = item.included?.filter((x) => x.trim().length > 0) ?? [];

          return (
            <div
              key={item.title}
              onMouseEnter={() => setOpenIndex(index)}
              className="border-b border-line transition-colors"
            >
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="group flex min-h-16 w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <span className="font-mono text-xs tabular-nums text-muted">
                    0{index + 1}
                  </span>

                  <span
                    aria-hidden="true"
                    className={`flex size-10 shrink-0 items-center justify-center rounded-lg border backdrop-blur-sm transition-colors ${
                      isOpen
                        ? "border-accent/40 bg-accent/10 text-accent"
                        : "border-line bg-surface/75 text-muted group-hover:border-accent/30 group-hover:text-accent"
                    }`}
                  >
                    <Icon strokeWidth={1.5} className="size-4" />
                  </span>

                  <div>
                    <div className="flex flex-wrap items-baseline gap-2">
                      <h3 className="font-serif text-2xl tracking-tight text-ink sm:text-[1.75rem]">
                        {item.title}
                      </h3>
                      <DraftTag needsApproval={item.needsApproval} />
                    </div>
                    {item.description ? (
                      <p className="mt-1 text-sm text-muted">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                </div>

                <span
                  aria-hidden="true"
                  className={`flex size-11 shrink-0 items-center justify-center text-muted transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-accent" : "group-hover:text-ink"
                  }`}
                >
                  <ChevronDown strokeWidth={1.5} className="size-5" />
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && included.length > 0 ? (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.25,
                      ease: "easeOut",
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pl-0 sm:pl-[5.5rem]">
                      <p className="font-mono text-xs uppercase tracking-widest text-muted">
                        What is included
                      </p>
                      <ul className="mt-3 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                        {included.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-2.5 text-sm text-ink/90"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-accent"
                            />
                            <span>{point}</span>
                            <DraftTag needsApproval={item.needsApproval} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
