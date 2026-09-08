"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PanelWrapper } from "./PanelWrapper";

interface ResumePanelProps {
  onClose: () => void;
  onRecruiterMode?: () => void;
}

const highlights = [
  { label: "Degree", value: "B.Tech CSE", icon: "🎓" },
  { label: "University", value: "LPU", icon: "🏫" },
  { label: "Batch", value: "2024–2028", icon: "📅" },
  { label: "Patents", value: "2 Pending", icon: "📜" },
  { label: "Hackathons", value: "5 Won", icon: "🏆" },
  { label: "Projects", value: "20+", icon: "💻" },
];

export function ResumePanel({ onClose, onRecruiterMode }: ResumePanelProps) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    const link = document.createElement("a");
    link.href = "/resume/Resume.pdf";
    link.download = "Tisa_Biswal_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setDownloading(false), 2000);
  };

  return (
    <PanelWrapper onClose={onClose} planetName="Resume" planetEmoji="📄" accentColor="#44ccaa">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] mb-2" style={{ color: "#44ccaa", fontFamily: "'Space Mono', monospace" }}>
            Curriculum Vitae
          </p>
          <h2 className="text-white font-black text-2xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Tisa Biswal
          </h2>
          <p className="text-[#8899cc] text-sm mt-1">AI Engineer · Software Developer · Healthcare Innovator</p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-2">
          {highlights.map((h) => (
            <div
              key={h.label}
              className="p-3 rounded-xl text-center"
              style={{ background: "rgba(68,204,170,0.07)", border: "1px solid rgba(68,204,170,0.2)" }}
            >
              <div className="text-lg mb-0.5">{h.icon}</div>
              <div className="text-white font-bold text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{h.value}</div>
              <div className="text-[9px] text-[#8899cc]" style={{ fontFamily: "'Space Mono', monospace" }}>{h.label}</div>
            </div>
          ))}
        </div>

        {/* PDF Preview */}
        <div className="relative rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(68,204,170,0.25)", height: "320px" }}>
          <iframe
            src="/resume/Resume.pdf#toolbar=0&navpanes=0"
            className="w-full h-full"
            style={{ background: "#020c28" }}
            title="Tisa Biswal Resume"
          />
          {/* Overlay shimmer */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent 70%, rgba(2,12,40,0.8) 100%)" }} />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Download */}
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-sm transition-all"
            style={{
              background: downloading
                ? "rgba(68,204,170,0.3)"
                : "linear-gradient(135deg, #44ccaa, #00cea8)",
              color: "white",
              boxShadow: "0 0 30px rgba(68,204,170,0.3)",
            }}
          >
            <span className="text-lg">{downloading ? "⬇️" : "📥"}</span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {downloading ? "Downloading..." : "Download Resume"}
            </span>
          </motion.button>

          {/* Recruiter Mode */}
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { onRecruiterMode?.(); onClose(); }}
            className="flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-sm transition-all"
            style={{
              background: "rgba(145,94,255,0.12)",
              border: "1px solid rgba(145,94,255,0.35)",
              color: "#b388ff",
            }}
          >
            <span className="text-lg">👔</span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Recruiter Mode</span>
          </motion.button>
        </div>

        {/* Tech stack pill row */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider mb-2 text-[#8899cc]" style={{ fontFamily: "'Space Mono', monospace" }}>
            Core Stack
          </div>
          <div className="flex flex-wrap gap-2">
            {["Python", "React", "Next.js", "TensorFlow", "OpenCV", "Node.js", "MongoDB", "TypeScript", "Flask", "Three.js"].map((tech) => (
              <span
                key={tech}
                className="text-[10px] px-2.5 py-1 rounded-full font-bold"
                style={{ background: "rgba(68,204,170,0.08)", border: "1px solid rgba(68,204,170,0.2)", color: "#44ccaa", fontFamily: "'Space Mono', monospace" }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Open full PDF link */}
        <a
          href="/resume/Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-center text-[11px] transition-colors hover:text-[#44ccaa]"
          style={{ color: "#8899cc", fontFamily: "'Space Mono', monospace" }}
        >
          📂 Open full PDF in new tab →
        </a>
      </div>
    </PanelWrapper>
  );
}
