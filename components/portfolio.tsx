import Link from "next/link";
import {
  ArrowDown, ArrowDownRight, ArrowUpRight,
  EnvelopeSimple, FileText, GithubLogo, LinkedinLogo, MapPin, Phone,
} from "@phosphor-icons/react/dist/ssr";
import { ProjectCollection } from "@/components/project-collection";
import { Credentials } from "@/components/credentials";
import { TechStack } from "@/components/tech-stack";
import { education, experience, tr, type Locale } from "@/lib/portfolio-copy";
import { skillGroups, skillLabel } from "@/lib/skills";
import { findCaseStudy, projectPath } from "@/lib/project-details";
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
    [t("Compétences", "Skills"), "#skills"],
    [t("Formation", "Education"), "#education"],
    [t("Certifications", "Credentials"), "#certifications"],
    ["Contact", "#contact"],
  ];
  const localHome = locale === "fr" ? "/" : "/en";
  const cloudResume = `/resumes/farah-ben-harb-cloud-engineering-${locale}.pdf`;
  const resumeLabel = t("Ouvrir mon CV Cloud (PDF, nouvel onglet)", "Open my Cloud resume (PDF, new tab)");
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
              "Élève-ingénieure en informatique, spécialisée en architecture IT et cloud computing. Mes projets relient OpenStack, Kubernetes, CI/CD et MLOps.",
              "Computer science engineering student specializing in IT architecture and cloud computing. My projects connect OpenStack, Kubernetes, CI/CD and MLOps.",
            )}</p>
          </div>
          <aside className="hero-contact" id="contact" aria-labelledby="contact-title">
            <p className="eyebrow"><span className="signal" /> {t("Coordonnées", "Contact details")}</p>
            <h2 id="contact-title">{t("Échangeons.", "Let’s talk.")}</h2>
            <p className="hero-contact-note">{t("Stage de fin d’études · 6 mois dès mars 2027", "Final-year internship · 6 months from March 2027")}</p>
            <div className="hero-contact-links">
              <a href={`mailto:${siteConfig.email}`}>
                <EnvelopeSimple aria-hidden="true" />
                <span><small>Email</small><strong>{siteConfig.email}</strong></span>
                <ArrowUpRight aria-hidden="true" />
              </a>
              <a href={`tel:${siteConfig.phone}`} aria-label={`${t("Appeler Farah au", "Call Farah at")} ${siteConfig.phoneDisplay}`}>
                <Phone aria-hidden="true" />
                <span><small>{t("Téléphone", "Phone")}</small><strong>{siteConfig.phoneDisplay}</strong></span>
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
            <div className="hero-contact-socials">
              <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer"><LinkedinLogo aria-hidden="true" /> LinkedIn</a>
              <a href={siteConfig.github} target="_blank" rel="noopener noreferrer"><GithubLogo aria-hidden="true" /> GitHub</a>
            </div>
          </aside>
          <div className="hero-actions">
            <div className="actions">
              <a className="action action-primary" href="#projects">{t("Explorer les projets", "Explore projects")}<ArrowDownRight aria-hidden="true" /></a>
              <div className="hero-secondary-actions">
                <a className="action action-outline hero-contact-link" href="#contact">{t("Me contacter", "Get in touch")}<EnvelopeSimple aria-hidden="true" /></a>
                <a className="icon-link resume-link" id="resumes" href={cloudResume} hrefLang={locale} type="application/pdf" target="_blank" rel="noopener noreferrer" aria-label={resumeLabel} title={resumeLabel}>
                  <FileText aria-hidden="true" /><span aria-hidden="true">CV</span>
                </a>
              </div>
            </div>
            <p className="hero-location"><MapPin aria-hidden="true" /> Rouen, France</p>
          </div>
        </section>

        <section className="section" id="projects">
          <SectionTitle index="01" label={t("Réalisations", "Selected work")} title={t("Projets", "Projects")} />
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

        <section className="section" id="skills">
          <SectionTitle index="03" label={t("Outils & pratiques", "Tools & practices")} title={t("Compétences", "Skills")} />
          <p className="skills-intro">{t(
            "Technologies utilisées dans mes projets et stages, regroupées par domaine. Chaque groupe renvoie aux réalisations associées.",
            "Technologies used in my projects and internships, grouped by domain. Each group links to related work.",
          )}</p>
          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <article className="skills-card" key={group.id} data-skill-group={group.id}>
                <p className="eyebrow">{String(index + 1).padStart(2, "0")}</p>
                <h3>{tr(locale, group.title)}</h3>
                <TechStack tools={group.tools.map(tool => skillLabel(tool, locale))} />
                {"note" in group && <p className="skills-note">{tr(locale, group.note)}</p>}
                <details className="skill-evidence">
                  <summary>{t("Voir les réalisations associées", "See related work")}</summary>
                  {group.projects.map(slug => <Link key={slug} href={projectPath(locale, slug)} prefetch={false}>{findCaseStudy(slug)!.name}<ArrowUpRight aria-hidden="true" /></Link>)}
                  {"experience" in group && <a href="#experience">{t("Expériences professionnelles", "Professional experience")}<ArrowDownRight aria-hidden="true" /></a>}
                  {(group.id === "applications" || group.id === "cloud" || group.id === "security") && <a href="https://github.com/farah-ben-harb/farah-me">{t("Ce portfolio", "This portfolio")}<ArrowUpRight aria-hidden="true" /></a>}
                </details>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="education">
          <SectionTitle index="04" label={t("Parcours académique", "Academic path")} title={t("Formation", "Education")} />
          <div className="timeline education-list">
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

        <section className="section" id="certifications">
          <SectionTitle index="05" label={t("Badges & attestations", "Badges & certificates")} title={t("Certifications & formations", "Certifications & training")} />
          <Credentials locale={locale} />
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 Farah Ben Harb</p>
        <a className="text-link" href="#top">{t("Retour en haut", "Back to top")} <ArrowDown className="up-arrow" aria-hidden="true" /></a>
      </footer>
    </div>
  );
}
