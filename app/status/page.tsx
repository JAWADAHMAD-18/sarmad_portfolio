import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStatusReport } from "@/lib/status";

export const metadata: Metadata = {
  title: "Content Status (Dev Only)",
  robots: { index: false, follow: false },
};

export default function StatusPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  const report = getStatusReport();

  return (
    <div className="shell py-12 md:py-16">
      <div className="flex items-center justify-between border-b border-line pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-amber-600 dark:text-amber-400">
            Internal Dev View · Disabled in Production
          </span>
          <h1 className="mt-2 font-serif text-3xl tracking-tight text-ink sm:text-4xl">
            Content Status & Visibility
          </h1>
        </div>
        <Link
          href="/"
          className="font-mono text-xs text-muted underline-offset-4 hover:text-ink hover:underline"
        >
          ← Back to site
        </Link>
      </div>

      {/* Summary Counters */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="border border-line bg-surface p-4">
          <span className="font-mono text-xs text-muted">Sections ON</span>
          <p className="mt-1 font-mono text-2xl font-bold text-accent">{report.sectionsOn}</p>
        </div>
        <div className="border border-line bg-surface p-4">
          <span className="font-mono text-xs text-muted">Sections OFF</span>
          <p className="mt-1 font-mono text-2xl font-bold text-muted">{report.sectionsOff}</p>
        </div>
        <div className="border border-line bg-surface p-4">
          <span className="font-mono text-xs text-muted">Null Fields</span>
          <p className="mt-1 font-mono text-2xl font-bold text-ink">{report.nullFields.length}</p>
        </div>
        <div className="border border-line bg-surface p-4">
          <span className="font-mono text-xs text-muted">Needs Approval</span>
          <p className="mt-1 font-mono text-2xl font-bold text-ink">{report.drafts.length}</p>
        </div>
      </div>

      {/* Sections Table */}
      <section className="mt-12" aria-labelledby="status-sections-heading">
        <h2 id="status-sections-heading" className="font-mono text-xs uppercase tracking-widest text-muted">
          Sections Visibility
        </h2>
        <div className="mt-4 overflow-x-auto border border-line bg-surface">
          <table className="w-full text-left font-mono text-xs">
            <thead className="border-b border-line bg-bg">
              <tr>
                <th className="p-3 font-semibold text-ink">Section</th>
                <th className="p-3 font-semibold text-ink">State</th>
                <th className="p-3 font-semibold text-ink">Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {report.sections.map((sec) => (
                <tr key={sec.id}>
                  <td className="p-3 font-medium text-ink">{sec.id}</td>
                  <td className="p-3">
                    <span
                      className={`inline-block px-2 py-0.5 text-[11px] font-semibold ${
                        sec.state === "ON"
                          ? "bg-accent/10 text-accent"
                          : "bg-muted/10 text-muted"
                      }`}
                    >
                      {sec.state}
                    </span>
                  </td>
                  <td className="p-3 text-muted">{sec.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Null Fields List */}
      <section className="mt-12" aria-labelledby="status-nulls-heading">
        <h2 id="status-nulls-heading" className="font-mono text-xs uppercase tracking-widest text-muted">
          Missing / Null Fields ({report.nullFields.length})
        </h2>
        <p className="mt-1 text-xs text-muted">
          These fields are omitted from display until confirmed by Sarmad.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {report.nullFields.map((field) => (
            <div
              key={field}
              className="border border-line bg-surface px-3 py-2 font-mono text-xs text-muted"
            >
              {field}
            </div>
          ))}
        </div>
      </section>

      {/* Needs Approval */}
      {report.drafts.length > 0 ? (
        <section className="mt-12" aria-labelledby="status-drafts-heading">
          <h2 id="status-drafts-heading" className="font-mono text-xs uppercase tracking-widest text-muted">
            Developer Drafts Pending Approval ({report.drafts.length})
          </h2>
          <div className="mt-4 space-y-2">
            {report.drafts.map((draft) => (
              <div
                key={draft}
                className="border border-line bg-surface px-3 py-2 font-mono text-xs text-amber-600 dark:text-amber-400"
              >
                {draft}
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
