---
name: cross-post
description: Draft LinkedIn, Twitter/X, and Reddit versions of a post promoting an ostapkvl.com article, get one combined approval, then post what's actually postable. Does not invent content — adapts an already-written article or an already-approved LinkedIn caption.
---

# Cross-post

Ostap wants one article promoted across LinkedIn, Twitter/X, and Reddit without drafting each network by hand and without three separate approval rounds. This skill produces all three drafts together, gets one approval, then posts to whichever networks are actually reachable.

## Known platform limits — check these before claiming the skill can post somewhere

- **LinkedIn**: reachable via the `claude-in-chrome` browser tools, an active logged-in session has been used for this before. Can be posted directly once approved.
- **Twitter/X**: reachable via `claude-in-chrome` only if the browser session is already logged in. As of the last check (2026-10-31) it was not — do not assume it is. If not logged in, Ostap must log in himself in that Chrome window; this skill cannot enter credentials or 2FA on his behalf, full stop.
- **Reddit**: the domain was found to be blocked at the browser-automation tool's safety-restriction level entirely, independent of login state. Do not attempt `navigate` to reddit.com with claude-in-chrome — it will be refused regardless of session state. Reddit drafts are for Ostap to paste and post himself.

Re-verify reachability at the start of each run rather than trusting this note indefinitely — tool restrictions and login state can change.

## Steps

1. **Start from a finished source.** Either an already-published article (read its `.mdx` file for the real content, don't re-derive the argument) or an already-approved LinkedIn caption from `data/article-launches.ts`. Never invent the article's claims — the cross-post drafts carry the same facts and sourcing discipline as the article itself (unverified claims stay marked unverified, no new numbers).

2. **Draft all three in one pass:**
   - **LinkedIn**: same style as existing captions in `data/article-launches.ts` — plain, foreigner-friendly English per the user's global message-formatting rules, no em dash (use `--`), no markdown, ends with the article link and a real question.
   - **Twitter/X**: a short thread, 3-5 tweets. First tweet is the hook (the single strongest claim or question from the article), middle tweets carry the supporting points, last tweet has the link. Each tweet under 280 characters. No hashtag stuffing — at most one or two if they're genuinely relevant communities, never decorative.
   - **Reddit**: framed as a genuine question or observation to the subreddit, not an announcement. The article link goes at the end as "I wrote more about this here," not the headline of the post. Tone matches how a practitioner would actually post in r/AI_Agents or r/LocalLLaMA — specific, a little uncertain, inviting disagreement, not promotional. Never claim credentials or hype the piece. If a subreddit isn't specified, default to r/AI_Agents and r/LocalLLaMA (the sources already vetted in `skills/idea-triage/SKILL.md`), and name which one each draft targets.

3. **Show all three drafts together as one message, ask for one approval covering all three.** Do not post anything before that single approval lands. If Ostap wants changes to only one of the three, apply just that change and re-show only the edited one before proceeding, rather than re-running the whole batch.

4. **After approval:**
   - Post to LinkedIn directly via `claude-in-chrome` (same flow as prior LinkedIn posts: open compose, type text, confirm the link preview card looks right, click Post).
   - For Twitter/X: if a logged-in session is confirmed, post the thread the same way as LinkedIn. If not logged in, tell Ostap plainly that he needs to log in first, and hand him the thread text to paste once logged in rather than trying workarounds.
   - For Reddit: always hand Ostap the drafted post text to paste and submit himself, naming the target subreddit. Never claim to have posted it.

5. **Report back** which networks actually got posted automatically versus which drafts are waiting for Ostap to paste in manually, so there's no ambiguity about what's live.

## What this skill does not do

- Does not run paid boosts or ad campaigns on any platform — that's a separate, explicit step per the existing LinkedIn boost workflow (Campaign Manager, Ostap clicks the final spend confirmation).
- Does not auto-select which article to promote — Ostap names the article or caption to adapt.
- Does not retry Reddit or Twitter posting attempts after a failure in a way that risks spamming — one clean set of drafts per request.
