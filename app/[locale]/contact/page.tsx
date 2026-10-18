import type { Metadata } from "next";
import { LocalizedLanding } from "../../localized-landing";
import { landings } from "@/data/landings";
import { alternatesFor, ogLocales } from "@/lib/i18n";
import { requireLocale, type LocaleProps } from "../locale";

export function generateMetadata({ params }: LocaleProps): Metadata {
  const locale = requireLocale(params);
  const c = landings[locale];
  return {
    title: c.title,
    description: c.description,
    alternates: alternatesFor("/contact", locale),
    openGraph: { title: c.title, description: c.description, url: `/${locale}/contact`, locale: ogLocales[locale], type: "website", images: [{ url: `/${locale}/contact/opengraph-image`, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: c.title, description: c.description, images: [`/${locale}/contact/opengraph-image`] },
  };
}

export default function Page({ params }: LocaleProps) {
  return <LocalizedLanding locale={requireLocale(params)} />;
}
