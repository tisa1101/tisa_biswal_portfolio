"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Tilt } from "react-tilt";
import { textVariant, fadeIn } from "@/app/utils/motion";
import { SectionWrapper } from "./HigherOrderComponents";
import { Trophy, Award, Sparkles, ExternalLink, ShieldCheck, ArrowRight, Zap, CheckCircle2, X, Code2, Globe, Mail, FileText } from "lucide-react";

interface RecognitionItem {
  id: string;
  isFeatured?: boolean;
  rankBadge: string;
  title: string;
  subtitle: string;
  description: string;
  event: string;
  year: string;
  xp: string;
  tags: string[];
  link: string;
  icon: string;
}

const RECOGNITION_ITEMS: RecognitionItem[] = [
  {
    id: "sih-2025",
    isFeatured: true,
    rankBadge: "★ FEATURED RECOGNITION · GRAND FINALE",
    title: "Smart India Hackathon 2025",
    subtitle: "Grand Finale Nominee (Ministry of Education)",
    description:
      "Nominated to the Grand Finale of SIH 2025 for developing T-Rex, an AI-powered sports performance tracking platform using real-time Computer Vision and biomechanics analysis.",
    event: "Smart India Hackathon 2025",
    year: "2025",
    xp: "+1,200 XP",
    tags: ["AI / COMPUTER VISION", "TEAM ACHIEVEMENT", "SPORTS BIOMECHANICS"],
    link: "https://github.com/tisa1101",
    icon: "/tech/github.webp",
  },
  {
    id: "hack-ai-season-2",
    rankBadge: "🥉 3RD PLACE WINNER",
    title: "Hack AI Season 2",
    subtitle: "LPU 24-Hour AI Hackathon",
    description:
      "Secured 3rd Place out of 100+ teams for NauvriQuest, an AI-powered career platform featuring AppliAI resume optimization and intelligent career guidance.",
    event: "Hack AI Season 2 (LPU)",
    year: "2026",
    xp: "+800 XP",
    tags: ["AI • INNOVATION", "APPLIAI", "CAREER ENGINE"],
    link: "https://github.com/tisa1101",
    icon: "/creator.webp",
  },
  {
    id: "anveshan-2025",
    rankBadge: "🏆 PROTOTYPE MARATHON",
    title: "Anveshan 2025–26",
    subtitle: "AIU Student Research Convention",
    description:
      "Selected for AIU's Anveshan Prototype Marathon under Health Sciences & Allied Subjects at LPU for Dr. Glance AI smart healthcare monitoring system.",
    event: "Association of Indian Universities (AIU)",
    year: "2025",
    xp: "+900 XP",
    tags: ["AI • HEALTHCARE", "PATENT PENDING", "HEALTH SCIENCES"],
    link: "https://github.com/tisa1101",
    icon: "/web.webp",
  },
];

const Feedbacks = () => {
  const [selectedRecognition, setSelectedRecognition] = useState<RecognitionItem | null>(null);

  const featured = RECOGNITION_ITEMS.find((item) => item.isFeatured);
  const secondaryItems = RECOGNITION_ITEMS.filter((item) => !item.isFeatured);

  return (
    <div className="mt-20 relative w-full select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-gradient-to-tr from-[#915eff]/10 via-[#00cea8]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* ── 1. Hero Header Section ── */}
      <motion.div variants={textVariant()} className="text-center flex flex-col items-center">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-white/15 text-xs font-mono font-bold text-[#00cea8] tracking-widest uppercase mb-3 shadow-lg backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#00cea8] animate-ping" />
          <span>GLOBAL RECOGNITION · VERIFIED ACHIEVEMENTS</span>
        </div>
        <h2 className="sectionHeadText">Achievements & Socials.</h2>
        <p className="sectionSubText mt-2 max-w-2xl">
          Milestones, competitions, and recognitions that shaped my journey.
        </p>

        {/* Live Status Indicators */}
        <div className="mt-4 flex items-center justify-center gap-4 text-[10px] font-mono font-bold text-white/50 uppercase tracking-widest">
          <span className="flex items-center gap-1.5 text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            VERIFIED CREDENTIALS
          </span>
          <span>•</span>
          <span>03 MAJOR RECOGNITIONS</span>
        </div>
      </motion.div>

      {/* ── 2. Asymmetric Recognition Grid (Featured Card + 2 Secondary Cards) ── */}
      <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8 w-full relative z-10">
        {/* Featured Recognition Card (Spans 2 Columns on Large Screens) */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div
              onClick={() => setSelectedRecognition(featured)}
              className="relative bg-[#0c0c1d]/90 p-8 sm:p-10 rounded-[34px] border border-[#00cea8]/50 backdrop-blur-xl h-full flex flex-col justify-between group transition-all duration-500 hover:border-[#00cea8] shadow-[0_15px_50px_rgba(0,206,168,0.25)] overflow-hidden cursor-pointer"
            >
              {/* Corner Pulsing Badge */}
              <div className="absolute top-0 right-0 bg-gradient-to-l from-[#00cea8] to-[#915eff] text-black font-mono text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-bl-2xl shadow-lg">
                ★ FEATURED RECOGNITION
              </div>

              {/* Shimmer Light Beam */}
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-br from-[#915eff]/20 to-[#00cea8]/20 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />

              <div>
                {/* Header Rank */}
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-6 h-6 text-yellow-400 animate-bounce" />
                  <span className="text-yellow-400 font-mono text-xs font-black uppercase tracking-widest">
                    {featured.rankBadge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-white text-3xl sm:text-4xl font-extrabold font-sans tracking-tight mb-2 group-hover:text-[#00cea8] transition-colors">
                  {featured.title}
                </h3>
                <p className="text-[#00cea8] text-sm font-mono font-semibold mb-5">
                  {featured.subtitle}
                </p>

                {/* Description Narrative */}
                <p className="text-white/90 text-base leading-relaxed mb-8 max-w-2xl font-sans">
                  &quot;{featured.description}&quot;
                </p>
              </div>

              <div>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-1.5 rounded-full text-[10px] font-mono font-bold bg-white/5 border border-white/15 text-white/90"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Card Footer: XP & Launch */}
                <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-green-400 font-mono font-black text-lg">
                    <Zap className="w-5 h-5 text-green-400" />
                    <span>{featured.xp}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRecognition(featured);
                    }}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#915eff] to-[#00cea8] text-white font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,206,168,0.4)] hover:scale-105 transition-transform flex items-center gap-2"
                  >
                    <span>VIEW RECOGNITION</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Secondary Recognition Cards (Stacked in Right Column) */}
        <div className="flex flex-col gap-8">
          {secondaryItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <div
                onClick={() => setSelectedRecognition(item)}
                className="relative bg-[#0c0c1d]/85 p-7 rounded-[30px] border border-white/10 backdrop-blur-xl h-full flex flex-col justify-between group transition-all duration-500 hover:border-[#00cea8]/50 shadow-2xl hover:shadow-[0_15px_40px_rgba(0,206,168,0.2)] overflow-hidden cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono font-black text-yellow-400 uppercase tracking-widest">
                      {item.rankBadge}
                    </span>
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest bg-black/40 px-2.5 py-0.5 rounded-full border border-white/10">
                      {item.year}
                    </span>
                  </div>

                  <h3 className="text-white text-2xl font-bold font-sans tracking-tight mb-1 group-hover:text-[#00cea8] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[#00cea8] text-xs font-mono mb-3">{item.subtitle}</p>

                  <p className="text-secondary text-xs leading-relaxed opacity-90 line-clamp-3 mb-4">
                    {item.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-md text-[9px] font-mono bg-white/5 border border-white/10 text-white/80"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-green-400 font-mono font-extrabold text-sm flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5" /> {item.xp}
                    </span>
                    <span className="text-white/60 group-hover:text-[#00cea8] text-xs font-mono font-bold flex items-center gap-1 transition-colors">
                      <span>VIEW</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── 3. Recognition Journey Timeline Strip (2025 → 2026) ── */}
      <div className="mt-16 relative w-full max-w-4xl mx-auto p-6 rounded-[28px] bg-black/40 border border-white/10 backdrop-blur-md overflow-hidden">
        <div className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-[0.25em] text-center mb-4">
          RECOGNITION JOURNEY (2025 → 2026)
        </div>
        <div className="relative flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="absolute top-1/2 left-6 right-6 h-1 bg-gradient-to-r from-[#915eff] via-[#00cea8] to-[#915eff] -translate-y-1/2 hidden md:block opacity-40" />

          {[
            { year: "2025", title: "Smart India Hackathon", detail: "Grand Finale Nominee (T-Rex)" },
            { year: "2025", title: "AIU Anveshan Marathon", detail: "Health Sciences Selection" },
            { year: "2026", title: "Hack AI Season 2", detail: "3rd Place Winner (NauvriQuest)" },
          ].map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ scale: 1.05 }}
              className="relative z-10 flex flex-col items-center text-center p-3.5 rounded-2xl bg-[#0c0c1d] border border-white/15 backdrop-blur-xl w-full md:w-56 shadow-xl cursor-pointer"
            >
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#00cea8]/20 text-[#00cea8] border border-[#00cea8]/40 mb-1">
                {item.year}
              </span>
              <span className="text-white text-xs font-bold font-sans">{item.title}</span>
              <span className="text-[10px] text-secondary font-mono mt-1">{item.detail}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── 4. Compact Achievement Stats Strip ── */}
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {[
          { num: "03", label: "Major Recognitions", color: "#00cea8" },
          { num: "02", label: "Hackathon Victories", color: "#915eff" },
          { num: "01", label: "Grand Finale Nominee", color: "#ffa116" },
          { num: "03+", label: "MedTech Projects", color: "#ff3333" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="p-5 rounded-2xl bg-[#0c0c1d]/80 border border-white/10 text-center backdrop-blur-md flex flex-col items-center justify-center shadow-lg"
          >
            <span className="text-3xl font-black font-sans tracking-tight" style={{ color: stat.color }}>
              {stat.num}
            </span>
            <span className="text-xs font-mono font-bold text-white/70 mt-1 uppercase tracking-wider">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* ── 5. Dedicated Social Proof & Explore My Work Area ── */}
      <div className="mt-16 p-8 sm:p-10 rounded-[32px] bg-gradient-to-r from-[#151030] via-[#0c0c1d] to-[#151030] border border-[#915eff]/30 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#915eff] to-transparent" />

        <span className="text-xs font-mono text-[#00cea8] font-bold uppercase tracking-[0.3em] mb-2">EXPLORE MY WORK</span>
        <h3 className="text-white text-2xl sm:text-3xl font-black font-sans mb-3">Connect & Review Verification Repositories</h3>
        <p className="text-secondary text-sm max-w-xl mb-8 font-sans">
          Explore complete open-source codebases, competitive programming benchmarks, and patent frameworks.
        </p>

        {/* Elegant Icon Social Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4">
          <Link
            href="https://github.com/tisa1101"
            target="_blank"
            className="px-6 py-3.5 rounded-2xl bg-black/60 border border-white/15 hover:border-[#00cea8] text-white hover:text-[#00cea8] font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2.5 shadow-xl hover:scale-105"
          >
            <Code2 className="w-4 h-4 text-[#00cea8]" />
            <span>GitHub Profile</span>
          </Link>
          <Link
            href="https://linkedin.com/in/tisa-biswal"
            target="_blank"
            className="px-6 py-3.5 rounded-2xl bg-black/60 border border-white/15 hover:border-[#00cea8] text-white hover:text-[#00cea8] font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2.5 shadow-xl hover:scale-105"
          >
            <Globe className="w-4 h-4 text-[#00cea8]" />
            <span>LinkedIn Profile</span>
          </Link>
          <Link
            href="mailto:tisabiswal1101@gmail.com"
            className="px-6 py-3.5 rounded-2xl bg-black/60 border border-white/15 hover:border-[#00cea8] text-white hover:text-[#00cea8] font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2.5 shadow-xl hover:scale-105"
          >
            <Mail className="w-4 h-4 text-[#00cea8]" />
            <span>Email Contact</span>
          </Link>
          <Link
            href="/resume/Resume.pdf"
            target="_blank"
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#915eff] to-[#00cea8] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(0,206,168,0.4)] hover:scale-105 transition-transform flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Download Resume</span>
          </Link>
        </div>
      </div>

      {/* ── 6. "✦ RECOGNITION UNLOCKED" Modal Dialog ── */}
      <AnimatePresence>
        {selectedRecognition && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRecognition(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-xl"
            />

            {/* Modal Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-xl bg-[#0c0c1d] border border-[#00cea8]/50 rounded-[32px] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,206,168,0.4)] z-10 overflow-hidden flex flex-col gap-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedRecognition(null)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-[#00cea8] flex items-center justify-center text-white/70 hover:text-white transition-all z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Unlocked Banner */}
              <div className="flex items-center gap-3 bg-gradient-to-r from-[#915eff]/20 to-[#00cea8]/20 border border-white/15 p-4 rounded-2xl">
                <Trophy className="w-8 h-8 text-yellow-400 animate-bounce shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-mono font-black text-[#00cea8] uppercase tracking-widest">
                    ✦ RECOGNITION UNLOCKED
                  </span>
                  <span className="text-white text-xs font-semibold">{selectedRecognition.rankBadge}</span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-white text-3xl font-extrabold font-sans tracking-tight mb-1">
                  {selectedRecognition.title}
                </h3>
                <span className="text-[#00cea8] text-xs font-mono font-bold">{selectedRecognition.subtitle}</span>
              </div>

              {/* Narrative */}
              <p className="text-white/90 text-sm leading-relaxed font-sans">
                {selectedRecognition.description}
              </p>

              {/* Key Details */}
              <div className="flex flex-col gap-2 p-4 rounded-2xl bg-black/40 border border-white/10 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-secondary">Event / Org:</span>
                  <span className="text-white font-bold">{selectedRecognition.event}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">Year:</span>
                  <span className="text-white font-bold">{selectedRecognition.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary">XP Gained:</span>
                  <span className="text-green-400 font-bold">{selectedRecognition.xp}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href={selectedRecognition.link}
                  target="_blank"
                  className="w-full py-3.5 px-6 rounded-2xl font-bold font-mono text-xs uppercase tracking-wider bg-gradient-to-r from-[#915eff] to-[#00cea8] text-white shadow-[0_0_20px_rgba(0,206,168,0.4)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Verify External Credential / GitHub Repo</span>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "feedbacks");
