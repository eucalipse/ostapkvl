"use client";

import { useState } from "react";
import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import type { SiteLocale } from "@/data/landings";
import type { Copy } from "@/data/copy";
import { formatDateFor } from "@/lib/i18n";

type Labels = Copy["writing"];

export function PostList({ posts, locale = "en", labels }: { posts: PostMeta[]; locale?: SiteLocale; labels: Labels }) {
  const [topic, setTopic] = useState<string | null>(null);
  const [lang, setLang] = useState<string | null>(null);
  const topics = Array.from(new Set(posts.flatMap((post) => post.tags))).sort();
  const langs = Array.from(new Set(posts.map((post) => post.lang))).sort();
  const byLang = lang ? posts.filter((post) => post.lang === lang) : posts;
  const visible = topic ? byLang.filter((post) => post.tags.includes(topic)) : byLang;
  const langName = (code: string) => labels.languages[code] ?? code.toUpperCase();
  const buttonClass = (active: boolean) => `rounded-full border px-3 py-1.5 text-sm transition-colors ${active ? "border-accent bg-accent text-paper" : "border-line text-muted hover:border-accent hover:text-accent"}`;
  return <>
    <div aria-label={labels.languageLabel} role="group" className="mt-8 flex flex-wrap items-center gap-2">
      <span className="mr-1 font-mono text-xs uppercase tracking-wider text-muted">{labels.languageLabel}</span>
      <button type="button" aria-pressed={lang === null} onClick={() => setLang(null)} className={buttonClass(lang === null)}>{labels.all} ({posts.length})</button>
      {langs.map((code) => <button type="button" key={code} aria-pressed={lang === code} onClick={() => setLang(code)} className={buttonClass(lang === code)}>{langName(code)} ({posts.filter((post) => post.lang === code).length})</button>)}
    </div>
    <div aria-label={labels.topicsLabel} role="group" className="mt-3 flex flex-wrap gap-2">
      <button type="button" aria-pressed={topic === null} onClick={() => setTopic(null)} className={buttonClass(topic === null)}>{labels.all} ({byLang.length})</button>
      {topics.map((tag) => <button type="button" key={tag} aria-pressed={topic === tag} onClick={() => setTopic(tag)} className={buttonClass(topic === tag)}>{tag} ({byLang.filter((post) => post.tags.includes(tag)).length})</button>)}
    </div>
    <p className="mt-4 text-sm text-muted" aria-live="polite">{visible.length} {visible.length === 1 ? labels.article : labels.articles}{lang ? ` · ${langName(lang)}` : ""}{topic ? ` · ${topic}` : ""}</p>
    <ol className="mt-6 divide-y divide-line border-y border-line">
      {visible.map((post) => <li key={post.slug} className="py-7">
        <Link href={`/writing/${post.slug}`} hrefLang={post.lang} className="group block">
          <p className="font-mono text-xs text-muted">{formatDateFor(post.date, locale)} · {post.readTime}{post.draft && ` · ${labels.draft}`}</p>
          <h2 lang={post.lang} className="mt-2 font-serif text-2xl font-medium leading-snug group-hover:text-accent">{post.title}</h2>
          <p lang={post.lang} className="mt-2 text-sm text-muted">{post.dek}</p>
        </Link>
        <div className="mt-3 flex flex-wrap gap-2" aria-label={`${labels.topicsFor} ${post.title}`}>
          {post.tags.map((tag) => <button type="button" key={tag} onClick={() => setTopic(tag)} className="rounded-full border border-line px-2.5 py-1 text-xs text-muted hover:border-accent hover:text-accent">{tag}</button>)}
        </div>
      </li>)}
    </ol>
  </>;
}
