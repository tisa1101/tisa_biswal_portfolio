export const navLinks = [
	{
		id: "about",
		title: "About",
	},
	{
		id: "work",
		title: "Experience",
	},
	{
		id: "achievements",
		title: "Quests",
	},
	{
		id: "contact",
		title: "Contact",
	},
];

const services = [
	{
		title: "AI & ML Researcher",
		icon: "/creator.webp",
	},
	{
		title: "MedTech Innovator",
		icon: "/mobile.webp",
	},
	{
		title: "Full Stack Developer",
		icon: "/web.webp",
	},
	{
		title: "Software Engineer",
		icon: "/backend.webp",
	},
];

const technologies = [
	{
		name: "Python",
		icon: "/tech/python.svg",
	},
	{
		name: "React JS",
		icon: "/tech/reactjs.webp",
	},
	{
		name: "Next.JS",
		icon: "/tech/nextjs.svg",
	},
	{
		name: "TensorFlow",
		icon: "/tech/tensorflow.svg",
	},
	{
		name: "OpenCV",
		icon: "/tech/opencv.svg",
	},
	{
		name: "Flask",
		icon: "/tech/flask.svg",
	},
	{
		name: "Node JS",
		icon: "/tech/javascript.webp", // Using JS icon for Node
	},
	{
		name: "MongoDB",
		icon: "/tech/mongodb.svg",
	},
	{
		name: "MySQL",
		icon: "/tech/mysql.svg",
	},
	{
		name: "Tailwind CSS",
		icon: "/tech/tailwind.webp",
	},
	{
		name: "Three JS",
		icon: "/tech/threejs.webp",
	},
	{
		name: "git",
		icon: "/tech/git.webp",
	},
	{
		name: "Vercel",
		icon: "/tech/vercel.svg",
	},
];

const experiences = [
	{
		title: "AI & MedTech Developer (Project Lead)",
		company_name: "Dr. Glance - Smart Oral and Eye Health Monitoring System",
		icon: "/creator.webp",
		iconBg: "#383E56",
		date: "Nov 2025 - Present",
		points: [
			"Developed an AI-based healthcare system for early detection of oral and eye conditions using computer vision and CNNs.",
			"Designed and trained complex CNN models on medical datasets to identify patterns like eye strain and oral abnormalities.",
			"Implemented real-time facial and eye tracking using MediaPipe and OpenCV for live health analysis.",
			"Selected for AIU's Anveshan 2025-26 Prototype Marathon under Health Sciences & Allied Subjects at LPU.",
			"Secured Patent Pending status for innovative diagnostic methodologies in MedTech."
		],
	},
	{
		title: "Agentic AI Developer",
		company_name: "Agentic System Monitor",
		icon: "/web.webp",
		iconBg: "#E6DEDD",
		date: "Apr 2026",
		points: [
			"Developed an agentic AI-powered monitoring dashboard providing real-time visibility into system performance and anomalies.",
			"Designed a multi-agent architecture where intelligent agents continuously track system metrics and respond autonomously.",
			"Built robust real-time monitoring pipelines to detect anomalies and trigger alerts dynamically.",
			"Deployed on Vercel for high-performance, scalable production environment."
		],
	},
	{
		title: "Full Stack AI Developer",
		company_name: "MedBridge – Healthcare Integration Platform",
		icon: "/mobile.webp",
		iconBg: "#383E56",
		date: "Sep 2025 - Dec 2025",
		points: [
			"Engineered an AI-driven platform bridging gaps between patients and early-stage healthcare monitoring systems.",
			"Integrated intelligent modules for health data analysis and preliminary screening for faster identification of health issues.",
			"Incorporated real-time data processing and smart recommendations to assist users in monitoring health conditions.",
			"Focused on scalability and low-cost accessibility for resource-constrained environments (Patent Pending)."
		],
	},
	{
		title: "Hack AI Season 2 Winner (3rd Place)",
		company_name: "LPU / NauvriQuest",
		icon: "/tech/github.webp",
		iconBg: "#E6DEDD",
		date: "Apr 2026",
		points: [
			"Won 3rd place at LPU's 24-hour Hack AI Season 2 hackathon for NauvriQuest, an AI-powered career platform.",
			"Developed AppliAI, an AI feature for optimized job applications and resume enhancement.",
			"Built an intelligent chatbot for personalized career guidance and a comprehensive job portal aggregator."
		],
	},
];

const testimonials = [
	{
		id: 1,
		testimonial:
			"Nominated to the Grand Finale of SIH 2025 for developing T-Rex, an AI-powered sports performance tracking platform.",
		name: "Smart India Hackathon 2025",
		image: "/tech/github.webp",
		link: "#",
	},
	{
		id: 2,
		testimonial:
			"Awarded 3rd Place at LPU's 24-hour Hack AI Season 2 for innovation in AI-powered career guidance solutions.",
		name: "Hack AI Season 2",
		image: "/tech/github.webp",
		link: "#",
	},
	{
		id: 3,
		testimonial:
			"Selected for AIU's Anveshan 2025-26 Prototype Marathon under Health Sciences for Dr. Glance AI system.",
		name: "Anveshan 2025-26",
		image: "/tech/github.webp",
		link: "#",
	},
];

const projects: {
	name: string;
	description: string;
	tags: {
		name: string;
		color: string;
	}[];
	image: string;
	source_code_link?: string;
	deploy_link: string;
	platform: "Netlify" | "Vercel" | "Figma" | "Wordpress" | "Web"
}[] = [
	{
		name: "Dr. Glance AI",
		description:
			"An AI-based healthcare system for early detection of oral and eye conditions using Computer Vision, CNNs, and real-time facial tracking with MediaPipe.",
		tags: [
			{
				name: "python",
				color: "blue-text-gradient",
			},
			{
				name: "tensorflow",
				color: "green-text-gradient",
			},
			{
				name: "opencv",
				color: "pink-text-gradient",
			},
		],
		image: "/projectimg/avm.webp", // Placeholder
		platform: "Web",
		deploy_link: "https://github.com/tisa1101",
	},
	{
		name: "Agentic Monitor",
		description:
			"Real-time AI monitoring dashboard with multi-agent architecture for autonomous system tracking, anomaly detection, and dynamic alerting.",
		tags: [
			{
				name: "nextjs",
				color: "blue-text-gradient",
			},
			{
				name: "ai-agents",
				color: "green-text-gradient",
			},
			{
				name: "vercel",
				color: "pink-text-gradient",
			},
		],
		image: "/projectimg/sparkbright.png", // Placeholder
		source_code_link: "https://github.com/tisa1101",
		platform: "Vercel",
		deploy_link: "https://github.com/tisa1101",
	},
	{
		name: "MedBridge",
		description:
			"AI-driven healthcare integration platform providing preliminary screening and smart recommendations for resource-constrained environments.",
		tags: [
			{
				name: "python",
				color: "blue-text-gradient",
			},
			{
				name: "ml",
				color: "green-text-gradient",
			},
			{
				name: "restapi",
				color: "pink-text-gradient",
			},
		],
		image: "/projectimg/hoobank.webp", // Placeholder
		source_code_link: "https://github.com/tisa1101",
		platform: "Web",
		deploy_link: "https://github.com/tisa1101",
	},
	{
		name: "NauvriQuest",
		description:
			"AI-powered career platform with resume optimization (AppliAI), career guidance chatbot, and automated job aggregation.",
		tags: [
			{
				name: "react",
				color: "blue-text-gradient",
			},
			{
				name: "gen-ai",
				color: "green-text-gradient",
			},
			{
				name: "node",
				color: "pink-text-gradient",
			},
		],
		image: "/projectimg/mern.png", // Placeholder
		source_code_link: "https://github.com/tisa1101",
		platform: "Web",
		deploy_link: "https://github.com/tisa1101",
	},
	{
		name: "T-Rex Sports AI",
		description:
			"Integrated hardware/software platform for athletes using AI for performance tracking and personalized fitness insights.",
		tags: [
			{
				name: "iot",
				color: "blue-text-gradient",
			},
			{
				name: "ai-ml",
				color: "green-text-gradient",
			},
			{
				name: "python",
				color: "pink-text-gradient",
			},
		],
		image: "/projectimg/metaverse.png", // Placeholder
		source_code_link: "https://github.com/tisa1101",
		platform: "Web",
		deploy_link: "https://github.com/tisa1101",
	},
];

const achievements = [
	{
		title: "Event Architect",
		description: "Successfully organized Avishkar 2.0, a major technical event showcasing innovation and talent.",
		icon: "/tech/reactjs.webp", // Placeholder icon
		level: "Level 10",
		points: "500 XP",
		type: "Quest Completed"
	},
	{
		title: "Community Leader",
		description: "Student Coordinator in Women Who Code community under Student Career Committee, empowering women in tech.",
		icon: "/tech/nextjs.svg",
		level: "Level 15",
		points: "750 XP",
		type: "Leadership Achievement"
	},
	{
		title: "Ceremony Master",
		description: "Organized a grand commencement ceremony for seniors, ensuring a memorable transition for the graduating class.",
		icon: "/tech/threejs.webp",
		level: "Level 12",
		points: "600 XP",
		type: "Organization Milestone"
	},
	{
		title: "State Debate Champion",
		description: "Secured 2nd position in the State Level Debate Competition, showcasing exceptional eloquence and critical thinking.",
		icon: "/tech/python.svg",
		level: "Level 20",
		points: "1000 XP",
		type: "State Merit"
	},
	{
		title: "Literary Virtuoso",
		description: "District level winner in story writing competition, demonstrating creative storytelling and narrative depth.",
		icon: "/tech/tailwind.webp",
		level: "Level 8",
		points: "400 XP",
		type: "District Award"
	},
	{
		title: "Rhythmic Performer",
		description: "District level winner in dance competition, displaying artistic expression and stage presence.",
		icon: "/tech/javascript.webp",
		level: "Level 8",
		points: "400 XP",
		type: "District Award"
	},
	{
		title: "Academic Titan",
		description: "CISCE 12th Topper in the district, representing academic excellence and dedication.",
		icon: "/tech/tensorflow.svg",
		level: "Max Level",
		points: "2500 XP",
		type: "District Topper"
	},
];

export { services, technologies, experiences, testimonials, projects, achievements };
