"use client";

import { motion, useSpring } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type CursorMode = "default" | "hover" | "portrait";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], [data-cursor-hover], [data-hero-portrait]";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function PremiumCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [pressed, setPressed] = useState(false);

  const innerX = useSpring(0, { stiffness: 620, damping: 46, mass: 0.35 });
  const innerY = useSpring(0, { stiffness: 620, damping: 46, mass: 0.35 });
  const outerX = useSpring(0, { stiffness: 220, damping: 28, mass: 0.7 });
  const outerY = useSpring(0, { stiffness: 220, damping: 28, mass: 0.7 });
  const cursorOpacity = useSpring(0, { stiffness: 240, damping: 28, mass: 0.7 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateEnabled = () => {
      const canUseCursor = mediaQuery.matches;
      setEnabled(canUseCursor);
      document.documentElement.classList.toggle("has-premium-cursor", canUseCursor);
    };

    updateEnabled();
    mediaQuery.addEventListener("change", updateEnabled);

    return () => {
      document.documentElement.classList.remove("has-premium-cursor");
      mediaQuery.removeEventListener("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleMove = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;

      innerX.set(x);
      innerY.set(y);
      outerX.set(x);
      outerY.set(y);
      cursorOpacity.set(1);

      if (!visible) {
        setVisible(true);
      }

      const target = event.target as HTMLElement | null;
      if (!target) {
        setMode("default");
        return;
      }

      if (target.closest("[data-hero-portrait]")) {
        setMode("portrait");
        return;
      }

      if (target.closest(INTERACTIVE_SELECTOR)) {
        setMode("hover");
        return;
      }

      setMode("default");
    };

    const handleMouseDown = () => setPressed(true);
    const handleMouseUp = () => setPressed(false);
    const handleMouseLeave = () => {
      setVisible(false);
      cursorOpacity.set(0);
      setPressed(false);
    };
    const handleMouseEnter = () => {
      cursorOpacity.set(1);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorOpacity, enabled, innerX, innerY, outerX, outerY, visible]);

  const cursorState = useMemo(() => {
    const base = {
      outerOpacity: 0.34,
      innerScale: 1,
      outerScale: 1,
    };

    if (mode === "hover") {
      return {
        outerOpacity: 0.44,
        innerScale: 1.16,
        outerScale: 1.12,
      };
    }

    if (mode === "portrait") {
      return {
        outerOpacity: 0.5,
        innerScale: 1.22,
        outerScale: 1.2,
      };
    }

    return base;
  }, [mode]);

  if (!enabled) {
    return null;
  }

  const pressScale = pressed ? 0.9 : 1;
  const innerScale = clamp(cursorState.innerScale * pressScale, 0.85, 1.26);
  const outerScale = clamp(cursorState.outerScale * (pressed ? 0.94 : 1), 0.9, 1.22);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border border-white/70 bg-[#2b3138]/55 backdrop-blur-lg"
        style={{
          x: innerX,
          y: innerY,
          opacity: visible ? cursorOpacity : 0,
          width: 20,
          height: 20,
          translateX: "-50%",
          translateY: "-50%",
          scale: innerScale,
          boxShadow: "inset 0 1px 5px rgba(255,255,255,0.18), 0 0 16px rgba(255,255,255,0.24)",
          willChange: "transform, opacity",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9997] rounded-full border border-[#353d45]/80 bg-[#161c23]/32"
        style={{
          x: outerX,
          y: outerY,
          opacity: visible ? cursorState.outerOpacity : 0,
          width: 44,
          height: 44,
          translateX: "-50%",
          translateY: "-50%",
          scale: outerScale,
          willChange: "transform, opacity",
        }}
      />
    </>
  );
}
