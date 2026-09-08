"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type HoverTarget = "monitor" | "cpu" | "keyboard" | "assistant" | null;

interface MonitorScene {
  title: string;
  subtitle: string;
  metric: string;
  accent: string;
}

interface HoverPanel {
  title: string;
  description: string;
  items: string[];
  accent: string;
}

const monitorScenes: MonitorScene[] = [
  {
    title: "VS Code Live",
    subtitle: "Workspace state and editor flow",
    metric: "TypeScript • Next.js • React",
    accent: "#4dd9ff",
  },
  {
    title: "GitHub Pulse",
    subtitle: "Contribution graph and repo health",
    metric: "850+ commits • 28 repos",
    accent: "#5d8cff",
  },
  {
    title: "LeetCode Engine",
    subtitle: "Algorithm performance and challenge flow",
    metric: "350+ solved • 98% pass",
    accent: "#9c5cff",
  },
  {
    title: "Vision AI",
    subtitle: "Computer vision diagnostics and model output",
    metric: "CV inference • 2 patents",
    accent: "#4bedb5",
  },
  {
    title: "Patent Cockpit",
    subtitle: "AI research and intellectual property",
    metric: "Research patents • IP strategy",
    accent: "#c273ff",
  },
];

const hoverPanels: Record<Exclude<HoverTarget, null>, HoverPanel> = {
  monitor: {
    title: "GitHub Hologram",
    description: "Live repo pulse with commit velocity and branch stability.",
    items: ["Repo health", "PR velocity"],
    accent: "#5d8cff",
  },
  cpu: {
    title: "LeetCode Engine",
    description: "Algorithm throughput and challenge readiness for production.",
    items: ["Problem efficiency", "Time complexity"],
    accent: "#9c5cff",
  },
  keyboard: {
    title: "Project Launchpad",
    description: "Delivered systems, polished UI, and launch-ready outputs.",
    items: ["Full-stack releases", "Design-to-code"],
    accent: "#00dcb3",
  },
  assistant: {
    title: "AI Core",
    description: "Patents, research models, and computer vision intelligence.",
    items: ["Vision pipelines", "Adaptive models"],
    accent: "#c273ff",
  },
};

const interactiveZones = [
  { id: "monitor", label: "Monitor", left: 69, top: 43, width: 120, height: 120 },
  { id: "cpu", label: "CPU", left: 78, top: 58, width: 96, height: 96 },
  { id: "keyboard", label: "Keyboard", left: 68, top: 76, width: 140, height: 72 },
  { id: "assistant", label: "AI Assistant", left: 64, top: 50, width: 82, height: 82 },
];

export default function WorkstationDrones() {
  const [hoverTarget, setHoverTarget] = useState<HoverTarget>(null);
  const [monitorIndex, setMonitorIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(1440);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMonitorIndex((current) => (current + 1) % monitorScenes.length);
    }, 4200);

    return () => clearInterval(interval);
  }, []);

  const isMobile = screenWidth < 920;
  const orbPosition = isMobile ? { left: "62%", top: "46%" } : { left: "67%", top: "50%" };
  const monitorPanelPosition = isMobile ? { left: "70%", top: "38%" } : { left: "70%", top: "36%" };
  const activePanel = hoverTarget ? hoverPanels[hoverTarget] : null;
  const currentScene = monitorScenes[monitorIndex];

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_66%_50%,rgba(0,255,255,0.08),transparent_16%),radial-gradient(circle_at_74%_44%,rgba(181,90,255,0.05),transparent_20%)]" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-full bg-[repeating-linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.02)_1px,transparent_1px,transparent_7px)] opacity-10" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(16)].map((_, index) => {
          const size = 2 + (index % 3);
          const left = 16 + index * 4.5;
          const top = 18 + ((index * 7) % 60);
          return (
            <motion.span
              key={`particle-${index}`}
              className="absolute rounded-full bg-cyan-300/20"
              style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }}
              animate={{ opacity: [0.18, 0.65, 0.18], y: [0, -4, 0] }}
              transition={{ duration: 5 + index * 0.15, repeat: Infinity, ease: "easeInOut", delay: index * 0.08 }}
            />
          );
        })}
      </div>

      <div className="absolute pointer-events-none" style={{ left: monitorPanelPosition.left, top: monitorPanelPosition.top, transform: "translate(-50%, -50%)" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.title}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.4 }}
            className="max-w-[240px] rounded-[28px] border border-white/10 bg-white/5 p-4 text-white shadow-[0_28px_80px_rgba(0,0,0,0.2)] backdrop-blur-[28px]"
          >
            <div className="text-[10px] uppercase tracking-[0.3em] text-cyan-200/70">Monitor OS</div>
            <div className="mt-2 text-sm font-semibold leading-snug">{currentScene.title}</div>
            <div className="mt-2 text-[11px] text-white/70 leading-relaxed">{currentScene.subtitle}</div>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-white/80">{currentScene.metric}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        className="absolute pointer-events-auto"
        style={{ left: orbPosition.left, top: orbPosition.top, transform: "translate(-50%, -50%)" }}
        animate={{ y: [0, -4, 0], scale: [0.98, 1.03, 0.98] }}
        transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
        onMouseEnter={() => setHoverTarget("assistant")}
        onMouseLeave={() => setHoverTarget((current) => (current === "assistant" ? null : current))}
      >
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 shadow-[0_0_48px_rgba(60,230,255,0.2)] backdrop-blur-[24px]">
          <div className="absolute inset-0 rounded-full bg-cyan-200/10 blur-2xl" />
          <div className="absolute inset-3 rounded-full border border-white/10 bg-white/5" />
          <div className="absolute inset-6 rounded-full bg-cyan-100/25 blur-xl" />
          <div className="relative h-6 w-6 rounded-full bg-gradient-to-br from-cyan-300 to-violet-400 shadow-[0_0_20px_rgba(94,221,255,0.45)]" />
        </div>

        {[
          { x: -24, y: -10, delay: 0 },
          { x: 24, y: -8, delay: 0.4 },
          { x: 16, y: 24, delay: 0.8 },
        ].map((particle, index) => (
          <motion.span
            key={`orb-particle-${index}`}
            className="absolute rounded-full bg-cyan-200/70 shadow-[0_0_12px_rgba(94,221,255,0.4)]"
            style={{ width: 6, height: 6, left: "50%", top: "50%", marginLeft: -3, marginTop: -3 }}
            animate={{ x: [0, particle.x, 0], y: [0, particle.y, 0], opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: particle.delay }}
          />
        ))}
      </motion.div>

      {interactiveZones.map((zone) => (
        <button
          key={zone.id}
          type="button"
          aria-label={zone.label}
          className="absolute pointer-events-auto rounded-full bg-transparent"
          style={{
            left: `${zone.left}%`,
            top: `${zone.top}%`,
            width: zone.width,
            height: zone.height,
            transform: "translate(-50%, -50%)",
          }}
          onMouseEnter={() => setHoverTarget(zone.id as HoverTarget)}
          onMouseLeave={() => setHoverTarget((current) => (current === zone.id ? null : current))}
        >
          <span className="sr-only">{zone.label}</span>
        </button>
      ))}

      <AnimatePresence>
        {activePanel && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="absolute left-[50%] top-[66%] z-40 w-[320px] max-w-[90vw] -translate-x-1/2 rounded-[32px] border border-white/10 bg-white/5 p-4 text-white shadow-[0_32px_96px_rgba(0,0,0,0.24)] backdrop-blur-[30px]"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em] text-cyan-200/70">{activePanel.title}</p>
                <h3 className="mt-2 text-sm font-semibold leading-snug">{activePanel.description}</h3>
              </div>
              <span className="inline-flex h-3 w-3 rounded-full" style={{ backgroundColor: activePanel.accent }} />
            </div>
            <div className="mt-4 grid gap-2 text-[11px] text-white/70">
              {activePanel.items.map((item) => (
                <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
