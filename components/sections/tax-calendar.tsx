"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { DraftTag } from "@/components/ui/draft-tag";
import { CalendarDays } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";

export function TaxCalendar({
  heading,
  note,
  startLabel,
  endLabel,
  dates,
}: {
  heading: string;
  note: string;
  startLabel: string;
  endLabel: string;
  dates: Array<{
    date: string;
    title: string;
    note: string;
    position: number;
    needsApproval?: boolean;
  }>;
}) {
  const shouldReduceMotion = useReducedMotion();
  const baseId = useId();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  if (!dates || dates.length === 0) return null;

  const activeItem = dates[selectedIndex] ?? dates[0];

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    idx: number,
  ) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setSelectedIndex((idx + 1) % dates.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSelectedIndex((idx - 1 + dates.length) % dates.length);
    }
  };

  return (
    <section
      className="shell section-space"
      aria-labelledby="tax-calendar-heading"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          id="tax-calendar-heading"
          eyebrow="UK Tax Year"
          title={heading}
        />
        <p className="font-mono text-xs text-muted">{note}</p>
      </div>

      {/* Interactive Timeline */}
      <div className="mt-10 border-t border-line pt-8 md:mt-12">
        {/* Desktop Horizontal Timeline */}
        <div className="hidden md:block">
          <div className="mb-3 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-muted">
            <span>{startLabel}</span>
            <span>{endLabel}</span>
          </div>

          <div className="relative h-24">
            {/* Base track */}
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-6 h-[2px] bg-line"
            />
            {/* Animated progress line */}
            <motion.div
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.85,
                ease: "easeOut",
              }}
              style={{ originX: 0 }}
              className="motion-reduce-transform absolute left-0 right-0 top-6 h-[2px] bg-accent/55"
            />

            {/* Clickable Markers */}
            {dates.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const isEdgeLeft = item.position <= 5;
              const isEdgeRight = item.position >= 95;

              return (
                <div
                  key={`${item.date}-${item.title}`}
                  style={{ left: `${item.position}%` }}
                  className={`absolute top-0 flex flex-col ${
                    isEdgeLeft
                      ? "items-start"
                      : isEdgeRight
                        ? "-translate-x-full items-end"
                        : "-translate-x-1/2 items-center"
                  }`}
                >
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    aria-controls={`${baseId}-detail`}
                    onClick={() => setSelectedIndex(idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className="group flex min-h-11 min-w-11 flex-col items-center justify-start pt-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    <span
                      aria-hidden="true"
                      className={`block size-4 rounded-full border-2 transition-transform ${
                        isSelected
                          ? "scale-125 border-accent bg-accent ring-4 ring-accent/20"
                          : "border-accent bg-surface group-hover:scale-110"
                      }`}
                    />
                    <span
                      className={`mt-2.5 whitespace-nowrap font-mono text-xs tabular-nums transition-colors ${
                        isSelected
                          ? "font-medium text-accent"
                          : "text-muted group-hover:text-ink"
                      }`}
                    >
                      {item.date}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile / Tablet Accessible Date Selector */}
        <div
          className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:hidden"
          role="group"
          aria-label="Key UK tax dates"
        >
          {dates.map((item, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <button
                key={`${item.date}-${item.title}`}
                type="button"
                aria-pressed={isSelected}
                aria-controls={`${baseId}-detail`}
                onClick={() => setSelectedIndex(idx)}
                className={`flex min-h-11 flex-col items-start justify-center border px-3.5 py-2.5 text-left transition-colors ${
                  isSelected
                    ? "border-accent bg-accent/8 text-ink"
                    : "border-line bg-surface text-muted hover:border-accent/50 hover:text-ink"
                }`}
              >
                <span
                  className={`font-mono text-xs tabular-nums ${
                    isSelected ? "font-medium text-accent" : "text-muted"
                  }`}
                >
                  {item.date}
                </span>
                <span className="mt-0.5 line-clamp-1 text-xs font-medium text-ink">
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Date Detail Panel */}
        <div
          id={`${baseId}-detail`}
          aria-live="polite"
          className="mt-6 flex flex-col justify-between gap-4 border border-line bg-surface p-6 sm:flex-row sm:items-center sm:p-7"
        >
          <div className="flex items-start gap-4">
            <span
              aria-hidden="true"
              className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-line bg-accent/10 text-accent backdrop-blur-sm"
            >
              <CalendarDays strokeWidth={1.5} className="size-4" />
            </span>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-accent tabular-nums">
                {activeItem.date}
              </p>
              <h3 className="mt-1 font-serif text-2xl tracking-tight text-ink">
                {activeItem.title}
              </h3>
              <p className="mt-1.5 max-w-[65ch] text-sm leading-relaxed text-muted">
                {activeItem.note}
              </p>
              <div className="mt-2">
                <DraftTag needsApproval={activeItem.needsApproval} />
              </div>
            </div>
          </div>

          <span className="shrink-0 font-mono text-xs tabular-nums text-muted">
            0{selectedIndex + 1} / 0{dates.length}
          </span>
        </div>
      </div>
    </section>
  );
}
