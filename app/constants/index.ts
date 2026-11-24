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
		name: "FastAPI",
		icon: "/tech/fastapi.svg",
	},
	{
		name: "Docker",
		icon: "/tech/docker.svg",
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
		title: "Software Engineering Intern",
		company_name: "Inspirants Softwares Private Limited",
		icon: "/backend.webp",
		iconBg: "#383E56",
		date: "Jun 2026 - Aug 2026",
		points: [
			"Architected 'Company Knowledge Brain' - an AI-powered organizational knowledge discovery platform with RAG pipelines.",
			"Developed high-throughput scalable backend services with ASP.NET Core (.NET 8), C#, and Clean Architecture / CQRS.",
			"Engineered vector search orchestration and semantic indexing to unlock rapid document querying for internal teams.",
			"Built responsive interactive management dashboards in React, TypeScript, and Tailwind CSS backed by SQL Server.",
			"Containerized services via Docker and built automated CI/CD workflows and comprehensive unit test suites (xUnit)."
		],
	},
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
			"Filed patent application for innovative diagnostic methodologies in MedTech."
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
			"Winner of the Build Fast with AI Hackathon for MIRA - a live multimodal real-time AI companion with voice streaming, screen grounding, and sandboxed code execution.",
		name: "Build Fast with AI Hackathon",
		image: "/creator.webp",
		link: "https://github.com/tisa1101",
	},
	{
		id: 2,
		testimonial:
			"Nominated to the Grand Finale of SIH 2025 & 2026 for developing T-Rex, an AI-powered sports performance tracking platform.",
		name: "Smart India Hackathon",
		image: "/tech/github.webp",
		link: "#",
	},
	{
		id: 3,
		testimonial:
			"Awarded 3rd Place at LPU's 24-hour Hack AI Season 2 for innovation in AI-powered career guidance solutions.",
		name: "Hack AI Season 2",
		image: "/tech/github.webp",
		link: "#",
	},
	{
		id: 4,
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
		name: "MIRA Multimodal AI",
		description:
			"Winner of Build Fast with AI Hackathon. Real-time multimodal AI agent with live audio streaming, camera & screen grounding, 128k ContextCore RAG, and sandboxed code execution.",
		tags: [
			{
				name: "gemini-api",
				color: "blue-text-gradient",
			},
			{
				name: "fastapi",
				color: "green-text-gradient",
			},
			{
				name: "websockets",
				color: "pink-text-gradient",
			},
		],
		image: "/projectimg/mern.png",
		source_code_link: "https://github.com/tisa1101",
		platform: "Web",
		deploy_link: "https://github.com/tisa1101",
	},
	{
		name: "Stock Sense",
		description:
			"Intelligent AI inventory management system with .NET 8 Clean Architecture, SignalR real-time ledger, and Python FastAPI microservice for predictive demand forecasting & Gemini copilot.",
		tags: [
			{
				name: "csharp-.net8",
				color: "blue-text-gradient",
			},
			{
				name: "fastapi",
				color: "green-text-gradient",
			},
			{
				name: "signalr",
				color: "pink-text-gradient",
			},
		],
		image: "/projectimg/hoobank.webp",
		source_code_link: "https://github.com/tisa1101",
		platform: "Web",
		deploy_link: "https://github.com/tisa1101",
	},
	{
		name: "Dr. Glance AI",
		description:
			"Full-stack clinical AI web application for early detection of oral and eye conditions using MobileNetV2, 21-rule safety framework, and OpenCV/MediaPipe facial tracking. Patent Pending.",
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
		image: "/projectimg/avm.webp",
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
		image: "/projectimg/sparkbright.png",
		source_code_link: "https://github.com/tisa1101",
		platform: "Vercel",
		deploy_link: "https://github.com/tisa1101",
	},
	{
		name: "MedBridge",
		description:
			"AI-driven healthcare integration platform providing preliminary screening and smart recommendations for resource-constrained environments. Patent Pending.",
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
		image: "/projectimg/hoobank.webp",
		source_code_link: "https://github.com/tisa1101",
		platform: "Web",
		deploy_link: "https://github.com/tisa1101",
	},
	{
		name: "NauvriQuest",
		description:
			"AI-powered career platform with resume optimization (AppliAI), career guidance chatbot, and automated job aggregation. Won 3rd Place at Hack AI Season 2.",
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
		image: "/projectimg/mern.png",
		source_code_link: "https://github.com/tisa1101",
		platform: "Web",
		deploy_link: "https://github.com/tisa1101",
	},
	{
		name: "T-Rex Sports AI",
		description:
			"Integrated hardware/software platform for athletes using AI for performance tracking and personalized fitness insights. Smart India Hackathon Grand Finale Nominee.",
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
		image: "/projectimg/metaverse.png",
		source_code_link: "https://github.com/tisa1101",
		platform: "Web",
		deploy_link: "https://github.com/tisa1101",
	},
];

const achievements = [
	{
		title: "Build Fast with AI Winner",
		description: "Winner of Build Fast with AI Hackathon for developing MIRA, an autonomous real-time multimodal AI agent with live voice streaming and screen grounding.",
		icon: "/creator.webp",
		level: "Mythic Level",
		points: "3000 XP",
		type: "Hackathon Champion"
	},
	{
		title: "HCLTech AMPlified Finalist",
		description: "Ranked 16th nationwide among Top 25 national finalists in HCLTech AMPlified 2026 for high-impact software engineering innovation.",
		icon: "/tech/nextjs.svg",
		level: "Level 25",
		points: "1500 XP",
		type: "National Rank 16"
	},
	{
		title: "Odoo Hackathon Grand Finale",
		description: "Selected for the Grand Finale of Odoo Hackathon 2026, building enterprise-grade intelligent ERP workflow modules.",
		icon: "/tech/reactjs.webp",
		level: "Level 22",
		points: "1200 XP",
		type: "Grand Finale"
	},
	{
		title: "Smart India Hackathon Finalist",
		description: "Nominated to the Grand Finale of Smart India Hackathon (SIH 2025 & SIH 2026) for AI sports analytics and computer vision.",
		icon: "/tech/github.webp",
		level: "Level 24",
		points: "1200 XP",
		type: "National Grand Finale"
	},
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
		description: "CISCE 12th Topper in the district with 82.75% and 91% in ICSE 10th, representing academic excellence and dedication.",
		icon: "/tech/tensorflow.svg",
		level: "Max Level",
		points: "2500 XP",
		type: "District Topper"
	},
];

export { services, technologies, experiences, testimonials, projects, achievements };
