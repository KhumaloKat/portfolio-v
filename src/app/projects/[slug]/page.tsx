import { notFound } from "next/navigation";
import ProjectCaseStudyView from "@/components/ui/ProjectCaseStudyView";
import { portfolioData } from "@/data/data";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return portfolioData.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = portfolioData.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectCaseStudyView project={project} />;
}
