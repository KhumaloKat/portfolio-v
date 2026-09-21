import Hero from "@/components/Hero";
import ProfileSection from "@/components/ProfileSection";
import ExperienceSection from "@/components/ExperienceSection";
import PortfolioSection from "@/components/PortfolioSection";
import SkillsMarquee from "@/components/SkillsMarquee";
import MotionSection from "@/components/ui/MotionSection";
import EducationTimeline from "@/components/ui/EducationTimeline";

export default function Home() {
  return (
    <div id="home" className="relative w-full bg-white flex flex-col items-center justify-start overflow-x-hidden">
      <Hero />
      <ProfileSection />

      <MotionSection id="experience" className="relative z-10 w-full min-h-0 flex flex-col items-start justify-start mx-auto px-4 sm:px-6 lg:px-[71px] pt-16 pb-24 lg:pt-24 lg:pb-32 bg-white">
        <ExperienceSection />
      </MotionSection>

      <MotionSection id="education" className="relative z-0 w-full min-h-0 bg-transparent px-4 sm:px-6 lg:px-8 pb-10">
        <EducationTimeline />
      </MotionSection>

      <MotionSection id="portfolio" className="section-shell w-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-[71px] py-12 sm:py-20 gap-10 lg:gap-12">
        <PortfolioSection />
      </MotionSection>

      <SkillsMarquee />
    </div>
  );
}
