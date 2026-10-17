import type { Metadata } from "next";
import { site } from "@/data/site";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact", languages: { en: "/contact", es: "/es", fr: "/fr", "x-default": "/contact" } },
  description:
    "Discuss AI architecture consulting and advisory with Ostap Kovalisko. Selected engagements arranged directly or through Eucalipse.",
};

export default function Contact() {
  return (
    <main className="mx-auto max-w-wide px-6 py-16">
      <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
        Consulting & advisory
      </h1>

      <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2">
        <section className="bg-paper p-8">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
            How I work
          </h2>
          <p className="mt-4">
            I&apos;m focused on my work as Chief Architect at{" "}
            <a
              href={site.missionLawLinkedin}
              aria-label="Mission Law on LinkedIn"
              className="text-accent underline decoration-line underline-offset-4 hover:decoration-accent"
            >
              Mission Law
            </a>
            . I&apos;m open to selected consulting and advisory projects that
            fit my existing commitments.
          </p>
          <p className="mt-4">
            AI architecture reviews, agent design and production readiness.
            Engagements can be arranged on a direct consulting contract or
            through{" "}
            <a
              href={site.eucalipse}
              className="text-accent underline decoration-line underline-offset-4 hover:decoration-accent"
            >
              Eucalipse
            </a>
            .
          </p>
          <p className="mt-4 text-sm">
            <a
              href={site.eucalipseLinkedin}
              className="text-accent underline decoration-line underline-offset-4 hover:decoration-accent"
            >
              Eucalipse on LinkedIn
            </a>
          </p>
        </section>
        <section className="bg-paper p-8">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
            Say hello
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="text-accent hover:underline">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.linkedin} className="hover:text-accent">
                LinkedIn →
              </a>
            </li>
          </ul>
        </section>
      </div>

      <ContactForm />
    </main>
  );
}
