"use client";
import { slideIn } from "@/app/utils/motion";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Suspense, useEffect, useRef, useState } from "react";
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
		<div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-12 overflow-hidden items-center">
			<motion.div
				variants={slideIn("left", "tween", 0.2, 1)}
				className="flex-[0.75] bg-[#0c0c1d]/60 p-10 rounded-[32px] glassmorphism border border-white/5 shadow-2xl"
			>
				<p className="sectionSubText">Collaboration</p>
				<h3 className="sectionHeadText">Contact Me.</h3>
				<form
					ref={formRef}
					onSubmit={handleSubmit}
					className="mt-12 flex flex-col gap-8"
				>
					<label className="flex flex-col">
						<span className="text-white font-medium mb-4">Your Name.</span>
						<input
							type="text"
							name="from_name"
							value={form.from_name}
							onChange={handleChange}
							placeholder="Whats's your name?"
							className="bg-white/5 py-4 px-6 placeholder:text-secondary text-white rounded-xl outline-none border border-white/10 focus:border-[#915eff]/50 transition-all font-medium"
						/>
					</label>
					<label className="flex flex-col">
						<span className="text-white font-medium mb-4">Your Email.</span>
						<input
							type="email"
							name="from_email"
							value={form.from_email}
							onChange={handleChange}
							placeholder="Whats's your email?"
							className="bg-white/5 py-4 px-6 placeholder:text-secondary text-white rounded-xl outline-none border border-white/10 focus:border-[#915eff]/50 transition-all font-medium"
						/>
					</label>
					<label className="flex flex-col">
						<span className="text-white font-medium mb-4">Your Message.</span>
						<textarea
							rows={7}
							name="message"
							value={form.message}
							onChange={handleChange}
							placeholder="What do you want to say?"
							className="bg-white/5 py-4 px-6 placeholder:text-secondary text-white rounded-xl outline-none border border-white/10 focus:border-[#915eff]/50 transition-all font-medium resize-none"
						/>
					</label>
					<button
						type="submit"
						className="bg-gradient-to-r from-[#915eff] to-[#00cea8] py-4 px-10 outline-none w-full sm:w-fit text-white font-bold shadow-xl rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
					>
						{loading ? "Sending..." : "Send Message"}
					</button>
				</form>
			</motion.div>
			<motion.div
				variants={slideIn("right", "tween", 0.2, 1)}
				className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
			>
				<EarthCanvas />
			</motion.div>
		</div>
	);
};

export default SectionWrapper(Contact, "contact");
