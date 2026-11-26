"use client";

import { Chip } from "@/components/ui/chip";
import { DraftTag } from "@/components/ui/draft-tag";
import { motion, useReducedMotion } from "motion/react";

export type TimelineExperience = {
  role: string;
  company: string;
  period: string | null;
  responsibilities: string[];
  tools: string[];
  needsApproval?: boolean;
};

export function ExperienceTimeline({
  items,
}: {
  items: TimelineExperience[];
}) {
  const shouldReduceMotion = useReducedMotion();
  if (items.length === 0) return null;

  return (
    <div className="relative">
      <motion.span
        aria-hidden="true"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.8,
          ease: "easeOut",
        }}
        style={{ originY: 0 }}
        className="motion-reduce-transform absolute left-0 top-0 h-full w-px bg-accent"
      />
      <ol className="relative space-y-10 border-l border-transparent pl-6 sm:pl-8">
        {items.map((item, index) => (
          <motion.li
            key={`${item.company}-${item.role}-${index}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: shouldReduceMotion ? 0.2 : 0.4,
              delay: shouldReduceMotion ? 0 : index * 0.08,
              ease: "easeOut",
            }}
            className="motion-reduce-transform group relative grid gap-3 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-6"
          >
            <span
              aria-hidden="true"
              className="absolute -left-[1.8rem] top-1.5 size-2.5 rounded-full border border-accent bg-bg sm:-left-[2.3rem]"
            />
            {item.period ? (
              <p className="font-mono text-sm tabular-nums text-muted">
                {item.period}
              </p>
            ) : null}
            <div className={`min-w-0 ${item.period ? "" : "md:col-span-2"}`}>
              <p className="font-mono text-sm uppercase tracking-wider text-muted">
                {item.company}
              </p>
              <div className="mt-1 flex flex-wrap items-baseline gap-2">
                <h3 className="font-serif text-2xl tracking-tight text-ink transition-colors group-hover:text-accent sm:text-3xl">
                  {item.role}
                </h3>
                <DraftTag needsApproval={item.needsApproval} />
              </div>
              {item.responsibilities.length > 0 ? (
                <ul className="mt-5 space-y-3">
                  {item.responsibilities.map((responsibility) => (
                    <li
                      key={responsibility}
                      className="flex items-start gap-2.5 text-base leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2.5 inline-block size-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span>{responsibility}</span>
                      <DraftTag needsApproval={item.needsApproval} />
                    </li>
                  ))}
                </ul>
              ) : null}
              {item.tools.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tools.map((tool) => (
                    <Chip
                      key={tool}
                      className="motion-safe:transition-colors hover:border-accent/50 hover:text-accent"
                    >
                      {tool}
                    </Chip>
                  ))}
                </div>
              ) : null}
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
