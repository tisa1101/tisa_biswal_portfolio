"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PanelWrapper } from "./PanelWrapper";

interface AboutPanelProps {
  onClose: () => void;
}

const TIMELINE = [
  {
    year: "2024–2028",
    title: "B.Tech CSE",
    sub: "Lovely Professional University",
    icon: "🎓",
    detail: "Computer Science & Engineering — AI/ML Specialization",
  },
  {
    year: "2025–2026",
    title: "Hackathons",
    sub: "SIH Grand Finale · Hack AI 3rd · Anveshan",
    icon: "🏆",
    detail: "Multiple national-level competitions and prototype marathons",
  },
  {
    year: "2025–2026",
    title: "Patents Pending",
    sub: "Dr. Glance AI · MedBridge",
    icon: "📜",
    detail: "Two innovative MedTech diagnostic methodologies filed",
  },
];

const ROLES = [
  { label: "AI Engineer", color: "#2a80d0" },
  { label: "Software Developer", color: "#5588ee" },
  { label: "Healthcare Innovator", color: "#22aacc" },
];

const GOALS = [
  { icon: "🧠", text: "Pioneer brain-computer interface diagnostics" },
  { icon: "🌍", text: "Democratize healthcare via AI" },
  { icon: "🚀", text: "Build products impacting millions" },
];

export function AboutPanel({ onClose }: AboutPanelProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    setTilt({ x: dy * -10, y: dx * 10 });
  }, []);

  const handleMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  return (
    <PanelWrapper
      onClose={onClose}
      planetName="About Me"
      planetEmoji="🌍"
      accentColor="#2a80d0"
    >
      {/* Top hero row */}
      <div
        style={{
          display: "flex",
          gap: 32,
          alignItems: "flex-start",
          flexWrap: "wrap",
          marginBottom: 36,
        }}
      >
        {/* Avatar with 3D tilt */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            perspective: 800,
            flexShrink: 0,
          }}
        >
          <motion.div
            animate={{ rotateX: tilt.x, rotateY: tilt.y }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            style={{
              width: 160,
              height: 160,
              borderRadius: "50%",
              overflow: "hidden",
              border: "2px solid rgba(42,128,208,0.45)",
              boxShadow:
                "0 0 0 4px rgba(42,128,208,0.1), 0 0 40px rgba(42,128,208,0.25), 0 8px 32px rgba(0,0,0,0.5)",
              position: "relative",
              transformStyle: "preserve-3d",
            }}
          >
            <Image
              src="/personal/avatar.png"
              alt="Tisa Biswal"
              fill
              style={{ objectFit: "cover", objectPosition: "top" }}
              priority
            />
            {/* Gloss overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.12) 0%, transparent 65%)",
                pointerEvents: "none",
              }}
            />
          </motion.div>

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              marginTop: 12,
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#44ff88",
                boxShadow: "0 0 8px #44ff88",
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                color: "#44ff88",
                letterSpacing: "0.12em",
              }}
            >
              AVAILABLE
            </span>
          </motion.div>
        </div>

        {/* Bio text */}
        <div style={{ flex: 1, minWidth: 220 }}>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
              fontWeight: 800,
              margin: "0 0 4px",
              background: "linear-gradient(135deg, #4499ff, #88ccff, #2a80d0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Tisa Biswal
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              color: "#4488bb",
              letterSpacing: "0.18em",
              margin: "0 0 14px",
              textTransform: "uppercase",
            }}
          >
            B.Tech CSE · LPU · 2028
          </motion.p>

          {/* Role pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
            style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}
          >
            {ROLES.map((role) => (
              <span
                key={role.label}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  color: role.color,
                  border: `1px solid ${role.color}55`,
                  background: `${role.color}14`,
                  borderRadius: 20,
                  padding: "4px 12px",
                  letterSpacing: "0.04em",
                }}
              >
                {role.label}
              </span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 14,
              lineHeight: 1.75,
              color: "#8899bb",
              margin: 0,
            }}
          >
            I&apos;m a B.Tech CSE student at LPU with a passion for building AI systems that
            solve real-world healthcare challenges. From training CNNs to detect oral
            diseases to architecting multi-agent monitoring platforms, I turn ideas into
            production-ready products — with two patents pending to show for it.
          </motion.p>
        </div>
      </div>

      {/* Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ marginBottom: 36 }}
      >
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.28em",
            color: "#2a80d0",
            marginBottom: 16,
            textTransform: "uppercase",
          }}
        >
          ◈ TIMELINE
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {TIMELINE.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 + i * 0.1 }}
              style={{
                display: "flex",
                gap: 16,
                alignItems: "flex-start",
                padding: "14px 18px",
                borderRadius: 12,
                background: "rgba(42,128,208,0.05)",
                border: "1px solid rgba(42,128,208,0.1)",
                transition: "background 0.2s ease, border-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(42,128,208,0.1)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(42,128,208,0.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(42,128,208,0.05)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(42,128,208,0.1)";
              }}
            >
              <span style={{ fontSize: 24, lineHeight: 1, flexShrink: 0 }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 10,
                      color: "#2a80d0",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {item.year}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 15,
                      fontWeight: 700,
                      color: "#ddeeff",
                    }}
                  >
                    {item.title}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 12,
                    color: "#556688",
                    margin: "3px 0 2px",
                  }}
                >
                  {item.sub}
                </p>
                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 12,
                    color: "#7799aa",
                    margin: 0,
                  }}
                >
                  {item.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Future goals */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <p
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.28em",
            color: "#2a80d0",
            marginBottom: 16,
            textTransform: "uppercase",
          }}
        >
          ◈ MISSION
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {GOALS.map((goal, i) => (
            <motion.div
              key={goal.text}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.75 + i * 0.08 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 16px",
                borderRadius: 12,
                background: "rgba(42,128,208,0.07)",
                border: "1px solid rgba(42,128,208,0.15)",
                flex: "1 1 220px",
              }}
            >
              <span style={{ fontSize: 22 }}>{goal.icon}</span>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 13,
                  color: "#99bbdd",
                  lineHeight: 1.45,
                }}
              >
                {goal.text}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PanelWrapper>
  );
}
