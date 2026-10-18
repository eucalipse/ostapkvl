import Link from "next/link";
import { education, publications } from "@/data/cv";
import { site } from "@/data/site";
import { getCopy } from "@/data/copy";
import type { SiteLocale } from "@/data/landings";
import { richText } from "@/app/rich-text";

const linkClass = "text-accent underline decoration-line underline-offset-4 hover:decoration-accent";

/** Dates, organizations, and links stay the same in every language; titles and bodies come from the copy files. */
const timelineMeta = [
  { years: "Oct 2026 — now", org: "Mission Law", orgLinkedin: site.missionLawLinkedin },
  { years: "Sep 2025 — Aug 2026", org: "Mission Law", orgLinkedin: site.missionLawLinkedin },
  { years: "2019 — now", org: "Eucalipse", orgLinkedin: site.eucalipseLinkedin },
  { years: "2024 — 2025", org: "WithPower" },
  { years: "2015 — 2019", org: "Startupmatcher · BookBuses · Hubtraiteurs" },
  { years: "2015 — 2016", org: "Roche, Basel" },
];

export function AboutPage({ locale }: { locale: SiteLocale }) {
  const c = getCopy(locale).about;
  const links = {
    missionLaw: <a href={site.missionLawLinkedin} aria-label="Mission Law on LinkedIn" className={linkClass}>Mission Law</a>,
    eucalipse: <a href={site.eucalipseLinkedin} aria-label="Eucalipse on LinkedIn" className={linkClass}>Eucalipse</a>,
    instagram: <a href={site.instagram} className={linkClass}>@yet.another.travel</a>,
  };
  return (
    <main lang={locale} className="mx-auto max-w-prose px-6 py-16">
      <h1 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl">{c.title}</h1>
      <div className="mt-8 space-y-5 text-lg">
        {c.intro.map((paragraph, i) => <p key={i}>{richText(paragraph, links)}</p>)}
      </div>

      <section className="mt-16">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">{c.experience}</h2>
        <ol className="mt-6 divide-y divide-line border-y border-line">
          {timelineMeta.map((item, i) => (
            <li key={item.years + item.org} className="grid gap-1 py-6 sm:grid-cols-[8.5rem_1fr] sm:gap-6">
              <p className="font-mono text-xs leading-6 text-muted">{item.years}</p>
              <div>
                <h3 className="font-serif text-lg font-medium">
                  {c.timeline[i]?.title}{" "}
                  <span className="font-sans text-sm font-normal text-muted">
                    · {item.org}
                    {item.orgLinkedin && <>{" · "}<a href={item.orgLinkedin} aria-label={`${item.org} on LinkedIn`} className={linkClass}>LinkedIn</a></>}
                  </span>
                </h3>
                <p className="mt-1.5 text-sm text-muted">{c.timeline[i]?.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">{c.education}</h2>
        <ul className="mt-4 space-y-1 text-sm">{education.map((line) => <li key={line}>{line}</li>)}</ul>
        <p className="mt-3 text-sm text-muted">{c.languagesLabel}: {c.languages}.</p>
      </section>

      <section className="mt-14">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">{c.press}</h2>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {publications.map((pub) => (
            <li key={pub.title} className="py-4">
              <a href={pub.href} className="group block">
                <p className="font-serif text-base leading-snug group-hover:text-accent">{pub.title}</p>
                <p className="mt-1 font-mono text-xs text-muted">{pub.outlet}{pub.year ? ` · ${pub.year}` : ""}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">{c.beyond}</h2>
        <p className="mt-4 text-sm text-muted">{richText(c.beyondText, links)}</p>
      </section>

      <div className="mt-14">
        <Link href="/cv" hrefLang="en" className="inline-block border border-ink bg-ink px-5 py-2.5 text-sm text-paper transition-colors hover:border-accent hover:bg-accent">{c.downloadCv}</Link>
      </div>
    </main>
  );
}
