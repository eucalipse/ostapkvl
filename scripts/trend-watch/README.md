# Trend watch

Daily GitHub star collector for the tools already tracked in
`content/research/tool-digest.md`, plus a Kleinberg burst-detection runner
on top of the collected history. Idea borrowed from the `signal` project's
event-detection work: a sudden acceleration in a tool's star count is a
stronger "this is worth a digest entry" signal than a one-off WebSearch
snapshot, the same way a real news event shows a sharper burst than a
viral meme.

`burst.py` is copied verbatim from `~/www/signal/signal/src/burst.py`
(Kleinberg 2003, reimplemented from scratch because the `burst_detection`
PyPI package is dead). Keep it in sync if the signal project fixes a bug
in it.

## What this does NOT do

This does not replace `skills/idea-triage`'s Scan mode, and it does not
find *new* tools on its own — it only tells you when a tool *already in
tool-digest.md* (or added to `tools.json` below) is accelerating. Finding
genuinely new tools still needs the WebSearch-based scan, because GitHub
stars require already knowing a repo's name.

## Setup

No dependencies to install — both scripts use only the Python standard
library (`urllib`, not `requests`), so there's nothing to `pip install`.

No GitHub token is required for a handful of repos checked once a day —
the unauthenticated REST API rate limit (60 req/hour per IP) covers it.
Set a `GITHUB_TOKEN` env var if the tracked list grows past ~50 repos.

## Running it

```
cd scripts/trend-watch
python3 collect.py       # appends today's star count for each tracked repo
python3 run_burst.py     # runs burst detection over the collected history so far
```

`run_burst.py` imports `burst.py` from the same directory, so run it from
inside `scripts/trend-watch/`, not the repo root.

Run `collect.py` once a day (cron, or manually) to build up history.
`run_burst.py` needs at least ~2-3 weeks of daily points before a burst
means anything — Kleinberg's model fits a baseline rate from the whole
series, so a 3-day history can't tell baseline from burst yet.

## Data

`scripts/trend-watch/data/stars.json` — one row per (repo, date), appended
by `collect.py`, never overwritten. Small, plain JSON, committed to the
repo like any other content data file — no database needed at this scale.

## Tracked repos

Edit `scripts/trend-watch/tools.json` to add or remove a repo. Each entry:
`{"slug": "graphicle", "repo": "Graphicle-AI/graphicle"}` — `repo` must be
the exact `owner/name` GitHub uses.
