"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SectionWrapper } from "./HigherOrderComponents";
import { technologies } from "../constants";
import { textVariant } from "../utils/motion";
import { Cpu, Code2, Wrench, Layers, Sparkles, CheckCircle2, Zap } from "lucide-react";

// Technology Metadata & Experience Level
const TECH_META: Record<string, { category: string; level: number; projects: string[]; color: string }> = {
  Python: { category: "AI & ML", level: 95, projects: ["Dr. Glance AI", "MIRA Multimodal", "MedBridge"], color: "#3776ab" },
  FastAPI: { category: "AI & ML", level: 92, projects: ["MIRA Voice Engine", "Stock Sense", "Dr. Glance API"], color: "#009688" },
  Docker: { category: "Tools", level: 88, projects: ["Containerized Workflows", "MIRA Sandboxing"], color: "#2496ed" },
  "React JS": { category: "Full Stack", level: 92, projects: ["Portfolio", "NauvriQuest", "MedBridge"], color: "#61dafb" },
  "Next.JS": { category: "Full Stack", level: 94, projects: ["Tisa's Universe", "Agentic Monitor"], color: "#ffffff" },
  TensorFlow: { category: "AI & ML", level: 88, projects: ["Dr. Glance CNN", "Health Vision"], color: "#ff6f00" },
  OpenCV: { category: "AI & ML", level: 90, projects: ["Facial Tracking", "Oral & Eye Diagnostics"], color: "#5c3ee8" },
  Flask: { category: "AI & ML", level: 85, projects: ["MedTech API", "Model Server"], color: "#000000" },
  "Node JS": { category: "Full Stack", level: 86, projects: ["Backend Services", "NauvriQuest"], color: "#68a063" },
  MongoDB: { category: "Full Stack", level: 84, projects: ["NauvriQuest DB", "Patient Records"], color: "#47a248" },
  MySQL: { category: "Full Stack", level: 88, projects: ["Core Relational Schemas", "System Logs"], color: "#00758f" },
  "Tailwind CSS": { category: "Full Stack", level: 96, projects: ["Tisa-Verse UI", "Dr. Glance Dashboard"], color: "#38bdf8" },
  "Three JS": { category: "Full Stack", level: 90, projects: ["3D Portfolio", "Tisa's Universe Galaxy"], color: "#915eff" },
  git: { category: "Tools", level: 92, projects: ["850+ Commits", "CI/CD Workflows"], color: "#f05032" },
  Vercel: { category: "Tools", level: 94, projects: ["Production Deployments", "Agentic Monitor"], color: "#00cea8" },
};

const CATEGORIES = ["All", "AI & ML", "Full Stack", "Tools"];

const Tech = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTech, setActiveTech] = useState<string | null>("Python");

  const filteredTechnologies = technologies.filter((tech) => {
    if (activeCategory === "All") return true;
    const meta = TECH_META[tech.name];
    return meta?.category === activeCategory;
  });

  const activeMeta = activeTech ? TECH_META[activeTech] : null;

  return (
    <div className="w-full relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#915eff]/10 via-[#00cea8]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Section Header */}
      <motion.div variants={textVariant()} className="text-center flex flex-col items-center">
        <div className="futuristic-badge mb-3 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#00cea8]" />
          <span>Architecture & Tooling</span>
        </div>
        <h2 className="sectionHeadText">Technologies.</h2>
        <p className="sectionSubText mt-2">Interactive Holographic Tech Stack & Neural Matrix</p>
      </motion.div>

      {/* Category Filter Pills */}
      <div className="mt-10 flex flex-wrap justify-center items-center gap-3 z-10 relative">
        {CATEGORIES.map((category) => {
          const isActive = activeCategory === category;
          return (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold font-mono tracking-wider transition-all duration-300 flex items-center gap-2 border ${
                isActive
                  ? "bg-gradient-to-r from-[#915eff] to-[#00cea8] text-white border-transparent shadow-[0_0_20px_rgba(0,206,168,0.4)]"
                  : "bg-[#0c0c1d]/60 text-secondary border-white/10 hover:border-white/30 hover:text-white backdrop-blur-md"
              }`}
            >
              {category === "All" && <Layers className="w-3.5 h-3.5" />}
              {category === "AI & ML" && <Cpu className="w-3.5 h-3.5 text-[#00cea8]" />}
              {category === "Full Stack" && <Code2 className="w-3.5 h-3.5 text-[#915eff]" />}
              {category === "Tools" && <Wrench className="w-3.5 h-3.5 text-yellow-400" />}
              <span>{category}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Main Tech Grid */}
      <div className="mt-16 flex flex-wrap justify-center items-center gap-8 max-w-6xl mx-auto relative z-10">
        <AnimatePresence mode="popLayout">
          {filteredTechnologies.map((technology, idx) => {
            const meta = TECH_META[technology.name] || { category: "Dev", level: 90, projects: [], color: "#915eff" };
            const isSelected = activeTech === technology.name;

            return (
              <motion.div
                key={technology.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                whileHover={{ scale: 1.08, y: -8 }}
                onMouseEnter={() => setActiveTech(technology.name)}
                onClick={() => setActiveTech(technology.name)}
                className="relative cursor-pointer group"
              >
                {/* Floating Glassmorphism Orb Capsule */}
                <div
                  className={`w-32 h-36 sm:w-36 sm:h-40 rounded-[32px] p-4 bg-[#0c0c1d]/80 backdrop-blur-xl border flex flex-col items-center justify-between transition-all duration-500 shadow-2xl overflow-hidden ${
                    isSelected
                      ? "border-[#00cea8] shadow-[0_0_30px_rgba(0,206,168,0.3)] bg-[#0c0c1d]"
                      : "border-white/10 group-hover:border-white/30"
                  }`}
                >
                  {/* Background Radial Color Aura */}
                  <div
                    className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-[32px] pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 30%, ${meta.color}, transparent 70%)`,
                    }}
                  />

                  {/* Spinning Ring on Hover */}
                  <div
                    className="absolute inset-2 rounded-[26px] border border-dashed opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
                    style={{ borderColor: meta.color }}
                  />

                  {/* Icon Container */}
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 mt-2 flex items-center justify-center">
                    <Image
                      src={technology.icon}
                      alt={technology.name}
                      fill
                      className="object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.3)] transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Name Tag */}
                  <div className="flex flex-col items-center z-10">
                    <span className="text-white text-xs font-bold font-sans tracking-wide text-center">
                      {technology.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#00cea8] font-semibold mt-0.5">
                      {meta.level}% Mastery
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Interactive Telemetry Detail Badge (Inspector Bar) */}
      <AnimatePresence>
        {activeTech && activeMeta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mt-14 max-w-2xl mx-auto p-6 rounded-[28px] border border-[#00cea8]/40 bg-[#0c0c1d]/90 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,206,168,0.2)] flex flex-col sm:flex-row items-center justify-between gap-6 z-20 relative"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-2.5 shadow-inner">
                <Image
                  src={technologies.find((t) => t.name === activeTech)?.icon || "/tech/python.svg"}
                  width={40}
                  height={40}
                  alt={activeTech}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-bold text-lg font-sans">{activeTech}</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-[#00cea8]/20 border border-[#00cea8]/40 text-[#00cea8]">
                    {activeMeta.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-28 bg-white/10 h-2 rounded-full overflow-hidden border border-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${activeMeta.level}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-[#915eff] to-[#00cea8] rounded-full"
                    />
                  </div>
                  <span className="text-xs font-mono font-bold text-white">{activeMeta.level}%</span>
                </div>
              </div>
            </div>

            {/* Projects Built Pill */}
            <div className="flex flex-col items-center sm:items-end gap-1">
              <span className="text-[10px] font-mono text-secondary uppercase tracking-widest font-bold">Integrated Projects</span>
              <div className="flex flex-wrap gap-1.5 justify-center sm:justify-end">
                {activeMeta.projects.map((proj) => (
                  <span key={proj} className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-white/5 border border-white/10 text-white flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#00cea8]" />
                    {proj}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SectionWrapper(Tech, "tech");
