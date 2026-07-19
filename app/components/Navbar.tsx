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
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<nav
			className={`fixed top-0 w-full z-50 transition-all duration-500 ${
				scrolled ? "py-4" : "py-8"
			}`}
		>
			<div className="max-w-7xl mx-auto px-6 flex justify-center">
				<div className={`
					flex items-center justify-between w-full px-8 py-3 rounded-full 
					glass-navbar transition-all duration-500
					${scrolled ? "max-w-[1000px] shadow-2xl" : "max-w-full"}
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

					<div className="hidden sm:block">
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
				<div className={`${!toggle ? "hidden" : "flex"} p-6 glass-morphism absolute top-24 right-6 min-w-[200px] z-10 rounded-3xl animate-in fade-in zoom-in duration-300`}>
					<ul className="list-none flex flex-col gap-6 w-full">
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
						<div className="pt-4 border-t border-white/10">
							<ResumeButton />
						</div>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
