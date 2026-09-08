"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ── Tilosa personality responses ─────────────────────────────
const GREETINGS = [
  "Hello Explorer! 👋 I'm Tilosa, Tisa's AI assistant. Ask me anything about her!",
  "Hey there! I'm Tilosa 🤖 — your guide to Tisa's universe. What would you like to know?",
];

const RESPONSES: Record<string, string> = {
  about: "Tisa Biswal is a B.Tech CSE student at LPU, passionate about AI, MedTech, and building things that matter. She's an AI researcher, software developer, and healthcare innovator! 🌟",
  skills: "Tisa is skilled in Python, React, Next.js, TensorFlow, OpenCV, Node.js, MongoDB, MySQL, Three.js, and more! She specializes in AI/ML and full-stack development. 🛠️",
  projects: "She has built Dr. Glance AI (healthcare + CV), Agentic Monitor (multi-agent dashboard), MedBridge (healthcare integration), NauvriQuest (AI career platform), and T-Rex Sports AI. Each one is groundbreaking! 🚀",
  achievements: "She's won 3rd place at Hack AI Season 2, reached the Grand Finale of SIH 2025, got selected for Anveshan 2025-26, is a district CISCE topper, and has 2 patents pending! 🏆",
  contact: "You can reach Tisa at tisabiswal1101@gmail.com, or connect on GitHub (tisa1101) and LinkedIn (tisa-biswal). She's always open to exciting opportunities! 📬",
  hire: "Why hire Tisa? She has 20+ projects, 2 patents pending, hackathon wins, national recognition, skills in AI/ML + full-stack, and an incredible drive to innovate. She'd be an amazing addition to any team! 💡",
  github: "Tisa's GitHub is github.com/tisa1101 — check out her open source contributions and projects! 🐙",
  resume: "You can download Tisa's resume from the Resume section of this portfolio. It covers her education, projects, and achievements! 📄",
  education: "Tisa is pursuing B.Tech in Computer Science Engineering at Lovely Professional University (LPU), batch of 2024-2028. 🎓",
  patent: "Tisa has 2 patents pending! One for Dr. Glance (AI healthcare diagnostics) and one for MedBridge (healthcare integration platform). Both are in MedTech innovation. 📜",
  hackathon: "She's competed in SIH 2025 (Grand Finale), Hack AI Season 2 (3rd Place), and more! She thrives under pressure and loves 24-hour hackathons. ⚡",
};

const QUICK_QUESTIONS = [
  "Tell me about Tisa",
  "Show her projects",
  "Why hire her?",
  "Her skills",
  "Achievements",
  "Contact info",
];

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("project") || lower.includes("work") || lower.includes("built")) return RESPONSES.projects;
  if (lower.includes("skill") || lower.includes("tech") || lower.includes("language") || lower.includes("framework")) return RESPONSES.skills;
  if (lower.includes("hire") || lower.includes("why") || lower.includes("recruit")) return RESPONSES.hire;
  if (lower.includes("contact") || lower.includes("email") || lower.includes("reach")) return RESPONSES.contact;
  if (lower.includes("achievement") || lower.includes("award") || lower.includes("win") || lower.includes("hack")) return RESPONSES.achievements;
  if (lower.includes("github") || lower.includes("open source")) return RESPONSES.github;
  if (lower.includes("resume") || lower.includes("cv")) return RESPONSES.resume;
  if (lower.includes("education") || lower.includes("study") || lower.includes("university") || lower.includes("lpu")) return RESPONSES.education;
  if (lower.includes("patent") || lower.includes("invention")) return RESPONSES.patent;
  if (lower.includes("hackathon") || lower.includes("sih") || lower.includes("competition")) return RESPONSES.hackathon;
  if (lower.includes("about") || lower.includes("tisa") || lower.includes("who")) return RESPONSES.about;
  return "Hmm, I'm not sure about that! 🤔 Try asking about Tisa's projects, skills, achievements, or how to contact her. Or click one of the quick questions below!";
}

// ── Tilosa SVG Robot ───────────────────────────────────────────
function TilosaBody({ state, mousePos }: { state: "idle" | "talk" | "think" | "sleep"; mousePos: { x: number; y: number } }) {
  const eyeOffX = Math.max(-3, Math.min(3, mousePos.x * 0.03));
  const eyeOffY = Math.max(-2, Math.min(2, mousePos.y * 0.03));

  return (
    <svg viewBox="0 0 80 100" width="80" height="100" style={{ overflow: "visible" }}>
      {/* Antenna */}
      <line x1="40" y1="8" x2="40" y2="18" stroke="#4488ff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="40" cy="6" r="4" fill="#4488ff">
        <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" />
      </circle>

      {/* Head */}
      <rect x="14" y="18" width="52" height="40" rx="12" fill="#1a2a5e" stroke="#4488ff" strokeWidth="1.5" />
      <rect x="16" y="20" width="48" height="36" rx="10" fill="url(#headGrad)" />
      <defs>
        <linearGradient id="headGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a3a7e" />
          <stop offset="100%" stopColor="#0d1b4a" />
        </linearGradient>
      </defs>

      {/* Eyes */}
      <g transform={`translate(${eyeOffX}, ${eyeOffY})`}>
        {/* Left eye */}
        <circle cx="28" cy="33" r="8" fill="#0a0a20" />
        <circle cx="28" cy="33" r="6" fill="#00aaff" opacity="0.9">
          {state === "think" && <animate attributeName="fill" values="#00aaff;#915eff;#00aaff" dur="0.8s" repeatCount="indefinite" />}
        </circle>
        <circle cx="28" cy="33" r="3" fill="#001a40" />
        <circle cx="29.5" cy="31.5" r="1.5" fill="white" opacity="0.8" />

        {/* Right eye */}
        <circle cx="52" cy="33" r="8" fill="#0a0a20" />
        <circle cx="52" cy="33" r="6" fill="#00aaff" opacity="0.9">
          {state === "think" && <animate attributeName="fill" values="#00aaff;#915eff;#00aaff" dur="0.8s" repeatCount="indefinite" />}
        </circle>
        <circle cx="52" cy="33" r="3" fill="#001a40" />
        <circle cx="53.5" cy="31.5" r="1.5" fill="white" opacity="0.8" />

        {/* Sleeping eyes */}
        {state === "sleep" && (
          <>
            <rect x="20" y="32" width="16" height="3" rx="1.5" fill="#001a40" />
            <rect x="44" y="32" width="16" height="3" rx="1.5" fill="#001a40" />
          </>
        )}
      </g>

      {/* Mouth */}
      <g>
        {state === "talk" ? (
          <ellipse cx="40" cy="48" rx="7" ry="4" fill="#001a40">
            <animate attributeName="ry" values="4;6;3;5;4" dur="0.3s" repeatCount="indefinite" />
          </ellipse>
        ) : state === "sleep" ? (
          <text x="36" y="52" fontSize="8" fill="#4488ff">zzz</text>
        ) : (
          <path d="M 33 48 Q 40 53 47 48" stroke="#4488ff" strokeWidth="2" fill="none" strokeLinecap="round" />
        )}
      </g>

      {/* Blush marks */}
      <ellipse cx="22" cy="42" rx="4" ry="2.5" fill="#ff6b9d" opacity="0.3" />
      <ellipse cx="58" cy="42" rx="4" ry="2.5" fill="#ff6b9d" opacity="0.3" />

      {/* Body */}
      <rect x="18" y="60" width="44" height="32" rx="8" fill="#1a2a5e" stroke="#4488ff" strokeWidth="1.5" />
      <rect x="20" y="62" width="40" height="28" rx="6" fill="url(#bodyGrad)" />
      <defs>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3070" />
          <stop offset="100%" stopColor="#0a1535" />
        </linearGradient>
      </defs>

      {/* Chest panel */}
      <rect x="28" y="67" width="24" height="16" rx="4" fill="#0a1535" stroke="#4488ff" strokeWidth="1" opacity="0.8" />
      <circle cx="36" cy="75" r="3" fill="#00cea8">
        <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
      </circle>
      <circle cx="44" cy="75" r="3" fill="#915eff">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
      </circle>

      {/* Arms */}
      <rect x="5" y="62" width="12" height="22" rx="6" fill="#1a2a5e" stroke="#4488ff" strokeWidth="1.2" />
      <rect x="63" y="62" width="12" height="22" rx="6" fill="#1a2a5e" stroke="#4488ff" strokeWidth="1.2" />

      {/* Think bubble */}
      {state === "think" && (
        <g>
          <circle cx="65" cy="20" r="2" fill="#4488ff" opacity="0.6" />
          <circle cx="69" cy="15" r="3" fill="#4488ff" opacity="0.7" />
          <circle cx="73" cy="9" r="5" fill="#0d1b5e" stroke="#4488ff" strokeWidth="1" />
          <text x="70" y="13" fontSize="6" fill="#4488ff">?</text>
        </g>
      )}
    </svg>
  );
}

// ── Main Tilosa Component ──────────────────────────────────────
export default function TilosaRobot() {
  const [open, setOpen] = useState(false);
  const [robotState, setRobotState] = useState<"idle" | "talk" | "think" | "sleep">("idle");
  const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [idleTimer, setIdleTimer] = useState<NodeJS.Timeout | null>(null);
  const [greeted, setGreeted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Eye tracking
  useEffect(() => {
    const track = (e: MouseEvent) => setMousePos({ x: e.clientX - window.innerWidth / 2, y: e.clientY - window.innerHeight / 2 });
    window.addEventListener("mousemove", track);
    return () => window.removeEventListener("mousemove", track);
  }, []);

  // Idle sleep timer
  useEffect(() => {
    const resetSleep = () => {
      setRobotState("idle");
      if (idleTimer) clearTimeout(idleTimer);
      const t = setTimeout(() => { if (!open) setRobotState("sleep"); }, 20000);
      setIdleTimer(t);
    };
    window.addEventListener("mousemove", resetSleep);
    window.addEventListener("keydown", resetSleep);
    const t = setTimeout(() => { if (!open) setRobotState("sleep"); }, 20000);
    setIdleTimer(t);
    return () => {
      window.removeEventListener("mousemove", resetSleep);
      window.removeEventListener("keydown", resetSleep);
      clearTimeout(t);
    };
  }, [open]);

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Greet on first open
  useEffect(() => {
    if (open && !greeted) {
      setGreeted(true);
      setRobotState("talk");
      setIsTyping(true);
      setTimeout(() => {
        setMessages([{ role: "bot", text: GREETINGS[0] }]);
        setIsTyping(false);
        setRobotState("idle");
      }, 1200);
    }
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open, greeted]);

  const sendMessage = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setRobotState("think");
    setIsTyping(true);
    setTimeout(() => {
      const reply = getResponse(msg);
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
      setRobotState("talk");
      setIsTyping(false);
      setTimeout(() => setRobotState("idle"), 2000);
    }, 900 + Math.random() * 500);
  };

  return (
    <>
      {/* Floating Robot */}
      <motion.div
        className="fixed bottom-6 left-6 z-[9000] flex flex-col items-center gap-2 cursor-pointer select-none"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.6, type: "spring" }}
        onClick={() => { setOpen((p) => !p); setRobotState("idle"); }}
      >
        {/* Speech bubble hint */}
        <AnimatePresence>
          {!open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-[#0c0c1d]/90 border border-[#915eff]/50 text-[#00cea8] text-[10px] font-mono font-bold px-3.5 py-1.5 rounded-full whitespace-nowrap shadow-[0_0_20px_rgba(145,94,255,0.4)] flex items-center gap-1.5 backdrop-blur-xl"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00cea8] animate-ping" />
              <span>TILOSA AI</span>
              <span className="text-white/60">• Ask me anything →</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Robot body */}
        <motion.div
          animate={{ y: robotState === "sleep" ? 0 : [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="relative"
          style={{ filter: "drop-shadow(0 0 16px rgba(68,136,255,0.6))" }}
        >
          <TilosaBody state={robotState} mousePos={mousePos} />

          {/* Glow base */}
          <div
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-3 rounded-full blur-md"
            style={{ background: "radial-gradient(ellipse, rgba(68,136,255,0.4) 0%, transparent 70%)" }}
          />
        </motion.div>

        {/* Name tag */}
        <div className="text-[9px] font-bold tracking-[0.2em] uppercase" style={{ color: "#4488ff", fontFamily: "'Space Mono', monospace" }}>
          TILOSA
        </div>
      </motion.div>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: -20, y: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, x: -20, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-[160px] left-6 z-[9001] w-[320px] sm:w-[360px] flex flex-col rounded-[24px] overflow-hidden shadow-[0_0_60px_rgba(68,136,255,0.3)]"
            style={{
              background: "rgba(4,12,40,0.97)",
              border: "1px solid rgba(68,136,255,0.3)",
              backdropFilter: "blur(24px)",
              maxHeight: "460px",
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#4488ff]/20" style={{ background: "rgba(13,27,94,0.5)" }}>
              <div className="w-8 h-8 flex-shrink-0">
                <TilosaBody state={robotState} mousePos={{ x: 0, y: 0 }} />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Tilosa</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00cea8] animate-pulse" />
                  <span className="text-[10px] text-[#88bbff]" style={{ fontFamily: "'Space Mono', monospace" }}>
                    {isTyping ? "Thinking..." : "Online · Tisa's AI"}
                  </span>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setOpen(false); }}
                className="ml-auto w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scrollbar-thin" style={{ maxHeight: "250px" }}>
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      background: m.role === "user" ? "linear-gradient(135deg, #915eff, #4488ff)" : "rgba(13,27,94,0.8)",
                      color: "white",
                      border: m.role === "bot" ? "1px solid rgba(68,136,255,0.2)" : "none",
                    }}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl flex gap-1.5" style={{ background: "rgba(13,27,94,0.8)", border: "1px solid rgba(68,136,255,0.2)" }}>
                    {[0, 0.15, 0.3].map((d, i) => (
                      <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-[#4488ff]" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: d }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions */}
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-[10px] px-2.5 py-1 rounded-full transition-all hover:scale-105"
                  style={{
                    background: "rgba(68,136,255,0.1)",
                    border: "1px solid rgba(68,136,255,0.25)",
                    color: "#88bbff",
                    fontFamily: "'Space Mono', monospace",
                  }}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="px-4 pb-4 pt-2 flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent border rounded-xl px-3 py-2 text-sm text-white outline-none transition-all placeholder:text-white/30"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(68,136,255,0.2)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "13px",
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(68,136,255,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(68,136,255,0.2)")}
              />
              <button
                onClick={() => sendMessage()}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110 flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #4488ff, #915eff)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
