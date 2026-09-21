import Image from "next/image";
import Link from "next/link";
import ArrowButton from "./ArrowButton";
import { PortfolioItem } from "@/data/data";
import { memo } from "react";

interface PortfolioCardProps extends PortfolioItem {
  priority?: boolean;
}

const PortfolioCardComponent: React.FC<PortfolioCardProps> = ({ priority = false, ...project }) => {
  return (
    <Link
      href={project.href}
      data-cursor-hover="true"
      className="gpu-layer relative group text-left 
        w-full max-w-none
        h-[210px] sm:h-[230px] lg:h-[250px]
        rounded-[16px] md:rounded-[18px] 
        overflow-hidden transition-[transform,opacity,filter] duration-300 cursor-pointer 
        shadow-md"
      style={{
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(225deg, rgba(0, 0, 0, 0) 44%, rgba(0, 0, 0, 0.72) 83%, rgba(0, 0, 0, 1) 100%)",
          opacity: 0.4,
        }}
      />

      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover z-0"
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        priority={priority}
      />

      <div className="relative z-20 w-full h-full flex flex-col justify-between">
        <div className="flex justify-end p-2 md:p-3">
          <span
            className="w-[36px] h-[36px] md:w-[44px] md:h-[44px] 
            rounded-full border-2 border-[#7b7d7a] 
            group-hover:bg-[#7b7d7a] 
            flex items-center justify-center 
            transition-[transform,opacity,filter] duration-300"
          >
            <ArrowButton
              height={36}
              width={36}
              className="transition-[transform,opacity,filter] duration-300 stroke-[#7b7d7a] group-hover:stroke-white"
            />
          </span>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 
          w-[92%] mx-auto mb-3 md:mb-4 
          bg-black/40 backdrop-blur-md 
          rounded-[16px] md:rounded-[18px] 
          px-3 md:px-4 py-3 
          opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 
          transition-[transform,opacity,filter] duration-500 ease-in-out z-30
          [@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-y-0"
        >
          <h3 className="text-[16px] md:text-[20px] font-bold text-white mb-1 text-center md:text-left">
            {project.title}
          </h3>
          <p className="text-white text-xs sm:text-sm leading-relaxed text-center md:text-left line-clamp-3">
            {project.desc}
          </p>
        </div>
      </div>
    </Link>
  );
};

const PortfolioCard = memo(PortfolioCardComponent);

export default PortfolioCard;
