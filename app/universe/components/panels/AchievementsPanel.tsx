"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PanelWrapper } from "./PanelWrapper";

const stats = [
  { label: "Projects Built", value: 20, suffix: "+", color: "#ffe040", icon: "💻" },
  { label: "Hackathons Won", value: 5, suffix: "", color: "#00cea8", icon: "🏆" },
  { label: "Patents Pending", value: 2, suffix: "", color: "#915eff", icon: "📜" },
  { label: "Awards & Honours", value: 7, suffix: "+", color: "#ff6b6b", icon: "⭐" },
];

const hackathons = [
  {
    name: "Smart India Hackathon 2025",
    result: "Grand Finale",
    badge: "🏅",
    desc: "Nominated to the Grand Finale for T-Rex, an AI-powered sports performance tracking platform.",
    color: "#915eff",
  },
  {
    name: "Hack AI Season 2 — LPU",
    result: "3rd Place 🥉",
    badge: "🏆",
    desc: "Won 3rd place in a 24-hour hackathon for NauvriQuest, an AI-powered career platform with AppliAI.",
    color: "#ffe040",
  },
  {
    name: "Anveshan 2025-26",
    result: "Selected",
    badge: "🔬",
    desc: "Selected for AIU's Anveshan Prototype Marathon under Health Sciences for Dr. Glance AI system.",
    color: "#00cea8",
  },
];

const awards = [
  { title: "CISCE 12th District Topper", type: "Academic", icon: "🎓", xp: "2500 XP", color: "#ffe040" },
  { title: "State Debate Champion", type: "2nd Place · State Level", icon: "🎤", xp: "1000 XP", color: "#915eff" },
  { title: "District Story Writing Winner", type: "1st Place · District", icon: "✍️", xp: "400 XP", color: "#00cea8" },
  { title: "District Dance Winner", type: "1st Place · District", icon: "💃", xp: "400 XP", color: "#ff6b6b" },
  { title: "Women Who Code Coordinator", type: "Leadership", icon: "👩‍💻", xp: "750 XP", color: "#915eff" },
  { title: "Avishkar 2.0 Organizer", type: "Event Architect", icon: "⚙️", xp: "500 XP", color: "#00cea8" },
  { title: "Commencement Ceremony Lead", type: "Organization", icon: "🎓", xp: "600 XP", color: "#ffe040" },
];

// ── Animated counter hook ──────────────────────────────────────
function useCounter(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafRef = useRef<number>();
  const started = useRef(false);

  const start = () => {
    if (started.current) return;
    started.current = true;
    const tick = (ts: number) => {
      if (!startTime.current) startTime.current = ts;
      const elapsed = ts - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
      else setCount(target);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);
  return { count, start };
}

function StatCounter({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const { count, start } = useCounter(stat.value, 1600);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) start(); }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [start]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flex flex-col items-center justify-center p-5 rounded-2xl text-center"
      style={{ background: `${stat.color}0e`, border: `1px solid ${stat.color}30` }}
    >
      <span className="text-3xl mb-1">{stat.icon}</span>
      <div className="text-3xl font-black mb-1" style={{ color: stat.color, fontFamily: "'Space Grotesk', sans-serif" }}>
        {count}{stat.suffix}
      </div>
      <div className="text-[10px] font-bold uppercase tracking-wider text-[#8899cc]" style={{ fontFamily: "'Space Mono', monospace" }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

interface AchievementsPanelProps {
  onClose: () => void;
}

export function AchievementsPanel({ onClose }: AchievementsPanelProps) {
  return (
    <PanelWrapper onClose={onClose} planetName="Achievements" planetEmoji="⭐" accentColor="#ffe040">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] mb-2" style={{ color: "#ffe040", fontFamily: "'Space Mono', monospace" }}>
            The Quest Log
          </p>
          <h2 className="text-white font-black text-2xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Milestones & Awards
          </h2>
        </div>

        {/* Animated counters */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s, i) => <StatCounter key={s.label} stat={s} index={i} />)}
        </div>

        {/* Level badge */}
        <div className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: "rgba(145,94,255,0.08)", border: "1px solid rgba(145,94,255,0.25)" }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center font-black text-xl flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #915eff, #00cea8)", boxShadow: "0 0 20px rgba(145,94,255,0.4)" }}>
            24
          </div>
          <div className="flex-1">
            <div className="text-white font-bold text-base" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Elite Innovator — Level 24
            </div>
            <div className="text-[#8899cc] text-xs mb-2">12,450 / 15,000 XP to Next Level</div>
            <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "83%" }}
                transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #915eff, #00cea8)" }}
              />
            </div>
          </div>
        </div>

        {/* Hackathons */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: "#8899cc", fontFamily: "'Space Mono', monospace" }}>
            <span>⚡</span> Hackathon Victories
          </div>
          <div className="flex flex-col gap-3">
            {hackathons.map((h, i) => (
              <motion.div
                key={h.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="flex items-start gap-3 p-4 rounded-2xl"
                style={{ background: `${h.color}0a`, border: `1px solid ${h.color}25` }}
              >
                <span className="text-2xl flex-shrink-0">{h.badge}</span>
                <div>
                  <div className="text-white font-bold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{h.name}</div>
                  <div className="text-[10px] font-bold mb-1" style={{ color: h.color, fontFamily: "'Space Mono', monospace" }}>{h.result}</div>
                  <div className="text-[#8899cc] text-xs leading-relaxed">{h.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Awards grid */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: "#8899cc", fontFamily: "'Space Mono', monospace" }}>
            <span>🏅</span> Awards & Honours
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {awards.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * i }}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span className="text-xl flex-shrink-0">{a.icon}</span>
                <div>
                  <div className="text-white text-xs font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{a.title}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[9px] text-[#8899cc]">{a.type}</span>
                    <span className="text-[9px] font-bold" style={{ color: a.color }}>{a.xp}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Closing quote */}
        <div className="text-center p-5 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(145,94,255,0.08), rgba(0,206,168,0.06))", border: "1px solid rgba(145,94,255,0.2)" }}>
          <p className="text-white/80 text-sm italic leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            &quot;Success is not final, failure is not fatal: it is the courage to continue that counts.&quot;
          </p>
          <div className="mt-3 flex justify-center gap-3">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold" style={{ background: "rgba(145,94,255,0.15)", color: "#915eff" }}>RESILIENCE: MAX</span>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold" style={{ background: "rgba(0,206,168,0.15)", color: "#00cea8" }}>LEADERSHIP: ELITE</span>
          </div>
        </div>
      </div>
    </PanelWrapper>
  );
}
