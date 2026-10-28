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

const headerButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white px-4 py-2 text-sm font-semibold text-[#1B1B1B] shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition-colors hover:bg-[#e8e8e8]";

const MAX_RESUME_PAGES = 8;

function resumePageSrc(pdfUrl: string, page: number) {
  return pdfUrl.replace("/image/upload/", `/image/upload/f_jpg,q_auto:best,pg_${page}/`);
}

export default function ResumeModal({
  isOpen,
  onClose,
  previewUrl,
  downloadUrl,
  openInNewTabUrl,
  title = "Resume",
}: ResumeModalProps) {
  const [shouldRenderPdf, setShouldRenderPdf] = useState(false);
  const [pageCount, setPageCount] = useState(MAX_RESUME_PAGES);

  useEffect(() => {
    if (isOpen) {
      setShouldRenderPdf(true);
      setPageCount(MAX_RESUME_PAGES);
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
            <div className="pointer-events-none absolute inset-[1px] rounded-[27px] border border-white/20" />

            <div className="relative z-10 flex h-full flex-col">
              <div className="relative z-30 flex shrink-0 items-center justify-between gap-3 bg-[#1B1B1B] px-3 py-3 sm:px-5">
                <motion.button
                  type="button"
                  onClick={onClose}
                  className={headerButtonClass}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <X size={16} />
                  <span>Back</span>
                </motion.button>

                <div className="hidden min-w-0 truncate px-2 text-sm font-semibold text-white sm:block">
                  {title}
                </div>

                <div className="flex flex-wrap items-center justify-end gap-2">
                  <motion.a
                    href={downloadUrl}
                    download
                    target="_blank"
                    rel="noreferrer"
                    className={headerButtonClass}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <Download size={16} />
                    <span>Download</span>
                  </motion.a>

                  <motion.a
                    href={openInNewTabUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={headerButtonClass}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <ExternalLink size={16} />
                    <span>View</span>
                  </motion.a>
                </div>
              </div>

              <div className="relative z-10 min-h-0 flex-1 bg-[#1B1B1B] px-3 pb-3 sm:px-4 sm:pb-4">
                <div className="h-full overflow-y-auto rounded-[22px] border border-white/30 bg-white">
                  {shouldRenderPdf ? (
                    <div className="mx-auto flex w-full max-w-[900px] flex-col gap-4 p-3 sm:p-5">
                      {Array.from({ length: pageCount }, (_, index) => {
                        const page = index + 1;
                        return (
                          <img
                            key={`${previewUrl}-${page}`}
                            src={resumePageSrc(previewUrl, page)}
                            alt={`Resume page ${page}`}
                            className="w-full bg-white shadow-[0_8px_30px_rgba(15,23,42,0.12)]"
                            onError={() => {
                              setPageCount((current) => Math.min(current, index));
                            }}
                          />
                        );
                      })}
                    </div>
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
