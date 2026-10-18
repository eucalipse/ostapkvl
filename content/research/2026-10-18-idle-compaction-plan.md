# Why the first message after lunch can cost more

Status: researched article plan, not a published article.
Series: practical economics of coding agents. Write after “An expensive planner, a cheaper executor.”
Proposed slug: the-cost-of-coming-back-to-a-session

## Reader promise

Explain why a short follow-up can reuse a large amount of context, what idle compaction changes, and how to retain the evidence needed to resume safely. Separate tokens, API spend, subscription usage, and elapsed time. Do not promise measured savings without a controlled experiment.

## Verified source notes (2026-10-18)

Primary release source: https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md
The v2.1.299 section describes terminal idle compaction for a 200K+ token conversation after about 54 minutes, before its one-hour prompt cache expires. It documents CLAUDE_CODE_IDLE_COMPACT_MIN_TOKENS and settings.json idleCompaction: false; the same entry says both controls need v2.1.290 or later. Preserve that distinction instead of calling 2.1.299 the minimum version for the controls. The v2.1.302 section adds an Idle compaction toggle to /config. Recheck current release behavior before publication. The entry does not explicitly establish every distribution/account default; avoid an unconditional “on for everyone.”

Primary caching source: https://platform.claude.com/docs/en/build-with-claude/prompt-caching
API caching supports five-minute and one-hour lifetimes. Cache reads are discounted, not free. A cache hit requires a reusable prefix. Do not generalize the terminal's one-hour behavior to every API request or client. Model-specific rates need a dated pricing citation if used.

## Opening

Use a clearly hypothetical scene: a large debugging session, a meeting, then “continue.” The new message is short; the context it depends on is not. No invented personal benchmark or claim that this happened in production.

## Article sequence

1. What is actually being reused: prompt prefix, new input, generated output, and retained tool evidence.
2. Two timelines: let the large cache expire; summarize while it is warm and later resume with a smaller context. A warm summary also has a TTL: returning much later can still produce a cold read of a smaller context.
3. The bill includes the summary: cached input reads, summary output, subsequent writes/reads, and any work needed to recover lost detail. Background compaction may be wasted if the session is never resumed.
4. What a summary can lose: exact failing output, unsuccessful attempts, rejected assumptions, revision identity, and unresolved questions.
5. A durable checkpoint: concise state plus references to exact artifacts, revision, commands, and verification status. Persist sensitive artifacts only in suitable local/project storage.
6. Settings sidebar: documented environment variable, settings.json disable switch, and version-specific /config control. Do not change readers' settings automatically.
7. How to test whether it helps your workflow, then link to planner/executor handoffs and total cost per verified task.

## Visual plan

All figures use the existing figure generator, embedded ostapkvl.com watermark, full alt text, light/dark readable colors, and a separate branded OG card.

- Paired timeline: last turn → idle interval → compaction near 54 minutes → cache expiry → resume. Show a second late-return path; do not imply a cache remains warm indefinitely.
- Stacked cost chart: cold full context versus warm compaction plus resume, split into read, write, summary output, and evidence recovery. Synthetic scenario until measured. Include a case where compaction costs more.
- Evidence map: compact state points to exact test log, source revision, diff, and open questions; visibly distinguish preserved artifacts from omitted conversation.
- Optional interactive break-even calculator: editable context size, summary size, read/write/output rates, probability of resuming, and recovery cost. Show units and assumptions; no model prices hardcoded without a date.

## Cost model

Compare total cost over the same task horizon, including work while idle:

No compaction = resume input/cache-write cost for the old context + common continuation costs.
Compaction = warm input read for summarization + summary output + resume input/cache-write cost for compacted context + evidence recovery + common continuation costs.

Do not double-count cache-write tokens as ordinary input too. The compacted context includes retained instructions and recent messages, not only summary tokens. Use observed usage categories for a real test. A warm resume has different rates from a cold resume. Model cache invalidation and TTL rather than assuming every return is a hit.

## Copyable checkpoint prompt

Before this session is compacted, prepare a checkpoint containing:
- The current goal and acceptance criteria.
- The current revision and changed files, verified from tools.
- Decisions and their reasons, including rejected approaches.
- Tests actually run, their results, and paths to exact outputs where retained.
- Unresolved failures and assumptions, marked separately from facts.
- The next bounded action and when to stop or ask for clarification.
Keep exact evidence in referenced artifacts rather than paraphrasing away important details. Do not claim a test passed unless you observed its result. If an artifact does not exist, say so.

## Experiment protocol

Use a public or synthetic repository task. Record client version, model, account/billing mode, context size, cache TTL, and idle duration. Compare equivalent tasks with compaction enabled and disabled over repeated runs. Include a return shortly after compaction, a much later return, and sessions never resumed. Record usage categories, time to first response, total time to verified success, failed acceptance checks, and manual recovery work. Separate API invoices from subscription limits. No results are available yet.

## Review checklist

- Source every version/threshold/config assertion and recheck before release.
- No universal savings percentage; no claim that cached tokens are free.
- No guarantee the context remains warm until the user returns.
- Do not imply a summary preserves exact history or guarantees correctness.
- Give accessible text equivalents for all diagrams and charts.
- Link the article to the planner/executor piece once its route exists.
- Request Claude review if a working authenticated CLI is available; do not label this Claude-reviewed otherwise.
