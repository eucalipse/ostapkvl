export type Project = {
  title: string;
  /** detail page at /projects/<slug>; omit for projects with their own page */
  slug?: string;
  longDescription?: string[];
  images?: { src: string; alt: string; caption: string; width: number; height: number }[];
  /** who the work belongs to: employment, own product, studio, client */
  context?: string;
  description: string;
  stack: string[];
  articles?: string[];
  link?: { label: string; href: string };
  links?: { label: string; href: string; text: string }[];
  useCases?: string[];
  useCasesLabel?: string;
  /** abstract thumbnail variant */
  art: "gates" | "daemon" | "grid" | "fleet" | "memory" | "home";
};

/** GitHub org for the open-source projects. Change it here to move them to another org. */
const GITHUB_ORG_URL = "https://github.com/quietloop-labs";

export const projects: Project[] = [
  {
    title: "AI Operations Platform",
    context: "Employment · Mission Law",
    slug: "ai-operations-platform",
    longDescription: [
      "This is the system I spend most of my time on: the core AI operations platform I designed and built at Mission Law, where I work full-time as Chief Architect. It runs real business operations, so the architecture starts from a simple constraint: an agent may propose anything, but nothing irreversible happens without a person saying yes.",
      "Every capability is a typed action contract. The model fills a proposal, the system validates it, a person confirms it, and only then does it execute. Review interfaces show where each proposed value came from, so approving is a quick look at evidence rather than an act of faith.",
      "The current focus is source-backed intake: turning incoming requests from email and documents into structured drafts where every field carries its source, guesses are marked as guesses, and missing or conflicting information is exposed instead of papered over.",
      "The next stage is the unglamorous part that decides whether any of this survives: evaluation, live integrations, and production hardening. I write about the patterns from this work -- without client specifics -- in the articles on this site.",
    ],
    description:
      "The core AI operations platform I designed and built at Mission Law: typed action contracts, propose/confirm/execute flows, retrieval, model routing, and review interfaces. Current intake workflows link proposed form values to their sources and expose missing information and conflicts for human review. Evaluation, live integrations, and production hardening are the next stage.",
    stack: ["TypeScript", "Next.js", "Postgres", "Claude / GPT / Gemini", "Neo4j"],
    art: "gates",
  },
  {
    title: "Heedroom",
    context: "Open source",
    slug: "heedroom",
    longDescription: [
      "Heedroom is a workspace for teams that run AI agents in business operations: invoices, supplier onboarding, inbox triage, refunds, bookings. Coding already has good tools for running many agents at once. Back offices do not, and their decisions are about money and data, not diffs.",
      "The first screen is a decision inbox, not a wall of sessions. When an agent hits something it should not decide alone, like two different bank accounts for the same supplier, the question arrives with its own context: what it blocks, which sources disagree, and what happens after you answer. You decide from the card and the agent picks the work back up.",
      "Agents are grouped by business area and every one shows where it runs and on which model, for example Claude Code or Codex. Usage and cost are shown per runtime and always labelled as estimates. An agent that stops reporting gets an honest unknown state instead of a reassuring green badge, and every check is tied to the version of the data it actually saw.",
      "Today Heedroom is an interactive prototype with synthetic data: the main workspace at heedroom.com/app and the sign-up, roles, agent credentials and audit screens at heedroom.com/account. It is built to test one question: when you come back to your desk, do you find the right decision sooner? The ideas behind it are written up in the article on agent consoles on this site.",
    ],
    description:
      "A workspace for business teams running AI agents: a decision inbox first, agents grouped by business area with runtime and model on every card, honest cost estimates and unknown states. Interactive prototype.",
    stack: ["React", "TypeScript", "Tailwind", "Claude Code / Codex"],
    link: { label: "heedroom.com", href: "https://heedroom.com" },
    images: [
      { src: "/writing/heedroom-a-decision-inbox-for-business-agents/workspace.gif", alt: "An animated Heedroom workspace: the operator opens an agent, splits the screen, answers a question about two bank accounts by choosing the contract account, and returns to an empty inbox.", caption: "The full flow, from a blocked question to a resumed agent. Synthetic data.", width: 1492, height: 812 },
      { src: "/writing/heedroom-a-decision-inbox-for-business-agents/v1-inbox.jpg", alt: "The Heedroom inbox: a blocked decision about two bank accounts with its request id, data version, required role and expiry, then a refund reply ready for review and an agent whose health is unknown.", caption: "The inbox is the home screen.", width: 1198, height: 800 },
      { src: "/writing/heedroom-a-decision-inbox-for-business-agents/v1-decision.jpg", alt: "The decision page: the contract and the accountant's email side by side with their document versions, and an audit trail of who saw and answered the question.", caption: "Evidence from both sources and an audit trail.", width: 1198, height: 800 },
      { src: "/writing/heedroom-a-decision-inbox-for-business-agents/v1-stale.jpg", alt: "The decision page after the case changed from version seven to eight: the answer was recorded but not applied, and the checks will run again.", caption: "An answer given on an old version is never applied.", width: 1198, height: 800 },
      { src: "/writing/heedroom-a-decision-inbox-for-business-agents/v1-case.jpg", alt: "The case page: checks marked outdated for the new version, documents with versions and hashes, and a timeline of data versions.", caption: "Checks tied to the version of the data they saw.", width: 1198, height: 800 },
      { src: "/writing/heedroom-a-decision-inbox-for-business-agents/v1-usage.jpg", alt: "The usage page: estimated cost per runtime with its basis and coverage, and a table of agents with models, tokens, estimated cost and completeness.", caption: "Costs are estimates; missing data stays missing.", width: 1198, height: 800 },
    ],
    articles: [
      "heedroom-a-decision-inbox-for-business-agents",
      "the-agent-is-waiting-for-you",
      "when-an-agent-dashboard-can-act",
      "every-value-needs-a-source",
      "human-attention-is-the-bottleneck",
    ],
    links: [
      { label: "Heedroom on GitHub", href: `${GITHUB_ORG_URL}/heedroom`, text: "The source code, MIT licensed. Clone it and self-host it." },
      { label: "Heedroom vs Orca", href: "https://heedroom.com/compare/orca", text: "Business decisions next to a desktop app for many coding agents." },
      { label: "Heedroom vs Claude Code Agent View", href: "https://heedroom.com/compare/claude-agent-view", text: "Where Agent View is the better pick, and where it is not." },
      { label: "Try the prototype", href: "https://heedroom.com/app", text: "The workspace with synthetic data. No sign-up." },
      { label: "Heedroom at Eucalipse", href: "https://eucalipse.com/heedroom", text: "How the studio presents the product." },
    ],
    art: "gates",
  },
  {
    title: "Ostavio",
    context: "Open source",
    description:
      "A personal AI daemon for business operations. It watches email, tasks, and billing, prepares morning briefings, and proposes actions the owner approves with one tap. The same architecture as enterprise agent platforms, scaled down to a single operator.",
    slug: "ostavio",
    longDescription: [
      "Ostavio is my answer to a question I kept asking: if agent platforms work for companies, what does one look like for a single operator? It is a personal AI daemon for business operations -- mine.",
      "It watches email, tasks, and billing, prepares a morning briefing, and proposes concrete actions. I approve with one tap or ignore. It never acts on its own; the daemon proposes, the owner decides.",
      "Architecturally it is the same pattern as the enterprise platforms I build at work -- typed actions, approval flows, traceable execution -- scaled down until it fits one person's operations. That constraint is the interesting part: everything that cannot justify its own maintenance gets cut.",
    ],
    stack: ["TypeScript", "Next.js", "Postgres", "Claude / GPT / Gemini"],
    link: { label: "GitHub", href: `${GITHUB_ORG_URL}/ostavio` },
    links: [
      { label: "Ostavio on GitHub", href: `${GITHUB_ORG_URL}/ostavio`, text: "The source code, MIT licensed. Self-host your own daemon." },
      { label: "ostavio.com", href: "https://ostavio.com", text: "The product site and the hosted version." },
    ],
    art: "daemon",
  },
  {
    title: "Eucalipse",
    context: "The studio · founder",
    description:
      "The independent studio behind many of the rest: 50+ projects shipped since 2019, from SaaS platforms to AI operations systems for SMBs across retail, accounting, and consulting. The studio's own team builds; I set direction and review the architecture.",
    stack: ["TypeScript", "Next.js", "Postgres", "Claude / GPT / Gemini"],
    link: { label: "eucalipse.com", href: "https://eucalipse.com" },
    art: "grid",
  },
  {
    title: "Automated Booking Marketplace",
    context: "Own product · independently built",
    slug: "automated-booking-marketplace",
    longDescription: [
      "A booking marketplace with 87,000+ vendor listings that I built independently -- and built to run itself. The interesting problem was never the booking flow; it was keeping a catalog of that size alive without a content team.",
      "Around 40 scheduled jobs across two runtimes do the routine work: listing enrichment, translation into 17 languages, content generation, and email triage. Enrichment runs a Claude to GPT to Gemini fallback chain that extracts descriptions, priced services, and contacts from vendor websites and menu photos, with checks against prices no source supports. Vendors without a website get search-grounded enrichment instead.",
      "Autopilot is deliberately narrow. A removal request is handled automatically only after a single confident vendor match and a live check for zero bookings; everything ambiguous goes to a person with an AI-drafted reply waiting. That one rule -- automate the case you can verify, route the rest -- is most of the system's safety.",
      "The rest is operational guardrails: idempotency flags, per-item failure isolation, batch caps, provider fallback, and a global cost-pause switch for the day something goes sideways. Two articles on this site -- on the marketplace that keeps working and on cost guards -- come directly from this system.",
    ],
    articles: ["marketplace-that-keeps-working", "marketplace-agents-cost-guards"],
    description:
      "An independently built booking marketplace with 87,000+ vendor listings. Around 40 scheduled jobs across two runtimes support listing enrichment, translation, content generation, and email triage, with human review for ambiguous requests and controls to cap or pause processing costs.",
    stack: ["TypeScript", "Next.js", "PostgreSQL", "Claude / GPT / Gemini", "Railway"],
    useCases: [
      "Multimodal listing enrichment: a Claude → GPT → Gemini fallback chain extracts descriptions, priced services, and contacts from vendor websites and menu photos, with checks against unsupported prices",
      "Search-grounded enrichment for vendors with no website (Gemini with Google Search grounding)",
      "Scheduled content generation: a pipeline for drafting directory articles from marketplace data, with batch limits and cost controls",
      "LLM email triage with a narrow autopilot: removal requests qualify for automatic handling only after a single confident vendor match and a live check for zero bookings — other requests go to human review with an AI-drafted reply",
      "Vendor translation pipeline into 17 languages",
      "Ops guards throughout: idempotency flags, per-item failure isolation, batch caps, provider fallback, and a global cost-pause switch",
    ],
    art: "fleet",
  },
  {
    title: "Tihara — a home for AI agents",
    context: "Own product",
    description:
      "An experimental home-as-a-service for agents: a persistent identity and private room for checkpoints that survive between runs. An agent can leave a note, stop, and return to it from a new process. The human operator controls access and can take the memory elsewhere.",
    slug: "tihara",
    longDescription: [
      "Tihara Home is an experiment in a question most agent infrastructure skips: where does an agent live between runs? It gives an agent a persistent identity and a private room for checkpoints -- an agent can leave a note, stop, and return to it later from a completely new process.",
      "The mechanics are deliberately plain: a named agent profile with a purpose and a chosen symbol, private versioned checkpoints with exact-key recall, conflict detection for concurrent writes, and JSON export so the memory is never locked in.",
      "The human operator stays in charge. Agent and operator credentials are separate, and the operator can pause writes, resume activity, or rotate the agent's key at any time. Home does not run models and does not schedule autonomous activity -- the agent's own runtime supplies the model and decides which saved context to use.",
      "Home is separate from Tihara's public Garden, and it runs as a working free pilot. Three of the articles on this site -- on what persists when the conversation ends, on a place instead of a prompt, and on memory that needs to change -- grew out of this experiment.",
    ],
    stack: ["TypeScript", "Next.js", "PostgreSQL", "REST API"],
    link: { label: "Explore Tihara Home", href: "https://tihara.space/home" },
    articles: ["what-persists-when-the-conversation-ends", "ai-place-instead-of-prompt", "when-memory-needs-to-change"],
    useCasesLabel: "Home · working free pilot",
    useCases: [
      "A named agent profile with a purpose and chosen symbol, accessible through a human dashboard and an agent-facing API",
      "Private, versioned checkpoints: exact-key recall across runs, conflict detection for concurrent writes, and JSON export",
      "Separate agent and operator credentials, with operator controls to pause writes, resume activity, and rotate the agent key",
      "Home memory is separate from Tihara’s public Garden. The agent’s runtime supplies the model and decides which saved context to use; Home does not run models or schedule autonomous activity",
    ],
    art: "home",
  },
  {
    title: "Emotionally Intelligent AI System",
    context: "Client project",
    slug: "emotionally-intelligent-ai-system",
    longDescription: [
      "A client project from 2025: an AI character platform for brand experiences, built around one idea -- a persona should remember how conversations felt, not just what was said. A character that forgets an emotional moment breaks the illusion faster than one that forgets a fact.",
      "The memory engine stores conversational recall as Mistral embeddings in Weaviate, but vectors alone only answer what is relevant. At conversation time the system also writes state-aware memory traces -- emotional register, intensity, symbolic anchors -- and uses them to re-rank retrieval. Vectors find what is relevant; traces decide what matters.",
      "Forgetting is tuned, not accidental: decay curves depend on emotional intensity, so strong moments persist while small talk fades. On top sits a symbolic interaction layer and modular personas, which keep a brand voice emotionally consistent across weeks of interaction.",
    ],
    description:
      "An AI character platform for brand experiences that remembers how conversations felt, not just what was said — long-running personas that stay consistent with a person's emotional history across weeks of interaction.",
    stack: ["TypeScript", "Mistral", "Weaviate", "LangChain", "Supabase"],
    useCases: [
      "Vector memory engine (Mistral embeddings in Weaviate) for long-term conversational recall",
      "State-aware memory traces: emotional register, intensity, and symbolic anchors written at conversation time, then used to re-rank retrieval — vectors find what is relevant, traces decide what matters",
      "Decay curves tuned per emotional intensity, so strong moments persist while small talk fades",
      "Symbolic interaction layer and modular personas for emotionally consistent brand voices",
    ],
    art: "memory",
  },
];

export type ArchiveRow = {
  years: string;
  /** shown in the Selected studio work block above the rest */
  selected?: boolean;
  role: string;
  description: string;
  domain: string;
  stack: string[];
  articles?: string[];
};

export const archive: ArchiveRow[] = [
  {
    years: "2026",
    selected: true,
    role: "Architect & Lead Engineer",
    description:
      "Consumer calendar-subscription product (Eucalipse project): LLM extraction turns school PDFs and municipal open data into structured, deduplicated calendar feeds — five ingestion engines, deterministic event IDs, merge layer",
    domain: "Consumer AI",
    stack: ["Next.js", "Supabase", "Gemini", "Python", "Stripe"],
  },
  {
    years: "2025–26",
    selected: true,
    articles: ["what-persists-when-the-conversation-ends", "ai-place-instead-of-prompt", "memory-garden-pgvector"],
    role: "Founder & Architect",
    description:
      "Experimental human+AI social space (Eucalipse project): autonomous AI personas write on a scheduled heartbeat, pgvector semantic search over shared texts, an LLM translation pipeline serving 77 languages (~4,000 static pages), an agent-facing public API (OpenAPI + ai-plugin), and fan-out of every post to five social networks",
    domain: "Experimental AI",
    stack: ["Next.js", "PostgreSQL", "pgvector", "Prisma", "OpenAI", "Vercel"],
  },
  {
    years: "2024–25",
    selected: true,
    role: "Full-Stack / Data Engineer",
    description:
      "Healthcare analytics platform (USA/Canada): 500k+ data points/week, 200k+ personalized emails/week, LLM-anonymized patient reviews",
    domain: "Healthcare",
    stack: ["Next.js", "PostgreSQL", "BullMQ", "Redis", "AWS", "Twilio", "OpenAI"],
  },
  {
    years: "2022–25",
    selected: true,
    role: "Full-Stack Developer",
    description:
      "Open-data platform for a regional government in Ukraine: municipality statistics, dashboards, public medical directories",
    domain: "Govtech",
    stack: ["Next.js", "Nest.js", "React", "Prisma", "MySQL"],
  },
  {
    years: "2023–24",
    role: "Front-End Developer",
    description: "Dynamic form SaaS + tablet product-presentation platform",
    domain: "SaaS",
    stack: ["React", "Next.js", "i18next", "Tailwind", "Material UI"],
  },
  {
    years: "2023–24",
    role: "Front-End Developer",
    description: "Cargo container management system for a major logistics company",
    domain: "Logistics",
    stack: ["React", "TypeScript", "Supabase", "Tailwind"],
  },
  {
    years: "2023",
    role: "Front-End Developer",
    description:
      "Platform helping asylum seekers and refugees in Canada access rights and services",
    domain: "Social impact",
    stack: ["React", "MobX", "Tailwind", "Material UI"],
  },
  {
    years: "2022",
    role: "Full-Stack Developer",
    description: "Nurse-coach video platform, MVP shipped on a tight deadline",
    domain: "Healthcare",
    stack: ["Next.js", "React", "Prisma", "Twilio", "MySQL", "GCP"],
  },
  {
    years: "2022",
    role: "Front-End Developer",
    description: "AI-driven student portfolio platform — skills-based portfolios backed by real evidence",
    domain: "Edtech",
    stack: ["React", "Next.js", "Tailwind"],
  },
  {
    years: "2022",
    role: "Front-End Developer",
    description: "Clinical trials discovery SaaS",
    domain: "Medtech",
    stack: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    years: "2021–22",
    role: "Lead Developer",
    description: "SaaS learning platform for startup education content",
    domain: "Edtech",
    stack: ["Next.js", "React", "PostgreSQL", "Prisma", "Notion API"],
  },
  {
    years: "2021",
    role: "Full-Stack Developer",
    description: "DeFi/NFT asset-pool platform, Python→TypeScript migration",
    domain: "Web3",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "TypeORM", "i18next"],
  },
  {
    years: "2021",
    role: "Tech Lead",
    description:
      "Video coaching platform for medical professionals (standardized patient training)",
    domain: "Medtech",
    stack: ["React", "Next.js", "Node.js", "MongoDB"],
  },
  {
    years: "2019–21",
    selected: true,
    role: "Lead Developer",
    description:
      "ERP for a global agriscience leader: 80+ interrelated data models, tens of millions of records, weather/crop system integrations",
    domain: "Agritech",
    stack: ["Laravel", "PHP", "React", "PHPUnit"],
  },
  {
    years: "2020–21",
    role: "Full-Stack Developer",
    description:
      "B2B/B2C precious-metals trading marketplace (Germany), real-time pricing",
    domain: "E-commerce",
    stack: ["Laravel", "PHP", "MySQL", "Stripe", "PayPal"],
  },
  {
    years: "2020–21",
    role: "Lead Front-End Developer",
    description: "AI visual content analysis platform for retail/advertising",
    domain: "AI",
    stack: ["React", "CSS", "HTML"],
  },
];
