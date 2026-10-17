"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
export function SiteNavigation() {
 const path=usePathname();const locale=path==="/es"?"es":path==="/fr"?"fr":"en";
 const items=locale==="es"?[["#contact","Contacto"],["/projects","Proyectos (EN)"],["/writing","Artículos (EN)"]]:locale==="fr"?[["#contact","Contact"],["/projects","Projets (EN)"],["/writing","Articles (EN)"]]:[["/about","About"],["/projects","Projects"],["/writing","Writing"],["/contact","Contact"]];
 return <nav lang={locale} aria-label={locale==="es"?"Navegación principal":locale==="fr"?"Navigation principale":"Main navigation"} className="flex flex-wrap items-center gap-3 text-sm sm:gap-5">
  {items.map(([href,label])=><Link key={href} href={href} className="text-muted transition-colors hover:text-accent">{label}</Link>)}
  <span className="flex gap-2 border-l border-line pl-3">{([["en","/","EN"],["es","/es","ES"],["fr","/fr","FR"]] as const).map(([lang,href,label])=><Link key={lang} href={href} hrefLang={lang} lang={lang} aria-label={{en:"English",es:"Español",fr:"Français"}[lang]} aria-current={locale===lang?"true":undefined} className={`font-mono text-xs ${locale===lang?"text-accent":"text-muted hover:text-accent"}`}>{label}</Link>)}</span>
  <ThemeToggle locale={locale} />
 </nav>;
}
