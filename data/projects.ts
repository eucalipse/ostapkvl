export type Project = {
  title: string;
  description: string;
  stack: string[];
  link?: { label: string; href: string };
  /** abstract thumbnail variant */
  art: "gates" | "daemon" | "grid";
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
      "Self-running marketplace (own product): a fleet of autonomous agents fills and promotes it — scraping, LLM enrichment, content generation, SEO, and outreach on a cron backbone with cost guards and idempotent jobs; 12k+ listings built by agents",
    domain: "AI ops",
    stack: ["TypeScript", "Next.js", "PostgreSQL", "Railway", "LLM pipelines"],
  },
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
    years: "2025",
    role: "AI Systems Architect",
    description:
      "Emotionally intelligent AI system: vector memory engine (Mistral + Weaviate), symbolic interaction layer, state-aware memory traces",
    domain: "AI",
    stack: ["Mistral", "LangChain", "Weaviate", "TypeScript", "Supabase", "PostgreSQL"],
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
