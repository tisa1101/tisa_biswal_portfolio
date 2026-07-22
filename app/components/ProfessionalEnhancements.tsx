"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const ProfessionalEnhancements = () => {
  const [progress, setProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = height > 0 ? (scrollTop / height) * 100 : 0;

      setProgress(nextProgress);
      setShowScrollTop(scrollTop > 800);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 z-[60] h-1 w-full bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-[#915eff] via-[#7c4dff] to-[#00cea8]"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>

      <AnimatePresence>
        {showScrollTop ? (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-[#050816]/80 text-xl text-white shadow-2xl backdrop-blur-md"
            aria-label="Back to top"
          >
            ↑
          </motion.button>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default ProfessionalEnhancements;
