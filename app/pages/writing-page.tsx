import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { getCopy } from "@/data/copy";
import type { SiteLocale } from "@/data/landings";
import { PostList } from "@/app/writing/post-list";

export function WritingPage({ locale }: { locale: SiteLocale }) {
  const c = getCopy(locale).writing;
  const posts = getAllPosts();
  return (
    <main lang={locale} className="mx-auto max-w-prose px-6 py-16">
      <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">{c.title}</h1>
      <p className="mt-4 text-lg text-muted">{c.intro}</p>
      {c.englishNote && <p className="mt-3 text-sm text-muted">{c.englishNote}</p>}
      <nav aria-label={c.categoriesLabel} className="mt-6 text-sm">
        <Link href="/writing/category/consciousness-and-ai" hrefLang="en" className="text-accent underline underline-offset-4">{c.category}{locale !== "en" ? " (EN)" : ""}</Link>
      </nav>
      <PostList posts={posts} locale={locale} labels={c} />
    </main>
  );
}
