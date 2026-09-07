"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PropsWithChildren } from "react";

interface MotionSectionProps extends PropsWithChildren {
  className?: string;
  id?: string;
  delay?: number;
}

export default function MotionSection({ children, className = "", id, delay = 0 }: MotionSectionProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 170, damping: 22, mass: 0.9, delay }}
    >
      {children}
    </motion.section>
  );
}
