import type { Metadata } from "next";
import { OSTAVIO_MAGIC_LINK } from "@/data/ostavio-shell";

// Unlisted: noindex, not in the sitemap, not in the navigation.
// Generic text only -- the data itself lives behind the sign-in in Ostavio.
export const metadata: Metadata = {
  title: "Ostavio on my own context",
  description: "A private Ostavio instance running on my own context. Sign-in required.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  // Override the site-wide share text so this page stays generic.
  openGraph: {
    title: "Ostavio on my own context",
    description: "A private Ostavio instance running on my own context. Sign-in required.",
    url: "/ostavioShell",
  },
  twitter: {
    title: "Ostavio on my own context",
    description: "A private Ostavio instance running on my own context. Sign-in required.",
  },
};

const NAV = [
  { icon: "◎", label: "Context", active: true },
  { icon: "▤", label: "Projects" },
  { icon: "◈", label: "Products" },
  { icon: "✎", label: "Articles" },
  { icon: "◐", label: "CV" },
];

const SOURCES = ["ostapkvl.com", "local repos", "notes"];

const LINES: { kind: "cmd" | "out" | "ok" | "muted"; text: string }[] = [
  { kind: "cmd", text: "ostavio status" },
  { kind: "out", text: "Ostavio is running on my own context." },
  { kind: "muted", text: "Same daemon, same rules: it proposes, I decide." },
  { kind: "cmd", text: "ostavio context --list" },
  { kind: "ok", text: "projects    the work I build and run" },
  { kind: "ok", text: "products    my own products and their sites" },
  { kind: "ok", text: "cv          my public CV" },
  { kind: "ok", text: "articles    what I publish, with dates and links" },
  { kind: "ok", text: "signals     deploys, traffic and backlinks, where connected" },
  { kind: "cmd", text: "ostavio open" },
  { kind: "out", text: "Private workspace. Sign-in required." },
];

const prefix = { cmd: "$", out: "›", ok: "✓", muted: " " } as const;

export default function OstavioShellPage() {
  return (
    <main className="mx-auto max-w-wide px-4 py-10 sm:px-6 sm:py-14">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">Ostavio · private instance</p>
      <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
        Ostavio, running on my own context<span className="text-accent">.</span>
      </h1>
      <p className="mt-4 max-w-prose text-muted">
        I build Ostavio, a personal AI daemon. This is my own instance of it: it knows my projects, my products, my
        public CV and my articles, so I can ask it about my work instead of searching for it.
      </p>

      <div className="mt-10 overflow-hidden rounded-xl border border-line bg-paper shadow-[0_1px_0_rgb(var(--line))]">
        <div className="flex min-h-[420px]">
          {/* sidebar (hidden on phones) */}
          <aside className="hidden w-48 shrink-0 flex-col border-r border-line bg-ink/[0.03] sm:flex">
            <div className="flex items-center gap-2.5 px-4 pb-4 pt-5">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-accent/60 font-mono text-sm font-medium text-accent">
                O
              </span>
              <span>
                <span className="block text-sm font-semibold leading-tight">Ostavio</span>
                <span className="block font-mono text-[9px] uppercase tracking-[0.15em] text-muted">Personal daemon</span>
              </span>
            </div>
            <nav aria-label="Ostavio sections (preview)" className="flex-1 px-2">
              {NAV.map((n) => (
                <div
                  key={n.label}
                  className={`mb-px flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] ${
                    n.active ? "bg-ink/[0.06] font-semibold text-ink" : "text-muted"
                  }`}
                >
                  <span className={`w-3.5 text-center text-[11px] ${n.active ? "text-accent" : ""}`}>{n.icon}</span>
                  {n.label}
                </div>
              ))}
              <p className="px-2.5 pb-1.5 pt-4 font-mono text-[9px] uppercase tracking-[0.15em] text-muted">Sources</p>
              {SOURCES.map((s) => (
                <div key={s} className="flex items-center gap-2 px-2.5 py-1">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                  <span className="font-mono text-[11px] text-muted">{s}</span>
                </div>
              ))}
            </nav>
            <div className="flex items-center gap-2.5 border-t border-line px-4 py-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line font-mono text-[10px] font-medium text-muted">
                OK
              </span>
              <span>
                <span className="block text-xs font-semibold">Ostap Kovalisko</span>
                <span className="block font-mono text-[9px] uppercase tracking-wider text-muted">Owner</span>
              </span>
            </div>
          </aside>

          {/* main */}
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-center gap-3 border-b border-line px-4 py-2.5 sm:px-5">
              <span className="font-mono text-[11px] text-muted">
                Ostavio / <b className="font-medium text-ink">Context</b>
              </span>
              <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                Private
              </span>
            </div>

            <div
              className="flex-1 bg-[#16181b] px-4 py-5 font-mono text-[12.5px] leading-7 text-[#e7e3dc] sm:px-6 sm:text-[13px]"
              role="log"
              aria-label="Ostavio terminal preview"
            >
              {LINES.map((l, i) => (
                <div
                  key={i}
                  className={`flex gap-3 whitespace-pre-wrap ${l.kind === "cmd" && i > 0 ? "mt-3" : ""}`}
                >
                  <span className={`w-3 shrink-0 select-none ${l.kind === "ok" ? "text-[#8fd19e]" : l.kind === "cmd" ? "text-[#9fb4f5]" : "text-[#8a857d]"}`}>
                    {prefix[l.kind]}
                  </span>
                  <span className={l.kind === "cmd" ? "text-[#9fb4f5]" : l.kind === "muted" ? "text-[#8a857d]" : ""}>
                    {l.text}
                  </span>
                </div>
              ))}
              <div className="mt-3 flex gap-3">
                <span className="w-3 shrink-0 text-[#9fb4f5]">$</span>
                <span className="inline-block h-4 w-2 translate-y-1.5 animate-pulse bg-[#9fb4f5]" aria-hidden />
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-line px-4 py-4 sm:flex-row sm:items-center sm:px-5">
              <a
                href={OSTAVIO_MAGIC_LINK}
                rel="nofollow noopener"
                className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-paper transition-opacity hover:opacity-90"
                data-analytics-placement="ostavio-shell-open"
              >
                Open my Ostavio →
              </a>
              <span className="font-mono text-[11px] text-muted">Sign-in required. Nothing here is public.</span>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 max-w-prose text-sm text-muted">
        Ostavio itself is at{" "}
        <a href="https://ostavio.com" className="text-accent underline decoration-line underline-offset-4 hover:decoration-accent">
          ostavio.com
        </a>
        .
      </p>
    </main>
  );
}
