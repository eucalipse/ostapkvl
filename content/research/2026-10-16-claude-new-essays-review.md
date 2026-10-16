# Review: two draft essays

I couldn't open the linked sources in this session, so I've marked the claims that need checking against them. I didn't change any files.

---

## Essay 1: "The assistant remembered. I had changed my mind."

### Fake autobiography
- **Title.** It is written in the first person and past tense, so it reads like something that really happened. The body then says the example is made up. Make it match the second-person "Imagine…" opening: **"You changed your mind. The assistant remembered."**
- **"My first instinct as a builder…"** Keep this only if you do build memory systems. If you don't, change it to "The obvious instinct is to preserve information."

### Factual overreach (check against the preprint)
- **LongMemEval-V2 details.** Check each of these claims against the abstract or paper: "marked work in progress", "web environments", the three task types (changing state, workflow knowledge, misleading premises), and "reports latency costs for its stronger methods".
- **"Keeping more experience does not make the trade-off disappear."** This goes one step past the source. The paper reports latency for *stronger methods*, not for *storing more*. Replace it with: "Better answers can cost time."

### Repetitive hedging
The essay says "invented" or "not a result" six or seven times. Cut it down:
- Delete "This is a hypothetical example, but". "Imagine" and the figure caption already say this. Keep the rest: "It is the sort of test I want a memory system to pass…"
- **Retrieval caption.** Delete "No benchmark result or consciousness claim is represented." No reader would expect a retrieval diagram to claim consciousness. Use: "Conceptual retrieval path."
- **Record caption.** Shorten to: "Proposed record design, not a shipped feature."
- Keep "My meeting example is not a result from that benchmark." That one does real work.

### Confusing example
- None found. The morning example works all the way through.

---

## Essay 2: "When an assistant says 'I understand'"

### Factual overreach (check against the sources)
- **arXiv 2512.17898.** Check that "in its experiments" fits the study design. Also check whether "varied across contexts" should be more specific. The title says "Globally", so "varied across countries" may be what the paper actually shows. Use the paper's own word.
- **Anthropic introspection study.** As far as I know, this summary is accurate: concept injection, limited and unreliable detection, and an explicit statement that it doesn't settle consciousness. Check "explicitly distinguish" against the post's wording before publishing.

### Fake autobiography
- **"In an application I can inspect stored messages, prompts…"** This is fine if you run such apps. If you don't, write "A developer can inspect…" and "It does not give them…".

### Repetitive hedging
- Delete "Both exchanges are invented examples." "Imagine" and the caption already cover it. Keep the next sentence: "I use them because the difference is small enough to fit on a screen…"
- **Two captions use the same pattern.** "not a scale measuring consciousness" and "not a ranking of how conscious a system is" both deny a claim nobody made. Cut both clauses:
  - "A conceptual distinction."
  - "Three kinds of evidence and what each can be checked against."
- **"It measures people's responses to systems, not the systems' subjective experience."** The paragraph above already makes this point. Delete it.
- **The "open question" idea appears three times.** It's in "These questions can sit beside each other…", the heading, and "Let the larger question stay a question." Delete the first one.

### Confusing wording
- **Heading "Leave the question open without making a promise."** It isn't clear what "promise" means here. Change it to **"Uncertainty is not permission"**, which picks up the strongest line in that section.
- **"If I ask it to stop, does it stop?"** This is a list of the system's *words* being checked against its behavior, but this item is about what *you* say. Change it to: **"If it says it will stop, does it?"**
- **"A memory control matters more here than another paragraph about trust."** "Here" is vague. Use: "A visible memory control does more for trust than reassuring copy."

---

## Across both essays
- The two pieces come out a week apart and are built the same way: an "Imagine…" opening, an "invented" disclaimer, a preprint, and a figure caption that denies a claim. Consider changing the opening of one of them, for example by starting essay 2 with the assistant's reply.
- Check that `/writing/what-persists-when-the-conversation-ends` exists before essay 1 goes live.


Editor: primary-source summaries checked separately. Applied title correction, latency wording, shorter captions, and stop-behavior wording. New third essay uses Shevlin’s first-person account, marks transcript limitations, and treats the Tihara birth recollection as unverified paraphrase.
