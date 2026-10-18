import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";
import { site } from "@/data/site";
import { Figure } from "@/app/writing/figure";
import { ArticleRail } from "@/app/writing/article-rail";
import { extractHeadings, childrenToText, makeHeadingIds } from "@/lib/headings";

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
    alternates: { canonical: `${site.url}/writing/${post.slug}` },
    robots: post.draft ? { index: false, follow: false } : undefined,
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.dek,
      images: [`${site.url}/writing/${post.slug}/opengraph-image`],
    },
    openGraph: {
      title: `${post.title} — Ostap Kovalisko`,
      description: post.dek,
      type: "article",
      images: [{ url: `${site.url}/writing/${post.slug}/opengraph-image`, width: 1200, height: 630, alt: post.title }],
      publishedTime: post.date,
      url: `${site.url}/writing/${post.slug}`,
    },
  };
}

export default function Article({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();
  const headings = extractHeadings(post.content);
  const headingId = makeHeadingIds();
  const H2 = ({ children }: { children?: React.ReactNode }) => <h2 id={headingId(childrenToText(children))} className="scroll-mt-24">{children}</h2>;
  const url = `${site.url}/writing/${post.slug}`;

  return (
    <main className="mx-auto max-w-wide px-6 py-16 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
     <ArticleRail title={post.title} headings={headings} readTime={post.readTime} url={url} markdown={post.content} />
     <div className="w-full max-w-prose">
      {post.draft && (
        <p className="mb-6 rounded border border-accent/40 px-3 py-2 font-mono text-xs text-accent">Draft -- not visible in production</p>
      )}
      <p className="font-mono text-xs text-muted">
        <Link href="/writing" className="hover:text-accent">
          Writing
        </Link>{" "}
        · {formatDate(post.date)} · {post.readTime}
        {post.category === "Consciousness & AI" && (
          <> · <Link href="/writing/category/consciousness-and-ai" className="hover:text-accent">Consciousness &amp; AI</Link></>
        )}
      </p>
      <h1 className="mt-4 font-serif text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-3 font-serif text-lg italic text-muted">{post.dek}</p>
      <ul aria-label="Article topics" className="mt-5 flex flex-wrap gap-2">
        {post.tags.map(tag => <li key={tag} className="rounded-full border border-line px-3 py-1 text-xs text-muted">{tag}</li>)}
      </ul>
      {headings.length > 0 && (
        <details className="mt-8 border border-line px-4 py-3 lg:hidden">
          <summary className="cursor-pointer font-mono text-xs uppercase tracking-widest text-muted">Contents</summary>
          <ol className="mt-3 space-y-1 text-sm">
            {headings.map((h) => <li key={h.id}><a href={`#${h.id}`} className="text-muted hover:text-accent">{h.text}</a></li>)}
          </ol>
        </details>
      )}
      <article className="article-body mt-10">
        <MDXRemote source={post.content} components={{ Figure, h2: H2 }} />
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
     </div>
    </main>
  );
}
