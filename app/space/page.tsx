"use client";

import dynamic from "next/dynamic";
import { IntroSequence } from "./components/IntroSequence";
import { SpaceHUD } from "./components/SpaceHUD";
import { PlanetExperience } from "./components/PlanetExperience";
import { MissionComplete } from "./components/MissionComplete";

// Load 3D scene client-side only (no SSR)
const SpaceScene = dynamic(
  () => import("./components/SpaceScene").then((m) => m.SpaceScene),
  { ssr: false }
);

export default function SpacePage() {
  return (
    <>
      {/* 3D WebGL Canvas */}
      <SpaceScene />

      {/* Intro cinematic overlay */}
      <IntroSequence />

      {/* HUD (glassmorphism, DOM-only) */}
      <SpaceHUD />

      {/* Planet content screen */}
      <PlanetExperience />

      {/* Mission complete finale */}
      <MissionComplete />
    </>
  );
}
