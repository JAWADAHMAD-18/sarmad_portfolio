"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { DraftTag } from "@/components/ui/draft-tag";
import {
  ClipboardCheck,
  FileCheck2,
  FolderOpen,
  MessageSquareText,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const STEP_ICONS = [
  MessageSquareText,
  FolderOpen,
  FileCheck2,
  ClipboardCheck,
];

export function ProcessSection({
  heading,
  intro,
  steps,
  needsApproval,
}: {
  heading: string;
  intro?: string | null;
  steps: Array<{
    title: string;
    description: string;
    needsApproval?: boolean;
  }>;
  needsApproval?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (!steps || steps.length === 0) return null;

  return (
    <section
      className="shell section-space"
      aria-labelledby="process-heading"
    >
      <SectionHeading
        id="process-heading"
        eyebrow="Workflow"
        title={heading}
        description={intro ?? undefined}
        needsApproval={needsApproval}
      />

      <div className="relative mt-12">
        {/* Connecting line on desktop that draws on scroll */}
        <div
          aria-hidden="true"
          className="absolute left-6 right-6 top-5 hidden h-px bg-line lg:block"
        />
        <motion.div
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.8,
            ease: "easeOut",
          }}
          style={{ originX: 0 }}
          className="motion-reduce-transform absolute left-6 right-6 top-5 hidden h-px bg-accent lg:block"
        />

        <ol className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = STEP_ICONS[index % STEP_ICONS.length];
            return (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: shouldReduceMotion ? 0.2 : 0.4,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                  ease: "easeOut",
                }}
                className="motion-reduce-transform relative flex flex-col"
              >
                <div className="flex items-center gap-3">
                  <span className="relative z-10 flex size-10 items-center justify-center rounded-lg border border-line bg-surface/85 text-accent backdrop-blur-sm">
                    <Icon strokeWidth={1.5} className="size-4" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs tabular-nums text-muted">
                    0{index + 1}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap items-baseline gap-2">
                  <h3 className="font-serif text-2xl tracking-tight text-ink">
                    {step.title}
                  </h3>
                  <DraftTag needsApproval={step.needsApproval} />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
