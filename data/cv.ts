export type CvEntry = {
  years: string;
  title: string;
  org: string;
  location?: string;
  note?: string;
  bullets?: string[];
};

export const summary =
  "Chief Architect and AI systems engineer. I design and ship production AI agent platforms end-to-end — multi-model consensus, human approval gates, full audit trails — in regulated environments. Serial technical founder: three startups (one acquired) and a software agency with 50+ shipped projects.";

export const experience: CvEntry[] = [
  {
    years: "2026 — now",
    title: "Chief Architect",
    org: "US venture-law firm",
    location: "San Francisco Bay Area, remote",
    bullets: [
      "Own the architecture across the firm's platform — the AI agent system and the client operations app — and lead the AI engineering stream: roadmap, architecture decisions, hiring.",
      "The platform anchors the firm's product strategy: 60+ AI actions with propose/confirm/execute approval gates, 3-model consensus search, a knowledge graph with hybrid vector + graph search, 13 integrations, and a human-in-the-loop review queue with one-click revert and a full audit trail.",
      "Drive the modernization of the client platform (design system, service workflows, billing) in parallel with the AI stream.",
    ],
  },
  {
    years: "2026",
    title: "AI Systems Engineer",
    org: "US venture-law firm",
    bullets: [
      "Architected and built the firm's AI platform largely solo: autonomous agents operating across Slack, tasks, and email with human approval gates.",
      "Designed knowledge search answering from the firm's entire history — emails, messages, documents — using multiple AI models in consensus.",
      "Built a multimedia AI chat (file uploads, voice input, inline document viewers, citations, visible thinking trace) and the monitoring dashboard where the team reviews everything the AI does.",
      "No vendor lock-in: multi-provider routing, new models adopted as they ship.",
    ],
  },
  {
    years: "2025 — 2026",
    title: "Lead Software Engineer",
    org: "US venture-law firm",
    bullets: [
      "Built the firm's client operating system — founders manage services, financing rounds, document signing, and billing.",
      "Client portal and admin panel with service state machines; dual-database architecture (Airtable as source of truth synced to Supabase).",
      "Integrated DocuSign, billing, tasks, email, and document storage into end-to-end service workflows.",
    ],
  },
  {
    years: "2019 — now",
    title: "Founder & AI Systems Architect",
    org: "Eucalipse",
    note: "50+ projects shipped",
    bullets: [
      "Software agency shipping custom platforms for startups and enterprises: SaaS products, web platforms, dedicated teams. Led architecture, hiring, and delivery.",
      "Since 2024: AI operations systems — multi-model routing across commercial and open-source LLMs, consensus cross-checks, shadow-mode rollouts, full audit trails — for retail, accounting, consulting, ESG, and asset management.",
    ],
  },
  {
    years: "2024 — 2025",
    title: "Full Stack Engineer",
    org: "WithPower",
    location: "remote, USA",
    bullets: [
      "Digital healthcare platform: distributed background processing of 500k+ clinical data points per week and delivery of 200k+ personalized analytics emails weekly.",
      "Next.js, PostgreSQL, AWS, BullMQ.",
    ],
  },
  {
    years: "2017 — 2019",
    title: "CTO & Co-Founder",
    org: "Startupmatcher",
    location: "Oslo",
    note: "acquired by TheHub.io",
    bullets: [
      "Grew the platform into the largest entrepreneur community in the Nordics; fundraising covered by Nordic tech press. Later acquired by TheHub.io.",
    ],
  },
  {
    years: "2015 — 2017",
    title: "CTO & Co-Founder",
    org: "BookBuses",
    location: "New York",
    note: "ERA accelerator W10",
    bullets: [
      "Coach-bus booking marketplace built end-to-end; Entrepreneurs Roundtable Accelerator, Winter 2016 class.",
    ],
  },
  {
    years: "2015 — 2016",
    title: "Technical Co-Founder",
    org: "Hubtraiteurs",
    location: "Lille",
    bullets: ["Catering marketplace for corporate clients in France, built end-to-end."],
  },
  {
    years: "2015 — 2016",
    title: "Project Management Methodology",
    org: "Roche",
    location: "Basel",
    bullets: [
      "Project execution under Roche's IT PMM across divisions — process harmonization (incl. Regulatory), change management, stakeholder communication in a heavily regulated pharma environment.",
    ],
  },
  {
    years: "2014 — 2015",
    title: "ThemeForest Author",
    org: "Envato",
    bullets: ["Designed, built, and sold WordPress themes and HTML templates — a one-person product business."],
  },
  {
    years: "2012 — 2014",
    title: "Lead Full Stack Web Developer",
    org: "Pol Promo Group",
    location: "Wrocław",
    bullets: ["First lead role: client web platforms end-to-end — PHP (Symfony), Python (Django), MySQL, Sphinx search."],
  },
  {
    years: "2011 — 2012",
    title: "Java Developer",
    org: "LeanForge",
    location: "Wrocław",
    bullets: ["Healthcare case-handling web platform end-to-end: requirements, estimates, development, testing, documentation."],
  },
];

export const education = [
  "M.Eng Computer Science — Technical University of Wrocław",
  "M.Eng Informatics — Universidad Carlos III de Madrid",
  "M.Sc Global E-business — Université Lille I",
];

export const languages =
  "Ukrainian and Polish (native), English, Spanish, French";

export type Publication = {
  title: string;
  outlet: string;
  year?: string;
  href: string; // TODO: real URLs
};

export const publications: Publication[] = [
  {
    title:
      "På scenen for å hente 6,2 millioner kroner – da må man levere «den perfekte pitch»",
    outlet: "Norwegian tech press",
    href: "#", // TODO: real URL
  },
  {
    title:
      "Her er scenen, hvor dit livsværk kan blive til guld eller goodbye på 6 minutter",
    outlet: "Nordic tech press",
    href: "#", // TODO: real URL
  },
  {
    title: "ERA Demo Day Winter 2016: 11 Startups Aiming to Simplify How We Live and Work",
    outlet: "US startup press",
    year: "2016",
    href: "#", // TODO: real URL
  },
  {
    title: "An Extension for Google Course Builder for Authoring GIFT Assessments",
    outlet: "Academic paper",
    href: "#", // TODO: real URL
  },
];
