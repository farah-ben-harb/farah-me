import Image from "next/image";
import {
  ArrowUpRight,
  CheckCircle,
  DownloadSimple,
  EnvelopeSimple,
  FileText,
  GithubLogo,
  LinkedinLogo,
  ShieldCheck,
  WarningCircle,
} from "@phosphor-icons/react/dist/ssr";

import { ContactActions } from "@/components/contact-actions";
import { Button } from "@/components/ui/button";
import {
  otherProjects,
  projects,
  resumeTracks,
  type Project,
} from "@/lib/portfolio-data";
import { siteConfig } from "@/lib/site";

const experience = [
  {
    company: "Devoteam",
    role: "Cloud & DevOps Intern",
    period: "July - August 2026",
    summary:
      "Automated Azure infrastructure with Terraform, built GitHub Actions delivery workflows, deployed services to K3s/Kubernetes through Helm and Argo CD, monitored them with Dynatrace, and developed an MCP integration for Claude Desktop.",
    technologies:
      "Azure · Terraform · GitHub Actions · Linux · Docker · K3s · Kubernetes · Helm · Argo CD · Dynatrace · MCP",
  },
  {
    company: "Ooredoo",
    role: "Software Development & Data Intern",
    period: "July - August 2025",
    summary:
      "Developed Python and Java tools for technical data and system-log processing, then automated workflows and built search interfaces to improve data access.",
    technologies: "Python · Java",
  },
  {
    company: "Tunisie Télécom",
    role: "Networks & Systems Intern",
    period: "June - July 2023",
    summary:
      "Supported telecommunications network and systems environments, working with Linux, TCP/IP, IP addressing, routing, and infrastructure services.",
    technologies: "Linux · TCP/IP · Routing · Networking",
  },
] as const;

const skillGroups = [
  {
    label: "Cloud & infrastructure",
    values: ["AWS", "Azure", "OpenStack", "Terraform", "Ansible", "Linux", "TCP/IP"],
  },
  {
    label: "Containers & GitOps",
    values: ["Docker", "Kubernetes", "K3s", "Helm", "Argo CD", "Kustomize", "GHCR"],
  },
  {
    label: "Delivery & security",
    values: ["GitHub Actions", "Jenkins", "Pytest", "Gitleaks", "Semgrep", "Trivy", "Bandit"],
  },
  {
    label: "MLOps & AI platforms",
    values: ["MLflow", "Kubeflow", "YOLO11", "ByteTrack", "OpenCV", "RAG", "pgvector", "Ollama"],
  },
  {
    label: "Backend & observability",
    values: ["Python", "FastAPI", "Java", "PostgreSQL", "Prometheus", "Grafana", "Dynatrace", "Zabbix"],
  },
] as const;

const certifications = [
  "AWS Academy Cloud Operations (2026)",
  "AWS Academy Cloud Security (2026)",
  "Hedera Certified Developer Associate - HCDA (2026)",
  "Hedera Certified Foundation - HCF (2026)",
  "Hedera Business Foundation - HBF (2026)",
  "Cisco Networking Academy Network Security (2026)",
  "AWS Certified Cloud Practitioner (2024)",
  "OCI Foundations Associate (2024)",
  "Multicloud Network Associate (2024)",
  "CCNA: Switching, Routing, and Wireless Essentials (2023)",
] as const;

const headerLinks = [
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Resumes", "#resumes"],
  ["Skills", "#skills"],
  ["Contact", "#contact"],
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  jobTitle: "Cloud, DevOps and MLOps Engineering Student",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rouen",
    addressCountry: "FR",
  },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "ESIGELEC" },
    { "@type": "CollegeOrUniversity", name: "ESPRIT" },
  ],
  knowsAbout: [
    "Cloud Engineering",
    "DevOps",
    "MLOps",
    "AWS",
    "Azure",
    "OpenStack",
    "Kubernetes",
    "Terraform",
    "GitOps",
    "Observability",
  ],
  sameAs: [siteConfig.github, siteConfig.linkedin],
};

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="section-kicker">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-emerald-950 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">
        {description}
      </p>
    </div>
  );
}

function EvidenceList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-900">
        {title}
      </h4>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
        {items.map((item) => (
          <li className="flex gap-2" key={item}>
            <CheckCircle
              aria-hidden="true"
              className="mt-1 size-4 shrink-0 text-emerald-600"
              weight="fill"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const projectId = `project-${index + 1}`;

  return (
    <article
      aria-labelledby={projectId}
      className="project-card overflow-hidden border border-emerald-950/15 bg-white/80 shadow-[0_18px_60px_rgba(18,59,54,0.08)]"
    >
      {project.media ? (
        <figure className="border-b border-emerald-950/10 bg-sky-50">
          <Image
            alt={project.media.alt}
            className="aspect-[16/9] w-full object-cover"
            height={503}
            loading="lazy"
            src={project.media.src}
            width={900}
          />
          <figcaption className="px-5 py-3 text-xs leading-5 text-muted-foreground">
            {project.media.caption}
          </figcaption>
        </figure>
      ) : null}

      <div className="p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-semibold text-emerald-700">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-emerald-950" id={projectId}>
              {project.name}
            </h3>
          </div>
          <span className="border border-emerald-700/20 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900">
            {project.status}
          </span>
        </div>

        <p className="mt-4 text-base leading-7 text-muted-foreground">{project.summary}</p>

        <div className="mt-5 flex flex-wrap gap-2" aria-label={`${project.name} technologies`}>
          {project.technologies.map((technology) => (
            <span
              className="border border-emerald-950/10 bg-[#f3f7f3] px-2.5 py-1 text-xs font-medium text-emerald-950"
              key={technology}
            >
              {technology}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild size="sm">
            <a href={project.repository} rel="noreferrer" target="_blank">
              GitHub repository
              <GithubLogo aria-hidden="true" />
            </a>
          </Button>
          {project.liveDemo ? (
            <Button asChild size="sm" variant="outline">
              <a href={project.liveDemo} rel="noreferrer" target="_blank">
                {project.demoLabel ?? "Live demo"}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          ) : null}
        </div>

        <details className="evidence-details mt-7 border-t border-emerald-950/10 pt-5">
          <summary className="cursor-pointer text-sm font-bold text-emerald-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">
            Architecture, validation, and current limits
          </summary>
          <div className="mt-6 grid gap-6 border-l-2 border-emerald-500/35 pl-5 sm:grid-cols-2">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-900">
                Problem and architecture
              </h4>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.problem}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.architecture}</p>
            </div>
            <EvidenceList items={project.completed} title="Completed" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-900">
                Tests and CI
              </h4>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.validation}</p>
              <h4 className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-emerald-900">
                Cloud / infrastructure
              </h4>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.infrastructure}</p>
            </div>
            <div>
              <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-amber-800">
                <WarningCircle aria-hidden="true" className="size-4" weight="fill" />
                Current limits
              </h4>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                {project.limitations.map((limitation) => (
                  <li key={limitation}>{limitation}</li>
                ))}
              </ul>
            </div>
          </div>
        </details>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(145deg,#e4f4ea_0%,#f7f9f4_23%,#fffdf7_53%,#edf5ff_100%)] text-foreground">
      <a
        className="fixed left-4 top-4 z-50 -translate-y-24 bg-emerald-950 px-4 py-3 text-sm font-bold text-white transition-transform focus:translate-y-0"
        href="#main-content"
      >
        Skip to content
      </a>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_14%_8%,rgba(16,185,129,0.2),transparent_34%),radial-gradient(circle_at_62%_4%,rgba(37,99,235,0.13),transparent_32%),linear-gradient(rgba(19,83,75,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(19,83,75,0.05)_1px,transparent_1px)] bg-[size:auto,auto,44px_44px,44px_44px]"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        type="application/ld+json"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-5 sm:px-8 lg:px-10">
        <header className="flex flex-col gap-5 border-b border-emerald-950/15 py-6 lg:flex-row lg:items-center lg:justify-between">
          <a className="text-sm font-bold tracking-tight text-emerald-950" href="#top">
            Farah Ben Harb <span className="text-emerald-700">/ Engineering portfolio</span>
          </a>
          <div className="flex flex-wrap items-center gap-3">
            <nav aria-label="Primary navigation" className="flex flex-wrap gap-1 text-xs text-muted-foreground">
              {headerLinks.map(([label, href]) => (
                <a
                  className="px-2 py-2 font-medium transition-colors hover:text-emerald-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                  href={href}
                  key={href}
                >
                  {label}
                </a>
              ))}
            </nav>
            <Button asChild size="icon-sm" variant="ghost">
              <a aria-label="GitHub profile" href={siteConfig.github} rel="noreferrer" target="_blank">
                <GithubLogo aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="icon-sm" variant="ghost">
              <a aria-label="LinkedIn profile" href={siteConfig.linkedin} rel="noreferrer" target="_blank">
                <LinkedinLogo aria-hidden="true" />
              </a>
            </Button>
          </div>
        </header>

        <div id="main-content">
          <section
            className="grid gap-9 py-14 sm:py-20 lg:grid-cols-[1.25fr_0.75fr] lg:items-end"
            id="top"
          >
            <div className="max-w-4xl">
              <p className="section-kicker">Cloud · DevOps · MLOps</p>
              <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-emerald-950 sm:text-6xl lg:text-7xl">
                Engineering platforms with the evidence attached.
              </h1>
              <p className="mt-7 max-w-3xl text-base leading-8 text-muted-foreground sm:text-xl">
                Computer engineering student at ESIGELEC and ESPRIT, building cloud-native systems,
                infrastructure automation, secure delivery pipelines, and observable ML services.
                Seeking a six-month final-year internship from March 2027.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href="#projects">
                    Explore verified work
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="#resumes">
                    Choose a resume
                    <FileText aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </div>

            <aside className="border border-emerald-950/15 bg-emerald-950 p-6 text-emerald-50 shadow-[12px_12px_0_rgba(18,59,54,0.12)] sm:p-8">
              <ShieldCheck aria-hidden="true" className="size-8 text-emerald-300" weight="duotone" />
              <h2 className="mt-5 text-xl font-bold">Evidence-first portfolio</h2>
              <p className="mt-3 text-sm leading-6 text-emerald-50/75">
                Project statements were checked against repositories, workflows, manifests, and public
                endpoints on 10 November 2026. A live button appears only where the endpoint responded.
              </p>
              <dl className="mt-7 grid grid-cols-2 gap-5 border-t border-emerald-100/20 pt-6">
                <div>
                  <dt className="text-xs text-emerald-100/65">Internships</dt>
                  <dd className="mt-1 text-2xl font-bold">3</dd>
                </div>
                <div>
                  <dt className="text-xs text-emerald-100/65">Certifications</dt>
                  <dd className="mt-1 text-2xl font-bold">10</dd>
                </div>
                <div>
                  <dt className="text-xs text-emerald-100/65">Reviewed projects</dt>
                  <dd className="mt-1 text-2xl font-bold">18</dd>
                </div>
                <div>
                  <dt className="text-xs text-emerald-100/65">Expected graduation</dt>
                  <dd className="mt-1 text-2xl font-bold">2027</dd>
                </div>
              </dl>
            </aside>
          </section>

          <section className="border-t border-emerald-950/15 py-16 sm:py-20" id="experience">
            <SectionHeading
              description="Three internships connect the portfolio's software, infrastructure, and delivery work to professional environments."
              eyebrow="Experience"
              title="From infrastructure definitions to running services"
            />
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {experience.map((item, index) => (
                <article
                  className={`border p-6 sm:p-7 ${
                    index === 0
                      ? "border-emerald-900 bg-emerald-950 text-emerald-50 lg:col-span-2"
                      : "border-emerald-950/15 bg-white/75"
                  }`}
                  key={item.company}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className={`text-sm font-bold ${index === 0 ? "text-emerald-300" : "text-emerald-700"}`}>
                        {item.company}
                      </p>
                      <h3 className="mt-2 text-xl font-bold">{item.role}</h3>
                    </div>
                    <p className={`text-xs font-medium ${index === 0 ? "text-emerald-100/65" : "text-muted-foreground"}`}>
                      {item.period}
                    </p>
                  </div>
                  <p className={`mt-5 text-sm leading-7 ${index === 0 ? "text-emerald-50/80" : "text-muted-foreground"}`}>
                    {item.summary}
                  </p>
                  <p className={`mt-5 text-xs leading-5 ${index === 0 ? "text-emerald-200" : "text-emerald-800"}`}>
                    {item.technologies}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="border-t border-emerald-950/15 py-16 sm:py-20" id="projects">
            <SectionHeading
              description="Each case separates repository evidence from deployment claims. Open a card for architecture, completed work, executed validation, infrastructure, and known limits."
              eyebrow="Selected work"
              title="Twelve recent engineering projects"
            />
            <div className="mt-10 grid gap-6 xl:grid-cols-2">
              {projects.map((project, index) => (
                <ProjectCard index={index} key={project.name} project={project} />
              ))}
            </div>

            <div className="mt-16 border-t border-emerald-950/15 pt-12">
              <h3 className="text-2xl font-bold tracking-tight text-emerald-950">Other projects</h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                Earlier application, data, desktop, and game work that broadens the software foundation behind
                the cloud-focused projects above.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {otherProjects.map((project) => (
                  <article className="border border-emerald-950/15 bg-white/70 p-5" key={project.name}>
                    <h4 className="text-base font-bold text-emerald-950">{project.name}</h4>
                    <p className="mt-2 text-xs font-semibold text-emerald-700">{project.stack}</p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.summary}</p>
                    <a
                      className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-800 underline decoration-emerald-400/50 underline-offset-4 hover:text-emerald-600"
                      href={project.repository}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Repository <ArrowUpRight aria-hidden="true" className="size-4" />
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t border-emerald-950/15 py-16 sm:py-20" id="resumes">
            <SectionHeading
              description="Six public one-page resumes are available. Phone details were removed; stable portfolio, GitHub, LinkedIn, and email links are retained."
              eyebrow="Resumes · CV"
              title="Choose the angle that matches the role"
            />
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {resumeTracks.map((track) => (
                <article className="border border-emerald-950/15 bg-white/80 p-5 sm:p-6" key={track.slug}>
                  <h3 className="text-xl font-bold text-emerald-950">{track.name}</h3>
                  <p className="mt-3 min-h-18 text-sm leading-6 text-muted-foreground">{track.description}</p>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    {(["en", "fr"] as const).map((language) => {
                      const label = language === "en" ? "English" : "Français";
                      const pdf = `/resumes/farah-ben-harb-${track.slug}-${language}.pdf`;
                      const preview = `/resume-previews/farah-ben-harb-${track.slug}-${language}.webp`;
                      return (
                        <div className="overflow-hidden border border-emerald-950/10 bg-[#f6f8f4]" key={language}>
                          <a aria-label={`Preview ${track.name} resume in ${label}`} href={pdf} target="_blank">
                            <Image
                              alt={`${track.name} resume preview in ${label}`}
                              className="aspect-[1/1.414] w-full object-cover object-top transition-opacity hover:opacity-85"
                              height={1273}
                              loading="lazy"
                              src={preview}
                              width={900}
                            />
                          </a>
                          <div className="border-t border-emerald-950/10 p-3">
                            <p className="text-xs font-bold text-emerald-950">{label}</p>
                            <div className="mt-2 flex flex-col gap-1 text-xs">
                              <a className="font-semibold text-emerald-800 hover:text-emerald-600" href={pdf} target="_blank">
                                Preview PDF
                              </a>
                              <a className="inline-flex items-center gap-1 font-semibold text-emerald-800 hover:text-emerald-600" download href={pdf}>
                                Download <DownloadSimple aria-hidden="true" />
                              </a>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="border-t border-emerald-950/15 py-16 sm:py-20" id="skills">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <SectionHeading
                  description="Grouped around the systems demonstrated in the repositories and the training documented in the resumes."
                  eyebrow="Capabilities"
                  title="Skills with a project trail"
                />
                <div className="mt-9 space-y-7">
                  {skillGroups.map((group) => (
                    <div key={group.label}>
                      <h3 className="text-sm font-bold text-emerald-950">{group.label}</h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {group.values.map((value) => (
                          <span className="border border-emerald-950/12 bg-white/70 px-3 py-1.5 text-xs font-medium" key={value}>
                            {value}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <article className="border border-emerald-950/15 bg-emerald-950 p-7 text-emerald-50 sm:col-span-2">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">Education</p>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-bold">ESIGELEC · Rouen</h3>
                      <p className="mt-2 text-sm leading-6 text-emerald-50/75">
                        Academic exchange in the final year of the engineering program · 2026-2027
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">ESPRIT · Tunis</h3>
                      <p className="mt-2 text-sm leading-6 text-emerald-50/75">
                        Computer Engineering, IT Architecture & Cloud Computing · 2022-2027
                      </p>
                    </div>
                  </div>
                </article>
                <article className="border border-emerald-950/15 bg-white/80 p-6 sm:col-span-2">
                  <h3 className="text-lg font-bold text-emerald-950">Certifications</h3>
                  <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {certifications.map((certification) => (
                      <li className="flex gap-2 text-sm leading-6 text-muted-foreground" key={certification}>
                        <CheckCircle aria-hidden="true" className="mt-1 size-4 shrink-0 text-emerald-600" weight="fill" />
                        <span>{certification}</span>
                      </li>
                    ))}
                  </ul>
                </article>
                <article className="border border-emerald-950/15 bg-white/80 p-6 sm:col-span-2">
                  <h3 className="text-lg font-bold text-emerald-950">Languages</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Arabic (native) · French (B2) · English (C1) · Spanish (A1)
                  </p>
                </article>
              </div>
            </div>
          </section>

          <section className="border-y border-emerald-950/15 py-16 sm:py-20" id="contact">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-3xl">
                <p className="section-kicker">Contact</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-emerald-950 sm:text-5xl">
                  Let&apos;s build a reliable platform.
                </h2>
                <p className="mt-5 text-base leading-7 text-muted-foreground">
                  Available for a six-month final-year internship from March 2027 in Cloud Engineering,
                  Infrastructure/DevOps, SRE, or MLOps.
                </p>
              </div>
              <ContactActions />
            </div>
          </section>
        </div>

        <footer className="flex flex-col gap-3 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Farah Ben Harb. Built with Next.js and deployed on Vercel.</p>
          <a className="inline-flex items-center gap-2 font-semibold text-emerald-800" href={`mailto:${siteConfig.email}`}>
            <EnvelopeSimple aria-hidden="true" />
            {siteConfig.email}
          </a>
        </footer>
      </div>
    </main>
  );
}
