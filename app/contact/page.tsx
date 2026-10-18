import type { Metadata } from "next";
import { LocalizedLanding } from "../localized-landing";
import { landingEn } from "@/data/landings";
import { alternatesFor } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Contact",
  description: landingEn.description,
  alternates: alternatesFor("/contact", "en"),
};

export default function Contact() {
  return <LocalizedLanding locale="en" />;
}
