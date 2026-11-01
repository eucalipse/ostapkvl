"""Daily GitHub star collector for tools tracked in tool-digest.md.

Appends one row per (repo, date) to data/stars.json. Never overwrites a
day already recorded for a repo — safe to run more than once on the same
day. No GitHub token needed at this scale (unauthenticated REST API:
60 requests/hour per IP); set GITHUB_TOKEN if the tracked list grows.
"""
from __future__ import annotations

import json
import os
import sys
import time
import urllib.error
import urllib.request
from datetime import date, datetime, timezone
from pathlib import Path

HERE = Path(__file__).parent
TOOLS_FILE = HERE / "tools.json"
DATA_FILE = HERE / "data" / "stars.json"


def load_tools() -> list[dict]:
    return json.loads(TOOLS_FILE.read_text())


def load_history() -> list[dict]:
    if not DATA_FILE.exists():
        return []
    return json.loads(DATA_FILE.read_text())


def save_history(rows: list[dict]) -> None:
    DATA_FILE.parent.mkdir(parents=True, exist_ok=True)
    DATA_FILE.write_text(json.dumps(rows, indent=2, sort_keys=True) + "\n")


def fetch_stars(repo: str, token: str | None) -> int:
    url = f"https://api.github.com/repos/{repo}"
    headers = {"Accept": "application/vnd.github+json", "User-Agent": "ostapkvl-trend-watch"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, timeout=15) as resp:
        body = json.loads(resp.read())
    return body["stargazers_count"]


def main() -> None:
    only_slug = sys.argv[1] if len(sys.argv) > 1 else None
    tools = load_tools()
    if only_slug:
        tools = [t for t in tools if t["slug"] == only_slug]
        if not tools:
            print(f"no tracked tool with slug {only_slug!r}; see tools.json")
            sys.exit(1)

    token = os.environ.get("GITHUB_TOKEN")
    history = load_history()
    today = date.today().isoformat()
    existing = {(row["slug"], row["date"]) for row in history}

    for tool in tools:
        slug, repo = tool["slug"], tool["repo"]
        if (slug, today) in existing:
            print(f"skip {slug}: already recorded for {today}")
            continue
        try:
            stars = fetch_stars(repo, token)
        except urllib.error.HTTPError as e:
            print(f"skip {slug}: GitHub API error {e.code} for {repo}")
            continue
        except urllib.error.URLError as e:
            print(f"skip {slug}: network error for {repo}: {e}")
            continue
        history.append({
            "slug": slug,
            "repo": repo,
            "date": today,
            "stars": stars,
            "collected_at": datetime.now(timezone.utc).isoformat(),
        })
        print(f"{slug}: {stars} stars")
        time.sleep(1)  # be polite to the unauthenticated rate limit

    save_history(history)


if __name__ == "__main__":
    main()
