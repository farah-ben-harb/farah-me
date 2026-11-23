import type { Metadata } from "next";
import { ProjectsPage } from "@/components/projects-page";

export const metadata: Metadata = { title: "Projects | Farah Ben Harb", alternates: { canonical: "/en/projects", languages: { fr: "/projects", en: "/en/projects" } } };
export default function Projects() { return <ProjectsPage locale="en" />; }
