"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { testimonials } from "../constants";
import { fadeIn, textVariant } from "@/app/utils/motion";
import { SectionWrapper } from "./HigherOrderComponents";

type FeedbackCardProps = {
	index: number;
	testimonial: string;
	name: string;
	link: string;
	image: string;
};

const FeedbackCard = ({
	index,
	testimonial,
	name,
	link,
	image,
}: FeedbackCardProps) => (
	<motion.div
		variants={fadeIn("", "spring", index * 0.5, 0.75)}
		className="bg-[#0c0c1d]/40 p-8 rounded-[24px] xs:w-[320px] w-full glassmorphism border border-white/5 premium-card shadow-xl"
	>
		<div className="flex flex-col h-full">
			<div className="flex-1">
				<p className="text-[#915eff] font-black text-[40px] leading-none mb-2">&quot;</p>
				<p className="text-white/90 tracking-wide text-[16px] leading-relaxed italic">{testimonial}</p>
			</div>
			
			<div className="mt-8 flex justify-between items-center pt-4 border-t border-white/5">
				<div className="flex flex-col">
					<p className="text-white font-bold text-[15px]">
						{name}
					</p>
					<p className="text-secondary text-[12px] opacity-70">
						Professional Recognition
					</p>
				</div>
				<Link href={link} className="hover:scale-110 transition-transform">
					<Image
						src={image}
						width={40}
						height={40}
						alt={`feedback by ${name}`}
						className="w-10 h-10 rounded-full object-contain filter grayscale hover:grayscale-0 transition-all"
					/>
				</Link>
			</div>
		</div>
	</motion.div>
);

const Feedbacks = () => {
	return (
		<div className="mt-24 rounded-[32px] overflow-hidden glassmorphism border border-white/5">
			<div className="padding bg-white/5 min-h-[320px] flex items-center">
				<motion.div variants={textVariant()} className="w-full">
					<p className="sectionSubText text-center mb-2">Global Recognition</p>
					<h2 className="sectionHeadText text-center">Achievements & Socials.</h2>
				</motion.div>
			</div>
			<div className="paddingX -mt-24 pb-16 flex flex-wrap gap-8 justify-center">
				{testimonials.map((testimonial, index) => (
					<FeedbackCard key={testimonial.id} index={index} {...testimonial} />
				))}
			</div>
		</div>
	);
};

export default SectionWrapper(Feedbacks, "");
