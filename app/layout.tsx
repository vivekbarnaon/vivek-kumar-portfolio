import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import CreativeSketchBackground from "./components/CreativeSketchBackground";
import Navbar from "./components/Navbar";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vivek Kumar | Software Developer & Gen AI Engineer",
  description: "Creative Sketch Portfolio of Vivek Kumar - Software Developer & Gen AI Engineer specializing in full-stack architecture, machine learning models, and numerical optimization.",
  keywords: [
    "Vivek Kumar",
    "Software Developer",
    "Gen AI Engineer",
    "Machine Learning",
    "IIT Madras Research Intern",
    "Portfolio",
    "Full Stack Developer"
  ],
  authors: [{ name: "Vivek Kumar" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0C0D12",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistMono.variable} font-mono bg-[#0c0d12] text-slate-100 min-h-screen relative antialiased selection:bg-indigo-500 selection:text-white overflow-x-hidden`}
      >
        {/* Creative Sketch Background */}
        <CreativeSketchBackground />

        {/* Global Navigation */}
        <Navbar />

        {/* Main Content */}
        <main className="relative z-20">
          {children}
        </main>
      </body>
    </html>
  );
}
