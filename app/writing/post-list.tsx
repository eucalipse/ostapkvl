"use client";

import { useState } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export function PostList({ posts }: { posts: PostMeta[] }) {
  const [topic, setTopic] = useState<string | null>(null);
  const topics = Array.from(new Set(posts.flatMap(post => post.tags))).sort();
  const visible = topic ? posts.filter(post => post.tags.includes(topic)) : posts;
  const buttonClass = (active: boolean) => `rounded-full border px-3 py-1.5 text-sm transition-colors ${active ? "border-accent bg-accent text-white" : "border-line text-muted hover:border-accent hover:text-accent"}`;
  return <>
    <div aria-label="Filter articles by topic" role="group" className="mt-8 flex flex-wrap gap-2">
      <button type="button" aria-pressed={topic === null} onClick={() => setTopic(null)} className={buttonClass(topic === null)}>All ({posts.length})</button>
      {topics.map(tag => <button type="button" key={tag} aria-pressed={topic === tag} onClick={() => setTopic(tag)} className={buttonClass(topic === tag)}>{tag} ({posts.filter(post => post.tags.includes(tag)).length})</button>)}
    </div>
    <p className="mt-4 text-sm text-muted" aria-live="polite">{visible.length} {visible.length === 1 ? "article" : "articles"}{topic ? ` · ${topic}` : ""}</p>
    <ol className="mt-6 divide-y divide-line border-y border-line">
      {visible.map(post => <li key={post.slug} className="py-7">
        <Link href={`/writing/${post.slug}`} className="group block">
          <p className="font-mono text-xs text-muted">{new Date(post.date + "T00:00:00Z").toLocaleDateString("en-US", {year:"numeric",month:"long",day:"numeric",timeZone:"UTC"})} · {post.readTime}{post.draft && " · Draft"}</p>
          <h2 className="mt-2 font-serif text-2xl font-medium leading-snug group-hover:text-accent">{post.title}</h2>
          <p className="mt-2 text-sm text-muted">{post.dek}</p>
        </Link>
        <div className="mt-3 flex flex-wrap gap-2" aria-label={`Topics for ${post.title}`}>
          {post.tags.map(tag => <button type="button" key={tag} onClick={() => setTopic(tag)} className="rounded-full border border-line px-2.5 py-1 text-xs text-muted hover:border-accent hover:text-accent">{tag}</button>)}
        </div>
      </li>)}
    </ol>
  </>;
}
