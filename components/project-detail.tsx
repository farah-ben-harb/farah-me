import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, GithubLogo, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { TechStack } from "./tech-stack";
import { tr, type Locale } from "@/lib/portfolio-copy";
import { caseStudies, findCaseStudy, projectPath, type CaseStudy } from "@/lib/project-details";
import { siteConfig } from "@/lib/site";

export function caseStudyMetadata(project: CaseStudy, locale: Locale): Metadata {
  const title = `${project.name} | Farah Ben Harb`;
  const description = tr(locale, project.description);
  const url = projectPath(locale, project.slug);
  return {
    title, description,
    alternates: { canonical: url, languages: { fr: projectPath("fr", project.slug), en: projectPath("en", project.slug) } },
    openGraph: { title, description, url, type: "article", locale: locale === "fr" ? "fr_FR" : "en_US", images: [{ url: "/opengraph-image", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}

export function ProjectDetail({ project, locale }: { project: CaseStudy; locale: Locale }) {
  const t = (fr: string, en: string) => tr(locale, [fr, en]);
  const home = locale === "fr" ? "/" : "/en";
  const next = caseStudies[(caseStudies.findIndex((p) => p.slug === project.slug) + 1) % caseStudies.length];
  return (
    <div className="shell" id="top">
      <a className="skip-link" href="#project-content">{t("Aller au contenu", "Skip to content")}</a>
      <header className="site-header detail-header">
        <Link className="wordmark" href={home}><span aria-hidden="true">✳</span> Farah Ben Harb</Link>
        <Link className="text-link back-to-projects" href={`${home}#projects`}><ArrowLeft aria-hidden="true" />{t("Tous les projets", "All projects")}</Link>
        <nav className="language-nav" aria-label={t("Langue", "Language")}>
          <Link aria-current={locale === "fr" ? "page" : undefined} href={projectPath("fr", project.slug)} hrefLang="fr" lang="fr" aria-label="Français">FR</Link>
          <Link aria-current={locale === "en" ? "page" : undefined} href={projectPath("en", project.slug)} hrefLang="en" lang="en" aria-label="English">EN</Link>
        </nav>
      </header>
      <main id="project-content">
        <section className="project-hero" aria-labelledby="project-title">
          <p className="eyebrow"><span className="signal" />{t("Dans les coulisses du projet", "Inside the project")}</p>
          <h1 id="project-title">{project.name}<span>.</span></h1>
          <p className="project-lead">{tr(locale, project.description)}</p>
          <TechStack tools={project.technologies} />
          <div className="actions">
            <a className="action action-primary" href={project.repository}><GithubLogo aria-hidden="true" />{t("Voir le code sur GitHub", "View code on GitHub")}</a>
            {project.liveDemo && <a className="action action-outline demo-link" href={project.liveDemo}>{t("Démo API · Swagger", "API demo · Swagger")}<ArrowUpRight aria-hidden="true" /></a>}
            <a className="text-link" href="#architecture">{t("Explorer l’architecture", "Explore the architecture")}<ArrowRight aria-hidden="true" /></a>
          </div>
        </section>

        <nav className="detail-toc" aria-label={t("Dans cette fiche", "On this page")}>
          <span>{t("Dans cette fiche", "On this page")}</span>
          <a href="#architecture">Architecture</a>
          <a href="#features-title">{t("Réalisations", "Implementation")}</a>
          <a href="#deployment-title">{t("Déploiement", "Deployment")}</a>
          <a href="#validation-title">{t("Tests", "Tests")}</a>
        </nav>

        <div className="project-body">
          <div className="project-narrative">
            <section className="detail-section" id="architecture" aria-labelledby="architecture-title">
              <p className="eyebrow">01 / {t("Conception", "Design")}</p>
              <h2 id="architecture-title">Architecture</h2>
              <p>{tr(locale, project.architecture)}</p>
              <ol className="architecture-flow" aria-label={t("Vue synthétique des composants", "Component overview")}>
                {project.flow.map((step, index) => <li key={step[1]}><span aria-hidden="true">0{index + 1}</span><strong>{tr(locale, step)}</strong></li>)}
              </ol>
              <p className="detail-caption">{t("Vue de lecture simplifiée. Les dépendances et configurations détaillées sont dans le dépôt.", "Simplified component overview. Detailed dependencies and configuration are in the repository.")}</p>
            </section>
            <section className="detail-section" aria-labelledby="features-title">
              <p className="eyebrow">02 / {t("Réalisation", "Implementation")}</p>
              <h2 id="features-title">{t("Ce qui est implémenté", "What is implemented")}</h2>
              <ul className="feature-list">{project.features.map((feature) => <li key={feature[1]}>{tr(locale, feature)}</li>)}</ul>
            </section>
            <section className="detail-section" aria-labelledby="deployment-title">
              <p className="eyebrow">03 / {t("Environnements", "Environments")}</p>
              <h2 id="deployment-title">{t("Exécution & déploiement", "Runtime & deployment")}</h2>
              <p>{tr(locale, project.deployment)}</p>
            </section>
            <section className="detail-section" aria-labelledby="validation-title">
              <p className="eyebrow">04 / {t("Preuves", "Evidence")}</p>
              <h2 id="validation-title">{t("Tests & validations", "Tests & validation")}</h2>
              <p>{tr(locale, project.validation)}</p>
              <div className="actions">
                {project.evidence && <a className="text-link" href={project.evidence}>{t("Exécution de référence", "Reference run")}<ArrowUpRight aria-hidden="true" /></a>}
                <a className="text-link" href={`${project.repository}/actions`}>{t("Consulter GitHub Actions", "Browse GitHub Actions")}<ArrowUpRight aria-hidden="true" /></a>
              </div>
            </section>
            {project.media && <figure className="project-media">
              <div className="project-media-frame"><Image src={project.media.src} alt={t("Visuel du module de dons Alif issu du dépôt", "Alif donation-module artwork from the repository")} fill sizes="(max-width: 900px) 100vw, 750px" /></div>
              <figcaption>{t("Média du dépôt Alif, pas une capture de déploiement en direct.", "Media from the Alif repository, not a live-deployment screenshot.")}</figcaption>
            </figure>}
          </div>
          <aside className="project-sidebar" aria-label={t("Ressources et périmètre", "Resources and scope")}>
            <div className="resource-card">
              <p className="eyebrow">{t("Explorer", "Explore")}</p>
              <h2>{t("Code & démonstration", "Code & demonstration")}</h2>
              <a className="text-link" href={`${project.repository}#readme`}>README<ArrowUpRight aria-hidden="true" /></a>
              <a className="text-link" href={project.repository}><GithubLogo aria-hidden="true" />{t("Dépôt GitHub", "GitHub repository")}</a>
              {project.liveDemo
                ? <a className="text-link demo-link" href={project.liveDemo}>{t("Ouvrir la démo API", "Open the API demo")}<ArrowUpRight aria-hidden="true" /></a>
                : <p className="demo-status">{t("Pas de démonstration publique vérifiée. Le code et sa documentation restent consultables.", "No verified public demo. Source code and documentation are available.")}</p>}
            </div>
            <div className="limits-card">
              <p className="eyebrow">{t("En toute transparence", "Scope & transparency")}</p>
              <h2>{t("Limites actuelles", "Current limitations")}</h2>
              <ul>{project.limits.map((limit) => <li key={limit[1]}>{tr(locale, limit)}</li>)}</ul>
            </div>
            {!!project.related?.length && <div className="resource-card">
              <h2>{t("Projets liés", "Related projects")}</h2>
              {project.related.map((slug) => {
                const related = findCaseStudy(slug);
                return related ? <Link className="text-link" key={slug} href={projectPath(locale, slug)}>{related.name}<ArrowRight aria-hidden="true" /></Link> : null;
              })}
            </div>}
          </aside>
        </div>
        <nav className="project-next" aria-label={t("Navigation entre projets", "Project navigation")}>
          <Link className="text-link" href={`${home}#projects`}><ArrowLeft aria-hidden="true" />{t("Tous les projets", "All projects")}</Link>
          <Link href={projectPath(locale, next.slug)}><span className="eyebrow">{t("Projet suivant", "Next project")}</span><strong>{next.name}</strong><ArrowRight aria-hidden="true" /></Link>
        </nav>
      </main>
      <footer className="footer"><p>© 2026 {siteConfig.name}</p><Link className="text-link" href={`${home}#contact`}>{t("Me contacter", "Get in touch")}<ArrowUpRight aria-hidden="true" /></Link></footer>
    </div>
  );
}
