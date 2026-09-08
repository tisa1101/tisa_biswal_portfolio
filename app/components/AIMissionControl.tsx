"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Types & Constants ──────────────────────────────────────────

interface Drone {
  id: string;
  name: string;
  role: string;
  icon: string;
  stats: Record<string, string | number>;
  initialAngle: number;
  orbitRadiusX: number;
  orbitRadiusY: number;
  speed: number;
  color: string;
}

const DRONES: Drone[] = [
  {
    id: "drone-01",
    name: "GitHub Scanner",
    role: "Repo Telemetry",
    icon: "🐙",
    stats: { Repositories: "20+", Commits: "850+", Stars: "12", Languages: "Python, JS, Java" },
    initialAngle: 0,
    orbitRadiusX: 200,
    orbitRadiusY: 85,
    speed: 0.2,
    color: "#00aaff",
  },
  {
    id: "drone-02",
    name: "LeetCode Explorer",
    role: "DSA Analytics",
    icon: "🏆",
    stats: { Solved: "350+", Rating: "1650+", Streak: "45 days", Hard: "25+" },
    initialAngle: 72,
    orbitRadiusX: 210,
    orbitRadiusY: 90,
    speed: 0.18,
    color: "#ffa116",
  },
  {
    id: "drone-03",
    name: "Codeforces Analyzer",
    role: "Competitive Sync",
    icon: "📊",
    stats: { Rating: "Pupil", Max: "1320", Contests: "15+", Rank: "Active" },
    initialAngle: 144,
    orbitRadiusX: 190,
    orbitRadiusY: 80,
    speed: 0.22,
    color: "#ff3333",
  },
  {
    id: "drone-04",
    name: "GFG Tracker",
    role: "Theory Validation",
    icon: "📚",
    stats: { Score: "450+", Articles: "2", Badges: "Gold", Problems: "180+" },
    initialAngle: 216,
    orbitRadiusX: 220,
    orbitRadiusY: 95,
    speed: 0.15,
    color: "#34a853",
  },
  {
    id: "drone-05",
    name: "HackerRank Skill",
    role: "Cert Validator",
    icon: "⭐",
    stats: { Stars: "5 Gold", Badges: "Problem Solving", Certs: "Python, SQL", Level: "Max" },
    initialAngle: 288,
    orbitRadiusX: 205,
    orbitRadiusY: 85,
    speed: 0.19,
    color: "#2ec866",
  },
];

const CONSTELLATION_NODES = [
  { id: "node-lpu", label: "LPU CSE", x: 12, y: 18, desc: "B.Tech Computer Science Engineering" },
  { id: "node-[#python]", label: "Python & AI", x: 88, y: 15, desc: "Computer Vision & ML Diagnostics" },
  { id: "node-dsa", label: "DSA & LeetCode", x: 92, y: 50, desc: "350+ solved algorithmic challenges" },
  { id: "node-medtech", label: "MedTech Innovations", x: 86, y: 82, desc: "Smart diagnostic software & agentic systems" },
  { id: "node-patents", label: "Patent Frameworks", x: 14, y: 80, desc: "2 Patents Pending in Healthcare AI" },
  { id: "node-hacks", label: "Hackathon Victories", x: 8, y: 48, desc: "SIH Grand Finale & Hack AI Winner" },
];

const DASHBOARDS = [
  { name: "GitHub", status: "ONLINE", icon: "🐙", value: "850+ Commits", sparkline: [10, 15, 8, 25, 18, 30, 40], color: "#00aaff" },
  { name: "LeetCode", status: "ONLINE", icon: "🏆", value: "350+ Solved", sparkline: [2, 5, 12, 8, 15, 20, 28], color: "#ffa116" },
  { name: "Codeforces", status: "ONLINE", icon: "📊", value: "Pupil Rank", sparkline: [5, 8, 6, 12, 10, 15, 14], color: "#ff3333" },
];

export default function AIMissionControl() {
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [activeDrone, setActiveDrone] = useState<string | null>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setOrbitAngle((prev) => (prev + 0.25) % 360);
    }, 30);

    const clock = setInterval(() => {
      const d = new Date();
      setCurrentTime(d.toTimeString().split(" ")[0]);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(clock);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
      {/* ── Outer Orbital Grid & Atmosphere Halo ── */}
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none">
        <circle cx="50%" cy="50%" r="35%" fill="none" stroke="rgba(0,206,168,0.3)" strokeWidth="1" strokeDasharray="6 6" />
        <circle cx="50%" cy="50%" r="42%" fill="none" stroke="rgba(145,94,255,0.25)" strokeWidth="1" strokeDasharray="3 9" />
        
        {/* Draw subtle constellation perimeter lines */}
        {CONSTELLATION_NODES.map((node, i) => {
          const nextNode = CONSTELLATION_NODES[(i + 1) % CONSTELLATION_NODES.length];
          return (
            <line
              key={`line-${node.id}`}
              x1={`${node.x}%`}
              y1={`${node.y}%`}
              x2={`${nextNode.x}%`}
              y2={`${nextNode.y}%`}
              stroke="rgba(145,94,255,0.25)"
              strokeWidth="0.8"
              strokeDasharray="4 8"
            />
          );
        })}
      </svg>

      {/* ── Outer Perimeter Constellation Milestones ── */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto">
        {CONSTELLATION_NODES.map((node) => (
          <div
            key={node.id}
            className="absolute cursor-pointer flex items-center justify-center group"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
          >
            {/* Glowing node point */}
            <motion.div
              animate={{
                scale: activeNode === node.id ? 1.4 : [1, 1.2, 1],
                backgroundColor: activeNode === node.id ? "#00cea8" : "#915eff",
                boxShadow: activeNode === node.id 
                  ? "0 0 20px #00cea8, 0 0 40px #00cea8" 
                  : "0 0 8px rgba(145,94,255,0.5)",
              }}
              transition={{ repeat: activeNode === node.id ? 0 : Infinity, duration: 2.5 }}
              className="w-3 h-3 rounded-full border border-white/50"
            />

            {/* Clean Pill Label */}
            <span
              className="ml-3 text-[10px] font-bold text-white/70 tracking-widest uppercase whitespace-nowrap bg-black/60 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md transition-all group-hover:text-white group-hover:border-[#00cea8]/50 group-hover:bg-[#0c0c1d]"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              {node.label}
            </span>

            {/* Hover details card */}
            <AnimatePresence>
              {activeNode === node.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  className="absolute bottom-8 left-0 z-50 p-3.5 rounded-2xl border border-[#00cea8]/50 w-52 bg-[#0c0c1d]/95 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,206,168,0.25)]"
                >
                  <div className="text-[9px] font-bold text-[#00cea8] uppercase tracking-widest mb-1 font-mono">
                    Milestone Trace
                  </div>
                  <div className="text-white text-xs font-bold font-sans">{node.label}</div>
                  <div className="text-[11px] text-[#aaa6c3] mt-1 leading-normal font-sans">{node.desc}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* ── LPU Digital Campus Badge (Top Right Corner) ── */}
      <div className="absolute top-6 right-6 pointer-events-auto z-20">
        <motion.div
          whileHover={{ scale: 1.04 }}
          className="flex items-center gap-3 p-3 rounded-2xl border border-white/10 bg-[#0c0c1d]/80 backdrop-blur-xl shadow-xl"
        >
          <div className="w-9 h-9 rounded-xl border border-[#00cea8]/40 bg-[#00cea8]/10 flex items-center justify-center text-xl shadow-inner">
            🏢
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black text-white tracking-wide font-sans">LPU CSE ALUMNI</span>
            <span className="text-[10px] text-[#00cea8] font-bold font-mono tracking-wider">CGPA: 8.45 • B.Tech CSE</span>
          </div>
        </motion.div>
      </div>

      {/* ── Floating Telemetry Drones in Orbit around the 3D Desktop ── */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto">
        {DRONES.map((drone) => {
          const rad = (orbitAngle * (Math.PI / 180) * drone.speed) + drone.initialAngle;
          const droneX = drone.orbitRadiusX * Math.cos(rad);
          const droneY = drone.orbitRadiusY * Math.sin(rad);

          return (
            <div
              key={drone.id}
              className="absolute"
              style={{
                left: `calc(50% + ${droneX}px)`,
                top: `calc(38% + ${droneY}px)`,
                transform: "translate(-50%, -50%)",
                zIndex: droneY > 0 ? 30 : 5,
              }}
            >
              <motion.div
                className="relative cursor-pointer flex flex-col items-center group"
                onMouseEnter={() => setActiveDrone(drone.id)}
                onMouseLeave={() => setActiveDrone(null)}
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              >
                {/* Drone Icon Capsule */}
                <div
                  className="px-2.5 py-1.5 rounded-full border flex items-center gap-1.5 text-xs transition-all duration-300 backdrop-blur-md shadow-lg"
                  style={{
                    background: "rgba(12,12,29,0.85)",
                    borderColor: activeDrone === drone.id ? drone.color : "rgba(255,255,255,0.12)",
                    boxShadow: activeDrone === drone.id ? `0 0 20px ${drone.color}80` : "0 4px 15px rgba(0,0,0,0.3)",
                  }}
                >
                  <span className="text-sm">{drone.icon}</span>
                  <span className="text-[10px] font-bold text-white font-mono tracking-wider">{drone.name.split(" ")[0]}</span>
                </div>

                {/* Drone Stat Popover Panel */}
                <AnimatePresence>
                  {activeDrone === drone.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.85, y: 10 }}
                      className="absolute bottom-10 w-48 p-3.5 rounded-2xl border bg-[#0c0c1d]/95 backdrop-blur-xl shadow-2xl z-50"
                      style={{
                        borderColor: `${drone.color}60`,
                        boxShadow: `0 15px 35px rgba(0,0,0,0.6), 0 0 20px ${drone.color}30`,
                      }}
                    >
                      <div className="flex items-center justify-between mb-2 pb-1 border-b border-white/10">
                        <span className="text-[10px] font-black text-white uppercase tracking-wider font-sans">{drone.name}</span>
                        <span className="text-[8px] font-mono font-bold tracking-widest" style={{ color: drone.color }}>ONLINE</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        {Object.entries(drone.stats).map(([k, v]) => (
                          <div key={k} className="flex justify-between items-center text-[10px] font-mono">
                            <span className="text-[#8899cc]">{k}:</span>
                            <span className="text-white font-bold">{v}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* ── Holographic Status Sparkline Cards (Bottom Right Corner) ── */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2.5 pointer-events-auto w-52 z-20">
        <div className="text-[9px] font-bold text-white/40 tracking-[0.25em] uppercase font-mono mb-0.5">
          Live Telemetry Pulse
        </div>
        {DASHBOARDS.map((dash) => (
          <motion.div
            key={dash.name}
            whileHover={{ x: -4, scale: 1.02 }}
            className="flex items-center justify-between p-2.5 rounded-2xl border border-white/10 bg-[#0c0c1d]/85 backdrop-blur-xl cursor-pointer group shadow-xl"
          >
            <div className="flex items-center gap-2">
              <span className="text-base">{dash.icon}</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white font-sans">{dash.name}</span>
                <span className="text-[9px] text-[#8899cc] font-mono">{dash.value}</span>
              </div>
            </div>

            {/* Sparkline Graphic */}
            <svg className="w-12 h-5 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 70 20">
              <polyline
                fill="none"
                stroke={dash.color}
                strokeWidth="1.5"
                points={dash.sparkline.map((val, idx) => `${idx * 10}, ${20 - val}`).join(" ")}
              />
            </svg>

            {/* Pulsing Status Dot */}
            <div className="w-2 h-2 rounded-full bg-[#00cea8] shadow-[0_0_8px_#00cea8]" />
          </motion.div>
        ))}
      </div>

      {/* ── Top Left Space HUD Data ── */}
      <div className="absolute top-6 left-6 text-[9px] font-mono text-white/40 flex flex-col gap-1 z-20">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00cea8] animate-ping" />
          <span>SYSTEM: OPERATIONAL</span>
        </div>
        <div>UPLINK: ACTIVE · UTC {currentTime || "00:00:00"}</div>
      </div>
    </div>
  );
}
