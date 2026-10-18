import type { Metadata } from "next";
import { WritingPage } from "../pages/writing-page";
import { en } from "@/data/copy/en";
import { alternatesFor } from "@/lib/i18n";

export const metadata: Metadata = { title: en.writing.title, description: en.writing.description, alternates: alternatesFor("/writing", "en") };

export default function Writing() {
  return <WritingPage locale="en" />;
}
