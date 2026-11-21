import Image from "next/image";
import {
  Bell, BracketsCurly, ChartLine, Cube, Database, Eye,
  GameController, GitBranch, Globe, HardDrives, Key, Lightning,
  MagnifyingGlass, Network, Plug, ShieldCheck, Stack, TerminalWindow,
  TextT, Tree,
} from "@phosphor-icons/react/dist/ssr";

const logos: Record<string, string> = {
  Azure: "azure", AWS: "amazonwebservices", OpenStack: "openstack",
  Terraform: "terraform", Ansible: "ansible", Linux: "linux",
  Kubernetes: "kubernetes", Helm: "helm", "Argo CD": "argocd",
  "GitHub Actions": "githubactions", Prometheus: "prometheus", Grafana: "grafana",
  FastAPI: "fastapi", "scikit-learn": "scikitlearn", "Scikit-learn": "scikitlearn",
  Python: "python", Java: "java", Docker: "docker", Angular: "angular",
  "Angular 18": "angular", NestJS: "nestjs", PostgreSQL: "postgresql",
  Jenkins: "jenkins", Flask: "flask", "Spring Boot": "spring",
  MySQL: "mysql", "C++": "cplusplus", Qt: "qt", Arduino: "arduino",
  "C#": "csharp", ".NET": "dot-net", C: "c", Jupyter: "jupyter",
  TypeScript: "typescript", Bootstrap: "bootstrap", YAML: "yaml", K3s: "k3s",
  "Azure Container Apps": "azure", "AWS S3": "amazonwebservices", "AWS EC2": "amazonwebservices",
  "AWS ECR": "amazonwebservices", "AWS SSM": "amazonwebservices", "Docker Compose": "docker", "Spring Cloud": "spring",
  Heat: "openstack", Nova: "openstack", Neutron: "openstack", Cinder: "openstack",
  Vercel: "vercel", Git: "git", GitHub: "github", GHCR: "github",
  containerd: "containerd", pytest: "pytest", Ruff: "ruff", Trivy: "trivy",
  ESLint: "eslint", Dynatrace: "dynatrace", Nginx: "nginx", Bash: "bash",
  JavaScript: "javascript", React: "react", "Next.js": "nextjs",
  "Tailwind CSS": "tailwindcss", HTML: "html5", CSS: "css3",
  SQLite: "sqlite", SQLAlchemy: "sqlalchemy", pgvector: "postgresql",
  OpenCV: "opencv", PyTorch: "pytorch", YOLO11: "ultralytics",
  MLflow: "mlflow", "MLflow Model Registry": "mlflow",
  "Kubeflow Pipelines": "kubeflow", LangChain: "langchain",
  HuggingFace: "huggingface", "sentence-transformers": "huggingface",
  Ollama: "ollama", n8n: "n8n", "Claude Desktop": "claude", Eureka: "spring",
};

const symbols: Record<string, typeof BracketsCurly> = {
  Kustomize: Stack, kubeadm: Cube, Calico: Network, MetalLB: Network,
  kind: Cube, PVC: HardDrives, GitOps: GitBranch,
  Gitleaks: ShieldCheck, Semgrep: MagnifyingGlass, Bandit: ShieldCheck,
  ShellCheck: TerminalWindow, "pip-audit": ShieldCheck,
  "Gestion des secrets": Key, "Secrets management": Key,
  Alertmanager: Bell, "TCP/IP": Network, Routage: Network, Routing: Network,
  "Adressage IP": Globe, "IP addressing": Globe,
  SQL: Database, SDL: GameController,
  "API Gateway": Network, "API REST": Globe, "REST API": Globe,
  "JSON Server": BracketsCurly, ChromaDB: Database,
  ByteTrack: Eye, "K-Means": ChartLine, "Isolation Forest": Tree,
  "TF-IDF": TextT, "Régression logistique": ChartLine,
  "Logistic regression": ChartLine, Groq: Lightning, RAG: MagnifyingGlass,
  MCP: Plug,
};

function ToolIcon({ tool }: { tool: string }) {
  const logo = logos[tool];
  if (logo) return <Image className="tool-logo" src={`/tool-icons/${logo}.svg`} width={21} height={21} alt="" aria-hidden="true" unoptimized />;
  const Icon = symbols[tool] ?? BracketsCurly;
  return <Icon className={symbols[tool] ? "tool-symbol" : "tool-fallback"} aria-hidden="true" />;
}

export function TechStack({ tools }: { tools: readonly string[] }) {
  return (
    <ul className="stack" aria-label="Technologies">
      {tools.map((tool) => (
        <li key={tool}>
          <ToolIcon tool={tool} />
          <span>{tool}</span>
        </li>
      ))}
    </ul>
  );
}
