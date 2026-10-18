# Claude review and benchmark brief

Work in this repository. Read AGENTS.md if present and WRITING.md before editing. Preserve unrelated local work. Start with content/posts/an-expensive-planner-a-cheaper-executor.mdx, then inventory all articles in content/posts. Review published and draft articles, preserving their publication status.

## Review

Identify unsupported factual claims, unverifiable first-person experience, stale model names/prices/settings, misleading charts, and sources that do not support the associated sentence. Check primary papers and official engineering documentation. Record exact source URLs, relevant sections, dates, and limitations. Do not infer current capabilities from marketing names. Distinguish a routing benchmark from a coding handoff benchmark.

Produce a per-article audit in content/research with prioritized findings, proposed corrections, and useful benchmark opportunities. Make narrowly supported corrections; keep the writing personal and readable. Do not invent anecdotes. Avoid confidential product names, legal examples, or internal metrics.

## Benchmark evidence

Separate three evidence types explicitly:
1. Published research results: attribute the authors, dataset, model versions, metric, baseline, and limitations. Never present these as our own results.
2. Synthetic examples: preserve conspicuous illustrative labels and show the arithmetic.
3. Our measurements: only report after actually running a reproducible experiment and saving its outputs.

For the planner/executor article, prepare a runnable benchmark harness using a public or synthetic coding fixture. Compare a single capable model, a single lower-cost model, and a capable planner plus lower-cost executor. Keep acceptance tests, tool access, starting revision, task budget, and review procedure comparable. Define model IDs explicitly; never silently substitute a model for Astra or Claude. Use independent hidden acceptance cases and include tasks where handoffs are likely to fail. Repeat runs and retain failures and abandoned attempts. Control or record warm/cold caches and randomize execution order where practical.

Record per run: task, revision, model and client versions, prompts, settings, attempts, outcome, uncached input, cache writes, cache reads, output tokens, tool fees, elapsed time, and human intervention. Compute costs from dated rates without double-counting categories. Report acceptance rate and total spend across all runs divided by accepted tasks. If no tasks pass, mark cost per accepted task undefined. Show dispersion and limitations, not just a favorable average.

Implement and validate the fixture and harness locally. Do not incur external model spend without a separate explicit budget; the user's $50 is advertising money, not a benchmark budget. If credentials or a budget are unavailable, provide the runnable procedure and mark results pending. Do not fill charts with invented measurements.

## Visuals and delivery

Use scripts/figures/build.mjs and existing figure components. Include embedded ostapkvl.com watermarks on every figure/export and meaningful alt text. Prefer charts that explain the trade-off: spend versus acceptance, repair-cost distribution, cost breakdown, and latency. Give units, sample sizes, uncertainty, and data provenance. Maintain useful OG images and accessible text equivalents.

Run the relevant build and checks. Deliver the audit, corrected content where justified, benchmark harness and run instructions, and results only if actually measured. Do not publish additional drafts, merge, deploy, or push without authorization. Report any blocked steps honestly.
