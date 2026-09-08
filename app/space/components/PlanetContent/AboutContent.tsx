"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function AboutContent() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-10">
      
      {/* Profile card */}
      <motion.div
        variants={item}
        className="rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center"
        style={{
          background: "rgba(0,20,50,0.6)",
          border: "1px solid rgba(68,136,255,0.2)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div
          className="w-36 h-36 rounded-full flex-shrink-0 flex items-center justify-center text-6xl"
          style={{
            background: "linear-gradient(135deg, #1a3a6b, #0d2240)",
            border: "3px solid rgba(68,136,255,0.5)",
            boxShadow: "0 0 40px rgba(68,136,255,0.3)",
          }}
        >
          👩‍💻
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-white mb-2">Tisa Biswal</h2>
          <p className="text-cyan-300 text-lg mb-4 font-mono">
            CS Engineer · AI Researcher · Healthcare Innovator
          </p>
          <p className="text-blue-200 leading-relaxed max-w-xl">
            A passionate computer science engineer building at the intersection of artificial intelligence 
            and healthcare. I craft full-stack systems, train neural networks, and design experiences 
            that make technology more human. Currently exploring how AI can transform medical diagnosis.
          </p>
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Projects Built", value: "20+", icon: "🚀" },
          { label: "Technologies", value: "30+", icon: "⚡" },
          { label: "Hackathons", value: "8", icon: "🏆" },
          { label: "GitHub Commits", value: "1K+", icon: "📈" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-5 text-center"
            style={{
              background: "rgba(0,15,40,0.7)",
              border: "1px solid rgba(68,136,255,0.2)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold text-cyan-300">{stat.value}</div>
            <div className="text-xs text-blue-400 mt-1 tracking-wider uppercase">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Journey Timeline */}
      <motion.div variants={item}>
        <h3 className="text-xl font-bold text-white mb-6 tracking-wider">
          📍 Journey Timeline
        </h3>
        <div className="space-y-4">
          {[
            { year: "2021", event: "Started B.Tech in Computer Science", icon: "🎓", color: "#4488ff" },
            { year: "2022", event: "Built first AI model — image classifier with 94% accuracy", icon: "🧠", color: "#aa44ff" },
            { year: "2023", event: "Won national hackathon with MedTech AI solution", icon: "🏆", color: "#ffaa00" },
            { year: "2024", event: "Research internship — AI-powered disease detection system", icon: "🔬", color: "#00bb88" },
            { year: "2025", event: "Published patent in healthcare AI domain", icon: "📄", color: "#ff6644" },
            { year: "2026", event: "Building the future — open to opportunities", icon: "🚀", color: "#44ddff" },
          ].map((t, i) => (
            <motion.div
              key={i}
              className="flex gap-4 items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: `${t.color}22`, border: `1px solid ${t.color}66` }}
                >
                  {t.icon}
                </div>
                {i < 5 && <div className="w-px h-8 mt-1" style={{ background: `${t.color}33` }} />}
              </div>
              <div className="pb-4">
                <span
                  className="text-xs font-mono tracking-widest"
                  style={{ color: t.color }}
                >
                  {t.year}
                </span>
                <p className="text-blue-100 mt-1">{t.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Interests */}
      <motion.div variants={item}>
        <h3 className="text-xl font-bold text-white mb-4 tracking-wider">🌌 Interests</h3>
        <div className="flex flex-wrap gap-3">
          {[
            "Artificial Intelligence", "Machine Learning", "Healthcare Tech",
            "Full Stack Development", "Computer Vision", "NLP",
            "Open Source", "Research", "Game Development",
          ].map((interest) => (
            <span
              key={interest}
              className="px-4 py-2 rounded-full text-sm"
              style={{
                background: "rgba(68,136,255,0.1)",
                border: "1px solid rgba(68,136,255,0.25)",
                color: "#88ccff",
              }}
            >
              {interest}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
