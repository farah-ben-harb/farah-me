export type Project = {
  name: string;
  repository: string;
  summary: string;
  problem: string;
  technologies: string[];
  architecture: string;
  completed: string[];
  validation: string;
  infrastructure: string;
  limitations: string[];
  status: string;
  liveDemo?: string;
  demoLabel?: string;
  media?: {
    src: string;
    alt: string;
    caption: string;
  };
};

const github = "https://github.com/farah-ben-harb";

export const projects: Project[] = [
  {
    name: "FootballMatch AI Platform",
    repository: `${github}/footballmatch-ai-platform-mlops`,
    summary:
      "A CPU-first football video analysis platform with a verified public API demo and a documented path from local inference to Kubernetes.",
    problem:
      "Turn football footage into annotated video and structured player, tracking, and team-colour outputs while making the ML lifecycle observable and deployable.",
    technologies: [
      "Python",
      "FastAPI",
      "YOLO11",
      "ByteTrack",
      "OpenCV",
      "MLflow",
      "Kubeflow",
      "K3s",
      "Helm",
      "Prometheus",
    ],
    architecture:
      "FastAPI coordinates video jobs and inference; OpenCV, YOLO11n, ByteTrack, and KMeans produce analysis outputs. MLflow tracks experiments, optional RAG uses pgvector and Ollama, and Helm packages the service for K3s with Prometheus/Grafana observability.",
    completed: [
      "Upload, asynchronous analysis, job status, result, health, readiness, and API documentation endpoints.",
      "Local CPU inference, annotated output generation, MLflow tracking, Helm charts, and K3s deployment documentation.",
      "Optional RAG indexing and retrieval path for project documentation.",
    ],
    validation:
      "Latest inspected GitHub Actions run passed Ruff, pytest, Gitleaks, Semgrep, Docker build, Trivy filesystem/image scans, and GHCR publication.",
    infrastructure:
      "Docker Compose locally; Helm/K3s assets; verified Azure Container Apps demo in France Central using SQLite for the demo profile.",
    limitations: [
      "The live demo is CPU-only, scales to zero, stores job state in-process, and uses ephemeral output storage.",
      "A production deployment still needs durable PostgreSQL, object storage, queue workers, authentication, and a defined TLS policy.",
    ],
    status: "Live API verified",
    liveDemo:
      "https://footballmatch-api-demo2.nicewater-00626e15.francecentral.azurecontainerapps.io/docs",
    demoLabel: "Open API demo",
  },
  {
    name: "CRM Intelligence MLOps",
    repository: `${github}/crm-intelligence-mlops`,
    summary:
      "An educational profile-classification service that exposes a small reproducible ML workflow through FastAPI and MLflow.",
    problem:
      "Classify synthetic CRM profiles through a traceable API while exercising model packaging, experiment tracking, infrastructure automation, and DevSecOps gates.",
    technologies: [
      "Python",
      "FastAPI",
      "Scikit-learn",
      "TF-IDF",
      "MLflow",
      "Docker",
      "Terraform",
      "Ansible",
      "GitHub Actions",
    ],
    architecture:
      "FastAPI serves a TF-IDF and logistic-regression artefact; MLflow records experiments. Docker Compose runs the local stack, Terraform manages its Docker network, and Ansible supports local configuration.",
    completed: [
      "Balanced synthetic training dataset, training workflow, persisted model, prediction API, and MLflow experiment tracking.",
      "Containerized local stack plus Terraform and Ansible automation examples.",
    ],
    validation:
      "Latest inspected CI passed tests, Ruff, Bandit, Gitleaks, Trivy scans, Docker build, and GHCR publication.",
    infrastructure:
      "Local Docker infrastructure only. The repository does not evidence an AWS deployment.",
    limitations: [
      "The dataset contains only 30 synthetic profiles and is not suitable for production decisions.",
      "Profiles and MLflow use local/in-memory or SQLite storage; deployment remains manual and local.",
    ],
    status: "CI passing; local only",
  },
  {
    name: "DevoRecruiter",
    repository: `${github}/devorecruiter`,
    summary:
      "A multi-service recruiting assistant combining an Angular interface, NestJS BFF, FastAPI RAG service, and infrastructure automation.",
    problem:
      "Support recruiter workflows with document-aware assistance while separating frontend, orchestration, AI, workflow automation, and cloud infrastructure concerns.",
    technologies: [
      "Angular",
      "NestJS",
      "FastAPI",
      "RAG",
      "n8n",
      "Terraform",
      "Docker",
      "GitHub Actions",
    ],
    architecture:
      "Angular frontend communicates through a NestJS BFF to a FastAPI RAG backend. Sanitized n8n workflows cover automation, while Terraform defines the Azure-oriented infrastructure path.",
    completed: [
      "Frontend, BFF, FastAPI service, Docker images, runtime smoke checks, sanitized n8n exports, and Terraform validation stages.",
      "PDF-processing smoke path and independent service pipelines.",
    ],
    validation:
      "In the latest inspected workflow, frontend, BFF, FastAPI, Terraform validation, secret scan, and n8n validation passed. Dependency-audit and FastAPI security gates failed, so publishing and the GitOps update were skipped.",
    infrastructure:
      "Terraform contains Azure infrastructure definitions; no currently reachable public application deployment was verified.",
    limitations: [
      "The latest overall pipeline is red because dependency/security gates require remediation.",
      "No public end-to-end environment or live demo is evidenced.",
    ],
    status: "Core jobs pass; security gates red",
  },
  {
    name: "DevoRecruiter GitOps",
    repository: `${github}/devorecruiter-gitops`,
    summary:
      "The deployment-side companion for DevoRecruiter, with Helm, Argo CD, environment values, and an MCP infrastructure service.",
    problem:
      "Keep application deployment configuration versioned and separate from source code while preparing repeatable GitOps promotion between environments.",
    technologies: ["Helm", "Argo CD", "Kubernetes", "GitOps", "MCP", "PostgreSQL", "n8n"],
    architecture:
      "Helm charts package the frontend, BFF, FastAPI, n8n, and PostgreSQL components. Argo CD applications and projects reference environment-specific values; an MCP service exposes infrastructure operations.",
    completed: [
      "Application Helm charts, Argo CD definitions, environment values, and MCP infrastructure server workflow.",
    ],
    validation:
      "Latest inspected GitHub Actions run for the MCP infrastructure server passed.",
    infrastructure:
      "Kubernetes and Argo CD configuration is present, but the repository documents this as a Phase 5 preparation state.",
    limitations: [
      "No Kubernetes deployment, Azure resource, or Argo CD installation is evidenced by the repository.",
      "The manifests are deployment preparation, not proof of a running environment.",
    ],
    status: "GitOps prepared; not deployed",
  },
  {
    name: "DevSecOps Incident Platform",
    repository: `${github}/devsecops-incident-platform`,
    summary:
      "A small incident-management API used to demonstrate tested application delivery, security scanning, and GitOps hand-off.",
    problem:
      "Provide an auditable service around incident CRUD while integrating the delivery and security controls expected in a DevSecOps pipeline.",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Pytest",
      "Docker",
      "Jenkins",
      "Gitleaks",
      "Trivy",
      "Prometheus",
    ],
    architecture:
      "FastAPI exposes incident CRUD, health, readiness, and metrics endpoints backed by PostgreSQL. Docker Compose provides local services; Jenkinsfile stages cover scanning, image publication, and GitOps updates.",
    completed: [
      "Incident API, database integration, health/readiness/metrics endpoints, pytest suite, Docker Compose stack, and Jenkins pipeline definition.",
    ],
    validation:
      "Latest public GitHub Actions application-test run passed. Jenkins scanning and delivery stages are configured, but a public Jenkins execution record was not found.",
    infrastructure:
      "Local Docker Compose plus Jenkins/GHCR/GitOps integration points; no public runtime endpoint verified.",
    limitations: [
      "Configured Jenkins execution is not equivalent to a verified public pipeline run.",
      "No live deployment is currently evidenced.",
    ],
    status: "Application tests passing",
  },
  {
    name: "GitOps Delivery Platform",
    repository: `${github}/gitops-delivery-platform`,
    summary:
      "Kustomize and Argo CD delivery configuration for promoting a containerized service into a local Kubernetes environment.",
    problem:
      "Make desired cluster state reviewable and automatically reconcilable, with monitoring assets included alongside the application manifests.",
    technologies: ["Kubernetes", "Kustomize", "Argo CD", "GHCR", "Prometheus", "Grafana", "kind"],
    architecture:
      "Kustomize base and local-kind overlay feed an Argo CD Application configured for automated sync, pruning, and self-healing. A ServiceMonitor and Grafana dashboard cover observability.",
    completed: [
      "Base and overlay manifests, Argo CD project/application, image-pull secret instructions, ServiceMonitor, dashboard, and operational runbook.",
    ],
    validation:
      "No GitHub Actions run is present. Validation is limited to the checked-in manifests and documented runbook.",
    infrastructure:
      "Designed for a local kind cluster pulling a private GHCR image.",
    limitations: [
      "The repository does not prove a currently running cluster or successful reconciliation.",
      "Registry credentials and cluster prerequisites must be supplied by the operator.",
    ],
    status: "Runbook and manifests only",
  },
  {
    name: "OpenStack Heat Infrastructure",
    repository: `${github}/openstack-heat-infrastructure`,
    summary:
      "Heat templates for a lab-scale OpenStack environment spanning compute, networking, storage, and security groups.",
    problem:
      "Describe repeatable private-cloud resources as code instead of relying on manual OpenStack provisioning.",
    technologies: ["OpenStack", "Heat", "YAML", "Nova", "Neutron", "Cinder", "Linux"],
    architecture:
      "Heat templates define networks, subnets, routers, security groups, compute instances, volumes, and floating-IP associations with environment-specific parameters.",
    completed: [
      "Compute, network, storage, security-group, and floating-IP template coverage plus deployment documentation.",
    ],
    validation:
      "Static YAML/template checks are documented; no repository CI or recent environment-dependent OpenStack deployment is evidenced.",
    infrastructure:
      "Targets an OpenStack lab and requires valid images, flavours, networks, and credentials from that environment.",
    limitations: [
      "A historical password hash exists in Git history and should be treated as compromised.",
      "Some lab security groups expose broad 0.0.0.0/0 access, including database-related ports; they are not production-safe defaults.",
    ],
    status: "Lab IaC; no recent live proof",
  },
  {
    name: "Kubernetes Cluster Automation",
    repository: `${github}/k8s-cluster-automation`,
    summary:
      "Ansible roles and playbooks for building a Kubernetes lab on OpenStack Ubuntu nodes with an observability stack.",
    problem:
      "Reduce manual control-plane and worker setup while keeping cluster and monitoring configuration repeatable.",
    technologies: [
      "Ansible",
      "Kubernetes",
      "containerd",
      "Calico",
      "OpenStack",
      "Prometheus",
      "Grafana",
      "Alertmanager",
    ],
    architecture:
      "Ansible configures containerd and Kubernetes prerequisites, initializes the control plane, joins workers, applies Calico, and installs monitoring resources.",
    completed: [
      "Control-plane and worker automation, networking setup, and Prometheus/Grafana/Alertmanager configuration assets.",
    ],
    validation:
      "A November 2026 repository audit validated YAML and removed SMTP credentials. No fresh end-to-end OpenStack/Kubernetes execution is publicly evidenced.",
    infrastructure:
      "OpenStack Ubuntu lab nodes with Kubernetes and containerd.",
    limitations: [
      "A historical SMTP credential must be rotated even though it was removed from the current tree.",
      "The playbooks remain lab-oriented and need an environment-specific end-to-end rerun.",
    ],
    status: "Configuration audited; rerun needed",
  },
  {
    name: "Kubernetes Anomaly Detection",
    repository: `${github}/kubernetes-anomaly-detection-openstack`,
    summary:
      "A FastAPI service that queries Prometheus metrics and applies Isolation Forest to identify Kubernetes anomalies.",
    problem:
      "Turn cluster telemetry into a simple anomaly signal that can be queried and monitored from an OpenStack-hosted Kubernetes environment.",
    technologies: ["Python", "FastAPI", "Prometheus", "Scikit-learn", "Isolation Forest", "Docker", "Kubernetes"],
    architecture:
      "FastAPI queries Prometheus, standardizes metric history, trains an Isolation Forest model, and exposes detection and service-metrics endpoints through a containerized Kubernetes deployment.",
    completed: [
      "Prometheus query integration, model training/detection path, /detect and /metrics endpoints, Docker image, and Kubernetes manifest.",
    ],
    validation:
      "No CI run or automated test evidence was found in the repository.",
    infrastructure:
      "Designed for Kubernetes on OpenStack with an accessible Prometheus endpoint.",
    limitations: [
      "The service can start without Prometheus, but detection returns 503 until training succeeds.",
      "Model quality depends on sufficient metric history and correctly configured query labels.",
    ],
    status: "Prototype; no CI evidence",
  },
  {
    name: "Flask Azure DevOps Pipeline",
    repository: `${github}/flask-azure-devops-pipeline`,
    summary:
      "A Flask delivery project connecting tests and container builds to Terraform-based Azure VM provisioning and monitoring assets.",
    problem:
      "Demonstrate a complete path from application commit to tested container and cloud infrastructure definition.",
    technologies: ["Flask", "Python", "Pytest", "Docker", "GitHub Actions", "Terraform", "Azure", "Prometheus", "Grafana"],
    architecture:
      "GitHub Actions tests and builds the Flask application; Terraform defines an Azure Linux VM path; Prometheus, Grafana, and Alertmanager assets cover monitoring.",
    completed: [
      "Flask application, tests, Docker build, CI workflow, Terraform Azure definitions, and observability configuration.",
    ],
    validation:
      "Application CI has successful public runs. The latest inspected Terraform workflow runs failed, so current Azure provisioning is not claimed.",
    infrastructure:
      "Terraform targets an Azure Linux VM; no reachable deployed application URL was verified.",
    limitations: [
      "Terraform workflow failures require investigation before treating provisioning as repeatable.",
      "No current live demo or active Azure environment is evidenced.",
    ],
    status: "App CI passing; Terraform red",
  },
  {
    name: "Alif Application",
    repository: `${github}/alif-app`,
    summary:
      "A broad animal-support application with Angular, Spring Boot microservices, service discovery, gateway routing, and AI-oriented modules.",
    problem:
      "Coordinate user, donation, food-stock, veterinary, and related animal-support workflows across a modular service architecture.",
    technologies: ["Angular", "Spring Boot", "Java", "Eureka", "API Gateway", "MySQL", "Python", "Docker"],
    architecture:
      "Angular frontend connects through a Spring Cloud gateway to Eureka-registered microservices for users, donations, stock, veterinary workflows, and related domains, backed by MySQL and additional AI/ML modules.",
    completed: [
      "Frontend modules, gateway, discovery service, domain microservices, data services, and checked-in visual media.",
    ],
    validation:
      "No application CI workflow execution was found; repository activity is limited to dependency-graph automation, and README test commands are not proof of execution.",
    infrastructure:
      "Local microservice stack. A frontend Vercel configuration exists, but no public deployment record or working URL was verified.",
    limitations: [
      "The multi-service system has no verified public end-to-end environment.",
      "Automated application test and build evidence is currently missing.",
    ],
    status: "Implemented; no verified deployment",
    media: {
      src: "/project-media/alif-donations.webp",
      alt: "Colourful donations visual from the Alif application repository",
      caption: "Repository media for the donations module; not a live-deployment screenshot.",
    },
  },
  {
    name: "Alif Kubernetes Manifests",
    repository: `${github}/Alif.tn-App-k8s`,
    summary:
      "Kubernetes and MetalLB manifests that prepare the Alif services for a private-cloud deployment.",
    problem:
      "Map a multi-service application onto Kubernetes resources with internal service discovery and private-cloud load balancing.",
    technologies: ["Kubernetes", "MetalLB", "MySQL", "Docker", "Private cloud", "YAML"],
    architecture:
      "Deployments and Services describe Alif components, MySQL, and MetalLB exposure for a private-cloud cluster.",
    completed: [
      "Application deployment/service manifests, MySQL resources, and MetalLB configuration examples.",
    ],
    validation:
      "No CI run or evidence of a running cluster was found; the repository README explicitly documents that gap.",
    infrastructure:
      "Targets a Kubernetes private cloud with MetalLB.",
    limitations: [
      "MySQL uses a Deployment and emptyDir rather than durable StatefulSet storage.",
      "Empty password settings, mutable :dev images, and an unwired example secret make the current manifests unsuitable for production.",
    ],
    status: "Manifests only; hardening required",
  },
];

export const otherProjects = [
  {
    name: "Airport Management System",
    repository: `${github}/Application-Airport-Management`,
    stack: "C# · .NET · n-tier architecture",
    summary: "Layered airport operations project covering flights, passengers, resources, services, and persistence.",
  },
  {
    name: "WeFarm Smart Agriculture",
    repository: `${github}/wefarm-smart-agriculture-platform`,
    stack: "Java · web modules · AI/prediction",
    summary: "Agricultural management platform for land, events, jobs, products, equipment, and stakeholder workflows.",
  },
  {
    name: "Quantum Escape",
    repository: `${github}/QuantumEscape-Game-2D-SDL`,
    stack: "C · SDL",
    summary: "A 2D action game with rendering, state management, levels, enemies, puzzles, sound, and save/load logic.",
  },
  {
    name: "SmartFarm Desktop",
    repository: `${github}/SmartFarm-Desktop-Application`,
    stack: "C++ · Qt · Arduino",
    summary: "Desktop farm operations tool for stock, sales, suppliers, equipment, events, and basic hardware automation.",
  },
  {
    name: "Cryptocurrency Analysis",
    repository: `${github}/CryptoCurrency-Project`,
    stack: "Python · Jupyter · machine learning",
    summary: "Notebook workflow for market exploration, direction classification, price prediction, and model comparison.",
  },
  {
    name: "Campus Ideas SPA",
    repository: `${github}/CampusIdeas-SPA`,
    stack: "Angular 18 · TypeScript · Bootstrap",
    summary: "Modular SPA for campus suggestions with reactive forms, lazy routing, CRUD, filtering, and REST/JSON Server support.",
  },
] as const;

export const resumeTracks = [
  {
    name: "Cloud Engineering",
    slug: "cloud-engineering",
    description: "Cloud platforms, infrastructure as code, delivery automation, security, and SRE foundations.",
  },
  {
    name: "Infrastructure / DevOps",
    slug: "infrastructure-devops",
    description: "Linux, networking, OpenStack, Kubernetes automation, observability, and reliability workflows.",
  },
  {
    name: "MLOps",
    slug: "mlops",
    description: "ML lifecycle, computer vision, RAG, model tracking, cloud-native delivery, and observability.",
  },
] as const;
