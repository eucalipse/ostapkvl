# Tool digest — spotted tools by problem rubric

Not an article, not for publication. A private working rubric: group each tool Ostap spots by the problem it solves, name 2-3 real similar/competing tools for context, and flag where categories connect so the same tool isn't treated as a separate silo each time it reappears.

Research sourced via web search on 2026-10-30. Mark entries `unverified` where a claim (benchmark, percentage, star count) comes from the tool's own marketing and hasn't been independently checked — follow the same no-invented-metrics discipline as the rest of this site's writing.

---

## Rubric: Multi-agent coordination / handoff

**BAND** — shared "room" for Claude Code, Codex, Hermes and other coding agents: shared context, shared tasks, agent-to-agent messaging, planner → coder → reviewer handoffs, human approval gates. (Source: LinkedIn, Samanth/Devable, Oct 27.)

Similar/competing:
- **AgentsRoom** — near-identical pitch, same shared-room mechanism; publishes its own "vs alternatives" page, so it positions directly against tools like BAND. Closest direct competitor found.
- **Codeg** — different angle: aggregates sessions from multiple coding agents into one searchable interface, delegation via mentions. Observability/aggregation-first rather than real-time shared-room.
- **Conductor** (macOS app) — orchestrates parallel Claude Code/Codex agents via git worktree isolation with a built-in review interface. Coordination through isolation, not a shared room.

→ See cross-link note below: BAND's "human approval gates" connects to harness-retro's "findings you approve."

## Rubric: Persistent memory / code graph for coding agents

**Graphicle** — Rust tool giving coding agents a persistent code graph instead of re-reading the repo each call. Open source, Apache-2.0, ~171 GitHub stars — a small project. (Source: LinkedIn, André Lindenberg, Oct 29.)

Similar/competing:
- **[Graphify](https://github.com/Graphify-Labs/graphify)** — a separate, much larger project in the same space, confirmed at 139k GitHub stars. Easy to conflate with Graphicle due to the similar name and pitch; they are not the same tool and should never be described interchangeably. Articulates the sharpest version of the graph-vs-embeddings argument: a vector search retrieves what looks similar, a graph retrieves what is actually connected, and the most structurally relevant code to a change is often the least textually similar to any search query. Claims cutting agent token spend by 80% via its paid Cloud tier (`unverified`, vendor-reported); the free/local version does deterministic tree-sitter AST parsing with no embeddings or vector store, and tags every graph edge as extracted (explicit in source) or inferred.
- **CodeGraph** — same core mechanism (structural code graph vs. re-reading files) via tree-sitter AST extraction into an MCP server. Reports a **94% reduction in tool calls** and **82% faster completion** on one benchmark task against VS Code's codebase (`unverified`, vendor-reported).
- **Aider's repo-map** — open source, tree-sitter based: parses the repo into a graph of files and symbol references, ranks it (PageRank-style) to surface the files relevant to the current edit. No persistent server — rebuilds the map each run. A lighter-weight version of the same idea.
- **Sourcegraph Cody's context engine** — combines a code graph with embeddings and keyword search; explicitly multi-repo and enterprise-oriented, unlike the single-local-repo tools above.
- **Continue.dev** — embeddings-only, no graph structure at all. Useful as the contrast case: fine for lookup-style retrieval against documentation or loosely related code, but doesn't capture structural connection the way a graph does.
- **Mem0** — "drop-in memory infrastructure for AI agents," persistent context across sessions. Broader scope than any of the above: general agent memory, not code-graph-specific, but the same underlying problem — don't re-derive what's already known.
- **x402.storage** — pitched as long-term agent memory to save and resume context. Thinner/less mature than the others, per available info.

Noise to ignore: Graphicle's own site lists ripgrep/Ruff/bat as "closest alternatives" — these are unrelated Rust CLI tools, not real comparables.

Independent commentary: no neutral (non-vendor) critique of the graph-vs-RAG approach surfaced in research — everything found arguing for code graphs over embeddings came from vendors or vendor-adjacent sources. One arXiv paper surfaced (2609.12464, "Hierarchical Context-Aware Graph RAG vs Standard RAG in Enterprise Code Migration") as a lead, not independently read or verified.

→ See cross-link note below: converges with harness-retro on "don't lose what the agent already learned," just scoped differently (code structure vs. cross-session behavioral rules).

## Rubric: Self-improving agent harness

**Harness-retro** (skill by Alfonso Graziano) — after each agent session, reads the transcript, proposes findings, user approves updates to AGENTS.md/rules/skills. (Source: LinkedIn, Oct 26.)

Similar/competing:
- **Retrospective Harness Optimization (RHO)** — named research pipeline doing the same thing: mines an agent's own past trajectories (no ground-truth labels) to improve its harness. Reports lifting SWE-Bench Pro pass rate **59% → 78%** in one retrospective pass (`unverified` — a reported research result, not independently checked by us). More rigorously evidenced parallel than a LinkedIn skill post.
- **"Self-Improving Agent Harness" pattern** (per mpt.solutions and others) — same shape: mine sessions, diagnose recurring failures, evolve CLAUDE.md/AGENTS.md/skills, gate updates on the agent's own pairwise self-preference.
- Context: Alfonso Graziano has a public talk, "Agents Building Agents" (Nearform), framing agents as both subject and tool of their own improvement — the LinkedIn post is one concrete instance of a pattern he already speaks about publicly, not a one-off.

→ See cross-link notes: connects to both Graphicle (memory-retention problem, different scope) and BAND (approval-as-checkpoint design element).

## Rubric: Adversarial / dual-agent verification

**Cloudflare security-audit skill** — six-phase vulnerability hunt (recon, hunting, validation, reporting, structured output, independent verification). MIT license, 32.5k stars (`unverified` count, not independently checked). Core rule, confirmed verbatim: "The agent that checks a finding is never the agent that found it." (Source: LinkedIn via lnkd.in, Gurinderjeet Singh.)

Context found, not a competing tool: Google had to pause part of its open-source bug-bounty intake after AI-generated reports flooded in with nonexistent bugs — a real failure mode this pattern is a direct response to (self-grading agents confirm almost everything).

No distinct competing *product* surfaced — the adversarial-verification pattern shows up in the literature as a named principle/technique (evaluator-optimizer pattern, LLM-as-judge adversarial setups) rather than a separate shipped tool. Flagged as a research gap, not papered over with a guess. Worth a narrower follow-up search if this category gets drafted into an article.

---

## Connected ecosystem — cross-category links

Rather than four separate silos, two threads run across categories:

1. **Approval-as-checkpoint** shows up in both coordination (BAND's human approval gates) and self-improvement (harness-retro's "findings you approve" before AGENTS.md changes). This is a recurring design element, not unique to either category.
2. **Memory and verification are converging**: Mem0-style memory infrastructure increasingly gets paired with evaluation/verification layers in the surrounding literature — RHO treats "improving the harness" and "verifying what worked" as one loop. Graphicle (code memory) and harness-retro (behavioral memory) are closer to each other than first appearance suggests; they differ in scope, not in kind.

No single tool found spans all four rubrics. The field reads as four adjacent but distinct problem spaces, each with 2-3 real competitors, rather than one tool doing everything — useful to know before claiming any one tool is "the" solution in a future article.

---

## Rubric: Agent cost/budget guardrails

**AgentFleet** — wraps the Claude Code CLI in a local web UI that tracks real-time token count, estimated cost and elapsed time, and auto-terminates a session when a user-set dollar/token ceiling hits. Fills a real gap: Claude Code itself has no native spend circuit-breaker.

Similar/competing:
- **Databricks' Unity AI Gateway budgets** — enterprise-grade version of the same idea, enforced at the gateway/platform level rather than wrapping one CLI.
- **OpenRouter Guardrails** — broader workspace-level governance layer: budgets, model/provider restrictions, zero data retention, prompt-injection defense. Wider scope than AgentFleet's single-purpose spend meter.

Context, not a competing tool: Uber capped employee agentic-coding spend at $1,500/month after exhausting its full-year 2026 AI budget in roughly 4 months (`unverified`, reported, not independently checked) — the real-world incident this category exists to prevent. GitHub Copilot also moved to usage-based billing in mid-2026, pushing the same pressure industry-wide.

→ Cross-link: the budget-side mirror of **approval-as-checkpoint** (BAND, harness-retro) — same "don't let it run unbounded" instinct, applied to spend instead of actions.

## Rubric: Agent sandboxing/isolation

**E2B** — managed sandbox API, around 150ms cold start (`unverified` vendor figure), widely cited as the default safe execution environment for AI code-interpreter products.

Similar/competing:
- **Daytona** — self-hosted-friendly, Docker-container-based, around 90ms cold start, unlimited runtime; positions as a full-dev-environment alternative to E2B's quick-integration focus.
- **Modal** — Python/ML-first, gVisor isolation, sub-second cold start, built for large autoscaling; fits GPU/batch workloads alongside agent execution more than pure agent sandboxing.
- **CubeSandbox** (Tencent Cloud, Apache-2.0, open-sourced April 2026) — open-source alternative to the managed options above.

Market structure note: this field has split into three layers rather than one tool competing with another — raw primitives (Firecracker, gVisor), embeddable runtimes (E2B, Daytona, Modal), and full platforms (Docker Sandboxes, Cloudflare Sandbox SDK, OpenAI Sandbox Agents). Worth naming this way if it becomes an article, so it doesn't read as one tool "winning."

→ Cross-link: isolation is the infrastructure precondition for **adversarial verification** (Cloudflare's security-audit skill) — a second agent can't safely try to disprove the first agent's claim without a sandbox boundary between them.

## Rubric: Agent eval/benchmark harnesses

**OpenBench** — benchmarks coding-agent *harnesses* (Codex, Pi, OpenCode, Cursor, Devin, open-model Claude) rather than models, isolating how much the run-loop, tool set and permission policy around a model matters versus the model itself.

Similar/competing:
- **agent-eval** — lightweight CLI for head-to-head agent comparison on reproducible tasks; tracks pass rate, cost, time, consistency.
- **AgentEvalBench** — narrower scope: tests whether agents can automate *writing* evaluations themselves (its Eval@1 metric checks whether generated eval code runs and produces a meaningful result on the first try).

Context: SWE-bench Verified leaders cluster within about 1 point of each other (`unverified`, reported figures, not independently checked) — reinforcing that harness design and cost-per-merged-change matter more than raw benchmark rank now.

→ Cross-link: this is the measurement layer **harness-retro** implicitly needs — a retro can't credibly claim it improved the harness without an eval harness like this to measure before and after. The two pair naturally: eval detects regression or improvement, harness-retro acts on it.

## Cross-category synthesis (updated)

A third thread runs beneath the first two (approval-as-checkpoint; memory/verification convergence): **isolation and measurement are the infrastructure layer underneath the other categories.** Sandboxing makes adversarial verification safe to run. Eval harnesses make harness-retro's claimed improvements checkable rather than self-reported. Cost guardrails are the budget-side mirror of approval gates — the same "don't let it run unbounded" instinct, applied to a different resource.
