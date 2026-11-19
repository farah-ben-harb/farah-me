# Skills inventory

The skills section summarizes documented implementation and configuration work, not certifications, proficiency scores or proof of production operations. `lib/skills.ts` is separate from the three navigation domains in the systems map.

## Sources

The existing bilingual case studies in `lib/project-details.ts` take precedence over older snapshots in `lib/portfolio-data.ts`. The latter supplies project identities and technology arrays when not overridden. Internship tools are in `lib/portfolio-copy.ts`.

| Scope | Evidence used |
| --- | --- |
| Cloud/IaC | OpenStack Heat: Nova, Neutron, Cinder, Heat; CRM deployment/architecture: AWS S3, ECR, EC2, SSM; FootballMatch: Azure Container Apps; Devoteam: Azure, Terraform; Ansible in Kubernetes automation |
| Containers/GitOps | Kubernetes automation architecture: containerd, kubeadm, Calico; GitOps Delivery: Kustomize, Argo CD and kind configuration; Alif manifests: MetalLB; Docker Compose in FootballMatch and Incident Platform |
| CI/security | FootballMatch validation: pytest, Ruff, Gitleaks, Semgrep, Trivy; Incident Platform: Jenkinsfile (configured, not a proven server execution); GitHub Actions/GHCR in project sources; Git/GitHub and ESLint in this portfolio |
| Operations | Kubernetes monitoring: Prometheus, Grafana, Alertmanager; Devoteam: Dynatrace; Tunisie Telecom: Linux, TCP/IP and routing |
| Languages/desktop | Python/Java internships; C/SDL in Quantum Escape; C++/Qt/Arduino in SmartFarm; C#/.NET in Airport; TypeScript in Campus Ideas; SQL agent in DevoRecruiter; YAML infrastructure; JavaScript scripts in this portfolio |
| Application frameworks | Angular/Bootstrap/JSON Server in Campus Ideas; Angular, Spring Boot, Spring Cloud and Eureka in Alif; NestJS/FastAPI in DevoRecruiter; Flask project; this portfolio's package.json, TSX and CSS for React, Next.js, Tailwind CSS, HTML and CSS |
| Storage | DevoRecruiter: PostgreSQL and ChromaDB; Alif: MySQL; FootballMatch deployment paths: SQLite and pgvector; Incident Platform: SQLAlchemy; Campus Ideas: JSON Server |
| ML | FootballMatch architecture: YOLO11, ByteTrack, OpenCV, K-Means; CRM: TF-IDF, logistic regression, scikit-learn; Anomaly Detection: Isolation Forest |
| AI platforms | CRM: Kubeflow Pipelines and MLflow; FootballMatch: optional Model Registry and Ollama; DevoRecruiter: LangChain, HuggingFace, Groq, RAG and n8n; Cryptocurrency: Jupyter; Devoteam: MCP and Claude Desktop |

## Scope and limits

The retained local reports `PROJECT_ARCHITECTURE_VALIDATION.md` and `CV_GITHUB_GAP_ANALYSIS.md` additionally document Bandit in CRM validation, ShellCheck in Kubernetes hardening, Nginx in its Ansible orchestration and sentence-transformers in the DevoRecruiter RAG configuration. These reports establish code/configuration or static validation, not live external API usage. Optional SonarQube/OWASP stages without execution evidence are not added as established tools.

- Only specific tools, languages and named practices are listed. Generic labels `web modules`, `AI/prediction`, `machine learning`, `n-tier architecture` and `Private cloud` are not additional tools. Their context remains in the case studies.
- Angular 18 is normalized to Angular, Scikit-learn to scikit-learn, Pytest to pytest and Kubeflow to Kubeflow Pipelines. Routing and logistic regression are translated in English.
- Infrastructure tools may be represented by authored templates/manifests, not a current live deployment. In particular kind, MetalLB and Jenkins must not imply a verified running cluster or pipeline.
- MLflow Registry and Ollama are optional FootballMatch paths, not its default YOLO inference path. ChromaDB remains subject to the security limitations stated in DevoRecruiter's case study.
- No extra technologies are inferred from a framework's ecosystem. Tools without existing logo assets use a neutral symbol rather than an invented brand logo.
- The HTTP regression test checks that specific technology tags from every project page and internship are covered by the skills section, with no duplicate skill labels. It does not independently attest production use or individual contributions.
