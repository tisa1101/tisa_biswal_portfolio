"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "./components/LoadingScreen";
import { LandingPage } from "./components/LandingPage";
import { PlanetSystem } from "./components/PlanetSystem";
import { CustomCursor } from "./components/CustomCursor";
import { AboutPanel } from "./components/panels/AboutPanel";
import { SkillsPanel } from "./components/panels/SkillsPanel";
import { ProjectsPanel } from "./components/panels/ProjectsPanel";
import { AchievementsPanel } from "./components/panels/AchievementsPanel";
import { ResumePanel } from "./components/panels/ResumePanel";
import { ContactPanel } from "./components/panels/ContactPanel";
import "./universe.css";

// Load Three.js background only on client
const BackgroundScene = dynamic(
  () => import("./components/BackgroundScene").then((m) => m.BackgroundScene),
  { ssr: false }
);

type Stage = "loading" | "welcome" | "galaxy" | "planet";
type PlanetId = "about" | "skills" | "projects" | "achievements" | "resume" | "contact";

// ── Recruiter Mode overlay ─────────────────────────────────────
function RecruiterModeOverlay({ onExit }: { onExit: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[10000] overflow-y-auto scrollbar-thin"
      style={{ background: "#020818", fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* Top bar */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b"
        style={{ background: "rgba(2,8,24,0.95)", backdropFilter: "blur(20px)", borderColor: "rgba(68,136,255,0.15)" }}
      >
        <div>
          <h1 className="text-white font-black text-xl tracking-tight">TISA BISWAL</h1>
          <p style={{ color: "#4488ff", fontSize: 11, fontFamily: "'Space Mono', monospace", letterSpacing: "0.2em" }}>
            AI ENGINEER · SOFTWARE DEVELOPER · HEALTHCARE INNOVATOR
          </p>
        </div>
        <button
          onClick={onExit}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all"
          style={{ background: "rgba(68,136,255,0.1)", border: "1px solid rgba(68,136,255,0.3)", color: "#88bbff" }}
        >
          ← Back to Universe
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col gap-8">
        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { n: "20+", l: "Projects" },
            { n: "2", l: "Patents Pending" },
            { n: "5", l: "Hackathons Won" },
            { n: "2024–28", l: "B.Tech CSE, LPU" },
          ].map((s) => (
            <div key={s.l} className="text-center p-4 rounded-2xl" style={{ background: "rgba(68,136,255,0.05)", border: "1px solid rgba(68,136,255,0.15)" }}>
              <div className="font-black text-xl text-white">{s.n}</div>
              <div style={{ fontSize: 10, color: "#8899cc", fontFamily: "'Space Mono', monospace" }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Resume embed */}
        <div>
          <h2 className="text-white font-bold text-lg mb-3 flex items-center gap-2">📄 Resume</h2>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(68,136,255,0.2)", height: 500 }}>
            <iframe src="/resume/Resume.pdf#toolbar=0" className="w-full h-full" title="Resume" />
          </div>
          <a
            href="/resume/Resume.pdf"
            download="Tisa_Biswal_Resume.pdf"
            className="mt-3 flex items-center justify-center gap-2 py-3 px-6 rounded-2xl font-bold text-sm w-full sm:w-auto transition-all hover:-translate-y-1"
            style={{ background: "linear-gradient(135deg, #4488ff, #915eff)", color: "white", display: "flex", marginTop: 12 }}
          >
            📥 Download Resume
          </a>
        </div>

        {/* Projects */}
        <div>
          <h2 className="text-white font-bold text-lg mb-3 flex items-center gap-2">🚀 Key Projects</h2>
          <div className="flex flex-col gap-3">
            {[
              { name: "Dr. Glance AI", tags: "Python · TensorFlow · OpenCV · MediaPipe", note: "Patent Pending · 97.2% accuracy" },
              { name: "Agentic Monitor", tags: "Next.js · AI Agents · WebSocket · Vercel", note: "99.8% anomaly detection · 15ms latency" },
              { name: "MedBridge", tags: "Python · FastAPI · React · PostgreSQL", note: "Patent Pending · -80% diagnostic cost" },
              { name: "NauvriQuest", tags: "React · Gemini AI · Node.js", note: "3rd Place Hack AI Season 2 · 94% match accuracy" },
              { name: "T-Rex Sports AI", tags: "IoT · Python · OpenCV", note: "SIH 2025 Grand Finale · 10ms tracking" },
            ].map((p) => (
              <div key={p.name} className="flex items-center justify-between p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div>
                  <div className="text-white font-bold text-sm">{p.name}</div>
                  <div style={{ fontSize: 10, color: "#8899cc", fontFamily: "'Space Mono', monospace", marginTop: 2 }}>{p.tags}</div>
                </div>
                <div style={{ fontSize: 10, color: "#00cea8", fontFamily: "'Space Mono', monospace", textAlign: "right", maxWidth: 150 }}>{p.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-white font-bold text-lg mb-3 flex items-center gap-2">🛠️ Technical Skills</h2>
          <div className="flex flex-wrap gap-2">
            {["Python", "React", "Next.js", "TensorFlow", "OpenCV", "Node.js", "MongoDB", "MySQL", "TypeScript", "Flask", "Three.js", "Git", "Vercel", "MediaPipe", "Fast API"].map((t) => (
              <span key={t} className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(68,136,255,0.1)", border: "1px solid rgba(68,136,255,0.25)", color: "#88bbff" }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-white font-bold text-lg mb-3 flex items-center gap-2">📬 Contact</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { i: "📧", l: "Email", v: "tisabiswal1101@gmail.com", h: "mailto:tisabiswal1101@gmail.com" },
              { i: "🐙", l: "GitHub", v: "github.com/tisa1101", h: "https://github.com/tisa1101" },
              { i: "💼", l: "LinkedIn", v: "linkedin.com/in/tisa-biswal", h: "https://linkedin.com/in/tisa-biswal" },
              { i: "📍", l: "Location", v: "Punjab, India", h: "#" },
            ].map((c) => (
              <a key={c.l} href={c.h} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl transition-all hover:-translate-y-0.5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <span className="text-xl">{c.i}</span>
                <div>
                  <div style={{ fontSize: 10, color: "#4488ff", fontFamily: "'Space Mono', monospace" }}>{c.l}</div>
                  <div className="text-white text-sm font-bold">{c.v}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Universe Page ─────────────────────────────────────────
export default function UniversePage() {
  const [stage, setStage] = useState<Stage>("loading");
  const [activePlanet, setActivePlanet] = useState<PlanetId | null>(null);
  const [recruiterMode, setRecruiterMode] = useState(false);

  // Konami code easter egg
  useEffect(() => {
    const keys: string[] = [];
    const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
    const onKey = (e: KeyboardEvent) => {
      keys.push(e.key);
      if (keys.length > KONAMI.length) keys.shift();
      if (keys.join(",") === KONAMI.join(",")) {
        console.log("%c🌌 KONAMI CODE ACTIVATED! Welcome to the AI Lab, Explorer.", "color: #4488ff; font-size: 16px; font-weight: bold;");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Developer console messages
  useEffect(() => {
    console.log("%c ✨ TISA'S UNIVERSE ", "background: #0d1b5e; color: #4488ff; font-size: 20px; font-weight: bold; padding: 8px 16px; border-radius: 8px;");
    console.log("%c Built with Next.js · Three.js · Framer Motion · TypeScript", "color: #8899cc; font-size: 12px;");
    console.log("%c 🚀 Try the Konami code: ↑↑↓↓←→←→BA", "color: #00cea8; font-size: 12px;");
    console.log("%c 📧 tisabiswal1101@gmail.com | github.com/tisa1101", "color: #915eff; font-size: 12px;");
  }, []);

  const handleSelectPlanet = useCallback((id: string) => {
    setActivePlanet(id as PlanetId);
  }, []);

  const handleClosePanel = useCallback(() => {
    setActivePlanet(null);
  }, []);

  if (recruiterMode) {
    return <RecruiterModeOverlay onExit={() => setRecruiterMode(false)} />;
  }

  return (
    <div style={{ position: "fixed", inset: 0, width: "100vw", height: "100vh", overflow: "hidden" }}>
      <CustomCursor />
      <BackgroundScene />

      <AnimatePresence mode="wait">
        {stage === "loading" && (
          <LoadingScreen key="loading" onComplete={() => setStage("welcome")} />
        )}
        {stage === "welcome" && (
          <LandingPage key="welcome" onBegin={() => setStage("galaxy")} />
        )}
        {stage === "galaxy" && (
          <PlanetSystem key="galaxy" onSelectPlanet={handleSelectPlanet} />
        )}
      </AnimatePresence>

      {/* Planet panels - shown over galaxy */}
      <AnimatePresence>
        {stage === "galaxy" && activePlanet === "about" && (
          <AboutPanel key="about-panel" onClose={handleClosePanel} />
        )}
        {stage === "galaxy" && activePlanet === "skills" && (
          <SkillsPanel key="skills-panel" onClose={handleClosePanel} />
        )}
        {stage === "galaxy" && activePlanet === "projects" && (
          <ProjectsPanel key="projects-panel" onClose={handleClosePanel} />
        )}
        {stage === "galaxy" && activePlanet === "achievements" && (
          <AchievementsPanel key="achievements-panel" onClose={handleClosePanel} />
        )}
        {stage === "galaxy" && activePlanet === "resume" && (
          <ResumePanel
            key="resume-panel"
            onClose={handleClosePanel}
            onRecruiterMode={() => setRecruiterMode(true)}
          />
        )}
        {stage === "galaxy" && activePlanet === "contact" && (
          <ContactPanel key="contact-panel" onClose={handleClosePanel} />
        )}
      </AnimatePresence>

      {/* Recruiter mode floating button */}
      {stage === "galaxy" && (
        <button
          onClick={() => setRecruiterMode(true)}
          className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105"
          style={{
            background: "rgba(2,8,24,0.8)",
            border: "1px solid rgba(68,136,255,0.3)",
            color: "#88bbff",
            backdropFilter: "blur(12px)",
            fontFamily: "'Space Mono', monospace",
            letterSpacing: "0.1em",
          }}
        >
          👔 RECRUITER MODE
        </button>
      )}

      {/* Back to main site link */}
      {stage === "galaxy" && (
        <a
          href="/"
          className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105"
          style={{
            background: "rgba(2,8,24,0.8)",
            border: "1px solid rgba(68,136,255,0.2)",
            color: "#4466aa",
            backdropFilter: "blur(12px)",
            fontFamily: "'Space Mono', monospace",
          }}
        >
          ← Main Site
        </a>
      )}
    </div>
  );
}
