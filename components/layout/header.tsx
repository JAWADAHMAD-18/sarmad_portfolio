import { getCvAction } from "@/lib/cv";
import { getPublicContent } from "@/lib/getPublicContent";
import { SiteHeader } from "./site-header";

export function Header() {
  const content = getPublicContent();
  const cv = getCvAction(content.cv.pdfUrl);

  return (
    <SiteHeader
      name={content.meta.name}
      cvHref={cv.primary.href}
      cvLabel={cv.primary.label}
      cvIsFile={cv.primary.external}
    />
  );
}
