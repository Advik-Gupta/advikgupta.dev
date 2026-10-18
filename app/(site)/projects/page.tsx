import ProjectsIndex from "@/components/projects/ProjectsIndex";
import { PROJECTS } from "@/components/projects/data";
import JsonLd from "@/components/ui/JsonLd";
import { projectsGraph } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Projects by Advik Gupta: Papers by CodeChef-VIT with 2M+ visits, the Mikon training app and Blast Radius, a hackathon-winning codebase explorer.",
  path: "/projects",
  image: PROJECTS[0].socialImage,
  imageAlt: PROJECTS[0].coverAlt,
});

export default function Page() {
  return (
    <>
      <JsonLd data={projectsGraph(PROJECTS)} />
      <ProjectsIndex projects={PROJECTS} />
    </>
  );
}
