import Image from "next/image";
import { skills } from "@/data/data";

export default function SkillsMarquee() {
  return (
    <div className="relative w-full h-[147px] bg-[#0f1115] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-80 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.16),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(123,125,122,0.35),transparent_45%)]" />
      <div className="absolute w-[5000px] h-[63px] bg-white -rotate-2 -mt-2 md:mt-0 md:-rotate-[1.9deg] z-10 -ml-2 flex items-center">
        <div className="marquee flex gap-10 w-max">
          {[...skills, ...skills].map((skill, index) => (
            <div
              key={`${skill}-${index}`}
              className="flex items-center gap-4 text-[#000000] text-[48px] whitespace-nowrap leading-none"
            >
              <span className="inline-flex w-[34px] h-[34px] items-center justify-center shrink-0">
                <Image
                  src="/drone 4.png"
                  alt=""
                  width={34}
                  height={34}
                  className="object-contain"
                />
              </span>
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
