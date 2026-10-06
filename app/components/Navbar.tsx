"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  GitBranch,
  Layers,
  Award,
  Mail,
  Pencil,
  Sparkles,
  Menu,
  X,
  ArrowUpRight
} from "lucide-react";
import VKLogo from "./VKLogo";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "skills", label: "Skills", num: "01", icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: "experience", label: "Timeline", num: "02", icon: <GitBranch className="w-3.5 h-3.5" /> },
    { id: "projects", label: "Projects", num: "03", icon: <Layers className="w-3.5 h-3.5" /> },
    { id: "credentials", label: "Validation", num: "04", icon: <Award className="w-3.5 h-3.5" /> },
    { id: "contact", label: "Contact", num: "05", icon: <Mail className="w-3.5 h-3.5" /> }
  ];

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        setScrolled(scrollY > 25);

        const sections = ["skills", "experience", "projects", "credentials", "contact"];
        const scrollPosition = scrollY + 200;

        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(sectionId);
              return;
            }
          }
        }
        if (scrollY < 300) {
          setActiveSection("hero");
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3 sm:pt-4 pointer-events-none">
      {/* Floating Capsule Dock */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`w-full max-w-5xl rounded-2xl pointer-events-auto transition-all duration-300 border ${
          scrolled
            ? "bg-[#10121d]/90 backdrop-blur-xl border-indigo-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(99,102,241,0.15)] py-2.5 px-4 sm:px-6"
            : "bg-[#13141f]/70 backdrop-blur-md border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)] py-3 px-4 sm:px-6"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Tag with Custom Logo */}
          <a
            href="#"
            className="flex items-center gap-3 group font-mono text-sm tracking-wider"
          >
            {/* Custom VK Logo */}
            <VKLogo size={36} />

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white group-hover:text-indigo-300 transition-colors">
                  VIVEK.KUMAR
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Available for roles" />
              </div>
              <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                SOFTWARE &amp; GEN_AI
              </span>
            </div>
          </a>

          {/* Desktop Navigation Dock */}
          <nav className="hidden md:flex items-center p-1 rounded-xl bg-[#0c0d12]/80 border border-white/10 font-mono text-xs">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative px-3 py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  {/* Active highlight pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 rounded-lg bg-indigo-600/30 border border-indigo-500/60 shadow-[0_0_12px_rgba(99,102,241,0.3)] -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={isActive ? "text-indigo-400" : "text-slate-500"}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-sky-500 transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.35)] hover:shadow-[0_0_22px_rgba(99,102,241,0.55)] group"
            >
              <span>Let&apos;s Connect</span>
              <Sparkles className="w-3.5 h-3.5 text-sky-200 group-hover:rotate-12 transition-transform" />
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-white/10 bg-[#0c0d12] text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-3 pt-3 border-t border-white/10 font-mono text-xs space-y-1 overflow-hidden"
            >
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-indigo-400">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">{item.num}</span>
                </a>
              ))}
              <div className="pt-2">
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold shadow-md"
                >
                  <span>Let&apos;s Connect</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
