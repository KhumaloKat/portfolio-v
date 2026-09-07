"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type UIEvent,
} from "react";

type EducationMilestone = {
  year: string;
  title: string;
  institution: string;
  logo: string;
  status: string;
  skills: string[];
};

const MILESTONES: EducationMilestone[] = [
  {
    year: "2019",
    title: "National Senior Certificate",
    institution: "Ziphakamiseni Secondary School",
    logo: "/ziphakamiseni logo.png",
    status: "Completed",
    skills: ["Mathematics", "Physical Sciences", "Communication", "Analytical Thinking"],
  },
  {
    year: "2024",
    title: "Diploma in Computer Systems Engineering",
    institution: "Tshwane University of Technology",
    logo: "/TUT Logo.png",
    status: "Completed",
    skills: ["Software Engineering", "Networking", "Embedded Systems", "Systems Design"],
  },
  {
    year: "2025",
    title: "Remote Pilot Certificate (BVLOS)",
    institution: "NTSU Drone Academy",
    logo: "/Ntsu logo.png",
    status: "Completed",
    skills: ["Mission Planning", "Photogrammetry", "DJI Systems", "Pixhawk", "GIS", "BVLOS Operations"],
  },
  {
    year: "2026",
    title: "Advanced Diploma in Computer Systems Engineering",
    institution: "Tshwane University of Technology",
    logo: "/TUT Logo.png",
    status: "Completed",
    skills: ["Machine Learning", "Computer Vision", "Software Engineering", "Research", "AI"],
  },
];

const PARTICLE_LAYOUT = [
  { left: "6%", top: "12%", delay: 0.2, duration: 6.4, scale: 1 },
  { left: "15%", top: "74%", delay: 0.8, duration: 7.2, scale: 0.8 },
  { left: "26%", top: "25%", delay: 1.1, duration: 6.8, scale: 0.9 },
  { left: "36%", top: "82%", delay: 1.7, duration: 7.4, scale: 1 },
  { left: "48%", top: "16%", delay: 0.5, duration: 6.9, scale: 1.1 },
  { left: "58%", top: "66%", delay: 1.4, duration: 6.2, scale: 0.9 },
  { left: "69%", top: "21%", delay: 0.9, duration: 7.6, scale: 0.8 },
  { left: "78%", top: "78%", delay: 1.8, duration: 6.6, scale: 1.1 },
  { left: "88%", top: "34%", delay: 0.3, duration: 7.1, scale: 0.85 },
];

const CARD_TRANSITION = {
  duration: 0.42,
  ease: [0.22, 1, 0.36, 1] as const,
};

function clampIndex(index: number) {
  return Math.max(0, Math.min(index, MILESTONES.length - 1));
}

function EducationTimelineComponent() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const timelineInView = useInView(sectionRef, { amount: 0.4 });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 35%"],
  });

  const smoothedProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.35,
  });

  const timelineFillProgress = useTransform(smoothedProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const updateViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = smoothedProgress.on("change", (value) => {
      const normalized = Math.max(0, Math.min(value, 0.999));
      const nextIndex = clampIndex(Math.floor(normalized * MILESTONES.length));
      setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
    });

    return () => unsubscribe();
  }, [smoothedProgress]);

  useEffect(() => {
    if (!isMobile) {
      return;
    }

    const track = mobileTrackRef.current;
    if (!track) {
      return;
    }

    const nodeWidth = track.clientWidth * 0.58;
    const gap = 16;
    const left = activeIndex * (nodeWidth + gap);
    track.scrollTo({ left, behavior: "smooth" });
  }, [activeIndex, isMobile]);

  const activeMilestone = MILESTONES[activeIndex];

  const desktopFillScale = useMemo(() => {
    if (!timelineInView) {
      return 0;
    }
    return Math.max(activeIndex / (MILESTONES.length - 1), 0.05);
  }, [activeIndex, timelineInView]);

  const handleKeyNavigation = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setActiveIndex((prev) => clampIndex(prev + 1));
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setActiveIndex((prev) => clampIndex(prev - 1));
    }
  };

  const handleMobileScroll = (event: UIEvent<HTMLDivElement>) => {
    const track = event.currentTarget;
    const cardWidth = track.clientWidth * 0.58 + 16;
    const currentIndex = clampIndex(Math.round(track.scrollLeft / cardWidth));
    setActiveIndex((prev) => (prev === currentIndex ? prev : currentIndex));
  };

  return (
    <div
      ref={sectionRef}
      className="relative isolate w-full min-h-[100vh] overflow-hidden rounded-[32px] lg:rounded-[50px] bg-[linear-gradient(180deg,#f9fbfd_0%,#eff3f8_100%)] px-4 sm:px-6 lg:px-10 xl:px-16 py-10 md:py-14 lg:py-16"
      onKeyDown={handleKeyNavigation}
      tabIndex={0}
      role="region"
      aria-label="Education timeline"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.7),transparent_45%),radial-gradient(circle_at_85%_5%,rgba(123,125,122,0.14),transparent_42%)]" />
        {PARTICLE_LAYOUT.map((particle, index) => (
          <motion.span
            key={index}
            className="absolute block rounded-full bg-white/65 shadow-[0_0_22px_rgba(123,125,122,0.28)]"
            style={{
              left: particle.left,
              top: particle.top,
              width: `${6 * particle.scale}px`,
              height: `${6 * particle.scale}px`,
              willChange: "transform, opacity",
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.08, 0.28, 0.08],
              y: [0, -12, 0],
            }}
            transition={{
              delay: particle.delay,
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex h-full min-h-[78vh] flex-col items-center justify-between gap-8 md:gap-10">
        <header className="flex flex-col items-center gap-3 text-center pt-2">
          <p className="text-[#667085] uppercase tracking-[0.22em] text-xs sm:text-sm">Education</p>
          <h2 className="text-[#111927] text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
            My Academic Journey
          </h2>
        </header>

        <div className="w-full max-w-[1080px] flex flex-col items-center gap-7 md:gap-10">
          <div className="hidden md:flex w-full flex-col items-center gap-5">
            <div className="relative w-full max-w-[920px] px-8">
              <div className="absolute top-5 left-8 right-8 h-[2px] rounded-full bg-[#d3dce7]" />
              <motion.div
                className="absolute top-5 left-8 h-[2px] rounded-full bg-[linear-gradient(90deg,#7b7d7a_0%,#9ca7b8_100%)]"
                style={{
                  right: "auto",
                  width: `calc((100% - 4rem) * ${desktopFillScale})`,
                  scaleX: timelineFillProgress,
                  transformOrigin: "left",
                  willChange: "transform,width",
                }}
              />

              <div className="relative flex justify-between items-start">
                {MILESTONES.map((milestone, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <motion.button
                      key={milestone.year}
                      type="button"
                      className="group relative flex min-w-[96px] flex-col items-center gap-3 focus:outline-none"
                      onClick={() => setActiveIndex(index)}
                      initial={{ opacity: 0, scale: 0.5, y: 18 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.7 }}
                      transition={{ delay: index * 0.12, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      aria-label={`${milestone.year} ${milestone.title}`}
                    >
                      <motion.span
                        className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 ${
                          isActive
                            ? "border-[#7b7d7a] bg-white shadow-[0_0_0_8px_rgba(123,125,122,0.18)]"
                            : "border-[#bfc8d6] bg-white/80"
                        }`}
                        animate={{ scale: isActive ? 1.18 : 1 }}
                        transition={{ type: "spring", stiffness: 280, damping: 21, mass: 0.42 }}
                      >
                        <motion.span
                          className={`block h-3 w-3 rounded-full ${isActive ? "bg-[#7b7d7a]" : "bg-[#9aa6b2]"}`}
                          animate={{ opacity: isActive ? [0.8, 1, 0.8] : 1 }}
                          transition={{ repeat: isActive ? Infinity : 0, duration: 1.4 }}
                        />
                      </motion.span>

                      <span
                        className={`text-sm lg:text-base transition-colors duration-300 ${
                          isActive ? "font-semibold text-[#111927]" : "font-medium text-[#6b7280]"
                        }`}
                      >
                        {milestone.year}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="md:hidden w-full">
            <div
              ref={mobileTrackRef}
              onScroll={handleMobileScroll}
              className="flex gap-4 overflow-x-auto pb-2 px-1 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {MILESTONES.map((milestone, index) => {
                const isActive = index === activeIndex;

                return (
                  <motion.button
                    key={milestone.year}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`snap-center shrink-0 w-[58%] min-w-[190px] rounded-2xl border px-4 py-4 text-left transition-all duration-300 ${
                      isActive
                        ? "border-[#7b7d7a]/60 bg-white/70 shadow-[0_12px_30px_rgba(15,23,42,0.12)]"
                        : "border-white/50 bg-white/45"
                    }`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: index * 0.1, duration: 0.35 }}
                    aria-label={`${milestone.year} ${milestone.title}`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-3 w-3 rounded-full ${isActive ? "bg-[#7b7d7a] shadow-[0_0_0_6px_rgba(123,125,122,0.2)]" : "bg-[#9aa6b2]"}`}
                      />
                      <span className={`text-sm ${isActive ? "font-semibold text-[#111927]" : "font-medium text-[#667085]"}`}>
                        {milestone.year}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-[#344054] leading-snug">{milestone.title}</p>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="w-full max-w-[980px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={activeMilestone.year}
                className="relative overflow-hidden rounded-[32px] border border-white/45 bg-white/26 p-5 sm:p-7 lg:p-9 shadow-[0_26px_70px_rgba(15,23,42,0.16)] backdrop-blur-2xl"
                initial={{ opacity: 0, y: 22, filter: "blur(7px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                transition={CARD_TRANSITION}
                style={{ willChange: "transform, opacity, filter" }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_8%,rgba(255,255,255,0.58),transparent_55%),linear-gradient(120deg,rgba(255,255,255,0.08),rgba(255,255,255,0))]" />

                <div className="relative z-10 flex flex-col gap-5 md:gap-7">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <motion.div
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08, duration: 0.32 }}
                    >
                      <motion.div
                        className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-2xl border border-white/65 bg-white/75 p-2.5 shadow-[0_10px_24px_rgba(15,23,42,0.12)]"
                        animate={{ y: [0, -3, 0], opacity: [0.92, 1, 0.92] }}
                        transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
                        whileHover={{ scale: 1.06 }}
                      >
                        <Image
                          src={activeMilestone.logo}
                          alt={`${activeMilestone.institution} logo`}
                          fill
                          className="object-contain drop-shadow-[0_0_12px_rgba(123,125,122,0.42)]"
                          sizes="64px"
                        />
                      </motion.div>

                      <div className="min-w-0">
                        <h3 className="text-[#101828] text-xl sm:text-2xl lg:text-3xl font-semibold leading-tight">
                          {activeMilestone.title}
                        </h3>
                        <p className="text-[#475467] text-sm sm:text-base mt-1 truncate sm:whitespace-normal">
                          {activeMilestone.institution}
                        </p>
                      </div>
                    </motion.div>

                    <div className="flex items-center gap-3 sm:justify-end">
                      <span className="rounded-full border border-white/70 bg-white/65 px-4 py-1.5 text-sm font-medium text-[#1D2939]">
                        {activeMilestone.year}
                      </span>
                      <span
                        className={`rounded-full px-4 py-1.5 text-sm font-medium border ${
                          activeMilestone.status === "In Progress"
                            ? "bg-[#7b7d7a]/14 border-[#7b7d7a]/30 text-[#374151]"
                            : "bg-[#ecfdf3] border-[#abefc6] text-[#067647]"
                        }`}
                      >
                        {activeMilestone.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-[#344054] text-xs sm:text-sm uppercase tracking-[0.16em] mb-3">Relevant Skills</p>
                    <div className="flex flex-wrap gap-2.5">
                      {activeMilestone.skills.map((skill) => (
                        <motion.span
                          key={skill}
                          className="rounded-full border border-white/70 bg-white/62 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-[#1D2939] shadow-[0_6px_18px_rgba(15,23,42,0.08)]"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.22 }}
                          whileHover={{ y: -2 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        <p className="text-[11px] sm:text-xs tracking-[0.12em] uppercase text-[#667085] text-center md:text-left">
          Use arrow keys or tap milestones to navigate
        </p>
      </div>
    </div>
  );
}

const EducationTimeline = memo(EducationTimelineComponent);

export default EducationTimeline;
