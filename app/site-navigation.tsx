"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { localeFromPath, type SiteLocale } from "@/data/landings";
import { copy } from "@/data/copy";
import { siteLocales, localeNames, localizedPath, stripLocale } from "@/lib/i18n";

/** Same page in another language; article and CV pages only exist in English, so they fall back to the writing list or home. */
function switchPath(base: string, target: SiteLocale): string {
  if (target === "en") return base;
  if (base.startsWith("/writing/")) return localizedPath(target, "/writing");
  if (base === "/cv") return localizedPath(target, "/");
  return localizedPath(target, base);
}

export function SiteNavigation() {
  const path = usePathname();
  const locale = localeFromPath(path);
  const base = stripLocale(path);
  const nav = copy[locale].nav;
  const items = [["/about", nav.about], ["/projects", nav.projects], ["/writing", nav.writing], ["/contact", nav.contact]] as const;
  return <nav lang={locale} aria-label={nav.label} className="flex flex-wrap items-center gap-3 text-sm sm:gap-5">
    {items.map(([href, label]) => <Link key={href} href={localizedPath(locale, href)} className="text-muted transition-colors hover:text-accent">{label}</Link>)}
    <span className="flex gap-2 border-l border-line pl-3">{siteLocales.map((lang) => <Link key={lang} href={switchPath(base, lang)} hrefLang={lang} lang={lang} aria-label={localeNames[lang]} aria-current={locale === lang ? "true" : undefined} className={`font-mono text-xs ${locale === lang ? "text-accent" : "text-muted hover:text-accent"}`}>{lang.toUpperCase()}</Link>)}</span>
    <ThemeToggle locale={locale} />
  </nav>;
}
