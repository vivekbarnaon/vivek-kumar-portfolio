"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, Sparkles, Code2, Compass, Pencil, FileText, ExternalLink } from "lucide-react";
import CreativeSketchCanvas from "./CreativeSketchCanvas";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  );
}

function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

const typewriterLines = [
  "Vivek Kumar",
  "Software Developer",
  "Gen AI Engineer"
];

export default function Hero() {
  const [displayedText, setDisplayedText] = useState<string[]>(["", "", ""]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= typewriterLines.length) return;

    const currentLineTarget = typewriterLines[currentLineIndex];

    if (currentCharIndex < currentLineTarget.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => {
          const updated = [...prev];
          updated[currentLineIndex] = currentLineTarget.slice(0, currentCharIndex + 1);
          return updated;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, 55);
      return () => clearTimeout(timeout);
    } else {
      const nextLineTimeout = setTimeout(() => {
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 300);
      return () => clearTimeout(nextLineTimeout);
    }
  }, [currentLineIndex, currentCharIndex]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Typewriter & Introduction */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col justify-center space-y-6 z-10"
        >
          {/* Typewriter Header */}
          <div className="space-y-1.5 font-mono">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white flex items-center min-h-[1.2em]">
              <span className="text-white drop-shadow-[0_2px_15px_rgba(255,255,255,0.2)]">
                {displayedText[0] || (currentLineIndex === 0 ? "" : typewriterLines[0])}
              </span>
              {currentLineIndex === 0 && (
                <span className="inline-block w-3 h-8 sm:h-10 ml-1.5 bg-indigo-500 animate-pulse" />
              )}
            </div>

            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-indigo-400 flex items-center min-h-[1.2em]">
              <span>
                {displayedText[1] || (currentLineIndex > 1 ? typewriterLines[1] : "")}
              </span>
              {currentLineIndex === 1 && (
                <span className="inline-block w-2.5 h-7 sm:h-8 ml-1.5 bg-indigo-400 animate-pulse" />
              )}
            </div>

            <div className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-sky-400 flex items-center min-h-[1.2em]">
              <span>
                {displayedText[2] || (currentLineIndex >= 2 ? typewriterLines[2] : "")}
              </span>
              {currentLineIndex >= 2 && (
                <span className="inline-block w-2.5 h-6 sm:h-7 ml-1.5 bg-sky-400 animate-pulse" />
              )}
            </div>
          </div>

          {/* Static Tagline with Marker Highlight effect */}
          <p className="text-base sm:text-lg text-slate-200 font-mono leading-relaxed border-l-2 border-indigo-500 pl-4 py-1 bg-gradient-to-r from-indigo-500/10 to-transparent">
            Designing intelligent systems from concept to deployment.
          </p>

          {/* Summary bullets */}
          <div className="text-xs sm:text-sm text-slate-400 font-mono space-y-2 pt-1">
            <div className="flex items-center gap-2">
              <span className="text-indigo-400 font-bold">✎</span>
              <span>B.Tech AI &amp; ML @ Heritage Institute of Technology (2023-2027)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sky-400 font-bold">✎</span>
              <span>Research &amp; Engineering Experience: IIT Madras &amp; Jabzs Gaming Studio</span>
            </div>
          </div>

          {/* Action Buttons: Explore Portfolio, View Projects, Download Resume */}
          <div className="pt-4 flex flex-wrap items-center gap-3.5">
            <a
              href="#experience"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl border-2 border-indigo-500 text-indigo-300 bg-transparent hover:bg-indigo-600 hover:text-white transition-all duration-300 font-mono text-sm tracking-wider font-bold shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:shadow-[0_0_30px_rgba(99,102,241,0.45)] group"
            >
              <span>Explore Portfolio</span>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/15 text-slate-300 hover:border-indigo-400 hover:text-white hover:bg-indigo-500/10 transition-all duration-300 font-mono text-xs tracking-wider"
            >
              <Code2 className="w-4 h-4 text-sky-400" />
              <span>View Projects (3) ✦</span>
            </a>

            <a
              href="https://drive.google.com/file/d/1vg-zCl3DgT_WKuL7vxvAdaxhYfMWE9UJ/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-amber-500/30 text-amber-300 hover:border-amber-400 hover:bg-amber-500/10 transition-all duration-300 font-mono text-xs tracking-wider"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Resume / CV ↗</span>
            </a>
          </div>

          {/* Quick Social Links Bar */}
          <div className="pt-2 flex items-center gap-3 text-xs font-mono text-slate-400">
            <span className="text-[11px] text-slate-500">PROFILES:</span>
            <a
              href="https://github.com/vivekbarnaon"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#0c0d12] border border-white/10 text-slate-300 hover:text-white hover:border-indigo-400 transition-all"
              title="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/vivek-kumar-b04874289"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#0c0d12] border border-white/10 text-slate-300 hover:text-sky-400 hover:border-sky-400 transition-all"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.youtube.com/@TechVivek018"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#0c0d12] border border-white/10 text-slate-300 hover:text-rose-400 hover:border-rose-400 transition-all"
              title="YouTube Channel"
            >
              <YoutubeIcon className="w-4 h-4" />
            </a>
          </div>

          {/* Sketch Metadata Footer */}
          <div className="pt-6 grid grid-cols-3 gap-3 border-t border-white/10 text-[11px] font-mono text-slate-400">
            <div>
              <span className="block text-indigo-400/80 text-[10px]">FOCUS</span>
              <span className="text-slate-200">Full-Stack + GenAI</span>
            </div>
            <div>
              <span className="block text-sky-400/80 text-[10px]">OPTIMIZATION</span>
              <span className="text-slate-200">Numerical &amp; ML</span>
            </div>
            <div>
              <span className="block text-emerald-400/80 text-[10px]">STATUS</span>
              <span className="text-emerald-400 font-semibold">Open to Roles</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: 3D Creative Sketch Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center items-center relative"
        >
          <CreativeSketchCanvas />
        </motion.div>
      </div>
    </section>
  );
}
