import { notFound } from "next/navigation";
import { landings, type LandingLocale } from "@/data/landings";

export type LocaleProps = { params: { locale: string } };

export function requireLocale(params: { locale: string }): LandingLocale {
  if (!(params.locale in landings)) notFound();
  return params.locale as LandingLocale;
}
