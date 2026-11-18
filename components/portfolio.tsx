import Link from "next/link";
import {
  ArrowDown, ArrowDownRight, ArrowUpRight,
  DownloadSimple, EnvelopeSimple, FileText, GithubLogo, LinkedinLogo, MapPin, Phone,
} from "@phosphor-icons/react/dist/ssr";
import { PlatformAtlas } from "@/components/platform-atlas";
import { ProjectCollection } from "@/components/project-collection";
import { TechStack } from "@/components/tech-stack";
import { education, experience, focusAreas, tr, type Locale } from "@/lib/portfolio-copy";
import { siteConfig } from "@/lib/site";

function SectionTitle({ index, label, title }: { index: string; label: string; title: string }) {
  return (
    <div className="section-title">
      <p className="eyebrow"><span>{index} /</span> {label}</p>
      <h2>{title}</h2>
    </div>
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
          <SectionTitle index="01" label={t("Réalisations", "Selected work")} title={t("Mes projets", "My projects")} />
          <ProjectCollection locale={locale} />
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
            <a className="action action-outline" href={`tel:${siteConfig.phone}`} aria-label={`${t("Appeler Farah au", "Call Farah at")} ${siteConfig.phoneDisplay}`}><Phone aria-hidden="true" /> {siteConfig.phoneDisplay}</a>
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
