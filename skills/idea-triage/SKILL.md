---
name: idea-triage
description: Triage an external article/content idea (a LinkedIn post, tool launch, trend) spotted by Ostap before it becomes a draft for ostapkvl.com. Checks NDA safety, overlap with existing posts, and whether there's a genuine angle beyond "here's a tool." Does not draft or publish articles.
---

# Idea triage

Ostap spots tool launches and trend posts on LinkedIn and wants a fast, repeatable check before any of them becomes a draft. This skill is the gate between "saw something interesting" and "worth writing." It only decides whether an idea is worth drafting and records the seed — it never writes the article itself.

## When to use this

- Ostap shares a screenshot, link, or description of something he saw (LinkedIn post, tool, trend) and wants it considered as article material.
- Before promoting any entry in `content/research/idea-backlog.md` to an actual draft in `content/posts/`.
- Ostap asks to scan, check, or look for new ideas/tools himself (e.g. "find new digest ideas", "scan the sources", "what's new"), without having a specific one in hand yet. Run **Scan mode** below instead of waiting for him to bring one.

## Scan mode (proactive sourcing)

Run this when asked to find new ideas rather than triage one already in hand:

1. Check the five sources under "Where to look," in order. For each, look specifically for a tool or trend from the last 1-2 weeks that is NOT already covered in `content/research/tool-digest.md` (read that file first to know what's covered) and does not overlap an existing `content/posts/*.mdx` angle.
2. Stop at the first genuinely new, well-evidenced candidate per run — do not try to surface many at once. One good idea with real comparables beats three thin ones.
3. For the candidate, find 2-3 real similar/competing tools (same bar as the rest of this skill: must solve the same specific mechanism, not just "also AI-related"), open-source status, and any claimed metric marked `unverified` unless independently confirmed.
4. Run the NDA check on it (see below) before reporting it at all — a candidate that fails NDA is simply skipped, not reported with the legal angle removed.
5. Add it to `content/research/idea-backlog.md` as a `seed, not triaged` entry with full source attribution (channel, date, link), then run it through the regular Steps below to reach a verdict.
6. Report the verdict to Ostap in a few lines, same as regular triage. **Never draft, publish, or post anything from a scan run without his explicit go-ahead on that specific idea** — scan mode finds and files ideas, it does not greenlight them.

## Where to look

Beyond whatever surfaces on LinkedIn by chance, these sources are worth checking regularly for the same kind of tool (agent coordination, memory, self-improving harnesses, verification, cost guardrails, sandboxing, eval benchmarks):

- **[github.com/trending?since=weekly](https://github.com/trending?since=weekly)**, filtered by language (TS/Python/Rust) — weekly check.
- **[e2b-dev/awesome-ai-agents](https://github.com/e2b-dev/awesome-ai-agents)** — best-maintained curated list in this space, split open-source vs. closed-source — check every 2 weeks.
- **[Latent Space](https://www.latent.space)** newsletter — AI-engineer-focused, covers agents and coding-agent devtools specifically — weekly digest, or its daily AINews feed if weekly is too slow.
- **Show HN search** on [hn.algolia.com](https://hn.algolia.com) for "agent" — genuinely good for early-stage, builder-made tools in this exact niche — weekly.
- **r/LocalLLaMA** and **r/AI_Agents** on Reddit — higher signal than the names suggest for agentic-coding tool launches and comparisons — weekly skim.

Skip Product Hunt's AI category and generic "best AI newsletter" lists — checked, they return general AI news rather than this specific niche. No credible LinkedIn publication-newsletter specific to multi-agent systems/harnesses exists yet; organic feed discovery stays the LinkedIn channel for now.

## Steps

1. **Capture the seed first.** Before judging it, add (or update) an entry in `content/research/idea-backlog.md` under today's date: source (who/where/engagement numbers if visible), what the thing is in one or two sentences, and status `seed, not triaged`. Never skip this step even if the idea looks weak — the backlog is the record, judgment can change later.

2. **NDA check.** Confirm the idea has no path into law-firm/legal-industry framing or content (see the global NDA rule). If the source material itself is legal-industry (e.g. a legal-tech tool), drop it or flag it clearly as excluded — do not draft around it.

3. **Overlap check.** Grep `content/posts/*.mdx` for existing articles covering the same mechanism or claim. List which posts already cover adjacent ground. An idea that purely restates an existing post's argument is not a new draft — it's either a non-starter or a case for updating/cross-linking the existing post instead.

4. **Angle check — the core filter.** A tool launch or trend post is not an article idea by itself. Ask: what's the underlying design question or tradeoff this surfaces that connects to Ostap's actual work (business agents, approval gates, memory, verification, multi-agent coordination — not coding-tool reviews)? If you can't state this in one sentence that isn't just a summary of the source, the idea fails triage. Record the angle (or its absence) in the backlog entry.

5. **Verdict.** Mark the backlog entry's status as one of:
   - `promising — angle: <one sentence>` (ready to discuss drafting)
   - `overlap — see <slug>` (too close to an existing post; consider a cross-link instead)
   - `excluded — NDA` (legal-industry entanglement)
   - `weak — no angle` (just a tool summary, no fit)

6. **Report, don't draft.** Summarize the verdict(s) to Ostap in a few lines. Only start drafting an MDX file if he explicitly asks for a draft next — this skill's job ends at the verdict.

## Notes

- Keep tool names and source attribution in the backlog entry so provenance is traceable later, but never let a draft read as a tool review — the published angle must be Ostap's own design argument, with the source credited at most as a passing mention, following the same sourcing care as `content/research/2026-10-17-all-articles-review.md` (no unverified metrics borrowed from the source presented as Ostap's own).
- If engagement numbers are visible in a screenshot (likes/comments/reposts), they're context for how hot the trend is, not evidence to cite in the article.
