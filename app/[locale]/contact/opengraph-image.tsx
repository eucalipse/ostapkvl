import { ogCard, ogSize } from "@/lib/og";
import { landings } from "@/data/landings";
import { requireLocale, type LocaleProps } from "../locale";

export const size = ogSize;
export const contentType = "image/png";

export default function Image({ params }: LocaleProps) {
  const c = landings[requireLocale(params)];
  return ogCard({ eyebrow: "Ostap Kovalisko", title: c.title, subline: c.description, footer: "ostapkvl.com", titleSize: 66 });
}
