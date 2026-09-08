"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Tilt } from "react-tilt";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "./HigherOrderComponents";
import { Sparkles, Code2, ExternalLink, ShieldCheck, Trophy, Layers, X, ArrowUpRight, Cpu, Eye } from "lucide-react";

// Categorized Metadata & Highlights
const PROJECT_METADATA: Record<string, { badge: string; impact: string; category: string; color: string }> = {
  "Dr. Glance AI": {
    badge: "Patent Pending · AIU Anveshan 2025",
    impact: "Early detection of oral & eye pathologies using CNNs and MediaPipe.",
    category: "AI & MedTech",
    color: "#00cea8",
  },
  "Agentic Monitor": {
    badge: "Multi-Agent System · Vercel Live",
    impact: "Autonomous telemetry monitoring with dynamic anomaly alerting.",
    category: "Agentic AI & Web",
    color: "#915eff",
  },
  MedBridge: {
    badge: "Patent Pending · Healthcare Integration",
    impact: "AI-driven preliminary screening for low-resource environments.",
    category: "AI & MedTech",
    color: "#00aaff",
  },
  NauvriQuest: {
    badge: "Hack AI Season 2 Winner (3rd Place)",
    impact: "AppliAI resume optimizer & career chatbot engine.",
    category: "Hackathon Winners",
    color: "#ffa116",
  },
  "T-Rex Sports AI": {
    badge: "SIH 2025 Grand Finale Nominee",
    impact: "Computer Vision platform tracking real-time athletic biomechanics.",
    category: "Hackathon Winners",
    color: "#ff3333",
  },
};

const CATEGORIES = ["All Innovations", "AI & MedTech", "Agentic AI & Web", "Hackathon Winners"];

const Works = () => {
  const [activeCategory, setActiveCategory] = useState("All Innovations");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === "All Innovations") return true;
    const meta = PROJECT_METADATA[project.name];
    return meta?.category === activeCategory;
  });

  return (
    <div className="w-full relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#915eff]/10 via-[#00cea8]/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Header */}
      <motion.div variants={textVariant()} className="text-center flex flex-col items-center">
        <div className="futuristic-badge mb-3 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#00cea8]" />
          <span>Engineering Portfolio Showcase</span>
        </div>
        <h2 className="sectionHeadText">Featured Projects.</h2>
        <p className="sectionSubText mt-2">Real-world AI Systems, Patent-Pending MedTech, & Hackathon Platforms</p>
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
              {category === "All Innovations" && <Layers className="w-3.5 h-3.5" />}
              {category === "AI & MedTech" && <ShieldCheck className="w-3.5 h-3.5 text-[#00cea8]" />}
              {category === "Agentic AI & Web" && <Cpu className="w-3.5 h-3.5 text-[#915eff]" />}
              {category === "Hackathon Winners" && <Trophy className="w-3.5 h-3.5 text-yellow-400" />}
              <span>{category}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full relative z-10">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
            const meta = PROJECT_METADATA[project.name] || {
              badge: "Production Build",
              impact: project.description,
              category: "Web",
              color: "#915eff",
            };

            return (
              <motion.div
                key={project.name}
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
                    onClick={() => setSelectedProject(project)}
                    className="relative bg-[#0c0c1d]/85 p-6 rounded-[30px] border border-white/10 backdrop-blur-xl h-full flex flex-col justify-between group transition-all duration-500 hover:border-[#00cea8]/50 shadow-2xl hover:shadow-[0_15px_40px_rgba(0,206,168,0.2)] overflow-hidden cursor-pointer"
                  >
                    {/* Ambient Radial Shimmer */}
                    <div
                      className="absolute -top-20 -left-20 w-40 h-40 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
                      style={{ background: meta.color }}
                    />

                    <div>
                      {/* Project Image Box with Hover Overlay */}
                      <div className="relative w-full h-[220px] rounded-[22px] overflow-hidden border border-white/10 mb-5">
                        <Image
                          src={project.image}
                          fill
                          alt={project.name}
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c1d] via-transparent to-transparent opacity-80" />

                        {/* Top Badge */}
                        <div className="absolute top-3 left-3 z-10">
                          <span
                            className="px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-black/75 border border-white/15 backdrop-blur-md flex items-center gap-1.5 shadow-lg"
                            style={{ color: meta.color }}
                          >
                            <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: meta.color }} />
                            {meta.badge}
                          </span>
                        </div>

                        {/* Hover Quick Action Controls */}
                        <div className="absolute inset-0 z-20 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-[2px]">
                          {project.source_code_link && (
                            <Link
                              href={project.source_code_link}
                              target="_blank"
                              onClick={(e) => e.stopPropagation()}
                              className="w-11 h-11 rounded-full bg-black/80 border border-white/20 flex items-center justify-center text-white hover:text-[#00cea8] hover:border-[#00cea8] transition-all shadow-xl hover:scale-110"
                            >
                              <Code2 className="w-5 h-5" />
                            </Link>
                          )}
                          <Link
                            href={project.deploy_link}
                            target="_blank"
                            onClick={(e) => e.stopPropagation()}
                            className="w-11 h-11 rounded-full bg-black/80 border border-white/20 flex items-center justify-center text-white hover:text-[#00cea8] hover:border-[#00cea8] transition-all shadow-xl hover:scale-110"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProject(project);
                            }}
                            className="w-11 h-11 rounded-full bg-gradient-to-r from-[#915eff] to-[#00cea8] flex items-center justify-center text-white shadow-xl hover:scale-110"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Project Title & Impact */}
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-extrabold text-2xl tracking-tight group-hover:text-[#00cea8] transition-colors">
                          {project.name}
                        </h3>
                        <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-[#00cea8] transition-colors" />
                      </div>
                      <p className="text-secondary text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Tag Pills */}
                    <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={`${project.name}-${tag.name}`}
                          className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white transition-colors"
                        >
                          #{tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Holographic Project Deep Dive Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            {/* Modal Content Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-2xl bg-[#0c0c1d] border border-[#00cea8]/50 rounded-[32px] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,206,168,0.3)] z-10 overflow-hidden flex flex-col gap-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-[#00cea8] flex items-center justify-center text-white/70 hover:text-white transition-all z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image Header */}
              <div className="relative w-full h-[240px] rounded-[24px] overflow-hidden border border-white/10">
                <Image
                  src={selectedProject.image}
                  fill
                  alt={selectedProject.name}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c1d] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#00cea8]/20 border border-[#00cea8]/50 text-[#00cea8] backdrop-blur-md">
                    {PROJECT_METADATA[selectedProject.name]?.badge || "Production System"}
                  </span>
                </div>
              </div>

              {/* Title & Full Description */}
              <div>
                <h3 className="text-white text-3xl font-extrabold font-sans tracking-tight mb-2">
                  {selectedProject.name}
                </h3>
                <p className="text-secondary text-base leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
                {selectedProject.source_code_link && (
                  <Link
                    href={selectedProject.source_code_link}
                    target="_blank"
                    className="flex-1 py-3.5 px-6 rounded-2xl font-bold font-mono text-xs uppercase tracking-wider bg-white/5 border border-white/15 text-white hover:bg-white/10 hover:border-white/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Code2 className="w-4 h-4" />
                    <span>View GitHub Source</span>
                  </Link>
                )}
                <Link
                  href={selectedProject.deploy_link}
                  target="_blank"
                  className="flex-1 py-3.5 px-6 rounded-2xl font-bold font-mono text-xs uppercase tracking-wider bg-gradient-to-r from-[#915eff] to-[#00cea8] text-white shadow-[0_0_20px_rgba(0,206,168,0.4)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live System</span>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SectionWrapper(Works, "works");
