import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/data/site";
import { getCopy } from "@/data/copy";
import type { SiteLocale } from "@/data/landings";
import { localizedPath, formatDateFor } from "@/lib/i18n";
import { richText } from "@/app/rich-text";

const linkClass = "text-accent underline decoration-line underline-offset-4 hover:decoration-accent";

export function HomePage({ locale }: { locale: SiteLocale }) {
  const c = getCopy(locale).home;
  const posts = getAllPosts().slice(0, 3);
  const p = (path: string) => localizedPath(locale, path);
  const links = {
    missionLaw: <a href={site.missionLawLinkedin} aria-label="Mission Law on LinkedIn" className={linkClass}>Mission Law</a>,
    eucalipse: <Link href="/eucalipse" className={linkClass}>Eucalipse</Link>,
  };
  const nowLinks = {
    missionLaw: <a href={site.missionLawLinkedin} aria-label="Mission Law on LinkedIn" className="underline decoration-line underline-offset-4 hover:text-accent">Mission Law</a>,
    eucalipse: <Link href="/eucalipse" className="underline decoration-line underline-offset-4 hover:text-accent">Eucalipse</Link>,
  };
  const dash = c.now.indexOf(" — ");
  const nowWord = dash >= 0 ? c.now.slice(0, dash) : c.now;
  const nowRest = dash >= 0 ? c.now.slice(dash + 3) : "";
  return (
    <main lang={locale} className="mx-auto max-w-wide px-6">
      <section className="py-12 sm:py-16" data-analytics-placement="home-hero">
        <p className="font-mono text-xs text-muted"><span className="text-accent">▸</span> {c.status}</p>
        <h1 className="mt-6 font-serif text-5xl font-medium leading-[1.05] tracking-tight sm:text-7xl">Ostap Kovalisko<span className="text-accent">.</span></h1>
        <p className="mt-5 font-serif text-xl text-muted sm:text-2xl">{c.subtitle}</p>
        <p className="mt-8 max-w-prose text-lg">{richText(c.intro, links)}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href={p("/writing")} className="border border-ink bg-ink px-5 py-2.5 text-sm text-paper transition-colors hover:border-accent hover:bg-accent">{c.readWriting}</Link>
          <Link href={p("/contact")} className="border border-line px-5 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent">{c.discuss}</Link>
        </div>
      </section>

      <section className="border-t border-line py-16" data-analytics-placement="home-writing">
        <div className="flex items-baseline justify-between">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">{c.selectedWriting}</h2>
          <Link href={p("/writing")} className="text-sm text-accent hover:underline">{c.allArticles} →</Link>
        </div>
        {c.englishNote && <p className="mt-3 text-sm text-muted">{c.englishNote}</p>}
        <div className="mt-8 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/writing/${post.slug}`} hrefLang="en" className="group flex flex-col bg-paper p-6 transition-colors hover:bg-accent/5">
              <p className="font-mono text-xs text-muted">{formatDateFor(post.date, locale)} · {post.readTime}</p>
              <h3 lang="en" className="mt-3 font-serif text-xl font-medium leading-snug group-hover:text-accent">{post.title}</h3>
              <p lang="en" className="mt-2 text-sm text-muted">{post.dek}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-line py-16" data-analytics-placement="home-work">
        <div className="flex items-baseline justify-between">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">{c.selectedWork}</h2>
          <Link href={p("/projects")} className="text-sm text-accent hover:underline">{c.allProjects} →</Link>
        </div>
        <div className="mt-8 border border-line bg-paper p-8">
          <h3 className="font-serif text-2xl font-medium">{c.workTitle}</h3>
          <p className="mt-3 max-w-prose">{c.workBody}</p>
          <p className="mt-4 font-mono text-xs text-muted">TypeScript · Next.js · Postgres · Claude / GPT / Gemini · Neo4j</p>
        </div>
      </section>

      <section className="border-t border-line py-10" data-analytics-placement="home-now">
        <p className="font-mono text-xs text-muted"><span className="text-accent">{nowWord}</span> — {richText(nowRest, nowLinks)}</p>
      </section>
    </main>
  );
}
