"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { SectionWrapper } from "@/app/components/HigherOrderComponents";
import { experiences } from "@/app/constants";
import { textVariant, fadeIn } from "@/app/utils/motion";
import { Award, Briefcase, Calendar, Sparkles, ChevronRight, CheckCircle2, ShieldCheck, Zap, Shield, Trophy, Flame, Building2 } from "lucide-react";

// Categorized Tags & Icons for Experience Items
const EXPERIENCE_TAGS: Record<number, string[]> = {
  0: ["ASP.NET Core", "C# / .NET 8", "RAG Pipelines", "React & TypeScript", "SQL Server", "Docker"],
  1: ["Python", "CNNs", "Computer Vision", "MediaPipe", "OpenCV", "Patent Pending"],
  2: ["AI Agents", "Next.js", "Zustand", "System Telemetry", "Vercel"],
  3: ["Healthcare AI", "Patient Integration", "Full Stack", "Patent Pending"],
  4: ["24h Hackathon", "3rd Place Winner", "AppliAI", "React", "AI Chatbot"],
};

const CATEGORIES = ["All", "Corporate & Systems", "AI & MedTech", "Agentic AI", "Hackathons & Honors"];

export function ExperienceSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const filteredExperiences = experiences.filter((exp, idx) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Corporate & Systems") return idx === 0;
    if (activeCategory === "AI & MedTech") return idx === 1 || idx === 3;
    if (activeCategory === "Agentic AI") return idx === 2;
    if (activeCategory === "Hackathons & Honors") return idx === 4;
    return true;
  });

  return (
    <div className="w-full relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#915eff]/10 via-[#00cea8]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Header */}
      <motion.div variants={textVariant()} className="text-center flex flex-col items-center">
        <div className="futuristic-badge mb-3 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#00cea8]" />
          <span>Proven Impact & Milestones</span>
        </div>
        <h2 className="sectionHeadText">Work Experience.</h2>
        <p className="sectionSubText mt-2">Pioneering AI Systems, MedTech Patents, & Competitive Wins</p>
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
              {category === "All" && <Briefcase className="w-3.5 h-3.5" />}
              {category === "Corporate & Systems" && <Building2 className="w-3.5 h-3.5 text-[#00aaff]" />}
              {category === "AI & MedTech" && <Shield className="w-3.5 h-3.5 text-[#00cea8]" />}
              {category === "Agentic AI" && <Zap className="w-3.5 h-3.5 text-[#915eff]" />}
              {category === "Hackathons & Honors" && <Trophy className="w-3.5 h-3.5 text-yellow-400" />}
              <span>{category}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Timeline Container */}
      <div className="mt-16 relative w-full max-w-5xl mx-auto flex flex-col items-center">
        {/* Animated Pulsing Timeline Center Line */}
        <div className="absolute top-0 bottom-0 left-4 md:left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-[#915eff] via-[#00cea8] to-[#915eff] opacity-30 rounded-full" />
        <motion.div
          animate={{ backgroundPositionY: ["0%", "100%"] }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
          className="absolute top-0 bottom-0 left-4 md:left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-transparent via-[#00cea8] to-transparent w-[3px] rounded-full shadow-[0_0_15px_#00cea8]"
        />

        {/* Experience List */}
        <AnimatePresence mode="wait">
          <div className="w-full flex flex-col gap-12 relative z-10">
            {filteredExperiences.map((experience, idx) => {
              const isEven = idx % 2 === 0;
              const tags = EXPERIENCE_TAGS[idx] || [];

              return (
                <motion.div
                  key={experience.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`w-full flex flex-col md:flex-row items-center justify-between gap-8 ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Card Content Column */}
                  <div className="w-full md:w-[45%] pl-12 md:pl-0">
                    <motion.div
                      whileHover={{ y: -6, scale: 1.01 }}
                      transition={{ duration: 0.3 }}
                      className={`relative p-6 sm:p-8 rounded-[28px] border bg-[#0c0c1d]/85 backdrop-blur-xl shadow-2xl transition-all duration-500 group overflow-hidden ${
                        hoveredIdx === idx
                          ? "border-[#00cea8]/50 shadow-[0_15px_40px_rgba(0,206,168,0.2)]"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      {/* Gradient Light Beam on Hover */}
                      <div className="absolute -top-24 -left-24 w-48 h-48 bg-gradient-to-br from-[#915eff]/20 to-[#00cea8]/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

                      {/* Header Badge & Date */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-gradient-to-r from-[#915eff]/20 to-[#00cea8]/20 border border-white/10 text-[#00cea8] flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-[#00cea8]" />
                          {experience.date}
                        </span>

                        {experience.points.some((p) => p.includes("Patent")) && (
                          <span className="px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-yellow-400" />
                            Patent Pending
                          </span>
                        )}
                      </div>

                      {/* Title & Company */}
                      <h3 className="text-white text-xl sm:text-2xl font-bold tracking-tight font-sans group-hover:text-white transition-colors">
                        {experience.title}
                      </h3>
                      <p className="text-[#00cea8] text-sm font-semibold mt-1 font-mono flex items-center gap-2">
                        <span>{experience.company_name}</span>
                      </p>

                      {/* Points List */}
                      <ul className="mt-5 space-y-2.5 text-secondary text-sm leading-relaxed">
                        {experience.points.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2.5">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#915eff] shrink-0 group-hover:bg-[#00cea8] transition-colors" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Tags Pills */}
                      <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-semibold bg-white/5 border border-white/10 text-white/80 hover:text-white hover:border-[#00cea8]/40 transition-colors"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Center Node Icon */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 180 }}
                      transition={{ duration: 0.4 }}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border border-white/20 bg-[#0c0c1d] shadow-[0_0_25px_rgba(145,94,255,0.4)] flex items-center justify-center p-2.5 cursor-pointer"
                      style={{ background: experience.iconBg }}
                    >
                      <Image
                        src={experience.icon}
                        width={36}
                        height={36}
                        alt={experience.company_name}
                        className="object-contain w-full h-full drop-shadow-md"
                      />
                    </motion.div>
                  </div>

                  {/* Empty Spacer Column for Desktop Grid Alignment */}
                  <div className="hidden md:block w-[45%]" />
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SectionWrapper(ExperienceSection, "work");
