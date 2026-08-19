"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { PortfolioItem } from "@/data/data";

type ProjectCaseStudyViewProps = {
  project: PortfolioItem;
};

export default function ProjectCaseStudyView({ project }: ProjectCaseStudyViewProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#1B1B1B] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.14),transparent_30%),radial-gradient(circle_at_82%_0%,rgba(255,255,255,0.08),transparent_24%),linear-gradient(180deg,#222222_0%,#1f1f1f_42%,#1B1B1B_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_40%),linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.22)_72%,rgba(0,0,0,0.34)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),transparent)]" />

      <main className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-col gap-10 px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-24 lg:pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between gap-4"
        >
          <Link href="/#portfolio" className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/8 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-xl">
            <ArrowLeft size={16} />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex flex-wrap gap-2">
            {project.githubUrl ? (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/8 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-xl">
                <Github size={16} />
                <span>GitHub</span>
              </a>
            ) : null}
            {project.liveDemoUrl ? (
              <a href={project.liveDemoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/8 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-xl">
                <ExternalLink size={16} />
                <span>Live Demo</span>
              </a>
            ) : null}
          </div>
        </motion.div>

        <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[34px] border border-white/16 bg-white/8 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:p-6 lg:p-7"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.18),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent)]" />
            <div className="relative z-10 flex flex-col gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-white/58">Case Study</p>
                <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                  {project.title}
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/72 sm:text-base">
                  {project.overview}
                </p>
              </div>

              <div className="relative overflow-hidden rounded-[28px] border border-white/12 bg-black/28">
                {project.heroVideo ? (
                  <iframe
                    src={project.heroVideo}
                    title={`${project.title} video`}
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                    className="h-[300px] w-full border-0 sm:h-[380px] lg:h-[520px]"
                  />
                ) : null}
              </div>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            <div className="rounded-[30px] border border-white/16 bg-white/8 p-5 backdrop-blur-2xl sm:p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/58">Technologies</p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {project.technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="rounded-full border border-white/18 bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white/90"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.03 * index, duration: 0.25 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-white/16 bg-white/8 p-5 backdrop-blur-2xl sm:p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/58">Key Features</p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/82 sm:text-base">
                {project.keyFeatures.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#c9d3e0] shadow-[0_0_14px_rgba(201,211,224,0.65)]" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[30px] border border-white/16 bg-white/8 p-5 backdrop-blur-2xl sm:p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-white/58">Workflow</p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/82 sm:text-base">
                {project.implementation.map((step) => (
                  <li key={step.heading} className="flex gap-3">
                    <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#b6f0d1] shadow-[0_0_14px_rgba(182,240,209,0.6)]" />
                    <span>
                      <span className="font-semibold text-white">{step.heading}:</span> {step.body}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>
        </section>

        <section className="rounded-[34px] border border-white/14 bg-white/7 p-5 backdrop-blur-2xl sm:p-6 lg:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-white/58">Screenshots</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {project.gallery.map((item, index) => (
              <motion.div
                key={`${project.slug}-gallery-${item}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 * index }}
                className="relative aspect-[1.25/1] overflow-hidden rounded-[26px] border border-white/14 bg-black/20"
              >
                <Image
                  src={item}
                  alt={`${project.title} screenshot ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
