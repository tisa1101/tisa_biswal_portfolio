"use client";
import { slideIn } from "@/app/utils/motion";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { SectionWrapper } from "./HigherOrderComponents";
import { EarthCanvas } from "./canvas";

const Contact = () => {
	useEffect(() => {
		emailjs.init("VeFeVdEHL9F9_i6xp");
	}, []);
	const formRef = useRef<HTMLFormElement>(null);

	const [form, setForm] = useState({
		from_name: "",
		from_email: "",
		message: "",
	});

	const [loading, setLoading] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		emailjs
			.send(
				"service_91ssn8g",
				"template_jjegxdr",
				{
					from_name: form.from_name,
					to_name: "Tisa Biswal",
					from_email: form.from_email,
					to_email: "tisabiswal29@gmail.com",
					message: form.message,
				},
				"VeFeVdEHL9F9_i6xp",
			)
			.then(() => {
				setLoading(false);
				alert(
					"Thank you. I will get back to you as soon as possible.",
				);
				setForm({
					from_name: "",
					from_email: "",
					message: "",
				});
			})
			.catch((error) => {
				setLoading(false);
				console.error(error);
				alert("Ahh, something went wrong. Please try again.");
			});
	};

	return (
		<div className="flex flex-col gap-16 w-full">
			{/* Main Contact Form & 3D Earth Row */}
			<div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-12 overflow-hidden items-center">
				<motion.div
					variants={slideIn("left", "tween", 0.2, 1)}
					className="flex-[0.75] w-full bg-[#0c0c1d]/60 p-10 rounded-[32px] glassmorphism border border-white/5 shadow-2xl"
				>
					<div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/60 border border-white/15 w-fit text-[10px] font-mono font-bold text-[#00cea8] uppercase tracking-widest mb-3">
						<span className="w-2 h-2 rounded-full bg-[#00cea8] animate-ping" />
						● AVAILABLE FOR OPPORTUNITIES
					</div>
					<p className="sectionSubText">Collaboration</p>
					<h3 className="sectionHeadText">Contact Me.</h3>
					<form
						ref={formRef}
						onSubmit={handleSubmit}
						className="mt-10 flex flex-col gap-6"
					>
						<label className="flex flex-col">
							<span className="text-white font-medium mb-3 text-sm">Your Name.</span>
							<input
								type="text"
								name="from_name"
								value={form.from_name}
								onChange={handleChange}
								placeholder="What's your name?"
								className="bg-white/5 py-3.5 px-6 placeholder:text-secondary text-white rounded-xl outline-none border border-white/10 focus:border-[#915eff]/50 transition-all font-medium text-sm"
							/>
						</label>
						<label className="flex flex-col">
							<span className="text-white font-medium mb-3 text-sm">Your Email.</span>
							<input
								type="email"
								name="from_email"
								value={form.from_email}
								onChange={handleChange}
								placeholder="What's your email?"
								className="bg-white/5 py-3.5 px-6 placeholder:text-secondary text-white rounded-xl outline-none border border-white/10 focus:border-[#915eff]/50 transition-all font-medium text-sm"
							/>
						</label>
						<label className="flex flex-col">
							<span className="text-white font-medium mb-3 text-sm">Your Message.</span>
							<textarea
								rows={5}
								name="message"
								value={form.message}
								onChange={handleChange}
								placeholder="What do you want to say?"
								className="bg-white/5 py-3.5 px-6 placeholder:text-secondary text-white rounded-xl outline-none border border-white/10 focus:border-[#915eff]/50 transition-all font-medium text-sm resize-none"
							/>
						</label>
						<button
							type="submit"
							className="bg-gradient-to-r from-[#915eff] to-[#00cea8] py-4 px-10 outline-none w-full sm:w-fit text-white font-bold font-mono text-xs uppercase tracking-widest shadow-xl rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
						>
							{loading ? "Sending..." : "Send Message →"}
						</button>
					</form>
				</motion.div>
				<motion.div
					variants={slideIn("right", "tween", 0.2, 1)}
					className="xl:flex-1 w-full xl:h-auto md:h-[550px] h-[350px]"
				>
					<EarthCanvas />
				</motion.div>
			</div>

			{/* Career Signal Progression Timeline Strip */}
			<div className="w-full max-w-4xl mx-auto p-6 rounded-[28px] bg-black/40 border border-white/10 backdrop-blur-md text-center">
				<div className="text-[10px] font-mono font-bold text-white/50 uppercase tracking-[0.3em] mb-4">
					DEVELOPER JOURNEY MATRIX
				</div>
				<div className="flex flex-wrap justify-between items-center gap-3 text-xs font-mono font-bold">
					{["LEARN", "BUILD", "COMPETE", "LEAD", "INNOVATE"].map((stage, idx) => (
						<React.Fragment key={stage}>
							<div className="px-4 py-2 rounded-xl bg-[#0c0c1d] border border-[#00cea8]/40 text-[#00cea8] shadow-[0_0_15px_rgba(0,206,168,0.2)]">
								{stage}
							</div>
							{idx < 4 && <span className="text-secondary opacity-40 hidden sm:inline">➔</span>}
						</React.Fragment>
					))}
				</div>
			</div>

			{/* Final Closing Statement & CTA */}
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				className="w-full p-10 sm:p-14 rounded-[36px] bg-gradient-to-r from-[#151030] via-[#0c0c1d] to-[#151030] border border-[#915eff]/40 shadow-2xl flex flex-col items-center text-center relative overflow-hidden"
			>
				<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00cea8] to-transparent" />

				<span className="text-xs font-mono font-bold text-[#00cea8] uppercase tracking-[0.3em] mb-2">HAVE AN IDEA?</span>
				<h2 className="text-white text-3xl sm:text-5xl font-black font-sans tracking-tight mb-3">
					Let&apos;s turn it into something real.
				</h2>
				<p className="text-secondary text-sm max-w-xl mb-8 font-sans">
					Available for internships • collaborations • innovative MedTech & AI projects
				</p>

				<a
					href="mailto:tisabiswal1101@gmail.com"
					className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#915eff] to-[#00cea8] text-white font-mono font-bold text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(0,206,168,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
				>
					<span>START A CONVERSATION</span>
					<span>→</span>
				</a>
			</motion.div>
		</div>
	);
};

export default SectionWrapper(Contact, "contact");
