# Farah Ben Harb - Engineering Portfolio

Public portfolio for Farah Ben Harb, focused on Cloud Engineering, Infrastructure/DevOps, DevSecOps, SRE, and MLOps.

Production: [farah-me.vercel.app](https://farah-me.vercel.app)

## What This Portfolio Shows

- French home page at `/` and English version at `/en`
- An illustrated systems map linking directly to Cloud, DevOps and MLOps work
- Four project categories: Cloud/Infrastructure/SRE, DevOps/DevSecOps/GitOps, AI/Data/MLOps, and Applications/Software
- Fifteen project cards keep all 18 repository case studies accessible. OpenStack Heat and Kubernetes Cluster Automation share one card with explicit infrastructure/cluster links and reciprocal links between their detail pages. DevoRecruiter and Alif retain their deployment repositories as companion links.
- Dedicated FR/EN project pages focused on architecture, implementation, environments, evidence and related repositories, without scope or limitations panels
- professional experience at Devoteam, Ooredoo, and Tunisie Telecom, each with its own verified tool stack
- separate education chronology (ESIGELEC, ESPRIT preparatory and engineering cycles, and the 2022 scientific baccalaureate) and technical skills section
- Nine skills categories covering project and internship technologies, with links to supporting case studies; inventory and scope are documented in `SKILLS_EVIDENCE.md` and maintained in `lib/skills.ts`
- locally hosted Devicon tool logos with text labels and a generic fallback for unbranded technologies; the icons are from [Devicon](https://github.com/devicons/devicon) revision `32fe1d3b3f36ad11f90ab94f7db59738139c2bf6` under the license in `public/tool-icons/LICENSE.txt`
- A compact CV icon beside the hero actions opens the matching Cloud Engineering PDF in a new tab, with no separate resume section
- A hero contact shortcut leads to a dedicated closing panel: internship availability, visible email, click-to-call phone, location and labeled LinkedIn/GitHub links, fully localized in FR/EN

The content follows an evidence-first rule: a deployment or test is described as successful only when a repository, public workflow, validation report, or reachable endpoint supports it. A live-demo button is shown only for a verified public endpoint.

## Technology

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Vercel hosting

Both language versions and all 36 project pages are statically rendered. Repository identities stay in `lib/portfolio-data.ts`, project editorial content in `lib/project-details.ts`, home-page copy in `lib/portfolio-copy.ts`, and the shared views in `components/portfolio.tsx` and `components/project-detail.tsx`. The server-rendered `components/project-collection.tsx` groups every project into one of four named categories, with anchor navigation and no filtering or hidden projects. The systems map uses inline SVG and motion respects `prefers-reduced-motion`. Project language switches preserve the current project. Only the verified FootballMatch API has a live-demo button; other projects link to their code and documentation, without placeholder demo links.

## Local Development

Requirements: Node.js and npm.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

Webpack is selected explicitly for local and production builds because Windows app-container path aliases can make Turbopack treat files in this workspace as external to the configured root. The Vercel-compatible Next.js output remains fully static.

## Validation

```bash
npm run lint
npm run check:links
npm run build
```

With the production server running at `http://127.0.0.1:3100`, run `npm run test:projects` to check all 36 case-study pages, their language switches, canonical URLs, source links, sitemap, local logos and unknown-project 404s. Override `SITE_URL` for another local or public origin. Browser checks in `scripts/capture-visual-qa.mjs` cover desktop/mobile layouts and interactions via CDP.

`check:links` verifies the portfolio's local PDF/media resources, all listed GitHub repositories, and the public FootballMatch API demo. LinkedIn is intentionally excluded because it blocks automated requests.

## Public Resumes

Each page links only to its matching Cloud Engineering PDF:

- `farah-ben-harb-cloud-engineering-en.pdf`
- `farah-ben-harb-cloud-engineering-fr.pdf`

The other PDFs remain unlisted in `public/resumes/` to preserve existing direct links.

The public versions omit the phone number while retaining email, Rouen, LinkedIn, GitHub, and the portfolio URL. Rebuild them with:

```bash
python scripts/build-public-resumes.py
```

The source script requires ReportLab, pypdf, and Pillow. PDF previews in `public/resume-previews/` are optimized WebP renders of the first page.

## Project Structure

- `app/` - page, layout, metadata, manifest, sitemap, robots, and Open Graph image
- `components/` - reusable UI and contact actions
- `lib/portfolio-data.ts` - audited project content
- `lib/site.ts` - canonical identity, domain, social links, and SEO keywords
- `public/resumes/` - downloadable sanitized PDFs
- `public/resume-previews/` - lazy-loaded WebP previews
- `public/project-media/` - repository-sourced, optimized media
- `scripts/` - PDF generation and link/resource validation

## Deployment

The GitHub repository is connected to Vercel. Pushes to the production branch can trigger an automatic deployment, so deployment status and the public endpoint should be checked after each production push.

## Content Rules

- Do not add a live-demo link without verifying that it responds.
- Distinguish configured pipelines from publicly executed pipelines.
- Distinguish infrastructure definitions from a running cloud environment.
- Preserve audit context in the editorial source data, without rendering dedicated scope or limitations panels. Keep deployment and validation descriptions factual; do not imply unverified production readiness.
- Do not publish private contact data in public resume assets.
- Keep author and committer identity set to `Farah Ben Harb <benharbfarah85@gmail.com>`.
