# Planner, executor, reviewer: example prompts

Source: ostapkvl.com · Adapt the hypothetical requirements to your repository.

```text
Goal: validate an uploaded CSV before importing supplier rows.
Base: record the actual commit and relevant working-tree changes.

Rules:
- Ignore wholly blank rows.
- Trim supplier IDs; preserve case.
- Reject an empty ID on a nonblank row.
- Reject repeated IDs within this file after trimming.
- Report CSV record numbers, counting the header as record 1.
- If any validation error exists, perform no database writes.

Scope:
- CSV validation and the existing error display.
- Preserve the current behavior for IDs already in the database.
- No schema migration or new dependency.

Acceptance cases:
- A valid file imports as before.
- A duplicate in the last record leaves zero imported records.
- Whitespace variants of the same ID are duplicates.
- A quoted multiline cell does not corrupt record numbering.

Evidence:
- Planner supplies verified file paths and existing test commands.
- Executor records actual test results and any untested behavior.

Stop:
- Existing transaction behavior contradicts the zero-write rule.
- The change requires a database or concurrency-policy decision.
```

```text
Investigate this request before proposing implementation.
Read the relevant code and repository instructions.

Produce a compact handoff containing:
1. Goal and observable acceptance criteria.
2. Verified revision, relevant working-tree changes, and file paths.
3. Decisions, brief reasons, and explicit non-goals.
4. Existing interfaces and invariants to preserve.
5. Commands discovered in the repository for verification.
6. Bounded implementation steps and escalation conditions.

Separate observed facts from assumptions and open questions.
Do not invent filenames, commands, or test results.
If an unresolved product decision changes correctness, identify it.
Do not implement the change in this planning step.
```

```text
Implement the attached handoff in the current checkout.
First verify its revision, paths, assumptions, and relevant local edits.
Preserve unrelated work. Read the affected code before editing.

Stay within the specified scope and preserve its invariants.
If the handoff contradicts the code or needs a new design decision,
stop that part and report the specific contradiction.

Run the relevant available checks. Report exact commands and results.
Make at most two repair attempts for the same failing acceptance case;
then return the failure and evidence for replanning.

Deliver the diff summary, verification evidence, remaining risks,
and any acceptance criterion you could not verify.
Do not merge, deploy, or publish unless separately authorized.
```

```text
Review the actual diff against the original request and acceptance criteria.
Inspect affected code and available test evidence independently.
Treat the executor's summary as a claim to verify.

Look for violated invariants, missing edge cases, and regressions.
For each actionable finding, give a location, a failure scenario,
and the evidence supporting it. Mark uncertainty explicitly.

State which acceptance criteria are verified, unverified, or failed.
Distinguish a command that passed from behavior that was never tested.
Do not approve solely because the implementation follows the plan:
the plan itself may be wrong.
```