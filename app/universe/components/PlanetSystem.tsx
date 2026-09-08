"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface PlanetConfig {
  id: string;
  label: string;
  emoji: string;
  size: number;
  color: string;
  glowColor: string;
  ringColor?: string;
  hasRings?: boolean;
  orbitDuration: number; // seconds for float cycle
  floatRange: number;   // px up/down
  tooltip: string;
  // grid position in the 2-column stagger layout
  // we use a 3-column flex-wrap of 6 items
}

const PLANETS: PlanetConfig[] = [
  {
    id: "about",
    label: "About",
    emoji: "🌍",
    size: 130,
    color: "radial-gradient(circle at 35% 35%, #2a80d0, #0d3d70, #06203d)",
    glowColor: "rgba(44,140,220,0.55)",
    orbitDuration: 4.0,
    floatRange: 14,
    tooltip: "My Story",
  },
  {
    id: "skills",
    label: "Skills",
    emoji: "🪐",
    size: 140,
    color: "radial-gradient(circle at 35% 35%, #8844ee, #4a1a99, #200a4a)",
    glowColor: "rgba(136,80,255,0.55)",
    hasRings: true,
    ringColor: "#aa77ff",
    orbitDuration: 5.5,
    floatRange: 10,
    tooltip: "Tech Arsenal",
  },
  {
    id: "projects",
    label: "Projects",
    emoji: "🌕",
    size: 120,
    color: "radial-gradient(circle at 35% 35%, #b0a090, #6a5f50, #30281e)",
    glowColor: "rgba(180,160,120,0.5)",
    orbitDuration: 3.5,
    floatRange: 16,
    tooltip: "My Work",
  },
  {
    id: "achievements",
    label: "Achievements",
    emoji: "⭐",
    size: 110,
    color: "radial-gradient(circle at 35% 35%, #ffe040, #cc8800, #6a4400)",
    glowColor: "rgba(255,200,40,0.6)",
    orbitDuration: 6.0,
    floatRange: 12,
    tooltip: "Milestones",
  },
  {
    id: "resume",
    label: "Resume",
    emoji: "📄",
    size: 90,
    color: "radial-gradient(circle at 35% 35%, #44ccaa, #1a7a60, #073322)",
    glowColor: "rgba(60,200,160,0.5)",
    orbitDuration: 4.8,
    floatRange: 18,
    tooltip: "Download CV",
  },
  {
    id: "contact",
    label: "Contact",
    emoji: "📡",
    size: 105,
    color: "radial-gradient(circle at 35% 35%, #44aaff, #1155cc, #041a55)",
    glowColor: "rgba(68,170,255,0.55)",
    orbitDuration: 5.0,
    floatRange: 13,
    tooltip: "Get in Touch",
  },
];

interface PlanetOrbProps {
  planet: PlanetConfig;
  onClick: (id: string) => void;
  delay: number;
}

function PlanetOrb({ planet, onClick, delay }: PlanetOrbProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.7, type: "spring", bounce: 0.35 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 14,
      }}
    >
      {/* Floating wrapper */}
      <motion.div
        animate={{ y: [0, -planet.floatRange, 0] }}
        transition={{
          repeat: Infinity,
          duration: planet.orbitDuration,
          ease: "easeInOut",
        }}
        style={{ position: "relative" }}
      >
        {/* Planet sphere */}
        <motion.div
          className="planet-orb"
          onClick={() => onClick(planet.id)}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.93 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            width: planet.size,
            height: planet.size,
            borderRadius: "50%",
            background: planet.color,
            cursor: "none",
            position: "relative",
            boxShadow: hovered
              ? `0 0 40px ${planet.glowColor}, 0 0 80px ${planet.glowColor}, 0 0 120px ${planet.glowColor}`
              : `0 0 20px ${planet.glowColor}, 0 0 40px ${planet.glowColor.replace("0.5", "0.25").replace("0.55", "0.25").replace("0.6", "0.25")}`,
            transition: "box-shadow 0.4s ease",
          }}
        >
          {/* Surface highlight */}
          <div
            style={{
              position: "absolute",
              top: "14%",
              left: "14%",
              width: "36%",
              height: "28%",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,255,255,0.22) 0%, transparent 100%)",
              pointerEvents: "none",
            }}
          />

          {/* Emoji */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: planet.size * 0.38,
              filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.6))",
              userSelect: "none",
            }}
          >
            {planet.emoji}
          </div>

          {/* Saturn rings */}
          {planet.hasRings && (
            <motion.div
              animate={hovered ? { rotateX: 65, scaleX: 1.15 } : { rotateX: 70, scaleX: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) rotateX(70deg)",
                width: planet.size * 1.9,
                height: planet.size * 1.9,
                borderRadius: "50%",
                border: `3px solid ${planet.ringColor}55`,
                boxShadow: `0 0 0 7px ${planet.ringColor}22, 0 0 0 14px ${planet.ringColor}11`,
                pointerEvents: "none",
              }}
            />
          )}
        </motion.div>

        {/* Orbit ring (hover) */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.25 }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) rotateX(70deg)",
                width: planet.size * 1.55,
                height: planet.size * 1.55,
                borderRadius: "50%",
                border: `1.5px dashed ${planet.glowColor}`,
                pointerEvents: "none",
                animation: "orbitSpin 4s linear infinite",
              }}
            />
          )}
        </AnimatePresence>

        {/* Tooltip */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "absolute",
                bottom: "calc(100% + 12px)",
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(4, 16, 48, 0.9)",
                border: "1px solid rgba(68,136,255,0.3)",
                backdropFilter: "blur(12px)",
                borderRadius: 8,
                padding: "5px 14px",
                whiteSpace: "nowrap",
                pointerEvents: "none",
              }}
            >
              <p style={{ fontSize: 11, color: "#88bbff", fontFamily: "'Space Mono', monospace", letterSpacing: "0.15em", margin: 0 }}>
                {planet.emoji} {planet.label.toUpperCase()}
              </p>
              <p style={{ fontSize: 10, color: "#4466aa", fontFamily: "'Space Mono', monospace", margin: "2px 0 0" }}>
                Click to Explore
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Planet label below */}
      <motion.span
        animate={{ opacity: hovered ? 1 : 0.55 }}
        style={{
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.12em",
          color: "#aabbdd",
          fontFamily: "'Space Grotesk', sans-serif",
          textTransform: "uppercase",
        }}
      >
        {planet.label}
      </motion.span>
    </motion.div>
  );
}

interface PlanetSystemProps {
  onSelectPlanet: (id: string) => void;
}

export function PlanetSystem({ onSelectPlanet }: PlanetSystemProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        padding: "20px 40px",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ textAlign: "center", marginBottom: 52 }}
      >
        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.35em",
          color: "#4488ff",
          marginBottom: 8,
        }}>
          UNIVERSE OF TISA · EXPLORE
        </p>
        <h2 style={{
          fontSize: "clamp(1.3rem, 3vw, 2rem)",
          fontWeight: 700,
          background: "linear-gradient(135deg, #ffffff, #88bbff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "-0.01em",
        }}>
          Choose a planet to begin
        </h2>
      </motion.div>

      {/* Planet grid — 3 × 2 */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "clamp(24px, 5vw, 60px)",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: 860,
        }}
      >
        {PLANETS.map((planet, i) => (
          <PlanetOrb
            key={planet.id}
            planet={planet}
            onClick={onSelectPlanet}
            delay={0.3 + i * 0.1}
          />
        ))}
      </div>

      <style>{`
        @keyframes orbitSpin {
          from { transform: translate(-50%, -50%) rotateX(70deg) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotateX(70deg) rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
}

export { PLANETS };
