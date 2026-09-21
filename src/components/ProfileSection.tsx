"use client";

import CustomeText from "@/components/ui/CustomeText";
import Image from "next/image";
import dynamic from "next/dynamic";
import { cardData, profileSummary } from "@/data/data";

const GenericSlider = dynamic(
  () => import("@/components/ui/GenericSlider").then((mod) => mod.GenericSlider),
  {
    ssr: false,
    loading: () => <div className="w-full h-[320px] rounded-[24px] bg-white/10 animate-pulse" />,
  }
);

export default function ProfileSection() {
  return (
    <section id="about" className="relative flex flex-col w-full min-h-[878px] gap-16 sm:gap-[96px] items-center px-4 sm:px-6 lg:px-[71px] py-16 sm:py-[116px] bg-[#171717] rounded-[30px] sm:rounded-[50px] overflow-hidden">
      <Image
        src="/Frame 77.svg"
        alt=""
        fill
        className="object-cover absolute opacity-50"
        sizes="100vw"
      />

      <div className="w-full flex flex-col items-center gap-6 relative z-10 text-center">
        <div className="flex gap-2.5 justify-center">
          <CustomeText title="Profile" className="font-medium text-3xl sm:text-4xl lg:text-5xl text-[#FCFCFD]" />
          <CustomeText title="Summary" className="font-medium text-3xl sm:text-4xl lg:text-5xl text-[#7b7d7a]" />
        </div>
        <p className="w-full max-w-[900px] font-medium text-base sm:text-lg lg:text-[20px] text-white leading-relaxed">
          {profileSummary}
        </p>
      </div>

      <div className="relative mt-12 sm:mt-14 w-full max-w-[1299px] flex items-center justify-center">
        <GenericSlider
          data={cardData}
          slidesPerView={3}
          heightClass="h-[500px] sm:h-[550px]"
          cardType="hover"
        />
      </div>
    </section>
  );
}
