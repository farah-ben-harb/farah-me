from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    HRFlowable,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "Resume_FarahBenHarb.pdf"


NAME = "Farah Ben Harb"
TITLE = "Cloud and DevOps Engineering Student"
CONTACT = (
    "benharbfarah85@gmail.com | +216907264646 | Ariana, Tunis | "
    "linkedin.com/in/farah-ben-harb | github.com/farah-ben-harb"
)

EDUCATION = [
    (
        "Engineering Cycle in IT Architecture and Cloud Computing",
        "ESPRIT - 2022 to present - Second-year student specializing in Cloud Computing. Expected graduation: 2027.",
    ),
    (
        "Scientific Baccalaureate with Honors",
        "Lycee Rue El Attarine - 2019 to 2022.",
    ),
]

EXPERIENCE = [
    (
        "Ooredoo - Immersion Internship",
        "2024 - 2025",
        [
            "Designed a parser for log file analysis and built search interfaces with statistical dashboards.",
            "Technologies: Python, Java",
        ],
    ),
    (
        "Tunisie Telecom - Introductory Internship",
        "2022 - 2023",
        [
            "Gained hands-on experience in networking and systems while working with telecom equipment and infrastructure.",
        ],
    ),
]

PROJECTS = [
    (
        "Private Cloud Infrastructure with OpenStack",
        "2025 - 2026",
        [
            "Designed and deployed a private cloud infrastructure modeled after a production-like environment.",
            "Built a cloud-native architecture with Docker containers orchestrated by Kubernetes.",
            "Automated provisioning and observability with Ansible, Prometheus, and Grafana.",
            "Technologies: OpenStack, Kubernetes, Docker, Ansible, Prometheus, Grafana, Linux, CI/CD",
        ],
    ),
    (
        "Cloud CI/CD Pipeline - Automated Deployment on Azure",
        "2026",
        [
            "Built a containerized Flask application with health and metrics endpoints.",
            "Created a GitHub Actions pipeline with Pytest, Docker image publishing, and automated deployment.",
            "Provisioned an Azure Linux VM with Terraform and integrated Prometheus, Grafana, Alertmanager, node_exporter, cAdvisor, and blackbox_exporter.",
            "Technologies: Flask, Python, Pytest, Docker, GitHub Actions, Docker Hub, Terraform, Azure VM, Prometheus, Grafana, Alertmanager, Linux",
        ],
    ),
    (
        "Intelligent Agriculture Platform",
        "2025",
        [
            "Developed a web platform connecting farmers, suppliers, and customers.",
            "Technologies: Symfony, Java, Python",
        ],
    ),
    (
        "AI Chatbot - AI IHEC Hackathon",
        "2024",
        [
            "Built an LLM-based chatbot with Hugging Face fine-tuning and a user-facing interface.",
            "Technologies: Python, Hugging Face, NLP",
        ],
    ),
]

SKILLS = [
    "Programming: C, C++, Python, Java, PHP, JavaScript, Qt, Bash",
    "Cloud and DevOps: AWS, OCI, Azure, OpenStack, Docker, Kubernetes, Terraform, Ansible, CI/CD, Prometheus, Grafana",
    "Web and Mobile: Flutter, Android, HTML5, CSS, Symfony",
    "Networking and Security: CCNA, VPN, Firewalls, Multicloud",
    "Tools: Linux, Git, GitHub, GitHub Actions, Docker Hub, VMware",
]

CERTIFICATIONS = [
    "AWS Cloud Practitioner - 2024",
    "Oracle Cloud Infrastructure Foundations Associate - 2024",
    "Multicloud Network Associate - 2024",
    "CCNA: Switching, Routing, and Wireless Essentials - 2023",
    "Introduction to Modern AI - 2024",
]

LANGUAGES = "Arabic (native), French (B2), English (B2), Spanish (A1)"
ACTIVITIES = [
    "Active member of IEEE ESPRIT Student Branch since 2023.",
    "Hackathon participant across 2023-2024, including AI IHEC 2024.",
]


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="Name",
            parent=styles["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=19,
            leading=22,
            alignment=TA_CENTER,
            textColor=colors.HexColor("#11342f"),
            spaceAfter=3,
        )
    )
    styles.add(
        ParagraphStyle(
            name="ResumeTitle",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=10.2,
            leading=12,
            alignment=TA_CENTER,
            textColor=colors.HexColor("#2b5a52"),
            spaceAfter=4,
        )
    )
    styles.add(
        ParagraphStyle(
            name="ResumeContact",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=8.1,
            leading=10,
            alignment=TA_CENTER,
            textColor=colors.HexColor("#4d5f5c"),
            spaceAfter=7,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Section",
            parent=styles["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=9.7,
            leading=12,
            textColor=colors.HexColor("#0f5b4d"),
            spaceBefore=5,
            spaceAfter=5,
        )
    )
    styles.add(
        ParagraphStyle(
            name="ItemTitle",
            parent=styles["Normal"],
            fontName="Helvetica-Bold",
            fontSize=8.9,
            leading=10.8,
            textColor=colors.HexColor("#163832"),
            spaceAfter=1,
        )
    )
    styles.add(
        ParagraphStyle(
            name="ItemMeta",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=8.1,
            leading=9.8,
            textColor=colors.HexColor("#627471"),
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Body",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=7.9,
            leading=9.6,
            textColor=colors.HexColor("#273a37"),
            spaceAfter=1,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SmallBody",
            parent=styles["Normal"],
            fontName="Helvetica",
            fontSize=7.7,
            leading=9.3,
            textColor=colors.HexColor("#273a37"),
            spaceAfter=1,
        )
    )
    return styles


def bullet_lines(lines, style):
    return [Paragraph(f"- {line}", style) for line in lines]


def job_block(title, period, lines, styles):
    rows = [
        [
            Paragraph(title, styles["ItemTitle"]),
            Paragraph(period, styles["ItemMeta"]),
        ]
    ]
    for line in lines:
        rows.append(
            [
                Paragraph(f"- {line}", styles["Body"]),
                Paragraph("", styles["Body"]),
            ]
        )
    table = Table(rows, colWidths=[4.95 * inch, 1.05 * inch], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
            ]
        )
    )
    return table


def build_story():
    styles = build_styles()
    story = [
        Paragraph(NAME, styles["Name"]),
        Paragraph(TITLE, styles["ResumeTitle"]),
        Paragraph(CONTACT, styles["ResumeContact"]),
        HRFlowable(width="100%", thickness=0.8, color=colors.HexColor("#d4e2dd")),
        Spacer(1, 6),
        Paragraph("Education", styles["Section"]),
    ]

    for title, details in EDUCATION:
        story.append(Paragraph(title, styles["ItemTitle"]))
        story.append(Paragraph(details, styles["Body"]))

    story.extend(
        [
            Paragraph("Professional Experience", styles["Section"]),
            job_block(*EXPERIENCE[0], styles),
            job_block(*EXPERIENCE[1], styles),
            Paragraph("Selected Projects", styles["Section"]),
        ]
    )

    for project in PROJECTS:
        story.append(job_block(*project, styles))

    story.append(Paragraph("Skills", styles["Section"]))
    for line in SKILLS:
        story.append(Paragraph(f"- {line}", styles["SmallBody"]))

    bottom_left = [Paragraph("Certifications", styles["Section"])]
    bottom_left.extend(bullet_lines(CERTIFICATIONS, styles["SmallBody"]))

    bottom_right = [Paragraph("Languages", styles["Section"])]
    bottom_right.append(Paragraph(LANGUAGES, styles["SmallBody"]))
    bottom_right.append(Spacer(1, 4))
    bottom_right.append(Paragraph("Activities", styles["Section"]))
    bottom_right.extend(bullet_lines(ACTIVITIES, styles["SmallBody"]))

    footer_table = Table(
        [[bottom_left, bottom_right]],
        colWidths=[3.15 * inch, 3.15 * inch],
        hAlign="LEFT",
    )
    footer_table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    story.append(footer_table)
    return story


def main():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        topMargin=0.42 * inch,
        bottomMargin=0.42 * inch,
        leftMargin=0.5 * inch,
        rightMargin=0.5 * inch,
    )
    doc.build(build_story())
    print(OUTPUT)


if __name__ == "__main__":
    main()
