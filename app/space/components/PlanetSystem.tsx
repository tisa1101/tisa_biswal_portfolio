"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Planet } from "./Planet";
import { PLANETS, APPROACH_DISTANCE, LANDING_DISTANCE } from "../constants/planets";
import { useGameState } from "../hooks/useGameState";

interface PlanetSystemProps {
  shipPositionRef: React.MutableRefObject<THREE.Vector3>;
  onLand: (planetId: string) => void;
}

export function PlanetSystem({ shipPositionRef, onLand }: PlanetSystemProps) {
  const { planets, setNearestPlanet, setAiMessage, setMissionObjective, phase } = useGameState();
  const lastNearestRef = useRef<string | null>(null);
  const frameCounter = useRef(0);

  useFrame(() => {
    // Only check every 10 frames for perf
    frameCounter.current++;
    if (frameCounter.current % 10 !== 0) return;
    if (phase === "exploring" || phase === "intro") return;

    const shipPos = shipPositionRef.current;
    let nearestDist = Infinity;
    let nearestPlanet = null;

    for (const planet of planets) {
      const pPos = new THREE.Vector3(...planet.position);
      const dist = shipPos.distanceTo(pPos);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearestPlanet = planet;
      }
    }

    setNearestPlanet(nearestPlanet, nearestDist);

    if (nearestPlanet && nearestDist < APPROACH_DISTANCE) {
      if (lastNearestRef.current !== nearestPlanet.id) {
        lastNearestRef.current = nearestPlanet.id;
        setAiMessage(`Approaching ${nearestPlanet.name} — ${nearestPlanet.section}`);
        setMissionObjective(`Press [E] to land on ${nearestPlanet.name}`);
      }
    } else {
      if (lastNearestRef.current !== null) {
        lastNearestRef.current = null;
        setAiMessage("");
        setMissionObjective("Navigate to a planet to explore");
      }
    }
  });

  // E key to land
  useFrame(() => {
    // Handled externally via keyboard listener in SpaceScene
  });

  const handleClick = (planet: typeof PLANETS[0]) => {
    const pPos = new THREE.Vector3(...planet.position);
    const dist = shipPositionRef.current.distanceTo(pPos);
    if (dist < APPROACH_DISTANCE) {
      onLand(planet.id);
    }
  };

  return (
    <>
      {planets.map((planet) => (
        <Planet
          key={planet.id}
          planet={planet}
          shipPosition={shipPositionRef.current}
          onClick={handleClick}
        />
      ))}
    </>
  );
}
