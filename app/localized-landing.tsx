import Link from "next/link";
import { landings, type LandingLocale } from "@/data/landings";
import { ContactForm } from "./contact/contact-form";

export function LocalizedLanding({ locale }: { locale: LandingLocale }) {
 const c = landings[locale];
 return <main lang={locale} className="mx-auto max-w-wide px-6 pb-16" data-analytics-placement={`landing-${locale}`}>
  <section className="py-12 sm:py-16">
   <p className="font-mono text-xs text-accent">Ostap Kovalisko · Chief Architect · Eucalipse</p>
   <h1 className="mt-5 max-w-prose font-serif text-4xl leading-tight sm:text-5xl">{c.title}</h1>
   <p className="mt-6 max-w-prose text-lg text-muted">{c.intro}</p>
   <a href="#contact" className="mt-7 inline-block border border-ink bg-ink px-5 py-3 text-sm text-paper hover:border-accent hover:bg-accent">{c.cta}</a>
  </section>
  <section className="border-t border-line py-12">
   <h2 className="font-serif text-3xl">{c.services}</h2>
   <div className="mt-8 grid gap-6 sm:grid-cols-3">{c.items.map(([title,body],i)=><article key={title} className="border-t border-accent/40 pt-5"><span className="font-mono text-xs text-accent">0{i+1}</span><h3 className="mt-3 font-serif text-2xl">{title}</h3><p className="mt-3 text-muted">{body}</p></article>)}</div>
  </section>
  <section className="max-w-prose py-8"><h2 className="font-serif text-3xl">{c.process}</h2><p className="mt-4">{c.processText}</p><p className="mt-4 text-sm text-muted">{c.availability}</p></section>
  <section className="my-10 border border-line p-6 sm:p-8"><p className="text-sm text-muted">{c.reading}</p><h2 className="mt-3 font-serif text-2xl">{c.article}</h2><p className="mt-3 max-w-prose">{c.articleText}</p><Link href="/writing/human-attention-is-the-bottleneck" hrefLang="en" className="mt-4 inline-block text-accent hover:underline">{c.english} →</Link></section>
  <section id="contact" className="scroll-mt-8 border-t border-line pt-12"><h2 className="font-serif text-3xl">{c.contact}</h2><p className="mt-4 max-w-prose text-muted">{c.contactText}</p><ContactForm locale={locale} /></section>
 </main>;
}
