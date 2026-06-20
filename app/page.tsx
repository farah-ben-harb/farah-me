import {
  ArrowUpRight,
  EnvelopeSimple,
  FileText,
  GithubLogo,
  LinkedinLogo,
  Phone,
} from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const experience = [
  {
    company: "Ooredoo",
    role: "Immersion Internship",
    period: "2024 - 2025",
    meta: "Python, Java",
    summary:
      "Designed and developed a parser for log file analysis. Implemented search interfaces and statistical dashboards to monitor and interpret log data effectively.",
  },
  {
    company: "Tunisie Télécom",
    role: "Introductory Internship",
    period: "2022 - 2023",
    meta: "Networking, Systems",
    summary:
      "Gained hands-on experience in networking and systems. Familiarized with telecom equipment and infrastructure operations in a professional environment.",
  },
];

const projects = [
  {
    name: "Private Cloud Architecture",
    href: "",
    meta: "OpenStack, Docker, Kubernetes, Ansible, Prometheus, Grafana, Linux",
    summary:
      "Designed and deployed a complete private cloud infrastructure with OpenStack. Configured software environments, automated processes using Ansible, containerized with Docker, and orchestrated services using Kubernetes.",
  },
  {
    name: "Cloud CI/CD Pipeline on Azure",
    meta: "Flask, Python, Docker, GitHub Actions, Terraform, Azure, Prometheus, Grafana",
    summary:
      "Built and deployed a containerized Flask application with automated testing, Docker image publishing, Terraform-based Azure provisioning, and a full observability stack for infrastructure and application monitoring.",
  },
  {
    name: "Intelligent Agriculture Platform",
    meta: "Symfony, Java, Python",
    summary:
      "Developed a web platform connecting farmers, suppliers, and customers, with intelligent workflows to support day-to-day agricultural decision making.",
  },
  {
    name: "AI Chatbot",
    meta: "Python, Hugging Face, NLP",
    summary:
      "Developed an LLM-based chatbot during the Hackathon AI IHEC 2024. Fine-tuned the model using Hugging Face and integrated a user-friendly interface.",
  },
];

const skillGroups = [
  ["Programming", "C", "C++", "Python", "Java", "PHP", "JavaScript", "Qt", "Bash"],
  ["Cloud & DevOps", "AWS", "OCI", "Azure", "OpenStack", "Docker", "Kubernetes", "Terraform", "Ansible", "CI/CD", "Prometheus", "Grafana"],
  ["Mobile/Web", "Flutter", "Android", "HTML5", "CSS", "Symfony"],
  ["Networking & Security", "CCNA", "VPN", "Firewalls", "Multicloud"],
  ["Tools", "Linux", "Git", "GitHub", "GitHub Actions", "Docker Hub", "VMware"],
];

const stats = [
  ["2", "internships"],
  ["5", "certifications"],
  ["2027", "expected graduation"],
  ["4", "featured projects"],
];

const certifications = [
  "AWS Cloud Practitioner (2024)",
  "OCI Foundations Associate (2024)",
  "Multicloud Network Associate (2024)",
  "CCNA: Switching, Routing, Wireless (2023)",
  "Introduction to Modern AI (2024)",
];

const community = [
  "Active member of IEEE ESPRIT Student Branch since 2023.",
  "Hackathon participant across 2023-2024, including AI IHEC 2024.",
];

const heroBadges = [
  "OpenStack",
  "Terraform",
  "Kubernetes",
  "CI/CD",
  "Observability",
  "Azure",
];

const heroProfile = [
  {
    label: "Education",
    value:
      "Engineering Cycle in IT Architecture & Cloud Computing at ESPRIT. Expected graduation: 2027.",
  },
  {
    label: "Prior education",
    value:
      "Scientific Baccalaureate (Honors), Lycee Rue El Attarine, 2019-2022.",
  },
  {
    label: "Languages",
    value: "Arabic (native), French (B2), English (B2), Spanish (A1).",
  },
  {
    label: "Focus",
    value: "Cloud infrastructure, CI/CD automation, observability, and reliable platform delivery.",
  },
];

const links = [
  {
    label: "GitHub",
    href: siteConfig.github,
    icon: GithubLogo,
  },
  {
    label: "LinkedIn",
    href: siteConfig.linkedin,
    icon: LinkedinLogo,
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    icon: EnvelopeSimple,
  },
  {
    label: "Phone",
    href: siteConfig.phoneHref,
    icon: Phone,
  },
  {
    label: "Resume",
    href: "/Resume_FarahBenHarb.pdf",
    icon: FileText,
  },
];

const headerLinks = links.filter(({ label }) =>
  ["GitHub", "LinkedIn"].includes(label),
);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  jobTitle: "Cloud & DevOps Engineering Student",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ariana",
    addressCountry: "TN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "ESPRIT",
  },
  knowsAbout: [
    "Cloud Computing",
    "DevOps",
    "AWS",
    "Azure",
    "OpenStack",
    "Docker",
    "Kubernetes",
    "Terraform",
    "Ansible",
    "Networking",
    "Linux",
  ],
  sameAs: [siteConfig.github, siteConfig.linkedin],
};

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(145deg,#e4f4ea_0%,#f5f8f2_22%,#fbfbf6_52%,#eef5ff_100%)] text-foreground">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_14%_8%,rgba(16,185,129,0.2),transparent_34%),radial-gradient(circle_at_62%_4%,rgba(37,99,235,0.13),transparent_32%),linear-gradient(rgba(19,83,75,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(19,83,75,0.06)_1px,transparent_1px)] bg-[size:auto,auto,44px_44px,44px_44px]"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col px-6 py-8 sm:px-8 lg:px-10">
        <header className="flex flex-col gap-6 border-b border-emerald-950/15 py-6 sm:flex-row sm:items-center sm:justify-between">
          <a
            className="text-sm font-bold tracking-tight text-emerald-950"
            href="#top"
            aria-label="Farah Ben Harb home"
          >
            Farah Ben Harb
          </a>
          <div className="flex flex-wrap items-center gap-3">
            <nav className="flex flex-wrap gap-1 text-xs text-muted-foreground">
              <a className="px-2 py-1 transition-colors hover:text-foreground" href="#experience">
                Experience
              </a>
              <a className="px-2 py-1 transition-colors hover:text-foreground" href="#projects">
                Projects
              </a>
              <a className="px-2 py-1 transition-colors hover:text-foreground" href="#skills">
                Skills
              </a>
              <a className="px-2 py-1 transition-colors hover:text-foreground" href="#certifications">
                Certifications
              </a>
              <a className="px-2 py-1 transition-colors hover:text-foreground" href="#contact">
                Contact
              </a>
            </nav>
            <div className="flex gap-1">
              {headerLinks.map(({ href, icon: Icon, label }) => (
                <Button asChild key={label} size="icon-xs" variant="ghost">
                  <a href={href} aria-label={label} target="_blank" rel="noreferrer">
                    <Icon aria-hidden="true" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </header>

        <section
          id="top"
          className="grid gap-8 pt-10 pb-14 sm:pt-12 sm:pb-20 lg:grid-cols-[1.08fr_0.92fr] lg:items-start"
        >
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold text-primary">
              Cloud and DevOps engineering student
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-emerald-950 sm:text-6xl">
              Building resilient cloud platforms and automated delivery systems.
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Second-year engineering student in Cloud Computing at ESPRIT. I am
              passionate about cloud infrastructure, DevOps workflows, and service
              reliability. Experienced with AWS, Azure, OpenStack, Docker,
              Kubernetes, Terraform, and CI/CD automation.
            </p>
            <div className="mt-10 flex flex-wrap gap-2">
              <Button asChild>
                <a href={`mailto:${siteConfig.email}`}>
                  Contact me
                  <EnvelopeSimple aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="/Resume_FarahBenHarb.pdf" target="_blank" rel="noreferrer">
                  View resume
                  <FileText aria-hidden="true" />
                </a>
              </Button>
            </div>
            <div className="mt-8 flex max-w-2xl flex-wrap gap-2">
              {heroBadges.map((badge) => (
                <span
                  className="border border-emerald-950/10 bg-white/70 px-3 py-2 text-xs font-medium tracking-[0.12em] text-emerald-950 uppercase"
                  key={badge}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <aside className="self-start overflow-hidden border border-emerald-950/15 bg-white/72 shadow-xl shadow-emerald-950/5 backdrop-blur">
            <div className="border-b border-emerald-950/10 bg-[linear-gradient(135deg,rgba(16,185,129,0.12),rgba(255,255,255,0.85),rgba(37,99,235,0.08))] px-5 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Quick profile
              </p>
              <h2 className="mt-3 max-w-sm text-2xl font-bold leading-tight text-emerald-950">
                Strong cloud fundamentals with a delivery-first mindset.
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                Focused on infrastructure automation, container platforms, and
                production-ready monitoring.
              </p>
            </div>
            <div className="grid gap-4 p-5">
              {heroProfile.map((item) => (
                <div className="border border-emerald-950/10 bg-white/80 p-4" key={item.label}>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-emerald-950">{item.value}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="grid gap-3 border-y border-emerald-950/15 py-5 sm:grid-cols-4">
          {stats.map(([value, label]) => (
            <div className="bg-white/55 p-4" key={label}>
              <p className="text-3xl font-bold text-emerald-950">{value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {label}
              </p>
            </div>
          ))}
        </section>

        <section id="experience" className="border-b border-emerald-950/15 py-14">
          <div className="mb-8 flex items-end justify-between gap-6">
            <h2 className="text-2xl font-bold text-emerald-950">Experience</h2>
            <p className="hidden text-sm text-muted-foreground sm:block">
              Internships in networking, systems, and log analysis.
            </p>
          </div>

          <div className="grid gap-4">
            {experience.map((item) => (
              <article
                className="grid gap-4 border border-emerald-950/15 bg-white/70 p-5 backdrop-blur sm:grid-cols-[0.78fr_1.22fr]"
                key={item.company}
              >
                <div>
                  <p className="text-sm font-semibold text-primary">{item.period}</p>
                  <h3 className="mt-2 text-lg font-semibold text-emerald-950">
                    {item.company}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    {item.role} · {item.meta}
                  </p>
                </div>
                <p className="text-sm leading-7 text-muted-foreground">{item.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="border-b border-emerald-950/15 py-14">
          <div className="mb-8 flex items-end justify-between gap-6">
            <h2 className="text-2xl font-bold text-emerald-950">Selected projects</h2>
            <p className="hidden text-sm text-muted-foreground sm:block">
              Cloud delivery, infrastructure automation, and AI-powered products.
            </p>
          </div>

          <div className="divide-y divide-emerald-950/15 border border-emerald-950/15 bg-white/65">
            {projects.map((project) => (
              <article
                className="grid gap-4 p-5 transition-colors hover:bg-emerald-50/80 sm:grid-cols-[0.78fr_1.22fr]"
                key={project.name}
              >
                <div>
                  {project.href ? (
                    <a
                      className="inline-flex items-center gap-1 font-semibold text-emerald-950 underline-offset-4 hover:underline"
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.name}
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    </a>
                  ) : (
                    <h3 className="font-semibold text-emerald-950">{project.name}</h3>
                  )}
                  <p className="mt-2 text-xs leading-5 text-primary">{project.meta}</p>
                </div>
                <p className="text-sm leading-7 text-muted-foreground">{project.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="border-b border-emerald-950/15 py-14">
          <h2 className="mb-8 text-2xl font-bold text-emerald-950">Technical stack</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map(([group, ...skills]) => (
              <div className="border border-emerald-950/15 bg-white/70 p-5" key={group}>
                <h3 className="text-sm font-semibold text-emerald-950">{group}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {skills.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="certifications" className="grid gap-8 border-b border-emerald-950/15 py-14 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="text-2xl font-bold text-emerald-950">Certifications</h2>
            <div className="mt-6 grid gap-3">
              {certifications.map((activity) => (
                <p
                  className="border-l-2 border-primary bg-white/70 px-4 py-3 text-sm text-muted-foreground"
                  key={activity}
                >
                  {activity}
                </p>
              ))}
            </div>
          </div>

          <div className="border border-emerald-950/15 bg-[#11211f] p-6 text-white">
            <p className="text-xs uppercase tracking-[0.18em] text-emerald-200">
              Work style
            </p>
            <h2 className="mt-4 text-2xl font-bold">
              Structured, observable, and automation-first.
            </h2>
            <p className="mt-5 text-sm leading-7 text-emerald-50/75">
              Farah combines cloud architecture, container orchestration, and
              delivery automation to build reliable systems. Strong focus on
              CI/CD, observability, and production-ready infrastructure.
            </p>
          </div>
        </section>

        <section className="grid gap-8 border-b border-emerald-950/15 py-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-2xl font-bold text-emerald-950">Community</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
              Technical communities and hackathons are a core part of how Farah
              learns, collaborates, and keeps momentum around cloud and AI topics.
            </p>
          </div>
          <div className="grid gap-3">
            {community.map((item) => (
              <p
                className="border border-emerald-950/15 bg-white/70 px-4 py-4 text-sm leading-7 text-muted-foreground"
                key={item}
              >
                {item}
              </p>
            ))}
          </div>
        </section>

        <footer
          id="contact"
          className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Based in Ariana, Tunis. Seeking internships to apply skills in cloud
            infrastructure, DevOps automation, and platform reliability.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {links.map(({ href, icon: Icon, label }) => (
              <Button asChild key={label} size="icon" variant="outline">
                <a
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                >
                  <Icon aria-hidden="true" />
                </a>
              </Button>
            ))}
          </div>
        </footer>
      </div>
    </main>
  );
}
