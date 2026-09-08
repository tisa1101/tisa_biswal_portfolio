"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PanelWrapper } from "./PanelWrapper";

interface SkillsPanelProps {
  onClose: () => void;
}

type Category = "All" | "AI/ML" | "Web" | "Tools";

const SKILLS: {
  name: string;
  icon: string;
  category: Category;
  color: string;
  desc: string;
  projects: string[];
}[] = [
  { name: "Python", icon: "/tech/python.svg", category: "AI/ML", color: "#4488ff", desc: "Primary language for all AI/ML projects", projects: ["Dr. Glance AI", "MedBridge", "T-Rex Sports AI"] },
  { name: "TensorFlow", icon: "/tech/tensorflow.svg", category: "AI/ML", color: "#ff8844", desc: "CNN training and model deployment", projects: ["Dr. Glance AI", "MedBridge"] },
  { name: "OpenCV", icon: "/tech/opencv.svg", category: "AI/ML", color: "#44cc88", desc: "Real-time computer vision processing", projects: ["Dr. Glance AI", "T-Rex Sports AI"] },
  { name: "React JS", icon: "/tech/reactjs.webp", category: "Web", color: "#61dafb", desc: "Frontend UI for all web platforms", projects: ["NauvriQuest", "Agentic Monitor"] },
  { name: "Next.JS", icon: "/tech/nextjs.svg", category: "Web", color: "#ffffff", desc: "Full-stack React framework", projects: ["Agentic Monitor", "This Portfolio"] },
  { name: "Flask", icon: "/tech/flask.svg", category: "Web", color: "#aaaaaa", desc: "Lightweight API backend for ML models", projects: ["Dr. Glance AI", "MedBridge"] },
  { name: "Node JS", icon: "/tech/javascript.webp", category: "Web", color: "#f7df1e", desc: "Backend services and API development", projects: ["NauvriQuest"] },
  { name: "MongoDB", icon: "/tech/mongodb.svg", category: "Web", color: "#4db33d", desc: "NoSQL database for flexible schemas", projects: ["NauvriQuest", "Agentic Monitor"] },
  { name: "MySQL", icon: "/tech/mysql.svg", category: "Web", color: "#00758f", desc: "Relational database for structured data", projects: ["MedBridge"] },
  { name: "Tailwind CSS", icon: "/tech/tailwind.webp", category: "Web", color: "#38bdf8", desc: "Utility-first CSS for fast UI", projects: ["NauvriQuest", "This Portfolio"] },
  { name: "Three JS", icon: "/tech/threejs.webp", category: "Web", color: "#aaaaff", desc: "3D graphics and WebGL experiences", projects: ["This Portfolio"] },
  { name: "git", icon: "/tech/git.webp", category: "Tools", color: "#f05032", desc: "Version control and collaboration", projects: ["All Projects"] },
  { name: "Vercel", icon: "/tech/vercel.svg", category: "Tools", color: "#cccccc", desc: "Deployment and hosting platform", projects: ["Agentic Monitor", "This Portfolio"] },
];

const CATEGORIES: Category[] = ["All", "AI/ML", "Web", "Tools"];

const POSITIONS = [
  { top: "10%", left: "18%" },
  { top: "6%", left: "50%" },
  { top: "10%", left: "78%" },
  { top: "35%", left: "8%" },
  { top: "38%", left: "35%" },
  { top: "35%", left: "62%" },
  { top: "35%", left: "88%" },
  { top: "62%", left: "18%" },
  { top: "62%", left: "50%" },
  { top: "62%", left: "78%" },
  { top: "85%", left: "8%" },
  { top: "85%", left: "38%" },
  { top: "85%", left: "68%" },
];

const FLOAT_DURATIONS = [3.2, 4.1, 3.7, 4.5, 3.0, 4.8, 3.5, 4.2, 3.9, 4.6, 3.3, 4.0, 3.6];

export function SkillsPanel({ onClose }: SkillsPanelProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedSkill, setSelectedSkill] = useState<(typeof SKILLS)[0] | null>(null);

  const filtered = activeCategory === "All" ? SKILLS : SKILLS.filter((s) => s.category === activeCategory);

  return (
    <PanelWrapper onClose={onClose} planetName="Skills" planetEmoji="🪐" accentColor="#8844ee">
      {/* Category filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {CATEGORIES.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.1em",
              padding: "6px 16px",
              borderRadius: 20,
              border: `1px solid ${activeCategory === cat ? "#8844ee" : "rgba(136,68,238,0.2)"}`,
              background: activeCategory === cat ? "rgba(136,68,238,0.2)" : "rgba(136,68,238,0.05)",
              color: activeCategory === cat ? "#cc88ff" : "#668899",
              cursor: "none",
              transition: "all 0.2s ease",
            }}
          >
            {cat}
          </motion.button>
        ))}
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 10,
            color: "#445566",
            alignSelf: "center",
            marginLeft: "auto",
            letterSpacing: "0.1em",
          }}
        >
          {filtered.length} TECHNOLOGIES
        </span>
      </div>

      {/* Constellation / orb layout */}
      <AnimatePresence mode="wait">
        {activeCategory === "All" ? (
          /* Constellation scatter layout */
          <motion.div
            key="constellation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "relative",
              height: 440,
              width: "100%",
            }}
          >
            {/* SVG lines between related orbs */}
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                opacity: 0.12,
              }}
            >
              <line x1="18%" y1="10%" x2="50%" y2="6%" stroke="#8844ee" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="50%" y1="6%" x2="78%" y2="10%" stroke="#8844ee" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="18%" y1="10%" x2="8%" y2="35%" stroke="#8844ee" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="50%" y1="6%" x2="35%" y2="38%" stroke="#8844ee" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="78%" y1="10%" x2="62%" y2="35%" stroke="#8844ee" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="35%" y1="38%" x2="62%" y2="35%" stroke="#8844ee" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="8%" y1="35%" x2="18%" y2="62%" stroke="#8844ee" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="62%" y1="35%" x2="50%" y2="62%" stroke="#8844ee" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="88%" y1="35%" x2="78%" y2="62%" stroke="#8844ee" strokeWidth="1" strokeDasharray="4 4" />
            </svg>

            {SKILLS.map((skill, i) => (
              <SkillOrb
                key={skill.name}
                skill={skill}
                position={POSITIONS[i % POSITIONS.length]}
                floatDuration={FLOAT_DURATIONS[i % FLOAT_DURATIONS.length]}
                delay={i * 0.05}
                onClick={() => setSelectedSkill(skill)}
              />
            ))}
          </motion.div>
        ) : (
          /* Grid layout for filtered */
          <motion.div
            key={`grid-${activeCategory}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              justifyContent: "center",
              paddingBottom: 8,
            }}
          >
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => setSelectedSkill(skill)}
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  background: "rgba(136,68,238,0.08)",
                  border: `2px solid ${skill.color}44`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  cursor: "none",
                  boxShadow: `0 0 16px ${skill.color}22`,
                  transition: "box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 28px ${skill.color}55`;
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${skill.color}88`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 16px ${skill.color}22`;
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${skill.color}44`;
                }}
              >
                <Image src={skill.icon} alt={skill.name} width={36} height={36} style={{ objectFit: "contain" }} />
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 9,
                    fontWeight: 600,
                    color: "#99aacc",
                    textAlign: "center",
                    letterSpacing: "0.05em",
                  }}
                >
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side panel for selected skill */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            style={{
              position: "fixed",
              top: "50%",
              right: 40,
              transform: "translateY(-50%)",
              width: 240,
              background: "rgba(8,16,44,0.97)",
              border: "1px solid rgba(136,68,238,0.35)",
              borderRadius: 16,
              padding: 20,
              zIndex: 100,
              boxShadow: "0 0 40px rgba(136,68,238,0.25)",
            }}
          >
            <button
              onClick={() => setSelectedSkill(null)}
              style={{
                position: "absolute",
                top: 10,
                right: 12,
                background: "none",
                border: "none",
                color: "#667788",
                cursor: "none",
                fontSize: 14,
              }}
            >
              ✕
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <Image src={selectedSkill.icon} alt={selectedSkill.name} width={32} height={32} style={{ objectFit: "contain" }} />
              <div>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#ddeeff", margin: 0, fontSize: 15 }}>{selectedSkill.name}</p>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "#8844ee", letterSpacing: "0.1em" }}>{selectedSkill.category}</span>
              </div>
            </div>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: "#7799aa", lineHeight: 1.6, margin: "0 0 14px" }}>{selectedSkill.desc}</p>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: "#8844ee", letterSpacing: "0.12em", margin: "0 0 8px", textTransform: "uppercase" }}>Used In</p>
            {selectedSkill.projects.map((p) => (
              <div key={p} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: selectedSkill.color, display: "inline-block", flexShrink: 0 }} />
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, color: "#99aacc" }}>{p}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </PanelWrapper>
  );
}

function SkillOrb({
  skill,
  position,
  floatDuration,
  delay,
  onClick,
}: {
  skill: (typeof SKILLS)[0];
  position: { top: string; left: string };
  floatDuration: number;
  delay: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 20 }}
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
      }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: floatDuration, ease: "easeInOut" }}
      >
        <motion.div
          onClick={onClick}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.93 }}
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "rgba(136,68,238,0.1)",
            border: `2px solid ${skill.color}55`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "none",
            boxShadow: `0 0 18px ${skill.color}33`,
            transition: "box-shadow 0.2s ease, border-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 30px ${skill.color}66`;
            (e.currentTarget as HTMLDivElement).style.borderColor = `${skill.color}99`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 18px ${skill.color}33`;
            (e.currentTarget as HTMLDivElement).style.borderColor = `${skill.color}55`;
          }}
        >
          <Image src={skill.icon} alt={skill.name} width={30} height={30} style={{ objectFit: "contain" }} />
        </motion.div>
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 10,
            fontWeight: 600,
            color: "#8899bb",
            textAlign: "center",
            margin: "6px 0 0",
            whiteSpace: "nowrap",
          }}
        >
          {skill.name}
        </p>
      </motion.div>
    </motion.div>
  );
}
