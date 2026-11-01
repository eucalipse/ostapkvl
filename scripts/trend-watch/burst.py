"""Kleinberg burst detection (2003), reimplemented.

Why not the `burst_detection` PyPI package: it's unmaintained and calls
`np.float`, which NumPy removed years ago — it hard-crashes on any current
NumPy/Python. This is a small, direct reimplementation of the same
two-state automaton from Kleinberg's paper, with no deprecated API calls.

Reference: J. Kleinberg, "Bursty and Hierarchical Structure in Streams",
KDD 2002. https://www.cs.cornell.edu/home/kleinber/kdd02.html

The model: a stream of per-period counts (r = target-event count, d = total
count that period) is explained by a hidden state sequence over k=2 states
(baseline, burst). Each state has an expected event rate; moving to a higher
state costs `gamma * log(n)` per level (moving down is free); the optimal
state sequence minimizes fit-cost + transition-cost, found by dynamic
programming (Viterbi-style forward pass + backtrack).
"""
from __future__ import annotations

import math
from dataclasses import dataclass


@dataclass
class BurstResult:
    states: list[int]  # 0 = baseline, 1 = burst, per period
    p: dict[int, float]  # expected event-rate per state

    def bursts(self) -> list[tuple[int, int]]:
        """Contiguous (start_idx, end_idx_inclusive) runs where state == 1."""
        runs: list[tuple[int, int]] = []
        start = None
        for i, s in enumerate(self.states):
            if s == 1 and start is None:
                start = i
            elif s == 0 and start is not None:
                runs.append((start, i - 1))
                start = None
        if start is not None:
            runs.append((start, len(self.states) - 1))
        return runs


def _log_binomial_coeff(d: int, r: int) -> float:
    """log(C(d, r)) via lgamma, stable for large d."""
    if r < 0 or r > d:
        return float("-inf")
    return math.lgamma(d + 1) - math.lgamma(r + 1) - math.lgamma(d - r + 1)


def _fit_cost(d: float, r: float, p: float) -> float:
    """Negative log-likelihood of observing r/d events under rate p."""
    p = min(max(p, 1e-10), 1 - 1e-10)
    log_binom = _log_binomial_coeff(round(d), round(r))
    return -(log_binom + r * math.log(p) + (d - r) * math.log(1 - p))


def detect(
    r: list[float],
    d: list[float],
    s: float = 2.0,
    gamma: float = 1.0,
) -> BurstResult:
    """Run 2-state Kleinberg burst detection on a (r, d) count series.

    r: target-event count per period (e.g. posts matching a topic, per hour)
    d: total-event count per period (e.g. all posts seen, per hour) — use
       1.0 for every period if you only have raw counts with no denominator
       (then r/d collapses to just r, which still works for burst detection
       on a single series, just without a true "share of total" baseline)
    s: how much the burst state's rate must exceed baseline (>1; 2.0 = burst
       period runs at ~2x the long-run average rate)
    gamma: cost of moving up a state; higher = fewer, more significant bursts

    Returns the optimal state sequence (0=baseline, 1=burst) and the fitted
    per-state rates.
    """
    n = len(r)
    if n == 0:
        return BurstResult(states=[], p={0: 0.0, 1: 0.0})
    if len(d) != n:
        raise ValueError("r and d must be the same length")

    total_r = sum(r)
    total_d = sum(d)
    p0 = total_r / total_d if total_d > 0 else 0.0
    p1 = min(p0 * s, 1 - 1e-10)
    p = {0: p0, 1: p1}

    k = 2
    # cost[t][j] = min cost of being in state j at time t
    cost = [[0.0, 0.0] for _ in range(n)]
    back = [[0, 0] for _ in range(n)]

    for j in range(k):
        cost[0][j] = _fit_cost(d[0], r[0], p[j])

    for t in range(1, n):
        for j in range(k):
            best_cost = float("inf")
            best_prev = 0
            for i in range(k):
                transition = 0.0 if i >= j else (j - i) * gamma * math.log(n)
                c = cost[t - 1][i] + transition
                if c < best_cost:
                    best_cost = c
                    best_prev = i
            cost[t][j] = best_cost + _fit_cost(d[t], r[t], p[j])
            back[t][j] = best_prev

    # backtrack from the cheaper final state
    states = [0] * n
    states[-1] = 0 if cost[-1][0] <= cost[-1][1] else 1
    for t in range(n - 1, 0, -1):
        states[t - 1] = back[t][states[t]]

    return BurstResult(states=states, p=p)


if __name__ == "__main__":
    # Smoke test: a clear spike in the middle of an otherwise flat series.
    # r = count of posts ABOUT the topic that period; d = ALL posts seen that
    # period (the denominator) — r must be <= d, this is a proportion model.
    r = [2, 1, 2, 3, 1, 2, 45, 60, 55, 8, 2, 1, 2]
    d = [100.0] * len(r)
    result = detect(r, d, s=2.0, gamma=1.0)
    print("counts: ", r)
    print("states: ", result.states)
    print("rates:  baseline=%.3f burst=%.3f" % (result.p[0], result.p[1]))
    print("bursts (start_idx, end_idx):", result.bursts())
