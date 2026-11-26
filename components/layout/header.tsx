import { getPublicContent } from "@/lib/getPublicContent";
import { SiteHeader } from "./site-header";

export function Header() {
  const content = getPublicContent();
  const pdfUrl = content.cv.pdfUrl;

  return (
    <SiteHeader
      name={content.meta.name}
      cvHref={pdfUrl ?? "/cv"}
      cvLabel={content.hero.ctaPrimary}
      cvIsFile={Boolean(pdfUrl)}
    />
  );
}
