import Link from "next/link";
import {
  ArrowDown, ArrowDownRight, ArrowUpRight, BracketsCurly, CaretDown,
  DownloadSimple, EnvelopeSimple, FileText, GithubLogo, LinkedinLogo, MapPin,
} from "@phosphor-icons/react/dist/ssr";
import { PlatformAtlas } from "@/components/platform-atlas";
import { TechStack } from "@/components/tech-stack";
import { education, experience, focusAreas, projectNotes, tr, type Locale } from "@/lib/portfolio-copy";
import { otherProjects, projects, type Project } from "@/lib/portfolio-data";
import { siteConfig } from "@/lib/site";
import { findCaseStudy, projectPath } from "@/lib/project-details";

const slug = (project: Project) => project.repository.split("/").at(-1)!;
const crm = projects.find((project) => slug(project) === "crm-intelligence-mlops")!;
const supporting = ["footballmatch-ai-platform-mlops", "k8s-cluster-automation"].map(
  (name) => projects.find((project) => slug(project) === name)!,
);
const archive = projects.filter((project) => project !== crm && !supporting.includes(project));
const crmRun = `${crm.repository}/actions/runs/43736282419`;
const flow = [
  {
    title: ["Données", "Data"],
    tool: ["Profils synthétiques", "Synthetic profiles"],
    detail: ["Trois catégories : Backend, DevOps et MLOps.", "Three classes: Backend, DevOps and MLOps."],
  },
  {
    title: ["Entraînement", "Training"],
    tool: ["TF-IDF · scikit-learn", "TF-IDF · scikit-learn"],
    detail: ["TF-IDF transforme les compétences en vecteurs ; une régression logistique classe les profils.", "TF-IDF turns skills into feature vectors; logistic regression classifies the profiles."],
  },
  {
    title: ["Validation", "Validation"],
    tool: ["Kubeflow Pipelines", "Kubeflow Pipelines"],
    detail: ["Un seuil de qualité sur le score F1 macro bloque l’enregistrement d’un candidat qui ne le franchit pas.", "A macro F1 quality gate prevents a failing candidate from being registered."],
  },
  {
    title: ["Modèle candidat", "Candidate model"],
    tool: ["MLflow Registry", "MLflow Registry"],
    detail: ["Les artefacts du pipeline sont importés dans MLflow ; la version validée reçoit l’alias candidate.", "Pipeline artifacts are imported into MLflow; the validated version receives the candidate alias."],
  },
  {
    title: ["API de prédiction", "Prediction API"],
    tool: ["FastAPI", "FastAPI"],
    detail: ["FastAPI expose les prédictions. Le passage d’un candidat au canary EC2 se fait séparément.", "FastAPI exposes predictions. Promoting a candidate to the EC2 canary is a separate step."],
  },
] as const;

function ProjectLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link className="text-link" href={href}>{children}<ArrowUpRight aria-hidden="true" /></Link>;
}

function SectionTitle({ index, label, title }: { index: string; label: string; title: string }) {
  return (
    <div className="section-title">
      <p className="eyebrow"><span>{index} /</span> {label}</p>
      <h2>{title}</h2>
    </div>
  );
}

function CRMCase({ locale }: { locale: Locale }) {
  const t = (fr: string, en: string) => tr(locale, [fr, en]);
  return (
    <article className="case-study" id={slug(crm)} aria-labelledby="crm-title">
      <div className="case-story">
        <p className="eyebrow case-label"><span className="signal" /> {t("Projet phare · MLOps", "Featured project · MLOps")}</p>
        <h3 id="crm-title"><Link href={projectPath(locale, slug(crm))}>Mini CRM<br className="case-break" /> Intelligence<span>.</span></Link></h3>
        <p className="case-summary">{t(
          "Classer des profils techniques à partir de leurs compétences, puis rendre le chemin de l’entraînement à l’API reproductible et vérifiable.",
          "Classify technical profiles from their skills, with a reproducible and verifiable path from training to a prediction API.",
        )}</p>
        <TechStack tools={["FastAPI", "scikit-learn", "MLflow", "Kubeflow", "K3s"]} />
        <div className="actions">
          <Link className="action action-primary project-details-link" href={projectPath(locale, slug(crm))}>
            {t("Découvrir le projet", "Explore the project")} <ArrowUpRight aria-hidden="true" />
          </Link>
          <a className="action action-outline" href={crm.repository}><GithubLogo aria-hidden="true" /> GitHub</a>
        </div>
      </div>
      <div className="case-flow">
        <p className="eyebrow"><BracketsCurly aria-hidden="true" /> {t("Explorer le pipeline", "Explore the pipeline")}</p>
        <ol className="flow-steps">
          {flow.map((step, index) => (
            <li key={step.title[1]}>
              <details name="crm-pipeline">
                <summary>
                  <span className="step-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <span className="step-label">
                    <strong>{tr(locale, step.title)}</strong>
                    <small>{tr(locale, step.tool)}</small>
                  </span>
                  <CaretDown aria-hidden="true" />
                </summary>
                <p>{tr(locale, step.detail)}</p>
              </details>
            </li>
          ))}
        </ol>
        <ProjectLink href={crmRun}>{t("Voir l’exécution CI", "View the CI run")}</ProjectLink>
      </div>
      <div className="case-notes">
        <div>
          <h4>{t("Ce qui a été validé", "What was validated")}</h4>
          <p>{t(
            "Pipeline Kubeflow sur K3s, enregistrement d’un modèle candidat dans MLflow et parcours canary EC2 documenté. La mise en service d’un candidat est une étape séparée, non automatique. La CI couvre les tests, les scans et la construction de l’image.",
            "Kubeflow pipeline on K3s, candidate registration in MLflow and a documented EC2 canary. Serving a candidate is a separate, manual step. CI covers tests, security scans and the image build.",
          )}</p>
        </div>
        <div>
          <h4>{t("Périmètre", "Scope")}</h4>
          <p>{t(
            "Démonstrateur sur 30 profils synthétiques, pas une mesure de performance sur données réelles. Le canary ne constitue pas une mise en production ; aucune démo publique n’est annoncée.",
            "A demonstration on 30 synthetic profiles, not a real-world benchmark. A canary is not production; no public live demo is claimed.",
          )}</p>
        </div>
      </div>
    </article>
  );
}

export function Portfolio({ locale }: { locale: Locale }) {
  const t = (fr: string, en: string) => tr(locale, [fr, en]);
  const sections = [
    [t("Projets", "Work"), "#projects"],
    [t("Expérience", "Experience"), "#experience"],
    [t("Formation", "Education"), "#education"],
    [t("Compétences", "Skills"), "#skills"],
    ["CV", "#resumes"],
    ["Contact", "#contact"],
  ];
  const localHome = locale === "fr" ? "/" : "/en";
  const cloudResume = `/resumes/farah-ben-harb-cloud-engineering-${locale}.pdf`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: t("Élève-ingénieure Cloud & DevOps", "Cloud & DevOps engineering student"),
    sameAs: [siteConfig.github, siteConfig.linkedin],
  };

  return (
    <div className="shell" id="top">
      <a className="skip-link" href="#content">{t("Aller au contenu", "Skip to content")}</a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <header className="site-header">
        <Link className="wordmark" href={localHome}><span aria-hidden="true">✳</span> Farah Ben Harb</Link>
        <nav className="nav-links" aria-label={t("Navigation principale", "Main navigation")}>
          {sections.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <nav className="language-nav" aria-label={t("Langue", "Language")}>
          <Link aria-current={locale === "fr" ? "page" : undefined} aria-label="Français" href="/" hrefLang="fr" lang="fr">FR</Link>
          <Link aria-current={locale === "en" ? "page" : undefined} aria-label="English" href="/en" hrefLang="en" lang="en">EN</Link>
        </nav>
      </header>

      <main id="content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="signal" /> Cloud · DevOps · MLOps</p>
            <h1 id="hero-title">
              {t("Ingénierie Cloud", "Cloud engineering")}
              <span>& {t("plateformes IA", "AI platforms")}<b>.</b></span>
            </h1>
            <p className="hero-intro">{t(
              "Je suis Farah Ben Harb, élève-ingénieure. J’automatise l’infrastructure et la livraison de services, des clusters Kubernetes aux pipelines de modèles.",
              "I’m Farah Ben Harb, an engineering student. I automate infrastructure and service delivery, from Kubernetes clusters to model pipelines.",
            )}</p>
            <div className="actions">
              <a className="action action-primary" href="#projects">{t("Explorer les projets", "Explore projects")}<ArrowDownRight aria-hidden="true" /></a>
              <a className="action action-outline" href="#resumes">{t("Consulter mon CV", "View my resume")}<FileText aria-hidden="true" /></a>
            </div>
            <p className="hero-location"><MapPin aria-hidden="true" /> {t("Rouen, France · Stage de fin d’études dès mars 2027", "Rouen, France · Available for a final-year internship from March 2027")}</p>
          </div>
          <PlatformAtlas locale={locale} />
        </section>

        <section className="section" id="projects">
          <SectionTitle index="01" label={t("Réalisations", "Selected work")} title={t("Projets à découvrir", "Projects to explore")} />
          <CRMCase locale={locale} />
          <div className="supporting-grid">
            {supporting.map((project, index) => (
              <article className="support-card" key={project.repository} id={slug(project)}>
                <p className="eyebrow"><span>0{index + 2} /</span> {index === 0 ? t("Vision par ordinateur", "Computer vision") : t("Infrastructure", "Infrastructure")}</p>
                <h3><Link href={projectPath(locale, slug(project))}>{project.name}</Link></h3>
                <p>{tr(locale, projectNotes[slug(project)])}</p>
                <TechStack tools={index === 0 ? ["YOLO11", "ByteTrack", "FastAPI", "MLflow"] : ["OpenStack", "Heat", "Ansible", "Kubernetes"]} />
                <div className="card-links">
                  <Link className="text-link project-details-link" href={projectPath(locale, slug(project))}>{t("Découvrir le projet", "Explore the project")}<ArrowUpRight aria-hidden="true" /></Link>
                  <ProjectLink href={project.repository}>GitHub</ProjectLink>
                  {project.liveDemo && <ProjectLink href={project.liveDemo}>{t("Démo API", "API demo")}</ProjectLink>}
                </div>
              </article>
            ))}
          </div>
          <div className="archive" id="more-projects">
            <p className="archive-heading">{t("Explorer aussi", "More to explore")}<span className="archive-count">{archive.length + otherProjects.length}</span></p>
            <div className="archive-body">
              <h3>{t("Cloud, DevSecOps & applications", "Cloud, DevSecOps & applications")}</h3>
              <ul className="archive-list">
                {archive.map((project) => (
                  <li key={project.repository} id={slug(project)}>
                    <ProjectLink href={projectPath(locale, slug(project))}>{project.name}</ProjectLink>
                    <p>{tr(locale, projectNotes[slug(project)])}</p>
                    <TechStack tools={(findCaseStudy(slug(project))?.technologies ?? project.technologies).slice(0, 5)} />
                  </li>
                ))}
              </ul>
              <h3>{t("Autres projets logiciels", "Other software projects")}</h3>
              <ul className="archive-list">
                {otherProjects.map((project) => (
                  <li key={project.repository}>
                    <ProjectLink href={projectPath(locale, project.repository.split("/").at(-1)!)}>{project.name}</ProjectLink>
                    <p>{tr(locale, findCaseStudy(project.repository.split("/").at(-1)!)!.description)}</p>
                    <TechStack tools={project.stack.split(" · ")} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section" id="experience">
          <SectionTitle index="02" label={t("Parcours professionnel", "Professional background")} title={t("Expérience", "Experience")} />
          <div className="timeline experience-list">
            {experience.map((item) => (
              <article key={item.company}>
                <p className="eyebrow">{tr(locale, item.period)}</p>
                <h3>{item.company}</h3>
                <p className="role">{tr(locale, item.role)}</p>
                <p className="experience-summary">{tr(locale, item.summary)}</p>
                <TechStack tools={item.tools} />
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="education">
          <SectionTitle index="03" label={t("Parcours académique", "Academic path")} title={t("Formation", "Education")} />
          <div className="education-grid">
            {education.map((item) => (
              <article className="education-card" key={`${item.school}-${item.period[0]}`}>
                <p className="eyebrow">{tr(locale, item.period)}</p>
                <h3>{tr(locale, item.title)}</h3>
                <p className="education-school">{item.school}</p>
                <p className="education-detail">{tr(locale, item.detail)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="skills">
          <SectionTitle index="04" label={t("Outils & pratiques", "Tools & practices")} title={t("Compétences", "Skills")} />
          <div className="skills-grid">
            {focusAreas.map((area) => (
              <article className="skills-card" key={area.href}>
                <h3>{tr(locale, area.label)}</h3>
                <TechStack tools={area.tools} />
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="resumes">
          <SectionTitle index="05" label={t("Candidature", "Applications")} title={t("CV Cloud Engineering", "Cloud Engineering Resume")} />
          <div className="resume-card">
            <div className="resume-info">
              <FileText aria-hidden="true" />
              <div>
                <p className="eyebrow">{t("Français", "English")} · PDF</p>
                <p>{t("Plateformes cloud, infrastructure as code et livraison sécurisée.", "Cloud platforms, infrastructure as code and secure delivery.")}</p>
              </div>
            </div>
            <div className="actions">
              <a className="action action-outline" href={cloudResume} hrefLang={locale}>
                {t("Ouvrir le PDF", "Open PDF")} <ArrowUpRight aria-hidden="true" />
              </a>
              <a className="action action-primary" download href={cloudResume} hrefLang={locale}>
                {t("Télécharger", "Download")} <DownloadSimple aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section className="section contact" id="contact">
          <SectionTitle index="06" label="Contact" title={t("Parlons de votre projet.", "Let’s talk about your project.")} />
          <p>{t(
            "Je recherche un stage de fin d’études de six mois à partir de mars 2027, en Cloud, DevOps, SRE ou MLOps.",
            "I’m looking for a six-month final-year internship from March 2027 in Cloud, DevOps, SRE or MLOps.",
          )}</p>
          <div className="actions">
            <a className="action action-primary" href={`mailto:${siteConfig.email}`}><EnvelopeSimple aria-hidden="true" /> {t("M’écrire", "Email me")}</a>
            <a className="icon-link social-link" aria-label="GitHub" href={siteConfig.github}><GithubLogo aria-hidden="true" /></a>
            <a className="icon-link social-link" aria-label="LinkedIn" href={siteConfig.linkedin}><LinkedinLogo aria-hidden="true" /></a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 Farah Ben Harb</p>
        <a className="text-link" href="#top">{t("Retour en haut", "Back to top")} <ArrowDown className="up-arrow" aria-hidden="true" /></a>
      </footer>
    </div>
  );
}
