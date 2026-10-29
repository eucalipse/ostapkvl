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

## Private article workspace

`/private/articles` requires HTTP Basic authentication (username `ostap`) and a server-only `PRIVATE_ARTICLES_PASSWORD` of at least 24 characters. Missing or short configuration denies access. Use a generated random password and HTTPS. The page and stats API enforce authorization independently, disable caching, and stay out of the sitemap. Browser Basic authentication has no reliable application logout; close the private browser session when finished.

Set `PLAUSIBLE_STATS_API_KEY` on the server to read website article views through Plausible's Stats API. The endpoint queries `ostapkvl.com` for the selected 7, 30 or 91-day window. Without a working credential the dashboard shows an explicit unavailable state. No provider secrets enter browser code.

LinkedIn counts are dated lifetime snapshots entered from the owner's analytics. They are stored in this browser only; export/import JSON backups to move between devices. The workspace tracks one LinkedIn post per article and rejects conflicting post identities. Followers are profile-level snapshots. Engagement is the custom `(reactions + comments + reposts) / impressions` rate, excluding clicks and saves. The latest snapshot is used; repeated cumulative counts are never added together.

New drafts appear in the publishing queue with proposed LinkedIn captions from `data/article-launches.ts`. Draft previews remain unlisted, not private. No publish button or automatic social posting is included.

The reusable agent skill is in `skills/article-analytics/`. Its extraction helper inspects CSV/TSV/JSON/XLSX, maps columns to the workspace schema, and exports source provenance, aggregate tables, chart proposals and SVGs. XLSX support requires `openpyxl` in the Python environment. Keep raw exports, reports and credentials in `.private-data/` or another private location, never in tracked content.

Validation:

```sh
node scripts/tests/article-analytics.cjs
python3 scripts/tests/test_article_skill.py  # requires openpyxl
npm run build
node scripts/tests/article-routes.cjs       # uses a temporary local server
```
