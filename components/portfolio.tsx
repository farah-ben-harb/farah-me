import Link from "next/link";
import {
  ArrowDownRight, ArrowUpRight, EnvelopeSimple, FileText,
  GithubLogo, LinkedinLogo, MapPin, Phone,
} from "@phosphor-icons/react/dist/ssr";
import { SiteHeader } from "./site-header";
import { TechStack } from "./tech-stack";
import { experience, tr, type Locale } from "@/lib/portfolio-copy";
import { findCaseStudy, projectPath } from "@/lib/project-details";
import { siteConfig } from "@/lib/site";

type SelectedProject = { slug: string; focus: readonly [string, string]; tools: readonly string[]; companion?: string };
const selectedProjects: readonly SelectedProject[] = [
  { slug: "k8s-cluster-automation", focus: ["Cloud privé & Kubernetes", "Private cloud & Kubernetes"] as const, tools: ["OpenStack", "Heat", "Ansible", "Kubernetes"], companion: "openstack-heat-infrastructure" },
  { slug: "gitops-delivery-platform", focus: ["GitOps", "GitOps"] as const, tools: ["Kubernetes", "Kustomize", "Argo CD"] },
  { slug: "devsecops-incident-platform", focus: ["DevSecOps", "DevSecOps"] as const, tools: ["FastAPI", "PostgreSQL", "Docker"] },
  { slug: "footballmatch-ai-platform-mlops", focus: ["MLOps & IA", "MLOps & AI"] as const, tools: ["FastAPI", "YOLO11", "MLflow"] },
];

export function Portfolio({ locale }: { locale: Locale }) {
  const t = (fr: string, en: string) => tr(locale, [fr, en]);
  const prefix = locale === "fr" ? "" : "/en";
  const cloudResume = `/resumes/farah-ben-harb-cloud-engineering-${locale}.pdf`;
  const resumeLabel = t("Ouvrir mon CV Cloud (PDF, nouvel onglet)", "Open my Cloud resume (PDF, new tab)");
  const devoteam = experience[0];
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Person", name: siteConfig.name,
    url: siteConfig.url, jobTitle: t("Élève-ingénieure Cloud & DevOps", "Cloud & DevOps engineering student"),
    sameAs: [siteConfig.github, siteConfig.linkedin],
  };

  return <div className="shell" id="top">
    <a className="skip-link" href="#content">{t("Aller au contenu", "Skip to content")}</a>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    <SiteHeader locale={locale} current="home" />
    <main id="content">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span className="signal" /> Cloud · DevOps · SRE · MLOps</p>
          <h1 id="hero-title">Cloud & DevOps<span>{t("du code au cluster", "from code to cluster")}<b>.</b></span></h1>
          <p className="hero-intro">{t(
            "Élève-ingénieure en informatique, spécialisée en architecture IT et cloud computing. Je conçois et automatise des plateformes, de l’infrastructure à la livraison applicative.",
            "Computer science engineering student specializing in IT architecture and cloud computing. I design and automate platforms, from infrastructure to application delivery.",
          )}</p>
        </div>
        <aside className="hero-contact" id="contact" aria-labelledby="contact-title">
          <p className="eyebrow"><span className="signal" /> {t("Coordonnées", "Contact details")}</p>
          <h2 id="contact-title">{t("Échangeons.", "Let’s talk.")}</h2>
          <p className="hero-contact-note">{t("Stage de fin d’études · 6 mois dès mars 2027", "Final-year internship · 6 months from March 2027")}</p>
          <div className="hero-contact-links">
            <a href={`mailto:${siteConfig.email}`}><EnvelopeSimple aria-hidden="true" /><span><small>Email</small><strong>{siteConfig.email}</strong></span><ArrowUpRight aria-hidden="true" /></a>
            <a href={`tel:${siteConfig.phone}`} aria-label={`${t("Appeler Farah au", "Call Farah at")} ${siteConfig.phoneDisplay}`}><Phone aria-hidden="true" /><span><small>{t("Téléphone", "Phone")}</small><strong>{siteConfig.phoneDisplay}</strong></span><ArrowUpRight aria-hidden="true" /></a>
          </div>
          <div className="hero-contact-socials">
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer"><LinkedinLogo aria-hidden="true" /> LinkedIn</a>
            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer"><GithubLogo aria-hidden="true" /> GitHub</a>
          </div>
        </aside>
        <div className="hero-actions">
          <div className="actions">
            <Link className="action action-primary" href={`${prefix}/projects`}>{t("Voir mes projets", "Explore projects")}<ArrowUpRight aria-hidden="true" /></Link>
            <div className="hero-secondary-actions">
              <Link className="action action-outline hero-contact-link" href={`${prefix}/profile`}>{t("Mon parcours", "My profile")}<ArrowDownRight aria-hidden="true" /></Link>
              <a className="icon-link resume-link" id="resumes" href={cloudResume} hrefLang={locale} type="application/pdf" target="_blank" rel="noopener noreferrer" aria-label={resumeLabel} title={resumeLabel}><FileText aria-hidden="true" /><span aria-hidden="true">CV</span></a>
            </div>
          </div>
          <p className="hero-location"><MapPin aria-hidden="true" /> Rouen, France</p>
        </div>
      </section>

      <section className="section home-work" id="projects">
        <div className="home-section-heading"><div><p className="eyebrow">01 / {t("Sélection", "Selected work")}</p><h2>{t("Projets à découvrir", "Projects to explore")}</h2></div><Link className="text-link" href={`${prefix}/projects`}>{t("Tous les projets", "All projects")}<ArrowUpRight aria-hidden="true" /></Link></div>
        <ol className="home-project-list">{selectedProjects.map((entry, index) => {
          const project = findCaseStudy(entry.slug)!;
          return <li key={entry.slug}>
            <span className="home-project-number">0{index + 1}</span>
            <div className="home-project-main"><p className="project-focus-label">{tr(locale, entry.focus)}</p><h3><Link href={projectPath(locale, entry.slug)} prefetch={false}>{entry.companion ? t("OpenStack & Kubernetes", "OpenStack & Kubernetes") : project.name}<ArrowUpRight aria-hidden="true" /></Link></h3><p>{tr(locale, project.description)}</p>
              {entry.companion && <Link className="home-companion" href={projectPath(locale, entry.companion)} prefetch={false}>{t("Voir aussi l’infrastructure OpenStack", "See the OpenStack infrastructure too")}<ArrowUpRight aria-hidden="true" /></Link>}
            </div>
            <TechStack tools={entry.tools} />
          </li>;
        })}</ol>
      </section>

      <section className="section home-profile" id="experience">
        <div className="home-section-heading"><div><p className="eyebrow">02 / {t("Parcours", "Background")}</p><h2>{t("Expérience & expertise", "Experience & expertise")}</h2></div><Link className="text-link" href={`${prefix}/profile`}>{t("Voir mon parcours", "View my profile")}<ArrowUpRight aria-hidden="true" /></Link></div>
        <div className="home-profile-grid">
          <div><p className="eyebrow">{tr(locale, devoteam.period)}</p><h3>{devoteam.company}</h3><p className="role">{tr(locale, devoteam.role)}</p><p className="experience-summary">{tr(locale, devoteam.summary)}</p></div>
          <div><p className="eyebrow">{t("Domaines de pratique", "Areas of practice")}</p><p className="home-domain-line">Cloud · Kubernetes · GitOps · DevSecOps · {t("Observabilité", "Observability")} · MLOps</p><TechStack tools={["Azure", "Terraform", "Kubernetes", "Argo CD", "Dynatrace"]} /></div>
        </div>
      </section>
    </main>
    <footer className="footer"><p>© 2026 Farah Ben Harb</p><Link className="text-link" href={`${prefix}/profile`}>{t("Formation & certifications", "Education & credentials")}<ArrowUpRight aria-hidden="true" /></Link></footer>
  </div>;
}
