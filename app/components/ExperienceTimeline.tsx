"use client";

import React from "react";
import { motion } from "framer-motion";
import { Microscope, Gamepad2, GitBranch, Calendar, MapPin, Sparkles, Pencil, ExternalLink, Award } from "lucide-react";

interface TimelineItemProps {
  organization: string;
  role: string;
  period: string;
  location: string;
  type: string;
  icon: React.ReactNode;
  iconColor: string;
  accentColor: string;
  bullets: string[];
  techTags: string[];
  schematicId: string;
  index: number;
  certificateUrl?: string;
  certificateLabel?: string;
}

function TimelineCard({
  organization,
  role,
  period,
  location,
  type,
  icon,
  iconColor,
  accentColor,
  bullets,
  techTags,
  schematicId,
  index,
  certificateUrl,
  certificateLabel
}: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative flex flex-col md:flex-row items-start gap-6 group"
    >
      {/* Center glowing node */}
      <div className="hidden md:flex absolute left-8 top-6 -translate-x-1/2 w-7 h-7 rounded-full bg-[#0c0d12] border-2 border-indigo-500 items-center justify-center z-20 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_12px_rgba(99,102,241,0.5)]">
        <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping" />
        <div className="absolute w-2.5 h-2.5 rounded-full bg-indigo-400" />
      </div>

      {/* Main Experience Card */}
      <div className="md:ml-20 w-full p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#13141f]/85 backdrop-blur-md sketch-border hover:border-indigo-500/60 hover:shadow-[0_15px_35px_rgba(99,102,241,0.15)] transition-all duration-300">
        <div className="sketch-tape opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Header bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-xl border border-white/15 flex items-center justify-center ${iconColor} transition-transform group-hover:scale-105`}>
              {icon}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl font-mono font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {organization}
                </h3>
                <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${accentColor}`}>
                  {type}
                </span>
              </div>
              <p className="text-sm font-mono text-sky-400 font-semibold">{role}</p>
            </div>
          </div>

          <div className="flex flex-col sm:items-end text-xs font-mono text-slate-400 space-y-0.5">
            <span className="flex items-center gap-1.5 text-slate-200">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              {period}
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <MapPin className="w-3 h-3 text-sky-400" />
              {location}
            </span>
          </div>
        </div>

        {/* Deliverables & Bullets */}
        <div className="my-4 space-y-3 font-mono text-xs sm:text-sm text-slate-200">
          {bullets.map((bullet, bIdx) => (
            <div key={bIdx} className="flex items-start gap-2.5">
              <span className="mt-0.5 text-indigo-400 shrink-0 font-bold">✎</span>
              <p className="leading-relaxed">{bullet}</p>
            </div>
          ))}
        </div>

        {/* Action Row (Certificate link + Tech Tags) */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono text-slate-400 mr-1">// STACK:</span>
            {techTags.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg bg-[#0c0d12] border border-white/10 text-slate-300 font-mono text-[11px] hover:border-indigo-400 hover:text-white transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Certificate Button if available */}
          {certificateUrl && (
            <a
              href={certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-indigo-500/40 bg-indigo-500/10 hover:bg-indigo-600 hover:text-white text-indigo-300 transition-all font-mono text-xs font-semibold shrink-0 shadow-sm group/cert"
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>{certificateLabel || "View Certificate"}</span>
              <ExternalLink className="w-3 h-3 opacity-70 group-hover/cert:opacity-100" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceTimeline() {
  const experiences: TimelineItemProps[] = [
    {
      organization: "IIT Madras",
      role: "Research Intern",
      period: "Internship Period",
      location: "Chennai / Research Lab",
      type: "RESEARCH INTERNSHIP",
      schematicId: "IITM-RAD-OPT-01",
      icon: <Microscope className="w-5 h-5 text-indigo-400" />,
      iconColor: "bg-indigo-500/10 border-indigo-500/30",
      accentColor: "border-indigo-500/30 bg-indigo-500/10 text-indigo-300",
      bullets: [
        "Built Python numerical optimization framework (Newton-Raphson method) for radiation shielding modeling.",
        "Modeled radionuclide dose-pathway analysis using IAEA/EPA standards."
      ],
      techTags: ["Python", "Newton-Raphson", "Numerical Optimization", "IAEA / EPA Standards", "Radiation Physics", "Mathematical Modeling"],
      certificateUrl: "https://drive.google.com/file/d/1ZlCvfLJpsed3n7CneZhBpeuY3YJTuT4M/view?usp=sharing",
      certificateLabel: "IIT Madras Certificate ↗",
      index: 0
    },
    {
      organization: "Jabzs Gaming Studio",
      role: "Full Stack Intern",
      period: "Internship Period",
      location: "Gaming Studio / Remote",
      type: "FULL-STACK INTERNSHIP",
      schematicId: "JABZS-SOCKET-SRV-02",
      icon: <Gamepad2 className="w-5 h-5 text-sky-400" />,
      iconColor: "bg-sky-500/10 border-sky-500/30",
      accentColor: "border-sky-500/30 bg-sky-500/10 text-sky-300",
      bullets: [
        "Designed event-driven multiplayer backend for Dots & Boxes using Node.js/Socket.io.",
        "Supported 500+ concurrent users with low-latency room management."
      ],
      techTags: ["Node.js", "Socket.io", "Event-Driven Backend", "WebSockets", "Multiplayer Room Management", "High Concurrency"],
      index: 1
    }
  ];

  return (
    <section id="experience" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <div className="flex items-center gap-2 text-xs font-mono text-sky-400 mb-2">
          <GitBranch className="w-3.5 h-3.5" />
          <span>MODULE // 02.EXPERIENCE</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight flex items-center gap-3">
              Career Path
              <span className="text-xs font-normal text-sky-300 border border-sky-500/30 px-2.5 py-0.5 rounded-full bg-sky-500/10">
                TIMELINE
              </span>
            </h2>
            <p className="text-sm text-slate-400 font-mono mt-1">
              Engineering internships spanning high-performance numerical research at IIT Madras and high-concurrency multiplayer systems.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-400">
            [ VERIFIED INTERNSHIPS ]
          </div>
        </div>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Animated spine */}
        <div className="hidden md:block absolute left-8 top-6 bottom-6 w-0.5 bg-gradient-to-b from-indigo-500 via-sky-500 to-indigo-500/30 shadow-[0_0_12px_rgba(99,102,241,0.5)]" />

        <div className="space-y-12">
          {experiences.map((exp) => (
            <TimelineCard key={exp.organization} {...exp} />
          ))}
        </div>
      </div>
    </section>
  );
}
