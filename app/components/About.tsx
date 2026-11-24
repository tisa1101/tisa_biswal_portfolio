"use client";

import { SectionWrapper } from "./HigherOrderComponents";
import { motion } from "framer-motion";
import Image from "next/image";
import { Tilt } from "react-tilt";
import { services } from "../constants";
import { fadeIn, textVariant } from "@/app/utils/motion";

import AIAvatar from "./AIAvatar";

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
						I am a forward-thinking Software Engineer and AI Researcher with a deep-rooted passion for healthcare innovation and intelligent systems. 
						My expertise spans Artificial Intelligence, full-stack systems engineering, and MedTech. As the Winner of the Build Fast with AI Hackathon (Project MIRA), 
						holder of patent applications in clinical AI, and finalist in prestigious national challenges (SIH Grand Finale, HCLTech AMPlified 16th Rank, Odoo Grand Finale), 
						I specialize in building high-performance, scalable platforms using Python, FastAPI, C# / .NET 8, React, Next.js, and cutting-edge LLM/RAG pipelines.
					</motion.p>
				</div>

				<motion.div
					variants={fadeIn("left", "spring", 0.5, 1)}
					className="flex-[0.4] w-full flex justify-center lg:justify-end"
				>
					<AIAvatar />
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
