import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, EnvelopeSimple, GithubLogo, LinkedinLogo, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { siteConfig } from "@/lib/site";

type Locale = "en" | "fr";

const copy = {
  en: {
    nav: ["Projects", "Experience", "Skills", "Contact"],
    eyebrow: "Cloud · Platform · Reliability",
    title: "Cloud and DevOps engineering for reliable platforms.",
    intro: "I’m Farah, a computer engineering student focused on cloud infrastructure, Kubernetes, automation and secure delivery. MLOps and AI platforms complement this foundation.",
    cta1: "Explore projects", cta2: "Get in touch",
    location: "Based in France · Open to internship opportunities",
    selected: "PROJECTS", workTitle: "Work, by area.",
    workIntro: "Start with the area that interests you. Each project separates implementation, validation and remaining limits.",
    github: "GitHub repo", demo: "Live demo", implementation: "WHAT I BUILT", validation: "WHAT I VALIDATED", limits: "LIMITS", details: "Implementation & evidence",
    experience: "EXPERIENCE", experienceTitle: "Where I’ve worked.",
    skills: "SKILLS", skillsTitle: "Areas of focus.",
    contact: "CONTACT", contactTitle: "Let’s talk.",
    contactText: "Interested in Cloud, Platform Engineering, DevOps, SRE or MLOps internship opportunities.", basedIn: "Based in France", phone: "Phone",
    githubProfile: "GitHub", linkedin: "LinkedIn", email: "Email", verified: "CI VERIFIED", recorded: "DEMO RECORDED", static: "STATIC VALIDATION", notDeployed: "NOT DEPLOYED HERE",
  },
  fr: {
    nav: ["Projets", "Expérience", "Compétences", "Contact"],
    eyebrow: "Cloud · Plateforme · Fiabilité",
    title: "Cloud et DevOps au service de plateformes fiables.",
    intro: "Je suis Farah, étudiante ingénieure en informatique, orientée infrastructure cloud, Kubernetes, automatisation et livraison sécurisée. Le MLOps et les plateformes IA complètent ce socle.",
    cta1: "Explorer les projets", cta2: "Me contacter",
    location: "Basée en France · Ouverte aux opportunités de stage",
    selected: "PROJETS", workTitle: "Mes réalisations, par domaine.",
    workIntro: "Choisissez un domaine. Chaque projet distingue les réalisations, les validations et les limites restantes.",
    github: "Dépôt GitHub", demo: "Démo en ligne", implementation: "RÉALISATIONS", validation: "VALIDATIONS", limits: "LIMITES", details: "Détails techniques et preuves",
    experience: "EXPÉRIENCE", experienceTitle: "Mes expériences.",
    skills: "COMPÉTENCES", skillsTitle: "Mes domaines d’intervention.",
    contact: "CONTACT", contactTitle: "Échangeons.",
    contactText: "Intéressée par des stages en Cloud, Platform Engineering, DevOps, SRE ou MLOps.", basedIn: "Basée en France", phone: "Téléphone",
    githubProfile: "GitHub", linkedin: "LinkedIn", email: "E-mail", verified: "CI VALIDÉE", recorded: "DÉMO DOCUMENTÉE", static: "VALIDATION STATIQUE", notDeployed: "NON DÉPLOYÉ ICI",
  },
} as const;

const cases = [
  {
    id: "footballmatch", group: "ai", number: "01", category: "MLOPS / VIDEO SYSTEMS", name: "FootballMatch AI Platform",
    summary: { en: "A video-analysis pipeline combining computer vision, experiment tracking and several deliberately distinct runtime paths.", fr: "Un pipeline d’analyse vidéo qui combine vision par ordinateur, suivi d’expériences et plusieurs chemins d’exécution clairement distincts." },
    stack: "FastAPI · YOLO11n · ByteTrack · OpenCV · MLflow · Docker · Helm",
    detail: { en: "Compose runs FastAPI, PostgreSQL/pgvector and MLflow with named volumes. On K3s, Helm deploys the API while MLflow, PostgreSQL/pgvector and Ollama remain on the VM. Azure Container Apps is an independent GHCR-based demo with ephemeral storage and SQLite-backed MLflow. Prometheus/Grafana are optional local or VM-side overlays, not evidence of Azure monitoring. MLflow Tracking is part of the runtime; the Model Registry is implemented, but inference uses yolo11n.pt by default unless the champion alias is explicitly configured.", fr: "Compose exécute FastAPI, PostgreSQL/pgvector et MLflow avec volumes nommés. Sur K3s, Helm déploie l’API tandis que MLflow, PostgreSQL/pgvector et Ollama restent sur la VM. Azure Container Apps est une démo indépendante basée sur GHCR, avec stockage éphémère et MLflow sur SQLite. Prometheus/Grafana sont des overlays locaux ou côté VM, pas la preuve d’une supervision Azure. MLflow Tracking est utilisé; le Model Registry est implémenté, mais l’inférence charge yolo11n.pt par défaut, sauf configuration explicite de l’alias champion." },
    validation: { en: "PR #28 and #29 merged; post-merge CI passed tests, secret scan, SAST, container scan and Compose validation. GHCR publication remains manual.", fr: "PR #28 et #29 fusionnées; CI post-fusion verte sur tests, secrets, SAST, scan conteneur et Compose. La publication GHCR reste manuelle." },
    limit: { en: "The recorded Azure demo is not the K3s topology. MLflow Model Registry is implemented, but inference loads yolo11n.pt by default unless the champion alias is explicitly configured.", fr: "La démo Azure documentée n’est pas la topologie K3s. Le Model Registry MLflow est implémenté, mais l’inférence charge yolo11n.pt par défaut, sauf configuration explicite de l’alias champion." },
    repo: "footballmatch-ai-platform-mlops", demo: "https://footballmatch-api-demo2.nicewater-00626e15.francecentral.azurecontainerapps.io/docs", badge: "CI VERIFIED · DEMO", featured: true,
  },
  {
    id: "incident", group: "platform", number: "02", category: "DEVSECOPS / DELIVERY", name: "DevSecOps Incident Platform",
    summary: { en: "A PostgreSQL-backed incident API with observable endpoints and a gated application delivery pipeline.", fr: "Une API d’incidents adossée à PostgreSQL, avec endpoints observables et chaîne de livraison applicative contrôlée." },
    stack: "FastAPI · PostgreSQL · Docker · GitHub Actions · Jenkins · Gitleaks · Semgrep",
    detail: { en: "GitHub Actions validates tests, Compose, Docker build, non-root execution, Gitleaks and Semgrep. A Jenkinsfile defines additional scans and an explicitly gated CD path.", fr: "GitHub Actions valide les tests, Compose, le build Docker, l’exécution non-root, Gitleaks et Semgrep. Le Jenkinsfile décrit des scans complémentaires et un chemin CD explicitement protégé." },
    validation: { en: "CI run 43032437149 passed 8 tests, compilation, Compose, Docker build, non-root check, Gitleaks and Semgrep.", fr: "La CI 43032437149 a réussi 8 tests, compilation, Compose, build Docker, contrôle non-root, Gitleaks et Semgrep." },
    limit: { en: "Jenkins itself and a live runtime were not executed or verified.", fr: "Jenkins lui-même et un runtime réel n’ont pas été exécutés ou vérifiés." },
    repo: "devsecops-incident-platform", badge: "CI VERIFIED", featured: true,
  },
  {
    id: "anomaly", group: "other", number: "03", category: "SRE / OBSERVABILITY", name: "Kubernetes Anomaly Detection",
    summary: { en: "A FastAPI service that queries Prometheus and applies Isolation Forest to historical pod metrics.", fr: "Un service FastAPI qui interroge Prometheus et applique Isolation Forest à l’historique des métriques de Pods." },
    stack: "FastAPI · Prometheus · Isolation Forest · Docker · Kubernetes",
    detail: { en: "The API queries Prometheus, standardizes metric history and exposes anomaly detection and service metrics. The image and manifest use non-root execution, probes and resource bounds.", fr: "L’API interroge Prometheus, standardise l’historique métrique et expose la détection d’anomalies et les métriques de service. Image et manifeste utilisent un utilisateur non-root, des probes et des limites de ressources." },
    validation: { en: "PR #1 merged; four local tests and post-merge CI run 43030635364 passed.", fr: "PR #1 fusionnée; quatre tests locaux et CI post-fusion 43030635364 réussis." },
    limit: { en: "No live OpenStack/Kubernetes rollout was performed in this phase.", fr: "Aucun déploiement OpenStack/Kubernetes réel n’a été effectué durant cette phase." },
    repo: "kubernetes-anomaly-detection-openstack", badge: "CI VERIFIED", featured: false,
  },
  {
    id: "cluster", group: "cloud", number: "04", category: "INFRASTRUCTURE / KUBERNETES", name: "Kubernetes Cluster Automation",
    summary: { en: "An OpenStack lab bootstrap using Heat and Ansible, with kubeadm, containerd, Calico and monitoring components.", fr: "Automatisation d’un lab Kubernetes sur OpenStack avec Heat et Ansible, kubeadm, containerd, Calico et composants de supervision." },
    stack: "OpenStack Heat · Ansible · kubeadm · containerd · Calico · Helm",
    detail: { en: "Heat provisions the lab network and nodes; Ansible prepares the OS, bootstraps the control plane, joins workers, configures Calico and installs monitoring.", fr: "Heat provisionne le réseau et les nœuds; Ansible prépare les systèmes, initialise le plan de contrôle, joint les workers, configure Calico et installe la supervision." },
    validation: { en: "Static GitHub Actions validation is green; compatibility notes distinguish current versions from untested targets.", fr: "La validation statique GitHub Actions est verte; la matrice sépare les versions actuelles des cibles non testées." },
    limit: { en: "Fresh cloud bootstrap was not run. Historical SMTP credential rotation remains unconfirmed by the owner.", fr: "Aucun bootstrap cloud récent n’a été exécuté. La révocation de l’ancien identifiant SMTP reste à confirmer par son propriétaire." },
    repo: "k8s-cluster-automation", badge: "STATIC CI", featured: true,
  },
  {
    id: "heat", group: "cloud", number: "05", category: "CLOUD / INFRASTRUCTURE AS CODE", name: "OpenStack Heat Infrastructure",
    summary: { en: "A Heat template describing Neutron networks, compute, Cinder storage, floating IPs and restricted administration.", fr: "Un template Heat décrivant réseaux Neutron, calcul, stockage Cinder, IP flottantes et accès d’administration restreints." },
    stack: "OpenStack · Heat · Neutron · Nova · Cinder · YAML",
    detail: { en: "SSH and ICMP ingress use an explicit admin_cidr. No public MySQL ingress is defined; web ports are public for the lab scenario.", fr: "Les flux SSH et ICMP utilisent admin_cidr. Aucun accès MySQL public n’est défini; les ports web sont publics pour le scénario de lab." },
    validation: { en: "CI runs 43032438371 and 43032446675 passed four template/security tests and Gitleaks.", fr: "Les CI 43032438371 et 43032446675 ont réussi quatre tests de template/sécurité et Gitleaks." },
    limit: { en: "No live Heat stack was created; image, flavor, quota and provider network compatibility are cloud-specific.", fr: "Aucune stack Heat n’a été créée; images, flavors, quotas et réseau fournisseur dépendent du cloud cible." },
    repo: "openstack-heat-infrastructure", badge: "STATIC CI", featured: true,
  },
  {
    id: "gitops", group: "platform", number: "06", category: "PLATFORM / GITOPS", name: "GitOps Delivery Platform",
    summary: { en: "Kustomize and Argo CD configuration for an incident platform, with PostgreSQL persistence and hardened workloads.", fr: "Configuration Kustomize et Argo CD pour une plateforme d’incidents, avec persistance PostgreSQL et workloads durcis." },
    stack: "Kubernetes · Kustomize · Argo CD · PVC · GHCR",
    detail: { en: "The overlay renders a PostgreSQL PVC, immutable-style image tag, example Secret excluded from rendered resources, and non-root pod security contexts.", fr: "L’overlay génère un PVC PostgreSQL, une image taguée, un Secret d’exemple exclu du rendu et des contextes de sécurité non-root." },
    validation: { en: "CI 43032449248 passed Kustomize rendering and manifest, PVC, image, pod-security, Argo reference and Gitleaks checks.", fr: "La CI 43032449248 a validé le rendu Kustomize, manifests, PVC, image, sécurité des Pods, référence Argo et Gitleaks." },
    limit: { en: "Argo targets main with automated sync, pruning and self-heal. The active cluster state is unknown; keep the PR open until checked.", fr: "Argo cible main avec synchronisation, pruning et auto-réparation. L’état réel du cluster est inconnu; garder la PR ouverte jusqu’à vérification." },
    repo: "gitops-delivery-platform", badge: "CI VERIFIED", featured: true,
  },
  {
    id: "flask", group: "cloud", number: "07", category: "AZURE / CI-CD", name: "Flask Azure DevOps Pipeline",
    summary: { en: "A Flask service with tests, Prometheus monitoring and Terraform definitions for an Azure VM path.", fr: "Un service Flask avec tests, supervision Prometheus et définitions Terraform pour un chemin de déploiement sur VM Azure." },
    stack: "Flask · Docker · GitHub Actions · Terraform · Azure · Prometheus",
    detail: { en: "Application, monitoring and Terraform static validation are automated. Docker publication and Azure apply require explicit workflow dispatch and protected values.", fr: "Les validations applicatives, monitoring et Terraform statique sont automatisées. Publication Docker et apply Azure nécessitent une action manuelle et des variables protégées." },
    validation: { en: "Three application tests, monitoring validation and Terraform static validation passed; publish/apply were skipped.", fr: "Trois tests applicatifs, validation monitoring et Terraform statique réussis; publication/apply ignorés." },
    limit: { en: "No Azure plan/apply was run. Historical SMTP credential rotation remains pending.", fr: "Aucun plan/apply Azure n’a été exécuté. La révocation de l’ancien identifiant SMTP reste en attente." },
    repo: "flask-azure-devops-pipeline", badge: "CI VERIFIED", featured: true,
  },
  {
    id: "crm", group: "other", number: "08", category: "MLOPS / LOCAL PLATFORM", name: "Mini CRM Intelligence",
    summary: { en: "A small profile-classification service with experiment tracking and infrastructure examples.", fr: "Un service de classification de profils avec suivi d’expériences et exemples d’infrastructure." },
    stack: "FastAPI · Scikit-learn · MLflow · Docker · Terraform · Ansible",
    detail: { en: "The repository includes training, inference, experiment tracking and a local container stack.", fr: "Le dépôt comprend entraînement, inférence, suivi d’expériences et une stack conteneurisée locale." },
    validation: { en: "Content retained from existing portfolio data; excluded from the current engineering audit.", fr: "Contenu conservé des données existantes du portfolio; exclu de l’audit technique de cette phase." },
    limit: { en: "Small synthetic dataset; do not position as a production decision system.", fr: "Petit jeu de données synthétique; ne pas présenter comme système décisionnel de production." },
    repo: "crm-intelligence-mlops", badge: "SEPARATE WORKSTREAM", featured: false,
  },
  {
    id: "devorecruiter", group: "other", number: "09", category: "AI PLATFORM / RAG", name: "DevoRecruiter",
    summary: { en: "A recruiting assistant architecture spanning Angular, NestJS, FastAPI and a document RAG path.", fr: "Une architecture d’assistant de recrutement reliant Angular, NestJS, FastAPI et un pipeline documentaire RAG." },
    stack: "Angular · NestJS · FastAPI · RAG · PostgreSQL · GitOps",
    detail: { en: "Retained as requested, but its technical modernization is paused and not represented as finalized.", fr: "Présenté comme demandé, mais sa modernisation technique est en pause et n’est pas présentée comme finalisée." },
    validation: { en: "Not re-audited in this portfolio phase.", fr: "Non réaudité durant cette phase portfolio." },
    limit: { en: "Work remains paused; no new deployment claim.", fr: "Le travail reste en pause; aucune nouvelle affirmation de déploiement." },
    repo: "devorecruiter", badge: "PAUSED WORKSTREAM", featured: false,
  },
];

const experience = [
  { company: "Devoteam", period: "Jul — Aug 2026", role: { en: "Cloud & DevOps Intern", fr: "Stagiaire Cloud & DevOps" }, text: { en: "Azure infrastructure automation with Terraform, GitHub Actions delivery workflows, K3s/Kubernetes with Helm and Argo CD, Dynatrace monitoring and an MCP integration for Claude Desktop.", fr: "Automatisation d’infrastructure Azure avec Terraform, workflows GitHub Actions, K3s/Kubernetes avec Helm et Argo CD, supervision Dynatrace et intégration MCP pour Claude Desktop." }, tags: "Azure · Terraform · Kubernetes · GitOps · Dynatrace · MCP" },
  { company: "Ooredoo", period: "Jul — Aug 2025", role: { en: "Software Development & Data Intern", fr: "Stagiaire développement logiciel & data" }, text: { en: "Python and Java tools for technical data and log processing, workflow automation and search interfaces.", fr: "Outils Python et Java pour le traitement de données techniques et de journaux, automatisation de workflows et interfaces de recherche." }, tags: "Python · Java" },
  { company: "Tunisie Télécom", period: "Jun — Jul 2023", role: { en: "Networks & Systems Intern", fr: "Stagiaire réseaux & systèmes" }, text: { en: "Exposure to Linux, TCP/IP, addressing, routing and infrastructure services in a telecom environment.", fr: "Expérience Linux, TCP/IP, adressage, routage et services d’infrastructure en environnement télécom." }, tags: "Linux · TCP/IP · Routing" },
];

const domains = [
  { title: { en: "Cloud & Infrastructure", fr: "Cloud & Infrastructure" }, items: "Azure · OpenStack · Terraform · Ansible · Linux" },
  { title: { en: "Platform & GitOps", fr: "Plateforme & GitOps" }, items: "Kubernetes · K3s · Helm · Argo CD · Kustomize" },
  { title: { en: "DevSecOps & SRE", fr: "DevSecOps & SRE" }, items: "GitHub Actions · Jenkins · Gitleaks · Semgrep · Trivy · Prometheus · Grafana" },
  { title: { en: "MLOps & AI Platform", fr: "MLOps & Plateformes IA" }, items: "MLflow · Kubeflow Pipelines · YOLO11 · ByteTrack · OpenCV · RAG · pgvector" },
];

const projectGroups = [
  { id: "cloud", title: { en: "Cloud & infrastructure", fr: "Cloud & infrastructure" }, description: { en: "Provisioning, cluster automation and cloud delivery.", fr: "Provisionnement, automatisation de clusters et livraison cloud." } },
  { id: "platform", title: { en: "Platform & DevSecOps", fr: "Plateforme & DevSecOps" }, description: { en: "Application delivery, security controls and GitOps.", fr: "Livraison applicative, contrôles de sécurité et GitOps." } },
  { id: "ai", title: { en: "MLOps & AI", fr: "MLOps & IA" }, description: { en: "Computer vision, model workflows and experiment tracking.", fr: "Vision par ordinateur, flux de modèles et suivi d’expériences." } },
] as const;

function CaseCard({ item, locale }: { item: typeof cases[number]; locale: Locale }) {
  const t = copy[locale];
  return <article className={`case-card ${item.id === "footballmatch" ? "case-featured" : ""}`} id={item.id}>
    <div className="case-topline"><span>{item.number} / {item.category}</span><span className="case-status"><i />{item.badge}</span></div>
    <h3>{item.name}</h3><p className="case-summary">{item.summary[locale]}</p>
    <div className="case-stack">{item.stack}</div>
    {item.id === "footballmatch" && <div className="deployment-rails" aria-label="Deployment paths"><div><small>01 / LOCAL</small><b>Docker Compose</b><span>FastAPI · PostgreSQL/pgvector · MLflow · volumes</span></div><div><small>02 / HYBRID</small><b>K3s / Helm / Argo CD</b><span>API in Kubernetes · MLflow / PostgreSQL / Ollama on VM</span></div><div><small>03 / INDEPENDENT</small><b>Azure Container Apps</b><span>GHCR · ephemeral storage · SQLite MLflow</span></div></div>}
    <details className="case-details"><summary>{t.details}<ArrowDown aria-hidden="true" /></summary><div className="case-detail-grid"><div><small>{t.implementation}</small><p>{item.detail[locale]}</p></div><div><small>{t.validation}</small><p>{item.validation[locale]}</p></div><div><small>{t.limits}</small><p>{item.limit[locale]}</p></div></div></details>
    <div className="case-actions"><a href={`https://github.com/farah-ben-harb/${item.repo}`} target="_blank" rel="noreferrer">{t.github}<GithubLogo aria-hidden="true" /></a>{item.demo&&<a className="demo-link" href={item.demo} target="_blank" rel="noreferrer">{t.demo}<ArrowUpRight aria-hidden="true" /></a>}</div>
  </article>;
}

export function MissionControl({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return <main className="mission-shell" id="top">
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="ambient-grid" aria-hidden="true" />
    <header className={`site-header ${locale === "fr" ? "locale-fr" : "locale-en"}`}><Link className="wordmark" href={locale === "fr" ? "/fr" : "/"}><span className="wordmark-mark">F</span><span>FARAH BEN HARB<small>ENGINEERING / SYSTEMS</small></span></Link>
      <nav aria-label={locale === "fr" ? "Navigation principale" : "Primary navigation"}>{t.nav.map((label,i)=><a href={["#work","#experience","#expertise","#contact"][i]} key={label}>{label}</a>)}</nav>
      <div className="header-actions"><a className="social-link" aria-label="GitHub" href={siteConfig.github} target="_blank" rel="noreferrer"><GithubLogo /></a><a className="social-link" aria-label="LinkedIn" href={siteConfig.linkedin} target="_blank" rel="noreferrer"><LinkedinLogo /></a><div className="language-switch" aria-label="Language"><Link href="/" aria-current={locale === "en" ? "page" : undefined}>EN</Link><span>/</span><Link href="/fr" aria-current={locale === "fr" ? "page" : undefined}>FR</Link></div></div>
    </header>
    <div id="main">
      <section className="hero" id="systems">
        <div className="hero-copy"><p className="eyebrow"><span className="signal-dot" />{t.eyebrow}</p><h1>{t.title}</h1><p className="hero-intro">{t.intro}</p><div className="hero-cta"><a className="button-primary" href="#work">{t.cta1}<ArrowDown /></a><a className="button-quiet" href="#contact">{t.cta2}<ArrowUpRight /></a></div><div className="hero-meta"><span>{t.location}</span></div></div>
        <div className="hero-visual">
          <div className="orbit orbit-one" aria-hidden="true" />
          <div className="orbit orbit-two" aria-hidden="true" />
          <div className="avatar-cutout-wrap">
            <Image src="/images/farah-ben-harb-avatar-cutout.png" alt={locale === "fr" ? "Portrait détouré de Farah Ben Harb" : "Background-removed portrait of Farah Ben Harb"} fill priority sizes="(max-width: 640px) 90vw, 36vw" className="avatar-cutout" />
          </div>
          <figure className="portrait-circle-widget">
            <div className="portrait-circle-shell"><div className="portrait-circle-clip"><Image src="/images/farah-ben-harb-black-dress.webp" alt="" fill priority sizes="150px" className="portrait-circle-image" /></div></div>
            <figcaption>{locale === "fr" ? "PHOTO ORIGINALE" : "ORIGINAL PHOTO"}<small>FARAH BEN HARB</small></figcaption>
          </figure>
          <div className="hero-coordinate">49°26′N<br/>01°06′E</div>
        </div>
      </section>
      <section className="work-section" id="work"><div className="section-head"><div><p className="eyebrow">{t.selected}</p><h2>{t.workTitle}</h2></div><p>{t.workIntro}</p></div>{projectGroups.map(group=><div className="project-group" key={group.id}><div className="project-group-heading"><div><h3>{group.title[locale]}</h3><p>{group.description[locale]}</p></div><span>{String(cases.filter(c=>c.group===group.id&&c.featured).length).padStart(2,"0")}</span></div><div className="case-grid">{cases.filter(c=>c.group===group.id&&c.featured).map(c=><CaseCard item={c} locale={locale} key={c.id}/>)}</div></div>)}<div className="more-work"><p className="eyebrow">{locale === "fr" ? "AUTRES PROJETS" : "MORE PROJECTS"}</p><div className="project-links">{cases.filter(c=>!c.featured).map(c=><a href={`https://github.com/farah-ben-harb/${c.repo}`} target="_blank" rel="noreferrer" key={c.id}>{c.name}<ArrowUpRight aria-hidden="true"/></a>)}</div></div></section>
      <section className="experience-section" id="experience"><div className="section-head"><div><p className="eyebrow">{t.experience}</p><h2>{t.experienceTitle}</h2></div></div><div className="timeline">{experience.map((e,i)=><article className="timeline-item" key={e.company}><div className="timeline-index">0{i+1}</div><div><p className="timeline-company">{e.company}<span>{e.period}</span></p><h3>{e.role[locale]}</h3><p className="timeline-copy">{e.text[locale]}</p><p className="timeline-tags">{e.tags}</p></div></article>)}</div></section>
      <section className="expertise-section" id="expertise"><div className="section-head"><div><p className="eyebrow">{t.skills}</p><h2>{t.skillsTitle}</h2></div></div><div className="expertise-grid">{domains.map((d,i)=><article key={d.title.en}><span>0{i+1}</span><h3>{d.title[locale]}</h3><p>{d.items}</p></article>)}</div></section>
      <section className="contact-section" id="contact"><p className="eyebrow">{t.contact}</p><h2>{t.contactTitle}</h2><p>{t.contactText}</p><div className="contact-grid"><div className="contact-details"><a className="contact-item" href={`mailto:${siteConfig.email}`}><EnvelopeSimple aria-hidden="true"/><span><small>{t.email}</small>{siteConfig.email}</span><ArrowUpRight aria-hidden="true"/></a><a className="contact-item" href={`tel:${siteConfig.phone}`}><Phone aria-hidden="true"/><span><small>{t.phone}</small>+33 7 75 69 18 67</span><ArrowUpRight aria-hidden="true"/></a><div className="contact-item"><MapPin aria-hidden="true"/><span><small>{locale === "fr" ? "Localisation" : "Location"}</small>{t.basedIn}</span></div></div></div></section>
    </div><footer><Link href="#top">FARAH BEN HARB</Link><span>© 2026 · {locale === "fr" ? "Aperçu Vercel · pas de déploiement de production." : "Vercel preview · no production deployment."}</span><span>FR / EN · NEXT.JS</span></footer>
  </main>;
}
