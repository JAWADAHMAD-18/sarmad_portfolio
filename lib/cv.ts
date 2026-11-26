export type CvLink = {
  label: string;
  href: string;
  external: boolean;
};

export function getCvAction(pdfUrl: string | null | undefined): {
  primary: CvLink;
  secondary: CvLink | null;
} {
  if (pdfUrl && pdfUrl.trim().length > 0) {
    return {
      primary: { label: "Download CV", href: pdfUrl, external: true },
      secondary: { label: "View CV", href: "/cv", external: false },
    };
  }

  return {
    primary: { label: "View CV", href: "/cv", external: false },
    secondary: null,
  };
}
