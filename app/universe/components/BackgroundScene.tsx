"use client";

import { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ── Twinkling star field ───────────────────────────
function StarField() {
  const ref = useRef<THREE.Points>(null!);
  const { positions, sizes } = useMemo(() => {
    const count = 5000;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 200 + Math.random() * 400;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = 0.3 + Math.random() * 1.4;
    }
    return { positions, sizes };
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.006;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.003) * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={5000} itemSize={3} />
        <bufferAttribute attach="attributes-size" array={sizes} count={5000} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial size={0.9} sizeAttenuation color="#ddeeff" transparent opacity={0.85} />
    </points>
  );
}

// ── Nebula cloud planes ────────────────────────────
function Nebula() {
  const clouds = useMemo(() => [
    { pos: [0, 0, -150] as [number,number,number], color: "#0a0a33", scale: 180, opacity: 0.25 },
    { pos: [-80, 30, -200] as [number,number,number], color: "#1a0033", scale: 140, opacity: 0.2 },
    { pos: [60, -20, -180] as [number,number,number], color: "#001a44", scale: 160, opacity: 0.22 },
    { pos: [20, 60, -220] as [number,number,number], color: "#0d0020", scale: 120, opacity: 0.18 },
  ], []);

  const refs = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    refs.current.forEach((m, i) => {
      if (m) {
        m.rotation.z = state.clock.elapsedTime * 0.008 * (i % 2 === 0 ? 1 : -1);
      }
    });
  });

  return (
    <>
      {clouds.map((c, i) => (
        <mesh
          key={i}
          ref={(el) => { refs.current[i] = el!; }}
          position={c.pos}
          rotation={[0.3, 0, i * 0.8]}
        >
          <planeGeometry args={[c.scale, c.scale]} />
          <meshBasicMaterial color={c.color} transparent opacity={c.opacity} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
      ))}
    </>
  );
}

// ── Shooting stars ─────────────────────────────────
function ShootingStars() {
  const starsRef = useRef<{ x: number; y: number; z: number; life: number; maxLife: number }[]>([]);
  const meshes = useRef<THREE.Mesh[]>([]);
  const COUNT = 5;

  const reset = (i: number) => {
    const maxLife = 1.2 + Math.random() * 1.5;
    starsRef.current[i] = {
      x: (Math.random() - 0.5) * 120,
      y: 20 + Math.random() * 30,
      z: -80 - Math.random() * 50,
      life: Math.random() * maxLife,
      maxLife,
    };
  };

  useEffect(() => {
    for (let i = 0; i < COUNT; i++) reset(i);
  }, []);

  useFrame((_, dt) => {
    starsRef.current.forEach((s, i) => {
      s.life -= dt;
      if (s.life <= 0) reset(i);
      const m = meshes.current[i];
      if (!m) return;
      const t = 1 - s.life / s.maxLife;
      m.position.set(s.x + t * 60, s.y - t * 30, s.z);
      const mat = m.material as THREE.MeshBasicMaterial;
      mat.opacity = s.life / s.maxLife;
    });
  });

  return (
    <>
      {Array.from({ length: COUNT }, (_, i) => (
        <mesh key={i} ref={(el) => { meshes.current[i] = el!; }}>
          <boxGeometry args={[8, 0.08, 0.08]} />
          <meshBasicMaterial color="#aaddff" transparent opacity={0.8} />
        </mesh>
      ))}
    </>
  );
}

// ── Exported Canvas ────────────────────────────────
export function BackgroundScene() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        background: "radial-gradient(ellipse at 30% 40%, #080e2a 0%, #020818 60%, #010510 100%)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 60], fov: 55 }}
        gl={{ antialias: false, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <StarField />
        <Nebula />
        <ShootingStars />
      </Canvas>
    </div>
  );
}
