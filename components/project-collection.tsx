import Link from "next/link";
import { ArrowUpRight, GitBranch } from "@phosphor-icons/react/dist/ssr";
import { TechStack } from "./tech-stack";
import { findCaseStudy, projectPath } from "@/lib/project-details";
import { tr, type Locale } from "@/lib/portfolio-copy";

const selected = [
  {
    slug: "k8s-cluster-automation", label: ["Infrastructure & Kubernetes", "Infrastructure & Kubernetes"],
    summary: ["Automatiser un cluster Kubernetes sur OpenStack, du bootstrap à la supervision.", "Automate Kubernetes on OpenStack, from cluster bootstrap to monitoring."],
    tools: ["OpenStack", "Ansible", "Kubernetes", "Helm"],
  },
  {
    slug: "footballmatch-ai-platform-mlops", label: ["AI Platform & MLOps", "AI Platform & MLOps"],
    summary: ["Analyser des vidéos de football et tracer les exécutions MLflow, avec plusieurs chemins de déploiement.", "Analyse football footage and track MLflow runs across documented deployment paths."],
    tools: ["FastAPI", "YOLO11", "MLflow", "K3s"],
  },
  {
    slug: "devsecops-incident-platform", label: ["DevSecOps & qualité", "DevSecOps & quality"],
    summary: ["Associer une API de gestion d’incidents à des tests et contrôles de sécurité reproductibles.", "Pair an incident-management API with reproducible tests and security checks."],
    tools: ["FastAPI", "PostgreSQL", "Docker", "Jenkins"],
  },
  {
    slug: "gitops-delivery-platform", label: ["GitOps & livraison", "GitOps & delivery"],
    summary: ["Décrire une livraison Kubernetes dans Git avec Kustomize, Argo CD et persistance PostgreSQL.", "Define Kubernetes delivery in Git using Kustomize, Argo CD and PostgreSQL persistence."],
    tools: ["Kubernetes", "Kustomize", "Argo CD", "Grafana"],
  },
  {
    slug: "openstack-heat-infrastructure", label: ["Cloud privé & IaC", "Private cloud & IaC"],
    summary: ["Orchestrer réseaux, instances et volumes d’un laboratoire OpenStack avec des templates Heat.", "Orchestrate networks, instances and volumes for an OpenStack lab with Heat templates."],
    tools: ["OpenStack", "Heat", "Neutron", "Cinder"],
  },
  {
    slug: "flask-azure-devops-pipeline", label: ["Azure & CI/CD", "Azure & CI/CD"],
    summary: ["Relier une application Flask testée à Docker, à la CI et à une infrastructure Azure définie en Terraform.", "Connect a tested Flask app to Docker, CI and Terraform-defined Azure infrastructure."],
    tools: ["Flask", "Terraform", "Azure", "GitHub Actions"],
  },
] as const;

const groups = [
  {
    id: "ai-projects", title: ["IA, données & MLOps", "AI, data & MLOps"],
    description: ["Des modèles aux services applicatifs, avec leurs dépôts de déploiement associés.", "From models to application services, alongside their deployment repositories."],
    entries: [
      { slug: "crm-intelligence-mlops", companion: null },
      { slug: "devorecruiter", companion: "devorecruiter-gitops" },
      { slug: "kubernetes-anomaly-detection-openstack", companion: null },
      { slug: "CryptoCurrency-Project", companion: null },
    ],
  },
  {
    id: "application-projects", title: ["Applications & logiciels", "Applications & software"],
    description: ["Web, desktop et projets de formation : explorez les réalisations, les architectures et le code de chaque projet.", "Web, desktop and academic work: explore each project's implementation, architecture and source code."],
    entries: [
      { slug: "alif-app", companion: "Alif.tn-App-k8s" },
      { slug: "Application-Airport-Management", companion: null },
      { slug: "wefarm-smart-agriculture-platform", companion: null },
      { slug: "SmartFarm-Desktop-Application", companion: null },
      { slug: "QuantumEscape-Game-2D-SDL", companion: null },
      { slug: "CampusIdeas-SPA", companion: null },
    ],
  },
] as const;

function project(slug: string) {
  const result = findCaseStudy(slug);
  if (!result) throw new Error(`Unknown collection project: ${slug}`);
  return result;
}

export function ProjectCollection({ locale }: { locale: Locale }) {
  const t = (fr: string, en: string) => tr(locale, [fr, en]);
  return (
    <div className="project-collection">
      <nav className="collection-nav" aria-label={t("Parcourir les projets", "Browse projects")}>
        <a href="#selected-projects"><span>01</span>{t("Sélection Cloud & DevOps", "Cloud & DevOps selection")}</a>
        <a href="#ai-projects"><span>02</span>{t("IA & MLOps", "AI & MLOps")}</a>
        <a href="#application-projects"><span>03</span>{t("Applications", "Applications")}</a>
      </nav>

      <section className="collection-section" id="selected-projects" aria-labelledby="selected-title">
        <div className="collection-heading">
          <div><p className="eyebrow">01 / {t("À découvrir en premier", "Start here")}</p><h3 id="selected-title">{t("Six projets phares", "Six selected projects")}</h3></div>
          <p>{t("Infrastructure, livraison sécurisée et plateformes IA : un aperçu, puis les détails en un clic.", "Infrastructure, secure delivery and AI platforms: a quick overview, then the details in one click.")}</p>
        </div>
        <ul className="selected-grid">
          {selected.map((item, index) => {
            const detail = project(item.slug);
            return <li key={item.slug}>
              <Link className="selected-card project-details-link" href={projectPath(locale, item.slug)} id={item.slug} aria-labelledby={`${item.slug}-title`} prefetch={false}>
                <div className="selected-card-top"><span className="selected-number">0{index + 1}</span><span>{tr(locale, item.label)}</span><ArrowUpRight aria-hidden="true" /></div>
                <h4 id={`${item.slug}-title`}>{detail.name}</h4>
                <p>{tr(locale, item.summary)}</p>
                <TechStack tools={item.tools} />
                <span className="selected-card-bottom">{t("Voir la fiche du projet", "View project details")}<span aria-hidden="true">↗</span></span>
              </Link>
            </li>;
          })}
        </ul>
      </section>

      <div id="more-projects">
        {groups.map((group, groupIndex) => (
          <section className="collection-section supporting-collection" key={group.id} id={group.id} aria-labelledby={`${group.id}-title`}>
            <div className="collection-heading">
              <div><p className="eyebrow">0{groupIndex + 2} / {t("Autres réalisations", "More work")}</p><h3 id={`${group.id}-title`}>{tr(locale, group.title)}</h3></div>
              <p>{tr(locale, group.description)}</p>
            </div>
            <ul className="project-directory">
              {group.entries.map((entry) => {
                const detail = project(entry.slug);
                const companion = entry.companion ? project(entry.companion) : null;
                return <li className="directory-item" key={entry.slug} id={entry.slug}>
                  <h4><Link href={projectPath(locale, entry.slug)} prefetch={false}>{detail.name}<ArrowUpRight aria-hidden="true" /></Link></h4>
                  <p>{tr(locale, detail.description)}</p>
                  <TechStack tools={detail.technologies.slice(0, 4)} />
                  {companion && <Link className="companion-link" id={companion.slug} href={projectPath(locale, companion.slug)} prefetch={false}><GitBranch aria-hidden="true" /><span>{t("Déploiement associé", "Companion deployment")}<strong>{companion.name}</strong></span><ArrowUpRight aria-hidden="true" /></Link>}
                </li>;
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
