import Image from "next/image";
import Link from "next/link";
import React from "react";

const ResumeButton = () => {
	return (
		<Link
			href="https://drive.google.com/file/d/1tG1put6T3wXMpmUyqnRYkF6IDUsALr61/view?usp=sharing"
			target="_blank"
			className="group"
		>
			<button
				type="button"
				className="font-bold text-center px-6 py-2.5 flex gap-3 justify-center items-center rounded-xl transition-all duration-300 bg-gradient-to-r from-[#915eff] to-[#00cea8] text-white shadow-[0_0_15px_rgba(145,94,255,0.4)] hover:shadow-[0_0_25px_rgba(145,94,255,0.6)] hover:scale-105 active:scale-95"
			>
				<Image
					src="/resume.svg"
					width={20}
					height={20}
					alt="resume"
					className="object-contain filter brightness-0 invert"
				/>
				<span className="lg:block hidden">Download Resume</span>
			</button>
		</Link>
	);
};

export default ResumeButton;
