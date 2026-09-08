"use client";

import { motion } from "framer-motion";
import { PlanetData } from "../../constants/planets";

export function GenericPlanetContent({ planet }: { planet: PlanetData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div
        className="rounded-2xl p-10 text-center"
        style={{
          background: "rgba(0,10,30,0.7)",
          border: `1px solid ${planet.color}33`,
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="text-6xl mb-6">{planet.emoji}</div>
        <h2 className="text-2xl font-bold text-white mb-3">{planet.section}</h2>
        <p className="text-blue-200 mb-6 leading-relaxed">{planet.missionLog}</p>
        <div
          className="inline-block px-6 py-3 rounded-full text-sm font-mono"
          style={{
            background: `${planet.color}15`,
            border: `1px solid ${planet.color}44`,
            color: planet.color,
          }}
        >
          🚧 Full content coming soon — stay tuned, Commander
        </div>
      </div>
    </motion.div>
  );
}
