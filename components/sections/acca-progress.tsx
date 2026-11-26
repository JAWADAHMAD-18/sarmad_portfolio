import { LedgerRow } from "@/components/ui/ledger-row";
import { SectionHeading } from "@/components/ui/section-heading";

function formatTextOrList(val: string | string[] | null | undefined): string | null {
  if (!val) return null;
  if (Array.isArray(val)) {
    const filtered = val.filter((item) => item.trim().length > 0);
    return filtered.length > 0 ? filtered.join(", ") : null;
  }
  return val.trim().length > 0 ? val.trim() : null;
}

export function AccaProgress({
  level,
  levelNote,
  institute,
  since,
  papersCleared,
  papersInProgress,
  exemptions,
  expectedCompletion,
  membershipNumber,
}: {
  level: string | null;
  levelNote?: string | null;
  institute: string | null;
  since?: string | null;
  papersCleared?: string | string[] | null;
  papersInProgress?: string | string[] | null;
  exemptions?: string | string[] | null;
  expectedCompletion?: string | null;
  membershipNumber?: string | null;
}) {
  if (!level || !institute) return null;

  const clearedStr = formatTextOrList(papersCleared);
  const inProgressStr = formatTextOrList(papersInProgress);
  const exemptionsStr = formatTextOrList(exemptions);

  return (
    <section className="shell py-16 md:py-24" aria-labelledby="acca-heading">
      <SectionHeading
        id="acca-heading"
        eyebrow="Qualification"
        title="ACCA Progress"
        description="Professional accounting qualification preparing for Strategic Professional level under Skans School of Accountancy."
      />

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12 md:mt-12">
        {/* Highlight Card */}
        <div className="flex flex-col justify-between border border-line bg-surface p-7 md:col-span-5 lg:col-span-4">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-muted">
              Current Stage
            </span>
            <p className="mt-3 font-serif text-3xl tracking-tight text-ink">
              {level}
            </p>
            {levelNote ? (
              <p className="mt-1.5 font-mono text-xs text-muted">
                {levelNote}
              </p>
            ) : null}
          </div>

          <div className="mt-8 border-t border-line pt-4">
            <div className="flex items-center justify-between font-mono text-xs text-muted">
              <span>{institute}</span>
              {since ? <span>Since {since}</span> : null}
            </div>
          </div>
        </div>

        {/* Ledger Breakdown */}
        <div className="flex flex-col justify-center border-t border-line md:col-span-7 md:border-t-0 lg:col-span-8">
          <LedgerRow
            label="Qualification Status"
            value={level}
            subvalue={levelNote ?? undefined}
          />
          <LedgerRow
            label="Tuition Provider"
            value={institute}
          />
          {since ? (
            <LedgerRow
              label="Studies Commenced"
              value={`Since ${since}`}
            />
          ) : null}
          {clearedStr ? (
            <LedgerRow
              label="Papers Cleared"
              value={clearedStr}
            />
          ) : null}
          {inProgressStr ? (
            <LedgerRow
              label="Papers in Progress"
              value={inProgressStr}
            />
          ) : null}
          {exemptionsStr ? (
            <LedgerRow
              label="Exemptions"
              value={exemptionsStr}
            />
          ) : null}
          {expectedCompletion ? (
            <LedgerRow
              label="Expected Completion"
              value={expectedCompletion}
            />
          ) : null}
          {membershipNumber ? (
            <LedgerRow
              label="ACCA ID"
              value={membershipNumber}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
