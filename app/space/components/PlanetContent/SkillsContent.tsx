"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const SKILLS = [
  { name: "Python", level: 92, icon: "🐍", category: "Language", color: "#f5c518" },
  { name: "Java", level: 85, icon: "☕", category: "Language", color: "#ff6b35" },
  { name: "JavaScript", level: 88, icon: "⚡", category: "Language", color: "#f7df1e" },
  { name: "TypeScript", level: 82, icon: "🔷", category: "Language", color: "#3178c6" },
  { name: "C++", level: 78, icon: "⚙️", category: "Language", color: "#00599c" },
  { name: "React", level: 90, icon: "⚛️", category: "Frontend", color: "#61dafb" },
  { name: "Next.js", level: 85, icon: "▲", category: "Frontend", color: "#ffffff" },
  { name: "Three.js", level: 75, icon: "🎮", category: "Frontend", color: "#049ef4" },
  { name: "Node.js", level: 83, icon: "🟢", category: "Backend", color: "#339933" },
  { name: "FastAPI", level: 80, icon: "🚀", category: "Backend", color: "#009688" },
  { name: "TensorFlow", level: 82, icon: "🧠", category: "AI/ML", color: "#ff6f00" },
  { name: "PyTorch", level: 80, icon: "🔥", category: "AI/ML", color: "#ee4c2c" },
  { name: "Scikit-learn", level: 85, icon: "📊", category: "AI/ML", color: "#f89939" },
  { name: "OpenCV", level: 78, icon: "👁️", category: "AI/ML", color: "#5c3ee8" },
  { name: "MongoDB", level: 80, icon: "🍃", category: "Database", color: "#47a248" },
  { name: "PostgreSQL", level: 78, icon: "🐘", category: "Database", color: "#336791" },
  { name: "Docker", level: 72, icon: "🐋", category: "DevOps", color: "#2496ed" },
  { name: "Git", level: 90, icon: "📂", category: "DevOps", color: "#f05032" },
  { name: "AWS", level: 68, icon: "☁️", category: "Cloud", color: "#ff9900" },
  { name: "Figma", level: 75, icon: "🎨", category: "Design", color: "#f24e1e" },
];

const CATEGORIES = ["All", "Language", "Frontend", "Backend", "AI/ML", "Database", "DevOps", "Cloud", "Design"];

export function SkillsContent() {
  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = filter === "All" ? SKILLS : SKILLS.filter(s => s.category === filter);

  return (
    <div className="space-y-8">
      {/* Category filter */}
      <motion.div
        className="flex flex-wrap gap-2 justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="px-4 py-2 rounded-full text-xs tracking-wider font-mono transition-all cursor-pointer"
            style={{
              background: filter === cat
                ? "linear-gradient(135deg, #1a6b8a, #0d3360)"
                : "rgba(0,15,40,0.6)",
              border: filter === cat
                ? "1px solid rgba(68,200,255,0.6)"
                : "1px solid rgba(68,136,255,0.2)",
              color: filter === cat ? "#88eeff" : "#556699",
            }}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Skill orbs grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
        layout
      >
        {filtered.map((skill, i) => (
          <motion.div
            key={skill.name}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04 }}
            onHoverStart={() => setHovered(skill.name)}
            onHoverEnd={() => setHovered(null)}
            className="flex flex-col items-center gap-3 p-5 rounded-2xl cursor-default"
            style={{
              background: hovered === skill.name
                ? `linear-gradient(135deg, ${skill.color}22, rgba(0,10,30,0.8))`
                : "rgba(0,10,30,0.6)",
              border: hovered === skill.name
                ? `1px solid ${skill.color}88`
                : "1px solid rgba(68,136,255,0.15)",
              backdropFilter: "blur(10px)",
              boxShadow: hovered === skill.name
                ? `0 0 30px ${skill.color}33`
                : "none",
              transition: "all 0.3s ease",
            }}
          >
            {/* Icon orb */}
            <motion.div
              className="text-3xl"
              animate={
                hovered === skill.name
                  ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }
                  : {}
              }
              transition={{ duration: 0.5 }}
            >
              {skill.icon}
            </motion.div>

            <div className="text-sm font-semibold text-white text-center">{skill.name}</div>

            {/* Progress ring simulation */}
            <div className="w-full">
              <div className="flex justify-between text-[10px] mb-1">
                <span className="font-mono" style={{ color: skill.color }}>
                  {skill.category}
                </span>
                <span className="text-blue-400">{skill.level}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-blue-950 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ delay: i * 0.04 + 0.3, duration: 0.8 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
