import type { Metadata } from "next";
import { AboutPage } from "../pages/about-page";
import { en } from "@/data/copy/en";
import { alternatesFor } from "@/lib/i18n";

export const metadata: Metadata = { title: en.about.title, description: en.about.description, alternates: alternatesFor("/about", "en") };

export default function About() {
  return <AboutPage locale="en" />;
}
