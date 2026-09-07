# ostapkvl.com

Personal website of Ostap Kovalisko — Chief Architect, builder of production AI agent platforms.

Next.js App Router + TypeScript + Tailwind CSS. Static-first, no database: blog posts are MDX in `content/posts/`, projects and CV data are typed TS objects in `data/`.

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Structure

- `app/` — pages: home, about, projects, writing (+ `[slug]` article template), contact, cv
- `app/cv` — unlisted online CV: noindex, excluded from sitemap and nav; the Download PDF button prints the page via a dedicated print stylesheet (the page itself is the PDF)
- `content/posts/*.mdx` — articles with frontmatter (`title`, `date`, `dek`, `readTime`)
- `data/` — `site.ts` (links), `projects.ts` (flagship cards + work archive), `cv.ts` (CV entries, education, publications)
- `app/feed.xml` — RSS; `app/sitemap.ts`, `app/robots.ts` — SEO

## Adding a post

Drop a new `.mdx` file into `content/posts/` with the frontmatter fields above. It appears in the writing list, home page, sitemap, and RSS automatically.

## TODO

- Publication links in `data/cv.ts` are `#` placeholders — paste the real URLs.
- Contact form posts via `mailto:`; swap to a Formspree endpoint for real submissions.

## Deploy

Deployed on Vercel (eucalipse team). Push to `main` deploys production.

Domain: ostapkvl.com is connected at Vercel; ostapkovalisko.com should 301 to ostapkvl.com at the registrar (not in the app).
