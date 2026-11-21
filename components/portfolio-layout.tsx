import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { type Locale, tr } from "@/lib/portfolio-copy";
import { siteConfig } from "@/lib/site";
import "@/app/globals.css";

const plexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: "variable", variable: "--font-body", display: "swap" });

export function portfolioMetadata(locale: Locale): Metadata {
  const description = tr(locale, [
    "Portfolio de Farah Ben Harb : ingénierie cloud, DevOps et MLOps. Projets Kubernetes, GitOps, automatisation d’infrastructure et livraison de modèles.",
    "Farah Ben Harb’s engineering portfolio: Cloud, DevOps and MLOps projects in Kubernetes, GitOps, infrastructure automation and model delivery.",
  ]);
  const canonical = locale === "fr" ? "/" : "/en";

  return {
    metadataBase: new URL(siteConfig.url),
    title: siteConfig.title,
    description,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    keywords: [...siteConfig.keywords],
    alternates: { canonical, languages: { fr: "/", en: "/en", "x-default": "/" } },
    icons: { icon: "/icon.svg" },
    manifest: "/manifest.webmanifest",
    openGraph: {
      type: "website",
      title: siteConfig.title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.title }],
    },
    twitter: { card: "summary_large_image", title: siteConfig.title, description, images: ["/opengraph-image"] },
    formatDetection: { address: false, email: false, telephone: false },
  };
}

export const portfolioViewport: Viewport = { themeColor: "#0e261d", colorScheme: "dark" };

export function PortfolioLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  return (
    <html lang={locale} className={plexSans.variable}>
      <body>{children}</body>
    </html>
  );
}
