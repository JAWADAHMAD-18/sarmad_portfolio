"use client";

import { motion, useReducedMotion } from "motion/react";

const ACCA_LEVELS = [
  "Applied Knowledge",
  "Applied Skills",
  "Strategic Professional",
] as const;

export function AccaPath({
  level,
  levelNote,
  institute,
  since,
  compact = false,
}: {
  level: string | null;
  levelNote?: string | null;
  institute?: string | null;
  since?: string | null;
  compact?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  if (!level) return null;

  const currentIndex = ACCA_LEVELS.findIndex(
    (item) => item.toLowerCase() === level.trim().toLowerCase(),
  );
  const activeIndex = currentIndex >= 0 ? currentIndex : 2;
  const fillPercent =
    activeIndex === 0 ? "18%" : activeIndex === 1 ? "58%" : "100%";
  const supportingTextSize = compact ? "text-xs" : "text-sm";

  return (
    <div
      className={compact ? "pt-6" : "pt-2"}
      aria-label="ACCA qualification pathway"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="flex items-center gap-3">
          <span
            className={`font-mono ${supportingTextSize} uppercase tracking-widest text-muted`}
          >
            ACCA Pathway
          </span>
          {levelNote ? (
            <span
              className={`border border-accent/30 bg-accent/8 px-2.5 py-0.5 font-mono ${supportingTextSize} text-accent`}
            >
              {levelNote}
            </span>
          ) : null}
        </div>
        {institute || since ? (
          <span className={`font-mono ${supportingTextSize} text-muted`}>
            {[institute, since ? `Since ${since}` : null]
              .filter(Boolean)
              .join(" · ")}
          </span>
        ) : null}
      </div>

      {/* Horizontal Track */}
      <div className="relative mt-6">
        {/* Background Track Line (desktop) */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-3 hidden h-[2px] bg-line sm:block"
        />
        {/* Animated Fill Line (desktop) */}
        <motion.div
          aria-hidden="true"
          initial={{ width: "0%" }}
          whileInView={{ width: fillPercent }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.75,
            ease: "easeOut",
          }}
          className="absolute left-0 top-3 hidden h-[2px] bg-accent sm:block"
        />

        <ol className="relative grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
          {ACCA_LEVELS.map((stage, idx) => {
            const isCurrent = idx === activeIndex;
            const isPast = idx < activeIndex;
            return (
              <li
                key={stage}
                aria-current={isCurrent ? "step" : undefined}
                className="flex items-start gap-3.5 sm:flex-col sm:gap-3"
              >
                <span
                  aria-hidden="true"
                  className={`relative z-10 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border font-mono ${supportingTextSize} tabular-nums transition-colors ${
                    isCurrent
                      ? "border-accent bg-accent text-accent-ink ring-4 ring-accent/15"
                      : isPast
                        ? "border-accent bg-surface text-accent"
                        : "border-line bg-surface text-muted"
                  }`}
                >
                  0{idx + 1}
                </span>
                <div>
                  <p
                    className={`font-serif text-lg leading-snug tracking-tight sm:text-xl ${
                      isCurrent ? "text-ink" : isPast ? "text-ink/85" : "text-muted"
                    }`}
                  >
                    {stage}
                  </p>
                  {isCurrent ? (
                    <span
                      className={`mt-1 inline-block font-mono ${supportingTextSize} uppercase tracking-wider text-accent`}
                    >
                      Current level
                    </span>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
