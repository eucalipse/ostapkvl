import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";
export const metadata: Metadata = { title: "Draft previews", robots: { index: false, follow: false } };
export default function Drafts() {
 const posts = getAllPosts(true).filter(p => p.draft);
 return <main className="mx-auto max-w-prose px-6 py-16">
 <p className="font-mono text-xs text-accent">UNLISTED · WORK IN PROGRESS</p>
 <h1 className="mt-4 font-serif text-4xl">Draft previews</h1>
 <p className="mt-4 text-muted">Articles for review. These are excluded from the public article list and sitemap. Anyone with a link can read them.</p>
 <ul className="mt-10 space-y-8">{posts.map(p => <li key={p.slug} className="border-t border-line pt-6"><p className="text-xs text-muted">Draft · {formatDate(p.date)}</p><Link href={`/drafts/${p.slug}`} className="mt-2 block font-serif text-2xl hover:text-accent">{p.title}</Link><p className="mt-2 text-muted">{p.dek}</p></li>)}</ul>
 {posts.length === 0 && <p className="mt-8 text-muted">No drafts to review.</p>}
 </main>;
}
