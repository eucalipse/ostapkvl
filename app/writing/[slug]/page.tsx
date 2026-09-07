import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";
import { site } from "@/data/site";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.dek,
    openGraph: {
      title: `${post.title} — Ostap Kovalisko`,
      description: post.dek,
      type: "article",
      publishedTime: post.date,
      url: `${site.url}/writing/${post.slug}`,
    },
  };
}

export default function Article({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-prose px-6 py-16">
      <p className="font-mono text-xs text-muted">
        <Link href="/writing" className="hover:text-accent">
          Writing
        </Link>{" "}
        · {formatDate(post.date)} · {post.readTime}
      </p>
      <h1 className="mt-4 font-serif text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-3 font-serif text-lg italic text-muted">{post.dek}</p>
      <article className="article-body mt-10">
        <MDXRemote source={post.content} />
      </article>
      <footer className="mt-16 border-t border-line pt-8">
        <p className="text-sm text-muted">
          <span className="font-serif text-base text-ink">
            Ostap Kovalisko
          </span>{" "}
          — Chief Architect. I build AI agents that run business operations.
          Working on something similar?{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-accent underline decoration-line underline-offset-4 hover:decoration-accent"
          >
            {site.email}
          </a>
        </p>
      </footer>
    </main>
  );
}
