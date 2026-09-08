"use client";

import { motion } from "framer-motion";

const EXPERIENCES = [
  {
    role: "AI Research Intern",
    company: "Healthcare AI Lab",
    period: "May 2024 – Oct 2024",
    type: "Research",
    emoji: "🔬",
    color: "#00bb88",
    highlights: [
      "Developed CNN-based disease detection model achieving 96% accuracy",
      "Built automated data preprocessing pipeline reducing training time by 40%",
      "Co-authored research paper on transfer learning for medical imaging",
      "Deployed model API serving 200+ daily inference requests",
    ],
    tech: ["Python", "TensorFlow", "FastAPI", "Docker"],
  },
  {
    role: "Full Stack Developer Intern",
    company: "TechStart Solutions",
    period: "Dec 2023 – Mar 2024",
    type: "Industry",
    emoji: "💼",
    color: "#4488ff",
    highlights: [
      "Built RESTful API for e-commerce platform serving 10K+ users",
      "Implemented real-time notification system using WebSockets",
      "Improved page load speed by 60% through lazy loading and code splitting",
      "Led team of 3 interns to deliver feature on time",
    ],
    tech: ["React", "Node.js", "MongoDB", "AWS"],
  },
  {
    role: "Open Source Contributor",
    company: "Multiple Projects",
    period: "2022 – Present",
    type: "Open Source",
    emoji: "🌐",
    color: "#f5a623",
    highlights: [
      "Contributed to 5+ open-source ML libraries with 100+ stars",
      "Fixed critical bugs in widely-used Python packages",
      "Wrote comprehensive documentation and test suites",
      "Mentored newcomers through good-first-issue tickets",
    ],
    tech: ["Python", "TypeScript", "Git", "GitHub Actions"],
  },
  {
    role: "Teaching Assistant",
    company: "University CS Department",
    period: "Aug 2023 – Dec 2023",
    type: "Academic",
    emoji: "🎓",
    color: "#aa44ff",
    highlights: [
      "Taught data structures and algorithms to 80+ students",
      "Conducted weekly lab sessions on competitive programming",
      "Designed 15+ practice problems and graded assignments",
      "Achieved 4.8/5 student satisfaction rating",
    ],
    tech: ["Java", "C++", "Python"],
  },
];

export function ExperienceContent() {
  return (
    <div className="space-y-6">
      {EXPERIENCES.map((exp, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.15, duration: 0.6 }}
          className="rounded-2xl p-6"
          style={{
            background: "rgba(0,10,30,0.7)",
            border: `1px solid ${exp.color}33`,
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            {/* Left */}
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
              style={{
                background: `${exp.color}15`,
                border: `1px solid ${exp.color}44`,
              }}
            >
              {exp.emoji}
            </div>

            {/* Right */}
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                <div>
                  <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                  <p className="text-sm" style={{ color: exp.color }}>
                    {exp.company}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className="text-xs px-3 py-1 rounded-full font-mono"
                    style={{
                      background: `${exp.color}15`,
                      border: `1px solid ${exp.color}33`,
                      color: exp.color,
                    }}
                  >
                    {exp.type}
                  </span>
                  <span className="text-xs text-blue-400 font-mono">{exp.period}</span>
                </div>
              </div>

              {/* Highlights */}
              <ul className="mt-3 space-y-1.5">
                {exp.highlights.map((h, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 + j * 0.07 + 0.3 }}
                    className="flex items-start gap-2 text-sm text-blue-200"
                  >
                    <span style={{ color: exp.color }} className="mt-0.5 flex-shrink-0">▸</span>
                    {h}
                  </motion.li>
                ))}
              </ul>

              {/* Tech */}
              <div className="flex flex-wrap gap-2 mt-3">
                {exp.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[10px] font-mono"
                    style={{
                      background: `${exp.color}10`,
                      border: `1px solid ${exp.color}25`,
                      color: `${exp.color}cc`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
