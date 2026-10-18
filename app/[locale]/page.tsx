import type { Metadata } from "next";
import { HomePage } from "../pages/home-page";
import { getCopy } from "@/data/copy";
import { alternatesFor, ogLocales } from "@/lib/i18n";
import { requireLocale, type LocaleProps } from "./locale";

export function generateMetadata({ params }: LocaleProps): Metadata {
  const locale = requireLocale(params);
  const c = getCopy(locale).home;
  return {
    title: { absolute: c.title },
    description: c.description,
    alternates: alternatesFor("/", locale),
    openGraph: { title: c.title, description: c.description, url: `/${locale}`, locale: ogLocales[locale], type: "website" },
  };
}

export default function Page({ params }: LocaleProps) {
  return <HomePage locale={requireLocale(params)} />;
}
