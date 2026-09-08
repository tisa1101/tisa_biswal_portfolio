"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const CODE_SNIPPETS = [
	"import { TisaAI } from '@neural/core';",
	"const portfolio = new TisaAI({ vision: 'healthcare' });",
	"await portfolio.loadDiagnosticModels();",
	"console.log('Connecting agentic telemetry...');",
	"const status = await portfolio.boot();",
	"// System fully operational."
];

export default function BootLoader({ onComplete }: { onComplete: () => void }) {
	const [progress, setProgress] = useState(0);
	const [codeIdx, setCodeIdx] = useState(0);
	const [emojiState, setEmojiState] = useState<"coding" | "smile" | "thumbsup" | "rocket">("coding");
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prev) => {
				const next = prev + Math.floor(Math.random() * 8) + 4;
				if (next >= 100) {
					clearInterval(interval);
					// Sequence at 100%: look up & smile -> thumbs up -> launch rocket -> fade in site
					setTimeout(() => {
						setEmojiState("thumbsup");
						setTimeout(() => {
							setEmojiState("rocket");
							setTimeout(() => {
								setVisible(false);
								setTimeout(onComplete, 600);
							}, 1200);
						}, 900);
					}, 400);
					return 100;
				}
				return next;
			});
		}, 140);

		const codeInterval = setInterval(() => {
			setCodeIdx((prev) => (prev + 1) % CODE_SNIPPETS.length);
		}, 600);

		return () => {
			clearInterval(interval);
			clearInterval(codeInterval);
		};
	}, [onComplete]);

	return (
		<AnimatePresence>
			{visible && (
				<motion.div
					initial={{ opacity: 1 }}
					exit={{ opacity: 0, scale: 1.05 }}
					transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
					className="fixed inset-0 z-[9999] bg-[#050816] font-mono text-[#00cea8] flex flex-col items-center justify-center p-6 select-none"
				>
					{/* Ambient Radial Glow */}
					<div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-[#915eff]/20 to-[#00cea8]/20 blur-3xl pointer-events-none rounded-full" />

					{/* Custom Emoji Character Showcase */}
					<div className="relative mb-8 flex flex-col items-center">
						<AnimatePresence mode="wait">
							{emojiState === "coding" && (
								<motion.div
									key="coding"
									initial={{ scale: 0.8, opacity: 0 }}
									animate={{ scale: [1, 1.03, 1], opacity: 1 }}
									exit={{ scale: 0.8, opacity: 0 }}
									transition={{ duration: 1.5, repeat: Infinity }}
									className="relative w-40 h-40 drop-shadow-[0_0_25px_rgba(0,206,168,0.4)]"
								>
									<Image
										src="/emojis/coding.png"
										fill
										alt="Coding Emoji"
										className="object-contain"
										priority
									/>
								</motion.div>
							)}

							{emojiState === "thumbsup" && (
								<motion.div
									key="thumbsup"
									initial={{ scale: 0.5, rotate: -15, opacity: 0 }}
									animate={{ scale: 1.15, rotate: 0, opacity: 1 }}
									exit={{ scale: 0.8, opacity: 0 }}
									transition={{ type: "spring", stiffness: 300 }}
									className="relative w-40 h-40 drop-shadow-[0_0_30px_rgba(145,94,255,0.6)]"
								>
									<Image
										src="/emojis/thumbsup.png"
										fill
										alt="Thumbs Up Emoji"
										className="object-contain"
										priority
									/>
								</motion.div>
							)}

							{emojiState === "rocket" && (
								<motion.div
									key="rocket"
									initial={{ y: 0, scale: 1 }}
									animate={{ y: -400, scale: 1.4, opacity: [1, 1, 0] }}
									transition={{ duration: 1.2, ease: "easeIn" }}
									className="relative w-44 h-44 drop-shadow-[0_0_40px_rgba(255,200,0,0.8)]"
								>
									<Image
										src="/emojis/rocket.png"
										fill
										alt="Rocket Launch Emoji"
										className="object-contain"
										priority
									/>
								</motion.div>
							)}
						</AnimatePresence>

						{/* Typing Code Overlay */}
						<div className="mt-4 bg-black/60 border border-white/10 px-4 py-2 rounded-xl text-xs text-white/80 backdrop-blur-md flex items-center gap-2 max-w-sm text-center shadow-lg font-mono">
							<span className="text-[#915eff] font-bold">&gt;</span>
							<span className="truncate">{CODE_SNIPPETS[codeIdx]}</span>
						</div>
					</div>

					{/* Loading Progress Section */}
					<div className="w-full max-w-md bg-black/40 p-6 rounded-2xl border border-white/10 backdrop-blur-md flex flex-col gap-3">
						<div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest">
							<span className="text-white flex items-center gap-2">
								<span className="w-2 h-2 rounded-full bg-[#00cea8] animate-ping" />
								Initialising Portfolio
							</span>
							<span className="text-[#00cea8] font-mono text-sm">{progress}%</span>
						</div>

						<div className="w-full bg-white/5 h-3 rounded-full overflow-hidden border border-white/10 p-0.5">
							<motion.div
								animate={{ width: `${progress}%` }}
								className="h-full bg-gradient-to-r from-[#915eff] via-[#00cea8] to-[#915eff] rounded-full shadow-[0_0_15px_#00cea8]"
							/>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
