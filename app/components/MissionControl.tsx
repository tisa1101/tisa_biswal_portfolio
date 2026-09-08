"use client";
import { motion } from "framer-motion";

const KPI_CARDS = [
  { label: "AI Research", value: "2 Patents", accent: "#915eff" },
  { label: "Current Focus", value: "Computer Vision", accent: "#00cea8" },
  { label: "Status", value: "Available for Internship", accent: "#4488ff" },
  { label: "Mission", value: "Building AI Healthcare Systems", accent: "#ff6b6b" },
];

const MissionControl = () => {
  return (
    <section id="mission-control" className="relative overflow-hidden px-6 md:px-16 pb-20 pt-14 lg:pb-24">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 w-[320px] h-[320px] -translate-x-1/2 rounded-full bg-[#915eff]/10 blur-3xl" />
        <div className="absolute right-10 top-10 w-[180px] h-[180px] rounded-full bg-[#00cea8]/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.4 }}
          className="mb-10 flex flex-col gap-3"
        >
          <p className="sectionSubText">MISSION CONTROL</p>
          <h2 className="sectionHeadText">AI Operations for Healthcare Impact.</h2>
          <p className="text-[#d6dcff] max-w-2xl text-[16px] leading-[30px]">
            A premium intelligence cockpit that communicates mission status, research focus, and innovation momentum in a polished executive layout.
          </p>
        </motion.div>

        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr] items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true, amount: 0.4 }}
            className="mission-control-panel"
          >
            <div className="grid gap-4 lg:grid-cols-2">
              {KPI_CARDS.map((item, index) => (
                <div
                  key={item.label}
                  className="mission-control-card group"
                  style={{ borderColor: `${item.accent}20`, boxShadow: `0 20px 50px ${item.accent}15` }}
                >
                  <div className="flex justify-between items-start gap-3">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.36em] text-white/60">
                      {item.label}
                    </span>
                    <span className="w-3 h-3 rounded-full" style={{ background: item.accent }} />
                  </div>
                  <p className="mt-5 font-semibold text-white text-[18px] leading-[1.2]">{item.value}</p>
                  <div className="mt-5 h-1 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#915eff] via-[#00cea8] to-[#4488ff]"
                      animate={{ width: ["20%", "100%", "35%"] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[30px] border border-white/10 bg-[#050816]/80 p-6 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
                <p className="text-[10px] uppercase font-semibold tracking-[0.4em] text-[#00cea8] mb-4">Mission</p>
                <h3 className="text-white text-[18px] font-bold leading-tight">
                  Building AI Healthcare Systems
                </h3>
              </div>
              <div className="rounded-[30px] border border-white/10 bg-[#050816]/80 p-6 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
                <p className="text-[10px] uppercase font-semibold tracking-[0.4em] text-[#915eff] mb-4">Team</p>
                <h3 className="text-white text-[18px] font-bold leading-tight">
                  Solo Architect + AI Researcher
                </h3>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.4 }}
            className="mission-dashboard relative rounded-[36px] border border-white/10 bg-[#050816]/75 p-6 backdrop-blur-3xl shadow-[0_35px_80px_rgba(0,0,0,0.35)]"
          >
            <div className="absolute -top-8 left-6 w-24 h-24 rounded-full bg-[#00cea8]/10 blur-3xl" />
            <div className="absolute bottom-0 right-6 w-28 h-28 rounded-full bg-[#915eff]/10 blur-3xl" />
            <div className="flex flex-col gap-6">
              <div className="rounded-3xl border border-white/10 bg-[#0c0c1d]/90 p-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[11px] uppercase tracking-[0.35em] text-white/50">Current Status</span>
                  <span className="rounded-full bg-[#00cea8]/10 px-3 py-1 text-[11px] font-semibold text-[#00cea8]">Live</span>
                </div>
                <div className="mt-4 text-white text-xl font-semibold leading-tight">Available for Internship</div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="mission-control-mini-card">
                  <span className="text-[10px] uppercase tracking-[0.35em] text-[#aaa6c3]">Patent</span>
                  <p className="mt-2 text-white font-semibold text-lg">2 Filed</p>
                </div>
                <div className="mission-control-mini-card">
                  <span className="text-[10px] uppercase tracking-[0.35em] text-[#aaa6c3]">Research</span>
                  <p className="mt-2 text-white font-semibold text-lg">AI + MedTech</p>
                </div>
              </div>

              <div className="mt-4 rounded-[28px] border border-white/10 bg-[#0b1024]/95 p-5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(145,94,255,0.18),transparent_30%)]" />
                <div className="relative">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-[11px] uppercase tracking-[0.35em] text-[#00cea8]">Progress</span>
                    <span className="text-[10px] uppercase tracking-[0.35em] text-white/40">AI Lab</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-[76%] bg-gradient-to-r from-[#915eff] via-[#00cea8] to-[#4488ff]" />
                  </div>
                  <div className="mt-4 flex items-center justify-between text-[12px] text-[#aaa6c3]">
                    <span>Model design</span>
                    <span>76%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionControl;
