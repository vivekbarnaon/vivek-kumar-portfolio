"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  TrendingUp,
  Barcode,
  DollarSign,
  Layers,
  Terminal,
  ExternalLink,
  Cpu,
  Zap,
  Sparkles,
  Bot,
  Activity,
  Award,
  Mic
} from "lucide-react";

function GithubIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

interface ProjectCardProps {
  title: string;
  category: string;
  specNumber: string;
  icon: React.ReactNode;
  iconBg: string;
  bullets: string[];
  techStack: string[];
  liveCommand: string;
  liveLink: string;
  githubCommand: string;
  githubLink: string;
  architectureHighlight: string;
  index: number;
  featured?: boolean;
}

function ProjectCard({
  title,
  category,
  specNumber,
  icon,
  iconBg,
  bullets,
  techStack,
  liveCommand,
  liveLink,
  githubCommand,
  githubLink,
  architectureHighlight,
  index,
  featured = false
}: ProjectCardProps) {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const handleCopyAndOpen = (cmd: string, link: string) => {
    navigator.clipboard?.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
    if (link && link !== "#") {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`group relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl border bg-[#13141f]/85 backdrop-blur-md sketch-border transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(99,102,241,0.2)] ${
        featured
          ? "border-indigo-500/40 shadow-[0_10px_30px_rgba(99,102,241,0.12)] lg:col-span-2"
          : "border-white/10 hover:border-indigo-500/60"
      }`}
    >
      <div className="sketch-tape opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Header */}
      <div>
        <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 rounded-xl border border-white/15 ${iconBg} flex items-center justify-center transition-transform group-hover:scale-105`}>
              {icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-indigo-400 tracking-wider">
                  {specNumber} // {category}
                </span>
                {featured && (
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                    ★ FEATURED AI SYSTEM
                  </span>
                )}
              </div>
              <h3 className="text-xl font-mono font-bold text-white group-hover:text-indigo-300 transition-colors leading-tight">
                {title}
              </h3>
            </div>
          </div>
        </div>

        {/* Architecture highlight banner */}
        <div className="mb-5 px-3.5 py-2.5 rounded-xl bg-[#0c0d12] border border-white/10 text-xs font-mono text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-slate-200 text-[11px] font-medium">{architectureHighlight}</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono hidden sm:inline">LIVE ON VERCEL ↗</span>
        </div>

        {/* Bullet Points */}
        <div className="space-y-3 font-mono text-xs sm:text-sm text-slate-200 mb-6">
          {bullets.map((bullet, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <span className="mt-0.5 text-indigo-400 shrink-0 font-bold">✎</span>
              <p className="leading-relaxed">{bullet}</p>
            </div>
          ))}
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-lg bg-[#0c0d12] border border-white/10 text-slate-300 font-mono text-[11px] hover:border-indigo-400 hover:text-white transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Terminal Command Prompt Action Buttons */}
      <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Live Link Command Prompt Button */}
        <button
          onClick={() => handleCopyAndOpen(liveCommand, liveLink)}
          className="w-full text-left px-3.5 py-2.5 rounded-xl bg-[#0c0d12] border border-indigo-500/40 text-indigo-300 font-mono text-xs hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all duration-200 flex items-center justify-between group/btn shadow-[0_0_12px_rgba(99,102,241,0.2)] cursor-pointer"
          title={`Click to open live app (${liveLink})`}
        >
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <Terminal className="w-3.5 h-3.5 shrink-0 text-indigo-400 group-hover/btn:text-white" />
            <span className="truncate font-semibold">{liveCommand}</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-80 group-hover/btn:opacity-100" />
        </button>

        {/* GitHub Command Prompt Button */}
        <button
          onClick={() => handleCopyAndOpen(githubCommand, githubLink)}
          className="w-full text-left px-3.5 py-2.5 rounded-xl bg-[#0c0d12] border border-white/15 text-slate-300 font-mono text-xs hover:border-indigo-400 hover:text-white hover:bg-indigo-500/10 transition-all duration-200 flex items-center justify-between group/btn cursor-pointer"
          title={`Click to open GitHub repo (${githubLink})`}
        >
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <GithubIcon className="w-3.5 h-3.5 shrink-0 text-slate-400 group-hover/btn:text-white" />
            <span className="truncate">{githubCommand}</span>
          </div>
          <span className="text-[10px] text-slate-400 group-hover/btn:text-indigo-300">
            {copiedCmd === githubCommand ? "COPIED!" : "GITHUB ↗"}
          </span>
        </button>
      </div>
    </motion.div>
  );
}

export default function FeaturedProjects() {
  const projects: (Omit<ProjectCardProps, "index"> & { featured?: boolean })[] = [
    {
      title: "Micro Wins AI: Smart Task Companion",
      category: "GEN_AI NEURO-INCLUSIVE APP",
      specNumber: "PRJ_01",
      featured: true,
      icon: (
        <div className="relative flex items-center justify-center">
          <Bot className="w-6 h-6 text-indigo-400" />
          <Sparkles className="w-3.5 h-3.5 text-amber-400 absolute -bottom-1 -right-1" />
        </div>
      ),
      iconBg: "bg-indigo-500/10 border-indigo-500/30",
      architectureHighlight: "Azure Functions (Python) + Groq LLM + Dockerized SQLite (Zero-Setup)",
      bullets: [
        "A privacy-first AI web application that helps neurodivergent users start tasks by breaking large goals into small, actionable micro-steps using Groq LLM.",
        "Engineered chat-based step flow, speech-to-text voice commands, gentle reminders & break control, gamified streaks/virtual badges, and OpenDyslexic / Lexend font accessibility.",
        "Privacy-First Architecture: No PII sent to LLM; SQLite database is automatically generated inside the Docker backend container with zero external database configuration."
      ],
      techStack: [
        "Azure Functions (Python)",
        "Groq LLM",
        "React + Vite",
        "SQLite",
        "Docker & Compose",
        "Speech-to-Text",
        "Gamification & Streaks"
      ],
      liveCommand: "$ ./launch_microwins.sh",
      liveLink: "https://micro-wins-ai.vercel.app",
      githubCommand: "$ git clone /micro-wins-ai",
      githubLink: "https://github.com/vivekbarnaon/micro-wins-ai"
    },
    {
      title: "Mind Recommend: Mental Health Assessment (AI Lab)",
      category: "AI / ML DIAGNOSTIC PLATFORM",
      specNumber: "PRJ_02",
      icon: (
        <div className="relative flex items-center justify-center">
          <Brain className="w-6 h-6 text-sky-400" />
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400 absolute -bottom-1 -right-1" />
        </div>
      ),
      iconBg: "bg-sky-500/10 border-sky-500/30",
      architectureHighlight: "Random Forest Classifier + End-to-End Lifestyle Predictor",
      bullets: [
        "Trained Random Forest model (scikit-learn, Pandas) to predict conditions from lifestyle factors.",
        "Engineered data preprocessing for diverse inputs and deployed responsive assessment web platform."
      ],
      techStack: ["Python", "scikit-learn", "Pandas", "Random Forest", "Feature Engineering", "Data Preprocessing", "Vercel"],
      liveCommand: "$ ./launch_mind_recommend.sh",
      liveLink: "https://mind-recommend.vercel.app",
      githubCommand: "$ git clone /Mind-recommend",
      githubLink: "https://github.com/vivekbarnaon/Mind-recommend"
    },
    {
      title: "FreshTrack Pro: Smart-Expiry Inventory",
      category: "FULL-STACK & CLOUD INVENTORY",
      specNumber: "PRJ_03",
      icon: (
        <div className="relative flex items-center justify-center">
          <Barcode className="w-6 h-6 text-amber-400" />
          <DollarSign className="w-3.5 h-3.5 text-indigo-400 absolute -bottom-1 -right-1 font-bold" />
        </div>
      ),
      iconBg: "bg-amber-500/10 border-amber-500/30",
      architectureHighlight: "Dynamic Pricing Engine + Dockerized RBAC Backend",
      bullets: [
        "Developed full-stack system with dynamic pricing algorithm reducing food waste through intelligent shelf-life tracking.",
        "Implemented RBAC and containerized backend with Docker for seamless high-reliability deployments."
      ],
      techStack: ["React", "Node.js", "Docker", "Dynamic Pricing", "RBAC", "PostgreSQL", "REST API", "Vercel"],
      liveCommand: "$ ./launch_freshtrack.sh",
      liveLink: "https://fresh-track-pro-orcin.vercel.app",
      githubCommand: "$ git clone /FreshTrack-Pro",
      githubLink: "https://github.com/vivekbarnaon/FreshTrack-Pro"
    }
  ];

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-2">
          <Layers className="w-3.5 h-3.5" />
          <span>MODULE // 03.SHOWCASE</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight flex items-center gap-3">
              Featured Projects
              <span className="text-xs font-normal text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded-full bg-indigo-500/10">
                PROD_DEPLOYMENTS
              </span>
            </h2>
            <p className="text-sm text-slate-400 font-mono mt-1">
              Production systems spanning neurodivergent GenAI productivity tools, ML assessment engines, and dynamic inventory platforms.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-400">
            [ LIVE VERCEL DEPLOYMENTS ]
          </div>
        </div>
      </motion.div>

      {/* Grid Layout (Wide Featured Card + 2-Column Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <ProjectCard key={project.title} {...project} index={idx} />
        ))}
      </div>
    </section>
  );
}
