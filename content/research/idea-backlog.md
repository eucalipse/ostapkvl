# Article idea backlog

Seeds spotted elsewhere (LinkedIn, etc.), not yet drafted. Each entry: source, what it is, why it might fit this site's angle (agent design, business automation, not a tool review), and status.

Run new entries through the idea-triage workflow (see `skills/idea-triage/SKILL.md`) before promoting one to a draft: NDA check, overlap check against `content/posts/*.mdx`, and a one-line "what's the ostapkvl.com angle, not just a tool summary" test.

---

## 2026-10-30

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
