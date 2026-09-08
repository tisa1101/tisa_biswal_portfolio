"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  "Initializing star systems...",
  "Calibrating nebula coordinates...",
  "Loading planetary data...",
  "Connecting to the universe...",
  "Almost there, Commander...",
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Increment progress smoothly
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(100, p + (p < 80 ? 1.4 : 0.6));
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => setDone(true), 400);
      setTimeout(() => {
        setExiting(true);
        setTimeout(onComplete, 800);
      }, 2000);
    }
    // Cycle boot text
    const idx = Math.floor((progress / 100) * BOOT_LINES.length);
    setLineIndex(Math.min(idx, BOOT_LINES.length - 1));
  }, [progress]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "radial-gradient(ellipse at center, #04102a 0%, #020818 70%, #010510 100%)",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {/* Emoji */}
          <motion.div
            animate={done ? { scale: [1, 1.3, 1], rotate: [0, -10, 10, 0] } : {}}
            transition={{ duration: 0.6, type: "spring" }}
            style={{ marginBottom: 28 }}
          >
            <motion.img
              src={done ? "/emojis/thumbsup.png" : "/emojis/coding.png"}
              alt="emoji"
              animate={!done ? { y: [0, -6, 0] } : {}}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              style={{
                width: 90,
                height: 90,
                objectFit: "contain",
                filter: "drop-shadow(0 0 20px rgba(68,136,255,0.7))",
              }}
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "0.08em",
              background: "linear-gradient(135deg, #ffffff, #4488ff, #7b4fff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginBottom: 8,
            }}
          >
            THE UNIVERSE OF TISA
          </motion.h1>

          {/* Boot line */}
          <AnimatePresence mode="wait">
            <motion.p
              key={lineIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 12,
                color: "#4488ff",
                letterSpacing: "0.1em",
                marginBottom: 36,
                minHeight: 18,
              }}
            >
              {done ? "✅  Universe ready. Welcome, Commander." : `> ${BOOT_LINES[lineIndex]}`}
            </motion.p>
          </AnimatePresence>

          {/* Progress bar */}
          <div
            style={{
              width: 280,
              height: 3,
              borderRadius: 99,
              background: "rgba(68,136,255,0.15)",
              overflow: "hidden",
              marginBottom: 10,
            }}
          >
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.2 }}
              style={{
                height: "100%",
                borderRadius: 99,
                background: "linear-gradient(90deg, #4488ff, #7b4fff, #00ddff)",
                boxShadow: "0 0 10px rgba(68,136,255,0.8)",
              }}
            />
          </div>

          {/* Percentage */}
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              color: "#4466aa",
              letterSpacing: "0.15em",
            }}
          >
            {Math.round(progress)}%
          </span>

          {/* Particle dots */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
            {Array.from({ length: 30 }, (_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 + Math.random() * 2, delay: Math.random() * 2 }}
                style={{
                  position: "absolute",
                  width: 2,
                  height: 2,
                  borderRadius: "50%",
                  background: "#4488ff",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: 0.4,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
