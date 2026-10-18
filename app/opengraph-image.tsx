import { ogCard, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Ostap Kovalisko — Chief Architect";

export default function Image() {
  return ogCard({
    eyebrow: "currently: building AI agents · 57 countries and counting",
    title: "Ostap Kovalisko.",
    subline:
      "Chief Architect · AI engineering and software architecture — typed actions, human approval, source-backed review.",
    footer: "AI systems · software architecture",
    titleSize: 96,
  });
}
