import { Button } from "@/components/ui/button";
import { chrome } from "@/lib/chrome";

export default function NotFound() {
  return (
    <div className="shell section-space">
      <div className="max-w-xl">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">
          404 · Not Found
        </p>
        <h1 className="mt-3 font-serif text-[clamp(2.75rem,6vw,4.5rem)] leading-none tracking-tight text-ink">
          {chrome.notFoundTitle}
        </h1>
        <div className="my-6 max-w-[120px]">
          <div className="rule" />
          <div className="rule" />
        </div>
        <p className="text-base leading-relaxed text-muted">
          The page you requested could not be found or is currently unavailable.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/">{chrome.nav[0].label}</Button>
          <Button href="/contact" variant="secondary">
            {chrome.contact}
          </Button>
        </div>
      </div>
    </div>
  );
}
