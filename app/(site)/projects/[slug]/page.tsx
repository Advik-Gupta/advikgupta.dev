import { notFound } from "next/navigation";
import ProjectsIndex from "@/components/projects/ProjectsIndex";
import { PROJECTS } from "@/components/projects/data";
import JsonLd from "@/components/ui/JsonLd";
import { projectGraph } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return pageMetadata({
    title: project.seoTitle,
    absoluteTitle: true,
    description: project.description,
    path: `/projects/${project.slug}`,
    image: project.socialImage,
    imageAlt: project.coverAlt,
  });
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();
  return (
    <>
      <JsonLd data={projectGraph(project)} />
      <ProjectsIndex projects={PROJECTS} initialSlug={project.slug} />
    </>
  );
}
