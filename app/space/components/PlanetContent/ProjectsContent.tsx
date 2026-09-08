"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROJECTS = [
  {
    id: 1,
    title: "MediScan AI",
    subtitle: "AI-Powered Medical Diagnosis System",
    description:
      "Deep learning model for early disease detection using chest X-rays. Achieved 96% accuracy on pneumonia classification. Deployed as a web app with real-time inference.",
    tech: ["Python", "TensorFlow", "FastAPI", "React", "OpenCV"],
    emoji: "🏥",
    color: "#00bb88",
    github: "#",
    demo: "#",
    stats: { accuracy: "96%", dataset: "10K+ images", latency: "<200ms" },
  },
  {
    id: 2,
    title: "NeuralChat",
    subtitle: "LLM-Powered Contextual Chatbot",
    description:
      "Fine-tuned transformer model for domain-specific Q&A. RAG pipeline with vector DB for 10K+ documents. Built custom embedding search for sub-second retrieval.",
    tech: ["Python", "LangChain", "Pinecone", "FastAPI", "Next.js"],
    emoji: "🧠",
    color: "#7b2fff",
    github: "#",
    demo: "#",
    stats: { queries: "50K+", docs: "10K indexed", response: "<500ms" },
  },
  {
    id: 3,
    title: "CodeCraft",
    subtitle: "Real-time Collaborative Code Editor",
    description:
      "VS Code-like online IDE with live collaboration via WebSockets. Supports 20+ languages. AI-powered code completion and error explanation.",
    tech: ["React", "Node.js", "WebSocket", "MongoDB", "Docker"],
    emoji: "💻",
    color: "#f5a623",
    github: "#",
    demo: "#",
    stats: { languages: "20+", latency: "<50ms", users: "500+" },
  },
  {
    id: 4,
    title: "TrafficVision",
    subtitle: "Computer Vision Traffic Analysis",
    description:
      "YOLOv8-based vehicle detection and counting system for smart city traffic management. Live dashboard with heatmaps and anomaly detection.",
    tech: ["Python", "YOLOv8", "OpenCV", "Flask", "React"],
    emoji: "🚦",
    color: "#ff6644",
    github: "#",
    demo: "#",
    stats: { mAP: "89%", FPS: "30+", vehicles: "8 types" },
  },
  {
    id: 5,
    title: "HealthLink",
    subtitle: "Telemedicine & Patient Management Platform",
    description:
      "Full-stack healthcare platform connecting patients and doctors. Video consultations, prescription management, and AI symptom checker.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "WebRTC", "Stripe"],
    emoji: "🩺",
    color: "#44ccff",
    github: "#",
    demo: "#",
    stats: { patients: "200+", uptime: "99.9%", features: "25+" },
  },
  {
    id: 6,
    title: "DSA Visualizer",
    subtitle: "Interactive Algorithm Visualization Tool",
    description:
      "3D visualizations for sorting algorithms, graph traversals, and data structures. Step-by-step playback with complexity analysis.",
    tech: ["React", "Three.js", "TypeScript", "D3.js"],
    emoji: "📊",
    color: "#ffcc44",
    github: "#",
    demo: "#",
    stats: { algorithms: "40+", structures: "15+", students: "1K+" },
  },
];

export function ProjectsContent() {
  const [selected, setSelected] = useState<typeof PROJECTS[0] | null>(null);

  return (
    <div className="space-y-6">
      {/* Project lab grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelected(project)}
            className="rounded-2xl p-6 cursor-pointer group"
            style={{
              background: "rgba(0,10,30,0.7)",
              border: `1px solid ${project.color}33`,
              backdropFilter: "blur(12px)",
              transition: "all 0.3s ease",
            }}
            whileHover={{
              scale: 1.02,
              borderColor: `${project.color}88`,
              boxShadow: `0 8px 40px ${project.color}22`,
            }}
          >
            <div className="text-4xl mb-3">{project.emoji}</div>
            <h3 className="text-lg font-bold text-white mb-1">{project.title}</h3>
            <p className="text-xs font-mono mb-3" style={{ color: project.color }}>
              {project.subtitle}
            </p>
            <p className="text-sm text-blue-200 leading-relaxed line-clamp-2 mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tech.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-[10px] font-mono"
                  style={{
                    background: `${project.color}15`,
                    border: `1px solid ${project.color}33`,
                    color: project.color,
                  }}
                >
                  {t}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="text-[10px] text-blue-500 px-2 py-0.5">
                  +{project.tech.length - 3} more
                </span>
              )}
            </div>
            <div className="text-xs text-blue-500 group-hover:text-blue-300 transition-colors">
              Click to explore →
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: "rgba(0,5,20,0.9)", backdropFilter: "blur(20px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="w-full max-w-2xl rounded-3xl p-8"
              style={{
                background: `linear-gradient(135deg, rgba(0,10,30,0.95), rgba(0,15,40,0.98))`,
                border: `1px solid ${selected.color}55`,
                boxShadow: `0 0 60px ${selected.color}22`,
              }}
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-5xl mb-2">{selected.emoji}</div>
                  <h2 className="text-2xl font-bold text-white">{selected.title}</h2>
                  <p className="text-sm font-mono mt-1" style={{ color: selected.color }}>
                    {selected.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-blue-400 hover:text-white transition-colors text-2xl cursor-pointer"
                >
                  ×
                </button>
              </div>

              <p className="text-blue-100 leading-relaxed mb-6">{selected.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {Object.entries(selected.stats).map(([k, v]) => (
                  <div
                    key={k}
                    className="text-center p-3 rounded-xl"
                    style={{ background: `${selected.color}11`, border: `1px solid ${selected.color}33` }}
                  >
                    <div className="text-lg font-bold" style={{ color: selected.color }}>{v}</div>
                    <div className="text-[10px] text-blue-400 uppercase tracking-wider mt-1">{k}</div>
                  </div>
                ))}
              </div>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selected.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full text-xs font-mono"
                    style={{
                      background: `${selected.color}15`,
                      border: `1px solid ${selected.color}44`,
                      color: selected.color,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <a
                  href={selected.github}
                  className="flex-1 py-3 rounded-xl text-center text-sm font-mono cursor-pointer transition-all"
                  style={{
                    background: "rgba(68,136,255,0.1)",
                    border: "1px solid rgba(68,136,255,0.4)",
                    color: "#88bbff",
                  }}
                >
                  ⟨/⟩ GitHub
                </a>
                <a
                  href={selected.demo}
                  className="flex-1 py-3 rounded-xl text-center text-sm font-mono cursor-pointer transition-all"
                  style={{
                    background: `${selected.color}22`,
                    border: `1px solid ${selected.color}55`,
                    color: selected.color,
                  }}
                >
                  🚀 Live Demo
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
