"use client";

import { useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, Environment } from "@react-three/drei";
import * as THREE from "three";
import { Spacecraft } from "./Spacecraft";
import { PlanetSystem } from "./PlanetSystem";
import { StarField, NebulaField, AsteroidBelt } from "./StarField";
import { useGameState } from "../hooks/useGameState";
import { APPROACH_DISTANCE } from "../constants/planets";

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.12} color="#112244" />
      <directionalLight
        position={[200, 100, 50]}
        intensity={1.2}
        color="#ffffff"
        castShadow
      />
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#4488ff" distance={300} />
    </>
  );
}

function KeyboardLandingListener({
  shipPositionRef,
  onLand,
}: {
  shipPositionRef: React.MutableRefObject<THREE.Vector3>;
  onLand: (id: string) => void;
}) {
  const { planets, phase } = useGameState();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "e") return;
      if (phase !== "flying") return;

      let nearestDist = Infinity;
      let nearestPlanet = null;
      for (const planet of planets) {
        const pPos = new THREE.Vector3(...planet.position);
        const dist = shipPositionRef.current.distanceTo(pPos);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestPlanet = planet;
        }
      }
      if (nearestPlanet && nearestDist < APPROACH_DISTANCE) {
        onLand(nearestPlanet.id);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [phase, planets, shipPositionRef, onLand]);

  return null;
}

export function SpaceScene() {
  const shipPositionRef = useRef(new THREE.Vector3(0, 0, 0));
  const { setPhase, setActivePlanet, planets } = useGameState();

  const handleLand = (planetId: string) => {
    const planet = planets.find((p) => p.id === planetId);
    if (!planet) return;
    setActivePlanet(planet);
    setPhase("exploring");
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black">
      <Canvas
        camera={{ position: [0, 3.5, 12], fov: 60, near: 0.1, far: 3000 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        shadows
      >
        <Suspense fallback={null}>
          <SceneLights />

          {/* Background */}
          <StarField />
          <NebulaField />

          {/* Deep-space built-in star sphere */}
          <Stars radius={900} depth={80} count={3000} factor={5} saturation={0} fade speed={0.5} />

          {/* Asteroids */}
          <AsteroidBelt />

          {/* Spacecraft */}
          <Spacecraft positionRef={shipPositionRef} />

          {/* Planet system */}
          <PlanetSystem shipPositionRef={shipPositionRef} onLand={handleLand} />

          {/* E key landing listener */}
          <KeyboardLandingListener
            shipPositionRef={shipPositionRef}
            onLand={handleLand}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
