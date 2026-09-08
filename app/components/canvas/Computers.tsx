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
			// Smooth floating height animation while revolving
			meshRef.current.position.y = isMobile ? -0.1 + Math.sin(time) * 0.05 : 0.35 + Math.sin(time) * 0.05;
		}
	});

	return (
		<mesh ref={meshRef}>
			<ambientLight intensity={1.8} />
			<directionalLight position={[10, 10, 10]} intensity={2.5} />
			<hemisphereLight intensity={1.2} groundColor="#050816" />
			<pointLight intensity={8} position={[0, 3, 2]} color="#915eff" />
			<pointLight intensity={6} position={[2, 1, 2]} color="#00cea8" />
			<spotLight
				position={[-20, 50, 10]}
				angle={0.2}
				penumbra={1}
				intensity={3}
				castShadow
				shadow-mapSize={1024}
			/>
			<primitive
				object={computer.scene}
				scale={isMobile ? 0.55 : 0.72}
				position={isMobile ? [0, 0.1, -1.2] : [-0.2, 0.45, 0]}
				rotation={[-0.01, -0.1, -0.05]}
			/>
		</mesh>
	);
};

const ComputersCanvas = () => {
	const [isMobile, setIsMobile] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

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
		<div 
			className="w-full h-full cursor-grab active:cursor-grabbing"
			onPointerEnter={() => setIsHovered(true)}
			onPointerLeave={() => setIsHovered(false)}
			onTouchStart={() => setIsHovered(true)}
			onTouchEnd={() => setIsHovered(false)}
		>
			<Canvas
				shadows
				camera={{ position: [20, 3, 5], fov: 35 }}
				gl={{ preserveDrawingBuffer: true }}
			>
				<Suspense fallback={<CanvasLoader />}>
					<OrbitControls
						enableZoom={false}
						enableRotate={true}
						autoRotate={true}
						autoRotateSpeed={isHovered ? 8.0 : 3.2}
						rotateSpeed={0.9}
						maxPolarAngle={Math.PI / 2}
						minPolarAngle={0}
					/>
					<Computers isMobile={isMobile} />
				</Suspense>
				<Preload all />
			</Canvas>
		</div>
	);
};

export default ComputersCanvas;
