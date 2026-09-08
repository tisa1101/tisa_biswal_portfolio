"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameState } from "../hooks/useGameState";

const INTRO_LINES = [
  { text: "Initializing TISA-VERSE...", delay: 0 },
  { text: "Powering up navigation systems...", delay: 1200 },
  { text: "Calibrating star charts...", delay: 2400 },
  { text: "Welcome aboard, Commander.", delay: 3800, big: true },
  { text: "Mission Objective:", delay: 5200 },
  { text: "Discover the Universe of Tisa Biswal.", delay: 5800, accent: true },
  { text: "Engines igniting. Prepare for launch.", delay: 7400 },
];

export function IntroSequence() {
  const { phase, setPhase, setAiMessage, setMissionObjective } = useGameState();
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const [skipVisible, setSkipVisible] = useState(true);

  useEffect(() => {
    if (phase !== "intro") return;

    INTRO_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
      }, line.delay);
    });

    // Auto-transition to flying
    setTimeout(() => {
      setDone(true);
      setTimeout(() => {
        setPhase("flying");
        setAiMessage("Engines online. Navigate to any planet, Commander.");
        setMissionObjective("Explore the universe — approach any planet to begin");
      }, 1200);
    }, 9200);
  }, [phase]);

  if (phase !== "intro") return null;

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="intro"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: "radial-gradient(ellipse at center, #01050f 0%, #000000 100%)" }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2 }}
        >
          {/* Animated star burst */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at center, rgba(0,40,120,0.3) 0%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 4 }}
          />

          {/* Spacecraft silhouette */}
          <motion.div
            className="text-8xl mb-12"
            initial={{ opacity: 0, scale: 0.5, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.2, type: "spring" }}
            style={{ filter: "drop-shadow(0 0 30px rgba(68,136,255,0.8))" }}
          >
            🚀
          </motion.div>

          {/* Text lines */}
          <div className="space-y-3 text-center max-w-lg px-6 font-mono">
            {INTRO_LINES.map((line, i) => (
              <AnimatePresence key={i}>
                {visibleLines.includes(i) && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.6 }}
                    className={
                      line.big
                        ? "text-2xl font-bold text-white tracking-wider"
                        : line.accent
                        ? "text-lg text-cyan-300 tracking-wide font-semibold"
                        : "text-sm text-blue-400 tracking-widest opacity-80"
                    }
                  >
                    {line.big || line.accent ? line.text : `> ${line.text}`}
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
          </div>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-16 w-64 h-px"
            style={{ background: "rgba(68,136,255,0.2)" }}
          >
            <motion.div
              className="h-full"
              style={{ background: "linear-gradient(90deg, #0044ff, #00aaff)" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 9, ease: "linear" }}
            />
          </motion.div>

          {/* Skip */}
          {skipVisible && (
            <button
              className="absolute bottom-6 right-8 text-xs text-blue-700 hover:text-blue-400 transition-colors cursor-pointer font-mono tracking-widest"
              onClick={() => {
                setDone(true);
                setTimeout(() => {
                  setPhase("flying");
                  setAiMessage("Engines online. Navigate to any planet, Commander.");
                }, 400);
              }}
            >
              [SKIP INTRO]
            </button>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
