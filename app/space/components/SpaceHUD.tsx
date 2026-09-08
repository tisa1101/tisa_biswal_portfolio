"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameState } from "../hooks/useGameState";
import { PLANETS } from "../constants/planets";

export function SpaceHUD() {
  const {
    phase, fuel, isBoosting, nearestPlanet, nearestDistance,
    discoveredCount, aiMessage, isMuted, toggleMute,
    missionObjective, starCollected,
  } = useGameState();

  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowControls(false), 8000);
    return () => clearTimeout(t);
  }, []);

  if (phase === "intro" || phase === "exploring" || phase === "missionComplete") return null;

  const isApproaching = nearestPlanet && nearestDistance < 28;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 font-mono">
      
      {/* ── Top Bar ─────────────────────────────────── */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-6">
        {/* Mission Objective */}
        <motion.div
          className="px-5 py-2 rounded-full text-xs tracking-widest uppercase"
          style={{
            background: "rgba(0,20,40,0.7)",
            border: "1px solid rgba(68,136,255,0.4)",
            color: "#88bbff",
            backdropFilter: "blur(12px)",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🎯 {missionObjective}
        </motion.div>
      </div>

      {/* ── Top Right — Stats ─────────────────────── */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
        {/* Planets discovered */}
        <motion.div
          className="px-4 py-2 rounded-lg text-xs"
          style={{
            background: "rgba(0,10,30,0.75)",
            border: "1px solid rgba(68,136,255,0.3)",
            color: "#aaccff",
            backdropFilter: "blur(12px)",
          }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="text-[10px] opacity-60 mb-1 tracking-widest">PLANETS EXPLORED</div>
          <div className="text-lg font-bold text-cyan-300">
            {discoveredCount} / {PLANETS.length}
          </div>
        </motion.div>

        {/* Stars */}
        <motion.div
          className="px-4 py-2 rounded-lg text-xs"
          style={{
            background: "rgba(0,10,30,0.75)",
            border: "1px solid rgba(255,220,50,0.3)",
            color: "#ffd700",
            backdropFilter: "blur(12px)",
          }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.1 } }}
        >
          ⭐ {starCollected} Stars
        </motion.div>

        {/* Mute button */}
        <button
          className="px-3 py-2 rounded-lg text-xs pointer-events-auto cursor-pointer"
          style={{
            background: "rgba(0,10,30,0.75)",
            border: "1px solid rgba(68,136,255,0.3)",
            color: "#aaccff",
            backdropFilter: "blur(12px)",
          }}
          onClick={toggleMute}
        >
          {isMuted ? "🔇 MUTED" : "🔊 AUDIO"}
        </button>
      </div>

      {/* ── Bottom Left — Fuel ───────────────────────── */}
      <motion.div
        className="absolute bottom-6 left-4 p-4 rounded-xl"
        style={{
          background: "rgba(0,10,30,0.75)",
          border: "1px solid rgba(68,136,255,0.3)",
          backdropFilter: "blur(12px)",
          minWidth: 160,
        }}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="text-[10px] text-blue-400 tracking-widest mb-2 uppercase">Fuel Cell</div>
        <div className="h-2 rounded-full bg-blue-950 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: fuel > 40
                ? "linear-gradient(90deg, #00aaff, #0044ff)"
                : fuel > 20
                ? "linear-gradient(90deg, #ffaa00, #ff4400)"
                : "linear-gradient(90deg, #ff0000, #ff4400)",
              boxShadow: "0 0 8px rgba(0,150,255,0.6)",
            }}
            animate={{ width: `${fuel}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <div className="text-xs text-blue-300 mt-1">{Math.round(fuel)}%</div>
        {isBoosting && (
          <motion.div
            className="text-[10px] text-orange-400 mt-1 tracking-widest"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ repeat: Infinity, duration: 0.4 }}
          >
            ⚡ BOOST ACTIVE
          </motion.div>
        )}
      </motion.div>

      {/* ── Bottom Right — Controls hint ─────────────── */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            className="absolute bottom-6 right-4 p-4 rounded-xl text-xs"
            style={{
              background: "rgba(0,10,30,0.75)",
              border: "1px solid rgba(68,136,255,0.2)",
              backdropFilter: "blur(12px)",
              color: "#667799",
              lineHeight: 1.8,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="text-blue-400 mb-2 tracking-widest text-[10px]">CONTROLS</div>
            <div><kbd className="bg-blue-900/50 px-1 rounded">W A S D</kbd> — Move</div>
            <div><kbd className="bg-blue-900/50 px-1 rounded">Q / E</kbd> — Up / Down</div>
            <div><kbd className="bg-blue-900/50 px-1 rounded">SHIFT</kbd> — Boost</div>
            <div><kbd className="bg-blue-900/50 px-1 rounded">E</kbd> — Land on planet</div>
            <div><kbd className="bg-blue-900/50 px-1 rounded">Mouse</kbd> — Look</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Planet Approach Label ─────────────────────── */}
      <AnimatePresence>
        {isApproaching && nearestPlanet && (
          <motion.div
            key={nearestPlanet.id}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
          >
            <div className="text-[10px] tracking-[0.4em] text-cyan-400 mb-1">
              APPROACHING
            </div>
            <div className="text-2xl font-bold text-white tracking-wide">
              {nearestPlanet.emoji} {nearestPlanet.name.toUpperCase()}
            </div>
            <div className="text-sm text-blue-300 mt-1">{nearestPlanet.description}</div>
            <motion.div
              className="text-xs text-cyan-400 mt-3 tracking-widest"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              ● CLICK PLANET OR PRESS [E] TO EXPLORE ●
            </motion.div>
            <div className="text-[10px] text-blue-600 mt-1">
              {Math.round(nearestDistance)} units away
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── AI Message Ticker ─────────────────────────── */}
      <AnimatePresence>
        {aiMessage && (
          <motion.div
            key={aiMessage}
            className="absolute top-16 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="px-6 py-2 rounded-lg text-xs tracking-wider"
              style={{
                background: "rgba(0,15,40,0.85)",
                border: "1px solid rgba(100,180,255,0.35)",
                color: "#88ccff",
                backdropFilter: "blur(10px)",
              }}
            >
              🤖 AI PILOT: {aiMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Boost Screen Edge Flash ────────────────────── */}
      <AnimatePresence>
        {isBoosting && (
          <motion.div
            className="fixed inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,80,255,0.15) 100%)",
              border: "2px solid rgba(0,100,255,0.3)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
