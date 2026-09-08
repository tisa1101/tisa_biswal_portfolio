"use client";

import { motion } from "framer-motion";

interface LandingPageProps {
  onBegin: () => void;
}

export function LandingPage({ onBegin }: LandingPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.8 }}
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        fontFamily: "'Space Grotesk', sans-serif",
        padding: "0 24px",
        textAlign: "center",
      }}
    >
      {/* Floating glow orb behind text */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(68,136,255,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Sparkle icon */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        style={{ fontSize: 38, marginBottom: 24, filter: "drop-shadow(0 0 16px rgba(68,136,255,0.8))" }}
      >
        ✨
      </motion.div>

      {/* Main headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
        style={{
          fontSize: "clamp(2rem, 6vw, 4.5rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          background: "linear-gradient(135deg, #ffffff 0%, #88bbff 45%, #aa77ff 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: 20,
          maxWidth: 800,
        }}
      >
        Welcome to the Universe of Tisa
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        style={{
          fontSize: "clamp(1rem, 2vw, 1.2rem)",
          color: "#7a99cc",
          maxWidth: 540,
          lineHeight: 1.7,
          marginBottom: 48,
          fontWeight: 300,
        }}
      >
        Explore the planets to discover my journey as an{" "}
        <span style={{ color: "#88bbff", fontWeight: 500 }}>AI Engineer</span> and{" "}
        <span style={{ color: "#aa88ff", fontWeight: 500 }}>Software Developer.</span>
      </motion.p>

      {/* CTA Button */}
      <motion.button
        data-hoverable
        onClick={onBegin}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        whileHover={{ scale: 1.06, y: -3 }}
        whileTap={{ scale: 0.97 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "16px 36px",
          borderRadius: 60,
          fontSize: 16,
          fontWeight: 600,
          letterSpacing: "0.04em",
          background: "linear-gradient(135deg, #1a44aa, #3366dd, #5544bb)",
          border: "1px solid rgba(100,160,255,0.45)",
          color: "#ffffff",
          cursor: "none",
          boxShadow: "0 0 30px rgba(68,136,255,0.4), 0 0 60px rgba(68,136,255,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
          fontFamily: "'Space Grotesk', sans-serif",
          transition: "box-shadow 0.3s ease",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Shimmer */}
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", repeatDelay: 1 }}
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
            pointerEvents: "none",
          }}
        />
        🚀 Begin Mission
      </motion.button>

      {/* Subtle scrolling tip */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ delay: 1.4 }}
        style={{
          position: "absolute",
          bottom: 40,
          fontSize: 11,
          letterSpacing: "0.2em",
          color: "#4466aa",
          fontFamily: "'Space Mono', monospace",
        }}
      >
        6 PLANETS TO EXPLORE
      </motion.p>
    </motion.div>
  );
}
