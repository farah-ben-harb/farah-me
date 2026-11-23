import type { Metadata } from "next";
import { ProjectsPage } from "@/components/projects-page";

export const metadata: Metadata = { title: "Projets | Farah Ben Harb", alternates: { canonical: "/projects", languages: { fr: "/projects", en: "/en/projects" } } };
export default function Projects() { return <ProjectsPage locale="fr" />; }
