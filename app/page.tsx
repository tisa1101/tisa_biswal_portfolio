"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  Achievements,
  StarsCanvas,
  BootLoader,
  CommandPalette,
  EasterEggs,
  EmojiSystem,
  WorkstationDrones,
} from "./components";
import TilosaRobot from "./components/TilosaRobot";

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <BootLoader onComplete={() => setBooted(true)} />
      <CommandPalette />
      <EasterEggs />
      <EmojiSystem />

      {/* TILOSA AI Robot — visible after boot */}
      {booted && <TilosaRobot />}

      <div className={`relative z-0 bg-[#050816] min-h-screen transition-opacity duration-1000 ${booted ? "opacity-100" : "opacity-0 h-screen overflow-hidden"}`}>
        {/* Hero section with aurora bg */}
        <div className="relative bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>

        {/* Main content */}
        <div className="relative z-0 flex flex-col">
          <About />
          <Experience />
          <Tech />
          <Works />
          <Achievements />
          <Feedbacks />
          <div className="relative z-0">
            <Contact />
            <StarsCanvas />
          </div>
        </div>
      </div>
    </>
  );
}
