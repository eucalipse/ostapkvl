"use client";

import { useState } from "react";
import { site } from "@/data/site";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Could not send.");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not send.");
    }
  }

  if (status === "sent") {
    return (
      <div className="mt-12 max-w-prose border border-line bg-paper p-8">
        <p className="font-serif text-xl">Message sent.</p>
        <p className="mt-2 text-sm text-muted">
          Thanks — I usually reply within a day, any timezone.
        </p>
      </div>
    );
  }

  return (
    <form className="mt-12 max-w-prose" onSubmit={handleSubmit}>
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
      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 border border-ink bg-ink px-5 py-2.5 text-sm text-paper transition-colors hover:border-accent hover:bg-accent disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      {status === "error" && (
        <p className="mt-3 text-sm text-accent" role="alert">
          {error} You can always write to{" "}
          <a href={`mailto:${site.email}`} className="underline">
            {site.email}
          </a>
          .
        </p>
      )}
      <p className="mt-4 font-mono text-xs text-muted">
        Usually reply within a day, any timezone.
      </p>
    </form>
  );
}
