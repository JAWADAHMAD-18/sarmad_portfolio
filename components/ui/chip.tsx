import type { ReactNode } from "react";

export function Chip({
  children,
  level,
  className = "",
}: {
  children: ReactNode;
  level?: string | null;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 border border-line bg-surface px-3 py-1.5 font-mono text-xs text-ink ${className}`}
    >
      <span>{children}</span>
      {level ? (
        <span className="border-l border-line pl-2 text-xs uppercase tracking-wider text-muted">
          {level}
        </span>
      ) : null}
    </span>
  );
}
