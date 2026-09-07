"use client"; // if you're using Next.js

import React from "react";

interface OrangeButtonProps {
  title: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const OrangeButton: React.FC<OrangeButtonProps> = ({
  title,
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-[144px] h-[66px] px-10 py-5 gap-2.5 rounded-[60px] bg-[#7b7d7a] font-bold text-[20px] text-white cursor-pointer flex items-center justify-center transition-all hover:bg-[#7b7d7a] ${className}`}
    >
      {title}
    </button>
  );
};

export default OrangeButton;
