import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";
import { caseStudies, projectPath } from "@/lib/project-details";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { fr: siteConfig.url, en: `${siteConfig.url}/en` };

  return [...Object.values(languages).map((url) => ({
    url,
    alternates: { languages },
  })), ...["projects", "profile"].flatMap((page) => {
    const languages = { fr: `${siteConfig.url}/${page}`, en: `${siteConfig.url}/en/${page}` };
    return Object.values(languages).map((url) => ({ url, alternates: { languages } }));
  }), ...caseStudies.flatMap((project) => {
    const languages = { fr: `${siteConfig.url}${projectPath("fr", project.slug)}`, en: `${siteConfig.url}${projectPath("en", project.slug)}` };
    return Object.values(languages).map((url) => ({ url, alternates: { languages } }));
  })];
}
