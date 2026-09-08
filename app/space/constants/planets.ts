// PLANET DATA — positions, colors, rings, sizes for each portfolio section
export interface PlanetData {
  id: string;
  name: string;
  section: string;
  emoji: string;
  position: [number, number, number];
  radius: number;
  color: string;
  atmosphereColor: string;
  emissive: string;
  hasRings: boolean;
  ringColor?: string;
  description: string;
  missionLog: string;
  discovered: boolean;
}

export const PLANETS: PlanetData[] = [
  {
    id: "about",
    name: "Earth Prime",
    section: "About Me",
    emoji: "🌍",
    position: [0, 0, -90],
    radius: 8,
    color: "#1a6b8a",
    atmosphereColor: "#4fc3f7",
    emissive: "#0d3d5c",
    hasRings: false,
    description: "Home Planet · The Origin Story",
    missionLog: "Meet Tisa Biswal — CS Engineer, AI Builder, Healthcare Innovator",
    discovered: false,
  },
  {
    id: "skills",
    name: "Saturn Forge",
    section: "Tech Arsenal",
    emoji: "🪐",
    position: [130, 25, -160],
    radius: 10,
    color: "#c9a84c",
    atmosphereColor: "#f5d76e",
    emissive: "#7a6020",
    hasRings: true,
    ringColor: "#e8c84a",
    description: "Skills & Technologies",
    missionLog: "Scan the tech rings — each orbit holds a mastered technology",
    discovered: false,
  },
  {
    id: "projects",
    name: "Luna Lab",
    section: "Projects",
    emoji: "🌕",
    position: [-110, -25, -210],
    radius: 7,
    color: "#8a8a9a",
    atmosphereColor: "#c5c5d0",
    emissive: "#3a3a4a",
    hasRings: false,
    description: "Project Research Labs",
    missionLog: "Enter the lunar laboratories — each dome holds a breakthrough project",
    discovered: false,
  },
  {
    id: "experience",
    name: "Mars Station",
    section: "Experience",
    emoji: "☄️",
    position: [210, 15, -110],
    radius: 7.5,
    color: "#b5451b",
    atmosphereColor: "#e87040",
    emissive: "#6b200a",
    hasRings: false,
    description: "Mission Experience Log",
    missionLog: "Review the mission logs — each file holds a chapter of growth",
    discovered: false,
  },
  {
    id: "achievements",
    name: "Nova Star",
    section: "Achievements",
    emoji: "⭐",
    position: [-60, 90, -310],
    radius: 6,
    color: "#f5e642",
    atmosphereColor: "#ffe066",
    emissive: "#b8a000",
    hasRings: false,
    description: "Hall of Achievements",
    missionLog: "A star that burns bright — forged through hackathons and innovation",
    discovered: false,
  },
  {
    id: "ai",
    name: "Neural Nexus",
    section: "AI & Machine Learning",
    emoji: "🧠",
    position: [-210, 45, -185],
    radius: 9,
    color: "#7b2fff",
    atmosphereColor: "#a855f7",
    emissive: "#4a0fc7",
    hasRings: true,
    ringColor: "#915eff",
    description: "AI Research Planet",
    missionLog: "The neural core — where intelligence meets innovation",
    discovered: false,
  },
  {
    id: "medtech",
    name: "MedTech Sphere",
    section: "Healthcare Innovation",
    emoji: "🏥",
    position: [90, -90, -360],
    radius: 8,
    color: "#00b894",
    atmosphereColor: "#00cec9",
    emissive: "#006650",
    hasRings: false,
    description: "Healthcare Innovation Hub",
    missionLog: "Where technology heals — AI-powered medical breakthroughs",
    discovered: false,
  },
  {
    id: "github",
    name: "Code Orbit",
    section: "GitHub Activity",
    emoji: "📈",
    position: [-160, -65, -140],
    radius: 6.5,
    color: "#e8834a",
    atmosphereColor: "#f5a623",
    emissive: "#8a4020",
    hasRings: false,
    description: "Open Source Contributions",
    missionLog: "Every commit tells a story — thousands of lines of purpose",
    discovered: false,
  },
  {
    id: "leetcode",
    name: "Arena Prime",
    section: "DSA Journey",
    emoji: "🏆",
    position: [260, 65, -310],
    radius: 7,
    color: "#ffa500",
    atmosphereColor: "#ffcc44",
    emissive: "#7a4d00",
    hasRings: true,
    ringColor: "#ffdd44",
    description: "Competitive Programming Arena",
    missionLog: "The proving grounds — where algorithms are forged under pressure",
    discovered: false,
  },
  {
    id: "contact",
    name: "Comms Array",
    section: "Contact",
    emoji: "📞",
    position: [0, -110, -130],
    radius: 5.5,
    color: "#0088ff",
    atmosphereColor: "#44aaff",
    emissive: "#004488",
    hasRings: false,
    description: "Communication Uplink",
    missionLog: "Open a transmission — collaborate, connect, build the future",
    discovered: false,
  },
];

export const SHIP_SPEED = 0.18;
export const SHIP_BOOST_MULTIPLIER = 3.2;
export const APPROACH_DISTANCE = 28;
export const LANDING_DISTANCE = 16;
