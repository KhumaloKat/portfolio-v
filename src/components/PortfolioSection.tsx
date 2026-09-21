"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import CustomeText from "@/components/ui/CustomeText";
import { buttons, portfolioData } from "@/data/data";

const GenericSlider = dynamic(
  () => import("@/components/ui/GenericSlider").then((mod) => mod.GenericSlider),
  {
    ssr: false,
    loading: () => <div className="w-full h-[320px] rounded-[24px] bg-[#f2f4f7] animate-pulse" />,
  }
);

const PortfolioCard = dynamic(() => import("@/components/ui/PortfolioCard"), {
  ssr: false,
  loading: () => <div className="h-[250px] w-full rounded-[18px] bg-[#f2f4f7] animate-pulse" />,
});

const ALL_FILTER = "All";

export default function PortfolioSection() {
  const [showAllProjects, setShowAllProjects] = useState(true);
  const [activeFilter, setActiveFilter] = useState(ALL_FILTER);

  const filteredProjects = useMemo(() => {
    if (activeFilter === ALL_FILTER) {
      return portfolioData;
    }

    return portfolioData.filter((project) => project.categories.includes(activeFilter));
  }, [activeFilter]);

  const showGrid = showAllProjects || activeFilter !== ALL_FILTER;

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row justify-between items-start lg:items-center gap-6">
        <div className="flex flex-col items-start max-w-full lg:max-w-[643px]">
          <CustomeText
            title="Portfolio"
            className="font-semibold text-[32px] sm:text-[48px] lg:text-[64px] text-[#344054]"
          />
        </div>

        {activeFilter === ALL_FILTER ? (
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => setShowAllProjects((prev) => !prev)}
              className="inline-flex items-center justify-center px-8 py-4 rounded-[24px] bg-[#7b7d7a] text-white text-[18px] sm:text-[20px] font-semibold transition-all duration-300 hover:bg-[#7b7d7a]"
            >
              {showAllProjects ? "Show Less" : "See All"}
            </button>
          </div>
        ) : null}
      </div>

      <div className="w-full flex flex-col items-center gap-10 lg:gap-12">
        {filteredProjects.length === 0 ? (
          <p className="text-[#667085] text-base sm:text-lg text-center">
            No projects in this category yet.
          </p>
        ) : showGrid ? (
          <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {filteredProjects.map((project, index) => (
              <PortfolioCard key={project.slug} {...project} priority={index === 0} />
            ))}
          </div>
        ) : (
          <GenericSlider
            data={filteredProjects}
            slidesPerView={3}
            heightClass="h-auto"
            cardType="portfolio"
          />
        )}

        <div className="w-full max-w-[947px] flex flex-wrap justify-center gap-4 sm:gap-[14px] items-center">
          {[ALL_FILTER, ...buttons].map((text) => {
            const isActive = activeFilter === text;

            return (
              <button
                key={text}
                type="button"
                aria-pressed={isActive}
                onClick={() => {
                  setActiveFilter(text);
                }}
                className={`px-6 sm:px-8 py-3 rounded-[24px] text-[16px] sm:text-[18px] lg:text-[20px] transition-colors duration-300 ${
                  isActive
                    ? "bg-[#7b7d7a] text-white"
                    : "bg-[#F2F4F7] text-[#000000] hover:bg-[#7b7d7a] hover:text-white"
                }`}
              >
                {text}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
