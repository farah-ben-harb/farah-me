import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { SiteHeader } from "./site-header";
import { ProjectCollection } from "./project-collection";
import { tr, type Locale } from "@/lib/portfolio-copy";

export function ProjectsPage({ locale }: { locale: Locale }) {
  const t = (fr: string, en: string) => tr(locale, [fr, en]);
  return <div className="shell" id="top">
    <a className="skip-link" href="#content">{t("Aller au contenu", "Skip to content")}</a>
    <SiteHeader locale={locale} current="projects" />
    <main id="content">
      <header className="page-intro"><p className="eyebrow">{t("Réalisations", "Work")}</p><h1>{t("Projets", "Projects")}</h1>
        <p>{t("Des plateformes cloud aux applications IA. Choisissez un domaine, puis ouvrez une fiche pour l’architecture et les preuves techniques.", "From cloud platforms to AI applications. Choose a domain, then open a case study for architecture and technical evidence.")}</p>
      </header>
      <ProjectCollection locale={locale} />
    </main>
    <footer className="footer"><p>© 2026 Farah Ben Harb</p><Link className="text-link" href={locale === "fr" ? "/" : "/en"}>{t("Retour à l’accueil", "Back to home")}<ArrowUpRight aria-hidden="true" /></Link></footer>
  </div>;
}
