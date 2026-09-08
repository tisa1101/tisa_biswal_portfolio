"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Ring } from "@react-three/drei";
import * as THREE from "three";
import { PlanetData, APPROACH_DISTANCE, LANDING_DISTANCE } from "../constants/planets";
import { useGameState } from "../hooks/useGameState";

interface PlanetProps {
  planet: PlanetData;
  shipPosition: THREE.Vector3;
  onClick: (planet: PlanetData) => void;
}

function AtmosphereGlow({ color, radius }: { color: string; radius: number }) {
  return (
    <mesh>
      <sphereGeometry args={[radius * 1.18, 32, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.13}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function CloudLayer({ radius, speed }: { radius: number; speed: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * speed; });
  const cloudGeo = useMemo(() => new THREE.SphereGeometry(radius * 1.035, 32, 32), [radius]);

  return (
    <mesh ref={ref} geometry={cloudGeo}>
      <meshStandardMaterial
        color="#ffffff"
        transparent
        opacity={0.07}
        roughness={1}
        depthWrite={false}
      />
    </mesh>
  );
}

export function Planet({ planet, shipPosition, onClick }: PlanetProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const { phase } = useGameState();

  useFrame((state, dt) => {
    if (!groupRef.current) return;
    // Slow planet rotation
    groupRef.current.rotation.y += dt * 0.08;

    // Distance-based glow pulse
    if (glowRef.current) {
      const dist = shipPosition.distanceTo(
        new THREE.Vector3(...planet.position)
      );
      const approaching = dist < APPROACH_DISTANCE;
      const glowMat = glowRef.current.material as THREE.MeshBasicMaterial;
      const targetOpacity = approaching ? 0.35 + Math.sin(state.clock.elapsedTime * 2) * 0.12 : 0.13;
      glowMat.opacity = THREE.MathUtils.lerp(glowMat.opacity, targetOpacity, 0.05);
    }
  });

  const surfaceMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: planet.color,
      emissive: planet.emissive,
      emissiveIntensity: 0.25,
      roughness: 0.75,
      metalness: 0.15,
    });
  }, [planet.color, planet.emissive]);

  return (
    <group ref={groupRef} position={planet.position}>
      {/* Core planet sphere */}
      <mesh
        material={surfaceMaterial}
        onClick={() => onClick(planet)}
        onPointerOver={() => document.body.style.cursor = "pointer"}
        onPointerOut={() => document.body.style.cursor = "default"}
      >
        <sphereGeometry args={[planet.radius, 48, 48]} />
      </mesh>

      {/* Atmosphere glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[planet.radius * 1.18, 32, 32]} />
        <meshBasicMaterial
          color={planet.atmosphereColor}
          transparent
          opacity={0.13}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Clouds */}
      <CloudLayer radius={planet.radius} speed={0.025} />

      {/* Saturn-style rings */}
      {planet.hasRings && (
        <group rotation={[Math.PI / 5, 0, 0.3]}>
          <mesh>
            <ringGeometry args={[planet.radius * 1.5, planet.radius * 2.4, 64]} />
            <meshBasicMaterial
              color={planet.ringColor ?? "#ccaa44"}
              transparent
              opacity={0.55}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
          <mesh>
            <ringGeometry args={[planet.radius * 2.6, planet.radius * 3.0, 64]} />
            <meshBasicMaterial
              color={planet.ringColor ?? "#ccaa44"}
              transparent
              opacity={0.28}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        </group>
      )}

      {/* Point light for local illumination */}
      <pointLight color={planet.atmosphereColor} intensity={1.8} distance={planet.radius * 8} />
    </group>
  );
}
