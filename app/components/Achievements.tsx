"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "./HigherOrderComponents";
import { fadeIn, textVariant } from "../utils/motion";
import { achievements } from "../constants";
import Image from "next/image";

const AchievementCard = ({
	index,
	title,
	description,
	icon,
	level,
	points,
	type,
}: any) => (
	<motion.div
		variants={fadeIn("up", "spring", index * 0.2, 0.75)}
		className="bg-tertiary p-8 rounded-3xl xs:w-[360px] w-full border border-white/10 shadow-card hover:shadow-[0_0_20px_rgba(145,94,255,0.3)] transition-all duration-300"
	>
		<div className="flex justify-between items-start mb-6">
			<div className="w-20 h-20 bg-black/20 rounded-full flex items-center justify-center border border-white/5 shadow-inner">
				<Image src={icon} width={48} height={48} alt={title} className="object-contain" />
			</div>
			<div className="text-right">
				<span className="futuristic-badge">{type}</span>
				<p className="text-white font-black text-[14px] mt-2 tracking-widest">{level}</p>
			</div>
		</div>

		<div className="mt-4">
			<h3 className="text-white font-bold text-[22px] mb-3 leading-tight">{title}</h3>
			<p className="text-secondary text-[15px] leading-[24px] min-h-[100px] opacity-80">
				{description}
			</p>
		</div>

		<div className="mt-8">
			<div className="flex justify-between items-center mb-2">
				<span className="text-[12px] text-secondary uppercase tracking-[0.1em]">Exp Gained</span>
				<span className="text-green-400 font-bold text-[14px]">{points}</span>
			</div>
			<div className="w-full bg-black/40 h-2.5 rounded-full overflow-hidden border border-white/5">
				<motion.div 
					initial={{ width: 0 }}
					whileInView={{ width: "100%" }}
					transition={{ duration: 1.5, delay: index * 0.2 }}
					className="bg-gradient-to-r from-[#915eff] to-[#00cea8] h-full shadow-[0_0_10px_rgba(145,94,255,0.5)]"
				/>
			</div>
		</div>
	</motion.div>
);

const Achievements = () => {
	return (
		<div className="mt-12">
			<motion.div variants={textVariant()}>
				<p className="sectionSubText">The Journey of Excellence</p>
				<h2 className="sectionHeadText text-gradient">Quest Log & Achievements.</h2>
			</motion.div>

			<div className="mt-10 flex flex-col md:flex-row items-center gap-8 bg-black/30 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
				<div className="relative">
					<div className="w-24 h-24 rounded-full border-4 border-[#915eff] flex items-center justify-center bg-tertiary shadow-[0_0_20px_rgba(145,94,255,0.4)]">
						<span className="text-white text-3xl font-black">24</span>
					</div>
					<div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#915eff] px-3 py-0.5 rounded-full text-[10px] font-bold">LEVEL</div>
				</div>
				
				<div className="flex-1 w-full">
					<div className="flex justify-between items-end mb-2">
						<div className="flex flex-col">
							<span className="text-white font-bold text-xl uppercase tracking-tighter">Master Coordinator</span>
							<span className="text-secondary text-sm">Professional Rank: Elite Innovator</span>
						</div>
						<span className="text-[#00cea8] font-bold text-sm">12,450 / 15,000 XP</span>
					</div>
					<div className="w-full bg-black/50 h-4 rounded-full overflow-hidden border border-white/10 p-0.5">
						<motion.div 
							initial={{ width: 0 }}
							animate={{ width: "83%" }}
							transition={{ duration: 2, ease: "easeOut" }}
							className="h-full bg-gradient-to-r from-[#915eff] via-[#00cea8] to-[#915eff] bg-[length:200%_auto] animate-shine rounded-full"
						/>
					</div>
				</div>
			</div>
			
			<div className="mt-20 flex flex-wrap gap-8 justify-center">
				{achievements.map((achievement, index) => (
					<AchievementCard key={achievement.title} index={index} {...achievement} />
				))}
			</div>

			<motion.div 
				variants={fadeIn("up", "spring", 1, 1)}
				className="mt-20 p-10 rounded-3xl bg-gradient-to-r from-[#151030] to-[#0c0c1d] border border-[#915eff]/20 text-center relative overflow-hidden"
			>
				<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#915eff] to-transparent" />
				<h3 className="text-white text-3xl font-bold mb-4">The "Never Give Up" Attitude</h3>
				<p className="text-secondary text-lg max-w-3xl mx-auto italic">
					"Success is not final, failure is not fatal: it is the courage to continue that counts. 
					My journey is defined by leadership, resilience, and an unwavering commitment to excellence."
				</p>
				<div className="mt-8 flex justify-center gap-4">
					<div className="px-6 py-2 rounded-xl bg-[#915eff]/10 border border-[#915eff]/30 text-[#915eff] font-bold text-sm uppercase tracking-widest">Resilience: MAX</div>
					<div className="px-6 py-2 rounded-xl bg-[#00cea8]/10 border border-[#00cea8]/30 text-[#00cea8] font-bold text-sm uppercase tracking-widest">Leadership: ELITE</div>
				</div>
			</motion.div>
		</div>
	);
};

export default SectionWrapper(Achievements, "achievements");
