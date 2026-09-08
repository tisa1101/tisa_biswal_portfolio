"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Trail } from "@react-three/drei";
import * as THREE from "three";
import { useSpaceship } from "../hooks/useSpaceship";
import { useGameState } from "../hooks/useGameState";

// Engine particle system
function EngineParticles({ isBoosting }: { isBoosting: boolean }) {
  const particlesRef = useRef<THREE.Points>(null!);
  const count = 80;
  const positions = useRef(new Float32Array(count * 3));
  const velocities = useRef(
    Array.from({ length: count }, () => new THREE.Vector3(
      (Math.random() - 0.5) * 0.05,
      (Math.random() - 0.5) * 0.05,
      0.08 + Math.random() * 0.12
    ))
  );
  const lives = useRef(Array.from({ length: count }, () => Math.random()));

  useFrame((_, dt) => {
    if (!particlesRef.current) return;
    const pos = positions.current;
    for (let i = 0; i < count; i++) {
      lives.current[i] -= dt * (isBoosting ? 3 : 1.5);
      if (lives.current[i] <= 0) {
        // Reset particle at engine exhaust
        pos[i * 3] = (Math.random() - 0.5) * 0.3;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 0.3;
        pos[i * 3 + 2] = 1.2;
        lives.current[i] = 1;
      } else {
        pos[i * 3] += velocities.current[i].x;
        pos[i * 3 + 1] += velocities.current[i].y;
        pos[i * 3 + 2] += velocities.current[i].z * (isBoosting ? 2 : 1);
      }
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions.current}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isBoosting ? 0.22 : 0.14}
        color={isBoosting ? "#ff9944" : "#44aaff"}
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Engine glow cone
function EngineGlow({ isBoosting }: { isBoosting: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    const pulse = 0.5 + Math.sin(state.clock.elapsedTime * 12) * 0.1;
    mat.opacity = isBoosting ? 0.85 * pulse : 0.45 * pulse;
    const scale = isBoosting ? 1.6 + Math.sin(state.clock.elapsedTime * 8) * 0.2 : 1;
    meshRef.current.scale.set(scale, scale, scale);
  });
  return (
    <mesh ref={meshRef} position={[0, 0, 1.5]} rotation={[Math.PI / 2, 0, 0]}>
      <coneGeometry args={[0.25, 1.2, 16, 1, true]} />
      <meshBasicMaterial
        color={isBoosting ? "#ff6600" : "#0088ff"}
        transparent
        opacity={0.5}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}

export interface SpacecraftRef {
  position: THREE.Vector3;
}

interface SpacecraftProps {
  positionRef: React.MutableRefObject<THREE.Vector3>;
}

export function Spacecraft({ positionRef }: SpacecraftProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const { setIsBoosting, isBoosting, phase } = useGameState();

  const handleBoost = (boosting: boolean) => {
    setIsBoosting(boosting);
  };

  useSpaceship({ shipRef: groupRef, onBoost: handleBoost });

  // Sync position to ref for planet proximity checks
  useFrame(() => {
    if (groupRef.current) {
      positionRef.current.copy(groupRef.current.position);
    }
  });

  // Natural float animation
  useFrame((state) => {
    if (!groupRef.current || phase !== "flying") return;
    const t = state.clock.elapsedTime;
    const baseY = groupRef.current.position.y;
    groupRef.current.position.y = baseY + Math.sin(t * 0.8) * 0.002;
  });

  if (phase === "exploring" || phase === "missionComplete") return null;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main hull - futuristic wedge shape */}
      <mesh position={[0, 0, 0]}>
        <coneGeometry args={[0.6, 2.8, 6]} />
        <meshStandardMaterial color="#1a2a4a" metalness={0.9} roughness={0.15} emissive="#0044aa" emissiveIntensity={0.2} />
      </mesh>

      {/* Cockpit bubble */}
      <mesh position={[0, 0.4, -0.4]}>
        <sphereGeometry args={[0.42, 16, 16]} />
        <meshStandardMaterial color="#88ccff" metalness={0.1} roughness={0.05} transparent opacity={0.7} emissive="#4488ff" emissiveIntensity={0.4} />
      </mesh>

      {/* Left wing */}
      <mesh position={[-1.0, -0.1, 0.4]} rotation={[0, 0, -0.25]}>
        <boxGeometry args={[1.2, 0.1, 0.8]} />
        <meshStandardMaterial color="#0d1a30" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Right wing */}
      <mesh position={[1.0, -0.1, 0.4]} rotation={[0, 0, 0.25]}>
        <boxGeometry args={[1.2, 0.1, 0.8]} />
        <meshStandardMaterial color="#0d1a30" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Engine nacelles left */}
      <mesh position={[-0.85, -0.1, 0.9]}>
        <cylinderGeometry args={[0.16, 0.22, 0.8, 10]} />
        <meshStandardMaterial color="#223355" metalness={0.95} roughness={0.1} emissive="#0033aa" emissiveIntensity={0.3} />
      </mesh>

      {/* Engine nacelles right */}
      <mesh position={[0.85, -0.1, 0.9]}>
        <cylinderGeometry args={[0.16, 0.22, 0.8, 10]} />
        <meshStandardMaterial color="#223355" metalness={0.95} roughness={0.1} emissive="#0033aa" emissiveIntensity={0.3} />
      </mesh>

      {/* Engine glow */}
      <EngineGlow isBoosting={isBoosting} />

      {/* Engine particles */}
      <EngineParticles isBoosting={isBoosting} />

      {/* Ship light */}
      <pointLight color="#4488ff" intensity={2} distance={8} />
    </group>
  );
}
