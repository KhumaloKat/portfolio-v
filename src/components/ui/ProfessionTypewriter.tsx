"use client";

import { memo } from "react";
import { TypeAnimation } from "react-type-animation";

type ProfessionTypewriterProps = {
  className?: string;
};

const PROFESSIONS = [
  "Software Developer",
  "Computer Systems Engineer",
  "Drone Pilot",
  "Computer Vision Engineer",
  "Machine Learning Engineer",
] as const;

const HOLD_MS = 3000;
const TYPING_SPEED_MS = 60;
const DELETING_SPEED_MS = 35;
const RESERVED_WIDTH_CH = 26;

const sequence = PROFESSIONS.flatMap((profession) => [profession, HOLD_MS]);

function ProfessionTypewriterComponent({ className = "" }: ProfessionTypewriterProps) {
  return (
    <div className={className} aria-label="Rotating professional roles">
      <span
        className="inline-block w-full max-w-full text-center align-baseline whitespace-nowrap"
        style={{ width: `min(${RESERVED_WIDTH_CH}ch, 100%)` }}
      >
        <TypeAnimation
          sequence={sequence}
          speed={TYPING_SPEED_MS}
          deletionSpeed={DELETING_SPEED_MS}
          cursor={true}
          repeat={Infinity}
          wrapper="span"
        />
      </span>
    </div>
  );
}

const ProfessionTypewriter = memo(ProfessionTypewriterComponent);

export default ProfessionTypewriter;
