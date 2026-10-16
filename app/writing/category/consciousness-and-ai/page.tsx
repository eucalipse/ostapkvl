import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Consciousness & AI",
  description: "Research and experiments in AI memory, continuity, introspection, and consciousness: what we can observe and what remains uncertain.",
  alternates: { canonical: "/writing/category/consciousness-and-ai" },
};

export default function ConsciousnessAndAI() {
  const posts = getAllPosts().filter(post => post.category === "Consciousness & AI");
  return (
    <main className="mx-auto max-w-prose px-6 py-16">
      <Link href="/writing" className="font-mono text-xs text-muted hover:text-accent">All writing</Link>
      <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight">Consciousness &amp; AI</h1>
      <p className="mt-4 text-lg text-muted">Memory, continuity, introspection, and the question of subjective experience. Research and experiments, with a clear distinction between what we observe and what we infer.</p>
      {posts.length ? (
        <ol className="mt-12 divide-y divide-line border-y border-line">
          {posts.map(post => (
            <li key={post.slug}>
              <Link href={`/writing/${post.slug}`} className="group block py-7">
                <p className="font-mono text-xs text-muted">{formatDate(post.date)} · {post.readTime}{post.draft && " · Draft"}</p>
                <h2 className="mt-2 font-serif text-2xl font-medium group-hover:text-accent">{post.title}</h2>
                <p className="mt-2 text-sm text-muted">{post.dek}</p>
              </Link>
            </li>
          ))}
        </ol>
      ) : <p className="mt-10 text-muted">The first essay is in preparation.</p>}
    </main>
  );
}
