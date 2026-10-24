import { ogCard, ogSize } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Eucalipse — the independent software studio founded by Ostap Kovalisko";

export default function Image() {
  return ogCard({
    eyebrow: "the studio · founded 2019 · 50+ projects shipped",
    title: "Eucalipse.",
    subline:
      "An independent software studio with its own team. Ostap sets direction and reviews architecture; the studio builds.",
    footer: "AI systems · software architecture",
    titleSize: 96,
  });
}
