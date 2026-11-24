"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGameState } from "../hooks/useGameState";

export function MissionComplete() {
  const { phase, discoveredCount } = useGameState();

  if (phase !== "missionComplete") return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center"
        style={{ background: "radial-gradient(ellipse at center, #020b1f 0%, #000000 100%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Stars burst */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, rgba(68,136,255,0.15) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 5 }}
        />

        <motion.div
          className="text-center px-8 max-w-2xl relative z-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <motion.div
            className="text-7xl mb-6"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            🏆
          </motion.div>

          <motion.div
            className="text-xs tracking-[0.6em] text-cyan-400 mb-4 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            MISSION COMPLETE
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            style={{ textShadow: "0 0 40px rgba(68,136,255,0.5)" }}
          >
            You now know the story behind{" "}
            <span style={{ color: "#44ddff" }}>Tisa Biswal.</span>
          </motion.h1>

          <motion.p
            className="text-blue-300 text-lg mb-10 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
          >
            Thank you for exploring my universe.
            <br />
            <span className="text-base text-blue-500">
              {discoveredCount} planets discovered · Journey complete
            </span>
          </motion.p>

          <motion.div
            className="text-xl font-bold text-white mb-8 tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            &quot;Let&apos;s Build the Future Together.&quot;
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4 }}
          >
            {[
              { label: "📄 Download Resume", href: "/resume/Resume.pdf", primary: true, target: "_blank" },
              { label: "💼 Hire Me", href: "mailto:tisabiswal29@gmail.com", primary: true },
              { label: "🐙 GitHub", href: "https://github.com/tisa1101", primary: false, target: "_blank" },
              { label: "💬 LinkedIn", href: "https://linkedin.com/in/tisa-biswal/", primary: false, target: "_blank" },
            ].map((btn) => (
              <a
                key={btn.label}
                href={btn.href}
                target={btn.target}
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full text-sm font-mono tracking-wider transition-all"
                style={
                  btn.primary
                    ? {
                        background: "linear-gradient(135deg, #0044ff, #0088ff)",
                        border: "1px solid rgba(68,136,255,0.6)",
                        color: "#fff",
                        boxShadow: "0 0 20px rgba(68,136,255,0.3)",
                      }
                    : {
                        background: "rgba(0,10,30,0.8)",
                        border: "1px solid rgba(68,136,255,0.3)",
                        color: "#88bbff",
                      }
                }
              >
                {btn.label}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
