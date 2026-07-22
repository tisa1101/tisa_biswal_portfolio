"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ComputersCanvas } from "./canvas";

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
		<section id="hero" className="relative w-full h-screen mx-auto overflow-hidden aurora-bg">
			<div className="absolute inset-0 animated-grid z-0" />
			
			<div className="paddingX absolute inset-0 max-w-7xl mx-auto flex flex-col justify-center z-10 pt-32 md:pt-20">
				<div className="flex flex-col lg:flex-row items-center justify-between w-full gap-10 lg:gap-20">
					{/* Left Side: Text Content */}
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 1, ease: "easeOut" }}
						className="flex-1 flex flex-col gap-6 text-center lg:text-left items-center lg:items-start"
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

						<div className="mt-8 flex flex-col items-center lg:items-start gap-4">
							<p className="text-[12px] uppercase tracking-[0.3em] text-secondary font-bold opacity-60">Connect With Me</p>
							<div className="flex gap-4">
								{[
									{ id: "github", icon: "/tech/github.webp", link: "https://github.com/tisa1101" },
									{ id: "linkedin", icon: "/socialmedia/linkedin.svg", link: "https://linkedin.com/in/tisa-biswal" },
									{ id: "email", icon: "/resume.svg", link: "mailto:tisabiswal1101@gmail.com" }
								].map((social) => (
									<Link 
										key={social.id}
										href={social.link} 
										target="_blank"
										className="social-icon-btn"
									>
										<Image src={social.icon} width={24} height={24} alt={social.id} className="opacity-80 group-hover:opacity-100" />
									</Link>
								))}
							</div>
						</div>
					</motion.div>

					{/* Right Side: 3D Canvas */}
					<div className="flex-1 w-full h-[400px] lg:h-[600px] relative z-0 floating">
						<ComputersCanvas />
						{/* Ambient Glow beneath the desk */}
						<div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[300px] h-[50px] bg-[#915eff]/20 blur-[60px] rounded-full" />
					</div>
				</div>

				{/* Stats Section */}
				<div className="w-full mt-10 lg:mt-20">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
						{[
							{ label: "Projects Completed", val: "20+", icon: "💻", color: "#915eff" },
							{ label: "Patent Pending", val: "1", icon: "📄", color: "#00cea8" },
							{ label: "Hackathons Won", val: "5", icon: "🏆", color: "#ff6b6b" },
							{ label: "Open Source Contributions", val: "10+", icon: "🐙", color: "#915eff" },
						].map((stat) => (
							<motion.div 
								key={stat.label}
								whileHover={{ y: -5 }}
								className="stats-glass-card flex items-center gap-4 group"
							>
								<div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex justify-center items-center text-xl group-hover:border-[#915eff]/50 transition-all shadow-inner">
									{stat.icon}
								</div>
								<div className="flex flex-col">
									<span className="text-white text-xl font-black tracking-tight">{stat.val}</span>
									<span className="text-secondary text-[10px] uppercase tracking-widest font-bold opacity-60">{stat.label}</span>
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
