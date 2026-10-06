"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Code2, BrainCircuit, CloudCog, Cpu, Sparkles, Pencil } from "lucide-react";

interface SkillCardProps {
  id: string;
  category: string;
  badge: string;
  icon: React.ReactNode;
  iconColor: string;
  skills: { name: string; tag?: string }[];
  className?: string;
  description: string;
}

function SkillCard({ id, category, badge, icon, iconColor, skills, className = "", description }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden p-6 sm:p-7 rounded-2xl border transition-all duration-300 bg-[#13141f]/80 backdrop-blur-sm sketch-border flex flex-col justify-between group ${
        isHovered
          ? "border-indigo-500 shadow-[0_15px_35px_rgba(99,102,241,0.2)] -translate-y-1.5"
          : "border-white/10 hover:border-white/20"
      } ${className}`}
    >
      <div className="sketch-tape opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Card Header */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl border border-white/15 flex items-center justify-center ${iconColor} transition-transform group-hover:scale-110`}>
              {icon}
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 block tracking-wider">{badge}</span>
              <h3 className="text-lg font-mono font-bold text-white group-hover:text-indigo-300 transition-colors">
                {category}
              </h3>
            </div>
          </div>
          <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
            {id}
          </span>
        </div>

        <p className="text-xs text-slate-400 font-mono mb-5 leading-relaxed">{description}</p>

        {/* Skill Pills */}
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="px-3 py-1.5 rounded-lg bg-[#0c0d12] border border-white/10 text-slate-200 font-mono text-xs hover:border-indigo-400 hover:text-white hover:bg-indigo-500/10 transition-all flex items-center gap-1.5 shadow-sm group/item"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/60 group-hover/item:bg-indigo-400 transition-colors" />
              <span>{skill.name}</span>
              {skill.tag && (
                <span className="text-[10px] text-sky-400/90 font-mono">[{skill.tag}]</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom status */}
      <div className="pt-4 mt-5 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span className="text-indigo-400/80">✎ VERIFIED_STACK</span>
        <span className="group-hover:text-slate-200 transition-colors">PROD_READY</span>
      </div>
    </div>
  );
}

export default function SkillsMatrix() {
  const languagesAndFrameworks = [
    { name: "Java", tag: "Core" },
    { name: "Python", tag: "AI/Opt" },
    { name: "JavaScript", tag: "ES6+" },
    { name: "Node.js", tag: "Backend" },
    { name: "React", tag: "UI" },
    { name: "Next.js", tag: "Full-Stack" }
  ];

  const aiAndMl = [
    { name: "TensorFlow", tag: "Deep Learning" },
    { name: "scikit-learn", tag: "ML Models" },
    { name: "OpenCV", tag: "Vision" },
    { name: "LLMs", tag: "GenAI" },
    { name: "CNN / RNN", tag: "Neural Nets" }
  ];

  const cloudAndDevops = [
    { name: "Azure", tag: "Cloud" },
    { name: "Docker", tag: "Containers" },
    { name: "Git", tag: "VCS" },
    { name: "Firebase", tag: "BaaS" },
    { name: "Supabase", tag: "Database" },
    { name: "Vercel", tag: "Deploy" }
  ];

  const architecture = [
    { name: "Newton-Raphson Optimization" },
    { name: "Event-Driven Sockets" },
    { name: "RESTful API Design" },
    { name: "Data Preprocessing & EDA" }
  ];

  return (
    <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-2">
          <Pencil className="w-3.5 h-3.5" />
          <span>MODULE // 01.TOOLKIT</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight flex items-center gap-3">
              Technical Blueprint
              <span className="text-xs font-normal text-indigo-300 border border-indigo-500/30 px-2.5 py-0.5 rounded-full bg-indigo-500/10">
                BENTO_GRID
              </span>
            </h2>
            <p className="text-sm text-slate-400 font-mono mt-1">
              Core programming languages, machine learning architectures, and cloud DevOps infrastructure.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-400">
            [ SKETCHED COMPETENCIES ]
          </div>
        </div>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Languages & Frameworks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <SkillCard
            id="MOD_01"
            category="Languages & Frameworks"
            badge="DEVELOPMENT CORE"
            icon={<Code2 className="w-5 h-5 text-indigo-400" />}
            iconColor="bg-indigo-500/10 text-indigo-400 border-indigo-500/30"
            skills={languagesAndFrameworks}
            description="Type-safe, modern programming languages and frontend/backend web frameworks designed for robust execution."
          />
        </motion.div>

        {/* AI & ML */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <SkillCard
            id="MOD_02"
            category="AI & Machine Learning"
            badge="INTELLIGENCE LAYER"
            icon={<BrainCircuit className="w-5 h-5 text-sky-400" />}
            iconColor="bg-sky-500/10 text-sky-400 border-sky-500/30"
            skills={aiAndMl}
            description="Mathematical modeling, deep neural networks, computer vision, and transformer-based GenAI pipelines."
          />
        </motion.div>

        {/* Cloud & DevOps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-1"
        >
          <SkillCard
            id="MOD_03"
            category="Cloud & DevOps"
            badge="DEPLOYMENT & INFRA"
            icon={<CloudCog className="w-5 h-5 text-amber-400" />}
            iconColor="bg-amber-500/10 text-amber-400 border-amber-500/30"
            skills={cloudAndDevops}
            description="Containerized deployments, serverless functions, real-time databases, and cloud infrastructure."
          />
        </motion.div>

        {/* Full-width Engineering Methodologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:col-span-2 lg:col-span-3"
        >
          <div className="p-6 sm:p-7 rounded-2xl border border-white/10 bg-[#13141f]/80 sketch-border hover:border-indigo-500/50 transition-all flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-mono text-indigo-400 font-semibold">SPECIALIZED METHODOLOGIES</span>
              </div>
              <h4 className="text-base font-mono font-bold text-white">
                Numerical Optimization &amp; High-Throughput Event Systems
              </h4>
              <p className="text-xs font-mono text-slate-400">
                Applied engineering in radiation dose pathway analysis, Newton-Raphson solvers, and sub-10ms multiplayer game engines.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 self-start md:self-auto">
              {architecture.map((item) => (
                <span
                  key={item.name}
                  className="px-3.5 py-1.5 rounded-lg bg-[#0c0d12] border border-white/15 text-slate-200 font-mono text-xs hover:border-indigo-400 hover:text-white transition-colors"
                >
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
