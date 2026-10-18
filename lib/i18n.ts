import type { SiteLocale } from "@/data/landings";

export const siteLocales: SiteLocale[] = ["en", "es", "fr", "pt", "de"];

export const localeTags: Record<SiteLocale, string> = {
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
  pt: "pt-BR",
  de: "de-DE",
};

export const ogLocales: Record<SiteLocale, string> = {
  en: "en_US",
  es: "es_ES",
  fr: "fr_FR",
  pt: "pt_BR",
  de: "de_DE",
};

export const localeNames: Record<SiteLocale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  pt: "Português",
  de: "Deutsch",
};

/** "/about" for en, "/es/about" for es; "/" becomes "/es". */
export function localizedPath(locale: SiteLocale, path: string): string {
  const clean = path === "/" ? "" : path;
  return locale === "en" ? clean || "/" : `/${locale}${clean}`;
}

/** Remove a leading locale segment: "/es/about" -> "/about", "/es" -> "/". */
export function stripLocale(path: string | null): string {
  const p = path ?? "/";
  const m = p.match(/^\/(es|fr|pt|de)(?=\/|$)/);
  const rest = m ? p.slice(m[0].length) : p;
  return rest || "/";
}

/** Canonical + hreflang alternates for a page that exists in every locale. */
export function alternatesFor(path: string, current: SiteLocale) {
  const languages = Object.fromEntries(siteLocales.map((l) => [l, localizedPath(l, path)]));
  return { canonical: localizedPath(current, path), languages: { ...languages, "x-default": localizedPath("en", path) } };
}

export function formatDateFor(date: string, locale: SiteLocale): string {
  return new Date(date + "T00:00:00Z").toLocaleDateString(localeTags[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
