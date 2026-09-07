"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, ExternalLink, X } from "lucide-react";
import { useEffect, useState } from "react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  previewUrl: string;
  downloadUrl: string;
  openInNewTabUrl: string;
  title?: string;
}

const glassButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-sm font-medium text-white shadow-[0_8px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-colors hover:bg-white/25";

export default function ResumeModal({
  isOpen,
  onClose,
  previewUrl,
  downloadUrl,
  openInNewTabUrl,
  title = "Resume",
}: ResumeModalProps) {
  const [shouldRenderPdf, setShouldRenderPdf] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRenderPdf(true);
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }

    setShouldRenderPdf(false);
    return;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/35 p-3 sm:p-6 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={onClose}
          aria-hidden="true"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Resume Preview"
            className="gpu-layer relative h-[90vh] w-[90vw] max-w-[1200px] overflow-hidden rounded-[28px] border border-white/35 bg-gradient-to-br from-white/35 via-white/22 to-slate-200/16 shadow-[0_24px_90px_rgba(15,23,42,0.45)]"
            initial={{ scale: 0.95, y: 10, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.98, y: 8, opacity: 0, transition: { duration: 0.22, ease: "easeOut" } }}
            transition={{
              type: "spring",
              stiffness: 520,
              damping: 40,
              mass: 0.55,
            }}
            style={{ willChange: "transform, opacity", transform: "translate3d(0, 0, 0)", backfaceVisibility: "hidden" }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/26 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-[1px] rounded-[27px] border border-white/28" />
            <div className="pointer-events-none absolute left-8 right-8 top-1 h-14 rounded-full bg-white/30 blur-xl" />

            <div className="relative z-10 flex h-full flex-col">
              <div className="flex items-center justify-between px-4 pb-3 pt-4 sm:px-6">
                <div className="rounded-full border border-white/35 bg-white/15 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-xl">
                  {title}
                </div>

                <div className="flex flex-wrap items-center justify-end gap-2">
                  <motion.a
                    href={downloadUrl}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className={glassButtonClass}
                    whileHover={{ scale: 1.04, filter: "brightness(1.08)" }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <Download size={16} />
                    <span>Download Resume</span>
                  </motion.a>

                  <motion.a
                    href={openInNewTabUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={glassButtonClass}
                    whileHover={{ scale: 1.04, filter: "brightness(1.08)" }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <ExternalLink size={16} />
                    <span>Open in New Tab</span>
                  </motion.a>

                  <motion.button
                    type="button"
                    onClick={onClose}
                    className={glassButtonClass}
                    whileHover={{ scale: 1.04, filter: "brightness(1.08)" }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <X size={16} />
                    <span>Close</span>
                  </motion.button>
                </div>
              </div>

              <div className="relative min-h-0 flex-1 px-3 pb-3 sm:px-4 sm:pb-4">
                <div className="h-full overflow-hidden rounded-[22px] border border-white/30 bg-white/70 shadow-inner shadow-white/30 backdrop-blur-sm">
                  {shouldRenderPdf ? (
                    <iframe
                      src={previewUrl}
                      title="Resume PDF"
                      className="h-full w-full"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm font-medium text-slate-700">
                      Loading resume...
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
