"""Runs Kleinberg burst detection over the collected star history.

Needs at least ~2-3 weeks of daily data points per repo before a result
means anything: the model fits a baseline rate from the whole series, so
a short history can't distinguish "baseline" from "burst" yet. Running it
on thin data will not error, but the output is not meaningful -- check
the point count printed per repo before trusting a flagged burst.
"""
from __future__ import annotations

import json
import sys
from collections import defaultdict
from pathlib import Path

from burst import detect

HERE = Path(__file__).parent
DATA_FILE = HERE / "data" / "stars.json"

MIN_POINTS_FOR_SIGNAL = 14  # fewer than this, flag the result as too thin to trust


def load_history() -> list[dict]:
    if not DATA_FILE.exists():
        return []
    return json.loads(DATA_FILE.read_text())


def daily_deltas(stars_by_date: list[tuple[str, int]]) -> list[int]:
    """Day-over-day star gain, clamped at 0 (a count can only go up or stay flat
    in practice; a negative reading means a data glitch, not un-starring at scale)."""
    deltas = []
    prev = None
    for _, stars in stars_by_date:
        if prev is not None:
            deltas.append(max(0, stars - prev))
        prev = stars
    return deltas


def main() -> None:
    only_slug = sys.argv[1] if len(sys.argv) > 1 else None
    history = load_history()
    if not history:
        print("no data yet -- run collect.py first, daily, for a couple of weeks")
        return

    by_slug: dict[str, list[tuple[str, int]]] = defaultdict(list)
    for row in history:
        by_slug[row["slug"]].append((row["date"], row["stars"]))

    slugs = [only_slug] if only_slug else sorted(by_slug)

    for slug in slugs:
        rows = sorted(by_slug.get(slug, []))
        if len(rows) < 2:
            print(f"{slug}: {len(rows)} point(s) -- not enough to compute a delta yet")
            continue

        deltas = daily_deltas(rows)
        if len(deltas) < MIN_POINTS_FOR_SIGNAL:
            print(f"{slug}: only {len(deltas)} daily deltas (want {MIN_POINTS_FOR_SIGNAL}+) -- result below is not reliable yet")

        d = [1.0] * len(deltas)  # no natural denominator for a star count; treat as raw counts
        result = detect(deltas, d, s=2.0, gamma=1.0)
        bursts = result.bursts()

        dates = [r[0] for r in rows[1:]]  # dates line up with deltas, one offset
        if bursts:
            spans = ", ".join(f"{dates[start]} to {dates[end]}" for start, end in bursts)
            print(f"{slug}: BURST detected ({spans}) -- baseline~{result.p[0]:.2f}/day, burst~{result.p[1]:.2f}/day")
        else:
            print(f"{slug}: no burst in {len(deltas)} days -- baseline~{result.p[0]:.2f}/day")


if __name__ == "__main__":
    main()
