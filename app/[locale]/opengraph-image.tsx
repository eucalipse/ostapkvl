import { ogCard, ogSize } from "@/lib/og";
import { getCopy } from "@/data/copy";
import { requireLocale, type LocaleProps } from "./locale";

export const size = ogSize;
export const contentType = "image/png";

export default function Image({ params }: LocaleProps) {
  const c = getCopy(requireLocale(params)).home;
  return ogCard({ eyebrow: c.status, title: "Ostap Kovalisko.", subline: c.subtitle, footer: "ostapkvl.com", titleSize: 96 });
}
