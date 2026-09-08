"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";

const SPEED = 0.22;
const BOOST = 3.5;
const INERTIA = 0.88;
const MOUSE_TILT = 0.18;
const CAMERA_SPRING = 0.06;
const CAMERA_OFFSET = new THREE.Vector3(0, 3.5, 12);

interface UseSpaceshipProps {
  shipRef: React.RefObject<THREE.Group>;
  onBoost?: (isBoosting: boolean) => void;
}

export function useSpaceship({ shipRef, onBoost }: UseSpaceshipProps) {
  const { camera, gl } = useThree();
  const velocity = useRef(new THREE.Vector3());
  const mousePos = useRef({ x: 0, y: 0 });
  const targetCamPos = useRef(new THREE.Vector3());
  const keysRef = useRef({
    w: false, s: false, a: false, d: false,
    q: false, e: false, shift: false, space: false,
    ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false,
  });

  // Mouse tracking
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    const handleKey = (e: KeyboardEvent, down: boolean) => {
      const k = e.key.toLowerCase();
      if (k === "shift") keysRef.current.shift = down;
      else if (k === " ") keysRef.current.space = down;
      else if (k in keysRef.current) (keysRef.current as any)[k] = down;
      if (e.key === "ArrowUp") keysRef.current.ArrowUp = down;
      if (e.key === "ArrowDown") keysRef.current.ArrowDown = down;
      if (e.key === "ArrowLeft") keysRef.current.ArrowLeft = down;
      if (e.key === "ArrowRight") keysRef.current.ArrowRight = down;
    };
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("keydown", (e) => handleKey(e, true));
    window.addEventListener("keyup", (e) => handleKey(e, false));
    return () => {
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  useFrame((_, delta) => {
    if (!shipRef.current) return;
    const keys = keysRef.current;
    const isBoosting = keys.shift;
    const speed = SPEED * (isBoosting ? BOOST : 1);
    onBoost?.(isBoosting);

    // Build movement direction in world space
    const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
    const up = new THREE.Vector3(0, 1, 0);

    const moveDir = new THREE.Vector3();
    if (keys.w || keys.ArrowUp) moveDir.add(forward);
    if (keys.s || keys.ArrowDown) moveDir.sub(forward);
    if (keys.a || keys.ArrowLeft) moveDir.sub(right);
    if (keys.d || keys.ArrowRight) moveDir.add(right);
    if (keys.q) moveDir.sub(up);
    if (keys.e) moveDir.add(up);
    if (moveDir.length() > 0) moveDir.normalize();

    // Apply inertia
    velocity.current.lerp(moveDir.multiplyScalar(speed), 1 - INERTIA);
    shipRef.current.position.add(velocity.current);

    // Mouse tilt for ship rotation
    const targetRotX = mousePos.current.y * MOUSE_TILT;
    const targetRotZ = -mousePos.current.x * MOUSE_TILT * 0.6;
    const bankZ = keys.a || keys.ArrowLeft ? 0.35 : keys.d || keys.ArrowRight ? -0.35 : targetRotZ;
    const pitchX = keys.w || keys.ArrowUp ? -0.25 : keys.s || keys.ArrowDown ? 0.2 : targetRotX;

    shipRef.current.rotation.x = THREE.MathUtils.lerp(shipRef.current.rotation.x, pitchX, 0.1);
    shipRef.current.rotation.z = THREE.MathUtils.lerp(shipRef.current.rotation.z, bankZ, 0.1);

    // Camera follow spring
    const worldCamOffset = CAMERA_OFFSET.clone().applyQuaternion(
      new THREE.Quaternion().setFromEuler(new THREE.Euler(0, shipRef.current.rotation.y, 0))
    );
    targetCamPos.current.copy(shipRef.current.position).add(worldCamOffset);
    camera.position.lerp(targetCamPos.current, CAMERA_SPRING);
    camera.lookAt(shipRef.current.position);
  });

  return { velocity, mousePos };
}
