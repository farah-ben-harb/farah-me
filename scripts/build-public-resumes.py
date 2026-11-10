from __future__ import annotations

from pathlib import Path
import shutil
import subprocess

from PIL import Image
from pypdf import PdfReader
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "public" / "resumes"
PREVIEW_DIR = ROOT / "public" / "resume-previews"
PORTFOLIO_URL = "https://farah-me.vercel.app"
GITHUB_URL = "https://github.com/farah-ben-harb"
LINKEDIN_URL = "https://www.linkedin.com/in/farah-ben-harb-b26845313/"
EMAIL = "benharbfarah85@gmail.com"

NAVY = colors.HexColor("#123B36")
GREEN = colors.HexColor("#138A72")
MINT = colors.HexColor("#E8F4EF")
SLATE = colors.HexColor("#3D5551")
LIGHT = colors.HexColor("#D4E4DF")


def register_fonts() -> None:
    fonts = Path("C:/Windows/Fonts")
    pdfmetrics.registerFont(TTFont("Arial", fonts / "arial.ttf"))
    pdfmetrics.registerFont(TTFont("Arial-Bold", fonts / "arialbd.ttf"))


def experience(language: str) -> list[dict[str, str | list[str]]]:
    if language == "fr":
        return [
            {
                "title": "Stagiaire Cloud & DevOps | Devoteam",
                "date": "juil. - août 2026",
                "bullets": [
                    "Provisionnement d'infrastructure Azure automatisé avec Terraform.",
                    "CI/CD GitHub Actions : tests, publication d'images Docker et contrôles de sécurité.",
                    "Déploiements K3s/Kubernetes avec Helm et Argo CD ; supervision Dynatrace.",
                    "Intégration MCP avec Claude Desktop pour interroger et piloter l'infrastructure.",
                ],
            },
            {
                "title": "Stagiaire développement logiciel & data | Ooredoo",
                "date": "juil. - août 2025",
                "bullets": [
                    "Outils Python et Java pour traiter et analyser des données techniques et journaux système.",
                    "Automatisation du traitement et interfaces de recherche pour faciliter l'accès aux données.",
                ],
            },
            {
                "title": "Stagiaire réseaux & systèmes | Tunisie Télécom",
                "date": "juin - juil. 2023",
                "bullets": [
                    "Support d'environnements réseaux et systèmes télécom ; Linux, TCP/IP, adressage IP et routage.",
                ],
            },
        ]
    return [
        {
            "title": "Cloud & DevOps Intern | Devoteam",
            "date": "Jul - Aug 2026",
            "bullets": [
                "Automated Azure infrastructure provisioning with Terraform.",
                "Built GitHub Actions delivery workflows for tests, Docker publishing and security checks.",
                "Deployed to K3s/Kubernetes with Helm and Argo CD; monitored services with Dynatrace.",
                "Built an MCP integration with Claude Desktop to query and operate infrastructure.",
            ],
        },
        {
            "title": "Software Development & Data Intern | Ooredoo",
            "date": "Jul - Aug 2025",
            "bullets": [
                "Developed Python and Java tools to process and analyze technical data and system logs.",
                "Automated processing workflows and built search interfaces to improve data access.",
            ],
        },
        {
            "title": "Networks & Systems Intern | Tunisie Telecom",
            "date": "Jun - Jul 2023",
            "bullets": [
                "Supported telecom network and systems environments using Linux, TCP/IP, IP addressing and routing.",
            ],
        },
    ]


PROJECTS = {
    "football": {
        "en": (
            "FootballMatch AI Platform | MLOps & Cloud-Native",
            "FastAPI platform for football video detection, tracking and team classification. Uses YOLO11, ByteTrack, OpenCV, MLflow, Kubeflow, optional RAG, Docker, Helm and K3s. CI runs tests and security scans; an Azure Container Apps CPU demo is live with documented non-production limits.",
        ),
        "fr": (
            "FootballMatch AI Platform | MLOps & Cloud-Native",
            "Plateforme FastAPI d'analyse vidéo : détection, suivi et classification des équipes avec YOLO11, ByteTrack, OpenCV, MLflow, Kubeflow, RAG optionnel, Docker, Helm et K3s. La CI exécute tests et scans ; une démo CPU Azure Container Apps est active avec des limites non-production documentées.",
        ),
    },
    "crm": {
        "en": (
            "Mini CRM Intelligence | MLOps & DevSecOps",
            "Profile classification API using TF-IDF, logistic regression, FastAPI and MLflow. Docker Compose, a Terraform-managed Docker network and Ansible support local automation. GitHub Actions runs tests and security scans. No AWS deployment is evidenced in the repository.",
        ),
        "fr": (
            "Mini CRM Intelligence | MLOps & DevSecOps",
            "API de classification de profils avec TF-IDF, régression logistique, FastAPI et MLflow. Docker Compose, un réseau Docker géré par Terraform et Ansible automatisent l'environnement local. GitHub Actions exécute tests et scans. Aucun déploiement AWS n'est prouvé dans le dépôt.",
        ),
    },
    "devsecops": {
        "en": (
            "Cloud-Native DevSecOps Platform",
            "FastAPI/PostgreSQL incident service with health, readiness and metrics endpoints. Includes pytest, Docker Compose and a Jenkins pipeline configured for secrets, dependency and image scanning plus GitOps updates. Public GitHub Actions application tests pass; Jenkins execution is not publicly evidenced.",
        ),
        "fr": (
            "Plateforme Cloud-Native DevSecOps",
            "Service d'incidents FastAPI/PostgreSQL avec endpoints de santé, disponibilité et métriques. Pytest, Docker Compose et pipeline Jenkins configuré pour les scans et mises à jour GitOps. Les tests publics GitHub Actions réussissent ; l'exécution Jenkins n'est pas publiquement prouvée.",
        ),
    },
    "openstack": {
        "en": (
            "Private Cloud Infrastructure | OpenStack & Automation",
            "Heat templates and Ansible automation for OpenStack compute, networking, storage and Kubernetes lab environments, with Prometheus/Grafana observability assets. Repository validation covers configuration and syntax; a fresh end-to-end cloud run is not publicly evidenced.",
        ),
        "fr": (
            "Infrastructure Cloud Privé | OpenStack & automatisation",
            "Templates Heat et automatisation Ansible pour le calcul, le réseau, le stockage OpenStack et des laboratoires Kubernetes, avec ressources Prometheus/Grafana. Les dépôts valident la configuration et la syntaxe ; aucune exécution cloud récente de bout en bout n'est publiquement prouvée.",
        ),
    },
}


VARIANTS = {
    "cloud-engineering": {
        "en": {
            "title": "Computer Engineering Student | Cloud, DevOps, DevSecOps & SRE",
            "target": "Seeking a 6-month final-year internship from March 2027 in Cloud Engineering, DevOps or SRE.",
            "project_order": ["devsecops", "football", "crm", "openstack"],
            "skills": [
                "Cloud & IaC: AWS, Azure, OpenStack, Terraform, Ansible",
                "Containers & GitOps: Docker, Kubernetes, K3s, Helm, Argo CD, GHCR",
                "CI/CD & security: GitHub Actions, Jenkins, Gitleaks, Semgrep, Trivy, Bandit",
                "Observability: Prometheus, Grafana, Dynatrace, Zabbix",
                "Systems & backend: Linux, Bash, Python, FastAPI, PostgreSQL, REST APIs",
            ],
        },
        "fr": {
            "title": "Élève ingénieure | Cloud, DevOps, DevSecOps & SRE",
            "target": "Recherche un stage de fin d'études de 6 mois dès mars 2027 en Cloud Engineering, DevOps ou SRE.",
            "project_order": ["devsecops", "football", "crm", "openstack"],
            "skills": [
                "Cloud & IaC : AWS, Azure, OpenStack, Terraform, Ansible",
                "Conteneurs & GitOps : Docker, Kubernetes, K3s, Helm, Argo CD, GHCR",
                "CI/CD & sécurité : GitHub Actions, Jenkins, Gitleaks, Semgrep, Trivy, Bandit",
                "Observabilité : Prometheus, Grafana, Dynatrace, Zabbix",
                "Systèmes & backend : Linux, Bash, Python, FastAPI, PostgreSQL, API REST",
            ],
        },
    },
    "infrastructure-devops": {
        "en": {
            "title": "Computer Engineering Student | Infrastructure, Networks & SRE",
            "target": "Seeking a 6-month final-year internship from March 2027 in Infrastructure, Cloud or SRE.",
            "project_order": ["openstack", "devsecops", "football", "crm"],
            "skills": [
                "Systems & networks: Linux, Bash, TCP/IP, IP addressing, routing",
                "Cloud & IaC: AWS, Azure, OpenStack, Terraform, Ansible",
                "Orchestration: Docker, Kubernetes, K3s, Helm, Argo CD",
                "Observability & SRE: Prometheus, Grafana, Dynatrace, Zabbix",
                "Automation & security: Python, GitHub Actions, Jenkins, Gitleaks, Trivy",
            ],
        },
        "fr": {
            "title": "Élève ingénieure | Infrastructure, réseaux & SRE",
            "target": "Recherche un stage de fin d'études de 6 mois dès mars 2027 en Infrastructure, Cloud ou SRE.",
            "project_order": ["openstack", "devsecops", "football", "crm"],
            "skills": [
                "Systèmes & réseaux : Linux, Bash, TCP/IP, adressage IP, routage",
                "Cloud & IaC : AWS, Azure, OpenStack, Terraform, Ansible",
                "Orchestration : Docker, Kubernetes, K3s, Helm, Argo CD",
                "Observabilité & SRE : Prometheus, Grafana, Dynatrace, Zabbix",
                "Automatisation & sécurité : Python, GitHub Actions, Jenkins, Gitleaks, Trivy",
            ],
        },
    },
    "mlops": {
        "en": {
            "title": "Computer Engineering Student | MLOps, AI Platform & DevOps",
            "target": "Seeking a 6-month final-year internship from March 2027 in MLOps or AI Platform Engineering.",
            "project_order": ["football", "crm", "devsecops", "openstack"],
            "skills": [
                "ML & vision: Python, PyTorch, Scikit-learn, YOLO11, ByteTrack, OpenCV",
                "MLOps: MLflow Tracking/Registry, Kubeflow Pipelines, MCP",
                "GenAI & data: RAG, Ollama, Sentence Transformers, PostgreSQL/pgvector",
                "Cloud & containers: AWS, Azure, Docker, Kubernetes, K3s, Helm",
                "CI/CD & observability: GitHub Actions, Pytest, Trivy, Prometheus, Grafana",
            ],
        },
        "fr": {
            "title": "Élève ingénieure | MLOps, plateformes IA & DevOps",
            "target": "Recherche un stage de fin d'études de 6 mois dès mars 2027 en MLOps ou plateforme IA.",
            "project_order": ["football", "crm", "devsecops", "openstack"],
            "skills": [
                "ML & vision : Python, PyTorch, Scikit-learn, YOLO11, ByteTrack, OpenCV",
                "MLOps : MLflow Tracking/Registry, Kubeflow Pipelines, MCP",
                "GenAI & data : RAG, Ollama, Sentence Transformers, PostgreSQL/pgvector",
                "Cloud & conteneurs : AWS, Azure, Docker, Kubernetes, K3s, Helm",
                "CI/CD & observabilité : GitHub Actions, Pytest, Trivy, Prometheus, Grafana",
            ],
        },
    },
}


CERTIFICATIONS = [
    "AWS Academy Cloud Operations (2026)",
    "AWS Academy Cloud Security (2026)",
    "Hedera HCDA, HCF & HBF (2026)",
    "Cisco NetAcad Network Security (2026)",
    "AWS Cloud Practitioner (2024)",
    "OCI Foundations Associate (2024)",
    "Multicloud Network Associate (2024)",
    "CCNA SRWE (2023)",
]


def style(name: str, size: float, leading: float, color=SLATE, bold=False, space_after=0) -> ParagraphStyle:
    return ParagraphStyle(
        name,
        fontName="Arial-Bold" if bold else "Arial",
        fontSize=size,
        leading=leading,
        textColor=color,
        alignment=TA_LEFT,
        spaceAfter=space_after,
        allowWidows=0,
        allowOrphans=0,
    )


STYLES: dict[str, ParagraphStyle] = {}


def paragraph(c: canvas.Canvas, text: str, x: float, y: float, width: float, style_name: str) -> float:
    block = Paragraph(text, STYLES[style_name])
    _, height = block.wrap(width, A4[1])
    block.drawOn(c, x, y - height)
    return y - height


def section(c: canvas.Canvas, title: str, x: float, y: float, width: float) -> float:
    y -= 4
    c.setFillColor(MINT)
    c.roundRect(x, y - 15, width, 15, 3, fill=1, stroke=0)
    c.setFillColor(NAVY)
    c.setFont("Arial-Bold", 8.3)
    c.drawString(x + 5, y - 10.8, title.upper())
    return y - 19


def add_bullet(c: canvas.Canvas, text: str, x: float, y: float, width: float, style_name="body") -> float:
    return paragraph(c, f"<font color='#138A72'>&#8226;</font>&nbsp; {text}", x, y, width, style_name) - 1.5


def draw_resume(path: Path, track: str, language: str, data: dict[str, object]) -> None:
    c = canvas.Canvas(str(path), pagesize=A4)
    page_w, page_h = A4
    margin = 12 * mm
    content_w = page_w - 2 * margin

    c.setFillColor(NAVY)
    c.rect(0, page_h - 31 * mm, page_w, 31 * mm, fill=1, stroke=0)
    c.setFillColor(colors.white)
    c.setFont("Arial-Bold", 22)
    c.drawString(margin, page_h - 13 * mm, "Farah Ben Harb")
    c.setFont("Arial-Bold", 9.4)
    c.drawString(margin, page_h - 19 * mm, str(data["title"]))
    c.setFont("Arial", 7.8)
    c.drawString(margin, page_h - 24 * mm, str(data["target"]))

    contact_y = page_h - 28.6 * mm
    contact = [
        (EMAIL, f"mailto:{EMAIL}"),
        ("Rouen, France", None),
        ("LinkedIn", LINKEDIN_URL),
        ("GitHub", GITHUB_URL),
        ("Portfolio", PORTFOLIO_URL),
    ]
    x = margin
    c.setFont("Arial", 7.2)
    for index, (label, url) in enumerate(contact):
        if index:
            c.setFillColor(colors.HexColor("#98BDB5"))
            c.drawString(x, contact_y, " | ")
            x += c.stringWidth(" | ", "Arial", 7.2)
        c.setFillColor(colors.white)
        c.drawString(x, contact_y, label)
        text_w = c.stringWidth(label, "Arial", 7.2)
        if url:
            c.linkURL(url, (x, contact_y - 1, x + text_w, contact_y + 8), relative=0)
        x += text_w

    gap = 8
    left_w = content_w * 0.665
    right_w = content_w - left_w - gap
    left_x = margin
    right_x = margin + left_w + gap
    start_y = page_h - 35 * mm

    headings = {
        "fr": {
            "education": "Formation",
            "experience": "Expérience professionnelle",
            "projects": "Projets sélectionnés",
            "skills": "Compétences",
            "certifications": "Certifications",
            "languages": "Langues",
            "verification": "Statut public",
        },
        "en": {
            "education": "Education",
            "experience": "Professional experience",
            "projects": "Selected projects",
            "skills": "Technical skills",
            "certifications": "Certifications",
            "languages": "Languages",
            "verification": "Public status",
        },
    }[language]

    y = section(c, headings["education"], left_x, start_y, left_w)
    education = (
        "<b>ESIGELEC, Rouen</b> | 2026-2027<br/>Échange académique en dernière année du cycle ingénieur."
        if language == "fr"
        else "<b>ESIGELEC, Rouen</b> | 2026-2027<br/>Academic exchange in the final year of the engineering program."
    )
    y = paragraph(c, education, left_x + 3, y, left_w - 6, "body") - 3
    education = (
        "<b>ESPRIT, Tunis</b> | 2022-2027<br/>Diplôme d'ingénieur en informatique, spécialité Architecture IT & Cloud Computing. Diplôme prévu en 2027."
        if language == "fr"
        else "<b>ESPRIT, Tunis</b> | 2022-2027<br/>Computer Engineering degree, IT Architecture & Cloud Computing specialization. Expected graduation: 2027."
    )
    y = paragraph(c, education, left_x + 3, y, left_w - 6, "body")

    y = section(c, headings["experience"], left_x, y, left_w)
    for item in experience(language):
        y = paragraph(
            c,
            f"<b>{item['title']}</b><br/><font color='#5B716D'>{item['date']}</font>",
            left_x + 3,
            y,
            left_w - 6,
            "body",
        ) - 1
        for bullet in item["bullets"]:
            y = add_bullet(c, str(bullet), left_x + 5, y, left_w - 10, "small")
        y -= 1

    y = section(c, headings["projects"], left_x, y, left_w)
    for key in data["project_order"]:
        project_title, project_body = PROJECTS[str(key)][language]
        y = paragraph(c, f"<b>{project_title}</b>", left_x + 3, y, left_w - 6, "body") - 0.5
        y = paragraph(c, project_body, left_x + 3, y, left_w - 6, "small") - 3

    right_y = section(c, headings["skills"], right_x, start_y, right_w)
    for skill in data["skills"]:
        right_y = add_bullet(c, str(skill), right_x + 3, right_y, right_w - 6, "small")

    right_y = section(c, headings["certifications"], right_x, right_y, right_w)
    for certification in CERTIFICATIONS:
        right_y = add_bullet(c, certification, right_x + 3, right_y, right_w - 6, "small")

    right_y = section(c, headings["languages"], right_x, right_y, right_w)
    languages = (
        "Arabe : langue maternelle<br/>Français : B2<br/>Anglais : C1<br/>Espagnol : A1"
        if language == "fr"
        else "Arabic: native<br/>French: B2<br/>English: C1<br/>Spanish: A1"
    )
    right_y = paragraph(c, languages, right_x + 3, right_y, right_w - 6, "body")

    right_y = section(c, headings["verification"], right_x, right_y, right_w)
    verification = (
        "Les projets et statuts CI/déploiement présentés ici ont été recoupés avec les dépôts publics. Le téléphone a été retiré de cette version publique."
        if language == "fr"
        else "Projects and CI/deployment status shown here were cross-checked against public repositories. The phone number was removed from this public version."
    )
    paragraph(c, verification, right_x + 3, right_y, right_w - 6, "small")

    if y < 11 * mm or right_y < 11 * mm:
        raise RuntimeError(f"Content overflow in {path.name}: left={y:.1f}, right={right_y:.1f}")

    c.setStrokeColor(LIGHT)
    c.line(margin, 9 * mm, page_w - margin, 9 * mm)
    c.setFillColor(SLATE)
    c.setFont("Arial", 6.8)
    footer = f"{PORTFOLIO_URL}  |  {GITHUB_URL}"
    c.drawCentredString(page_w / 2, 5.8 * mm, footer)
    c.save()


def validate_pdf(path: Path) -> None:
    reader = PdfReader(str(path))
    if len(reader.pages) != 1:
        raise RuntimeError(f"{path.name} must contain exactly one page")
    text = reader.pages[0].extract_text() or ""
    if "+33" in text or "+216" in text:
        raise RuntimeError(f"Phone number found in {path.name}")
    for expected in (EMAIL, "Farah Ben Harb", "Portfolio"):
        if expected not in text:
            raise RuntimeError(f"Missing {expected!r} in {path.name}")


def create_preview(pdf_path: Path, preview_path: Path) -> None:
    png_path = preview_path.with_suffix(".png")
    subprocess.run(
        [
            "pdftoppm",
            "-png",
            "-r",
            "120",
            "-f",
            "1",
            "-singlefile",
            str(pdf_path),
            str(png_path.with_suffix("")),
        ],
        check=True,
    )
    with Image.open(png_path) as image:
        image.thumbnail((760, 1080), Image.Resampling.LANCZOS)
        image.save(preview_path, "WEBP", quality=82, method=6)
    png_path.unlink()


def main() -> None:
    register_fonts()
    STYLES.update(
        {
            "body": style("body", 7.35, 9.15),
            "small": style("small", 6.75, 8.25),
        }
    )
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    PREVIEW_DIR.mkdir(parents=True, exist_ok=True)

    generated: list[Path] = []
    for track, languages in VARIANTS.items():
        for language, data in languages.items():
            path = OUTPUT_DIR / f"farah-ben-harb-{track}-{language}.pdf"
            draw_resume(path, track, language, data)
            validate_pdf(path)
            generated.append(path)

    if shutil.which("pdftoppm"):
        for path in generated:
            create_preview(path, PREVIEW_DIR / f"{path.stem}.webp")
    else:
        print("Warning: pdftoppm was not found; existing WebP previews were not rebuilt.")

    print("Generated and validated:")
    for path in generated:
        print(f"- {path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
