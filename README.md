# farah-me

Personal portfolio website built with Next.js and TypeScript.

This project presents my work in cloud, DevOps, DevSecOps, infrastructure automation, and modern application delivery.

## Overview

The site is my public-facing portfolio and contact point.

It is designed to:

- highlight my strongest technical projects
- present my cloud and DevOps experience in one place
- give recruiters a fast way to find the most relevant repositories
- show frontend polish alongside backend and infrastructure work

## Tech Stack

- Next.js
- React
- TypeScript
- Vercel

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to view the site.

## Project Structure

- `app/` for route and page components
- `components/` for reusable UI pieces
- `lib/` for shared utilities
- `public/` for static assets
- `scripts/` for helper automation

## Deployment

The portfolio is deployed on Vercel.

## Notes

This repository intentionally stays focused on the portfolio experience rather than duplicating the technical detail that lives in the backend and infrastructure repositories.

## Branching and Commits

- Use branches such as `feat/<area>`, `fix/<area>`, `docs/<area>`, or `ui/<area>`
- Keep commits focused on one UI or content change
- Prefer Conventional Commits such as `feat(portfolio): refine project cards`
- Avoid vague commit messages like `update`, `misc`, or `final`

## Contributing

- Keep the public presentation polished and easy to navigate
- Prefer small changes that are easy to review visually
- Avoid committing generated artifacts unless they are required for the deployment workflow
