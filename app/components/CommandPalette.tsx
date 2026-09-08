"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Compass, Terminal, FileText, Zap, Sparkles, X } from "lucide-react";

interface CommandItem {
	icon: React.ReactNode;
	label: string;
	action: () => void;
	category: string;
}

export default function CommandPalette() {
	const [isOpen, setIsOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedIndex, setSelectedIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);

	const handleScrollTo = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: "smooth" });
			setIsOpen(false);
		}
	};

	const triggerOverdrive = () => {
		window.dispatchEvent(new Event("trigger-overdrive"));
		setIsOpen(false);
	};

	const commands: CommandItem[] = [
		{
			icon: <Compass className="w-4 h-4 text-[#00cea8]" />,
			label: "Navigate to Overview (About)",
			action: () => handleScrollTo("about"),
			category: "Navigation",
		},
		{
			icon: <Compass className="w-4 h-4 text-[#00cea8]" />,
			label: "Navigate to Career Experience",
			action: () => handleScrollTo("work"),
			category: "Navigation",
		},
		{
			icon: <Compass className="w-4 h-4 text-[#00cea8]" />,
			label: "Navigate to Achievements (Quests)",
			action: () => handleScrollTo("achievements"),
			category: "Navigation",
		},
		{
			icon: <Compass className="w-4 h-4 text-[#00cea8]" />,
			label: "Navigate to Contact Console",
			action: () => handleScrollTo("contact"),
			category: "Navigation",
		},
		{
			icon: <FileText className="w-4 h-4 text-[#915eff]" />,
			label: "Download Professional Resume",
			action: () => {
				window.open("https://drive.google.com/file/d/1tG1put6T3wXMpmUyqnRYkF6IDUsALr61/view?usp=sharing", "_blank");
				setIsOpen(false);
			},
			category: "Quick Actions",
		},
		{
			icon: <Zap className="w-4 h-4 text-yellow-400" />,
			label: "Activate System Overdrive (Matrix Mode)",
			action: triggerOverdrive,
			category: "Hacks",
		},
		{
			icon: <Terminal className="w-4 h-4 text-[#00cea8]" />,
			label: "Open Interactive CLI Help",
			action: () => {
				handleScrollTo("work");
				setTimeout(() => {
					window.dispatchEvent(new CustomEvent("cli-command", { detail: "help" }));
				}, 500);
				setIsOpen(false);
			},
			category: "CLI Terminal",
		},
	];

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if ((e.ctrlKey || e.metaKey) && e.key === "k") {
				e.preventDefault();
				setIsOpen((prev) => !prev);
			}

			if (!isOpen) return;

			if (e.key === "Escape") {
				setIsOpen(false);
			} else if (e.key === "ArrowDown") {
				e.preventDefault();
				setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
			} else if (e.key === "ArrowUp") {
				e.preventDefault();
				setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
			} else if (e.key === "Enter") {
				e.preventDefault();
				if (filteredCommands[selectedIndex]) {
					filteredCommands[selectedIndex].action();
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, searchQuery, selectedIndex]);

	const filteredCommands = commands.filter((cmd) =>
		cmd.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
		cmd.category.toLowerCase().includes(searchQuery.toLowerCase())
	);

	useEffect(() => {
		setSelectedIndex(0);
	}, [searchQuery]);

	// Close when clicking outside
	const handleBackdropClick = (e: React.MouseEvent) => {
		if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
			setIsOpen(false);
		}
	};

	return (
		<>
			{/* Command Palette Trigger Button in Navbar / Screen Corner */}
			<div className="fixed bottom-6 right-6 z-[999] md:block hidden">
				<button
					onClick={() => setIsOpen(true)}
					className="bg-[#151030]/80 border border-white/10 hover:border-[#915eff]/50 text-white/70 hover:text-white px-4 py-2.5 rounded-full backdrop-blur-md flex items-center gap-2 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all text-xs font-mono group"
				>
					<Search className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
					<span>Command Palette</span>
					<kbd className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] text-white/50 border border-white/5 font-sans">Ctrl K</kbd>
				</button>
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={handleBackdropClick}
						className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 font-mono select-none"
					>
						<motion.div
							ref={containerRef}
							initial={{ scale: 0.95, y: 10 }}
							animate={{ scale: 1, y: 0 }}
							exit={{ scale: 0.95, y: 10 }}
							transition={{ duration: 0.2 }}
							className="bg-[#0c0c1d]/90 border border-white/10 w-full max-w-lg rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(145,94,255,0.25)] flex flex-col"
						>
							{/* Input bar */}
							<div className="flex items-center gap-3 px-4 py-4 border-b border-white/5">
								<Search className="w-5 h-5 text-secondary" />
								<input
									type="text"
									autoFocus
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									placeholder="Search sections, actions, tools..."
									className="bg-transparent border-none outline-none text-white w-full placeholder:text-secondary text-sm"
								/>
								<button onClick={() => setIsOpen(false)} className="text-secondary hover:text-white transition-colors">
									<X className="w-4 h-4" />
								</button>
							</div>

							{/* Commands list */}
							<div className="flex-1 max-h-[300px] overflow-y-auto p-2 scrollbar-thin">
								{filteredCommands.length > 0 ? (
									filteredCommands.map((cmd, idx) => (
										<div
											key={cmd.label}
											onClick={cmd.action}
											onMouseEnter={() => setSelectedIndex(idx)}
											className={`flex items-center justify-between px-3 py-3 rounded-xl cursor-pointer transition-all duration-150 ${
												idx === selectedIndex
													? "bg-[#915eff]/20 border border-[#915eff]/30 text-white"
													: "border border-transparent text-secondary hover:text-white"
											}`}
										>
											<div className="flex items-center gap-3 text-xs md:text-sm">
												{cmd.icon}
												<span>{cmd.label}</span>
											</div>
											<span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/5 bg-white/5`}>
												{cmd.category}
											</span>
										</div>
									))
								) : (
									<div className="flex flex-col items-center justify-center py-10 text-secondary gap-2">
										<Sparkles className="w-8 h-8 opacity-20" />
										<span className="text-xs">No matching commands found.</span>
									</div>
								)}
							</div>

							{/* Help / Footer */}
							<div className="border-t border-white/5 px-4 py-3 bg-[#0c0c1d]/50 flex justify-between items-center text-[10px] text-secondary">
								<div className="flex gap-2">
									<span><kbd className="bg-white/5 px-1 rounded">↑↓</kbd> navigate</span>
									<span><kbd className="bg-white/5 px-1 rounded">Enter</kbd> select</span>
								</div>
								<span>Esc to close</span>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
