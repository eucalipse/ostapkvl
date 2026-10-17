import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";
import { Figure } from "@/app/writing/figure";
type Props = { params: { slug: string } };
export const dynamicParams = false;
export function generateStaticParams() { return getAllPosts(true).filter(p => p.draft).map(p => ({ slug: p.slug })); }
export function generateMetadata({params}: Props): Metadata {
 const post = getPost(params.slug, true);
 return {title: post?.draft ? `Draft: ${post.title}` : "Draft not found", robots: {index: false, follow: false}, alternates: {canonical: `/drafts/${params.slug}`}};
}
export default function Draft({params}: Props) {
 const post = getPost(params.slug, true);
 if (!post?.draft) notFound();
 return <main className="mx-auto max-w-prose px-6 py-16">
 <Link href="/drafts" className="text-sm text-accent">← All drafts</Link>
 <p className="mt-6 rounded border border-accent/40 px-3 py-2 text-sm text-accent">Draft preview · Work in progress · Unlisted, not private</p>
 <p className="mt-6 font-mono text-xs text-muted">{formatDate(post.date)} · {post.readTime}</p>
 <h1 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">{post.title}</h1>
 <p className="mt-3 font-serif text-lg italic text-muted">{post.dek}</p>
 <article className="article-body mt-10"><MDXRemote source={post.content} components={{Figure}} /></article>
 </main>;
}
