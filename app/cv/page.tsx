import type { Metadata } from "next";
import {
  summary,
  experience,
  education,
  languages,
  publications,
} from "@/data/cv";
import { archive } from "@/data/projects";
import { site } from "@/data/site";
import { PrintButton } from "./print-button";

// Unlisted: reachable only via the About button or a shared link.
export const metadata: Metadata = {
  title: "CV",
  description: "Ostap Kovalisko — Chief Architect. Full CV.",
  robots: { index: false, follow: false },
};

const selectedProjects = archive.slice(0, 8);

export default function Cv() {
  return (
    <main className="print-tight mx-auto max-w-prose px-6 py-16 print:py-0">
      <header className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <h1 className="font-serif text-4xl font-medium tracking-tight">
            Ostap Kovalisko
          </h1>
          <p className="mt-1 text-lg text-muted">Chief Architect</p>
          <p className="mt-3 font-mono text-xs text-muted">
            <a href={`mailto:${site.email}`} className="hover:text-accent">
              {site.email}
            </a>{" "}
            ·{" "}
            <a href={site.linkedin} className="hover:text-accent">
              linkedin.com/in/ostapkovalisko
            </a>{" "}
            ·{" "}
            <a href={site.github} className="hover:text-accent">
              github.com/ostapkvl
            </a>{" "}
            · ostapkvl.com
          </p>
        </div>
        <PrintButton />
      </header>

      <p className="mt-8 border-y border-line py-5 text-sm">{summary}</p>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
          Experience
        </h2>
        <ol className="mt-4 space-y-7">
          {experience.map((entry) => (
            <li key={entry.years + entry.org + entry.title}>
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className="font-serif text-lg font-medium">
                  {entry.title}
                </h3>
                <p className="text-sm text-muted">
                  {entry.org}
                  {entry.location ? ` · ${entry.location}` : ""}
                  {entry.note ? ` · ${entry.note}` : ""}
                </p>
                <p className="ml-auto font-mono text-xs text-muted">
                  {entry.years}
                </p>
              </div>
              {entry.bullets && (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
          Selected projects
        </h2>
        <ul className="mt-4 space-y-2 text-sm">
          {selectedProjects.map((row) => (
            <li key={row.years + row.description} className="flex gap-4">
              <span className="w-16 shrink-0 font-mono text-xs leading-6 text-muted">
                {row.years}
              </span>
              <span className="text-muted">{row.description}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 font-mono text-xs text-muted">
          Full archive at ostapkvl.com/projects · 50+ projects via Eucalipse
          since 2019.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
          Education & languages
        </h2>
        <ul className="mt-4 space-y-1 text-sm">
          {education.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p className="mt-2 text-sm text-muted">Languages: {languages}.</p>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
          Publications
        </h2>
        <ul className="mt-4 space-y-2 text-sm">
          {publications.map((pub) => (
            <li key={pub.title}>
              <a href={pub.href} className="hover:text-accent">
                {pub.title}
              </a>{" "}
              <span className="font-mono text-xs text-muted">
                — {pub.outlet}
                {pub.year ? `, ${pub.year}` : ""}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
