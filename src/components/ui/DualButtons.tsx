'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { site } from '@/data/data';
import ResumeModal from './ResumeModal';

export default function DualToggleButtons() {
  const [active, setActive] = useState<"portfolio" | "resume">("portfolio");
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const handlePortfolioClick = () => {
    setActive('portfolio');
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleResumeClick = () => {
    setActive('resume');
    setIsResumeModalOpen(true);
  };

  return (
    <>
      <div className="flex border-b-2 border-white bg-white/10 backdrop-blur-[5px] rounded-full gap-[10px] p-[10px] w-[367px] h-[82px] items-center justify-center">
        {/* Portfolio Button */}
        <button
          type="button"
          onMouseEnter={() => setActive("portfolio")}
          onClick={handlePortfolioClick}
          className={`group gpu-layer flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-[60px] transition-[transform,opacity,filter] duration-300 ease-in-out cursor-pointer
            ${
              active === "portfolio"
                ? "bg-[#7b7d7a] text-white font-medium text-[25px] w-[208px] h-[62px] border border-[#D0D5DD] shadow-md"
                : "bg-transparent text-white font-light text-[18px] w-[129px] h-[54px]"
            }`}
        >
          Portfolio
          <ArrowUpRight
            size={16}
            className={`transition-all duration-300 ${
              active === "portfolio"
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-1 group-hover:opacity-100"
            }`}
          />
        </button>

        {/* Resume Button */}
        <button
          type="button"
          onMouseEnter={() => setActive("resume")}
          onClick={handleResumeClick}
          className={`group gpu-layer flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-[60px] transition-[transform,opacity,filter] duration-300 ease-in-out cursor-pointer
            ${
              active === "resume"
                ? "bg-[#7b7d7a] text-white font-medium text-[25px] w-[208px] h-[62px] border border-[#D0D5DD] shadow-md"
                : "bg-transparent text-white font-light text-[18px] w-[129px] h-[54px]"
            }`}
        >
          Resume
          <ArrowUpRight
            size={16}
            className={`transition-all duration-300 ${
              active === "resume"
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-1 group-hover:opacity-100"
            }`}
          />
        </button>
      </div>

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        previewUrl={site.resumeUrl}
        downloadUrl={site.resumeDownloadUrl}
        openInNewTabUrl={site.resumeUrl}
        title="Khumalo Katleho Resume"
      />
    </>
  );
}
