import { pageMetadata } from "@/lib/seo";
import ProjectsIndex from "@/components/projects/ProjectsIndex";
import { PROJECTS, UPCOMING } from "@/components/projects/data";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Projects by Advik Gupta: platforms, tools and experiments built with Go, Next.js and PostgreSQL, including Papers by CodeChef-VIT with 2M+ visits.",
  path: "/projects",
});

export default function Page() {
  return <ProjectsIndex projects={PROJECTS} upcoming={UPCOMING} />;
}
