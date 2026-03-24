## Overview

This repository contains the source for **Andrew Teece Photography**, a content‑driven portfolio and blog built with Next.js. The site is designed to showcase long‑term photographic projects, thoughtful writing, and a curated portfolio with fast performance and solid SEO.

- Framework: Next.js 15 (App Router, TypeScript)
- Styling: Tailwind CSS 4
- Content: MDX for blog posts and galleries
- Images: Next.js Image Optimization + prebuilt image manifest
- Hosting: Vercel

The app is structured around a small number of high‑level routes:

- `/` – Landing page and featured work
- `/portfolio` + `/portfolio/[slug]` – Galleries with narrative MDX and image grids
- `/blog` + `/blog/[slug]` – Writing about process, refactors, and influences
- `/about` – Artist statement and background
- `/contact` – Contact form and direct email

## Local development

Install dependencies with your preferred package manager; examples below use `pnpm`.

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000.

The codebase uses the Next.js App Router under `src/app`. Global layout, fonts, SEO defaults, JSON‑LD, analytics, and shared chrome are configured in:

- `src/app/layout.tsx` – root layout, global metadata, JSON‑LD, analytics wiring
- `src/app/page.tsx` – home page

## Scripts

Common scripts are defined in `package.json`:

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm start        # Start built app locally
pnpm lint         # ESLint
pnpm build:images # Prebuild and optimize image variants
pnpm test:seo     # SEO smoke test against a running server
```

The SEO test can be pointed at a local or remote base URL:

```bash
# Against local production build
pnpm build && pnpm start
pnpm test:seo

# Against production site
SEO_TEST_BASE_URL=https://www.andrewteecephotography.com pnpm test:seo
```

## Content model

All long‑form content lives in the `content/` tree as MDX:

- `content/blog/*.mdx` – blog posts (frontmatter + Markdown/MDX body)
- `content/galleries/*.mdx` – portfolio galleries with frontmatter, story, and image lists

Posts and galleries are loaded via small lib helpers:

- `src/lib/posts.ts` – blog post loading, sorting, and typing
- `src/lib/galleries.ts` – gallery loading and typing

Hero images for posts and galleries are driven from frontmatter `cover` fields and rendered via Next.js `Image` components in the relevant route pages.

## SEO & analytics

The site is configured with production‑ready SEO and analytics:

- Canonical URLs and OpenGraph/Twitter metadata per page
- JSON‑LD for person, website, galleries, and blog posts
- XML sitemap, image sitemap, robots.txt, and RSS feed
- Google Analytics 4 (page views, custom events, Core Web Vitals)

For details and how to update or extend the configuration, see:

- `SEO_SETUP.md`
- `src/lib/analytics.ts`

## Deployment

The project is intended to be deployed on Vercel:

1. Connect the GitHub repository to Vercel.
2. Set environment variables (for example: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`).
3. Push to `main`; Vercel will build and deploy automatically.

You can also build and run locally to verify production behavior:

```bash
pnpm build
pnpm start
```

## License

This repository contains proprietary photography and writing. Do not reuse images, text, or other assets without explicit permission from the author.
