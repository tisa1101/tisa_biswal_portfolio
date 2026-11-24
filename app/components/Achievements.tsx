"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Tilt } from "react-tilt";
import { SectionWrapper } from "./HigherOrderComponents";
import { textVariant, fadeIn } from "../utils/motion";
import { achievements } from "../constants";
import { Trophy, Award, Sparkles, Star, Zap, ShieldCheck, ChevronRight, X, Flame, Target, BookOpen, Crown } from "lucide-react";

// Categorized Achievement Metadata with Rarity, Skills & Timeline Year
const ACHIEVEMENT_META: Record<string, { rarity: "MYTHIC" | "LEGENDARY" | "EPIC" | "RARE"; category: string; year: string; skills: string[]; xp: number; role: string; org: string }> = {
  "Build Fast with AI Winner": {
    rarity: "MYTHIC",
    category: "HACKATHONS",
    year: "2026",
    skills: ["Multimodal AI", "Gemini 2.0 API", "FastAPI", "Live WebSockets", "RAG"],
    xp: 3000,
    role: "Hackathon Champion",
    org: "Build Fast with AI",
  },
  "HCLTech AMPlified Finalist": {
    rarity: "LEGENDARY",
    category: "HACKATHONS",
    year: "2026",
    skills: ["Full Stack Architecture", "Scalability", "Competitive Engineering"],
    xp: 1500,
    role: "Rank 16 Nationwide",
    org: "HCLTech AMPlified 2026",
  },
  "Odoo Hackathon Grand Finale": {
    rarity: "LEGENDARY",
    category: "HACKATHONS",
    year: "2026",
    skills: ["Enterprise Systems", "Business Logic", "Full Stack Development"],
    xp: 1200,
    role: "National Grand Finalist",
    org: "Odoo India",
  },
  "Smart India Hackathon Finalist": {
    rarity: "LEGENDARY",
    category: "HACKATHONS",
    year: "2025-2026",
    skills: ["Computer Vision", "Sports Biomechanics", "IoT Hardware Sync"],
    xp: 1200,
    role: "Grand Finale Nominee",
    org: "Ministry of Education (Govt. of India)",
  },
  "Academic Titan": {
    rarity: "MYTHIC",
    category: "CERTIFICATIONS",
    year: "2023",
    skills: ["Academic Excellence", "Mathematics", "Computer Science"],
    xp: 2500,
    role: "District Topper",
    org: "CISCE Board",
  },
  "State Debate Champion": {
    rarity: "LEGENDARY",
    category: "EVENTS",
    year: "2023",
    skills: ["Public Speaking", "Critical Thinking", "Eloquence"],
    xp: 1000,
    role: "2nd Position State Merit",
    org: "State Education Board",
  },
  "Event Architect": {
    rarity: "EPIC",
    category: "EVENTS",
    year: "2024",
    skills: ["Leadership", "Event Management", "Communication"],
    xp: 850,
    role: "Lead Coordinator",
    org: "Avishkar 2.0 Tech Fest",
  },
  "Ceremony Master": {
    rarity: "RARE",
    category: "EVENTS",
    year: "2024",
    skills: ["Event Direction", "Public Relations", "Team Building"],
    xp: 600,
    role: "Organizing Chair",
    org: "Graduation Commencement Committee",
  },
  "Community Leader": {
    rarity: "LEGENDARY",
    category: "LEADERSHIP",
    year: "2025",
    skills: ["Women In Tech", "Community Mentorship", "Career Outreach"],
    xp: 1200,
    role: "Student Coordinator",
    org: "Women Who Code / Career Committee",
  },
  "Literary Virtuoso": {
    rarity: "RARE",
    category: "EVENTS",
    year: "2024",
    skills: ["Story Writing", "Creative Direction", "Narrative Depth"],
    xp: 400,
    role: "District Winner",
    org: "Literary Arts Association",
  },
  "Rhythmic Performer": {
    rarity: "RARE",
    category: "EVENTS",
    year: "2023",
    skills: ["Artistic Expression", "Stage Presence", "Performance"],
    xp: 400,
    role: "District Winner",
    org: "Cultural Arts Division",
  },
};

const CATEGORIES = ["ALL", "PROJECTS", "LEADERSHIP", "HACKATHONS", "EVENTS", "CERTIFICATIONS"];

const RARITY_COLORS: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  MYTHIC: { bg: "bg-red-500/15", border: "border-red-500/50", text: "text-red-400", glow: "shadow-[0_0_20px_rgba(239,68,68,0.4)]" },
  LEGENDARY: { bg: "bg-yellow-500/15", border: "border-yellow-500/50", text: "text-yellow-400", glow: "shadow-[0_0_20px_rgba(234,179,8,0.4)]" },
  EPIC: { bg: "bg-purple-500/15", border: "border-purple-500/50", text: "text-purple-400", glow: "shadow-[0_0_20px_rgba(168,85,247,0.4)]" },
  RARE: { bg: "bg-cyan-500/15", border: "border-cyan-500/50", text: "text-cyan-400", glow: "shadow-[0_0_20px_rgba(6,182,212,0.4)]" },
};

const Achievements = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [selectedAchievement, setSelectedAchievement] = useState<typeof achievements[0] | null>(null);

  const filteredAchievements = achievements.filter((ach) => {
    if (activeCategory === "ALL") return true;
    const meta = ACHIEVEMENT_META[ach.title];
    return meta?.category === activeCategory;
  });

  return (
    <div className="mt-12 relative w-full select-none">
      {/* Ambient Radial Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#915eff]/15 via-[#00cea8]/15 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* ── 1. Hero Header Section ── */}
      <motion.div variants={textVariant()} className="text-center flex flex-col items-center">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-white/15 text-xs font-mono font-bold text-[#00cea8] tracking-widest uppercase mb-3 shadow-lg backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#00cea8] animate-ping" />
          <span>THE JOURNEY OF EXCELLENCE · SYSTEM ONLINE</span>
        </div>
        <h2 className="sectionHeadText text-gradient">Quest Log & Achievements.</h2>
        <p className="sectionSubText mt-2 max-w-2xl">
          Every project, challenge, and leadership experience is another level unlocked.
        </p>
        <div className="w-48 h-1 bg-gradient-to-r from-transparent via-[#00cea8] to-transparent rounded-full mt-4 shadow-[0_0_10px_#00cea8]" />
      </motion.div>

      {/* ── 2. Player Progress / XP Dashboard Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-12 p-6 sm:p-8 rounded-[32px] bg-[#0c0c1d]/90 border border-white/15 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-8 justify-between"
      >
        {/* Shimmer Light Beam */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-br from-[#915eff]/30 to-[#00cea8]/30 blur-3xl pointer-events-none rounded-full" />

        {/* Circular Level Ring */}
        <div className="relative flex-shrink-0 flex flex-col items-center justify-center">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-[#00cea8] p-1 flex items-center justify-center bg-[#050816] shadow-[0_0_30px_rgba(0,206,168,0.4)]">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
              <motion.circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="#915eff"
                strokeWidth="6"
                strokeDasharray="276"
                initial={{ strokeDashoffset: 276 }}
                whileInView={{ strokeDashoffset: 276 * (1 - 0.83) }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
            </svg>
            <div className="flex flex-col items-center">
              <span className="text-[#00cea8] font-mono text-xs font-bold uppercase tracking-widest">LEVEL</span>
              <span className="text-white font-black text-4xl font-sans drop-shadow-md">24</span>
            </div>
          </div>
          <span className="mt-2 text-[10px] font-mono font-bold text-yellow-400 uppercase tracking-widest bg-yellow-500/10 px-3 py-0.5 rounded-full border border-yellow-500/30">
            ★ ELITE INNOVATOR
          </span>
        </div>

        {/* Rank & XP Progress Bar */}
        <div className="flex-1 w-full flex flex-col gap-3">
          <div className="flex flex-wrap justify-between items-end gap-2">
            <div className="flex flex-col">
              <span className="text-white font-extrabold text-2xl uppercase tracking-tight font-sans">MASTER COORDINATOR</span>
              <span className="text-secondary text-xs font-mono font-semibold">Rank Status: Active Quest Leader</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#00cea8] font-mono font-bold text-sm">12,450 / 15,000 XP</span>
              <span className="text-xs font-mono text-secondary font-bold">(83%)</span>
            </div>
          </div>

          <div className="w-full bg-black/60 h-4 rounded-full overflow-hidden border border-white/10 p-0.5 shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "83%" }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-[#915eff] via-[#00cea8] to-[#915eff] bg-[length:200%_auto] rounded-full shadow-[0_0_15px_#00cea8]"
            />
          </div>

          <div className="flex justify-between items-center text-[11px] font-mono text-secondary">
            <span>2,550 XP TO NEXT LEVEL</span>
            <span className="text-[#00cea8] font-bold">NEXT RANK: REVOLUTIONIST</span>
          </div>
        </div>

        {/* 4 Player Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3 w-full lg:w-auto flex-shrink-0">
          {[
            { label: "24 Levels", value: "Level 24", icon: "⭐", color: "#00cea8" },
            { label: "18 Quests", value: "18 Complete", icon: "🎯", color: "#915eff" },
            { label: "7 Leadership Wins", value: "7 Badges", icon: "👑", color: "#ffa116" },
            { label: "12 Projects", value: "12 Systems", icon: "🚀", color: "#ff3333" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-3 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-2.5 backdrop-blur-md"
            >
              <span className="text-lg">{stat.icon}</span>
              <div className="flex flex-col">
                <span className="text-white text-xs font-bold font-sans">{stat.label}</span>
                <span className="text-[10px] text-secondary font-mono">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── 3. Category Filter Tabs ── */}
      <div className="mt-12 flex flex-wrap justify-center items-center gap-3 z-10 relative">
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
              <span>{category}</span>
            </motion.button>
          );
        })}
      </div>

      {/* ── 4. Quest Progression Timeline Beam (2023 → 2026) ── */}
      <div className="mt-14 mb-14 relative w-full max-w-4xl mx-auto p-6 rounded-[28px] bg-black/40 border border-white/10 backdrop-blur-md overflow-hidden">
        <div className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-[0.25em] text-center mb-4">
          Quest Progression Timeline (2023 → 2026)
        </div>
        <div className="relative flex flex-col md:flex-row justify-between items-center gap-6 md:gap-2">
          <div className="absolute top-1/2 left-4 right-4 h-1 bg-gradient-to-r from-[#915eff] via-[#00cea8] to-[#915eff] -translate-y-1/2 hidden md:block opacity-40" />

          {[
            { year: "2023", title: "Academic & Speech Titan", desc: "CISCE District Topper & State Debate 2nd Merit", xp: "+3,500 XP" },
            { year: "2024", title: "Event Architect", desc: "Avishkar 2.0 Lead & Commencement Chair", xp: "+1,450 XP" },
            { year: "2025", title: "Community & MedTech Lead", desc: "Women Who Code Lead & SIH Grand Finale", xp: "+2,200 XP" },
            { year: "2026", title: "Build Fast with AI Winner & Patents", desc: "Winner Build Fast with AI (MIRA), HCLTech 16th Rank, Odoo Grand Finale, 2 Patents Pending", xp: "+8,500 XP" },
          ].map((milestone) => (
            <motion.div
              key={milestone.year}
              whileHover={{ scale: 1.05, y: -4 }}
              className="relative z-10 flex flex-col items-center text-center p-3.5 rounded-2xl bg-[#0c0c1d] border border-white/15 backdrop-blur-xl w-full md:w-48 shadow-xl cursor-pointer group"
            >
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#00cea8]/20 text-[#00cea8] border border-[#00cea8]/40 mb-1">
                {milestone.year}
              </span>
              <span className="text-white text-xs font-bold font-sans group-hover:text-[#00cea8] transition-colors">{milestone.title}</span>
              <span className="text-[10px] text-secondary font-mono mt-1 line-clamp-2">{milestone.desc}</span>
              <span className="text-[10px] font-mono text-green-400 font-bold mt-2">{milestone.xp}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── 5. Achievement Cards Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 w-full relative z-10">
        <AnimatePresence mode="popLayout">
          {filteredAchievements.map((achievement, index) => {
            const meta = ACHIEVEMENT_META[achievement.title] || {
              rarity: "RARE",
              category: "EVENTS",
              year: "2024",
              skills: ["Leadership", "Innovation"],
              xp: 500,
              role: achievement.type,
              org: "Portfolio Record",
            };
            const rarityStyle = RARITY_COLORS[meta.rarity];

            return (
              <motion.div
                key={achievement.title}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Tilt
                  options={{
                    max: 12,
                    scale: 1.02,
                    speed: 400,
                  }}
                  className="h-full"
                >
                  <div
                    onClick={() => setSelectedAchievement(achievement)}
                    className="relative bg-[#0c0c1d]/85 p-6 rounded-[30px] border border-white/10 backdrop-blur-xl h-full flex flex-col justify-between group transition-all duration-500 hover:border-[#00cea8]/50 shadow-2xl hover:shadow-[0_15px_40px_rgba(0,206,168,0.25)] overflow-hidden cursor-pointer"
                  >
                    {/* Top Rarity & Status Banner */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider border ${rarityStyle.bg} ${rarityStyle.border} ${rarityStyle.text} ${rarityStyle.glow} flex items-center gap-1`}
                        >
                          ★ {meta.rarity}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-widest bg-black/40 px-2.5 py-1 rounded-full border border-white/10">
                          {achievement.level}
                        </span>
                      </div>

                      {/* Icon & Title */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-2.5 shadow-inner group-hover:scale-110 transition-transform">
                          <Image
                            src={achievement.icon}
                            width={36}
                            height={36}
                            alt={achievement.title}
                            className="object-contain"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-white font-extrabold text-xl tracking-tight group-hover:text-[#00cea8] transition-colors font-sans">
                            {achievement.title}
                          </h3>
                          <span className="text-xs text-[#00cea8] font-mono font-semibold">{meta.role}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-secondary text-xs leading-relaxed opacity-90 min-h-[50px]">
                        {achievement.description}
                      </p>

                      {/* Earned Skills Pills */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {meta.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded-md text-[9px] font-mono bg-white/5 border border-white/10 text-white/80"
                          >
                            +{skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer XP & View Quest Button */}
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-green-400 font-mono font-extrabold text-sm">
                        <Zap className="w-4 h-4 text-green-400" />
                        <span>+{meta.xp} XP</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedAchievement(achievement);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-[#00cea8] border border-white/10 hover:border-[#00cea8] text-xs font-mono font-bold text-white hover:text-black transition-all flex items-center gap-1 shadow-md"
                      >
                        <span>VIEW QUEST</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ── 6. Gamified "NEXT UNLOCK" Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-16 p-8 rounded-[32px] bg-gradient-to-r from-[#151030] via-[#0c0c1d] to-[#151030] border border-[#915eff]/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#915eff]/20 border border-[#915eff]/40 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(145,94,255,0.4)]">
            🏆
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-mono text-[#00cea8] font-bold uppercase tracking-widest">NEXT UNLOCKABLE GOAL</span>
            <h3 className="text-white text-2xl font-black font-sans">Innovation Master</h3>
            <span className="text-secondary text-xs font-mono mt-0.5">3 / 5 Project Patents & Hackathon Victories Completed</span>
          </div>
        </div>

        <div className="w-full md:w-72 flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-white font-bold">Progress: 60%</span>
            <span className="text-green-400 font-bold">+2,500 XP Reward</span>
          </div>
          <div className="w-full bg-black/60 h-3.5 rounded-full overflow-hidden border border-white/10 p-0.5">
            <div className="w-[60%] h-full bg-gradient-to-r from-[#915eff] to-[#00cea8] rounded-full shadow-[0_0_10px_#00cea8]" />
          </div>
        </div>
      </motion.div>

      {/* ── 7. "🏆 ACHIEVEMENT UNLOCKED" Modal Dialog ── */}
      <AnimatePresence>
        {selectedAchievement && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAchievement(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-xl"
            />

            {/* Modal Dialog Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-xl bg-[#0c0c1d] border border-[#00cea8]/50 rounded-[32px] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,206,168,0.4)] z-10 overflow-hidden flex flex-col gap-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedAchievement(null)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-[#00cea8] flex items-center justify-center text-white/70 hover:text-white transition-all z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Unlocked Header Banner */}
              <div className="flex items-center gap-3 bg-gradient-to-r from-[#915eff]/20 to-[#00cea8]/20 border border-white/15 p-4 rounded-2xl">
                <Trophy className="w-8 h-8 text-yellow-400 animate-bounce shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-mono font-black text-[#00cea8] uppercase tracking-widest">
                    🏆 ACHIEVEMENT UNLOCKED
                  </span>
                  <span className="text-white text-xs font-semibold">
                    {ACHIEVEMENT_META[selectedAchievement.title]?.rarity || "RARE"} • {selectedAchievement.level}
                  </span>
                </div>
              </div>

              {/* Icon & Title */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center p-3 shadow-inner">
                  <Image
                    src={selectedAchievement.icon}
                    width={48}
                    height={48}
                    alt={selectedAchievement.title}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-white text-2xl font-extrabold font-sans">{selectedAchievement.title}</h3>
                  <span className="text-[#00cea8] text-xs font-mono font-bold">
                    {ACHIEVEMENT_META[selectedAchievement.title]?.role || selectedAchievement.type}
                  </span>
                </div>
              </div>

              {/* Description & Skills */}
              <p className="text-secondary text-sm leading-relaxed">
                {selectedAchievement.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                {(ACHIEVEMENT_META[selectedAchievement.title]?.skills || ["Leadership", "Innovation"]).map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#00cea8]/15 border border-[#00cea8]/40 text-[#00cea8]">
                    +{skill}
                  </span>
                ))}
              </div>

              {/* XP Reward Banner */}
              <div className="flex justify-between items-center p-4 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-400 font-mono font-bold text-sm">
                <span>XP REWARD EARNED:</span>
                <span>+{ACHIEVEMENT_META[selectedAchievement.title]?.xp || 500} XP</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SectionWrapper(Achievements, "achievements");
