"use client";

import Navbar from "@/components/Navbar";
import CustomeText from "@/components/ui/CustomeText";
import DualToggleButtons from "@/components/ui/DualButtons";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
// import { Star } from "lucide-react";
// import OrangeButton from "@/components/ui/OrangeButton";
// import ArrowButton from "@/components/ui/ArrowButton";
import { experiences, buttons, skills, portfolioData, cardData } from '../data/data';
import ClientOnly from "@/components/ui/ClientOnly";
import MotionSection from "@/components/ui/MotionSection";
import useIsTouchDevice from "@/components/ui/useIsTouchDevice";
import ProfessionTypewriter from "@/components/ui/ProfessionTypewriter";
import EducationTimeline from "@/components/ui/EducationTimeline";

const GenericSlider = dynamic(
  () => import("@/components/ui/GenericSlider").then((mod) => mod.GenericSlider),
  {
    ssr: false,
    loading: () => <div className="w-full h-[320px] rounded-[24px] bg-white/10 animate-pulse" />,
  }
);

const PortfolioCard = dynamic(() => import("@/components/ui/PortfolioCard"), {
  ssr: false,
  loading: () => <div className="h-[300px] w-full rounded-[20px] bg-[#f2f4f7] animate-pulse" />,
});

export default function Home() {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const isTouchDevice = useIsTouchDevice();
  const [isPortraitHover, setIsPortraitHover] = useState(false);
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -140]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0.12]);
  const heroVisualY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -70]);
  const heroVisualScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.08]);

  const frameX = useSpring(0, { stiffness: 170, damping: 20, mass: 0.75 });
  const frameY = useSpring(0, { stiffness: 170, damping: 20, mass: 0.75 });
  const frameRotateX = useSpring(0, { stiffness: 160, damping: 18, mass: 0.7 });
  const frameRotateY = useSpring(0, { stiffness: 160, damping: 18, mass: 0.7 });
  const frameScaleBoost = useSpring(1, { stiffness: 220, damping: 20, mass: 0.65 });

  const portraitX = useSpring(0, { stiffness: 170, damping: 20, mass: 0.75 });
  const portraitY = useSpring(0, { stiffness: 170, damping: 20, mass: 0.75 });
  const portraitRotateX = useSpring(0, { stiffness: 160, damping: 18, mass: 0.7 });
  const portraitRotateY = useSpring(0, { stiffness: 160, damping: 18, mass: 0.7 });
  const portraitScaleBoost = useSpring(1, { stiffness: 220, damping: 20, mass: 0.65 });

  const atmosphereX = useSpring(0, { stiffness: 90, damping: 18, mass: 0.8 });
  const atmosphereY = useSpring(0, { stiffness: 90, damping: 18, mass: 0.8 });
  const frameGlowStrength = useSpring(0.28, { stiffness: 120, damping: 22, mass: 0.8 });
  const portraitGlowStrength = useSpring(0.28, { stiffness: 120, damping: 22, mass: 0.8 });
  const portraitGlowScale = useTransform(portraitGlowStrength, [0.28, 1], [1, 1.1]);
  const frameFilter = useTransform(frameGlowStrength, [0.28, 1], [
    "drop-shadow(0 0 8px rgba(123,125,122,0.25))",
    "drop-shadow(0 0 22px rgba(123,125,122,0.52))",
  ]);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const node = frameRef.current;
      if (!node) {
        return;
      }

      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const distance = Math.hypot(dx, dy);
      const radius = Math.max(260, Math.max(rect.width, rect.height) * 0.9);
      const proximity = Math.max(0, Math.min(1, 1 - distance / radius));

      if (proximity <= 0) {
        frameX.set(0);
        frameY.set(0);
        frameRotateX.set(0);
        frameRotateY.set(0);
        atmosphereX.set(0);
        atmosphereY.set(0);
        frameGlowStrength.set(0.28);
        return;
      }

      const safeDistance = distance < 0.0001 ? 1 : distance;
      const pull = isPortraitHover ? 16 : 12;
      const tilt = isPortraitHover ? 3 : 2.4;

      frameX.set(Math.max(-16, Math.min(16, (dx / safeDistance) * pull * proximity)));
      frameY.set(Math.max(-16, Math.min(16, (dy / safeDistance) * pull * proximity)));
      frameRotateY.set(Math.max(-3, Math.min(3, (dx / safeDistance) * tilt * proximity * 1.8)));
      frameRotateX.set(Math.max(-3, Math.min(3, (-dy / safeDistance) * tilt * proximity * 1.8)));
      atmosphereX.set(Math.max(-10, Math.min(10, (dx / safeDistance) * 8 * proximity)));
      atmosphereY.set(Math.max(-8, Math.min(8, (dy / safeDistance) * 6 * proximity)));
      frameGlowStrength.set(Math.max(0.28, Math.min(1, 0.28 + proximity * 0.56 + (isPortraitHover ? 0.16 : 0))));

      const portraitNode = portraitRef.current;
      if (!portraitNode) {
        return;
      }

      const portraitRect = portraitNode.getBoundingClientRect();
      const px = portraitRect.left + portraitRect.width / 2;
      const py = portraitRect.top + portraitRect.height / 2;
      const pdx = event.clientX - px;
      const pdy = event.clientY - py;
      const pdistance = Math.hypot(pdx, pdy);
      const pradius = Math.max(300, Math.max(portraitRect.width, portraitRect.height) * 1.35);
      const pproximity = Math.max(0, Math.min(1, 1 - pdistance / pradius));

      if (pproximity <= 0) {
        portraitX.set(0);
        portraitY.set(0);
        portraitRotateX.set(0);
        portraitRotateY.set(0);
        portraitGlowStrength.set(isPortraitHover ? 0.72 : 0.28);
        return;
      }

      const psafeDistance = pdistance < 0.0001 ? 1 : pdistance;
      const ppull = isPortraitHover ? 12 : 10;

      portraitX.set(Math.max(-12, Math.min(12, (pdx / psafeDistance) * ppull * pproximity)));
      portraitY.set(Math.max(-12, Math.min(12, (pdy / psafeDistance) * ppull * pproximity)));
      portraitRotateY.set(Math.max(-3, Math.min(3, (pdx / psafeDistance) * 2.3 * pproximity)));
      portraitRotateX.set(Math.max(-3, Math.min(3, (-pdy / psafeDistance) * 2.3 * pproximity)));
      portraitGlowStrength.set(Math.max(0.28, Math.min(1, 0.28 + pproximity * 0.56 + (isPortraitHover ? 0.16 : 0))));
    };

    const handlePointerLeave = () => {
      frameX.set(0);
      frameY.set(0);
      frameRotateX.set(0);
      frameRotateY.set(0);
      atmosphereX.set(0);
      atmosphereY.set(0);
      frameGlowStrength.set(0.28);
      portraitX.set(0);
      portraitY.set(0);
      portraitRotateX.set(0);
      portraitRotateY.set(0);
      portraitGlowStrength.set(0.28);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [
    atmosphereX,
    atmosphereY,
    frameGlowStrength,
    frameRotateX,
    frameRotateY,
    frameX,
    frameY,
    isPortraitHover,
    portraitGlowStrength,
    portraitRotateX,
    portraitRotateY,
    portraitX,
    portraitY,
    reduceMotion,
  ]);

  useEffect(() => {
    frameScaleBoost.set(isPortraitHover ? 1.02 : 1);
    portraitScaleBoost.set(isPortraitHover ? 1.02 : 1);
    if (!isPortraitHover) {
      return;
    }

    frameGlowStrength.set(0.72);
    portraitGlowStrength.set(0.72);
  }, [frameGlowStrength, frameScaleBoost, isPortraitHover, portraitGlowStrength, portraitScaleBoost]);

  return (
    <div id="home" className="relative w-full bg-white flex flex-col items-center justify-start overflow-x-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="hero-cinematic-shell w-full h-screen flex flex-col items-center px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 lg:pt-10 overflow-hidden"
      >
        <Navbar />

        <div className="group w-full flex-1 flex items-stretch justify-center">
          <div className="relative w-full max-w-[952px] h-full flex flex-col items-center justify-between pt-6 sm:pt-8 md:pt-10 pb-0">
            <div className="hero-bg-grid" aria-hidden="true" />
            <div className="hero-ambient hero-ambient-left" aria-hidden="true" />
            <div className="hero-ambient hero-ambient-right" aria-hidden="true" />

            <motion.div
              className="flex w-full max-w-[952px] flex-col items-center justify-center translate-y-[56px] transition-all duration-500 ease-out group-hover:translate-y-0 group-active:translate-y-0 px-4 sm:px-6"
              style={{ y: heroTextY, opacity: heroTextOpacity }}
            >
            

            {/* Main heading */}
            <motion.div
              className="flex flex-col sm:flex-row sm:gap-2 items-center sm:items-end mb-1 mt-6 sm:mt-8"
              initial={reduceMotion ? false : { opacity: 0, y: 26 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <CustomeText 
                title="I&apos;m" 
                className="text-[#171717] font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl" 
              />
              <div className="flex items-end">
                <CustomeText 
                  title="Khumalo Katleho" 
                  className="text-[#7b7d7a] font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl" 
                />
                <CustomeText 
                  title="," 
                  className="text-[#171717] font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl" 
                />
              </div>
            </motion.div>
            
            {/* Subtitle */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProfessionTypewriter
                className="text-[#171717] font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center"
              />
            </motion.div>
            
            {/* Contact info */}
            <motion.p
              className="mt-6 text-[#344054] text-sm sm:text-base text-center max-w-2xl"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              Gauteng, Pretoria, Soshanguve L | (+27) 64 162 2166 | khumalosiya2001@gmail.com
            </motion.p>
            <motion.p
              className="mt-3 text-[#667085] text-xs sm:text-sm text-center tracking-[0.08em] uppercase"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              Linkedin | Github
            </motion.p>
            </motion.div>

            <motion.div
              className="relative w-full max-w-[952px] flex-1 min-h-[260px] sm:min-h-[320px] md:min-h-[360px] flex flex-col items-center justify-end mx-auto px-4"
              style={{ y: heroVisualY, scale: heroVisualScale, perspective: 1400 }}
            >
              <motion.div
                className="pointer-events-none absolute inset-0 z-0 flex items-end justify-center"
                style={{ x: atmosphereX, y: atmosphereY }}
                aria-hidden="true"
              >
                <div className="hero-portrait-atmosphere">
                  <div className="hero-portrait-aura hero-portrait-aura-main" />
                  <div className="hero-portrait-aura hero-portrait-aura-secondary" />
                  <div className="hero-portrait-streak" />
                </div>
              </motion.div>

              <div className="absolute bottom-0 z-0 w-[90%] max-w-[812px] aspect-[2/1] overflow-hidden flex items-center justify-center pointer-events-auto">
                <div className="absolute w-full h-full bg-[#7b7d7a] rounded-t-full" />
              </div>

              <motion.div
                ref={frameRef}
                onMouseEnter={() => setIsPortraitHover(true)}
                onMouseLeave={() => setIsPortraitHover(false)}
                className={`absolute z-10 w-full hero-frame-breathe transition-[transform,opacity,filter] duration-500 ease-in-out ${
                  isTouchDevice
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-105 group-active:opacity-100 group-active:scale-105"
                }`}
                style={{
                  x: frameX,
                  y: frameY,
                  rotateX: frameRotateX,
                  rotateY: frameRotateY,
                  scale: frameScaleBoost,
                  transformStyle: "preserve-3d",
                  filter: frameFilter,
                  ...(isTouchDevice
                    ? {
                        animation: "hero-mobile-float 5.6s ease-in-out infinite",
                        willChange: "transform, opacity",
                        transform: "translate3d(0, 0, 0)",
                        backfaceVisibility: "hidden",
                      }
                    : {}),
                }}
              >
                <Image
                  src="/Frame 68.png"
                  alt="Frame Decoration"
                  width={917}
                  height={688}
                  className="object-contain w-full h-auto"
                  priority
                />
              </motion.div>

              <motion.div
                ref={portraitRef}
                data-hero-portrait="true"
                onMouseEnter={() => setIsPortraitHover(true)}
                onMouseLeave={() => setIsPortraitHover(false)}
                className="relative z-20 w-full h-auto max-h-[52vh]"
                style={{
                  x: portraitX,
                  y: portraitY,
                  rotateX: portraitRotateX,
                  rotateY: portraitRotateY,
                  scale: portraitScaleBoost,
                  transformStyle: "preserve-3d",
                }}
              >
                <motion.div
                  className="pointer-events-none absolute -inset-4 z-10 rounded-[999px] hero-portrait-glow"
                  style={{ opacity: portraitGlowStrength, scale: portraitGlowScale }}
                  aria-hidden="true"
                />
                <div className="relative z-20 hero-portrait-breathe">
                  <Image
                    src="/p8.png"
                    alt="abhiruchi"
                    width={952}
                    height={636}
                    className="w-full h-auto max-h-[52vh] object-contain"
                    priority
                  />
                </div>
              </motion.div>

              <div className="absolute bottom-2 sm:bottom-4 z-30 w-full hidden md:flex justify-center">
                <DualToggleButtons />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="about" className="relative flex flex-col w-full min-h-[878px] gap-16 sm:gap-[96px] items-center px-4 sm:px-6 lg:px-[71px] py-16 sm:py-[116px] bg-[#171717] rounded-[30px] sm:rounded-[50px] overflow-hidden">
        <Image
          src="/Frame 77.svg"
          alt="image"
          fill
          className="object-cover absolute opacity-50"
        />

        <div className="w-full flex flex-col items-center gap-6 relative z-10 text-center">
          <div className="flex gap-2.5 justify-center">
            <CustomeText title="Profile" className="font-medium text-3xl sm:text-4xl lg:text-5xl text-[#FCFCFD]" />
            <CustomeText title="Summary" className="font-medium text-3xl sm:text-4xl lg:text-5xl text-[#7b7d7a]" />
          </div>
          <p className="w-full max-w-[900px] font-medium text-base sm:text-lg lg:text-[20px] text-white leading-relaxed">
            I am a Computer Systems Engineering graduate from Pretoria, South Africa, with an Advanced Diploma in Computer Systems Engineering. I am passionate about developing innovative, user-focused solutions that address real-world challenges. My interests span software development, computer vision, machine learning, web development, and intelligent systems, where I enjoy transforming ideas into reliable and impactful applications.
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

      {/* Work Experience */}
      <MotionSection id="experience" className="section-shell w-full min-h-screen flex flex-col items-start justify-center mx-auto px-4 sm:px-6 lg:px-[71px] py-8 lg:py-16 bg-white">
        <div className="w-full h-auto lg:h-[234px] flex lg:flex-row items-start justify-center space-x-2.5 mb-8 lg:mb-16 text-center lg:text-left">
          <CustomeText title="My" className="font-medium text-4xl sm:text-5xl lg:text-6xl text-[#344054]" />
          <CustomeText title="Work" className="font-medium text-4xl sm:text-5xl lg:text-6xl text-[#7b7d7a]" />
          <CustomeText title="Experience" className="font-medium text-4xl sm:text-5xl lg:text-6xl text-[#7b7d7a]" />
        </div>

        <div className="w-full lg:hidden">
          {experiences.map((exp, index) => (
            <div key={index} className="mb-8 last:mb-0">
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0 mt-2">
                  <div className="w-6 h-6 rounded-full border-2 border-dashed border-[#1D2939] bg-white" />
                  <div className={`absolute top-1 left-1 w-4 h-4 rounded-full ${exp.dotColor}`} />
                </div>

                <div className="flex-1">
                  <CustomeText title={exp.company} className="font-semibold text-[#1D2939] text-[20px] sm:text-[24px] mb-1" />
                  <CustomeText title={exp.duration} className="text-[#98A2B3] text-[14px] sm:text-[16px] mb-2" />
                  <CustomeText title={exp.role} className="font-semibold text-[#1D2939] text-[18px] sm:text-[20px] mb-2" />
                  {exp.desc && (
                    <ul className="mt-2 space-y-1.5">
                      {exp.desc.map((item, itemIndex) => (
                        <li key={itemIndex} className="ml-4 list-disc text-[#98A2B3] text-[12px] sm:text-[14px] leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full h-auto lg:h-[438px] hidden lg:flex justify-evenly">
          <div className="flex flex-col justify-between w-[495px] h-[438px] gap-[102px]">
            {experiences.map((exp, index) => (
              <div key={index} className="flex flex-col gap-[14px]">
                <CustomeText title={exp.company} className="font-semibold text-[#1D2939] text-[40px]" />
                <CustomeText title={exp.duration} className="text-2xl text-[#98A2B3]" />
              </div>
            ))}
          </div>

          <div className="relative flex flex-col items-center justify-between">
            <div className="absolute top-0 bottom-0 w-[2px] border-l-2 border-dashed border-[#1D2939]" />
            {experiences.map((exp, index) => (
              <div key={index} className="relative flex items-center justify-center w-12 h-12">
                <div className="absolute w-12 h-12 rounded-full border-2 border-dashed border-[#1D2939] bg-white" />
                <div className={`w-9 h-9 rounded-full z-10 ${exp.dotColor}`} />
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-between w-[444px] h-[400px] gap-[48px]">
            {experiences.map((exp, index) => (
              <div key={index} className="flex flex-col gap-[14px]">
                <CustomeText title={exp.role} className="font-semibold text-[#1D2939] text-[40px]" />
                {exp.desc && (
                  <ul className="space-y-2">
                    {exp.desc.map((item, itemIndex) => (
                      <li key={itemIndex} className="ml-5 list-disc text-[16px] lg:text-[18px] text-[#98A2B3] leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* Education */}
      <MotionSection id="education" className="section-shell relative w-full min-h-screen bg-transparent">
        <EducationTimeline />
      </MotionSection>

      {/* Portfolio */}
      <MotionSection id="portfolio" className="section-shell w-full min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-[71px] py-12 sm:py-20 gap-10 lg:gap-12">
        <div className="w-full flex flex-col sm:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex flex-col items-start max-w-full lg:max-w-[643px]">
            <CustomeText
              title="Portfolio"
              className="font-semibold text-[32px] sm:text-[48px] lg:text-[64px] text-[#344054]"
            />
          </div>

          <div className="shrink-0">
            <button
              type="button"
              onClick={() => setShowAllProjects((prev) => !prev)}
              className="inline-flex items-center justify-center px-8 py-4 rounded-[24px] bg-[#7b7d7a] text-white text-[18px] sm:text-[20px] font-semibold transition-all duration-300 hover:bg-[#7b7d7a]"
            >
              {showAllProjects ? "Show Less" : "See All"}
            </button>
          </div>
        </div>

        <div className="w-full flex flex-col items-center gap-10 lg:gap-12 max-w-[1290px]">
          {showAllProjects ? (
            <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {portfolioData.map((project, index) => (
                <PortfolioCard key={project.title} {...project} priority={index === 0} />
              ))}
            </div>
          ) : (
            <GenericSlider
              data={portfolioData}
              slidesPerView={2}
              heightClass="h-auto"
              cardType="portfolio"
            />
          )}

          <div className="w-full max-w-[947px] flex flex-wrap justify-center gap-4 sm:gap-[14px] items-center">
            <ClientOnly>
              {buttons.map((text, index) => (
                <button
                  key={index}
                  className="px-6 sm:px-8 py-3 rounded-[24px] bg-[#F2F4F7] text-[#000000] text-[16px] sm:text-[18px] lg:text-[20px] hover:bg-[#7b7d7a] hover:text-white transition-colors duration-300"
                >
                  {text}
                </button>
              ))}
            </ClientOnly>
          </div>

        </div>
      </MotionSection>

      {/* Skills Slider */}
      <div className="relative w-full h-[147px] bg-[#0f1115] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-80 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.16),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(123,125,122,0.35),transparent_45%)]" />
        <div className="absolute w-[5000px] h-[63px] bg-white -rotate-2 -mt-2 md:mt-0 md:-rotate-[1.9deg] z-10 -ml-2 flex items-center">
          <div className="marquee flex gap-10 w-max">
            {[...skills, ...skills].map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-4 text-[#000000] text-[48px] whitespace-nowrap leading-none"
              >
                <span className="inline-flex w-[34px] h-[34px] items-center justify-center shrink-0">
                  <Image
                    src="/drone 4.png"
                    alt="Drone icon"
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
    </div>
  );
}
