"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Tilt } from "react-tilt";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "./HigherOrderComponents";

type ProjectCardProps = {
	index: number;
	name: string;
	description: string;
	tags: {
		name: string;
		color: string;
	}[];
	image: string;
	source_code_link?: string;
	deploy_link: string;
	platform: "Netlify" | "Vercel" | "Figma" | "Wordpress" | "Web"
};

const ProjectCard = ({
	index,
	name,
	description,
	tags,
	image,
	source_code_link,
	deploy_link,
	platform
}: ProjectCardProps) => {
	return (
		<motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
			<Tilt
				options={{
					max: 15,
					scale: 1.02,
					speed: 400,
				}}
				className="bg-[#0c0c1d]/60 p-5 rounded-[24px] w-full glassmorphism border border-white/5 premium-card h-full flex flex-col glow-border shadow-2xl"
			>
				<div className="relative w-full h-[230px] group">
					<Image
						src={image}
						width={1000}
						height={1000}
						alt="project_image"
						className="w-full h-full object-cover rounded-[18px] shadow-lg group-hover:opacity-60 transition-opacity duration-300"
					/>

					<div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-4">
						{source_code_link && <Link
							href={source_code_link}
							target="_blank"
							className="bg-black/60 backdrop-blur-md w-12 h-12 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-transform shadow-xl border border-white/10"
						>
							<Image
								src="/tech/github.webp"
								width={28}
								height={28}
								alt="source-code"
								className="object-contain"
							/>
						</Link>}
						<Link
							href={deploy_link}
							target="_blank"
							className="bg-black/60 backdrop-blur-md w-12 h-12 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-transform shadow-xl border border-white/10"
						>
							<Image
								src={platform === "Netlify" ? "/tech/netlify.webp" : platform === "Vercel" ? "/tech/vercel.svg" : platform === "Wordpress" ? "/tech/wordpress.webp" : platform === "Web" ? "/web.webp" : "/tech/figma.webp"}
								width={28}
								height={28}
								alt="deployment"
								className="object-contain"
							/>
						</Link>
					</div>
				</div>

				<div className="mt-6 flex-1 px-1">
					<h3 className="text-white font-extrabold text-[26px] tracking-tight mb-2">{name}</h3>
					<p className="text-secondary text-[15px] leading-relaxed opacity-90">{description}</p>
				</div>

				<div className="mt-6 flex flex-wrap gap-2 px-1">
					{tags.map((tag) => (
						<span
							key={`${name}-${tag.name}`}
							className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-white/5 border border-white/10 ${tag.color}`}
						>
							{tag.name}
						</span>
					))}
				</div>
			</Tilt>
		</motion.div>
	);
};

const Works = () => {
	return (
		<>
			<motion.div variants={textVariant()}>
				<p className="sectionSubText">My work</p>
				<h2 className="sectionHeadText">Projects.</h2>
			</motion.div>

			<div className="w-full flex">
				<motion.p
					variants={fadeIn("", "", 0.1, 1)}
					className="mt-3 text-secondary text-[17px] max-w-5xl leading-[30px]"
				>
					Following projects showcases my skills and experience through
					real-world examples of my work. Each project is briefly described with
					links to code repositories and live demos in it. It reflects my
					ability to solve complex problems, work with different technologies,
					and manage projects effectively.
				</motion.p>
			</div>

			<div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 w-full">
				{projects.map((project, index) => (
					<ProjectCard key={`project-${index}`} index={index} {...project} />
				))}
			</div>
		</>
	);
};

export default SectionWrapper(Works, "");
