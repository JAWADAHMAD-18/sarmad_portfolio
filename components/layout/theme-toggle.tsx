"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const order = ["system", "light", "dark"] as const;

const labels = {
  system: "System theme",
  light: "Light theme",
  dark: "Dark theme",
} as const;

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const current = mounted && theme && theme in labels ? theme : "system";
  const Icon = current === "light" ? Sun : current === "dark" ? Moon : Monitor;
  const next = order[(order.indexOf(current as (typeof order)[number]) + 1) % order.length];

  return (
    <button
      type="button"
      className="inline-flex size-11 items-center justify-center text-ink"
      aria-label={`${labels[current as keyof typeof labels]}. Switch to ${labels[next]}.`}
      onClick={() => setTheme(next)}
    >
      <Icon aria-hidden="true" strokeWidth={1.5} className="size-5" />
    </button>
  );
}
