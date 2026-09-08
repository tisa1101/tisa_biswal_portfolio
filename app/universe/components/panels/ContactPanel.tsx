"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PanelWrapper } from "./PanelWrapper";

const contacts = [
  {
    icon: "🐙",
    label: "GitHub",
    value: "github.com/tisa1101",
    href: "https://github.com/tisa1101",
    color: "#8899cc",
    desc: "20+ repositories",
  },
  {
    icon: "💼",
    label: "LinkedIn",
    value: "linkedin.com/in/tisa-biswal",
    href: "https://linkedin.com/in/tisa-biswal",
    color: "#0088ff",
    desc: "Let's connect professionally",
  },
  {
    icon: "📧",
    label: "Email",
    value: "tisabiswal1101@gmail.com",
    href: "mailto:tisabiswal1101@gmail.com",
    color: "#00cea8",
    desc: "Open to opportunities",
  },
  {
    icon: "📍",
    label: "Location",
    value: "Punjab, India",
    href: "#",
    color: "#ff6b6b",
    desc: "Available for remote work",
  },
];

// ── Satellite SVG ──────────────────────────────────────────────
function SatelliteAnimation() {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 180, height: 180 }}>
      {/* Outer orbit ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: 170,
          height: 170,
          border: "1px dashed rgba(68,170,255,0.25)",
          animation: "orbitSpin 12s linear infinite",
        }}
      />
      {/* Inner orbit ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: 120,
          height: 120,
          border: "1px solid rgba(68,170,255,0.15)",
          animation: "orbitSpin 8s linear infinite reverse",
        }}
      />

      {/* Satellite SVG */}
      <motion.div
        animate={{ rotate: [0, 5, -5, 0], y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        style={{ filter: "drop-shadow(0 0 16px rgba(68,170,255,0.6))" }}
      >
        <svg viewBox="0 0 80 80" width="80" height="80">
          {/* Body */}
          <rect x="30" y="28" width="20" height="24" rx="4" fill="#1a2a5e" stroke="#4488ff" strokeWidth="1.5" />
          {/* Solar panels */}
          <rect x="4" y="33" width="24" height="14" rx="2" fill="#1e3a6e" stroke="#4488ff" strokeWidth="1" />
          <rect x="52" y="33" width="24" height="14" rx="2" fill="#1e3a6e" stroke="#4488ff" strokeWidth="1" />
          {/* Panel grid lines */}
          <line x1="12" y1="33" x2="12" y2="47" stroke="#4488ff" strokeWidth="0.5" opacity="0.5" />
          <line x1="20" y1="33" x2="20" y2="47" stroke="#4488ff" strokeWidth="0.5" opacity="0.5" />
          <line x1="60" y1="33" x2="60" y2="47" stroke="#4488ff" strokeWidth="0.5" opacity="0.5" />
          <line x1="68" y1="33" x2="68" y2="47" stroke="#4488ff" strokeWidth="0.5" opacity="0.5" />
          <line x1="4" y1="40" x2="28" y2="40" stroke="#4488ff" strokeWidth="0.5" opacity="0.5" />
          <line x1="52" y1="40" x2="76" y2="40" stroke="#4488ff" strokeWidth="0.5" opacity="0.5" />
          {/* Connector arms */}
          <rect x="27" y="38" width="4" height="4" fill="#4488ff" rx="1" />
          <rect x="49" y="38" width="4" height="4" fill="#4488ff" rx="1" />
          {/* Dish */}
          <ellipse cx="40" cy="25" rx="10" ry="5" fill="none" stroke="#4488ff" strokeWidth="1.5" />
          <line x1="40" y1="25" x2="40" y2="30" stroke="#4488ff" strokeWidth="1.5" />
          {/* Signal waves */}
          <circle cx="40" cy="20" r="8" fill="none" stroke="#4488ff" strokeWidth="0.8" opacity="0.4">
            <animate attributeName="r" values="8;14;20" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.1;0" dur="2s" repeatCount="indefinite" />
          </circle>
          {/* Body details */}
          <circle cx="40" cy="37" r="3" fill="#00cea8">
            <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
          </circle>
          <rect x="34" y="44" width="12" height="4" rx="1" fill="#0a1535" stroke="#4488ff" strokeWidth="0.8" />
        </svg>
      </motion.div>

      {/* Orbiting signal dot */}
      <motion.div
        className="absolute w-2 h-2 rounded-full"
        style={{ background: "#4488ff", boxShadow: "0 0 8px #4488ff", top: 14, left: "50%", transformOrigin: "0 75px" }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
      />
    </div>
  );
}

interface ContactPanelProps {
  onClose: () => void;
}

export function ContactPanel({ onClose }: ContactPanelProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <PanelWrapper onClose={onClose} planetName="Contact" planetEmoji="📡" accentColor="#44aaff">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] mb-2" style={{ color: "#44aaff", fontFamily: "'Space Mono', monospace" }}>
            Communication Channel
          </p>
          <h2 className="text-white font-black text-2xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Get In Touch
          </h2>
          <p className="text-[#8899cc] text-sm mt-2">Open to internships, full-time roles, collaborations, and research opportunities.</p>
        </div>

        {/* Satellite */}
        <div className="flex justify-center py-2">
          <SatelliteAnimation />
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {contacts.map((c) => (
            <motion.div
              key={c.label}
              whileHover={{ y: -4, scale: 1.02 }}
              className="relative group rounded-2xl p-4 cursor-pointer overflow-hidden"
              style={{ background: `${c.color}0c`, border: `1px solid ${c.color}25`, transition: "border-color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${c.color}55`)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${c.color}25`)}
            >
              {/* Shimmer */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `linear-gradient(135deg, ${c.color}06, transparent)` }} />

              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{c.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-xs mb-0.5" style={{ color: c.color, fontFamily: "'Space Mono', monospace" }}>{c.label}</div>
                  <div className="text-white text-sm font-bold truncate" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{c.value}</div>
                  <div className="text-[#8899cc] text-[10px] mt-0.5">{c.desc}</div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-3">
                {c.href !== "#" && (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-1.5 rounded-xl text-[10px] font-bold text-center transition-all hover:opacity-80"
                    style={{ background: `${c.color}15`, color: c.color, fontFamily: "'Space Mono', monospace" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Open ↗
                  </a>
                )}
                {(c.label === "Email" || c.label === "GitHub" || c.label === "LinkedIn") && (
                  <button
                    onClick={() => copyToClipboard(c.value, c.label)}
                    className="flex-1 py-1.5 rounded-xl text-[10px] font-bold text-center transition-all hover:opacity-80"
                    style={{ background: "rgba(255,255,255,0.05)", color: "#8899cc", fontFamily: "'Space Mono', monospace" }}
                  >
                    {copied === c.label ? "✓ Copied!" : "Copy"}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Status & availability */}
        <div className="flex items-center justify-center gap-3 py-4 px-5 rounded-2xl" style={{ background: "rgba(0,206,168,0.06)", border: "1px solid rgba(0,206,168,0.2)" }}>
          <motion.div
            className="w-2.5 h-2.5 rounded-full bg-[#00cea8]"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
          <span className="text-[#00cea8] font-bold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Currently open to opportunities
          </span>
        </div>

        {/* Thank you message */}
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl z-[300]"
              style={{ background: "rgba(0,206,168,0.9)", backdropFilter: "blur(20px)", color: "white" }}
            >
              <span className="text-xl">🙏</span>
              <span className="font-bold text-sm">{copied} copied to clipboard!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PanelWrapper>
  );
}
