import type { SiteLocale } from "@/data/landings";
import type { Copy } from "./types";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { pt } from "./pt";
import { de } from "./de";

export type { Copy, ProjectCopy, ArchiveCopy } from "./types";

export const copy: Record<SiteLocale, Copy> = { en, es, fr, pt, de };

export function getCopy(locale: SiteLocale): Copy {
  return copy[locale] ?? en;
}
