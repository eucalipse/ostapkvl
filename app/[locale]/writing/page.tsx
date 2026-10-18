import type { Metadata } from "next";
import { WritingPage } from "../../pages/writing-page";
import { getCopy } from "@/data/copy";
import { alternatesFor, ogLocales } from "@/lib/i18n";
import { requireLocale, type LocaleProps } from "../locale";

export function generateMetadata({ params }: LocaleProps): Metadata {
  const locale = requireLocale(params);
  const c = getCopy(locale).writing;
  return { title: c.title, description: c.description, alternates: alternatesFor("/writing", locale), openGraph: { locale: ogLocales[locale] } };
}

export default function Page({ params }: LocaleProps) {
  return <WritingPage locale={requireLocale(params)} />;
}
