import Link from "next/link";
import {
  ArrowDown, ArrowDownRight, ArrowUpRight,
  EnvelopeSimple, FileText, GithubLogo, LinkedinLogo, MapPin, Phone,
} from "@phosphor-icons/react/dist/ssr";
import { PlatformAtlas } from "@/components/platform-atlas";
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
    [t("Formation", "Education"), "#education"],
    [t("Compétences", "Skills"), "#skills"],
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
              "Je suis Farah Ben Harb, élève-ingénieure. J’automatise l’infrastructure et la livraison de services, des clusters Kubernetes aux pipelines de modèles.",
              "I’m Farah Ben Harb, an engineering student. I automate infrastructure and service delivery, from Kubernetes clusters to model pipelines.",
            )}</p>
            <div className="actions">
              <a className="action action-primary" href="#projects">{t("Explorer les projets", "Explore projects")}<ArrowDownRight aria-hidden="true" /></a>
              <div className="hero-secondary-actions">
                <a className="action action-outline hero-contact-link" href="#contact">{t("Me contacter", "Get in touch")}<EnvelopeSimple aria-hidden="true" /></a>
                <a className="icon-link resume-link" id="resumes" href={cloudResume} hrefLang={locale} type="application/pdf" target="_blank" rel="noopener noreferrer" aria-label={resumeLabel} title={resumeLabel}>
                  <FileText aria-hidden="true" /><span aria-hidden="true">CV</span>
                </a>
              </div>
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
          <p className="skills-intro">{t(
            "Du développement applicatif aux plateformes cloud : les technologies et pratiques de mes projets et stages, regroupées par domaine. Les fiches précisent les réalisations, les configurations et les validations effectuées.",
            "From application development to cloud platforms: technologies and practices from my projects and internships, grouped by domain. Each case study explains the implementation, configuration and completed validations.",
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

        <section className="section" id="certifications">
          <SectionTitle index="05" label={t("Badges & attestations", "Badges & certificates")} title={t("Certifications & formations", "Certifications & training")} />
          <Credentials locale={locale} />
        </section>

        <section className="section contact" id="contact" aria-labelledby="contact-title">
          <div className="contact-panel">
            <div className="contact-intro">
              <p className="eyebrow"><span>06 /</span> Contact</p>
              <h2 id="contact-title">{t("Faisons connaissance.", "Let’s connect.")}</h2>
              <p className="contact-message">{t(
                "Vous recherchez une stagiaire en Cloud, DevOps, SRE ou MLOps ? Je serais ravie d’échanger sur votre équipe et les projets auxquels je pourrais contribuer.",
                "Looking for a Cloud, DevOps, SRE or MLOps intern? I’d love to hear about your team and the projects I could contribute to.",
              )}</p>
              <div className="contact-availability">
                <span className="signal" aria-hidden="true" />
                <p><strong>{t("Stage de fin d’études", "Final-year internship")}</strong><span>{t("6 mois · À partir de mars 2027", "6 months · From March 2027")}</span></p>
              </div>
            </div>
            <div className="contact-details">
              <a className="contact-email" href={`mailto:${siteConfig.email}`}>
                <span className="contact-label"><EnvelopeSimple aria-hidden="true" /> {t("Écrivez-moi", "Email me")}<ArrowUpRight aria-hidden="true" /></span>
                <strong>{siteConfig.email}</strong>
              </a>
              <dl className="contact-meta">
                <div><dt><Phone aria-hidden="true" /> {t("Téléphone", "Phone")}</dt><dd><a href={`tel:${siteConfig.phone}`} aria-label={`${t("Appeler Farah au", "Call Farah at")} ${siteConfig.phoneDisplay}`}>{siteConfig.phoneDisplay}</a></dd></div>
                <div><dt><MapPin aria-hidden="true" /> {t("Localisation", "Location")}</dt><dd>Rouen, France</dd></div>
              </dl>
              <div className="contact-socials">
                <p>{t("Retrouvez-moi aussi sur", "Find me on")}</p>
                <div>
                  <a href={siteConfig.linkedin}><LinkedinLogo aria-hidden="true" /> LinkedIn<ArrowUpRight aria-hidden="true" /></a>
                  <a href={siteConfig.github}><GithubLogo aria-hidden="true" /> GitHub<ArrowUpRight aria-hidden="true" /></a>
                </div>
              </div>
            </div>
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
