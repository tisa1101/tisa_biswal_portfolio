"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function ContactContent() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate send
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Links */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {[
          { label: "GitHub", icon: "🐙", href: "https://github.com/tisa1101", color: "#f5a623" },
          { label: "LinkedIn", icon: "💼", href: "https://linkedin.com/in/tisa-biswal/", color: "#0088ff" },
          { label: "Email", icon: "📧", href: "mailto:tisabiswal29@gmail.com", color: "#00bb88" },
          { label: "Resume", icon: "📄", href: "/resume/Resume.pdf", color: "#aa44ff" },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 p-4 rounded-xl text-center transition-all"
            style={{
              background: `${link.color}11`,
              border: `1px solid ${link.color}33`,
              color: link.color,
            }}
          >
            <span className="text-2xl">{link.icon}</span>
            <span className="text-xs font-mono tracking-wider">{link.label}</span>
          </a>
        ))}
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="rounded-2xl p-8 space-y-5"
        style={{
          background: "rgba(0,10,30,0.7)",
          border: "1px solid rgba(68,136,255,0.2)",
          backdropFilter: "blur(12px)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl font-bold text-white tracking-wider">📡 Open a Transmission</h3>

        {["name", "email"].map((field) => (
          <div key={field}>
            <label className="text-xs text-blue-400 tracking-widest uppercase font-mono mb-2 block">
              {field}
            </label>
            <input
              type={field === "email" ? "email" : "text"}
              value={(form as any)[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              required
              placeholder={field === "email" ? "commander@space.io" : "Your Name"}
              className="w-full px-4 py-3 rounded-xl text-sm font-mono text-white outline-none transition-all"
              style={{
                background: "rgba(0,20,50,0.6)",
                border: "1px solid rgba(68,136,255,0.2)",
              }}
            />
          </div>
        ))}

        <div>
          <label className="text-xs text-blue-400 tracking-widest uppercase font-mono mb-2 block">
            Message
          </label>
          <textarea
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            placeholder="Your mission briefing..."
            className="w-full px-4 py-3 rounded-xl text-sm font-mono text-white outline-none resize-none transition-all"
            style={{
              background: "rgba(0,20,50,0.6)",
              border: "1px solid rgba(68,136,255,0.2)",
            }}
          />
        </div>

        <motion.button
          type="submit"
          disabled={status === "sending" || status === "sent"}
          className="w-full py-4 rounded-xl font-mono text-sm tracking-wider cursor-pointer transition-all"
          style={{
            background:
              status === "sent"
                ? "linear-gradient(135deg, #00bb88, #007755)"
                : "linear-gradient(135deg, #0044ff, #0088ff)",
            border: "1px solid rgba(68,136,255,0.4)",
            color: "#fff",
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {status === "sending"
            ? "⏳ Transmitting..."
            : status === "sent"
            ? "✅ Transmission Received!"
            : "🚀 Send Transmission"}
        </motion.button>
      </motion.form>
    </div>
  );
}
