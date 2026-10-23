import { site } from "./site";

export type CvEntry = {
  years: string;
  title: string;
  org: string;
  orgLinkedin?: string;
  location?: string;
  note?: string;
  bullets?: string[];
};

export const summary =
  "Chief Architect at Mission Law and founder of Eucalipse. I lead AI engineering and build business operations systems, combining software architecture, hands-on delivery, and team leadership. My AI work focuses on typed actions, human review, source-backed intake, and evaluation. Technical co-founder of three startups, one acquired, and founder of an agency with 50+ shipped projects.";

export const experience: CvEntry[] = [
  {
    "years": "Oct 2026 — now",
    "title": "Chief Architect",
    "org": "Mission Law",
    "orgLinkedin": site.missionLawLinkedin,
    "location": "Remote",
    "bullets": [
      "Lead AI engineering and shape architecture across the client and internal operations platform, combining hands-on development with technical direction and team leadership.",
      "Own architectural direction for typed action contracts, human approval flows, retrieval, model routing, integrations, and review interfaces.",
      "Develop source-backed intake workflows that expose missing or conflicting information for human review; lead evaluation, access-boundary, auditability, and production-hardening work.",
      "Continue modernizing billing, company and user management, onboarding, and document workflows, including the gradual replacement of Airtable- and Zapier-based processes.",
      "Help build and mentor the engineering team; coordinate technical priorities and hiring needs with leadership."
    ]
  },
  {
    "years": "Mar — Aug 2026",
    "title": "AI Systems Engineer",
    "org": "Mission Law",
    "orgLinkedin": site.missionLawLinkedin,
    "location": "Remote",
    "bullets": [
      "Designed and built the core AI operations platform, from action contracts and propose/confirm/execute flows to retrieval and interfaces for reviewing agent output.",
      "Developed source-cited retrieval across connected business data and multi-model cross-checking for selected tasks.",
      "Built chat and review interfaces with file handling, structured responses, document context, and source references; integrated communication and task systems.",
      "Continued core application delivery, including Contract Review V2, document versioning, revisions, signing integration, and counterparty confirmation."
    ]
  },
  {
    "years": "Sep 2025 — Mar 2026",
    "title": "Lead Software Engineer",
    "org": "Mission Law",
    "orgLinkedin": site.missionLawLinkedin,
    "location": "Remote",
    "bullets": [
      "Built billing and billing-review foundations: billing UI, LeanLaw integration and synchronization, matter and time-entry review, bulk editing, and change notifications.",
      "Developed company and user management, onboarding functionality, and the new contract-review service.",
      "Connected signing, tasks, email, and document storage through DocuSign, Asana, SendGrid, and SharePoint; developed application data flows between Airtable and Supabase.",
      "Delivered internal tools, reporting, fixes, and ongoing integration support using TypeScript, React, Next.js, PostgreSQL, Supabase, and Vercel."
    ]
  },
  {
    "years": "Dec 2024 — now",
    "title": "Founder & AI Systems Architect",
    "org": "Eucalipse",
    "orgLinkedin": site.eucalipseLinkedin,
    "note": "Agency founded in 2019; 50+ projects shipped",
    "bullets": [
      "Lead architecture and delivery for AI-enabled operations systems and custom software through Eucalipse.",
      "Design agent workflows around business data, typed actions, human review, and traceable execution; develop retrieval, model routing, integrations, and evaluation approaches.",
      "Work with clients on architecture, implementation, and the transition from prototypes to maintainable systems."
    ]
  },
  {
    "years": "Jun 2024 — Apr 2025",
    "title": "Full Stack Engineer",
    "org": "WithPower",
    "location": "Remote, USA",
    "bullets": [
      "Developed application features and data-processing infrastructure for a digital healthcare platform serving providers and patients in the US and Canada.",
      "Built distributed background processing with BullMQ for 500k+ data points per week, analytics and personalized reporting, and infrastructure delivering 200k+ personalized analytics emails weekly.",
      "Next.js, PostgreSQL, AWS, BullMQ."
    ]
  },
  {
    "years": "Feb 2019 — Oct 2024",
    "title": "Technical Founder",
    "org": "Eucalipse",
    "orgLinkedin": site.eucalipseLinkedin,
    "bullets": [
      "Founded and ran a software agency delivering custom platforms for startups and established businesses.",
      "Led discovery, architecture, implementation, and delivery across SaaS products, web applications, and operational tools.",
      "Recruited engineers, formed project teams, and coordinated delivery with clients; combined hands-on engineering with technical scope, delivery planning, and ongoing product development."
    ]
  },
  {
    "years": "Aug 2017 — Jan 2019",
    "title": "CTO & Co-Founder",
    "org": "Startupmatcher",
    "location": "Oslo",
    "note": "acquired by TheHub.io",
    "bullets": [
      "Led engineering for a platform connecting startups, talent, and the Nordic entrepreneur community. Startupmatcher was later acquired by TheHub.io.",
      "Owned technical architecture, product development, releases, and engineering hiring; developed job, profile, and community capabilities with the founding team."
    ]
  },
  {
    "years": "Mar — Aug 2017",
    "title": "Tech Lead & Co-Founder",
    "org": "Startupmatcher",
    "location": "Oslo",
    "bullets": [
      "Co-founded the platform and built its initial product: founder profiles, job listings, and connections between startups and talent. Established the technical foundation for continued development."
    ]
  },
  {
    "years": "Dec 2015 — Mar 2017",
    "title": "CTO & Co-Founder",
    "org": "BookBuses",
    "location": "New York",
    "note": "ERA W10 accelerator, Feb — May 2016",
    "bullets": [
      "Built a US coach-bus booking marketplace as technical co-founder, covering search, booking, operator workflows, and payments.",
      "Owned architecture and implementation; joined Entrepreneurs Roundtable Accelerator in New York and presented at Demo Day."
    ]
  },
  {
    "years": "Oct 2015 — Dec 2016",
    "title": "Technical Co-Founder",
    "org": "Hubtraiteurs",
    "location": "Lille",
    "bullets": [
      "Built a catering marketplace for the French market, helping customers discover, compare, and order catering services. Owned technical implementation from initial development through delivery."
    ]
  },
  {
    "years": "Sep 2015 — Feb 2016",
    "title": "Project Management Methodology",
    "org": "Roche",
    "location": "Basel",
    "bullets": [
      "Supported project execution using Roche's IT Project Management Methodology, including process harmonization, change management, and stakeholder coordination in a regulated pharmaceutical environment."
    ]
  },
  {
    "years": "Jul 2014 — Jun 2015",
    "title": "ThemeForest Author",
    "org": "Envato",
    "bullets": [
      "Designed, developed, and sold WordPress themes and HTML templates. Managed design, implementation, customer support, and product updates as an independent creator."
    ]
  },
  {
    "years": "Jun 2012 — May 2014",
    "title": "Lead Full Stack Web Developer",
    "org": "Pol Promo Group",
    "location": "Wrocław",
    "bullets": [
      "Led development of client web platforms, from requirements and estimates through architecture, implementation, and delivery.",
      "PHP/Symfony, Python/Django, WordPress, Drupal, MySQL, Sphinx search, and JavaScript; Scrum and test-driven development."
    ]
  },
  {
    "years": "Mar 2011 — Jun 2012",
    "title": "Java Developer",
    "org": "LeanForge",
    "location": "Wrocław",
    "bullets": [
      "Built a healthcare case-handling web application across requirements, estimates, implementation, testing, and documentation.",
      "Java, Spring, Hibernate, MySQL, Wicket, Selenium, and Amazon EC2."
    ]
  }
];

export const education = [
  "M.Eng Computer Science — Technical University of Wrocław",
  "M.Eng Informatics — Universidad Carlos III de Madrid",
  "M.Sc Global E-business — Université Lille I",
];

export const languages =
  "Ukrainian and Polish (native), English (C1), Spanish (B2), French (B1), Turkish (A1)";

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
    outlet: "ITavisen",
    year: "2016",
    href: "https://itavisen.no/2016/05/27/pa-scenen-for-a-hente-62-millioner-kroner-da-ma-man-ha-den-perfekte-pitch/",
  },
  {
    title:
      "Her er scenen, hvor dit livsværk kan blive til guld eller goodbye på 6 minutter",
    outlet: "Finans.dk",
    year: "2016",
    href: "https://finans.dk/tech/ECE8649068/her-er-scenen-hvor-dit-livsvaerk-kan-blive-til-guld-eller-goodbye-paa-6-minutter",
  },
  {
    title: "ERA Demo Day Winter 2016: 11 Startups Aiming to Simplify How We Live and Work",
    outlet: "Microsoft for Startups",
    year: "2016",
    href: "https://medium.com/@MicrosoftforStartups/era-demo-day-winter-2016-11-startups-aiming-to-simplify-how-we-live-and-work-788fe675c32f",
  },
  {
    title: "An Extension for Google Course Builder for Authoring GIFT Assessments",
    outlet: "Academic paper, 2013 (Delgado Kloos, Kovalisko et al.)",
    year: "2013",
    href: "https://www.mendeley.com/catalogue/98c49ddc-f228-39d8-918b-006b8372b38c/",
  },
];
