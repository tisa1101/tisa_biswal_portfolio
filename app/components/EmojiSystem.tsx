"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ActiveNotification {
	id: string;
	emoji: string;
	message: string;
}

export default function EmojiSystem() {
	const [activeToast, setActiveToast] = useState<ActiveNotification | null>(null);
	const [isIdle, setIsIdle] = useState(false);
	const [partyRain, setPartyRain] = useState(false);
	const [flyingRocket, setFlyingRocket] = useState(false);

	const triggeredMilestonesRef = useRef<{ [key: string]: boolean }>({});
	const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
	const lastMouseTimeRef = useRef<number>(Date.now());
	const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

	// Show toast notification helper
	const showToast = (emoji: string, message: string) => {
		const id = Math.random().toString();
		setActiveToast({ id, emoji, message });
		setTimeout(() => {
			setActiveToast((prev) => (prev?.id === id ? null : prev));
		}, 3500);
	};

	// 1. Scroll Progress Milestones
	useEffect(() => {
		const handleScroll = () => {
			const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
			if (totalHeight <= 0) return;
			const scrollPct = (window.scrollY / totalHeight) * 100;

			if (scrollPct >= 25 && !triggeredMilestonesRef.current["25"]) {
				triggeredMilestonesRef.current["25"] = true;
				showToast("/emojis/happy.png", "Welcome to my portfolio! 😊");
			} else if (scrollPct >= 50 && !triggeredMilestonesRef.current["50"]) {
				triggeredMilestonesRef.current["50"] = true;
				setFlyingRocket(true);
				setTimeout(() => setFlyingRocket(false), 2500);
				showToast("/emojis/rocket.png", "Launching into my featured projects! 🚀");
			} else if (scrollPct >= 75 && !triggeredMilestonesRef.current["75"]) {
				triggeredMilestonesRef.current["75"] = true;
				showToast("/emojis/excited.png", "Discover my quest achievements! 🌟");
			} else if (scrollPct >= 98 && !triggeredMilestonesRef.current["100"]) {
				triggeredMilestonesRef.current["100"] = true;
				showToast("/emojis/party.png", "You reached the end! Thank you! 🎉");
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// 2. Idle Timer (2 minutes idle -> sleeping emoji)
	useEffect(() => {
		const resetIdle = () => {
			setIsIdle(false);
			if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
			idleTimerRef.current = setTimeout(() => {
				setIsIdle(true);
			}, 120000); // 2 minutes
		};

		const handleMouseMove = (e: MouseEvent) => {
			resetIdle();

			// Fast mouse speed check
			const now = Date.now();
			const dt = now - lastMouseTimeRef.current;
			if (dt > 50) {
				const dx = e.clientX - lastMousePosRef.current.x;
				const dy = e.clientY - lastMousePosRef.current.y;
				const speed = Math.sqrt(dx * dx + dy * dy) / dt;

				if (speed > 8 && !triggeredMilestonesRef.current["fastMouse"]) {
					triggeredMilestonesRef.current["fastMouse"] = true;
					showToast("/emojis/surprised.png", "Whoa, moving fast! ⚡");
					setTimeout(() => {
						triggeredMilestonesRef.current["fastMouse"] = false;
					}, 15000);
				}

				lastMousePosRef.current = { x: e.clientX, y: e.clientY };
				lastMouseTimeRef.current = now;
			}
		};

		resetIdle();
		window.addEventListener("mousemove", handleMouseMove);
		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
		};
	}, []);

	// 3. Konami Code Party Rain Listener
	useEffect(() => {
		const handleOverdrive = () => {
			setPartyRain(true);
			showToast("/emojis/party.png", "Party Mode Unlocked! 🎉");
			setTimeout(() => setPartyRain(false), 5000);
		};
		window.addEventListener("trigger-overdrive", handleOverdrive);
		return () => window.removeEventListener("trigger-overdrive", handleOverdrive);
	}, []);

	return (
		<>
			{/* Floating Scroll / Event Toast Badge */}
			<AnimatePresence>
				{activeToast && (
					<motion.div
						initial={{ opacity: 0, y: 50, scale: 0.8 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 50, scale: 0.8 }}
						transition={{ type: "spring", stiffness: 350, damping: 25 }}
						className="fixed bottom-8 left-8 z-[10001] bg-[#0c0c1d]/90 border border-white/15 px-5 py-3 rounded-full shadow-[0_0_30px_rgba(145,94,255,0.4)] backdrop-blur-md flex items-center gap-3.5 select-none"
					>
						<div className="relative w-9 h-9 flex-shrink-0 drop-shadow-md">
							<Image src={activeToast.emoji} fill alt="Emoji Toast" className="object-contain" />
						</div>
						<span className="text-white text-xs font-mono font-bold tracking-wide">
							{activeToast.message}
						</span>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Flying Rocket at 50% Scroll */}
			<AnimatePresence>
				{flyingRocket && (
					<motion.div
						initial={{ x: "-10vw", y: "80vh", rotate: 45 }}
						animate={{ x: "110vw", y: "10vh", rotate: 45 }}
						transition={{ duration: 2.2, ease: "easeInOut" }}
						className="fixed z-[10002] w-28 h-28 pointer-events-none drop-shadow-[0_0_30px_rgba(0,206,168,0.8)]"
					>
						<Image src="/emojis/rocket.png" fill alt="Flying Rocket" className="object-contain" />
					</motion.div>
				)}
			</AnimatePresence>

			{/* Idle Sleeping Emoji Badge */}
			<AnimatePresence>
				{isIdle && (
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						className="fixed top-24 right-8 z-[10000] bg-black/80 border border-white/10 p-4 rounded-3xl backdrop-blur-md flex items-center gap-3 shadow-2xl select-none"
					>
						<div className="relative w-12 h-12 animate-pulse">
							<Image src="/emojis/sleeping.png" fill alt="Sleeping Emoji" className="object-contain" />
						</div>
						<div className="flex flex-col">
							<span className="text-white text-xs font-mono font-bold">Taking a power nap... Zzz</span>
							<span className="text-secondary text-[10px]">Move mouse to wake up!</span>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Konami Party Emoji Rain */}
			{partyRain && (
				<div className="fixed inset-0 z-[10003] pointer-events-none overflow-hidden">
					{Array.from({ length: 25 }).map((_, i) => (
						<motion.div
							key={i}
							initial={{ y: -100, x: `${(i / 25) * 100}vw`, rotate: 0 }}
							animate={{ y: "105vh", rotate: 360 }}
							transition={{
								duration: 2.5 + Math.random() * 2,
								repeat: Infinity,
								delay: Math.random() * 1.5,
								ease: "linear",
							}}
							className="absolute w-12 h-12"
						>
							<Image
								src={i % 2 === 0 ? "/emojis/party.png" : "/emojis/winner.png"}
								fill
								alt="Party Rain Emoji"
								className="object-contain"
							/>
						</motion.div>
					))}
				</div>
			)}
		</>
	);
}
