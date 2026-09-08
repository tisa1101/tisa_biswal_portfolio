"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PanelWrapper } from "./PanelWrapper";

const projects = [
  {
    name: "Dr. Glance AI",
    emoji: "👁️",
    description: "AI-based healthcare system for early detection of oral and eye conditions using Computer Vision, CNNs, and real-time facial tracking with MediaPipe.",
    tags: ["Python", "TensorFlow", "OpenCV", "MediaPipe", "CNN"],
    platform: "Patent Pending",
    github: "https://github.com/tisa1101",
    deploy: "https://github.com/tisa1101",
    image: "/projectimg/avm.webp",
    color: "#00cea8",
    metrics: [
      { label: "Model Accuracy", val: "97.2%" },
      { label: "Response Latency", val: "<120ms" },
      { label: "Inference Speed", val: "30 FPS" },
    ],
    architecture: "CNN → MediaPipe Face/Eye Mesh → OpenCV → Next.js Client",
    challenge: "Handling real-time image processing on mobile devices while keeping model weights lightweight and resource utilization minimal.",
    impact: "Enables early detection of oral and eye conditions without costly specialist visits — addressing healthcare access gaps.",
  },
  {
    name: "Agentic Monitor",
    emoji: "🤖",
    description: "Real-time AI monitoring dashboard with multi-agent architecture for autonomous system tracking, anomaly detection, and dynamic alerting.",
    tags: ["Next.js", "AI Agents", "WebSocket", "Vercel", "TypeScript"],
    platform: "Vercel",
    github: "https://github.com/tisa1101",
    deploy: "https://github.com/tisa1101",
    image: "/projectimg/sparkbright.png",
    color: "#915eff",
    metrics: [
      { label: "Anomalies Caught", val: "99.8%" },
      { label: "Sync Latency", val: "15ms" },
      { label: "Agents Deployed", val: "4" },
    ],
    architecture: "Next.js 14 → WebSocket Stream → Autonomous Decision Engine → Vercel Edge",
    challenge: "Ensuring stable, non-blocking telemetry synchronization across multi-agent processes under heavy simulation loads.",
    impact: "Reduces system downtime by proactively detecting anomalies before they become critical failures.",
  },
  {
    name: "MedBridge",
    emoji: "🏥",
    description: "AI-driven healthcare integration platform providing preliminary screening and smart recommendations for resource-constrained environments.",
    tags: ["Python", "FastAPI", "ML", "React", "PostgreSQL"],
    platform: "Patent Pending",
    github: "https://github.com/tisa1101",
    deploy: "https://github.com/tisa1101",
    image: "/projectimg/hoobank.webp",
    color: "#ff6b6b",
    metrics: [
      { label: "Diagnostic Cost", val: "-80%" },
      { label: "API Uptime", val: "99.9%" },
      { label: "Throughput", val: "5k req/m" },
    ],
    architecture: "Python FastAPI → PostgreSQL → React Client → Secure MedTech API",
    challenge: "Architecting a secure, highly scalable patient integration pipeline compliant with healthcare accessibility standards.",
    impact: "Makes preliminary health screening accessible for 800M+ people in resource-constrained environments.",
  },
  {
    name: "NauvriQuest",
    emoji: "💼",
    description: "AI-powered career platform with resume optimization (AppliAI), career guidance chatbot, and automated job aggregation. Won 3rd at Hack AI Season 2.",
    tags: ["React", "Generative AI", "Node.js", "Gemini API"],
    platform: "Web",
    github: "https://github.com/tisa1101",
    deploy: "https://github.com/tisa1101",
    image: "/projectimg/mern.png",
    color: "#ffd700",
    metrics: [
      { label: "Resume Match", val: "94%" },
      { label: "Chatbot Accuracy", val: "91%" },
      { label: "Match Time", val: "2s" },
    ],
    architecture: "React Client → Node.js → Gemini API → AppliAI Parser",
    challenge: "Generating context-aware resume optimizations utilizing constrained token sizes of Gemini LLM.",
    impact: "Placed 3rd at LPU's Hack AI Season 2 — helps job seekers optimize applications with AI precision.",
  },
  {
    name: "T-Rex Sports AI",
    emoji: "🏃",
    description: "Integrated hardware/software platform for athletes using AI for performance tracking, sports analytics, and personalized fitness insights.",
    tags: ["IoT", "Python", "OpenCV", "Next.js", "AI/ML"],
    platform: "SIH Grand Finale",
    github: "https://github.com/tisa1101",
    deploy: "https://github.com/tisa1101",
    image: "/projectimg/metaverse.png",
    color: "#00aaff",
    metrics: [
      { label: "Tracking Latency", val: "10ms" },
      { label: "Hardware Sync", val: "100%" },
      { label: "Dataset Size", val: "10k Videos" },
    ],
    architecture: "IoT Sensors → Python Backend → OpenCV Tracking → Next.js Dashboard",
    challenge: "Synchronizing low-level IoT sensor outputs with real-time computer vision sports tracking models.",
    impact: "Nominated to SIH 2025 Grand Finale — democratizes elite sports analytics for all athletes.",
  },
];

interface ProjectsCardProps {
  project: typeof projects[0];
  onClick: () => void;
}

function ProjectCard({ project, onClick }: ProjectsCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative cursor-pointer rounded-2xl overflow-hidden group"
      style={{
        background: "rgba(4,12,40,0.8)",
        border: `1px solid ${project.color}30`,
        transition: "border-color 0.3s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${project.color}70`)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${project.color}30`)}
    >
      {/* Holographic shimmer */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${project.color}08, transparent 50%, ${project.color}05)`,
        }}
      />

      {/* Image */}
      <div className="relative h-36 overflow-hidden">
        <Image src={project.image} fill alt={project.name} className="object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020c28] via-transparent to-transparent" />
        <div
          className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[9px] font-bold"
          style={{ background: `${project.color}22`, border: `1px solid ${project.color}44`, color: project.color, fontFamily: "'Space Mono', monospace" }}
        >
          {project.platform}
        </div>
        <div className="absolute top-3 left-3 text-2xl">{project.emoji}</div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-bold text-base mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {project.name}
        </h3>
        <p className="text-[#8899cc] text-xs leading-relaxed line-clamp-2 mb-3">{project.description}</p>
        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[9px] px-2 py-0.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#8899cc", fontFamily: "'Space Mono', monospace" }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-1 text-[10px] font-bold" style={{ color: project.color, fontFamily: "'Space Mono', monospace" }}>
          <span>VIEW CASE STUDY</span>
          <span>→</span>
        </div>
      </div>
    </motion.div>
  );
}

interface ProjectDetailProps {
  project: typeof projects[0];
  onClose: () => void;
}

function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(2,8,24,0.9)", backdropFilter: "blur(16px)" }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl scrollbar-thin"
        style={{ background: "rgba(4,12,40,0.98)", border: `1px solid ${project.color}40`, boxShadow: `0 0 60px ${project.color}20` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          ×
        </button>

        {/* Hero image */}
        <div className="relative h-52 overflow-hidden rounded-t-3xl">
          <Image src={project.image} fill alt={project.name} className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040c28] via-[#040c28]/40 to-transparent" />
          <div className="absolute bottom-4 left-6">
            <span className="text-3xl mr-2">{project.emoji}</span>
            <span className="text-white font-black text-2xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{project.name}</span>
            <div className="mt-1 text-[11px] font-bold" style={{ color: project.color, fontFamily: "'Space Mono', monospace" }}>{project.platform}</div>
          </div>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3">
            {project.metrics.map((m) => (
              <div key={m.label} className="rounded-2xl p-3 text-center" style={{ background: `${project.color}10`, border: `1px solid ${project.color}25` }}>
                <div className="font-black text-lg" style={{ color: project.color, fontFamily: "'Space Grotesk', sans-serif" }}>{m.val}</div>
                <div className="text-[9px] text-[#8899cc] mt-0.5" style={{ fontFamily: "'Space Mono', monospace" }}>{m.label}</div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="text-[11px] px-3 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#c0c8e8" }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Sections */}
          {[
            { icon: "📋", label: "Overview", content: project.description },
            { icon: "🏗️", label: "Architecture", content: project.architecture, mono: true },
            { icon: "⚡", label: "Engineering Challenge", content: project.challenge },
            { icon: "🌍", label: "Impact", content: project.impact },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-2">
              <div className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: "#8899cc", fontFamily: "'Space Mono', monospace" }}>
                <span>{s.icon}</span>{s.label}
              </div>
              <p className={`text-sm leading-relaxed text-white/80 ${s.mono ? "font-mono bg-black/30 p-3 rounded-xl border border-white/5 text-[12px]" : ""}`}>
                {s.content}
              </p>
            </div>
          ))}

          {/* Links */}
          <div className="flex gap-3 pt-2">
            <Link
              href={project.github}
              target="_blank"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-all hover:-translate-y-1"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}
            >
              <span>🐙</span> GitHub
            </Link>
            <Link
              href={project.deploy}
              target="_blank"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-all hover:-translate-y-1"
              style={{ background: `linear-gradient(135deg, ${project.color}cc, ${project.color}88)`, color: "white" }}
            >
              <span>🚀</span> View Project
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface ProjectsPanelProps {
  onClose: () => void;
}

export function ProjectsPanel({ onClose }: ProjectsPanelProps) {
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);

  return (
    <PanelWrapper onClose={onClose} planetName="Projects" planetEmoji="🌕" accentColor="#b0a090">
      <div className="flex flex-col gap-6">
        <div className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] mb-2" style={{ color: "#b0a090", fontFamily: "'Space Mono', monospace" }}>
            Case Studies
          </p>
          <h2 className="text-white font-black text-2xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            My Projects
          </h2>
          <p className="text-[#8899cc] text-sm mt-2">Click any project to explore its full case study, architecture, and impact.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} onClick={() => setSelected(project)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectDetail project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </PanelWrapper>
  );
}
