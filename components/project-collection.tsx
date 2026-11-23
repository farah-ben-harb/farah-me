import Link from "next/link";
import { ArrowUpRight, GitBranch } from "@phosphor-icons/react/dist/ssr";
import { TechStack } from "./tech-stack";
import { findCaseStudy, projectPath } from "@/lib/project-details";
import { tr, type Locale } from "@/lib/portfolio-copy";

type Text = readonly [string, string];
type Entry = {
  slug: string;
  title?: Text;
  summary?: Text;
  tools?: readonly string[];
  focus?: Text;
  primaryLabel?: Text;
  companion?: { slug: string; label: Text };
};
type Category = { id: string; title: Text; navigation: Text; description: Text; entries: readonly Entry[]; featured?: boolean; compact?: boolean };

const categories: readonly Category[] = [
  {
    id: "featured-projects", title: ["Projets phares", "Featured projects"],
    navigation: ["Projets phares", "Featured projects"],
    description: ["Cloud privé, Kubernetes, DevSecOps, GitOps, CI/CD et MLOps : six études de cas à explorer en priorité.", "Private cloud, Kubernetes, DevSecOps, GitOps, CI/CD and MLOps: six case studies to explore first."],
    featured: true,
    entries: [
      {
        slug: "k8s-cluster-automation", title: ["OpenStack & Kubernetes", "OpenStack & Kubernetes"],
        summary: ["Infrastructure OpenStack définie avec Heat ; cluster Kubernetes automatisé avec Ansible et kubeadm.", "OpenStack infrastructure defined with Heat; Kubernetes cluster automated with Ansible and kubeadm."],
        tools: ["OpenStack", "Heat", "Ansible", "Kubernetes"],
        primaryLabel: ["Automatisation du cluster", "Cluster automation"],
        companion: { slug: "openstack-heat-infrastructure", label: ["Infrastructure du cloud privé", "Private-cloud infrastructure"] },
      },
      { slug: "kubernetes-anomaly-detection-openstack", focus: ["SRE · Observabilité", "SRE · Observability"] },
      { slug: "devsecops-incident-platform", focus: ["DevSecOps", "DevSecOps"], tools: ["FastAPI", "PostgreSQL", "Docker", "Jenkins"] },
      { slug: "gitops-delivery-platform", focus: ["GitOps", "GitOps"], tools: ["Kubernetes", "Kustomize", "Argo CD", "Grafana"] },
      { slug: "flask-azure-devops-pipeline", focus: ["CI/CD · Infrastructure as Code", "CI/CD · Infrastructure as Code"], tools: ["Flask", "Terraform", "Azure", "GitHub Actions"] },
      { slug: "footballmatch-ai-platform-mlops", focus: ["MLOps · Plateforme IA", "MLOps · AI platform"], tools: ["FastAPI", "YOLO11", "MLflow", "K3s"] },
    ],
  },
  {
    id: "ai-projects", title: ["IA & données", "AI & data"],
    navigation: ["IA & données", "AI & data"],
    description: ["Deux autres plateformes applicatives : analyse métier et recrutement assisté par IA.", "Two more application platforms: business analytics and AI-assisted recruiting."],
    entries: [
      { slug: "crm-intelligence-mlops" },
      {
        slug: "devorecruiter", primaryLabel: ["Application & agents IA", "Application & AI agents"],
        companion: { slug: "devorecruiter-gitops", label: ["Livraison GitOps associée", "Companion GitOps delivery"] },
      },
    ],
  },
  {
    id: "application-projects", title: ["Applications & microservices", "Applications & microservices"],
    navigation: ["Applications", "Applications"],
    description: ["Application web et déploiement Kubernetes associés.", "Web application and its Kubernetes deployment."],
    entries: [
      {
        slug: "alif-app", primaryLabel: ["Application & microservices", "Application & microservices"],
        companion: { slug: "Alif.tn-App-k8s", label: ["Déploiement Kubernetes associé", "Companion Kubernetes deployment"] },
      },
    ],
  },
  {
    id: "other-projects", title: ["Autres projets", "Other projects"],
    navigation: ["Autres projets", "Other projects"],
    description: ["Applications web et desktop, jeu et analyse de données.", "Web and desktop applications, a game, and data analysis."],
    compact: true,
    entries: [
      { slug: "Application-Airport-Management" },
      { slug: "wefarm-smart-agriculture-platform" },
      { slug: "SmartFarm-Desktop-Application" },
      { slug: "QuantumEscape-Game-2D-SDL" },
      { slug: "CampusIdeas-SPA" },
      { slug: "CryptoCurrency-Project" },
    ],
  },
];

function project(slug: string) {
  const result = findCaseStudy(slug);
  if (!result) throw new Error(`Unknown collection project: ${slug}`);
  return result;
}

export function ProjectCollection({ locale }: { locale: Locale }) {
  const t = (fr: string, en: string) => tr(locale, [fr, en]);
  return (
    <div className="project-collection" id="selected-projects">
      <nav className="collection-nav" aria-label={t("Parcourir les projets par catégorie", "Browse projects by category")}>
        {categories.map((category, index) => (
          <a key={category.id} href={`#${category.id}`}><span aria-hidden="true">0{index + 1}</span><strong>{tr(locale, category.navigation)}</strong><ArrowUpRight aria-hidden="true" /></a>
        ))}
      </nav>
      {categories.map((category, index) => (
        <section className="collection-section" key={category.id} id={category.id} aria-labelledby={`${category.id}-title`}>
          <div className="collection-heading">
            <div><p className="eyebrow">0{index + 1} / {category.entries.length} {t("projets", "projects")}</p><h3 id={`${category.id}-title`}>{tr(locale, category.title)}</h3></div>
            <p>{tr(locale, category.description)}</p>
          </div>
          <ul className={`category-grid${category.featured ? " category-grid-featured" : category.compact ? " category-grid-compact" : category.entries.length === 3 ? " category-grid-three" : category.entries.length === 1 ? " category-grid-single" : ""}`}>
            {category.entries.map((entry) => {
              const detail = project(entry.slug);
              const companion = entry.companion ? project(entry.companion.slug) : null;
              return (
                <li className={`collection-card${entry.title ? " collection-card-highlight" : ""}`} key={entry.slug} id={entry.slug}>
                  {entry.title && <p className="project-pair-label"><GitBranch aria-hidden="true" />{t("Un projet, deux volets liés", "One project, two connected parts")}</p>}
                  {entry.focus && <p className="project-focus-label">{tr(locale, entry.focus)}</p>}
                  <h4><Link className="project-details-link" href={projectPath(locale, entry.slug)} prefetch={false}>{entry.title ? tr(locale, entry.title) : detail.name}<ArrowUpRight aria-hidden="true" /></Link></h4>
                  <p className="collection-summary">{tr(locale, entry.summary ?? detail.description)}</p>
                  <TechStack tools={entry.tools ?? detail.technologies.slice(0, 4)} />
                  {companion && entry.companion && <div className="collection-links">
                    <Link className="project-primary-link" href={projectPath(locale, entry.slug)} prefetch={false}>
                      <span>{entry.primaryLabel && <small>{tr(locale, entry.primaryLabel)}</small>}<strong>{detail.name}</strong></span><ArrowUpRight aria-hidden="true" />
                    </Link>
                    <Link className="companion-link" id={companion.slug} href={projectPath(locale, companion.slug)} prefetch={false}>
                      <GitBranch aria-hidden="true" /><span><small>{tr(locale, entry.companion.label)}</small><strong>{companion.name}</strong></span><ArrowUpRight aria-hidden="true" />
                    </Link>
                  </div>}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
