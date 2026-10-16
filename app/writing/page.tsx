import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

import { PostList } from "./post-list";

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
      <nav aria-label="Writing categories" className="mt-6 text-sm">
        <Link href="/writing/category/consciousness-and-ai" className="text-accent underline underline-offset-4">Consciousness &amp; AI</Link>
      </nav>
      <PostList posts={posts} />
    </main>
  );
}
