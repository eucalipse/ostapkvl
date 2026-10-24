import Link from "next/link";
import { getLanding, type SiteLocale } from "@/data/landings";
import { site } from "@/data/site";
import { ContactForm } from "./contact/contact-form";

// Leads for team-size projects are passed to the studio site, tagged so the referral is measurable.
const studioLeadUrl = `${site.eucalipse}?utm_source=ostapkvl&utm_medium=referral&utm_campaign=contact`;

export function LocalizedLanding({ locale }: { locale: SiteLocale }) {
 const c = getLanding(locale);
 return <main lang={locale} className="mx-auto max-w-wide px-6 pb-16" data-analytics-placement={`landing-${locale}`}>
  <section className="py-12 sm:py-16">
   <p className="font-mono text-xs text-accent">Ostap Kovalisko · Chief Architect at Mission Law</p>
   <h1 className="mt-5 max-w-prose font-serif text-4xl leading-tight sm:text-5xl">{c.title}</h1>
   <p className="mt-6 max-w-prose text-lg text-muted">{c.intro}</p>
   <p className="mt-4 max-w-prose text-sm text-muted">{c.availability}</p>
   <a href="#contact" className="mt-7 inline-block border border-ink bg-ink px-5 py-3 text-sm text-paper hover:border-accent hover:bg-accent">{c.cta}</a>
  </section>
  <section className="my-2 border border-line p-6 sm:p-8">
   <p className="max-w-prose">{c.studioNote}</p>
   <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm">
    <a href={studioLeadUrl} className="text-accent hover:underline">{c.studioCta} →</a>
    <Link href="/eucalipse" hrefLang="en" className="text-muted hover:text-accent">ostapkvl.com/eucalipse</Link>
   </p>
  </section>
  <section className="my-10 border border-line p-6 sm:p-8"><p className="text-sm text-muted">{c.reading}</p><h2 className="mt-3 font-serif text-2xl">{c.article}</h2><p className="mt-3 max-w-prose">{c.articleText}</p><Link href="/writing/human-attention-is-the-bottleneck" hrefLang="en" className="mt-4 inline-block text-accent hover:underline">{c.english} →</Link></section>
  <section id="contact" className="scroll-mt-8 border-t border-line pt-12"><h2 className="font-serif text-3xl">{c.contact}</h2><p className="mt-4 max-w-prose text-muted">{c.contactText}</p><p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm"><a href={`mailto:${site.email}`} className="text-accent hover:underline">{site.email}</a><a href={site.linkedin} className="text-accent hover:underline">LinkedIn →</a></p><ContactForm locale={locale} /></section>
 </main>;
}
