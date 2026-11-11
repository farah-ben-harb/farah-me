# Farah Ben Harb — Engineering Portfolio

Bilingual engineering portfolio focused on Cloud Engineering, Platform/DevOps, DevSecOps, Infrastructure/SRE, and MLOps. The site presents repository-backed projects, professional experience, and the limits of validation as carefully as the successful checks.

## Local preview

Requirements: Node.js and npm.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000` for English or `http://localhost:3000/fr` for French.

## Quality checks

```bash
npm run lint
npx tsc --noEmit
npm run check:links
npm run build
```

`check:links` validates the public portrait/project media, listed GitHub repositories, and the FootballMatch API demo. LinkedIn is excluded because automated access is blocked. A successful static build or CI check is not evidence of a cloud deployment.

## Design and content

- Next.js App Router, React, TypeScript, Tailwind CSS.
- Server-rendered English and French pages with a language switcher.
- Responsive, dark Mission Control visual language; restrained motion and `prefers-reduced-motion` support.
- Native `details` elements keep project evidence accessible without client-side state.
- Project status distinguishes merged CI evidence, static validation, documented demos, unknown runtime state, and workstreams not re-audited.
- The FootballMatch card keeps Docker Compose, K3s/Helm/Argo CD, and Azure Container Apps as separate deployment paths. MLflow Registry is implemented; loading the `champion` alias is not the default inference behavior.
- No CV section or downloadable CV links are presented on the site.

The six resume PDFs and their six previews are preserved unchanged in a local archive outside this repository. They are not exposed as site assets or committed in this branch. They were not edited as part of the portfolio redesign. Historical Git commits may still contain the files; this work does not rewrite public history.

## Images and privacy

The public portrait is an optimized WebP conversion of the photo supplied by Farah; it is not AI-generated and its facial features were not altered. No project screenshots are fabricated. LinkedIn post/badge URLs are not included unless individually confirmed and publicly accessible.

## Deployment

The GitHub repository is connected to Vercel, and a push to the production branch may deploy automatically. This task uses a local feature branch only: no push, merge, Preview deployment, or production deployment is authorized or performed. Check the Vercel project’s Preview and Production settings before publishing changes.

## Evidence rules

- Do not add a live-demo link without verifying that it responds.
- Distinguish configured pipelines from executed workflows and infrastructure definitions from a running environment.
- Keep unresolved operational actions and known limits visible.
- Git author and committer for portfolio changes: `Farah Ben Harb <benharbfarah85@gmail.com>`.
