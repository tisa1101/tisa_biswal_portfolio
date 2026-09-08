import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TISA-VERSE | Space Portfolio Exploration",
  description: "Pilot a spacecraft through the universe of Tisa Biswal — an interactive space exploration portfolio experience.",
};

export default function SpaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-black">
      {children}
    </div>
  );
}
