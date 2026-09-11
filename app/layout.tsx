import type { Metadata } from "next";
import { Newsreader, Source_Sans_3, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import { site } from "@/data/site";
import "./globals.css";

const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s — Ostap Kovalisko",
  },
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: "Ostap Kovalisko",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    types: { "application/rss+xml": "/feed.xml" },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ostap Kovalisko",
  jobTitle: "Chief Architect",
  url: site.url,
  email: site.email,
  sameAs: [site.github, site.linkedin, site.instagram, site.eucalipse],
  knowsAbout: [
    "AI agents",
    "Large language models",
    "Software architecture",
    "Multi-agent systems",
  ],
};

const nav = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/contact", label: "Contact" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <header className="no-print border-b border-line">
          <div className="mx-auto flex max-w-wide items-baseline justify-between px-6 py-5">
            <Link
              href="/"
              className="font-serif text-lg font-medium tracking-tight hover:text-accent"
            >
              Ostap Kovalisko
            </Link>
            <nav className="flex gap-5 text-sm sm:gap-7">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        {children}
        <footer className="no-print mt-24 border-t border-line">
          <div className="mx-auto flex max-w-wide flex-col gap-3 px-6 py-8 text-sm text-muted sm:flex-row sm:items-baseline sm:justify-between">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a href={`mailto:${site.email}`} className="hover:text-accent">
                {site.email}
              </a>
              <a href={site.github} className="hover:text-accent">
                GitHub
              </a>
              <a href={site.linkedin} className="hover:text-accent">
                LinkedIn
              </a>
              <a href={site.instagram} className="hover:text-accent">
                Instagram
              </a>
            </div>
            <p className="font-mono text-xs">© 2026 Ostap Kovalisko</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
