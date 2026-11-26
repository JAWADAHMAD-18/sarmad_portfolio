const DEFAULT_SITE_URL = "http://localhost:3000";

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_SITE_URL;
  return raw.replace(/\/+$/, "");
}

export function isIndexingAllowed(): boolean {
  return process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
}

export function getRobotsMetadata() {
  if (isIndexingAllowed()) {
    return {
      index: true,
      follow: true,
    };
  }
  return {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  };
}
