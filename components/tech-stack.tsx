import Image from "next/image";
import { BracketsCurly } from "@phosphor-icons/react/dist/ssr";

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
};

export function TechStack({ tools }: { tools: readonly string[] }) {
  return (
    <ul className="stack" aria-label="Technologies">
      {tools.map((tool) => (
        <li key={tool}>
          {logos[tool]
            ? <Image className="tool-logo" src={`/tool-icons/${logos[tool]}.svg`} width={21} height={21} alt="" aria-hidden="true" unoptimized />
            : <BracketsCurly className="tool-fallback" aria-hidden="true" />}
          <span>{tool}</span>
        </li>
      ))}
    </ul>
  );
}
