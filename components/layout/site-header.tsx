"use client";

import { Button } from "@/components/ui/button";
import { chrome } from "@/lib/chrome";
import { Menu, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader({
  name,
  cvHref,
  cvLabel,
  cvIsFile,
}: {
  name: string;
  cvHref: string;
  cvLabel: string;
  cvIsFile: boolean;
}) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [scrolled, setScrolled] = useState(false);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const cvClass =
    "inline-flex min-h-11 items-center text-sm font-medium text-ink underline-offset-4 hover:text-accent hover:underline";

  const cvLink = cvIsFile ? (
    <a href={cvHref} className={cvClass}>
      {cvLabel}
    </a>
  ) : (
    <Link href={cvHref} className={cvClass}>
      {cvLabel}
    </Link>
  );

  const menuCvLink = cvIsFile ? (
    <a href={cvHref} className={cvClass}>
      {cvLabel}
    </a>
  ) : (
    <Link href={cvHref} className={cvClass}>
      {cvLabel}
    </Link>
  );

  return (
    <header
      className={`sticky top-0 z-40 bg-bg/92 backdrop-blur-md motion-safe:transition-[background-color,border-color,box-shadow] motion-safe:duration-200 ${
        scrolled
          ? "border-b border-line shadow-[0_2px_14px_rgba(11,27,46,0.06)] dark:shadow-[0_2px_14px_rgba(0,0,0,0.35)]"
          : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-serif text-xl tracking-tight text-ink">
          {name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {chrome.nav.map((item) => {
            const current = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`relative inline-flex min-h-11 items-center text-sm font-medium motion-safe:transition-colors motion-safe:duration-200 ${
                  current ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                <span>{item.label}</span>
                {current ? (
                  <motion.span
                    layoutId={shouldReduceMotion ? undefined : "header-nav-underline"}
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 380, damping: 32 }
                    }
                    className="absolute inset-x-0 bottom-2 h-[2px] bg-accent"
                    aria-hidden="true"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <div className="hidden lg:flex lg:items-center lg:gap-3">
            {cvLink}
            <Button href="/contact">{chrome.contact}</Button>
          </div>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X aria-hidden="true" strokeWidth={1.5} className="size-5" />
            ) : (
              <Menu aria-hidden="true" strokeWidth={1.5} className="size-5" />
            )}
            <span className="sr-only">{open ? chrome.menuClose : chrome.menuOpen}</span>
          </button>
        </div>
      </div>

      {open ? (
        <div id="site-menu" className="fixed inset-x-0 bottom-0 top-16 z-30 bg-bg lg:hidden">
          <nav aria-label="Mobile" className="shell flex flex-col gap-2 py-6">
            {chrome.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className="inline-flex min-h-11 items-center font-serif text-3xl tracking-tight text-ink"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4">{menuCvLink}</div>
            <div className="mt-2">
              <Button href="/contact">{chrome.contact}</Button>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
