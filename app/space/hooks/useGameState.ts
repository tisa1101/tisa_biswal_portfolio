import { create } from "zustand";
import { PLANETS, PlanetData } from "../constants/planets";

export type GamePhase = "intro" | "flying" | "approaching" | "landing" | "exploring" | "missionComplete";

interface GameState {
  phase: GamePhase;
  setPhase: (phase: GamePhase) => void;

  fuel: number;
  setFuel: (fuel: number) => void;
  isBoosting: boolean;
  setIsBoosting: (v: boolean) => void;

  planets: PlanetData[];
  nearestPlanet: PlanetData | null;
  nearestDistance: number;
  activePlanet: PlanetData | null;
  discoveredCount: number;
  setNearestPlanet: (planet: PlanetData | null, distance: number) => void;
  setActivePlanet: (planet: PlanetData | null) => void;
  discoverPlanet: (id: string) => void;

  aiMessage: string;
  setAiMessage: (msg: string) => void;

  isMuted: boolean;
  toggleMute: () => void;

  missionObjective: string;
  setMissionObjective: (obj: string) => void;
  
  starCollected: number;
  collectStar: () => void;
}

export const useGameState = create<GameState>((set, get) => ({
  phase: "intro",
  setPhase: (phase) => set({ phase }),

  fuel: 100,
  setFuel: (fuel) => set({ fuel: Math.max(0, Math.min(100, fuel)) }),
  isBoosting: false,
  setIsBoosting: (v) => set({ isBoosting: v }),

  planets: [...PLANETS],
  nearestPlanet: null,
  nearestDistance: Infinity,
  activePlanet: null,
  discoveredCount: 0,

  setNearestPlanet: (planet, distance) =>
    set({ nearestPlanet: planet, nearestDistance: distance }),

  setActivePlanet: (planet) => set({ activePlanet: planet }),

  discoverPlanet: (id) => {
    const planets = get().planets.map((p: PlanetData) =>
      p.id === id ? { ...p, discovered: true } : p
    );
    const discoveredCount = planets.filter((p: PlanetData) => p.discovered).length;
    set({ planets, discoveredCount });
    if (discoveredCount === PLANETS.length) {
      setTimeout(() => set({ phase: "missionComplete" }), 3000);
    }
  },

  aiMessage: "",
  setAiMessage: (msg) => set({ aiMessage: msg }),

  isMuted: false,
  toggleMute: () => set((s) => ({ isMuted: !s.isMuted })),

  missionObjective: "Begin your journey — approach any planet to explore",
  setMissionObjective: (obj) => set({ missionObjective: obj }),

  starCollected: 0,
  collectStar: () => set((s) => ({ starCollected: s.starCollected + 1 })),
}));
