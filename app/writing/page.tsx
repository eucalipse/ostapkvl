import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Articles on production AI agents — architecture, cost, security, and what actually breaks.",
};

export default function Writing() {
  const posts = getAllPosts();
  return (
    <main className="mx-auto max-w-prose px-6 py-16">
      <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">
        Writing
      </h1>
      <p className="mt-4 text-lg text-muted">
        Production AI agents, plus experiments in memory, presence and human–AI
        interaction.
      </p>
      <ol className="mt-12 divide-y divide-line border-y border-line">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/writing/${post.slug}`} className="group block py-7">
              <p className="font-mono text-xs text-muted">
                {formatDate(post.date)} · {post.readTime}
                {post.category === "Experiments" && " · Experiments"}
              </p>
              <h2 className="mt-2 font-serif text-2xl font-medium leading-snug group-hover:text-accent">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-muted">{post.dek}</p>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
