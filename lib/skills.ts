// Source-backed inventory; see SKILLS_EVIDENCE.md for context and exclusions.
export const skillGroups = [
  {
    id: "cloud", title: ["Cloud & infrastructure", "Cloud & infrastructure"],
    tools: ["Azure", "Azure Container Apps", "AWS", "AWS S3", "AWS EC2", "AWS ECR", "AWS SSM", "OpenStack", "Heat", "Nova", "Neutron", "Cinder", "Terraform", "Ansible", "Vercel"],
    projects: ["openstack-heat-infrastructure", "crm-intelligence-mlops"],
  },
  {
    id: "containers", title: ["Conteneurs & GitOps", "Containers & GitOps"],
    tools: ["Docker", "Docker Compose", "Kubernetes", "K3s", "Helm", "Argo CD", "Kustomize", "containerd", "kubeadm", "Calico", "MetalLB", "kind", "PVC", "GitOps"],
    projects: ["k8s-cluster-automation", "gitops-delivery-platform", "Alif.tn-App-k8s"],
  },
  {
    id: "security", title: ["CI/CD, tests & sécurité", "CI/CD, testing & security"],
    tools: ["Git", "GitHub", "GitHub Actions", "Jenkins", "GHCR", "pytest", "Ruff", "Gitleaks", "Semgrep", "Trivy", "Bandit", "ShellCheck", "ESLint", "pip-audit", "Gestion des secrets"],
    projects: ["devsecops-incident-platform", "footballmatch-ai-platform-mlops"],
    note: ["Jenkins : pipeline défini, sans exécution de serveur attestée.", "Jenkins: pipeline defined, without an evidenced server execution."],
  },
  {
    id: "operations", title: ["Observabilité & réseaux", "Observability & networking"],
    tools: ["Prometheus", "Grafana", "Alertmanager", "Dynatrace", "Linux", "Nginx", "TCP/IP", "Routage", "Adressage IP"],
    projects: ["k8s-cluster-automation"], experience: true,
  },
  {
    id: "languages", title: ["Langages, desktop & IoT", "Languages, desktop & IoT"],
    tools: ["Python", "Java", "C", "C++", "C#", "TypeScript", "JavaScript", "YAML", "SQL", "Qt", "SDL", "Arduino", "Bash"],
    projects: ["SmartFarm-Desktop-Application", "QuantumEscape-Game-2D-SDL", "Application-Airport-Management"],
  },
  {
    id: "applications", title: ["Web & services applicatifs", "Web & application services"],
    tools: ["Angular", "Bootstrap", "React", "Next.js", "Tailwind CSS", "HTML", "CSS", "FastAPI", "Flask", "NestJS", "Spring Boot", "Spring Cloud", "Eureka", "API Gateway", ".NET", "API REST"],
    projects: ["alif-app", "devorecruiter", "CampusIdeas-SPA"],
  },
  {
    id: "data", title: ["Données & persistance", "Data & persistence"],
    tools: ["PostgreSQL", "MySQL", "SQLite", "SQLAlchemy", "pgvector", "ChromaDB", "JSON Server"],
    projects: ["devorecruiter", "footballmatch-ai-platform-mlops", "CampusIdeas-SPA"],
  },
  {
    id: "ml", title: ["Machine learning & vision", "Machine learning & vision"],
    tools: ["scikit-learn", "YOLO11", "ByteTrack", "OpenCV", "K-Means", "Isolation Forest", "TF-IDF", "Régression logistique", "PyTorch"],
    projects: ["footballmatch-ai-platform-mlops", "crm-intelligence-mlops", "kubernetes-anomaly-detection-openstack"],
  },
  {
    id: "ai-platforms", title: ["MLOps, RAG & automatisation", "MLOps, RAG & automation"],
    tools: ["MLflow", "MLflow Model Registry", "Kubeflow Pipelines", "Jupyter", "LangChain", "HuggingFace", "sentence-transformers", "Groq", "Ollama", "RAG", "n8n", "MCP", "Claude Desktop"],
    projects: ["crm-intelligence-mlops", "devorecruiter"], experience: true,
  },
] as const;

export function skillLabel(tool: string, locale: "fr" | "en") {
  if (locale === "en" && tool === "Adressage IP") return "IP addressing";
  if (locale === "en" && tool === "Gestion des secrets") return "Secrets management";
  if (locale === "en" && tool === "API REST") return "REST API";
  if (locale === "en" && tool === "Routage") return "Routing";
  if (locale === "en" && tool === "Régression logistique") return "Logistic regression";
  return tool;
}
