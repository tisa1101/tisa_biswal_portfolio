"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Volume2, VolumeX, Play, Pause, Sparkles, Radio, MessageSquareText, Hand, Award } from "lucide-react";

const SPEECH_PARAGRAPHS = [
	"Hello! I'm Tisa Biswal.",
	"I'm a Computer Science Engineering student with a strong passion for Artificial Intelligence, software engineering, and healthcare innovation.",
	"I enjoy building intelligent systems that solve real-world problems. My work includes AI-powered healthcare solutions, full-stack web applications, and research-driven projects focused on creating meaningful impact.",
	"I've participated in national hackathons, worked on patent-pending innovations, and continuously challenge myself through competitive programming, open-source learning, and modern software development.",
	"I'm always exploring new technologies, whether it's machine learning, cloud computing, or scalable application architecture.",
	"For me, technology isn't just about writing code—it's about improving lives and building solutions that truly matter.",
	"Thank you for visiting my portfolio. I hope you enjoy exploring my projects, and I look forward to connecting with you."
];

export default function AIAvatar() {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentSentenceIdx, setCurrentSentenceIdx] = useState<number>(-1);
	const [blink, setBlink] = useState(false);
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [isSpeechEnded, setIsSpeechEnded] = useState(false);
	const [visemePulse, setVisemePulse] = useState(0);

	const cardRef = useRef<HTMLDivElement>(null);
	const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

	// Mouse parallax tracking for Pixar 3D depth effect
	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!cardRef.current) return;
		const rect = cardRef.current.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width - 0.5;
		const y = (e.clientY - rect.top) / rect.height - 0.5;
		setMousePos({ x, y });
	};

	const handleMouseLeave = () => {
		setMousePos({ x: 0, y: 0 });
	};

	// Realistic Eye Blinking Timer (Blinks every 3.5s)
	useEffect(() => {
		const blinkInterval = setInterval(() => {
			setBlink(true);
			setTimeout(() => setBlink(false), 160);
		}, 3600);

		return () => clearInterval(blinkInterval);
	}, []);

	// Viseme oscillation for lip synchronization while speaking
	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (isPlaying) {
			interval = setInterval(() => {
				setVisemePulse((prev) => (prev + 1) % 4);
			}, 140);
		} else {
			setVisemePulse(0);
		}
		return () => clearInterval(interval);
	}, [isPlaying]);

	// Initialize Speech Synthesis
	const startSpeech = () => {
		if (typeof window === "undefined" || !("speechSynthesis" in window)) {
			alert("Speech synthesis is not supported in this browser.");
			return;
		}

		window.speechSynthesis.cancel(); // Stop any active speech
		setIsSpeechEnded(false);

		const fullText = SPEECH_PARAGRAPHS.join(" ");
		const utterance = new SpeechSynthesisUtterance(fullText);

		// Voice Selection Priority (Indian Female / Natural Warm Female)
		const voices = window.speechSynthesis.getVoices();
		const preferredVoice = voices.find(
			(v) =>
				(v.lang.includes("en-IN") || v.name.includes("India") || v.name.includes("Zira") || v.name.includes("Google UK English Female") || v.name.includes("Samantha"))
		) || voices.find((v) => v.lang.startsWith("en"));

		if (preferredVoice) utterance.voice = preferredVoice;

		utterance.rate = 0.92; // Conversational moderate speed
		utterance.pitch = 1.05; // Warm, natural young female tone

		let sentenceIdx = 0;
		setCurrentSentenceIdx(0);
		setIsPlaying(true);

		// Track sentence boundary for synchronized subtitles
		utterance.onboundary = (e) => {
			if (e.name === "sentence" || e.name === "word") {
				const charIndex = e.charIndex;
				let cumulativeLen = 0;
				for (let i = 0; i < SPEECH_PARAGRAPHS.length; i++) {
					cumulativeLen += SPEECH_PARAGRAPHS[i].length + 1;
					if (charIndex < cumulativeLen) {
						sentenceIdx = i;
						break;
					}
				}
				setCurrentSentenceIdx(sentenceIdx);
			}
		};

		utterance.onend = () => {
			setIsPlaying(false);
			setCurrentSentenceIdx(-1);
			setIsSpeechEnded(true);
			setTimeout(() => setIsSpeechEnded(false), 4000); // Friendly wave pose timeout
		};

		utterance.onerror = () => {
			setIsPlaying(false);
			setCurrentSentenceIdx(-1);
		};

		utteranceRef.current = utterance;
		window.speechSynthesis.speak(utterance);
	};

	const stopSpeech = () => {
		if (typeof window !== "undefined" && "speechSynthesis" in window) {
			window.speechSynthesis.cancel();
		}
		setIsPlaying(false);
		setCurrentSentenceIdx(-1);
	};

	const togglePlay = () => {
		if (isPlaying) {
			stopSpeech();
		} else {
			startSpeech();
		}
	};

	return (
		<div
			ref={cardRef}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			className="relative group w-[290px] h-[420px] xs:w-[330px] xs:h-[470px] select-none perspective-1000"
		>
			{/* Pixar Specular Rim Light & Ambient Glow */}
			<div
				className={`absolute -inset-1.5 bg-gradient-to-tr from-[#915eff] via-[#00cea8] to-purple-500 rounded-[38px] blur-md transition-all duration-700 ${
					isPlaying ? "opacity-90 animate-pulse shadow-[0_0_35px_#00cea8]" : "opacity-30 group-hover:opacity-100"
				}`}
			/>

			{/* Main Interactive Card */}
			<motion.div
				onClick={togglePlay}
				animate={{
					rotateY: mousePos.x * 12,
					rotateX: -mousePos.y * 12,
				}}
				transition={{ type: "spring", stiffness: 300, damping: 20 }}
				className="relative w-full h-full bg-[#0c0c1d] rounded-[34px] overflow-hidden border border-white/15 shadow-2xl cursor-pointer flex flex-col justify-between"
			>
				{/* Pixar Volumetric Spotlight Background */}
				<div className="absolute inset-0 bg-gradient-to-tr from-[#915eff]/15 via-transparent to-[#00cea8]/15 pointer-events-none z-10" />

				{/* Cinematic Light Rays Beam */}
				<div
					className={`absolute -top-28 left-1/2 -translate-x-1/2 w-[260px] h-[260px] bg-gradient-to-b from-white/25 via-[#00cea8]/15 to-transparent blur-3xl pointer-events-none transition-opacity duration-700 z-10 ${
						isPlaying ? "opacity-100 scale-110" : "opacity-40"
					}`}
				/>

				{/* Floating Light Particles */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none z-10 opacity-60">
					<div className="w-2 h-2 rounded-full bg-[#00cea8] absolute top-10 left-8 animate-ping" />
					<div className="w-1.5 h-1.5 rounded-full bg-[#915eff] absolute bottom-20 right-10 animate-pulse" />
				</div>

				{/* Live Status Badge */}
				<div className="absolute top-4 right-4 z-30 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
					{isPlaying ? (
						<>
							<Radio className="w-3.5 h-3.5 text-[#00cea8] animate-pulse" />
							<span className="text-[10px] font-mono text-white font-bold tracking-wider uppercase">Pixar AI Keynote</span>
						</>
					) : (
						<>
							<Sparkles className="w-3.5 h-3.5 text-[#915eff]" />
							<span className="text-[10px] font-mono text-white/80 font-bold tracking-wider uppercase">Interactive Character</span>
						</>
					)}
				</div>

				{/* Play Overlay Button */}
				{!isPlaying && (
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						whileHover={{ scale: 1.1 }}
						animate={{ opacity: 1, scale: 1 }}
						className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/45 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
					>
						<div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#915eff] to-[#00cea8] flex items-center justify-center shadow-[0_0_30px_#915eff] mb-3">
							<Play className="w-7 h-7 text-white fill-white ml-1" />
						</div>
						<span className="text-white font-mono text-xs font-bold uppercase tracking-widest bg-black/70 px-3.5 py-1 rounded-full border border-white/10 shadow-md">
							Click to launch keynote
						</span>
					</motion.div>
				)}

				{/* Avatar Image Container with Expressive Pixar Micro-Animations */}
				<div className="relative w-full h-full overflow-hidden">
					<motion.div
						animate={
							isPlaying
								? {
										y: [0, -4, 1, -3, 0],
										rotate: [0, 0.8, -0.8, 0.4, 0],
										scale: [1, 1.02, 1, 1.015, 1],
								  }
								: isSpeechEnded
								? {
										rotate: [0, 2, 0],
										scale: [1, 1.03, 1],
								  }
								: {
										y: [0, -2, 0],
										scaleY: [1, 1.008, 1],
								  }
						}
						transition={{
							duration: isPlaying ? 2.2 : 4,
							repeat: isPlaying ? Infinity : 0,
							ease: "easeInOut",
						}}
						className="relative w-full h-full"
					>
						<Image
							src="/personal/avatar.png"
							fill
							alt="Tisa Biswal Pixar AI Avatar"
							className={`object-cover object-top transition-transform duration-700 ${
								isPlaying ? "scale-105" : "group-hover:scale-105"
							}`}
							priority
						/>

						{/* Realistic Eye Blinking Overlay Effect */}
						<div
							className={`absolute top-[28%] left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-[#050816]/35 blur-[2px] transition-opacity duration-150 pointer-events-none ${
								blink ? "opacity-75" : "opacity-0"
							}`}
						/>

						{/* Dynamic Lip Viseme Sync & Mouth Waveform Glow */}
						{isPlaying && (
							<motion.div
								animate={{
									scaleX: [1, 1.25, 0.9, 1.3, 1],
									scaleY: [1, 1.4, 0.8, 1.2, 1],
									opacity: [0.4, 0.8, 0.5, 0.9, 0.4],
								}}
								transition={{ duration: 0.35, repeat: Infinity, ease: "easeInOut" }}
								className="absolute top-[40.5%] left-1/2 -translate-x-1/2 w-7 h-2.5 bg-[#00cea8]/50 blur-md pointer-events-none rounded-full"
							/>
						)}
					</motion.div>

					{/* Dark Gradient Overlay at Bottom */}
					<div className="absolute inset-0 bg-gradient-to-t from-[#0c0c1d] via-[#0c0c1d]/40 to-transparent pointer-events-none z-10" />
				</div>

				{/* Subtitles / Teleprompter Box */}
				<AnimatePresence>
					{isPlaying && currentSentenceIdx >= 0 && (
						<motion.div
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 12 }}
							className="absolute bottom-24 left-4 right-4 z-30 bg-black/90 backdrop-blur-md p-3.5 rounded-2xl border border-[#00cea8]/40 shadow-2xl text-center select-text"
						>
							<div className="flex items-center justify-center gap-1.5 text-[9px] font-mono text-[#00cea8] uppercase tracking-wider mb-1">
								<MessageSquareText className="w-3.5 h-3.5" /> Pixar Character Keynote
							</div>
							<p className="text-white text-xs font-sans font-medium leading-relaxed italic">
								&quot;{SPEECH_PARAGRAPHS[currentSentenceIdx]}&quot;
							</p>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Friendly Wave / End Pose Badge */}
				<AnimatePresence>
					{isSpeechEnded && (
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 bg-[#915eff]/90 text-white backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-2xl flex items-center gap-2 font-mono text-xs font-bold"
						>
							<Hand className="w-4 h-4 text-yellow-300 animate-bounce" />
							<span>Thank you for connecting!</span>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Card Footer: Name & Title Badge */}
				<div className="absolute bottom-5 left-6 right-6 z-20 flex justify-between items-end">
					<div className="flex flex-col gap-0.5">
						<span className="text-white font-black text-xl uppercase tracking-tighter drop-shadow-md">
							Tisa Biswal
						</span>
						<span className="text-[#00cea8] text-[11px] font-mono font-bold uppercase tracking-widest flex items-center gap-1.5">
							<span className="w-1.5 h-1.5 rounded-full bg-[#00cea8] animate-ping" />
							Aspiring Software Engineer
						</span>
						<div className="w-12 h-1 bg-[#915eff] rounded-full mt-1.5 shadow-[0_0_10px_#915eff]" />
					</div>

					{/* Control Toggle Button */}
					<button
						onClick={(e) => {
							e.stopPropagation();
							togglePlay();
						}}
						className="w-10 h-10 rounded-full bg-black/70 backdrop-blur-md border border-white/15 hover:border-[#00cea8]/60 flex items-center justify-center text-white hover:text-[#00cea8] transition-all shadow-xl hover:scale-110 active:scale-95"
					>
						{isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
					</button>
				</div>
			</motion.div>
		</div>
	);
}
