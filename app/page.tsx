import {
	About,
	Contact,
	Experience,
	Feedbacks,
	Hero,
	Navbar,
	Tech,
	Works,
	Achievements,
	StarsCanvas,
} from "./components";

export default function Home() {
	return (
		<div className="relative z-0 bg-primary font-sans mesh-background wavy-pattern min-h-screen">
			<div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
				<Navbar />
				<Hero />
			</div>
			<div className="relative z-0 flex flex-col gap-10 md:gap-20">
				<About />
				<Experience />
				<Tech />
				<Works />
				<Achievements />
				<Feedbacks />
				<div className="relative z-0">
					<Contact />
					<StarsCanvas />
				</div>
			</div>
		</div>
	);
}
