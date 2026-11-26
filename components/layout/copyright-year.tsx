"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export function CopyrightYear() {
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const year = isClient ? new Date().getFullYear() : 2026;
  return <span className="tabular-nums">{year}</span>;
}
