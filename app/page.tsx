import type { Metadata } from "next";
import { MissionControl } from "@/components/mission-control";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cloud, DevOps & Platform Engineering",
  description: siteConfig.description,
  alternates: { canonical: "/", languages: { en: "/", fr: "/fr" } },
  openGraph: { title: "Farah Ben Harb · Engineering Portfolio", description: siteConfig.description, url: "/", locale: "en_US", alternateLocale: "fr_FR" },
};

export default function HomePage() {
  return <MissionControl locale="en" />;
}
