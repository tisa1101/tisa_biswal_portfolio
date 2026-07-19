"use client";

import { SectionWrapper } from "./HigherOrderComponents";
import { motion } from "framer-motion";
import Image from "next/image";
import { Tilt } from "react-tilt";
import { services } from "../constants";
import { fadeIn, textVariant } from "@/app/utils/motion";

type ServiceCardProps = {
	index: number;
	title: string;
	icon: string;
};

const ServiceCard = ({ index, title, icon }: ServiceCardProps) => {
	return (
		<>
			<Tilt
				options={{ max: 45, scale: 1, speed: 450 }}
				className="xs:w-[250px] w-full"
			>
				<motion.div
					variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
					className="w-full p-[1px] rounded-[24px] shadow-2xl premium-card glow-border"
				>
					<div className="bg-[#0c0c1d]/60 rounded-[24px] py-10 px-12 min-h-[300px] flex justify-evenly items-center flex-col glassmorphism border border-white/5">
						<div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#915eff]/20 to-[#00cea8]/20 flex items-center justify-center mb-6 shadow-inner">
							<Image
								src={icon}
								width={80}
								height={80}
								alt={title}
								className="w-16 h-16 object-contain drop-shadow-[0_0_10px_rgba(145,94,255,0.4)]"
							/>
						</div>
						<h3 className="text-white text-[22px] font-bold text-center tracking-tight leading-tight">
							{title}
						</h3>
					</div>
				</motion.div>
			</Tilt>
		</>
	);
};

const About = () => {
	return (
		<>
			<div className="flex flex-col lg:flex-row items-center justify-between gap-12">
				<div className="flex-[0.6] flex flex-col">
					<motion.div variants={textVariant()}>
						<p className="sectionSubText">Introduction</p>
						<h2 className="sectionHeadText">Overview.</h2>
					</motion.div>

					<motion.p
						variants={fadeIn("", "", 0.1, 1)}
						className="mt-4 text-secondary text-[17px] leading-[30px]"
					>
						I am a forward-thinking Software Engineer and AI Researcher with a deep-rooted passion for healthcare innovation. 
						My expertise lies at the intersection of Artificial Intelligence and MedTech, where I develop cutting-edge solutions like 
						smart diagnostic systems and agentic monitoring platforms. With multiple patents pending and a track record of success in 
						national hackathons (SIH, Hack AI), I specialize in building impactful, scalable, and recruiter-friendly applications 
						using Python, React, Next.js, and advanced ML frameworks. My mission is to bridge the gap between technology and human well-being through intelligent, data-driven solutions.
					</motion.p>
				</div>

				<motion.div
					variants={fadeIn("left", "spring", 0.5, 1)}
					className="flex-[0.4] w-full flex justify-center lg:justify-end"
				>
					<div className="relative group w-[280px] h-[400px] xs:w-[320px] xs:h-[450px]">
						<div className="absolute -inset-1 bg-gradient-to-r from-[#915eff] to-[#00cea8] rounded-[32px] blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
						<div className="relative w-full h-full bg-tertiary rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
							<Image
								src="/personal/avatar.png"
								fill
								alt="Tisa Biswal Avatar"
								className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
							<div className="absolute bottom-6 left-6 right-6">
								<div className="flex flex-col gap-1">
									<span className="text-white font-black text-xl uppercase tracking-tighter">Tisa Biswal</span>
									<span className="text-[#00cea8] text-xs font-bold uppercase tracking-widest">Aspiring Software Engineer</span>
									<div className="w-12 h-1 bg-[#915eff] rounded-full mt-2" />
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</div>

			<div className="mt-20 flex flex-wrap gap-10">
				{services.map((service, index) => (
					<ServiceCard key={service.title} index={index} {...service} />
				))}
			</div>
		</>
	);
};

export default SectionWrapper(About, "about");
