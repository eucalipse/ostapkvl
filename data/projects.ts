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
};

export const archive: ArchiveRow[] = [
  {
    years: "2025",
    role: "AI Systems Architect",
    description:
      "Emotionally intelligent AI system: vector memory engine (Mistral + Weaviate), symbolic interaction layer, state-aware memory traces",
    domain: "AI",
  },
  {
    years: "2024–25",
    role: "Full-Stack / Data Engineer",
    description:
      "Healthcare analytics platform (USA/Canada): 500k+ data points/week, 200k+ personalized emails/week, LLM-anonymized patient reviews",
    domain: "Healthcare",
  },
  {
    years: "2022–25",
    role: "Full-Stack Developer",
    description:
      "Open-data platform for a regional government in Ukraine: municipality statistics, dashboards, public medical directories",
    domain: "Govtech",
  },
  {
    years: "2023–24",
    role: "Front-End Developer",
    description: "Dynamic form SaaS + tablet product-presentation platform",
    domain: "SaaS",
  },
  {
    years: "2023–24",
    role: "Front-End Developer",
    description: "Cargo container management system for a major logistics company",
    domain: "Logistics",
  },
  {
    years: "2023",
    role: "Front-End Developer",
    description:
      "Platform helping asylum seekers and refugees in Canada access rights and services",
    domain: "Social impact",
  },
  {
    years: "2022",
    role: "Full-Stack Developer",
    description: "Nurse-coach video platform, MVP shipped on a tight deadline",
    domain: "Healthcare",
  },
  {
    years: "2022",
    role: "Front-End Developer",
    description: "Clinical trials discovery SaaS",
    domain: "Medtech",
  },
  {
    years: "2021–22",
    role: "Lead Developer",
    description: "SaaS learning platform for startup education content",
    domain: "Edtech",
  },
  {
    years: "2021",
    role: "Full-Stack Developer",
    description: "DeFi/NFT asset-pool platform, Python→TypeScript migration",
    domain: "Web3",
  },
  {
    years: "2021",
    role: "Tech Lead",
    description:
      "Video coaching platform for medical professionals (standardized patient training)",
    domain: "Medtech",
  },
  {
    years: "2019–21",
    role: "Lead Developer",
    description:
      "ERP for a global agriscience leader: 80+ interrelated data models, tens of millions of records, weather/crop system integrations",
    domain: "Agritech",
  },
  {
    years: "2020–21",
    role: "Full-Stack Developer",
    description:
      "B2B/B2C precious-metals trading marketplace (Germany), real-time pricing",
    domain: "E-commerce",
  },
  {
    years: "2020–21",
    role: "Lead Front-End Developer",
    description: "AI visual content analysis platform for retail/advertising",
    domain: "AI",
  },
];
