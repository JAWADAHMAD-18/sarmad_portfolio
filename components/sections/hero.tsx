import { Button } from "@/components/ui/button";
import { PortraitFrame } from "@/components/ui/portrait-frame";
import { splitHeadline } from "@/lib/headline";

export function Hero({
  headline: rawHeadline,
  subheadline,
  ctaPrimary,
  ctaSecondary,
  cvHref,
  cvIsFile,
  availability,
  photo,
  accaLevel,
  accaSince,
}: {
  headline: string;
  subheadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
  cvHref: string;
  cvIsFile: boolean;
  availability?: string | null;
  photo?: { src: string; alt: string } | null;
  accaLevel?: string | null;
  accaSince?: string | null;
}) {
  const headline = splitHeadline(rawHeadline);

  return (
    <section
      className="shell pt-10 pb-14 md:pt-14 md:pb-20 lg:pt-16 lg:pb-24"
      aria-label="Introduction"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
        {/* Left Column: Copy & Actions */}
        <div className="flex flex-col justify-center lg:col-span-7">
          {availability ? (
            <div className="mb-6 inline-flex items-center gap-2.5">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              <span className="font-mono text-xs tracking-wide text-muted">
                {availability}
              </span>
            </div>
          ) : null}

          <h1 className="font-serif text-[clamp(2.85rem,5.5vw,5.25rem)] leading-[0.95] tracking-tight text-ink">
            {headline.title}
          </h1>

          {headline.subtitle ? (
            <p className="mt-3 font-serif text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.15] tracking-tight text-ink">
              {headline.subtitle}
            </p>
          ) : null}

          <div className="my-6">
            <div className="rule max-w-[120px]" />
            <div className="rule max-w-[120px]" />
          </div>

          <p className="max-w-[56ch] text-[1.0625rem] leading-relaxed text-muted md:text-lg">
            {subheadline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4">
            <Button href={cvHref} external={cvIsFile}>
              {ctaPrimary}
            </Button>
            <Button href="/contact" variant="secondary">
              {ctaSecondary}
            </Button>
          </div>
        </div>

        {/* Right Column: Portrait Frame */}
        <div className="flex justify-center lg:col-span-5 lg:justify-end">
          <PortraitFrame
            photo={photo}
            priority
            accaLevel={accaLevel}
            accaSince={accaSince}
          />
        </div>
      </div>
    </section>
  );
}
