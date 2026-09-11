import { ogCard, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Ostap Kovalisko — Chief Architect";

export default function Image() {
  return ogCard({
    eyebrow: "currently: building AI agents · 57 countries and counting",
    title: "Ostap Kovalisko.",
    subline:
      "Chief Architect · I build AI agents that run business operations — multi-model consensus, approval gates, full audit trails.",
    footer: "production AI agents",
    titleSize: 96,
  });
}
