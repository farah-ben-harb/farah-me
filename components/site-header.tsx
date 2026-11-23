import Link from "next/link";
import { tr, type Locale } from "@/lib/portfolio-copy";

export function SiteHeader({ locale, current }: { locale: Locale; current: "home" | "projects" | "profile" }) {
  const prefix = locale === "fr" ? "" : "/en";
  const localized = (language: Locale) => `${language === "fr" ? "" : "/en"}${current === "home" ? "/" : `/${current}`}`;
  const links = [
    { href: `${prefix}/`, label: tr(locale, ["Accueil", "Home"]) },
    { href: `${prefix}/projects`, label: tr(locale, ["Projets", "Projects"]) },
    { href: `${prefix}/profile`, label: tr(locale, ["Parcours", "Profile"]) },
    { href: `${prefix}/#contact`, label: "Contact" },
  ];

  return (
    <header className="site-header">
      <Link className="wordmark" href={`${prefix}/`}><span aria-hidden="true">✳</span> Farah Ben Harb</Link>
      <nav className="nav-links" aria-label={tr(locale, ["Navigation principale", "Main navigation"])}>
        {links.map(({ href, label }, index) => <Link key={href} href={href} aria-current={index === ["home", "projects", "profile"].indexOf(current) ? "page" : undefined}>{label}</Link>)}
      </nav>
      <nav className="language-nav" aria-label={tr(locale, ["Langue", "Language"])}>
        <Link aria-current={locale === "fr" ? "page" : undefined} aria-label="Français" href={localized("fr")} hrefLang="fr" lang="fr">FR</Link>
        <Link aria-current={locale === "en" ? "page" : undefined} aria-label="English" href={localized("en")} hrefLang="en" lang="en">EN</Link>
      </nav>
    </header>
  );
}
