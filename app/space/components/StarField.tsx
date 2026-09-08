"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const STAR_COUNT = 8000;

export function StarField() {
  const meshRef = useRef<THREE.Points>(null!);

  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3);
    const sizes = new Float32Array(STAR_COUNT);
    for (let i = 0; i < STAR_COUNT; i++) {
      const r = 600 + Math.random() * 800;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = 0.4 + Math.random() * 2.2;
    }
    return { positions, sizes };
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.002;
      meshRef.current.rotation.x += delta * 0.0005;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={STAR_COUNT}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          count={STAR_COUNT}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={1.2}
        sizeAttenuation
        color="#ffffff"
        transparent
        opacity={0.85}
        vertexColors={false}
      />
    </points>
  );
}

// Nebula cloud using large transparent sprites
const NEBULA_COUNT = 12;

export function NebulaField() {
  const nebulae = useMemo(() => {
    return Array.from({ length: NEBULA_COUNT }, (_, i) => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 900,
        (Math.random() - 0.5) * 400,
        -200 - Math.random() * 600
      ),
      scale: 80 + Math.random() * 140,
      color: [
        "#1a0533", "#0a1a44", "#0d3320", "#2a0a2a", "#003344",
        "#1a0020", "#001a2a", "#0a2010", "#200010", "#0a0a30",
        "#150020", "#002a20"
      ][i % 12],
      rotation: Math.random() * Math.PI * 2,
      opacity: 0.06 + Math.random() * 0.12,
    }));
  }, []);

  return (
    <>
      {nebulae.map((n, i) => (
        <mesh key={i} position={n.position} rotation={[0, 0, n.rotation]}>
          <planeGeometry args={[n.scale, n.scale]} />
          <meshBasicMaterial
            color={n.color}
            transparent
            opacity={n.opacity}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}
    </>
  );
}

// Floating asteroids
const ASTEROID_COUNT = 120;

export function AsteroidBelt() {
  const positions = useMemo(() => {
    return Array.from({ length: ASTEROID_COUNT }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 500,
        (Math.random() - 0.5) * 80,
        -100 - Math.random() * 600
      ),
      scale: 0.15 + Math.random() * 0.6,
      rotSpeed: (Math.random() - 0.5) * 0.01,
    }));
  }, []);

  const refs = useRef<THREE.Mesh[]>([]);

  useFrame(() => {
    refs.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.rotation.x += positions[i].rotSpeed;
        mesh.rotation.y += positions[i].rotSpeed * 0.7;
      }
    });
  });

  return (
    <>
      {positions.map((ast, i) => (
        <mesh
          key={i}
          ref={(el) => { refs.current[i] = el!; }}
          position={ast.position}
          scale={ast.scale}
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#555566" roughness={0.9} metalness={0.1} />
        </mesh>
      ))}
    </>
  );
}
