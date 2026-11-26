import Link from "next/link";
import { getStatusReport } from "@/lib/status";

export function DevBadge() {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  const report = getStatusReport();

  return (
    <aside aria-label="Development status" className="fixed bottom-4 right-4 z-50">
      <Link
        href="/status"
        className="flex items-center gap-2 border border-line bg-surface/95 px-3 py-1.5 font-mono text-xs text-muted shadow-md backdrop-blur transition-colors hover:border-accent hover:text-ink"
      >
        <span className="inline-block h-2 w-2 rounded-full bg-amber-500" aria-hidden="true" />
        <span>
          {report.sectionsOff} sections hidden · {report.nullFields.length} fields missing · {report.drafts.length} drafts
        </span>
      </Link>
    </aside>
  );
}
