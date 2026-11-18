"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MagnifyingGlass, X } from "@phosphor-icons/react/dist/ssr";
import { TechStack } from "./tech-stack";
import type { Locale } from "@/lib/portfolio-copy";

export type ProjectCategory = "cloud" | "ai" | "apps";
export type CatalogueProject = {
  slug: string;
  name: string;
  description: string;
  technologies: string[];
  category: ProjectCategory;
};

const copy = {
  fr: {
    title: "Tous les autres projets", search: "Rechercher un projet", placeholder: "Nom, outil ou domaine…",
    all: "Tous", cloud: "Cloud & DevOps", ai: "IA & MLOps", apps: "Applications",
    results: "projets affichés", oneResult: "projet affiché", empty: "Aucun projet pour cette recherche.",
    reset: "Effacer la recherche", open: "Ouvrir la fiche", filters: "Filtrer les projets",
  },
  en: {
    title: "More projects", search: "Search projects", placeholder: "Name, tool or domain…",
    all: "All", cloud: "Cloud & DevOps", ai: "AI & MLOps", apps: "Applications",
    results: "projects shown", oneResult: "project shown", empty: "No projects match this search.",
    reset: "Clear search", open: "Open project", filters: "Filter projects",
  },
} as const;

const categories = ["all", "cloud", "ai", "apps"] as const;

export function ProjectCatalogue({ locale, projects }: { locale: Locale; projects: CatalogueProject[] }) {
  const [category, setCategory] = useState<(typeof categories)[number]>("all");
  const [query, setQuery] = useState("");
  const labels = copy[locale];
  const search = query.trim().toLocaleLowerCase(locale);
  const visible = projects.filter((project) =>
    (category === "all" || project.category === category) &&
    (!search || `${project.name} ${project.description} ${project.technologies.join(" ")}`.toLocaleLowerCase(locale).includes(search)),
  );

  return (
    <div className="catalogue" id="more-projects">
      <div className="catalogue-intro">
        <div>
          <p className="eyebrow">{locale === "fr" ? "Explorer" : "Explore"} / {projects.length} {locale === "fr" ? "autres projets" : "more projects"}</p>
          <h3>{labels.title}</h3>
        </div>
        <p>{locale === "fr" ? "Trouvez rapidement une réalisation par domaine ou technologie." : "Find a project quickly by field or technology."}</p>
      </div>
      <div className="catalogue-controls">
        <div className="catalogue-filters" role="group" aria-label={labels.filters}>
          {categories.map((name) => (
            <button key={name} type="button" data-filter={name} aria-pressed={category === name} onClick={() => setCategory(name)}>
              {labels[name]}
            </button>
          ))}
        </div>
        <div className="catalogue-search">
          <label htmlFor="project-search">{labels.search}</label>
          <div className="catalogue-search-field">
            <MagnifyingGlass aria-hidden="true" />
            <input id="project-search" type="search" autoComplete="off" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={labels.placeholder} />
            {query && <button type="button" aria-label={labels.reset} onClick={() => setQuery("")}><X aria-hidden="true" /></button>}
          </div>
        </div>
      </div>
      <p className="catalogue-count" role="status" aria-live="polite">{visible.length} {visible.length === 1 ? labels.oneResult : labels.results}</p>
      {visible.length ? (
        <ul className="catalogue-list">
          {visible.map((project) => (
            <li className="catalogue-card" key={project.slug} id={project.slug}>
              <span className="catalogue-category">{labels[project.category]}</span>
              <h4><Link href={`${locale === "en" ? "/en" : ""}/projects/${project.slug}`} prefetch={false}>{project.name}<ArrowUpRight aria-hidden="true" /></Link></h4>
              <p>{project.description}</p>
              <TechStack tools={project.technologies} />
            </li>
          ))}
        </ul>
      ) : <div className="catalogue-empty"><p>{labels.empty}</p><button type="button" onClick={() => { setQuery(""); setCategory("all"); }}>{labels.reset}</button></div>}
    </div>
  );
}
