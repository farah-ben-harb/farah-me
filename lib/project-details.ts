import { otherProjects, projects } from "./portfolio-data";
import type { Locale } from "./portfolio-copy";

type Text = readonly [string, string];
type Detail = {
  description: Text;
  architecture: Text;
  flow: readonly Text[];
  features: readonly Text[];
  validation: Text;
  deployment: Text;
  limits: readonly Text[];
  related?: readonly string[];
  technologies?: string[];
  evidence?: string;
};

// Editorial facts come from the repositories and existing validation reports,
// not from the presence of a deployment configuration alone.
const details: Record<string, Detail> = {
  "footballmatch-ai-platform-mlops": {
    description: ["Transformer une vidéo de football en vidéo annotée et en résultats structurés de détection, suivi et regroupement des joueurs.", "Turn football footage into annotated video and structured detection, tracking and player-clustering results."],
    architecture: ["FastAPI reçoit la vidéo et suit un traitement asynchrone local. OpenCV prépare les images, YOLO11n détecte, ByteTrack suit les objets et K-Means regroupe les couleurs. MLflow conserve paramètres, métriques et artefacts. Le modèle charge yolo11n.pt par défaut : l’alias Registry champion nécessite une configuration explicite.", "FastAPI accepts uploads and tracks process-local asynchronous jobs. OpenCV prepares frames, YOLO11n detects objects, ByteTrack tracks them and K-Means groups colours. MLflow records parameters, metrics and artifacts. Inference loads yolo11n.pt by default; the Registry champion alias requires explicit configuration."],
    flow: [["Vidéo", "Video"], ["FastAPI · jobs", "FastAPI · jobs"], ["YOLO11 · ByteTrack", "YOLO11 · ByteTrack"], ["Résultats · MLflow", "Results · MLflow"]],
    features: [["Upload, statut des traitements, résultats, vidéo annotée et documentation API.", "Upload, job status, results, annotated video and API documentation."], ["Healthchecks, métriques Prometheus et traçabilité des entrées et artefacts MLflow.", "Health checks, Prometheus metrics and input/artifact traceability through MLflow."], ["Registry optionnel : enregistrement candidat, smoke test et promotion explicite.", "Optional Registry: candidate registration, smoke testing and explicit promotion."]],
    validation: ["Les rapports de validation documentent pytest, Ruff, Gitleaks, Semgrep, Trivy et la validation Compose. Le lien de démonstration donne accès à la documentation API ; ce n’est pas une interface de montage vidéo.", "Validation reports document pytest, Ruff, Gitleaks, Semgrep, Trivy and Compose checks. The demo opens API documentation, not a video-editing interface."],
    deployment: ["Compose : FastAPI, PostgreSQL/pgvector, MLflow et volumes. K3s : API sous Helm, avec MLflow/PostgreSQL/Ollama sur la VM. Azure Container Apps : chemin indépendant depuis GHCR, stockage éphémère et MLflow SQLite. Prometheus/Grafana sont optionnels via un overlay sur la VM ; Azure expose /metrics sans stack de supervision démontrée.", "Compose: FastAPI, PostgreSQL/pgvector, MLflow and volumes. K3s: Helm-managed API, with MLflow/PostgreSQL/Ollama on the VM host. Azure Container Apps: an independent GHCR path with ephemeral storage and SQLite-backed MLflow. Prometheus/Grafana are optional via a VM overlay; Azure exposes /metrics without an evidenced monitoring stack."],
    limits: [["CPU, jobs en mémoire et stockage éphémère sur la démo Azure. Pas de garantie de disponibilité continue.", "CPU inference, in-memory jobs and ephemeral storage on the Azure demo. No continuous-availability guarantee."], ["Les groupes de couleurs ne prouvent pas l’identité des équipes. Une production multi-utilisateur demanderait authentification, file de jobs et stockage durable.", "Colour clusters do not prove team identity. Multi-user production would require authentication, a job queue and durable storage."]],
    technologies: ["Python", "FastAPI", "YOLO11", "ByteTrack", "OpenCV", "MLflow", "Docker", "K3s", "Helm", "Argo CD", "Prometheus", "Grafana"],
  },
  "crm-intelligence-mlops": {
    description: ["Classer des profils techniques Backend, DevOps et MLOps, avec un parcours reproductible de l’entraînement à l’API de prédiction.", "Classify Backend, DevOps and MLOps profiles through a reproducible path from training to a prediction API."],
    architecture: ["TF-IDF et régression logistique transforment les compétences en prédictions. Kubeflow Pipelines sur K3s orchestre les étapes et un seuil F1 macro contrôle l’enregistrement du candidat dans MLflow. FastAPI expose le modèle ; le parcours AWS utilise S3 et un canary EC2 séparé.", "TF-IDF and logistic regression turn skills into predictions. Kubeflow Pipelines on K3s orchestrates the steps and a macro F1 gate controls candidate registration in MLflow. FastAPI serves the model; the AWS path uses S3 and a separate EC2 canary."],
    flow: [["Profils synthétiques", "Synthetic profiles"], ["Kubeflow · entraînement", "Kubeflow · training"], ["MLflow · candidat", "MLflow · candidate"], ["FastAPI · canary", "FastAPI · canary"]],
    features: [["Données synthétiques équilibrées, entraînement, validation et artefact versionné.", "Balanced synthetic data, training, validation and versioned model artifact."], ["API de prédiction, suivi MLflow et pipeline Kubeflow documenté.", "Prediction API, MLflow tracking and a documented Kubeflow pipeline."], ["Parcours de publication S3 et validation canary EC2 via SSM, sans promotion automatique en production.", "S3 release path and EC2 canary validation through SSM, without automatic production promotion."]],
    validation: ["Les preuves liées couvrent les tests, les scans et le build. Le README documente les validations ML et canary ; aucune nouvelle exécution AWS n’est revendiquée par ce portfolio.", "Linked evidence covers tests, scans and builds. The README documents ML and canary validation; this portfolio does not claim a newly executed AWS deployment."],
    deployment: ["Docker Compose local, Kubeflow sur K3s et parcours AWS S3/ECR/EC2 documenté. La mise en service d’un modèle reste distincte de son enregistrement.", "Local Docker Compose, Kubeflow on K3s and a documented AWS S3/ECR/EC2 path. Serving a model remains separate from registering it."],
    limits: [["30 profils synthétiques : les scores ne démontrent pas une généralisation à des données RH réelles.", "30 synthetic profiles: scores do not establish generalisation to real recruitment data."], ["Démonstrateur à instance unique, sans démo publique vérifiée ni promotion de production automatique.", "Single-instance demonstration, without a verified public demo or automatic production promotion."]],
    technologies: ["Python", "FastAPI", "scikit-learn", "MLflow", "Kubeflow", "K3s", "AWS", "Terraform", "Ansible", "Docker", "GitHub Actions"],
    evidence: "https://github.com/farah-ben-harb/crm-intelligence-mlops/actions/runs/43736282419",
  },
  devorecruiter: {
    description: ["Un assistant de recrutement qui associe interface web, orchestration métier et recherche dans les documents.", "A recruiting assistant combining a web interface, business orchestration and document retrieval."],
    architecture: ["Angular échange avec un BFF NestJS. FastAPI porte le RAG, avec embeddings HuggingFace, ChromaDB et génération Groq. L’agent LangChain et ses outils SQL interrogent PostgreSQL ; n8n prend en charge des automatisations.", "Angular communicates with a NestJS BFF. FastAPI provides RAG with HuggingFace embeddings, ChromaDB and Groq generation. The LangChain agent and SQL tools query PostgreSQL; n8n handles workflow automation."],
    flow: [["Angular", "Angular"], ["NestJS · BFF", "NestJS · BFF"], ["FastAPI · RAG", "FastAPI · RAG"], ["ChromaDB · documents", "ChromaDB · documents"]],
    features: [["Services frontend, BFF et RAG séparés, ingestion documentaire et réponses avec sources.", "Separate frontend, BFF and RAG services, document ingestion and source-backed responses."], ["Travail de durcissement OAuth, sessions, échanges HMAC et isolation des conversations documenté dans les PR de consolidation.", "OAuth, session, HMAC exchange and conversation-isolation hardening documented in the consolidation PRs."]],
    validation: ["Tests applicatifs, builds, smoke tests et audits sont séparés dans la CI. Le README signale un blocage de publication FastAPI lié aux advisories ChromaDB : une validation applicative ne vaut pas validation de sécurité complète.", "Application tests, builds, smoke tests and audits are separate CI controls. The README flags FastAPI publication as blocked by ChromaDB advisories: passing application tests is not full security approval."],
    deployment: ["Docker pour les services, Terraform pour le chemin Azure et dépôt Helm/Argo CD complémentaire. Aucun environnement public de bout en bout n’est annoncé.", "Docker services, Terraform for the Azure path and a companion Helm/Argo CD repository. No public end-to-end environment is claimed."],
    limits: [["Les gates de sécurité et les validations OAuth HTTPS/Kubernetes doivent être vérifiés avant une livraison réelle.", "Security gates and HTTPS/Kubernetes OAuth validation must be checked before a real release."], ["Les documents RH et credentials réels ne sont pas publiés comme démonstration.", "Real HR documents and credentials are not published as demo material."]],
    related: ["devorecruiter-gitops"],
  },
  "devorecruiter-gitops": {
    description: ["Séparer la configuration de livraison Kubernetes du code applicatif DevoRecruiter.", "Separate DevoRecruiter Kubernetes delivery configuration from application source code."],
    architecture: ["Cinq charts Helm décrivent Angular, NestJS BFF, FastAPI, n8n et PostgreSQL. Les Applications et AppProjects Argo CD référencent les valeurs d’environnement ; le dépôt comporte aussi un service MCP d’infrastructure.", "Five Helm charts describe Angular, the NestJS BFF, FastAPI, n8n and PostgreSQL. Argo CD Applications and AppProjects reference environment values; the repository also contains an infrastructure MCP service."],
    flow: [["Images applicatives", "Application images"], ["Valeurs Helm", "Helm values"], ["Argo CD", "Argo CD"], ["Kubernetes", "Kubernetes"]],
    features: [["Charts des cinq services, configurations d’environnement et références Argo CD.", "Five service charts, environment configuration and Argo CD references."], ["Configuration des Secrets externes et option de volume persistant Chroma.", "External Secret configuration and an optional persistent Chroma volume."]],
    validation: ["Les rendus Helm et contrôles de manifests sont des validations de configuration. L’état des Applications Argo CD et des services réels n’est pas attesté par une CI statique.", "Helm rendering and manifest checks validate configuration. Static CI does not establish the state of live Argo CD Applications or services."],
    deployment: ["Chemin Kubernetes/Helm/Argo CD dépendant de versions applicatives compatibles, des images publiées et des Secrets injectés hors Git.", "Kubernetes/Helm/Argo CD path dependent on compatible application versions, published images and Secrets injected outside Git."],
    limits: [["Une synchronisation exige de vérifier HTTPS, cookies OAuth, secret HMAC partagé, réseaux et sauvegardes.", "Synchronization requires checking HTTPS, OAuth cookies, the shared HMAC secret, networking and backups."], ["Aucune synchronisation Argo CD réelle n’est revendiquée ici.", "No actual Argo CD synchronization is claimed here."]],
    related: ["devorecruiter"],
  },
  "devsecops-incident-platform": {
    description: ["Gérer des incidents via une API, tout en rendant les contrôles de qualité et de sécurité reproductibles.", "Manage incidents through an API while making quality and security checks reproducible."],
    architecture: ["FastAPI expose le CRUD d’incidents, la santé, la disponibilité et les métriques. SQLAlchemy relie le service à PostgreSQL. Docker Compose prépare l’exécution locale ; le Jenkinsfile décrit une livraison contrôlée vers GHCR et GitOps.", "FastAPI exposes incident CRUD, health, readiness and metrics. SQLAlchemy connects the service to PostgreSQL. Docker Compose supports local execution; the Jenkinsfile defines controlled GHCR and GitOps delivery."],
    flow: [["Client API", "API client"], ["FastAPI", "FastAPI"], ["PostgreSQL", "PostgreSQL"], ["Métriques Prometheus", "Prometheus metrics"]],
    features: [["API d’incidents, persistance PostgreSQL, healthchecks et métriques.", "Incident API, PostgreSQL persistence, health checks and metrics."], ["Image non-root, tests pytest et contrôles de secrets/analyse statique.", "Non-root image, pytest tests, secret scanning and static analysis."]],
    validation: ["Le run de référence valide 8 tests applicatifs, compilation, Compose, build Docker, exécution non-root, Gitleaks et Semgrep. Aucun serveur Jenkins n’a été exécuté pendant cette validation.", "The reference run validates 8 application tests, compilation, Compose, Docker build, non-root execution, Gitleaks and Semgrep. No Jenkins server was executed during that validation."],
    deployment: ["Stack Docker Compose locale ; chaîne Jenkins/GHCR/GitOps configurée, sans endpoint public vérifié.", "Local Docker Compose stack; configured Jenkins/GHCR/GitOps path without a verified public endpoint."],
    limits: [["Les étapes Jenkins et la livraison GitOps restent à vérifier dans un environnement réel.", "Jenkins stages and GitOps delivery still require validation in a real environment."]],
    evidence: "https://github.com/farah-ben-harb/devsecops-incident-platform/actions/runs/43032437149",
    related: ["gitops-delivery-platform"],
  },
  "gitops-delivery-platform": {
    description: ["Décrire un état Kubernetes révisable dans Git pour livrer une application et sa base de données.", "Describe reviewable Kubernetes desired state in Git to deliver an application and its database."],
    architecture: ["Une base Kustomize et un overlay kind alimentent les ressources Argo CD. PostgreSQL utilise un PVC ; les Secrets ne sont pas fournis en clair dans le rendu. Un ServiceMonitor et un dashboard Grafana complètent les manifests.", "A Kustomize base and kind overlay feed Argo CD resources. PostgreSQL uses a PVC; plaintext Secrets are not supplied in the rendered manifests. A ServiceMonitor and Grafana dashboard complement the stack."],
    flow: [["Git · Kustomize", "Git · Kustomize"], ["Argo CD", "Argo CD"], ["Application · PostgreSQL", "Application · PostgreSQL"], ["PVC · monitoring", "PVC · monitoring"]],
    features: [["Base/overlay, ressources Argo CD, persistance PostgreSQL et contextes de sécurité des Pods.", "Base/overlay, Argo CD resources, PostgreSQL persistence and Pod security contexts."], ["Rendu automatique et assertions sur les images, PVC, Secrets et références Argo CD.", "Automated rendering and assertions on images, PVCs, Secrets and Argo CD references."]],
    validation: ["Le run de référence valide Kustomize, les assertions de configuration et Gitleaks. Il n’exécute pas de synchronisation Argo CD ni de restauration de base.", "The reference run validates Kustomize, configuration assertions and Gitleaks. It does not execute Argo CD synchronization or database restoration."],
    deployment: ["Cluster kind prévu avec images GHCR et Secrets fournis par l’opérateur.", "Intended for kind with GHCR images and operator-supplied Secrets."],
    limits: [["L’état d’une éventuelle instance Argo CD externe n’est pas vérifié. Images, sauvegarde et rollback doivent être validés avant synchronisation.", "The state of any external Argo CD instance is not verified. Images, backup and rollback must be validated before synchronization."]],
    evidence: "https://github.com/farah-ben-harb/gitops-delivery-platform/actions/runs/43032449248",
    related: ["devsecops-incident-platform"],
  },
  "openstack-heat-infrastructure": {
    description: ["Décrire un laboratoire de cloud privé avec des ressources OpenStack reproductibles plutôt qu’une configuration manuelle.", "Define a private-cloud lab with reproducible OpenStack resources instead of manual configuration."],
    architecture: ["Heat orchestre réseaux et sous-réseaux Neutron, routeur, instances Nova, volumes Cinder, floating IPs et groupes de sécurité. Les paramètres d’environnement adaptent le template au cloud cible.", "Heat orchestrates Neutron networks/subnets, a router, Nova instances, Cinder volumes, floating IPs and security groups. Environment parameters adapt the template to the target cloud."],
    flow: [["Paramètres", "Parameters"], ["Heat", "Heat"], ["Neutron · Nova", "Neutron · Nova"], ["Cinder · instances", "Cinder · instances"]],
    features: [["Templates réseau, calcul et stockage avec dépendances explicites.", "Network, compute and storage templates with explicit dependencies."], ["Accès d’administration restreint par admin_cidr et suppression de l’exposition publique MySQL.", "Administrative access restricted through admin_cidr and removal of public MySQL exposure."]],
    validation: ["Le run de référence valide quatre tests de templates/sécurité et Gitleaks. Il s’agit de vérifications statiques, pas d’un déploiement Heat.", "The reference run validates four template/security tests and Gitleaks. These are static checks, not a Heat deployment."],
    deployment: ["Cible OpenStack : images, flavours, réseaux et credentials doivent être fournis par le laboratoire.", "OpenStack target: images, flavours, networks and credentials must be supplied by the lab."],
    limits: [["Aucune création récente de stack sur un cloud cible n’est revendiquée. Les identifiants historiques exposés nécessitent un traitement hors Git.", "No recent stack creation on a target cloud is claimed. Historically exposed credentials require remediation outside Git."]],
    evidence: "https://github.com/farah-ben-harb/openstack-heat-infrastructure/actions/runs/43032446675",
  },
  "k8s-cluster-automation": {
    description: ["Automatiser le bootstrap d’un cluster Kubernetes sur des VM OpenStack et préparer sa supervision.", "Automate Kubernetes cluster bootstrap on OpenStack VMs and prepare its monitoring."],
    architecture: ["Heat décrit les VM et réseaux. Ansible configure les prérequis, containerd et kubeadm, initialise le control plane et joint les workers. Calico fournit le réseau ; Helm et les manifests installent Prometheus, Grafana et Alertmanager.", "Heat defines VMs and networks. Ansible configures prerequisites, containerd and kubeadm, initializes the control plane and joins workers. Calico provides networking; Helm and manifests install Prometheus, Grafana and Alertmanager."],
    flow: [["OpenStack · Heat", "OpenStack · Heat"], ["Ansible · kubeadm", "Ansible · kubeadm"], ["Kubernetes · Calico", "Kubernetes · Calico"], ["Monitoring", "Monitoring"]],
    features: [["Automatisation du control plane et des workers, réseau Calico et distribution contrôlée du kubeconfig.", "Control-plane and worker automation, Calico networking and controlled kubeconfig distribution."], ["Durcissement des accès réseau, injection SMTP hors Git et documentation des versions actuelles/proposées.", "Network-access hardening, SMTP injection outside Git and documentation of current/proposed versions."]],
    validation: ["La CI statique couvre les configurations Heat, Ansible, YAML et shell ainsi que le scan de secrets. Elle ne prouve pas un bootstrap réussi sur un cluster neuf.", "Static CI covers Heat, Ansible, YAML and shell configuration plus secret scanning. It does not prove a successful fresh-cluster bootstrap."],
    deployment: ["Lab OpenStack Ubuntu avec Kubernetes/containerd ; versions et compatibilité détaillées dans le dépôt.", "OpenStack Ubuntu lab with Kubernetes/containerd; versions and compatibility are detailed in the repository."],
    limits: [["Un déploiement OpenStack/Kubernetes complet reste à revalider.", "A complete OpenStack/Kubernetes deployment still requires revalidation."], ["La révocation effective de l’ancien identifiant SMTP reste non confirmée par son propriétaire.", "Actual revocation of the historical SMTP credential remains unconfirmed by its owner."]],
  },
  "kubernetes-anomaly-detection-openstack": {
    description: ["Transformer l’historique de métriques Kubernetes en signaux d’anomalie consultables par API.", "Turn historical Kubernetes metrics into anomaly signals accessible through an API."],
    architecture: ["FastAPI interroge Prometheus, normalise l’historique avec StandardScaler et entraîne Isolation Forest. Les endpoints /detect et /metrics exposent les résultats et la télémétrie du service.", "FastAPI queries Prometheus, normalises historical metrics with StandardScaler and trains Isolation Forest. The /detect and /metrics endpoints expose results and service telemetry."],
    flow: [["Prometheus", "Prometheus"], ["StandardScaler", "StandardScaler"], ["Isolation Forest", "Isolation Forest"], ["FastAPI · scores", "FastAPI · scores"]],
    features: [["Collecte Prometheus, entraînement/détection et export de métriques.", "Prometheus collection, training/detection and metrics export."], ["Docker non-root, probes Kubernetes, ressources bornées et erreurs génériques.", "Non-root Docker, Kubernetes probes, bounded resources and generic errors."]],
    validation: ["Quatre tests pytest et une CI post-fusion sont documentés. Aucun rollout sur un cluster OpenStack n’a été exécuté dans cette validation.", "Four pytest tests and post-merge CI are documented. No rollout to an OpenStack cluster was executed in that validation."],
    deployment: ["Conteneur Docker et manifeste Kubernetes dépendant d’un endpoint Prometheus accessible.", "Docker container and Kubernetes manifest dependent on a reachable Prometheus endpoint."],
    limits: [["Détection indisponible avant entraînement réussi. Qualité dépendante de l’historique, des labels et des requêtes Prometheus.", "Detection is unavailable until training succeeds. Quality depends on metric history, labels and Prometheus queries."]],
    evidence: "https://github.com/farah-ben-harb/kubernetes-anomaly-detection-openstack/actions/runs/43030635364",
  },
  "flask-azure-devops-pipeline": {
    description: ["Relier une application Flask testée à une chaîne de livraison conteneurisée et à une définition d’infrastructure Azure.", "Connect a tested Flask application to container delivery and an Azure infrastructure definition."],
    architecture: ["GitHub Actions teste l’application et contrôle le build Docker. Terraform décrit une VM Linux Azure. Prometheus, Grafana et Alertmanager constituent la stack de supervision Docker Compose.", "GitHub Actions tests the application and checks the Docker build. Terraform defines an Azure Linux VM. Prometheus, Grafana and Alertmanager form the Docker Compose monitoring stack."],
    flow: [["Flask · pytest", "Flask · pytest"], ["GitHub Actions", "GitHub Actions"], ["Docker · scans", "Docker · scans"], ["Terraform · Azure", "Terraform · Azure"]],
    features: [["Application Flask, tests, image non-root et métriques Prometheus.", "Flask application, tests, non-root image and Prometheus metrics."], ["Validation Terraform statique, credentials externalisés et publication/déploiement sous contrôle manuel.", "Static Terraform validation, externalised credentials and manually controlled publication/deployment."]],
    validation: ["Trois tests pytest, contrôles de monitoring et validation Terraform statique sont documentés. Aucun plan/apply Azure n’a été exécuté pour cette validation.", "Three pytest tests, monitoring checks and static Terraform validation are documented. No Azure plan/apply was executed for that validation."],
    deployment: ["Exécution Docker locale et chemin Terraform vers une VM Azure. Aucun lien d’application déployée n’est confirmé.", "Local Docker execution and a Terraform path to an Azure VM. No deployed application URL is confirmed."],
    limits: [["L’ancien secret SMTP reste à révoquer par le propriétaire ; sa suppression du code ne suffit pas.", "The historical SMTP credential still requires owner revocation; removing it from source is insufficient."], ["La livraison Azure et les alertes réelles restent à valider dans un environnement autorisé.", "Azure delivery and real alerting still require validation in an authorised environment."]],
    evidence: "https://github.com/farah-ben-harb/flask-azure-devops-pipeline/actions/runs/43025881321",
  },
  "alif-app": {
    description: ["Coordonner les activités de soutien animal : dons, stocks, utilisateurs et parcours vétérinaires.", "Coordinate animal-support activities: donations, stock, users and veterinary workflows."],
    architecture: ["Angular accède à des microservices Spring Boot via une passerelle Spring Cloud. Eureka fournit la découverte des services ; MySQL conserve les données métier. Le dépôt comprend aussi des modules Python orientés IA.", "Angular accesses Spring Boot microservices through a Spring Cloud gateway. Eureka provides service discovery; MySQL stores business data. The repository also includes AI-oriented Python modules."],
    flow: [["Angular", "Angular"], ["Gateway · Eureka", "Gateway · Eureka"], ["Spring Boot", "Spring Boot"], ["MySQL", "MySQL"]],
    features: [["Modules frontend, services métier, gateway et découverte de services.", "Frontend modules, domain services, gateway and service discovery."], ["Média du module de dons disponible dans le dépôt.", "Donation-module media available in the repository."]],
    validation: ["Les modules et commandes de test sont présents dans le dépôt ; aucune exécution complète de CI applicative n’est attestée dans les preuves conservées.", "Modules and test commands are present in the repository; retained evidence does not establish a complete application CI execution."],
    deployment: ["Stack microservices locale ; manifests Kubernetes disponibles dans le dépôt complémentaire.", "Local microservice stack; Kubernetes manifests are available in the companion repository."],
    limits: [["Pas de démonstration publique de bout en bout vérifiée. Le visuel du dépôt n’est pas une preuve de déploiement.", "No verified public end-to-end demo. Repository artwork is not deployment evidence."]],
    related: ["Alif.tn-App-k8s"],
  },
  "Alif.tn-App-k8s": {
    description: ["Préparer l’hébergement des services Alif sur Kubernetes dans un cloud privé.", "Prepare hosting of Alif services on Kubernetes in a private cloud."],
    architecture: ["Deployments et Services décrivent les composants Alif et MySQL. MetalLB fournit un chemin d’exposition adapté à un cluster sans load balancer cloud managé.", "Deployments and Services describe Alif components and MySQL. MetalLB provides an exposure path for a cluster without a managed cloud load balancer."],
    flow: [["Images Alif", "Alif images"], ["Deployments", "Deployments"], ["Services", "Services"], ["MetalLB", "MetalLB"]],
    features: [["Manifests applicatifs, ressources MySQL et exemples de configuration MetalLB.", "Application manifests, MySQL resources and MetalLB configuration examples."]],
    validation: ["Preuves disponibles : manifests et documentation. Aucune exécution de cluster ou CI applicative complète n’est attestée.", "Available evidence: manifests and documentation. No cluster execution or complete application CI is established."],
    deployment: ["Kubernetes privé, dépendant des images Alif et de la configuration réseau du cluster.", "Private Kubernetes, dependent on Alif images and cluster networking configuration."],
    limits: [["Les manifests historiques demandent un durcissement de la persistance MySQL, des références d’images et des Secrets avant production.", "Historical manifests require hardening of MySQL persistence, image references and Secrets before production."]],
    related: ["alif-app"],
  },
  "Application-Airport-Management": {
    description: ["Modéliser les opérations d’un aéroport : vols, passagers, ressources et services.", "Model airport operations: flights, passengers, resources and services."],
    architecture: ["Application C#/.NET organisée en couches pour séparer modèles métier, services et accès aux données.", "A layered C#/.NET application separating domain models, services and data access."],
    flow: [["Opérations", "Operations"], ["Services métier", "Domain services"], ["Modèles", "Models"], ["Persistance", "Persistence"]],
    features: [["Gestion des entités aéroportuaires et organisation n-tier du code.", "Airport entity management and n-tier code organisation."]],
    validation: ["Le code source constitue la preuve disponible ; pas de résultat CI ou de déploiement public confirmé.", "Source code is the available evidence; no confirmed CI result or public deployment."],
    deployment: ["Projet logiciel à exécuter selon les prérequis .NET du dépôt.", "Software project to run using the repository's .NET prerequisites."],
    limits: [["Les parcours de bout en bout doivent être rejoués avant une démonstration publique.", "End-to-end workflows need to be rerun before a public demonstration."]],
  },
  "wefarm-smart-agriculture-platform": {
    description: ["Centraliser des activités agricoles : terres, produits, équipements, événements et intervenants.", "Centralise agricultural activities: land, products, equipment, events and stakeholders."],
    architecture: ["Plateforme modulaire autour de Java et de modules web, avec des composants d’analyse/prédiction présents dans le dépôt.", "A modular platform built around Java and web modules, with analysis/prediction components present in the repository."],
    flow: [["Utilisateurs", "Users"], ["Modules agricoles", "Agricultural modules"], ["Services métier", "Domain services"], ["Données", "Data"]],
    features: [["Modules de gestion agricole et organisation des activités et ressources.", "Agricultural management modules and organisation of activities and resources."]],
    validation: ["Le dépôt documente les modules ; aucun score prédictif ou test de production n’est revendiqué.", "The repository documents the modules; no predictive score or production testing is claimed."],
    deployment: ["Projet applicatif ; aucun environnement public actif vérifié.", "Application project; no verified active public environment."],
    limits: [["Intégration complète et qualité des fonctions prédictives à revalider sur des données adaptées.", "Complete integration and predictive-function quality require revalidation with suitable data."]],
  },
  "QuantumEscape-Game-2D-SDL": {
    description: ["Un jeu 2D en C explorant le rendu, les interactions et la gestion d’état.", "A 2D game in C exploring rendering, interactions and state management."],
    architecture: ["Une boucle de jeu SDL gère événements, état et affichage. Les modules prennent en charge niveaux, ennemis, énigmes, son et sauvegarde/chargement.", "An SDL game loop handles events, state and rendering. Modules cover levels, enemies, puzzles, sound and save/load functionality."],
    flow: [["Événements SDL", "SDL events"], ["État du jeu", "Game state"], ["Logique des niveaux", "Level logic"], ["Rendu · audio", "Rendering · audio"]],
    features: [["Jeu 2D, transitions d’état, interactions et persistance de partie dans le code.", "2D gameplay, state transitions, interactions and game persistence in source code."]],
    validation: ["Preuve disponible : sources C/SDL. Aucune nouvelle compilation ou session de jeu n’a été réalisée pour ce portfolio.", "Available evidence: C/SDL source. No new compilation or play session was performed for this portfolio."],
    deployment: ["Application locale nécessitant SDL et les ressources du jeu.", "Local application requiring SDL and game assets."],
    limits: [["Pas de version navigateur ou de vidéo publique vérifiée.", "No verified browser version or public video."]],
  },
  "SmartFarm-Desktop-Application": {
    description: ["Une application de bureau de gestion agricole avec une dimension matérielle Arduino.", "A desktop farm-management application with an Arduino hardware component."],
    architecture: ["C++ et Qt portent l’interface et les modules de gestion : stocks, ventes, fournisseurs, équipements et événements. Arduino complète les interactions matérielles prévues par le projet.", "C++ and Qt provide the interface and management modules for stock, sales, suppliers, equipment and events. Arduino supports the project's hardware interactions."],
    flow: [["Interface Qt", "Qt interface"], ["Modules C++", "C++ modules"], ["Données métier", "Domain data"], ["Arduino", "Arduino"]],
    features: [["Modules de gestion de ferme, interface desktop et intégration matérielle dans le dépôt.", "Farm-management modules, desktop interface and hardware integration in the repository."]],
    validation: ["Le code est disponible ; aucune validation matérielle récente ni CI complète n’est attestée.", "Source is available; no recent hardware validation or complete CI is established."],
    deployment: ["Exécution locale Qt/C++, matériel nécessaire pour les fonctions Arduino.", "Local Qt/C++ execution, with hardware required for Arduino functionality."],
    limits: [["Les fonctions matérielles nécessitent une carte et un montage compatibles pour être rejouées.", "Hardware features require a compatible board and wiring to be reproduced."]],
  },
  "CryptoCurrency-Project": {
    description: ["Explorer des données de marché et comparer des approches de classification et de prévision.", "Explore market data and compare classification and forecasting approaches."],
    architecture: ["Des notebooks Python/Jupyter organisent l’exploration, la préparation des données, l’entraînement et la comparaison de modèles.", "Python/Jupyter notebooks organise exploration, data preparation, training and model comparison."],
    flow: [["Données de marché", "Market data"], ["Préparation", "Preparation"], ["Modèles ML", "ML models"], ["Analyse notebook", "Notebook analysis"]],
    features: [["Exploration, classification de direction et essais de prédiction de prix.", "Exploration, direction classification and price-prediction experiments."]],
    validation: ["Notebooks disponibles dans le dépôt. Aucun rendement financier ou score de généralisation n’est revendiqué.", "Notebooks are available in the repository. No financial return or generalisation score is claimed."],
    deployment: ["Analyse locale en notebook, sans service de trading déployé.", "Local notebook analysis, without a deployed trading service."],
    limits: [["Travail exploratoire, pas un système de décision financière ni une démonstration de performance réelle.", "Exploratory work, not a financial decision system or evidence of real-world performance."]],
  },
  "CampusIdeas-SPA": {
    description: ["Proposer, consulter et gérer des idées pour la vie de campus dans une interface web modulaire.", "Submit, browse and manage campus ideas in a modular web interface."],
    architecture: ["Angular 18 organise une SPA TypeScript avec routage différé, formulaires réactifs et services REST. Bootstrap structure l’interface ; JSON Server soutient le développement local.", "Angular 18 provides a TypeScript SPA with lazy routing, reactive forms and REST services. Bootstrap structures the interface; JSON Server supports local development."],
    flow: [["Interface Angular", "Angular interface"], ["Formulaires", "Forms"], ["Services REST", "REST services"], ["JSON Server", "JSON Server"]],
    features: [["CRUD des suggestions, filtrage, formulaires réactifs et modules chargés à la demande.", "Suggestion CRUD, filtering, reactive forms and lazy-loaded modules."]],
    validation: ["Fonctionnalités documentées par le code ; aucune démo hébergée ni exécution CI complète vérifiée.", "Functionality documented by source code; no verified hosted demo or complete CI execution."],
    deployment: ["SPA et backend de développement local, pas une API de production revendiquée.", "SPA and local development backend, not a claimed production API."],
    limits: [["Authentification et persistance de production restent à établir avant un usage réel.", "Production authentication and persistence remain to be established before real-world use."]],
  },
};

const identities = [
  ...projects.map((p) => ({ ...p, slug: p.repository.split("/").at(-1)! })),
  ...otherProjects.map((p) => ({ ...p, technologies: p.stack.split(" · "), slug: p.repository.split("/").at(-1)!, liveDemo: undefined, media: undefined })),
];

export const caseStudies = identities.map((project) => {
  const content = details[project.slug];
  if (!content) throw new Error(`Missing project case study: ${project.slug}`);
  return { ...project, ...content, technologies: content.technologies ?? project.technologies };
});
export type CaseStudy = (typeof caseStudies)[number];
export const findCaseStudy = (slug: string) => caseStudies.find((project) => project.slug === slug);
export const projectPath = (locale: Locale, slug: string) => `${locale === "en" ? "/en" : ""}/projects/${slug}`;
