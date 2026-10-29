# Workspace data and extraction mapping

The dashboard imports a JSON object with `version: 1`, `snapshots` and `followers` arrays.

An article snapshot has:

- `slug`: exact slug in `content/posts`, without `.mdx`.
- `date`: ISO observation date `YYYY-MM-DD`, not the article publication date.
- `postUrl`: HTTPS LinkedIn URL or an empty string.
- `metrics`: all five keys `impressions`, `views`, `reactions`, `comments`, `reposts`. Values are nonnegative integers or `null`.

`views` means LinkedIn article views. Website pageviews are a separate Plausible series. Each snapshot contains cumulative counts for one LinkedIn post or article. This contract cannot represent a daily/weekly export or multiple posts per article without an explicit upstream reconciliation.

A follower snapshot has `date` and `count`. Duplicate article/date and follower/date identities are errors, even if the source rows look similar. Do not silently keep a conflicting row.

A mapping JSON for an article export:

```json
{
  "kind": "article",
  "basis": "lifetime",
  "columns": {
    "slug": "Article slug",
    "date": "Observed on",
    "postUrl": "Post URL",
    "impressions": "Impressions",
    "views": "Article views",
    "reactions": "Reactions",
    "comments": "Comments",
    "reposts": "Reposts"
  },
  "defaults": {},
  "allowed_slugs": ["example-article"],
  "date_format": "%Y-%m-%d"
}
```

Omit metric columns unavailable in the source: they become null. Use `defaults` for a verified observation date or slug shared by every row, not for invented counts. Explicit mappings take priority over defaults. Exact integer strings with standard thousands grouping (e.g. `1,234`) are accepted; abbreviated `1.2K`, percentages, negatives and fractional counts are rejected. Set an explicit `date_format` for non-ISO textual dates. Workbook date cells are accepted as dates. Blank rows are skipped; missing required cells are errors. An export whose date means “day the impressions occurred” must not be mapped to an observation date.

Follower mappings use `kind: "followers"`, `basis: "snapshot"`, and columns `date` and `count`. Snapshot count means total followers on that day; it does not mean new followers gained that day.

`normalize` emits only valid rows or fails before writing the output. It preserves a source SHA-256, sheet/header selection, mapping, row count and extraction timestamp in `<out>.provenance.json`. This is provenance, not proof that the source itself is correct. Check source semantics before normalization.

`analyze` accepts dashboard JSON and emits `latest-articles.csv`, `followers.csv`, `summary.json`, `chart-proposals.json`, and supported SVGs. A coverage count accompanies aggregate metrics. No source file is modified.
