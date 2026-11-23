import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { SiteHeader } from "./site-header";
import { Credentials } from "./credentials";
import { TechStack } from "./tech-stack";
import { education, experience, tr, type Locale } from "@/lib/portfolio-copy";
import { skillGroups, skillLabel } from "@/lib/skills";
import { findCaseStudy, projectPath } from "@/lib/project-details";

export function Profile({ locale }: { locale: Locale }) {
  const t = (fr: string, en: string) => tr(locale, [fr, en]);
  return (
    <div className="shell" id="top">
      <a className="skip-link" href="#content">{t("Aller au contenu", "Skip to content")}</a>
      <SiteHeader locale={locale} current="profile" />
      <main id="content">
        <header className="page-intro">
          <p className="eyebrow">{t("Parcours", "Profile")}</p>
          <h1>{t("Mon parcours", "My background")}</h1>
          <p>{t("Mes expériences, mes outils et ma formation, réunis au même endroit.", "My experience, tools and education in one place.")}</p>
          <nav className="page-jump-links" aria-label={t("Sections du parcours", "Profile sections")}>
            <a href="#experience">{t("Expérience", "Experience")}</a><a href="#skills">{t("Compétences", "Skills")}</a><a href="#education">{t("Formation", "Education")}</a><a href="#certifications">{t("Certifications", "Credentials")}</a>
          </nav>
        </header>
        <section className="section" id="experience">
          <div className="section-title"><p className="eyebrow">01 / {t("Parcours professionnel", "Professional background")}</p><h2>{t("Expérience", "Experience")}</h2></div>
          <div className="timeline experience-list">
            {experience.map((item) => <article key={item.company}>
              <p className="eyebrow">{tr(locale, item.period)}</p><h3>{item.company}</h3><p className="role">{tr(locale, item.role)}</p>
              <p className="experience-summary">{tr(locale, item.summary)}</p><TechStack tools={item.tools} />
            </article>)}
          </div>
        </section>
        <section className="section" id="skills">
          <div className="section-title"><p className="eyebrow">02 / {t("Outils & pratiques", "Tools & practices")}</p><h2>{t("Compétences", "Skills")}</h2></div>
          <p className="skills-intro">{t("Outils utilisés dans mes projets et mes stages. Ouvrez un domaine pour voir les technologies et les réalisations associées.", "Tools used in my projects and internships. Open a domain to see its technologies and related work.")}</p>
          <div className="skills-grid">
            {skillGroups.map((group) => <details className="skills-card" key={group.id} data-skill-group={group.id}>
              <summary><span>{tr(locale, group.title)}</span><span aria-hidden="true">+</span></summary>
              <div className="skills-card-content">
                <TechStack tools={group.tools.map(tool => skillLabel(tool, locale))} />
                {"note" in group && <p className="skills-note">{tr(locale, group.note)}</p>}
                <div className="skill-evidence"><p className="eyebrow">{t("Réalisations associées", "Related work")}</p>
                  {group.projects.map(slug => <Link key={slug} href={projectPath(locale, slug)} prefetch={false}>{findCaseStudy(slug)!.name}<ArrowUpRight aria-hidden="true" /></Link>)}
                  {"experience" in group && <a href="#experience">{t("Expériences professionnelles", "Professional experience")}<ArrowUpRight aria-hidden="true" /></a>}
                </div>
              </div>
            </details>)}
          </div>
        </section>
        <section className="section" id="education">
          <div className="section-title"><p className="eyebrow">03 / {t("Parcours académique", "Academic path")}</p><h2>{t("Formation", "Education")}</h2></div>
          <div className="timeline education-list">{education.map(item => <article className="education-card" key={`${item.school}-${item.period[0]}`}>
            <p className="eyebrow">{tr(locale, item.period)}</p><h3>{tr(locale, item.title)}</h3><p className="education-school">{item.school}</p><p className="education-detail">{tr(locale, item.detail)}</p>
          </article>)}</div>
        </section>
        <section className="section" id="certifications">
          <div className="section-title"><p className="eyebrow">04 / {t("Badges & attestations", "Badges & certificates")}</p><h2>{t("Certifications & formations", "Certifications & training")}</h2></div>
          <Credentials locale={locale} />
        </section>
      </main>
      <footer className="footer"><p>© 2026 Farah Ben Harb</p><Link className="text-link" href={locale === "fr" ? "/" : "/en"}>{t("Retour à l’accueil", "Back to home")}<ArrowUpRight aria-hidden="true" /></Link></footer>
    </div>
  );
}
