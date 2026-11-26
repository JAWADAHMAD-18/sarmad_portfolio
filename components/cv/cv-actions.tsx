"use client";

import { ArrowLeft, Download, Printer } from "lucide-react";
import Link from "next/link";

export function CvActions({ pdfUrl }: { pdfUrl?: string | null }) {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="no-print border-b border-line bg-surface py-4">
      <div className="shell flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted hover:text-ink"
        >
          <ArrowLeft className="size-4" />
          <span>Back to website</span>
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex min-h-11 items-center gap-2 bg-accent px-5 text-sm font-medium text-accent-ink transition-colors hover:bg-[color-mix(in_srgb,var(--accent)_86%,black)]"
          >
            <Printer className="size-4" />
            <span>Print / Save as PDF</span>
          </button>
          {pdfUrl ? (
            <a
              href={pdfUrl}
              download
              className="inline-flex min-h-11 items-center gap-2 border border-line bg-surface px-5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <Download className="size-4" />
              <span>Download PDF</span>
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
