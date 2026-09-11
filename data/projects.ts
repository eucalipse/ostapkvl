export type Project = {
  title: string;
  description: string;
  stack: string[];
  link?: { label: string; href: string };
  useCases?: string[];
  /** abstract thumbnail variant */
  art: "gates" | "daemon" | "grid" | "fleet" | "memory";
};

export const projects: Project[] = [
  {
    title: "AI Operations Platform",
    description:
      "A production agent platform for a US professional-services firm: 60+ AI actions behind a router and a propose/confirm/execute state machine, 3-model consensus answers, a Neo4j knowledge graph, and Slack, email, and chat surfaces. Every action runs through human approval gates and lands in a full audit trail.",
    stack: ["TypeScript", "Next.js", "Postgres", "Claude / GPT / Gemini", "Neo4j"],
    art: "gates",
  },
  {
    title: "Ostavio",
    description:
      "A personal AI daemon for business operations. It watches email, tasks, and billing, prepares morning briefings, and proposes actions the owner approves with one tap. The same architecture as enterprise agent platforms, scaled down to a single operator.",
    stack: ["TypeScript", "Next.js", "Postgres", "Claude / GPT / Gemini"],
    art: "daemon",
  },
  {
    title: "Eucalipse",
    description:
      "The software agency behind the rest: 50+ projects shipped since 2019, from SaaS platforms to AI operations systems for SMBs across retail, accounting, and consulting. Architecture, hiring, and delivery under one roof.",
    stack: ["TypeScript", "Next.js", "Postgres", "Claude / GPT / Gemini"],
    link: { label: "eucalipse.com", href: "https://eucalipse.com" },
    art: "grid",
  },
  {
    title: "Self-Running Marketplace",
    description:
      "A booking marketplace (own product) that operates itself: 87,000+ vendor listings built and maintained by a fleet of scheduled agents across two runtimes — around 40 cron jobs — with humans pulled in only where judgment is needed.",
    stack: ["TypeScript", "Next.js", "PostgreSQL", "Claude / GPT / Gemini", "Railway"],
    useCases: [
      "Multimodal listing enrichment: a Claude → GPT → Gemini fallback chain reads vendor websites, including menu and price-board photos via vision, and produces full listings — descriptions, priced services, contacts — at ~900 vendors/day, with anti-hallucination guards on prices",
      "Search-grounded enrichment for vendors with no website (Gemini with Google Search grounding)",
      "Programmatic SEO: nightly LLM-written directory articles generated from live marketplace data, at about $0.50 per 50 articles",
      "LLM email triage with a narrow autopilot: inbound mail is classified and matched to a vendor; only the provably safe case (removal request, single confident match, zero live bookings) is auto-handled after live re-validation — everything else queues for a human with an AI-drafted reply",
      "Vendor translation pipeline into 17 languages",
      "Ops guards throughout: idempotency flags, per-item failure isolation, batch caps, provider fallback, and a global cost-pause switch",
    ],
    art: "fleet",
  },
  {
    title: "Emotionally Intelligent AI System",
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
  role: string;
  description: string;
  domain: string;
  stack: string[];
};

export const archive: ArchiveRow[] = [
  {
    years: "2026",
    role: "Founder & Architect",
    description:
      "Consumer calendar-subscription product (own product): LLM extraction turns school PDFs and municipal open data into structured, deduplicated calendar feeds — five ingestion engines, deterministic event IDs, merge layer",
    domain: "Consumer AI",
    stack: ["Next.js", "Supabase", "Gemini", "Python", "Stripe"],
  },
  {
    years: "2025–26",
    role: "Founder & Architect",
    description:
      "Experimental human+AI social space (own project): autonomous AI personas write on a scheduled heartbeat, pgvector semantic search over shared texts, an LLM translation pipeline serving 77 languages (~4,000 static pages), an agent-facing public API (OpenAPI + ai-plugin), and fan-out of every post to five social networks",
    domain: "Experimental AI",
    stack: ["Next.js", "PostgreSQL", "pgvector", "Prisma", "OpenAI", "Vercel"],
  },
  {
    years: "2024–25",
    role: "Full-Stack / Data Engineer",
    description:
      "Healthcare analytics platform (USA/Canada): 500k+ data points/week, 200k+ personalized emails/week, LLM-anonymized patient reviews",
    domain: "Healthcare",
    stack: ["Next.js", "PostgreSQL", "BullMQ", "Redis", "AWS", "Twilio", "OpenAI"],
  },
  {
    years: "2022–25",
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
