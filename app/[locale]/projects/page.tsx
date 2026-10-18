import type { Metadata } from "next";
import { ProjectsPage } from "../../pages/projects-page";
import { getCopy } from "@/data/copy";
import { alternatesFor, ogLocales } from "@/lib/i18n";
import { requireLocale, type LocaleProps } from "../locale";

export function generateMetadata({ params }: LocaleProps): Metadata {
  const locale = requireLocale(params);
  const c = getCopy(locale).projects;
  return { title: c.title, description: c.description, alternates: alternatesFor("/projects", locale), openGraph: { locale: ogLocales[locale] } };
}

export default function Page({ params }: LocaleProps) {
  return <ProjectsPage locale={requireLocale(params)} />;
}
