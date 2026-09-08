"use client";

import React, { useEffect, useState, useRef } from "react";

const KONAMI_CODE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export default function EasterEggs() {
	const [active, setActive] = useState(false);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const keysPressedRef = useRef<string[]>([]);

	// Inspect Element Console Art
	useEffect(() => {
		console.log(
			`%c████████╗██╗███████╗ █████╗        ██████╗ ███████╗\n╚══██╔══╝██║██╔════╝██╔══██╗      ██╔═══██╗██╔════╝\n   ██║   ██║███████╗███████║█████╗██║   ██║███████╗\n   ██║   ██║╚════██║██╔══██║╚════╝██║   ██║╚════██║\n   ██║   ██║███████║██║  ██║      ╚██████╔╝███████║\n   ╚═╝   ╚═╝╚══════╝╚═╝  ╚═╝       ╚═════╝ ╚══════╝`,
			"color: #00cea8; font-weight: bold;"
		);
		console.log(
			"%cTISA-OS v2.6 Ready. Open Mission Control using Ctrl+K. Cheat code: ↑ ↑ ↓ ↓ ← → ← → B A",
			"color: #915eff; font-weight: bold; font-family: monospace;"
		);
	}, []);

	// Listen for Konami and triggers
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			keysPressedRef.current.push(e.key);
			keysPressedRef.current = keysPressedRef.current.slice(-KONAMI_CODE.length);

			if (JSON.stringify(keysPressedRef.current) === JSON.stringify(KONAMI_CODE)) {
				setActive((prev) => !prev);
				keysPressedRef.current = [];
			}
		};

		const handleCustomTrigger = () => {
			setActive((prev) => !prev);
		};

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("trigger-overdrive", handleCustomTrigger);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("trigger-overdrive", handleCustomTrigger);
		};
	}, []);

	// Matrix Rain Canvas Effect
	useEffect(() => {
		if (!active) return;

		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%+*";
		const fontSize = 14;
		const columns = canvas.width / fontSize;

		const rainDrops: number[] = [];
		for (let x = 0; x < columns; x++) {
			rainDrops[x] = 1;
		}

		const draw = () => {
			ctx.fillStyle = "rgba(5, 8, 22, 0.05)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			ctx.fillStyle = "#00cea8";
			ctx.font = `${fontSize}px monospace`;

			for (let i = 0; i < rainDrops.length; i++) {
				const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
				ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

				if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
					rainDrops[i] = 0;
				}
				rainDrops[i]++;
			}
		};

		const interval = setInterval(draw, 30);

		const handleResize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		window.addEventListener("resize", handleResize);

		return () => {
			clearInterval(interval);
			window.removeEventListener("resize", handleResize);
		};
	}, [active]);

	if (!active) return null;

	return (
		<div className="fixed inset-0 z-[-1] pointer-events-none opacity-40">
			<canvas ref={canvasRef} className="w-full h-full" />
		</div>
	);
}
