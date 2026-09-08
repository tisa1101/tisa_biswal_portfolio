"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ComputersCanvas } from "./canvas";
import AIMissionControl from "./AIMissionControl";

const Hero = () => {
	const [currentPhrase, setCurrentPhrase] = useState(0);
	const phrases = ["AI-driven healthcare", "autonomous systems", "MedTech innovation"];

	useEffect(() => {
		const interval = window.setInterval(() => {
			setCurrentPhrase((prev) => (prev + 1) % phrases.length);
		}, 2200);

		return () => window.clearInterval(interval);
	}, [phrases.length]);

	return (
		<section id="hero" className="relative w-full min-h-[100dvh] mx-auto overflow-hidden aurora-bg flex flex-col justify-center">
			<div className="absolute inset-0 animated-grid z-0" />
			
			<div className="paddingX relative w-[92vw] max-w-[1920px] mx-auto flex flex-col justify-between z-10 pt-28 sm:pt-32 pb-12 sm:pb-16 min-h-[100dvh]">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center w-full my-auto">
					{/* Left Side: Text Content */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 1, ease: "easeOut" }}
						className="w-full flex flex-col gap-6 text-center lg:text-left items-center lg:items-start z-10"
					>
						<div className="futuristic-badge w-fit flex items-center gap-2">
							<span className="w-2 h-2 rounded-full bg-[#915eff] animate-pulse" />
							AI • Healthcare • Innovation
						</div>
						
						<h1 className="heroHeadText !leading-[1.1]">
							Hi, I&apos;m <span className="glow-text-animated font-extrabold">Tisa</span>
						</h1>
						
						<p className="heroSubText text-white/80 leading-[1.6]">
							Engineering the next generation of{" "}
							<motion.span
								key={phrases[currentPhrase]}
								initial={{ opacity: 0, y: 8 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.35 }}
								className="text-white font-bold underline decoration-[#00cea8] decoration-2 underline-offset-8"
							>
								{phrases[currentPhrase]}
							</motion.span>
							{" "}through autonomous systems and MedTech innovation.
						</p>

						<div className="mt-4 flex flex-wrap gap-4 justify-center lg:justify-start">
							<motion.a
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								href="#work"
								className="bg-gradient-to-r from-[#915eff] to-[#00cea8] px-8 py-4 rounded-2xl font-bold text-white premium-button-glow flex items-center gap-2"
							>
								Explore My Work <span>→</span>
							</motion.a>
							<motion.a
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								href="#achievements"
								className="px-8 py-4 rounded-2xl font-bold text-white border border-white/10 glass-morphism transition-all flex items-center gap-2"
							>
								View Projects 💼
							</motion.a>
						</div>

						{/* Experience Mode Selector Group */}
						<div className="mt-4 flex flex-col gap-2 w-full items-center lg:items-start">
							<span className="text-[10px] font-mono font-bold text-[#00cea8] uppercase tracking-[0.25em]">EXPERIENCE MODES</span>
							<div className="flex flex-wrap gap-3 justify-center lg:justify-start">
								<motion.a
									whileHover={{ scale: 1.05, y: -2 }}
									whileTap={{ scale: 0.95 }}
									href="#about"
									className="px-4 py-2.5 rounded-2xl font-mono text-xs font-bold text-[#00cea8] border border-[#00cea8]/40 bg-[#00cea8]/10 hover:bg-[#00cea8]/25 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,206,168,0.2)]"
								>
									<span>🎙 VOICE INTRO</span>
									<span className="text-[10px] text-white/60">• Hear my story</span>
								</motion.a>
								<motion.a
									whileHover={{ scale: 1.05, y: -2 }}
									whileTap={{ scale: 0.95 }}
									href="/universe"
									className="px-4 py-2.5 rounded-2xl font-mono text-xs font-bold text-[#4dd9ff] border border-[#4dd9ff]/40 bg-[#4dd9ff]/10 hover:bg-[#4dd9ff]/25 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(77,217,255,0.2)]"
								>
									<span>🌌 GALAXY MODE</span>
									<span className="text-[10px] text-white/60">• Explore universe</span>
								</motion.a>
								<motion.a
									whileHover={{ scale: 1.05, y: -2 }}
									whileTap={{ scale: 0.95 }}
									href="/space"
									className="px-4 py-2.5 rounded-2xl font-mono text-xs font-bold text-[#c273ff] border border-[#c273ff]/40 bg-[#c273ff]/10 hover:bg-[#c273ff]/25 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(194,115,255,0.2)]"
								>
									<span>🎮 3D GAME MODE</span>
									<span className="text-[10px] text-white/60">• Enter simulation</span>
								</motion.a>
							</div>
						</div>

						{/* Establish Connection Social Icons */}
						<div className="mt-4 flex flex-col items-center lg:items-start gap-2 w-full">
							<span className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-[0.25em]">ESTABLISH CONNECTION</span>
							<div className="flex flex-wrap gap-3 justify-center lg:justify-start">
								{[
									{ id: "github", name: "GitHub", sub: "View code", icon: "/tech/github.webp", link: "https://github.com/tisa1101" },
									{ id: "linkedin", name: "LinkedIn", sub: "Connect", icon: "/socialmedia/linkedin.svg", link: "https://linkedin.com/in/tisa-biswal" },
									{ id: "resume", name: "Resume", sub: "Profile", icon: "/resume.svg", link: "/resume/Resume.pdf" },
								].map((social) => (
									<Link 
										key={social.id}
										href={social.link} 
										target="_blank"
										className="px-4 py-2 rounded-2xl bg-black/60 border border-white/15 hover:border-[#00cea8] flex items-center gap-2.5 backdrop-blur-md transition-all hover:scale-105 group shadow-md"
									>
										<Image src={social.icon} width={20} height={20} alt={social.id} className="opacity-80 group-hover:opacity-100 object-contain" />
										<div className="flex flex-col text-left">
											<span className="text-white text-xs font-bold font-sans group-hover:text-[#00cea8] transition-colors">{social.name}</span>
											<span className="text-[9px] text-secondary font-mono">{social.sub}</span>
										</div>
									</Link>
								))}
							</div>
						</div>
					</motion.div>

					{/* Right Side: 3D Canvas + AIMissionControl */}
					<div className="flex-1 w-full h-[400px] sm:h-[480px] md:h-[540px] lg:h-[620px] xl:h-[720px] 2xl:h-[820px] relative z-0 floating">
						<ComputersCanvas />
						<AIMissionControl />
						{/* Ambient Glow beneath the desk */}
						<div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[350px] h-[60px] bg-[#915eff]/25 blur-[70px] rounded-full" />
					</div>
				</div>

				{/* Mission Statistics Row */}
				<div className="w-full mt-8 lg:mt-14">
					<div className="text-center mb-3">
						<span className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-[0.3em]">MISSION STATISTICS</span>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 xl:gap-8">
						{[
							{ label: "PROJECTS COMPLETED", val: "20+", icon: "💻", color: "#915eff" },
							{ label: "PATENT PENDING", val: "01", icon: "📄", color: "#00cea8" },
							{ label: "HACKATHONS WON", val: "05", icon: "🏆", color: "#ff6b6b" },
							{ label: "OPEN SOURCE CONTRIBUTIONS", val: "10+", icon: "🐙", color: "#915eff" },
						].map((stat) => (
							<motion.div 
								key={stat.label}
								whileHover={{ y: -5, scale: 1.02 }}
								className="stats-glass-card flex items-center gap-4 group cursor-pointer border border-white/10 hover:border-[#00cea8]/50 p-4 rounded-2xl bg-[#0c0c1d]/85 backdrop-blur-xl shadow-xl transition-all"
							>
								<div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex justify-center items-center text-xl group-hover:border-[#00cea8]/50 transition-all shadow-inner">
									{stat.icon}
								</div>
								<div className="flex flex-col">
									<span className="text-white text-xl font-black font-sans tracking-tight" style={{ color: stat.color }}>{stat.val}</span>
									<span className="text-secondary text-[9px] uppercase tracking-widest font-mono font-bold opacity-70">{stat.label}</span>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</div>

			<div className="absolute bottom-10 w-full flex justify-center items-center z-10">
				<a href="#about">
					<div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2 backdrop-blur-sm opacity-50">
						<motion.div
							animate={{ y: [0, 24, 0] }}
							transition={{
								duration: 1.5,
								repeat: Number.POSITIVE_INFINITY,
								repeatType: "loop",
							}}
							className="w-3 h-3 rounded-full bg-secondary mb-1"
						/>
					</div>
				</a>
			</div>
		</section>
	);
};

export default Hero;
