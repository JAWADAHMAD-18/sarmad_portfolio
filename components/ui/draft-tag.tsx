export function DraftTag({ needsApproval }: { needsApproval?: boolean }) {
  if (
    !needsApproval ||
    (process.env.NODE_ENV !== "development" &&
      process.env.NEXT_PUBLIC_SHOW_DRAFTS !== "true")
  ) {
    return null;
  }

  return (
    <span className="inline-flex items-center border border-accent/25 bg-accent/5 px-1.5 py-0.5 font-mono text-sm leading-none text-muted">
      Draft
    </span>
  );
}
