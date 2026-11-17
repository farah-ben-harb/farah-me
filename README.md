# Farah Ben Harb - Engineering Portfolio

Public portfolio for Farah Ben Harb, focused on Cloud Engineering, Infrastructure/DevOps, DevSecOps, SRE, and MLOps.

Production: [farah-me.vercel.app](https://farah-me.vercel.app)

## What This Portfolio Shows

- French home page at `/` and English version at `/en`
- An illustrated systems map linking directly to Cloud, DevOps and MLOps work
- A Mini CRM Intelligence case study with an explorable ML pipeline, architecture and CI evidence
- Two supporting projects (FootballMatch and Kubernetes automation) plus a collapsible project archive
- professional experience at Devoteam, Ooredoo, and Tunisie Telecom
- technical skills and education, grouped alongside professional experience
- One Cloud Engineering resume per language, linked in the matching portfolio version

The content follows an evidence-first rule: a deployment or test is described as successful only when a repository, public workflow, validation report, or reachable endpoint supports it. A live-demo button is shown only for a verified public endpoint.

## Technology

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Vercel hosting

Both language versions are statically rendered. Project data stays in `lib/portfolio-data.ts`, translated copy in `lib/portfolio-copy.ts`, and the shared page in `components/portfolio.tsx`. The systems map uses inline SVG and motion respects `prefers-reduced-motion`. The archive and pipeline use native HTML `details` without client state.

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
- Keep known limitations visible rather than implying production readiness.
- Do not publish private contact data in public resume assets.
- Keep author and committer identity set to `Farah Ben Harb <benharbfarah85@gmail.com>`.
