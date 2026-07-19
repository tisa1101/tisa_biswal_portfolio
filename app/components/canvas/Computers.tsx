"use client";
import CanvasLoader from "@/app/components/Loader";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Computers = ({ isMobile }: { isMobile: boolean }) => {
	const computer = useGLTF("/desktop_pc/scene.gltf");
	const meshRef = useRef<THREE.Mesh>(null);

	useFrame((state) => {
		if (meshRef.current) {
			const time = state.clock.getElapsedTime();
			meshRef.current.position.y = isMobile ? -0.8 + Math.sin(time) * 0.05 : -1.2 + Math.sin(time) * 0.05;
			meshRef.current.rotation.y = -0.1 + Math.sin(time * 0.5) * 0.03;
		}
	});

	return (
		<mesh ref={meshRef}>
			<hemisphereLight intensity={0.5} groundColor="black" />
			<pointLight intensity={5} position={[0, 2, 0]} color="#915eff" />
			<pointLight intensity={3} position={[2, 0, 2]} color="#00cea8" />
			<spotLight
				position={[-20, 50, 10]}
				angle={0.12}
				penumbra={1}
				intensity={2}
				castShadow
				shadow-mapSize={1024}
			/>
			<primitive
				object={computer.scene}
				scale={isMobile ? 0.5 : 0.6}
				position={isMobile ? [0, -0.5, -1.2] : [-0.2, -1, 0]}
				rotation={[-0.01, -0.1, -0.05]}
			/>
		</mesh>
	);
};

const ComputersCanvas = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(max-width: 500px)");
		setIsMobile(mediaQuery.matches);
		const handleMediaQueryChange = (event: MediaQueryListEvent) => {
			setIsMobile(event.matches);
		};
		mediaQuery.addEventListener("change", handleMediaQueryChange);

		return () => {
			mediaQuery.removeEventListener("change", handleMediaQueryChange);
		};
	}, []);

	return (
		<Canvas
			shadows
			camera={{ position: [20, 3, 5], fov: 35 }}
			gl={{ preserveDrawingBuffer: true }}
		>
			<Suspense fallback={<CanvasLoader />}>
				<OrbitControls
					enableZoom={false}
					maxPolarAngle={Math.PI / 2}
					minPolarAngle={Math.PI / 2}
				/>
				<Computers isMobile={isMobile} />
			</Suspense>
			<Preload all />
		</Canvas>
	);
};

export default ComputersCanvas;
