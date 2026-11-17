import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { fr: siteConfig.url, en: `${siteConfig.url}/en` };

  return Object.values(languages).map((url) => ({
    url,
    alternates: { languages },
  }));
}
