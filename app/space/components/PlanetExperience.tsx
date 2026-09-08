"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGameState } from "../hooks/useGameState";
import { AboutContent } from "./PlanetContent/AboutContent";
import { SkillsContent } from "./PlanetContent/SkillsContent";
import { ProjectsContent } from "./PlanetContent/ProjectsContent";
import { ExperienceContent } from "./PlanetContent/ExperienceContent";
import { ContactContent } from "./PlanetContent/ContactContent";
import { GenericPlanetContent } from "./PlanetContent/GenericPlanetContent";

export function PlanetExperience() {
  const { phase, activePlanet, setPhase, setActivePlanet, discoverPlanet } = useGameState();

  if (phase !== "exploring" || !activePlanet) return null;

  const handleBack = () => {
    if (activePlanet) discoverPlanet(activePlanet.id);
    setActivePlanet(null);
    setPhase("flying");
  };

  const renderContent = () => {
    switch (activePlanet.id) {
      case "about": return <AboutContent />;
      case "skills": return <SkillsContent />;
      case "projects": return <ProjectsContent />;
      case "experience": return <ExperienceContent />;
      case "contact": return <ContactContent />;
      default: return <GenericPlanetContent planet={activePlanet} />;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key={activePlanet.id}
        className="fixed inset-0 z-40 overflow-y-auto"
        style={{
          background: `radial-gradient(ellipse at top, ${activePlanet.color}22 0%, #01050f 60%)`,
        }}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back button */}
        <motion.button
          className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono cursor-pointer"
          style={{
            background: "rgba(0,10,30,0.85)",
            border: "1px solid rgba(68,136,255,0.4)",
            color: "#88bbff",
            backdropFilter: "blur(12px)",
          }}
          onClick={handleBack}
          whileHover={{ scale: 1.05, borderColor: "rgba(68,136,255,0.8)" }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          ← Return to Space
        </motion.button>

        {/* Planet header */}
        <motion.div
          className="pt-20 pb-6 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-6xl mb-3">{activePlanet.emoji}</div>
          <h1
            className="text-4xl font-bold tracking-wider text-white"
            style={{ textShadow: `0 0 30px ${activePlanet.atmosphereColor}88` }}
          >
            {activePlanet.name}
          </h1>
          <p className="text-sm text-blue-400 tracking-widest mt-2 font-mono uppercase">
            {activePlanet.section}
          </p>
          <div className="mt-3 text-xs text-blue-600 font-mono italic">
            &quot;{activePlanet.missionLog}&quot;
          </div>
        </motion.div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-6 pb-20">
          {renderContent()}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
