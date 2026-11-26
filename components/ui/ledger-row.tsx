import type { ReactNode } from "react";

export function LedgerRow({
  label,
  value,
  subvalue,
  children,
  className = "",
}: {
  label: ReactNode;
  value?: ReactNode;
  subvalue?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-1 border-b border-line py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 ${className}`}
    >
      <div className="text-sm font-medium text-ink">{label}</div>
      <div className="font-mono text-xs text-muted tabular-nums sm:text-right sm:text-sm">
        {value ? <span className="text-ink">{value}</span> : null}
        {subvalue ? <span className="block text-xs text-muted">{subvalue}</span> : null}
        {children}
      </div>
    </div>
  );
}
