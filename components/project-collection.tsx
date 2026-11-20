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
  primaryLabel?: Text;
  companion?: { slug: string; label: Text };
};
type Category = { id: string; title: Text; navigation: Text; description: Text; entries: readonly Entry[] };

const categories: readonly Category[] = [
  {
    id: "cloud-projects", title: ["Cloud, infrastructure & SRE", "Cloud, infrastructure & SRE"],
    navigation: ["Cloud & Infrastructure", "Cloud & Infrastructure"],
    description: ["Du cloud privé aux clusters Kubernetes : infrastructure as code, automatisation et observabilité.", "From private cloud to Kubernetes clusters: infrastructure as code, automation and observability."],
    entries: [
      {
        slug: "k8s-cluster-automation", title: ["OpenStack & Kubernetes", "OpenStack & Kubernetes"],
        summary: ["Deux volets liés : définir l’infrastructure du cloud privé avec Heat, puis automatiser le cluster Kubernetes avec Ansible et kubeadm.", "Two connected parts: define private-cloud infrastructure with Heat, then automate the Kubernetes cluster with Ansible and kubeadm."],
        tools: ["OpenStack", "Heat", "Ansible", "Kubernetes", "Helm", "Prometheus"],
        primaryLabel: ["Automatisation du cluster", "Cluster automation"],
        companion: { slug: "openstack-heat-infrastructure", label: ["Infrastructure du cloud privé", "Private-cloud infrastructure"] },
      },
      { slug: "kubernetes-anomaly-detection-openstack" },
    ],
  },
  {
    id: "devops-projects", title: ["DevOps, DevSecOps & GitOps", "DevOps, DevSecOps & GitOps"],
    navigation: ["DevOps & DevSecOps", "DevOps & DevSecOps"],
    description: ["Tester, sécuriser et livrer les applications : pipelines CI/CD, conteneurs et configuration déclarative.", "Test, secure and deliver applications through CI/CD pipelines, containers and declarative configuration."],
    entries: [
      { slug: "devsecops-incident-platform", tools: ["FastAPI", "PostgreSQL", "Docker", "Jenkins"] },
      { slug: "gitops-delivery-platform", tools: ["Kubernetes", "Kustomize", "Argo CD", "Grafana"] },
      { slug: "flask-azure-devops-pipeline", tools: ["Flask", "Terraform", "Azure", "GitHub Actions"] },
    ],
  },
  {
    id: "ai-projects", title: ["IA, données & MLOps", "AI, data & MLOps"],
    navigation: ["IA & MLOps", "AI & MLOps"],
    description: ["De l’analyse de données aux plateformes IA : modèles, services et suivi des expérimentations.", "From data analysis to AI platforms: models, services and experiment tracking."],
    entries: [
      { slug: "footballmatch-ai-platform-mlops", tools: ["FastAPI", "YOLO11", "MLflow", "K3s"] },
      { slug: "crm-intelligence-mlops" },
      {
        slug: "devorecruiter", primaryLabel: ["Application & agents IA", "Application & AI agents"],
        companion: { slug: "devorecruiter-gitops", label: ["Livraison GitOps associée", "Companion GitOps delivery"] },
      },
      { slug: "CryptoCurrency-Project" },
    ],
  },
  {
    id: "application-projects", title: ["Applications & logiciels", "Applications & software"],
    navigation: ["Applications", "Applications"],
    description: ["Web, desktop et projets de formation : des besoins métier aux interfaces et services applicatifs.", "Web, desktop and academic projects: from business needs to interfaces and application services."],
    entries: [
      {
        slug: "alif-app", primaryLabel: ["Application & microservices", "Application & microservices"],
        companion: { slug: "Alif.tn-App-k8s", label: ["Déploiement Kubernetes associé", "Companion Kubernetes deployment"] },
      },
      { slug: "Application-Airport-Management" },
      { slug: "wefarm-smart-agriculture-platform" },
      { slug: "SmartFarm-Desktop-Application" },
      { slug: "QuantumEscape-Game-2D-SDL" },
      { slug: "CampusIdeas-SPA" },
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
          <a key={category.id} href={`#${category.id}`}><span aria-hidden="true">0{index + 1}</span>{tr(locale, category.navigation)}</a>
        ))}
      </nav>
      {categories.map((category, index) => (
        <section className="collection-section" key={category.id} id={category.id} aria-labelledby={`${category.id}-title`}>
          <div className="collection-heading">
            <div><p className="eyebrow">0{index + 1} / {category.entries.length} {t("projets", "projects")}</p><h3 id={`${category.id}-title`}>{tr(locale, category.title)}</h3></div>
            <p>{tr(locale, category.description)}</p>
          </div>
          <ul className={`category-grid${category.entries.length % 3 === 0 ? " category-grid-three" : ""}`}>
            {category.entries.map((entry) => {
              const detail = project(entry.slug);
              const companion = entry.companion ? project(entry.companion.slug) : null;
              return (
                <li className={`collection-card${entry.title ? " collection-card-highlight" : ""}`} key={entry.slug} id={entry.slug}>
                  {entry.title && <p className="project-pair-label"><GitBranch aria-hidden="true" />{t("Un projet, deux volets liés", "One project, two connected parts")}</p>}
                  <h4><Link className="project-details-link" href={projectPath(locale, entry.slug)} prefetch={false}>{entry.title ? tr(locale, entry.title) : detail.name}<ArrowUpRight aria-hidden="true" /></Link></h4>
                  <p className="collection-summary">{tr(locale, entry.summary ?? detail.description)}</p>
                  <TechStack tools={entry.tools ?? detail.technologies.slice(0, 4)} />
                  <div className="collection-links">
                    <Link className="project-primary-link" href={projectPath(locale, entry.slug)} prefetch={false}>
                      <span>{entry.primaryLabel && <small>{tr(locale, entry.primaryLabel)}</small>}<strong>{companion ? detail.name : t("Explorer le projet", "Explore the project")}</strong></span><ArrowUpRight aria-hidden="true" />
                    </Link>
                    {companion && entry.companion && <Link className="companion-link" id={companion.slug} href={projectPath(locale, companion.slug)} prefetch={false}>
                      <GitBranch aria-hidden="true" /><span><small>{tr(locale, entry.companion.label)}</small><strong>{companion.name}</strong></span><ArrowUpRight aria-hidden="true" />
                    </Link>}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
