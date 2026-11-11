import type { Metadata } from "next";
import { MissionControl } from "@/components/mission-control";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cloud, DevOps & ingénierie de plateforme",
  description: "Portfolio de Farah Ben Harb : Cloud, DevOps, DevSecOps, Kubernetes, SRE et MLOps, avec réalisations et validations documentées.",
  alternates: { canonical: "/fr", languages: { en: "/", fr: "/fr" } },
  openGraph: { title: "Farah Ben Harb · Portfolio ingénierie", description: siteConfig.description, url: "/fr", locale: "fr_FR", alternateLocale: "en_US" },
};

export default function FrenchHomePage() {
  return <div lang="fr"><MissionControl locale="fr" /></div>;
}
