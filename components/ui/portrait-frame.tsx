"use client";

import Image from "next/image";
import { useState } from "react";

export function PortraitFrame({
  photo,
  priority = false,
  accaLevel,
  accaSince,
  largeLabels = false,
}: {
  photo: { src: string; alt: string } | null | undefined;
  priority?: boolean;
  accaLevel?: string | null;
  accaSince?: string | null;
  largeLabels?: boolean;
}) {
  const [imgError, setImgError] = useState(false);

  const normalizedSrc = photo?.src
    ? photo.src.startsWith("/")
      ? photo.src
      : `/${photo.src}`
    : null;

  const showPhoto = Boolean(normalizedSrc && !imgError);
  const chipText =
    accaLevel && accaSince
      ? `${accaLevel} · Since ${accaSince}`
      : accaLevel || (accaSince ? `Since ${accaSince}` : null);

  return (
    <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px]">
      {/* Subtle accent block behind */}
      <div
        aria-hidden="true"
        className="absolute -bottom-3 -right-3 inset-0 rounded-xl bg-accent/10 dark:bg-accent/15"
      />
      {/* Thin ledger rule offset */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-2.5 -left-2.5 inset-0 rounded-xl border border-line"
      />

      {/* Main Portrait Frame */}
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-line bg-surface">
        {showPhoto && normalizedSrc ? (
          <Image
            src={normalizedSrc}
            alt={photo?.alt || "Portrait of Sarmad Ali"}
            fill
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 380px, 340px"
            className="object-cover object-[50%_15%]"
            priority={priority}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col justify-between p-7 sm:p-8 select-none">
            <div>
              <div className={`flex items-center justify-between font-mono ${largeLabels ? "text-sm" : "text-xs"} uppercase tracking-widest text-muted`}>
                <span>SA</span>
                <span>ACCA</span>
              </div>
              <div className="mt-3 h-px w-full bg-line" />
            </div>
            <div className="my-auto flex flex-col items-center justify-center py-6">
              <span className="font-serif text-8xl tracking-tight text-ink sm:text-9xl">
                SA
              </span>
              <div className="mt-4 w-16">
                <div className="rule" />
                <div className="rule" />
              </div>
            </div>
            <div>
              <div className="mb-3 h-px w-full bg-line" />
              <div className={`flex items-center justify-between font-mono ${largeLabels ? "text-sm" : "text-xs"} uppercase tracking-wider text-muted`}>
                <span>{accaLevel ?? "ACCA"}</span>
                {accaSince ? <span>Since {accaSince}</span> : null}
              </div>
            </div>
          </div>
        )}

        {/* Single floating glass chip on the photo */}
        {showPhoto && chipText ? (
          <div className="absolute bottom-4 left-4 right-4 flex justify-start">
            <div className={`inline-flex items-center gap-2 rounded-lg border border-white/40 bg-surface/82 px-3.5 py-2 font-mono ${largeLabels ? "text-sm" : "text-xs"} text-ink shadow-sm backdrop-blur-md dark:border-white/15 dark:bg-surface/80`}>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              <span>{chipText}</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
