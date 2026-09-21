"use client";

import { Keyboard, Navigation, Pagination, Zoom } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";

type ScreenshotLightboxProps = {
  images: string[];
  alt: string;
  initialIndex: number;
  onClose: () => void;
};

export default function ScreenshotLightbox({
  images,
  alt,
  initialIndex,
  onClose,
}: ScreenshotLightboxProps) {
  const [mounted, setMounted] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const hasMultiple = images.length > 1;

  useEffect(() => {
    setMounted(true);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} screenshots`}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/88"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl transition-colors hover:bg-white/20"
        aria-label="Close screenshots"
      >
        <X size={20} />
      </button>

      <div className="relative h-full w-full max-h-full max-w-[1400px] px-4 py-16 sm:px-16" onClick={(event) => event.stopPropagation()}>
        <Swiper
          initialSlide={initialIndex}
          modules={[Keyboard, Navigation, Pagination, Zoom]}
          keyboard={{ enabled: true }}
          zoom={{ maxRatio: 2.5 }}
          pagination={hasMultiple ? { clickable: true } : false}
          loop={hasMultiple}
          spaceBetween={16}
          className="h-full screenshot-lightbox"
          onSwiper={(instance) => {
            swiperRef.current = instance;
          }}
        >
          {images.map((src, index) => (
            <SwiperSlide key={`${src}-${index}`} className="flex items-center justify-center">
              <div className="swiper-zoom-container flex h-full w-full items-center justify-center">
                <div className="relative h-full w-full">
                  <Image
                    src={src}
                    alt={`${alt} screenshot ${index + 1}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority={index === initialIndex}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {hasMultiple ? (
          <>
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute left-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl transition-colors hover:bg-white/20 sm:inline-flex"
              aria-label="Previous screenshot"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute right-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl transition-colors hover:bg-white/20 sm:inline-flex"
              aria-label="Next screenshot"
            >
              <ChevronRight size={22} />
            </button>
          </>
        ) : null}
      </div>
    </div>,
    document.body
  );
}
