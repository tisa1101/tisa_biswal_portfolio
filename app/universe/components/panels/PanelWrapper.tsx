"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PanelWrapperProps {
  children: React.ReactNode;
  onClose: () => void;
  planetName: string;
  planetEmoji: string;
  accentColor: string;
}

export function PanelWrapper({
  children,
  onClose,
  planetName,
  planetEmoji,
  accentColor,
}: PanelWrapperProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const hexToRgba = (hex: string, alpha: number) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return `rgba(68,136,255,${alpha})`;
    return `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)},${alpha})`;
  };

  return (
    <AnimatePresence>
      <motion.div
        key="panel-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          background: "rgba(2,8,24,0.92)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <motion.div
          key="panel-card"
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.88, y: 16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 900,
            maxHeight: "90vh",
            borderRadius: 20,
            background: "rgba(4,12,36,0.97)",
            border: `1px solid ${hexToRgba(accentColor, 0.28)}`,
            boxShadow: `0 0 0 1px ${hexToRgba(accentColor, 0.08)}, 0 8px 40px rgba(0,0,0,0.7), 0 0 80px ${hexToRgba(accentColor, 0.12)}`,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
              opacity: 0.7,
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "22px 28px 18px",
              borderBottom: `1px solid ${hexToRgba(accentColor, 0.14)}`,
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 30, lineHeight: 1 }}>{planetEmoji}</span>
              <div>
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 10,
                    letterSpacing: "0.3em",
                    color: accentColor,
                    margin: 0,
                    opacity: 0.7,
                    textTransform: "uppercase",
                  }}
                >
                  UNIVERSE OF TISA
                </p>
                <h2
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
                    fontWeight: 700,
                    color: "#ffffff",
                    margin: 0,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {planetName}
                </h2>
              </div>
            </div>

            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                border: `1px solid ${hexToRgba(accentColor, 0.3)}`,
                background: hexToRgba(accentColor, 0.08),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "none",
                color: "#ccddff",
                fontSize: 16,
                transition: "box-shadow 0.25s ease, background 0.25s ease",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 18px ${hexToRgba(accentColor, 0.6)}`;
                (e.currentTarget as HTMLButtonElement).style.background = hexToRgba(accentColor, 0.18);
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                (e.currentTarget as HTMLButtonElement).style.background = hexToRgba(accentColor, 0.08);
              }}
            >
              ✕
            </motion.button>
          </div>

          <div
            ref={scrollRef}
            style={{
              overflowY: "auto",
              flex: 1,
              padding: "28px",
              scrollbarWidth: "thin",
              scrollbarColor: `${hexToRgba(accentColor, 0.35)} transparent`,
            }}
          >
            {children}
          </div>

          <style>{`
            ::-webkit-scrollbar { width: 5px; }
            ::-webkit-scrollbar-track { background: transparent; }
            ::-webkit-scrollbar-thumb { background: ${hexToRgba(accentColor, 0.35)}; border-radius: 4px; }
          `}</style>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
