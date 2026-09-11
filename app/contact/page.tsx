import type { Metadata } from "next";
import { site } from "@/data/site";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Hire Ostap Kovalisko for AI agent architecture and production AI systems, or just say hello.",
};

export default function Contact() {
  return (
    <main className="mx-auto max-w-wide px-6 py-16">
      <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
        Work with me
      </h1>

      <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2">
        <section className="bg-paper p-8">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
            Hire me / advisory
          </h2>
          <p className="mt-4">
            AI agent architecture and production AI systems — design reviews,
            end-to-end builds, and getting an agent platform from demo to
            production. Engagements run through{" "}
            <a
              href={site.eucalipse}
              className="text-accent underline decoration-line underline-offset-4 hover:decoration-accent"
            >
              Eucalipse
            </a>
            .
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
