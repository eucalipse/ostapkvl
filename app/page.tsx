import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);
  return (
    <main className="mx-auto max-w-wide px-6">
      {/* Hero */}
      <section className="py-20 sm:py-28">
        <p className="font-mono text-xs text-muted">
          <span className="text-accent">▸</span> currently: building AI agents ·
          57 countries and counting
        </p>
        <h1 className="mt-6 font-serif text-5xl font-medium leading-[1.05] tracking-tight sm:text-7xl">
          Ostap Kovalisko<span className="text-accent">.</span>
        </h1>
        <p className="mt-5 font-serif text-xl text-muted sm:text-2xl">
          Chief Architect · I build AI agents that run business operations.
        </p>
        <p className="mt-8 max-w-prose text-lg">
          I build production AI agent platforms end-to-end — multi-model
          consensus, approval gates, full audit trails — currently as Chief
          Architect at a US professional-services firm. Before that: founder or
          CTO of three startups (one acquired) and founder of a software agency
          that has shipped 50+ projects since 2019.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/writing"
            className="border border-ink bg-ink px-5 py-2.5 text-sm text-paper transition-colors hover:border-accent hover:bg-accent"
          >
            Read the writing
          </Link>
          <Link
            href="/contact"
            className="border border-line px-5 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent"
          >
            Work with me
          </Link>
        </div>
      </section>

      {/* Selected writing */}
      <section className="border-t border-line py-16">
        <div className="flex items-baseline justify-between">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">
            Selected writing
          </h2>
          <Link href="/writing" className="text-sm text-accent hover:underline">
            All articles →
          </Link>
        </div>
        <div className="mt-8 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/writing/${post.slug}`}
              className="group flex flex-col bg-paper p-6 transition-colors hover:bg-[#F3EFE8]"
            >
              <p className="font-mono text-xs text-muted">
                {formatDate(post.date)} · {post.readTime}
              </p>
              <h3 className="mt-3 font-serif text-xl font-medium leading-snug group-hover:text-accent">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{post.dek}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Now strip */}
      <section className="border-t border-line py-10">
        <p className="font-mono text-xs text-muted">
          <span className="text-accent">now</span> — Chief Architect @ a US firm
          · Founder @ <a href="https://eucalipse.com" className="underline decoration-line underline-offset-4 hover:text-accent">Eucalipse</a> · writing
          about AI agents in production
        </p>
      </section>
    </main>
  );
}
