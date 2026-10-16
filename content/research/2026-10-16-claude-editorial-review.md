# Editorial review: four drafts

## Priority summary

| Article | Risk | Main issue |
|---|---|---|
| vector-memory-emotional-recall | **High** | Detailed client and tester anecdote with personal grief data. Precise metrics with no support. No `draft: true`, and the date (2026-07-10) suggests it may already be live. |
| human-attention-is-the-bottleneck | Medium | Sweeping claims about "most tools" and human attention. The rules list contradicts the article's own argument. |
| green-dashboards-dead-integrations | Low–Medium | First-person incident details need confirming. Some security-posture disclosure. Repeated disclaimers. |
| what-persists-when-the-conversation-ends | Low | Careful and well cited, but abstract and heavy on hedging. One heading reads as asserting that the AI has no emotion. |

NDA check: none of the drafts target or mention law firms or the legal industry.

---

## 1. vector-memory-emotional-recall (fix before anything else)

**Privacy and confidentiality**
- The dog story is real-sounding grief data about an identifiable tester. It includes her gender, the dog's name ("Luna"), a 9-day gap, and an exact `written_at` timestamp. Confirm consent and client approval, or anonymise it clearly.
  - Edit: rename the dog, drop the gender, round the timeline. Add one line: *"Details changed to protect the tester."*
  - Edit the JSON to obvious synthetic values: `"anchors": ["Pixel", "dog", "park"]`, `"written_at": "2025-01-01T00:00:00Z"`, plus the caption *"Illustrative trace."*
- "A client came to my agency… AI character for brand experiences" combined with the named vendors (Mistral, Weaviate) and the timeframe may identify the client. Check the client contract before publishing.
- The system infers users' emotions and tracks reply latency. Name the disclosure and consent model, or say plainly that the article does not cover it. Readers will ask.

**Unsupported or possibly fabricated specifics.** Keep these only if they are backed by records:
- "top 40… top 6… about 15 milliseconds", "ran twenty times faster", "matched it in our tests", "swapped the embedding model twice… no tester noticed", "testers commented… within a week".
  - Edit: *"In our internal tests (n=…, method…)"*, or soften to *"in our tests it was noticeably faster and ranked about as well."*
- "By every retrieval metric this was correct" → *"By the similarity score, this was a good match."*
- "Almost everything published about RAG memory is about the read path" → *"Most of what I had read about RAG memory focused on the read path."*
- "Psychology research on emotional memory points in the same direction" needs a citation. Arousal-enhanced memory research such as McGaugh's work fits, or the claim should be cut.

**Framing**
- The dek "remember how conversations felt" can read as the AI feeling something. Change it to *"remember the emotional context of a conversation, not just its content."*
- "A writing mistake is permanent" overstates the case and conflicts with the later "explicit invalidation." Change it to *"A writing mistake persists until something corrects it."*
- There is a cross-article tension. *What persists* argues that inferred emotional labels must stay visibly inferences that the person can inspect and challenge. This piece stores model-inferred `grief` permanently as a "standing tone rule." Add a paragraph on how a user could see or clear that rule, or name it as an open problem.
- The figure alt text is choppy ("Then Retrieve… Then Consider…"). The "conceptual" caption also contradicts body text that describes production behavior. Rewrite the alt text to describe the two-stage pipeline itself.

**Housekeeping**
- Add `draft: true` and a `category`.
- Replace the em dashes in the title and body with the punctuation the other three drafts use.
- Check the "5 min read" estimate. The piece runs about 1,300 words.

---

## 2. human-attention-is-the-bottleneck

**Unsupported claims**
- "A few months ago the slow part of our work was producing things… a model does all of that in seconds, and it is good at it most of the time." This is first-person "our" with no grounding. Either tie it to one real workflow or soften it: *"In the workflows I work on, drafting stopped being the slow part."*
- "read carefully for maybe an hour" presents a guess as a fact about cognition. Mark it as personal experience or cut it.
- "most tools ignore it" → *"many review tools I have used show everything with equal weight."*
- "models are often confidently wrong" is fair, but add a calibration citation. Guo et al. (2017) works, or LLM calibration work. Automation-bias research (Parasuraman & Manzey, 2010) would support the "rubber stamp" point well.
- The code-review claim ("two thousand line diff, they skim it") is plausible. Cite a review-size study or frame it as common experience.
- "The tools that win will be…" is a prediction. Consider ending on the design principle instead.

**Internal contradictions**
- The rules list says "copying a value that matches its quote" is low-risk auto-work. The article said earlier that "a matching quotation proves the words exist; it does not prove the value is correct." Change the example to *"tagging an incoming email"* only.
- "A person approves with one click" sits uneasily with the rubber-stamp critique. Add: *"…after seeing the one thing that is unusual."*
- The matrix has two dimensions, but the list switches to impact alone for medium and high. Either add uncertainty to those rows or say outright that impact dominates above a certain level.
- The confidence examples jump between 90% and 95%. Use one number.

**Prose**
- "Illustrative / synthetic" appears in every caption and in the body. One note at the first figure is enough: *"All examples use synthetic data."*

---

## 3. green-dashboards-dead-integrations

**Confirm first-person facts**
- "three broken integrations in one afternoon", "For months" (used twice), "every half hour". Make sure each matches the incident record. If the durations differ, say so, for example *"for about N weeks."*
- Consider whether naming the deactivated Slack bot and the invalid production key exposes more security posture than necessary. The current level is probably fine. Do not add vendor names for the "shared inbox tool."

**Repetition**
- The chart is disclaimed twice, once in the caption ("Illustrative numbers") and once in the body ("The chart is illustrative, not a reconstruction"). Keep the body line, which is the stronger one, and shorten the caption.
- The "sounds reassuring / sounds ordinary" framing repeats. Cut one.
- The draft mixes straight and curly quotes and apostrophes ("401 unauthorized" vs “idle, 0 new messages”). Normalise them.

**Small edit**
- "I still think a demo is a great audit" slightly undercuts the previous paragraph. Change it to *"A demo is a good audit, but a rare one."*

---

## 4. what-persists-when-the-conversation-ends

**Consciousness framing**
- The heading "Emotional context is not an emotion inside the machine" reads as a claim of absence. Change it to *"Stored emotional context is not evidence of emotion in the machine."*
- The rest of the piece stays neutral, which works well.

**Citations.** All four look right. Verify the links and titles before publishing:
- Park et al., 2304.03442
- Butlin et al., 2308.08708
- Anthropic's Oct 2025 introspection post
- Butlin & Lappas, 2501.07290

**Abstraction**
- "An experimental project… shared traces, spaces for interaction, a separate private memory pilot… heartbeat" never tells the reader what the system is. Add two concrete sentences: what a "trace" looks like, and what a user actually does.
- "a shared symbol" is opaque. Give an example or cut it.
- Hedging overload: "does not establish" or "not established" appears about 6 times, and every caption carries its own disclaimer. Keep the disclaimers in the body and the evidence-boundaries figure. Trim the captions to describe what each figure shows.
- Both hypotheticals ("I am exhausted today" and "keep things brief tonight; I am overwhelmed") make the same point. Merge them into one.

**Opportunity**
- Link to the vector-memory piece as the earlier, less careful approach. It turns the tension between the two articles into a narrative of how the thinking developed.

---

## Follow-up essay angles

### A. "Arguing about half-lives with a creative director"
The non-engineering decisions inside memory design, told through real (anonymised) tuning debates. It needs meeting notes or a changelog to stay grounded.
1. **Decay curves by intensity**: mild (0.3), medium, and peak (0.9) emotional traces next to a flat factual curve with a "superseded" drop.
2. **Score breakdown for one retrieval**: stacked bars showing similarity, intensity, age decay, and anchor boost for the top candidates, with the "park" example.
3. **Trace to tone-rule handoff**: a threshold diagram where a trace leaves the context slots and becomes a standing instruction.
4. **Decision log timeline**: each constant change matched to the tester feedback that prompted it. Use this only if real logs exist; otherwise label it a reconstruction.

### B. "One reviewer, one queue, one afternoon"
Watch a real reviewer work through a batch, with consent and anonymised, and report what actually used their attention.
1. **Time split per item**: finding the problem vs deciding about it, before and after a decision-focused layout.
2. **Error funnel**: issues present → flagged → seen → caught → missed.
3. **Bank-detail change flow**: proposal → conflict → independent call-back to a known number → approval.
4. **Plain-language routing rules as a document**: the actual rule sheet, annotated with who owns each rule.

### C. "Integrations die when people leave"
Many silent failures are tied to people: offboarding, rotated keys, accounts owned by an individual.
1. **Credential ownership map**: each integration linked to the human or service account it depends on.
2. **Job state machine**: idle vs read-failed vs auth-failed vs completed, with the transitions that should alert.
3. **Detection-gap timeline** for one real failure: break → first missed request → discovery → fix.
4. **Canary sequence diagram**: request ID, the destination check, the loop guard, and an independent alert channel.


## Editor decisions
Applied: neutral consciousness heading, concrete attention opening, removed quote-match auto-approval example, removed unverified outage duration, added attributed source context across corpus.
Not applied: changing names or softening unsupported benchmarks would not substantiate them. The old emotional-memory story and other historical metrics require original evidence before promotion; they have not been verified by these citations. No claim that anonymization or consent was obtained.
