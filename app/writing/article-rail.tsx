"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/headings";

type Props = { title: string; headings: Heading[]; readTime: string; url: string; markdown: string };

/** Sticky side rail for articles: section tree with the current section marked, reading progress, and share actions. */
export function ArticleRail({ title, headings, readTime, url, markdown }: Props) {
  const [active, setActive] = useState<string | null>(headings[0]?.id ?? null);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState<"url" | "markdown" | null>(null);

  useEffect(() => {
    const article = document.querySelector<HTMLElement>(".article-body");
    if (!article) return;
    const targets = headings.map((h) => document.getElementById(h.id)).filter((el): el is HTMLElement => !!el);
    let frame = 0;
    const update = () => {
      frame = 0;
      const top = article.getBoundingClientRect().top + window.scrollY;
      const height = article.offsetHeight;
      const seen = window.scrollY + window.innerHeight - top;
      setProgress(height > 0 ? Math.min(1, Math.max(0, seen / height)) : 0);
      let current: string | null = targets[0]?.id ?? null;
      for (const el of targets) if (el.getBoundingClientRect().top <= 140) current = el.id;
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [headings]);

  const copy = async (what: "url" | "markdown") => {
    try {
      await navigator.clipboard.writeText(what === "url" ? url : markdown);
      setCopied(what);
      setTimeout(() => setCopied(null), 2000);
    } catch {}
  };
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const label = "font-mono text-[0.65rem] uppercase tracking-widest text-muted";
  const item = "block py-1 text-sm leading-snug transition-colors hover:text-accent";
  const percent = Math.round(progress * 100);

  return (
    <aside aria-label="Article navigation" className="hidden lg:block lg:sticky lg:top-8 lg:self-start">
      <p className="font-serif text-base font-medium leading-snug">{title}</p>

      {headings.length > 0 && (
        <nav aria-label="Sections" className="mt-6">
          <p className={label}>Contents</p>
          <ol className="mt-2 border-l border-line">
            {headings.map((h) => {
              const isActive = h.id === active;
              return (
                <li key={h.id}>
                  <a href={`#${h.id}`} aria-current={isActive ? "true" : undefined} className={`${item} -ml-px border-l pl-3 ${isActive ? "border-accent text-ink" : "border-transparent text-muted"}`}>{h.text}</a>
                </li>
              );
            })}
          </ol>
        </nav>
      )}

      <div className="mt-6" aria-live="off">
        <div className="flex items-center gap-3">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-line" role="progressbar" aria-label="Reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
            <div className="h-full bg-accent transition-[width] duration-150" style={{ width: `${percent}%` }} />
          </div>
          <span className="font-mono text-xs tabular-nums text-muted">{percent}%</span>
        </div>
        <p className="mt-2 font-mono text-xs uppercase text-muted">{readTime}</p>
      </div>

      <div className="mt-8">
        <p className={label}>Share</p>
        <ul className="mt-2 text-sm text-muted">
          <li><a href={`https://x.com/intent/post?text=${encodedTitle}&url=${encoded}`} target="_blank" rel="noopener noreferrer" className={item}>X.com</a></li>
          <li><a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`} target="_blank" rel="noopener noreferrer" className={item}>LinkedIn</a></li>
          <li><a href={`mailto:?subject=${encodedTitle}&body=${encoded}`} className={item}>Email</a></li>
          <li><button type="button" onClick={() => copy("url")} className={`${item} text-left`}>{copied === "url" ? "Copied" : "Copy URL"}</button></li>
          <li><button type="button" onClick={() => copy("markdown")} className={`${item} text-left`}>{copied === "markdown" ? "Copied" : "Copy markdown"}</button></li>
        </ul>
      </div>
    </aside>
  );
}
