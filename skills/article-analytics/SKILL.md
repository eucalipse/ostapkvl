---
name: article-analytics
description: Extract and reconcile article and social analytics, aggregate dated observations, and propose or build charts for Ostap's writing workspace. Use for LinkedIn exports, article performance, follower growth, engagement comparisons, and publication analysis. Does not publish articles or social posts.
---

# Article analytics

Help Ostap understand which articles reach people, which invite a response, and what evidence would improve the next publishing decision. Preserve the distinction between analysis and a recommendation; missing account access is not permission to invent metrics.

## Working context

The ostapkvl.com repository contains `content/posts/*.mdx`, writing rules in `WRITING.md`, the authenticated dashboard at `/private/articles`, and proposed LinkedIn captions in `data/article-launches.ts`. Read the local instructions before changing these. New articles remain drafts until the owner requests publication. The private dashboard is protected; `/drafts` previews are unlisted, not private.

Find available connected analytics tools or an authorized browser session first. Plausible reads require a server-side Stats API credential; never expose it in a chart, browser bundle, command argument, or report. LinkedIn counts require actual observations or a supplied export. Do not claim a connected or live source from the presence of a tracking script.

## Extract and reconcile

Inspect unfamiliar files before choosing columns:

```sh
python3 <skill>/scripts/analytics.py inspect input.xlsx
python3 <skill>/scripts/analytics.py inspect input.csv
```

CSV/TSV/JSON use the standard library. XLSX inspection and normalization use `openpyxl` if installed; do not silently reinterpret a workbook as CSV. Inspect all sheet names, then choose `--sheet` and a one-based `--header-row` when appropriate. Formula cells without cached values are missing, not zero.

Read [the schema and mapping guide](references/data-contract.md) before importing. Map source headings explicitly into dated lifetime observations. Save period reports separately: never turn a last-30-days count into a lifetime snapshot. Resolve article identity by exact URL or slug; title similarity is a candidate match, not proof. If more than one LinkedIn post promotes an article, keep that post-level dataset separate until there is an explicit aggregation rule. The current dashboard supports one post per article.

```sh
python3 <skill>/scripts/analytics.py normalize export.csv --mapping mapping.json --out workspace.json
python3 <skill>/scripts/analytics.py analyze workspace.json --out-dir report
```

Normalization produces a workspace JSON file and a separate provenance record with source hash, mapping and row counts. Keep raw exports and generated stats in private storage outside the public repository. Dashboard JSON backups can be merged using its import control. Read back the imported result; do not equate file generation with successful application import.

## Aggregate without changing meaning

Use the latest cumulative snapshot per article; never add successive lifetime totals. Group by article/topic only when identities and periods match. Snapshot differences are observed changes between dates, not exact daily growth. Negative changes can be corrections; retain and explain them.

Keep unknown, zero, unavailable and observed values distinct. Show source, observation date, reporting window and coverage beside each output. Never sum unique people across posts or add website views to LinkedIn impressions. Followers are profile-level snapshots, not attributable article conversions.

For interaction rate use `(reactions + comments + reposts) / impressions`, only with all inputs present and positive impressions. Label it as a custom rate excluding clicks and saves. For a combined rate sum numerators and denominators over the same complete rows, rather than averaging article percentages. Show how many articles qualify. Avoid ranking articles by tiny rates without showing their denominators and age.

## Propose and build charts

Read [chart choices](references/chart-choices.md) when recommending formats. Return a short ranked set: the question, suggested chart, alternate format, required fields, coverage, and why the comparison is valid. Mark unsupported ideas as awaiting data. Do not fill empty charts with invented examples unless explicitly labelled synthetic and requested.

The analyzer writes `chart-proposals.json`, a latest-observation table, and offline SVG charts when supported. It can render bars or dots for article comparison, a line for follower snapshots and a scatter plot for impressions versus interactions. Use the matching CSV as an accessible exact-value alternative. Keep `ostapkvl.com` visible at the bottom-right of exported visuals. Format changes must not silently change the dataset or aggregation.

For interactive exploration use an available visualization skill or the repository dashboard. For publication-quality graphics use plotting tools and verify the rendered artifact. Explain conclusions in terms the supplied data supports: association is not causation, impressions are not article reads, and a snapshot is not live analytics.

## Publishing handoff

Use results to propose topics or distribution experiments only after checking article content, sample size and observation windows. Prepare drafts/captions within the existing writing workflow. Analytics work does not authorize public posting, sending messages, or changing sharing settings. End with the artifacts, their source/window, what remains missing, and the next useful measurement.
