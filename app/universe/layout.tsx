import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Universe of Tisa · Portfolio",
  description:
    "Explore the universe of Tisa Biswal — AI Engineer, Software Developer, and Healthcare Innovator. Click planets to discover the journey.",
};

export default function UniverseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ margin: 0, padding: 0, background: "#020818", overflow: "hidden", position: "fixed", inset: 0, width: "100vw", height: "100vh" }}>
      {children}
    </div>
  );
}
