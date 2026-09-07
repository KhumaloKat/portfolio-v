"use client";

import { motion, useSpring } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";

type TechItem = {
  name: string;
  badge: string;
  xPct: number;
  yPct: number;
  duration: number;
  delay: number;
};

const TECH_ITEMS: TechItem[] = [
  { name: "Python", badge: "PY", xPct: 15, yPct: 18, duration: 5.3, delay: 0.2 },
  { name: "Java", badge: "JV", xPct: 34, yPct: 13, duration: 5.7, delay: 0.8 },
  { name: "JavaScript", badge: "JS", xPct: 53, yPct: 11, duration: 6.1, delay: 0.35 },
  { name: "React", badge: "RE", xPct: 70, yPct: 14, duration: 5.8, delay: 1.05 },
  { name: "Node.js", badge: "ND", xPct: 84, yPct: 24, duration: 6.4, delay: 0.55 },
  { name: "HTML5", badge: "H5", xPct: 87, yPct: 40, duration: 5.5, delay: 1.3 },
  { name: "CSS3", badge: "C3", xPct: 84, yPct: 56, duration: 6, delay: 0.12 },
  { name: "Kotlin", badge: "KT", xPct: 76, yPct: 70, duration: 5.9, delay: 0.95 },
  { name: "C", badge: "C", xPct: 61, yPct: 80, duration: 6.3, delay: 0.42 },
  { name: "TensorFlow", badge: "TF", xPct: 45, yPct: 84, duration: 5.6, delay: 1.45 },
  { name: "OpenCV", badge: "CV", xPct: 29, yPct: 82, duration: 6.2, delay: 0.74 },
  { name: "Git", badge: "GI", xPct: 15, yPct: 73, duration: 5.4, delay: 1.12 },
  { name: "Firebase", badge: "FB", xPct: 10, yPct: 58, duration: 6.05, delay: 0.5 },
  { name: "Docker", badge: "DK", xPct: 9, yPct: 42, duration: 5.75, delay: 1.22 },
  { name: "PostgreSQL", badge: "PG", xPct: 11, yPct: 28, duration: 6.5, delay: 0.27 },
];

type PointerState = {
  x: number;
  y: number;
  isActive: boolean;
};

function TechBadge({
  item,
  containerSize,
  pointer,
}: {
  item: TechItem;
  containerSize: { width: number; height: number };
  pointer: PointerState;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const xSpring = useSpring(0, { stiffness: 190, damping: 24, mass: 0.72 });
  const ySpring = useSpring(0, { stiffness: 190, damping: 24, mass: 0.72 });

  useEffect(() => {
    if (!pointer.isActive || containerSize.width <= 0 || containerSize.height <= 0) {
      xSpring.set(0);
      ySpring.set(0);
      return;
    }

    const itemX = (item.xPct / 100) * containerSize.width;
    const itemY = (item.yPct / 100) * containerSize.height;
    const dx = pointer.x - itemX;
    const dy = pointer.y - itemY;
    const distance = Math.hypot(dx, dy);
    const influenceRadius = 210;
    const proximity = Math.max(0, Math.min(1, 1 - distance / influenceRadius));

    if (proximity <= 0) {
      xSpring.set(0);
      ySpring.set(0);
      return;
    }

    const maxPull = isHovered ? 12 : 9;
    const safeDistance = distance < 0.0001 ? 1 : distance;
    xSpring.set((dx / safeDistance) * maxPull * proximity);
    ySpring.set((dy / safeDistance) * maxPull * proximity);
  }, [containerSize.height, containerSize.width, isHovered, item.xPct, item.yPct, pointer.isActive, pointer.x, pointer.y, xSpring, ySpring]);

  return (
    <motion.button
      type="button"
      aria-label={item.name}
      data-cursor-hover="true"
      className="absolute tech-badge-shell"
      style={{ left: `${item.xPct}%`, top: `${item.yPct}%`, x: xSpring, y: ySpring }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.06, filter: "brightness(1.08)" }}
      transition={{ type: "spring", stiffness: 240, damping: 20, mass: 0.6 }}
    >
      <span
        className={`tech-badge-chip ${isHovered ? "tech-badge-paused" : "tech-badge-breathe"}`}
        style={{ animationDuration: `${item.duration}s`, animationDelay: `${item.delay}s` }}
      >
        <span className="tech-badge-code">{item.badge}</span>
        <span className="tech-badge-name">{item.name}</span>
      </span>
    </motion.button>
  );
}

function HeroOrbitIconsComponent() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [pointer, setPointer] = useState<PointerState>({ x: 0, y: 0, isActive: false });

  useEffect(() => {
    const node = hostRef.current;
    if (!node) {
      return;
    }

    const updateSize = () => {
      const rect = node.getBoundingClientRect();
      setContainerSize({ width: rect.width, height: rect.height });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={hostRef}
      className="absolute inset-0 z-[15]"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPointer({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
          isActive: true,
        });
      }}
      onMouseLeave={() => setPointer((prev) => ({ ...prev, isActive: false }))}
      aria-hidden="true"
    >
      {TECH_ITEMS.map((item) => (
        <TechBadge key={item.name} item={item} containerSize={containerSize} pointer={pointer} />
      ))}
    </div>
  );
}

export default memo(HeroOrbitIconsComponent);
