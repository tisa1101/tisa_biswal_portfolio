"use client";
import { navLinks } from "@/app/constants";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ResumeButton from "./ResumeButton";

const Navbar = () => {
	const [active, setActive] = useState("");
	const [toggle, setToggle] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};

		const sectionObserver = new IntersectionObserver(
			(entries) => {
				const visibleEntry = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

				if (!visibleEntry) return;

				const id = visibleEntry.target.getAttribute("id");
				if (!id || id === "hero") {
					setActive("");
					return;
				}

				const matchingLink = navLinks.find((link) => link.id === id);
				setActive(matchingLink?.title ?? "");
			},
			{ threshold: [0.2, 0.4, 0.6], rootMargin: "-15% 0px -35% 0px" }
		);

		const targets = document.querySelectorAll("span.hash-span[id], section[id]");
		targets.forEach((target) => sectionObserver.observe(target));

		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();

		return () => {
			sectionObserver.disconnect();
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<nav
			className={`fixed top-0 w-full z-50 transition-all duration-500 ${
				scrolled ? "py-4" : "py-8"
			}`}
		>
			<div className="w-[92vw] max-w-[1920px] mx-auto px-4 sm:px-6 flex justify-center">
				<div className={`
					flex items-center justify-between w-full px-6 sm:px-8 py-3 rounded-full 
					glass-navbar transition-all duration-500
					${scrolled ? "w-full max-w-[1200px] xl:max-w-[1500px] shadow-2xl" : "w-full"}
				`}>
					<Link
						href="/"
						className="flex items-center gap-3 group"
						onClick={() => {
							setActive("");
							window.scrollTo(0, 0);
						}}
					>
						<div className="relative p-0.5 rounded-full bg-gradient-to-br from-[#915eff] to-[#00cea8] transition-transform group-hover:scale-110">
							<Image
								src="/logo.png"
								width={32}
								height={32}
								alt="logo"
								priority
								className="rounded-full bg-black p-0.5"
							/>
						</div>
						<p className="text-white text-[18px] font-bold cursor-pointer flex items-center tracking-tight">
							Tisa <span className="sm:block hidden text-[#915eff] ml-2 opacity-80 font-medium">| Software Engineer</span>
						</p>
					</Link>

					<ul className="list-none hidden sm:flex flex-row gap-10 items-center">
						{navLinks.map((nav) => (
							<li
								key={nav.id}
								className={`${
									active === nav.title ? "text-white" : "text-secondary"
								} hover:text-white text-[15px] font-medium cursor-pointer transition-all duration-300 relative group`}
								onClick={() => setActive(nav.title)}
							>
								<Link href={`#${nav.id}`}>{nav.title}</Link>
								<span className={`absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-[#915eff] to-[#00cea8] transition-all duration-300 group-hover:w-full ${active === nav.title ? "w-full" : ""}`} />
							</li>
						))}
					</ul>

					<div className="hidden sm:flex items-center gap-3">
						<Link
							href="/universe"
							className="px-3.5 py-1.5 rounded-full text-xs font-bold text-[#4dd9ff] border border-[#4dd9ff]/30 bg-[#4dd9ff]/10 hover:bg-[#4dd9ff]/20 hover:scale-105 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(77,217,255,0.2)]"
						>
							<span>🌌</span> Galaxy Mode
						</Link>
						<Link
							href="/space"
							className="px-3.5 py-1.5 rounded-full text-xs font-bold text-[#c273ff] border border-[#c273ff]/30 bg-[#c273ff]/10 hover:bg-[#c273ff]/20 hover:scale-105 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(194,115,255,0.2)]"
						>
							<span>🎮</span> Game Mode
						</Link>
						<ResumeButton />
					</div>

					<div className="sm:hidden flex items-center">
						<Image
							src={toggle ? "/close.svg" : "/menu.svg"}
							width={24}
							height={24}
							alt="menu"
							className="w-[24px] h-[24px] object-contain cursor-pointer"
							onClick={() => setToggle(!toggle)}
						/>
					</div>
				</div>

				{/* Mobile Menu */}
				<div className={`${!toggle ? "hidden" : "flex"} p-6 glass-morphism absolute top-24 right-6 min-w-[220px] z-10 rounded-3xl animate-in fade-in zoom-in duration-300`}>
					<ul className="list-none flex flex-col gap-5 w-full">
						{navLinks.map((nav) => (
							<li
								key={nav.id}
								className={`text-[18px] font-medium cursor-pointer ${
									active === nav.title ? "text-white" : "text-secondary"
								}`}
								onClick={() => {
									setToggle(false);
									setActive(nav.title);
								}}
							>
								<Link href={`#${nav.id}`}>{nav.title}</Link>
							</li>
						))}
						<li className="pt-3 border-t border-white/10 flex flex-col gap-2">
							<Link
								href="/universe"
								onClick={() => setToggle(false)}
								className="px-3 py-2 rounded-xl text-xs font-bold text-[#4dd9ff] bg-[#4dd9ff]/10 border border-[#4dd9ff]/30 flex items-center gap-2"
							>
								<span>🌌</span> Galaxy Universe Mode
							</Link>
							<Link
								href="/space"
								onClick={() => setToggle(false)}
								className="px-3 py-2 rounded-xl text-xs font-bold text-[#c273ff] bg-[#c273ff]/10 border border-[#c273ff]/30 flex items-center gap-2"
							>
								<span>🎮</span> 3D Space Game Mode
							</Link>
						</li>
						<div className="pt-2 border-t border-white/10">
							<ResumeButton />
						</div>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
