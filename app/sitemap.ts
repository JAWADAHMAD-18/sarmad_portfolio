import type { MetadataRoute } from "next";
import { getPublicContent } from "@/lib/getPublicContent";
import { getSiteUrl } from "@/lib/seo";
import { isSectionOn } from "@/lib/visibility";

export default function sitemap(): MetadataRoute.Sitemap {
  const content = getPublicContent();
  const siteUrl = getSiteUrl();
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  if (isSectionOn("about", content)) {
    routes.push({
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  if (
    isSectionOn("experience", content) ||
    isSectionOn("education", content) ||
    isSectionOn("acca", content)
  ) {
    routes.push({
      url: `${siteUrl}/experience`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  if (isSectionOn("contact", content)) {
    routes.push({
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return routes;
}
