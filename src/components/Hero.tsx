"use client";

import Navbar from "@/components/Navbar";
import CustomeText from "@/components/ui/CustomeText";
import DualToggleButtons from "@/components/ui/DualButtons";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { site } from "@/data/data";
import useIsTouchDevice from "@/components/ui/useIsTouchDevice";
import ProfessionTypewriter from "@/components/ui/ProfessionTypewriter";

export default function Hero() {
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
                  title={site.name}
                  className="text-[#7b7d7a] font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                />
                <CustomeText
                  title=","
                  className="text-[#171717] font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                />
              </div>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProfessionTypewriter
                className="text-[#171717] font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center"
              />
            </motion.div>

            <motion.p
              className="mt-6 text-[#344054] text-sm sm:text-base text-center max-w-2xl"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {site.location} |{" "}
              <a href={site.phoneHref} className="underline-offset-4 hover:underline">
                {site.phoneDisplay}
              </a>{" "}
              |{" "}
              <a href={`mailto:${site.email}`} className="underline-offset-4 hover:underline">
                {site.email}
              </a>
            </motion.p>
            <motion.p
              className="mt-3 text-[#667085] text-xs sm:text-sm text-center tracking-[0.08em] uppercase"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                className="underline-offset-4 hover:underline"
              >
                LinkedIn
              </a>
              {" | "}
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="underline-offset-4 hover:underline"
              >
                GitHub
              </a>
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
                alt=""
                width={917}
                height={688}
                className="object-contain w-full h-auto"
                sizes="(max-width: 952px) 90vw, 917px"
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
                  alt={site.name}
                  width={952}
                  height={636}
                  className="w-full h-auto max-h-[52vh] object-contain"
                  sizes="(max-width: 952px) 90vw, 952px"
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
  );
}
