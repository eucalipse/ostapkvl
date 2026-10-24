import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { landingEn } from "@/data/landings";

export const metadata: Metadata = {
  title: "Eucalipse",
  description:
    "Eucalipse is the independent software studio Ostap Kovalisko founded in 2019: its own team, 50+ shipped projects, AI architecture and production systems.",
};

const facts: [string, string][] = [
  ["2019", "studio founded"],
  ["50+", "projects shipped"],
  ["Own team", "engineers and product"],
  ["Founder level", "my role: direction and architecture reviews"],
];

export default function EucalipsePage() {
  return (
    <main className="mx-auto max-w-wide px-6">
      <section className="py-12 sm:py-16" data-analytics-placement="eucalipse-hero">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">The studio</p>
        <h1 className="mt-6 font-serif text-5xl font-medium leading-[1.05] tracking-tight sm:text-7xl">
          Eucalipse<span className="text-accent">.</span>
        </h1>
        <p className="mt-5 max-w-prose font-serif text-xl text-muted sm:text-2xl">
          An independent software studio I founded in 2019. Its own team, 50+ shipped projects, and a
          habit of building systems that keep working after the demo.
        </p>
      </section>

      <section className="border-t border-line py-12" data-analytics-placement="eucalipse-fit">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">Where I fit</h2>
        <div className="mt-6 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
          <div className="bg-paper p-8">
            <h3 className="font-serif text-2xl font-medium">Me</h3>
            <p className="mt-3 max-w-prose">
              My full-time focus is <a href={site.missionLawLinkedin} className="text-accent underline decoration-line underline-offset-4 hover:decoration-accent">Mission Law</a>,
              where I&apos;m Chief Architect. At Eucalipse I stay at the founder level: direction and
              architecture reviews, not day-to-day delivery.
            </p>
          </div>
          <div className="bg-paper p-8">
            <h3 className="font-serif text-2xl font-medium">The studio</h3>
            <p className="mt-3 max-w-prose">
              Eucalipse runs independently with its own engineers and product people. When a project
              needs a full team, Eucalipse takes it on -- and I review the architecture along the way.
            </p>
          </div>
        </div>
        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-4">
          {facts.map(([value, label]) => (
            <div key={label} className="bg-paper p-6">
              <dt className="font-serif text-2xl font-medium">{value}</dt>
              <dd className="mt-1 text-sm text-muted">{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="border-t border-line py-12" data-analytics-placement="eucalipse-services">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">{landingEn.services}</h2>
        <div className="mt-6 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
          {landingEn.items.map(([title, body]) => (
            <div key={title} className="bg-paper p-8">
              <h3 className="font-serif text-xl font-medium">{title}</h3>
              <p className="mt-3 text-sm text-muted">{body}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-prose text-sm text-muted">{landingEn.processText}</p>
      </section>

      <section className="border-t border-line py-12" data-analytics-placement="eucalipse-cta">
        <h2 className="font-serif text-3xl font-medium">{landingEn.contact}</h2>
        <p className="mt-3 max-w-prose">
          Describe the problem, the current state of the system, and your timeline. I read every
          message myself; if the work needs a full team, Eucalipse takes it on and I stay on as the
          architect.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/contact" className="border border-ink bg-ink px-5 py-2.5 text-sm text-paper transition-colors hover:border-accent hover:bg-accent">
            {landingEn.cta}
          </Link>
          <a href={site.eucalipse} className="border border-line px-5 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent">
            eucalipse.com →
          </a>
        </div>
      </section>
    </main>
  );
}
