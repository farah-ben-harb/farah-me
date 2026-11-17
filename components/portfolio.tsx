import Link from "next/link";
import {
  ArrowDown, ArrowDownRight, ArrowUpRight, BracketsCurly, CaretDown,
  DownloadSimple, EnvelopeSimple, FileText, GithubLogo, LinkedinLogo, MapPin,
} from "@phosphor-icons/react/dist/ssr";
import { PlatformAtlas } from "@/components/platform-atlas";
import { experience, focusAreas, projectNotes, resumeNotes, tr, type Locale } from "@/lib/portfolio-copy";
import { otherProjects, projects, resumeTracks, type Project } from "@/lib/portfolio-data";
import { siteConfig } from "@/lib/site";

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
  return <a className="text-link" href={href}>{children}<ArrowUpRight aria-hidden="true" /></a>;
}

function SectionTitle({ index, label, title }: { index: string; label: string; title: string }) {
  return (
    <div className="section-title">
      <p className="eyebrow"><span>{index} /</span> {label}</p>
      <h2>{title}</h2>
    </div>
  );
}

function Stack({ tools }: { tools: string[] }) {
  return <ul className="stack">{tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>;
}

function CRMCase({ locale }: { locale: Locale }) {
  const t = (fr: string, en: string) => tr(locale, [fr, en]);
  return (
    <article className="case-study" id={slug(crm)} aria-labelledby="crm-title">
      <div className="case-story">
        <p className="eyebrow case-label"><span className="signal" /> {t("Projet phare · MLOps", "Featured project · MLOps")}</p>
        <h3 id="crm-title">Mini CRM<br className="case-break" /> Intelligence<span>.</span></h3>
        <p className="case-summary">{t(
          "Classer des profils techniques à partir de leurs compétences, puis rendre le chemin de l’entraînement à l’API reproductible et vérifiable.",
          "Classify technical profiles from their skills, with a reproducible and verifiable path from training to a prediction API.",
        )}</p>
        <Stack tools={["FastAPI", "scikit-learn", "MLflow", "Kubeflow", "K3s"]} />
        <div className="actions">
          <a className="action action-primary" href={crm.repository}>
            <GithubLogo aria-hidden="true" /> GitHub
          </a>
          <a className="action action-outline" href={`${crm.repository}/blob/main/docs/ARCHITECTURE.md`}>
            Architecture <ArrowUpRight aria-hidden="true" />
          </a>
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
    ["CV", "#resumes"],
    ["Contact", "#contact"],
  ];
  const localHome = locale === "fr" ? "/" : "/en";
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
              <a className="action action-outline" href="#resumes">{t("Consulter mes CV", "View my resumes")}<FileText aria-hidden="true" /></a>
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
                <h3>{project.name}</h3>
                <p>{tr(locale, projectNotes[slug(project)])}</p>
                <Stack tools={index === 0 ? ["YOLO11", "ByteTrack", "FastAPI", "MLflow"] : ["OpenStack", "Heat", "Ansible", "Kubernetes"]} />
                <div className="card-links">
                  <ProjectLink href={project.repository}>GitHub</ProjectLink>
                  {project.liveDemo && <ProjectLink href={project.liveDemo}>{t("Démo API", "API demo")}</ProjectLink>}
                </div>
              </article>
            ))}
          </div>
          <details className="archive" id="more-projects">
            <summary><span>{t("Voir les autres projets", "Browse more projects")}</span><span className="archive-count">{archive.length + otherProjects.length}</span><CaretDown aria-hidden="true" /></summary>
            <div className="archive-body">
              <h3>{t("Cloud, DevSecOps & applications", "Cloud, DevSecOps & applications")}</h3>
              <ul className="archive-list">
                {archive.map((project) => (
                  <li key={project.repository} id={slug(project)}>
                    <ProjectLink href={project.repository}>{project.name}</ProjectLink>
                    <p>{tr(locale, projectNotes[slug(project)])}</p>
                  </li>
                ))}
              </ul>
              <h3>{t("Autres projets logiciels", "Other software projects")}</h3>
              <ul className="archive-list">
                {otherProjects.map((project) => (
                  <li key={project.repository}>
                    <ProjectLink href={project.repository}>{project.name}</ProjectLink>
                    <p>{project.stack}</p>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </section>

        <section className="section" id="experience">
          <SectionTitle index="02" label={t("Parcours", "Background")} title={t("Expérience & compétences", "Experience & skills")} />
          <div className="background-grid">
            <div className="timeline">
              {experience.map((item) => (
                <article key={item.company}>
                  <p className="eyebrow">{tr(locale, item.period)}</p>
                  <h3>{item.company}</h3>
                  <p className="role">{tr(locale, item.role)}</p>
                  <p>{tr(locale, item.summary)}</p>
                </article>
              ))}
            </div>
            <aside className="toolbox">
              <h3>{t("Compétences techniques", "Technical skills")}</h3>
              <dl>
                {focusAreas.map((area) => (
                  <div key={area.href}>
                    <dt>{tr(locale, area.label)}</dt>
                    <dd>{area.tools}</dd>
                  </div>
                ))}
              </dl>
              <h3>{t("Formation", "Education")}</h3>
              <p>{t(
                "ESIGELEC, Rouen : échange académique en dernière année (2026–2027). ESPRIT, Tunis : cycle ingénieur en architecture IT et cloud (2022–2027).",
                "ESIGELEC, Rouen: final-year exchange (2026–2027). ESPRIT, Tunis: engineering programme in IT architecture and cloud (2022–2027).",
              )}</p>
            </aside>
          </div>
        </section>

        <section className="section" id="resumes">
          <SectionTitle index="03" label={t("Candidature", "Applications")} title={t("Mes CV par spécialité", "Resumes by specialism")} />
          <div className="resume-grid">
            {resumeTracks.map((track) => (
              <article className="resume-card" key={track.slug}>
                <FileText aria-hidden="true" />
                <h3>{track.name}</h3>
                <p>{tr(locale, resumeNotes[track.slug])}</p>
                <ul>
                  {(["fr", "en"] as const).map((language) => {
                    const pdf = `/resumes/farah-ben-harb-${track.slug}-${language}.pdf`;
                    const label = language === "fr" ? "Français" : "English";
                    return (
                      <li key={language}>
                        <span lang={language}>{label}</span>
                        <a className="text-link" href={pdf} hrefLang={language} aria-label={`${t("Ouvrir", "Open")} ${track.name} (${label})`}>PDF <ArrowUpRight aria-hidden="true" /></a>
                        <a className="icon-link" download href={pdf} aria-label={`${t("Télécharger", "Download")} ${track.name} (${label})`}><DownloadSimple aria-hidden="true" /></a>
                      </li>
                    );
                  })}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section contact" id="contact">
          <SectionTitle index="04" label="Contact" title={t("Parlons de votre projet.", "Let’s talk about your project.")} />
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
