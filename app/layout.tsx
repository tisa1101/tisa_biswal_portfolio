import type { Metadata, Viewport } from "next";
import { Poppins as FontSans } from "next/font/google";
import "@/app/styles/globals.css";

const fontSans = FontSans({
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "Tisa Biswal | AI & MedTech Portfolio",
	description: "Professional portfolio of Tisa Biswal, specializing in AI Researcher, MedTech innovation, and Software Development.",
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="w-full min-h-screen overflow-x-hidden">
			<body className={`${fontSans.variable} w-full min-h-screen overflow-x-hidden antialiased`}>{children}</body>
		</html>
	);
}
