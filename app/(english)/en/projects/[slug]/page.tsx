import { notFound } from "next/navigation";
import { ProjectDetail, caseStudyMetadata } from "@/components/project-detail";
import { caseStudies, findCaseStudy } from "@/lib/project-details";

export const dynamicParams = false;
export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const project = findCaseStudy((await params).slug);
  if (!project) notFound();
  return caseStudyMetadata(project, "en");
}
export default async function Page({ params }: Props) {
  const project = findCaseStudy((await params).slug);
  if (!project) notFound();
  return <ProjectDetail project={project} locale="en" />;
}
