"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, GraduationCap, Cpu, CheckCircle2, ChevronRight, Sparkles, Pencil, ExternalLink, FileText, Medal } from "lucide-react";

// Creative sketch circuit trace bullet icon
function CircuitTraceIcon({ className = "w-4 h-4 text-indigo-400" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="5" cy="5" r="2.5" fill="#6366f1" fillOpacity="0.25" />
      <path d="M5 7.5v6a2 2 0 0 0 2 2h8a2 2 0 0 1 2 2v1.5" />
      <circle cx="17" cy="19" r="2.5" fill="#38bdf8" fillOpacity="0.25" />
      <path d="M10 5h7a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

export default function AchievementsEducation() {
  const achievements = [
    {
      title: "MumbaiHack 2025 – Round 2 Qualifier",
      category: "HACKATHON COMPETITION",
      tag: "QUALIFIER",
      desc: "Advanced to Round 2 of MumbaiHack 2025 with an innovative software & AI engineering prototype.",
      link: "https://drive.google.com/file/d/1tsNYZoAL1JmKhNvmw4Ca_oAil19fYea8/view",
      linkLabel: "MumbaiHack Cert ↗"
    },
    {
      title: "GenAI Exchange Program",
      category: "GEN_AI CERTIFICATION",
      tag: "HONOR & CERT",
      desc: "Selected participant and validated in generative AI architectural models and transformer pipelines.",
      link: "https://certificate.hack2skill.com/legacy/2025H2S08GH-P601998",
      linkLabel: "GenAI Cert ↗"
    },
    {
      title: "IIT Madras – Research Internship",
      category: "RESEARCH MERIT",
      tag: "VERIFIED CERT",
      desc: "Completed research in Python numerical optimization (Newton-Raphson) and IAEA/EPA radionuclide dose modeling.",
      link: "https://drive.google.com/file/d/1ZlCvfLJpsed3n7CneZhBpeuY3YJTuT4M/view?usp=sharing",
      linkLabel: "IITM Cert ↗"
    },
    {
      title: "Google Cloud – Machine Learning Crash Course",
      category: "CLOUD ML CERTIFICATION",
      tag: "CREDENTIAL",
      desc: "Validated proficiency in Google Cloud ML paradigms, model tuning, and cloud data pipelining."
    },
    {
      title: "LeetCode Global Ranking 366,518",
      category: "ALGORITHMIC MASTERY",
      tag: "GLOBAL RANK",
      desc: "Demonstrated strong analytical problem solving across Data Structures & Algorithms."
    }
  ];

  const educations = [
    {
      degree: "B.Tech Computer Science & Engineering (AI & ML)",
      institution: "Heritage Institute of Technology, Kolkata",
      duration: "2023 – 2027",
      status: "UNDERGRADUATE CANDIDATE",
      focus: "Artificial Intelligence, Deep Learning, Numerical Computation, Discrete Structures, Database Systems."
    },
    {
      degree: "Senior Secondary (Science)",
      institution: "Bihar School Examination Board",
      duration: "2021",
      status: "COMPLETED",
      focus: "Physics, Chemistry, Mathematics (PCM) Core Foundations."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="credentials" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-2">
          <Award className="w-3.5 h-3.5" />
          <span>MODULE // 04.VERIFICATION</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight flex items-center gap-3">
              Validations &amp; Academic Foundation
              <span className="text-xs font-normal text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full bg-amber-500/10">
                VERIFIED_CREDENTIALS
              </span>
            </h2>
            <p className="text-sm text-slate-400 font-mono mt-1">
              Hackathon awards, GenAI certifications, IIT Madras research credentials, and academic trajectory.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-400">
            [ CERTIFICATE REGISTRY ]
          </div>
        </div>
      </motion.div>

      {/* Two-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Achievements */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#13141f]/85 backdrop-blur-md sketch-border flex flex-col justify-between"
        >
          <div className="sketch-tape opacity-0 hover:opacity-100 transition-opacity" />

          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl border border-indigo-500/30 bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block tracking-wider">
                    RECOGNITION LOG
                  </span>
                  <h3 className="text-xl font-mono font-bold text-white">
                    Validations &amp; Milestones
                  </h3>
                </div>
              </div>
              <span className="text-[10px] font-mono text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/30">
                5 VERIFIED
              </span>
            </div>

            {/* List with Circuit Board Trace Icons */}
            <div className="space-y-3.5">
              {achievements.map((ach, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-4 rounded-xl bg-[#0c0d12] border border-white/10 hover:border-indigo-500/50 hover:shadow-[0_4px_20px_rgba(99,102,241,0.15)] transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0 p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 group-hover:border-indigo-400 transition-colors">
                      <CircuitTraceIcon className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div className="space-y-1 w-full">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-mono font-bold text-white group-hover:text-indigo-300 transition-colors">
                            {ach.title}
                          </h4>
                          <span className="text-[9px] font-mono text-sky-400 border border-sky-500/30 px-1.5 py-0.2 rounded bg-sky-500/10">
                            {ach.tag}
                          </span>
                        </div>

                        {ach.link && (
                          <a
                            href={ach.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-amber-300 hover:text-white border border-amber-500/40 bg-amber-500/10 hover:bg-amber-600 px-2.5 py-1 rounded-lg transition-all shadow-sm group/btn"
                          >
                            <span>{ach.linkLabel}</span>
                            <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                          </a>
                        )}
                      </div>
                      <p className="text-xs font-mono text-slate-400 leading-relaxed">{ach.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>✎ VERIFIED_REGISTRY</span>
            <span className="text-emerald-400 font-semibold">100% AUTHENTICATED</span>
          </div>
        </motion.div>

        {/* Right Column: Academic Foundation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#13141f]/85 backdrop-blur-md sketch-border flex flex-col justify-between"
        >
          <div className="sketch-tape opacity-0 hover:opacity-100 transition-opacity" />

          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl border border-sky-500/30 bg-sky-500/10 flex items-center justify-center text-sky-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block tracking-wider">
                    ACADEMIC BLUEPRINT
                  </span>
                  <h3 className="text-xl font-mono font-bold text-white">
                    Academic Foundation
                  </h3>
                </div>
              </div>
              <span className="text-[10px] font-mono text-sky-300 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/30">
                CS &amp; AI/ML
              </span>
            </div>

            {/* Education Timeline */}
            <div className="space-y-6">
              {educations.map((edu, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="relative pl-6 pb-2 border-l-2 border-indigo-500/40 hover:border-indigo-400 transition-colors group"
                >
                  <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-[#0c0d12] border-2 border-indigo-500 group-hover:scale-125 transition-transform" />

                  <div className="p-4 rounded-xl bg-[#0c0d12] border border-white/10 group-hover:border-indigo-500/50 transition-all space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-sm font-mono font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {edu.degree}
                      </h4>
                      <span className="text-[11px] font-mono text-indigo-400 font-semibold">
                        {edu.duration}
                      </span>
                    </div>

                    <p className="text-xs font-mono text-sky-400">{edu.institution}</p>
                    <p className="text-xs font-mono text-slate-400 leading-relaxed">{edu.focus}</p>

                    <div className="pt-1 text-[10px] font-mono text-slate-400">
                      <span className="text-indigo-400/80">✎ STATUS: </span>
                      {edu.status}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>✎ HITK-KOLKATA</span>
            <span className="text-sky-400">ACCREDITED</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
