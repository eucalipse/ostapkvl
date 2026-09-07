import type { Metadata } from "next";
import Link from "next/link";
import { education, languages, publications } from "@/data/cv";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ostap Kovalisko — Chief Architect and AI systems engineer. Serial technical founder, builder of production AI agent platforms in regulated environments.",
};

const timeline = [
  {
    years: "2026 — now",
    title: "Chief Architect",
    org: "US venture-law firm",
    body: "Architecture of the AI platform and the client operations app; leads the AI engineering stream. Built the agent platform largely solo: an action system with propose/confirm/execute gates, 3-model consensus search, a knowledge graph, 13 integrations, and a human-in-the-loop review queue with a full audit trail.",
  },
  {
    years: "2025 — 2026",
    title: "AI Systems Engineer → Lead Software Engineer",
    org: "same firm",
    body: "Client portal and admin operating system: service state machines, dual-database sync, document signing and billing integrations.",
  },
  {
    years: "2019 — now",
    title: "Founder & AI Systems Architect",
    org: "Eucalipse",
    body: "Software agency, 50+ shipped projects; AI operations systems for retail, accounting, consulting, ESG, and asset management.",
  },
  {
    years: "2024 — 2025",
    title: "Full Stack Engineer",
    org: "WithPower",
    body: "Digital healthcare platform: millions of clinical data points, 200k+ personalized analytics emails weekly.",
  },
  {
    years: "2015 — 2019",
    title: "CTO & Co-Founder ×3",
    org: "Startupmatcher · BookBuses · Hubtraiteurs",
    body: "Startupmatcher (Oslo) — the largest entrepreneur community in the Nordics, acquired by TheHub.io. BookBuses (NYC) — ERA accelerator W10 2016. Hubtraiteurs (Lille) — catering marketplace.",
  },
  {
    years: "2015 — 2016",
    title: "Project Management Methodology",
    org: "Roche, Basel",
    body: "Project execution methodology in a heavily regulated pharma environment.",
  },
];

export default function About() {
  return (
    <main className="mx-auto max-w-prose px-6 py-16">
      <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
        About
      </h1>

      <div className="mt-8 space-y-5 text-lg">
        <p>
          I&apos;m a senior engineer who builds AI systems that do real work
          inside companies — not chatbots, not demos. My specialty is
          production agent platforms in regulated environments: systems that
          read email, draft responses, reconcile billing, and flag what needs a
          human, with approval gates and a full audit trail.
        </p>
        <p>
          I&apos;m also a serial founder. Three startups as CTO or technical
          co-founder — one acquired — and a software agency, Eucalipse, that
          has shipped 50+ projects since 2019. These days I work across US
          time zones from wherever the map takes me.
        </p>
      </div>

      {/* CV timeline */}
      <section className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
          Experience
        </h2>
        <ol className="mt-6 divide-y divide-line border-y border-line">
          {timeline.map((item) => (
            <li key={item.years + item.org} className="grid gap-1 py-6 sm:grid-cols-[8.5rem_1fr] sm:gap-6">
              <p className="font-mono text-xs leading-6 text-muted">{item.years}</p>
              <div>
                <h3 className="font-serif text-lg font-medium">
                  {item.title}{" "}
                  <span className="font-sans text-sm font-normal text-muted">
                    · {item.org}
                  </span>
                </h3>
                <p className="mt-1.5 text-sm text-muted">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Education */}
      <section className="mt-14">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
          Education & languages
        </h2>
        <ul className="mt-4 space-y-1 text-sm">
          {education.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-muted">Languages: {languages}.</p>
      </section>

      {/* Press & publications */}
      <section className="mt-14">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
          Press & publications
        </h2>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {publications.map((pub) => (
            <li key={pub.title} className="py-4">
              <a href={pub.href} className="group block">
                <p className="font-serif text-base leading-snug group-hover:text-accent">
                  {pub.title}
                </p>
                <p className="mt-1 font-mono text-xs text-muted">
                  {pub.outlet}
                  {pub.year ? ` · ${pub.year}` : ""}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Beyond work */}
      <section className="mt-14">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
          Beyond work
        </h2>
        <p className="mt-4 text-sm text-muted">
          57 countries and counting. I work between Europe and Latin America on
          US hours and document the road at{" "}
          <a
            href={site.instagram}
            className="text-accent underline decoration-line underline-offset-4 hover:decoration-accent"
          >
            @yet.another.travel
          </a>
          .
        </p>
      </section>

      <div className="mt-14">
        <Link
          href="/cv"
          className="inline-block border border-ink bg-ink px-5 py-2.5 text-sm text-paper transition-colors hover:border-accent hover:bg-accent"
        >
          Download CV
        </Link>
      </div>
    </main>
  );
}
