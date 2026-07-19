"use client";
import { technologies } from "@/app/constants";
import { SectionWrapper } from "./HigherOrderComponents";
import { BallCanvas } from "./canvas";
import { textVariant } from "../utils/motion";
import { motion } from "framer-motion";

const Tech = () => {
	return (
		<>
			<motion.div variants={textVariant()} className="mb-20">
				<p className="sectionSubText text-center">My Technical Stack</p>
				<h2 className="sectionHeadText text-center">Technologies.</h2>
			</motion.div>
			<div className="flex flex-row flex-wrap justify-center gap-10">
				{technologies.map((technology) => (
					<div className="w-28 h-28" key={technology.name}>
						<BallCanvas icon={technology.icon} />
					</div>
				))}
			</div>
		</>
	);
};

export default SectionWrapper(Tech, "tech");
