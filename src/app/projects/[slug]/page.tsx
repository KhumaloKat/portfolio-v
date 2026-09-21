import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectCaseStudyView from "@/components/ui/ProjectCaseStudyView";
import { getProjectBySlug, portfolioData, site } from "@/data/data";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return portfolioData.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  return {
    title: project.title,
    description: project.overview,
    openGraph: {
      title: `${project.title} | ${site.name}`,
      description: project.overview,
      images: [{ url: project.image, alt: project.title }],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectCaseStudyView project={project} />;
}
