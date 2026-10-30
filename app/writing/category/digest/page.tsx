import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Digest",
  description: "Short notes on AI agent tools and ideas spotted on LinkedIn, GitHub and elsewhere, with a design angle rather than a product review.",
  alternates: { canonical: "/writing/category/digest" },
};

export default function Digest() {
  const posts = getAllPosts().filter(post => post.category === "Digest");
  return (
    <main className="mx-auto max-w-prose px-6 py-16">
      <Link href="/writing" className="font-mono text-xs text-muted hover:text-accent">All writing</Link>
      <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight">Digest</h1>
      <p className="mt-4 text-lg text-muted">Tools and ideas I come across on LinkedIn, GitHub and elsewhere. Each note names what the tool does, a similar or competing tool for context, and the design question it raises for my own work, not a product review.</p>
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
      ) : <p className="mt-10 text-muted">The first note is in preparation.</p>}
    </main>
  );
}
