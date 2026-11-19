export type Locale = "fr" | "en";
type Translation = readonly [fr: string, en: string];

export function tr(locale: Locale, pair: Translation) {
  return pair[locale === "fr" ? 0 : 1];
}

export const experience = [
  {
    company: "Devoteam",
    role: ["Stage Cloud & DevOps", "Cloud & DevOps internship"],
    period: ["Juil. – août 2026", "Jul – Aug 2026"],
    summary: [
      "Automatisation d’infrastructure Azure avec Terraform, intégration continue sur GitHub Actions et livraison vers K3s avec Helm et Argo CD. Supervision Dynatrace et intégration MCP pour Claude Desktop.",
      "Automated Azure infrastructure with Terraform, built GitHub Actions workflows and delivered services to K3s with Helm and Argo CD. Used Dynatrace for monitoring and developed an MCP integration for Claude Desktop.",
    ],
    tools: ["Azure", "Terraform", "GitHub Actions", "K3s", "Helm", "Argo CD", "Dynatrace", "MCP"],
  },
  {
    company: "Ooredoo",
    role: ["Stage développement & données", "Software & data internship"],
    period: ["Juil. – août 2025", "Jul – Aug 2025"],
    summary: [
      "Développement d’outils Python et Java pour traiter, analyser et rechercher dans des journaux techniques.",
      "Built Python and Java tools for processing, analysing and searching technical logs.",
    ],
    tools: ["Python", "Java"],
  },
  {
    company: "Tunisie Télécom",
    role: ["Stage réseaux & systèmes", "Networks & systems internship"],
    period: ["Juin – juil. 2023", "Jun – Jul 2023"],
    summary: [
      "Découverte de l’exploitation des réseaux télécoms : Linux, TCP/IP, adressage, routage et services d’infrastructure.",
      "Worked with telecom network operations: Linux, TCP/IP, IP addressing, routing and infrastructure services.",
    ],
    tools: ["Linux", "TCP/IP", "Routage"],
  },
] as const;

export const education = [
  {
    school: "ESIGELEC · Rouen, France",
    title: ["Semestre d’échange en dernière année", "Final-year exchange semester"],
    period: ["2026–2027", "2026–2027"],
    detail: ["Spécialisation Réseaux et Télécommunications.", "Specialization in Networks and Telecommunications."],
  },
  {
    school: "ESPRIT · Tunis, Tunisie",
    title: ["Cycle d’ingénieur en informatique", "Engineering degree in Computer Science"],
    period: ["Diplôme prévu en 2027", "Expected graduation in 2027"],
    detail: ["Spécialisation Architecture IT et Cloud Computing.", "Specialization in IT Architecture and Cloud Computing."],
  },
  {
    school: "ESPRIT · Tunis, Tunisie",
    title: ["Cycle préparatoire", "Preparatory cycle"],
    period: ["2 ans", "2 years"],
    detail: ["Deux années de formation préparatoire à l’ingénierie.", "Two years of preparatory engineering studies."],
  },
  {
    school: "Lycée Rue El Attarien · Tunis, Tunisie",
    title: ["Baccalauréat scientifique", "Scientific baccalaureate"],
    period: ["2022", "2022"],
    detail: ["Diplôme de fin d’études secondaires.", "Secondary school diploma."],
  },
] as const;

export const focusAreas = [
  {
    label: ["Cloud & infrastructure", "Cloud & infrastructure"],
    href: "#k8s-cluster-automation",
  },
  {
    label: ["DevOps & fiabilité", "DevOps & reliability"],
    href: "#devsecops-incident-platform",
  },
  {
    label: ["MLOps & plateformes IA", "MLOps & AI platforms"],
    href: "#crm-intelligence-mlops",
  },
] as const;

export const projectNotes: Record<string, Translation> = {
  "footballmatch-ai-platform-mlops": [
    "Analyse de vidéos de football sur CPU : détection YOLO11, suivi ByteTrack et résultats annotés, exposés via FastAPI.",
    "CPU-first football video analysis with YOLO11 detection, ByteTrack tracking and annotated outputs served through FastAPI.",
  ],
  "k8s-cluster-automation": [
    "Bootstrap Kubernetes sur des VM OpenStack avec Heat et Ansible : containerd, Calico et supervision Prometheus/Grafana. Les validations statiques ne remplacent pas un nouveau déploiement de bout en bout.",
    "Kubernetes bootstrap on OpenStack VMs using Heat and Ansible, with containerd, Calico and Prometheus/Grafana. Static validation does not replace a fresh end-to-end deployment.",
  ],
  "devorecruiter": [
    "Assistant de recrutement à plusieurs services : interface Angular, BFF NestJS, RAG FastAPI et automatisations n8n.",
    "Multi-service recruiting assistant with Angular, a NestJS BFF, FastAPI RAG and n8n workflows.",
  ],
  "devorecruiter-gitops": [
    "Charts Helm et applications Argo CD pour les cinq services de DevoRecruiter.",
    "Helm charts and Argo CD Applications for the five DevoRecruiter services.",
  ],
  "devsecops-incident-platform": [
    "API de gestion d’incidents avec PostgreSQL, métriques, tests et contrôles DevSecOps.",
    "Incident-management API with PostgreSQL, metrics, tests and DevSecOps checks.",
  ],
  "gitops-delivery-platform": [
    "Livraison déclarative d’une application sur kind avec Kustomize, Argo CD et ressources de supervision.",
    "Declarative delivery to a kind cluster with Kustomize, Argo CD and monitoring manifests.",
  ],
  "openstack-heat-infrastructure": [
    "Infrastructure OpenStack décrite avec Heat : réseaux, instances, volumes et groupes de sécurité.",
    "OpenStack infrastructure defined with Heat: networks, instances, volumes and security groups.",
  ],
  "kubernetes-anomaly-detection-openstack": [
    "Détection d’anomalies Kubernetes avec Isolation Forest à partir de métriques Prometheus.",
    "Kubernetes anomaly detection using Isolation Forest on Prometheus metrics.",
  ],
  "flask-azure-devops-pipeline": [
    "Application Flask conteneurisée, pipeline GitHub Actions et configuration Terraform pour Azure.",
    "Containerised Flask application, GitHub Actions pipeline and Terraform configuration for Azure.",
  ],
  "alif-app": [
    "Plateforme de soutien animal avec Angular, passerelle Spring Cloud et microservices Spring Boot.",
    "Animal welfare platform with Angular, a Spring Cloud gateway and Spring Boot microservices.",
  ],
  "Alif.tn-App-k8s": [
    "Manifestes Kubernetes et MetalLB pour les services Alif sur un cloud privé.",
    "Kubernetes and MetalLB manifests for Alif services on a private cloud.",
  ],
};
