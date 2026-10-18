import type { Metadata } from "next";
import { ProjectsPage } from "../pages/projects-page";
import { en } from "@/data/copy/en";
import { alternatesFor } from "@/lib/i18n";

export const metadata: Metadata = { title: en.projects.title, description: en.projects.description, alternates: alternatesFor("/projects", "en") };

export default function Projects() {
  return <ProjectsPage locale="en" />;
}
