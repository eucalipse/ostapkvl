import type { Metadata } from "next";
import { site } from "@/data/site";

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

      {/* Static-friendly contact form: mailto handoff. TODO: swap action to a
          Formspree endpoint (https://formspree.io) for real submissions. */}
      <form
        className="mt-12 max-w-prose"
        action={`mailto:${site.email}`}
        method="post"
        encType="text/plain"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block text-sm">
            <span className="font-mono text-xs uppercase tracking-wider text-muted">
              Name
            </span>
            <input
              type="text"
              name="name"
              required
              className="mt-2 w-full border border-line bg-paper px-3 py-2.5 outline-none transition-colors focus:border-accent"
            />
          </label>
          <label className="block text-sm">
            <span className="font-mono text-xs uppercase tracking-wider text-muted">
              Email
            </span>
            <input
              type="email"
              name="email"
              required
              className="mt-2 w-full border border-line bg-paper px-3 py-2.5 outline-none transition-colors focus:border-accent"
            />
          </label>
        </div>
        <label className="mt-6 block text-sm">
          <span className="font-mono text-xs uppercase tracking-wider text-muted">
            Message
          </span>
          <textarea
            name="message"
            rows={6}
            required
            className="mt-2 w-full border border-line bg-paper px-3 py-2.5 outline-none transition-colors focus:border-accent"
          />
        </label>
        <button
          type="submit"
          className="mt-6 border border-ink bg-ink px-5 py-2.5 text-sm text-paper transition-colors hover:border-accent hover:bg-accent"
        >
          Open email draft
        </button>
        <p className="mt-4 font-mono text-xs text-muted">
          Opens your email app with the message filled in. Usually reply within
          a day, any timezone.
        </p>
      </form>
    </main>
  );
}
