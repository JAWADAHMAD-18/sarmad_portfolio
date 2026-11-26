import { CopyrightYear } from "@/components/layout/copyright-year";
import { chrome } from "@/lib/chrome";
import { getCvAction } from "@/lib/cv";
import { getPublicContent } from "@/lib/getPublicContent";
import Link from "next/link";

export function Footer() {
  const content = getPublicContent();
  const email = content.contact.email.public ? content.contact.email.value : null;
  const linkedin = content.contact.linkedin;
  const cv = getCvAction(content.cv.pdfUrl);

  return (
    <footer className="mt-auto border-t border-line">
      <div className="shell flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md">
          <p className="font-serif text-2xl tracking-tight text-ink">{content.meta.name}</p>
          <p className="mt-2 text-sm text-muted">{content.meta.title}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            {email ? (
              <a
                href={`mailto:${email}`}
                className="inline-flex min-h-11 items-center text-sm text-ink underline-offset-4 hover:text-accent hover:underline"
              >
                {email}
              </a>
            ) : null}
            {linkedin ? (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-sm text-muted underline-offset-4 hover:text-accent hover:underline"
              >
                LinkedIn
              </a>
            ) : null}
          </div>
        </div>
        <nav aria-label="Footer" className="flex flex-col">
          {chrome.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center text-sm text-muted hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          {cv.primary.external ? (
            <a
              href={cv.primary.href}
              className="inline-flex min-h-11 items-center text-sm text-muted hover:text-ink"
            >
              {cv.primary.label}
            </a>
          ) : (
            <Link
              href={cv.primary.href}
              className="inline-flex min-h-11 items-center text-sm text-muted hover:text-ink"
            >
              {cv.primary.label}
            </Link>
          )}
        </nav>
      </div>
      <div className="shell border-t border-line py-4">
        <p className="font-mono text-xs tabular-nums text-muted">
          © <CopyrightYear /> {content.meta.name}
        </p>
      </div>
    </footer>
  );
}
