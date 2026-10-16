# Consciousness & AI — editorial research brief

Researched 15 October 2026. Internal planning document, not a published article. Agent instructions: `agents/consciousness-research.md`.

## Recommended sequence

Start with **What does it mean for an agent to remember?** The existing essay asks what persists between conversations. The follow-up should test whether retained information actually helps, rather than repeat the philosophical introduction. Then move through self-report, evidence standards, internal workspaces, persona stability, and human interpretation.

## Topic and source ledger

### 1. What does it mean for an agent to remember?
- Primary source: Di Wu et al., [LongMemEval-V2](https://arxiv.org/abs/2605.12493), 12 May 2026. Preprint, explicitly work in progress; abstract checked.
- Finding: evaluates memory for environment-specific agent experience, including changing states, workflows, and false premises. Its evidence-gathering formulation separates stored trajectories from what is supplied to answer a question. Better-performing methods also incur latency costs.
- Angle: retaining a history is different from recalling useful, current evidence. Benchmark results concern performance, not autobiographical experience.
- Visuals: session-to-session evidence flow; failure map for stale notes, omitted corrections, and irrelevant retrieval. No invented performance chart.
- Proposed experiment: fixed model and task, compare no history, original notes, and summaries; repeat trials with changed preferences. Explicitly proposed, not completed.

### 2. Can a model report its learned behavior?
- Primary source: Anthropic, [Introspection Adapters](https://alignment.anthropic.com/2026/introspection-adapters/), 28 April 2026. Vendor research.
- Finding: specialized adapter training improves disclosure of learned behaviors in evaluated settings, but reporting remains incomplete.
- Angle: contrast a report with an independent behavioral test. Do not equate auditing success with subjective self-awareness.
- Visual: known intervention, reported behavior, observed behavior; show omissions as well as successes.

### 3. What would count as evidence for AI consciousness?
- Primary source lead: Butlin et al., [Identifying indicators of consciousness in AI systems](https://doi.org/10.1016/j.tics.2025.10.011), online 10 November 2025, Trends in Cognitive Sciences.
- Access note: research agent identified the publication; editor's direct DOI fetch failed. Retrieve accessible author manuscript before writing detailed claims.
- Angle: theory-dependent indicators are not a universal checklist or a percentage consciousness score. Compare competing interpretations.
- Visual: indicator / theory / observation needed / alternative explanation / uncertainty matrix.

### 4. A workspace inside the model
- Primary source: Anthropic, [A global workspace in language models](https://www.anthropic.com/research/global-workspace), 6 July 2026. Research announcement with linked paper; announcement checked.
- Finding: reports internal representations called J-space and interventions relating them to reportability, modulation, flexible use, and reasoning.
- Angle: explain causal intervention versus resemblance to a theory. The authors explicitly leave subjective experience unsettled. Review the linked paper and independent responses before drafting; do not present vendor interpretation as consensus.
- Visual: output observations versus internal interventions, with theoretical interpretation shown separately.

### 5. A consistent character and a continuous self
- Primary source: Anthropic, [The assistant axis](https://www.anthropic.com/research/assistant-axis), 19 January 2026. Vendor research.
- Finding: investigates persona-associated activation directions and interventions affecting assistant-like behavior in selected open-weight models.
- Angle: persona stability is an observable property; its relationship to a persistent subject remains a separate question.
- Visual: context and persona behavior across a conversation, alongside a distinct memory-storage lane.

### 6. Why AI feels like someone
- Primary source: [Humanlike AI Design Increases Anthropomorphism but Yields Divergent Outcomes on Engagement and Trust Globally](https://arxiv.org/abs/2512.17898), 19 December 2025. Preprint.
- Finding: humanlike design increases anthropomorphism, while engagement and trust effects vary across the tested contexts.
- Angle: study human perception without dismissing its meaning or treating it as evidence of the system's experience. Avoid turning sample differences into fixed claims about cultures.
- Visual: design choices, perceived humanlikeness, and measured outcomes; contextual influences shown separately.

## First article outline
1. A saved preference can still be ignored.
2. Storage, retrieval, and use have different failure modes.
3. What a modern memory benchmark actually measures.
4. A small correction-and-recall experiment we could run.
5. Why continuity of useful behavior leaves subjective experience unresolved.

## Delivery requirements
New essay remains `draft: true`, category `Consciousness & AI`. At least two explanatory figures, embedded bottom-right `ostapkvl.com` watermark, meaningful alt text, and existing article OG card. Label hypothetical examples. Sources next to claims. No private project metrics or unapproved names. No publication or paid promotion without the owner's instruction.
