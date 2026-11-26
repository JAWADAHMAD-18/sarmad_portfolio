import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary";

const styles: Record<Variant, string> = {
  primary:
    "relative inline-flex min-h-11 items-center justify-center bg-accent px-5 text-[0.9375rem] font-medium text-accent-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] motion-safe:transition-all motion-safe:duration-200 hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--accent)_88%,black)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_6px_16px_-4px_color-mix(in_srgb,var(--accent)_35%,transparent)]",
  secondary:
    "relative inline-flex min-h-11 items-center justify-center overflow-hidden border border-line bg-surface px-5 text-[0.9375rem] font-medium text-ink before:pointer-events-none before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-accent/10 motion-safe:transition-all motion-safe:duration-200 motion-safe:before:transition-transform motion-safe:before:duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:before:scale-x-100",
};

export function Button({
  href,
  variant = "primary",
  children,
  external = false,
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  external?: boolean;
}) {
  const className = styles[variant];
  if (external) {
    return (
      <a href={href} className={className}>
        <span className="relative z-10">{children}</span>
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      <span className="relative z-10">{children}</span>
    </Link>
  );
}
