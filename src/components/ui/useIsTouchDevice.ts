"use client";

import { useEffect, useState } from "react";

const TOUCH_QUERY = "(hover: none) and (pointer: coarse)";

export default function useIsTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQuery = window.matchMedia(TOUCH_QUERY);
    const updateState = () => setIsTouchDevice(mediaQuery.matches);

    updateState();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateState);
      return () => mediaQuery.removeEventListener("change", updateState);
    }

    mediaQuery.addListener(updateState);
    return () => mediaQuery.removeListener(updateState);
  }, []);

  return isTouchDevice;
}
