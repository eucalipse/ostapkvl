# Article idea backlog

Seeds spotted elsewhere (LinkedIn, etc.), not yet drafted. Each entry: source, what it is, why it might fit this site's angle (agent design, business automation, not a tool review), and status.

Run new entries through the idea-triage workflow (see `skills/idea-triage/SKILL.md`) before promoting one to a draft: NDA check, overlap check against `content/posts/*.mdx`, and a one-line "what's the ostapkvl.com angle, not just a tool summary" test.

---

## 2026-10-30

### Six competing definitions of "AI agent harness"
- **Source:** LinkedIn, Hanane D. (AI Agents Instructor), Oct 28, 64 likes / 20 comments / 9 reposts.
- **What it is:** A roundup comparing how LangChain, OpenAI, Microsoft, Hugging Face, Anthropic and Martin Fowler's site each define "harness" differently — from "everything that isn't the model" (LangChain, wide) to "the loop" (Hugging Face, narrow), plus OpenAI's control-plane framing, Microsoft's runtime scaffolding, Anthropic's incremental-progress framing, and guides/sensors (Martin Fowler).
- **Possible angle:** Not a tool to review — a vocabulary problem. Ties into this site's recurring theme of precision about what a system actually did versus what it's assumed to have done (see `review-the-decision-not-just-the-diff`, `what-to-keep-before-an-agent-forgets`). The angle: six vendors disagreeing on where "harness" stops isn't a trivia point, it's the same confusion that shows up when teams can't agree on what to log, checkpoint, or hold a human approval gate around — the boundary of "harness" is also the boundary of what gets recorded and reviewed. Risk: could read as a dictionary post rather than a design argument — needs a sharper single claim before drafting.
- **Status:** seed, not triaged (harness-definitions idea).

### Stato — portable agent expertise across platforms
- **Source:** Show HN (hn.algolia.com), "Show HN: Stato captures and transfers AI coding agent expertise across platforms," posted ~32 days before this scan. Found via idea-triage scan mode, not a LinkedIn screenshot.
- **What it is:** A tool treating earned agent expertise as portable state: `stato crystallize` packages what an agent learned in a session into a snapshot; slice extracts a specific skill from it, graft adds an external skill onto a project, merge combines expertise from multiple sources. Explicitly cross-platform — plan in one tool, build in another, carry the expertise with you. Available on PyPI and GitHub.
- **Possible angle:** Genuinely new mechanism versus everything already in `content/research/tool-digest.md` — not code-graph memory (Graphicle/Graphify, structural understanding of one repo), not harness-retro (self-improving rules within one repo), not multi-agent coordination (BAND, real-time shared room). This is specifically about expertise trapped in a stateless session unless someone explicitly exports it. Strong comparable found: Hivemind, a self-hosted "shared brain" that automatically mines patterns from live sessions and propagates them to every connected agent in real time (continuous/automatic vs. Stato's explicit, curated snapshot). AGENTS.md is the adjacent standard (describes what a project is, not what an agent learned) — useful contrast, not a competitor. Angle: explicit-and-curated vs. automatic-and-continuous is a real design fork, same shape as the approval-gate questions already running through this site's writing.
- **Status:** seed, not triaged — strongest candidate of the two in today's backlog, since the comparables are concrete and the mechanism doesn't overlap existing digest entries.
### BAND — shared-room multi-agent coordination
- **Source:** LinkedIn, Samanth (Founder/CEO @ Devable), Oct 27 post, 160 likes / 29 comments / 23 reposts.
- **What it is:** A tool letting Claude Code, Codex, Hermes and other coding agents share context, tasks and handoffs in one "room" instead of isolated sessions. Planner → coder → reviewer handoff pattern, human approval gate built in.
- **Possible angle:** Overlaps with `parallel-agents-shared-codebase.mdx` and `two-agents-one-business-record.mdx` (shared state across agents). The ostapkvl.com angle isn't "here's a tool" but the underlying design question: when agents hand off work, what's the minimum shared state (not full context dump) that makes the handoff safe? Could connect to the "business record" consistency problem rather than a coding-session problem.
- **Status:** seed, not triaged.

### Graphicle — code graph + memory for coding agents
- **Source:** LinkedIn, André Lindenberg, "Agents, Graphs, Ontologies" newsletter, Oct 29 post, 371 likes.
- **What it is:** A Rust tool giving coding agents a persistent code graph + memory instead of re-reading the repo each call. Benchmarks show large latency/memory drops between versions (0.1.7 → 0.1.8) on a real ~30k-file repo.
- **Possible angle:** Directly adjacent to `memory-garden-pgvector.mdx` and `what-persists-when-the-conversation-ends.mdx`, but for code rather than conversation. The angle: memory-for-code and memory-for-business-decisions are the same problem (what's worth keeping vs. re-deriving each time) wearing different clothes. Caution: don't let this become a tool review — keep it about the "re-read vs remember" tradeoff.
- **Status:** seed, not triaged.

### Self-improving harness / "harness retro"
- **Source:** LinkedIn, Alfonso Graziano, Oct 26 post, 150 likes / 23 comments.
- **What it is:** A skill where, after each agent session, a "retro" step reads the transcript, proposes findings (e.g. "db-query.sh always stops the bastion"), and the user approves updates to AGENTS.md / rules / skills — so the repo itself gets smarter session over session.
- **Possible angle:** Close to `evals-that-grow-themselves.mdx` and `what-to-keep-before-an-agent-forgets.mdx` — this is "what persists" but for the harness/tooling layer, not business data. The angle: a repo that remembers its own mistakes is a checkpoint system, same shape as the business-agent checkpoints already written about. Risk of overlap — read both existing posts before drafting so this adds something new rather than repeating the checkpoint argument.
- **Status:** seed, not triaged.

### Cloudflare security-audit skill — adversarial verification pattern
- **Source:** LinkedIn (via lnkd.in/p/di7Jy-vr), Gurinderjeet Singh, sharing Cloudflare's open-sourced security-audit skill (MIT, 32.5k stars).
- **What it is:** Six-phase vulnerability hunt where "the agent that finds a bug is never the agent that confirms it" — a separate agent tries to disprove each finding before it's reported, cutting false positives. A commenter generalized it: independent validation needs "a process designed to make the original claim fail."
- **Possible angle:** This is the strongest fit of the four — it's the same spine as `review-the-decision-not-just-the-diff.mdx` and `three-models-one-answer.mdx` (don't trust the agent that made the claim to also verify it), but stated as a general principle rather than a code-review or consensus mechanism. Could be the piece that ties those two together: "verification only counts if it's trying to fail the claim, not confirm it." Check this doesn't just restate review-the-decision before drafting.
- **Status:** seed, not triaged — most promising of the four for a genuinely new angle rather than a tool writeup.
