"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  FileText,
  Copy,
  Check,
  Send,
  ArrowUp,
  Sparkles,
  Clock,
  MapPin,
  MessageSquareCode,
  Pencil,
  ExternalLink,
  Zap,
  Loader2,
  AlertCircle
} from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
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

export default function Footer() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("opportunity");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [localTime, setLocalTime] = useState("");

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const emailAddress = "vivekbarnaon@gmail.com";
  const linkedInUrl = "https://www.linkedin.com/in/vivek-kumar-b04874289";
  const githubUrl = "https://github.com/vivekbarnaon";
  const youtubeUrl = "https://www.youtube.com/@TechVivek018";
  const resumeUrl = "https://drive.google.com/file/d/1vg-zCl3DgT_WKuL7vxvAdaxhYfMWE9UJ/view?usp=sharing";

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true
        }) + " IST"
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!senderEmail || !message) {
      setStatus("error");
      setStatusMessage("Please provide your email and message.");
      return;
    }

    setStatus("sending");
    setStatusMessage("Dispatching via Resend...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: senderName,
          email: senderEmail,
          topic: selectedTopic,
          message: message
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setStatusMessage("Message dispatched successfully! Vivek will get back to you shortly.");
        setMessage("");
        setSenderName("");
        setSenderEmail("");
      } else {
        // If Resend key is not configured yet or errored, offer easy native mail client fallback
        setStatus("error");
        setStatusMessage(
          data.error || "Could not dispatch via Resend API. Click below to open your mail app directly."
        );
      }
    } catch (err: any) {
      setStatus("error");
      setStatusMessage("Network error. Click below to send via your mail client.");
    }
  };

  const handleNativeMailFallback = () => {
    const subject = encodeURIComponent(
      `[Portfolio Inquiry] ${selectedTopic.toUpperCase()}: From ${senderName || "Visitor"}`
    );
    const body = encodeURIComponent(
      `Hi Vivek,\n\n${message || "I saw your portfolio and would love to connect."}\n\nBest regards,\n${senderName || "A Collaborator"}\n${senderEmail || ""}`
    );
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickTopics = [
    { id: "opportunity", label: "💼 Role / Internship", placeholder: "We have an open software/AI engineering role..." },
    { id: "genai", label: "⚡ GenAI / ML Project", placeholder: "Let's collaborate on an intelligent AI system..." },
    { id: "research", label: "🔬 Research & Opt", placeholder: "Interested in discussing numerical optimization / IIT Madras research..." }
  ];

  return (
    <footer id="contact" className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#090a10]/95 font-mono overflow-hidden">
      {/* Decorative ambient sketch glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs">
            <Pencil className="w-3.5 h-3.5 text-indigo-400" />
            <span>COMMUNICATION DESK // POWERED BY RESEND</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Let&apos;s Build Something <span className="marker-highlight text-indigo-300">Intelligent</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Have an open software engineering position, machine learning initiative, or research opportunity? Send a direct message below.
          </p>
        </motion.div>

        {/* 2-Column Creative Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Resend Dispatch Console */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#13141f]/90 backdrop-blur-md sketch-border relative"
          >
            <div className="sketch-tape" />

            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <MessageSquareCode className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Direct Message Dispatcher</h3>
                  <span className="text-[11px] text-slate-400">Powered by Resend Email API</span>
                </div>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                RESEND_READY
              </span>
            </div>

            {/* Quick Topic Selector */}
            <div className="space-y-4">
              <label className="text-xs text-slate-300 font-semibold block">
                Select Inquiry Objective:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {quickTopics.map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-mono transition-all text-left flex items-center justify-between cursor-pointer ${
                      selectedTopic === topic.id
                        ? "border-indigo-400 bg-indigo-500/20 text-white shadow-[0_0_15px_rgba(99,102,241,0.25)]"
                        : "border-white/10 bg-[#0c0d12] text-slate-400 hover:border-white/20 hover:text-slate-200"
                    }`}
                  >
                    <span>{topic.label}</span>
                    {selectedTopic === topic.id && <Zap className="w-3 h-3 text-indigo-400" />}
                  </button>
                ))}
              </div>

              {/* Form Inputs */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-300 font-semibold block mb-1.5">
                      Your Name:
                    </label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Hiring Lead / Recruiter"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d12] border border-white/10 text-slate-100 text-xs font-mono focus:outline-none focus:border-indigo-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 font-semibold block mb-1.5">
                      Your Email (for reply) <span className="text-rose-400">*</span>:
                    </label>
                    <input
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="e.g. recruiter@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d12] border border-white/10 text-slate-100 text-xs font-mono focus:outline-none focus:border-indigo-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1.5">
                    Message / Project Details <span className="text-rose-400">*</span>:
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      quickTopics.find((t) => t.id === selectedTopic)?.placeholder ||
                      "Write your message here..."
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0c0d12] border border-white/10 text-slate-100 text-xs font-mono focus:outline-none focus:border-indigo-400 transition-colors resize-none"
                  />
                </div>

                {/* Status Feedback Banner */}
                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2"
                    >
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{statusMessage}</span>
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>{statusMessage}</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleNativeMailFallback}
                        className="px-3 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500 hover:text-white border border-rose-500/40 text-rose-200 transition-colors text-[11px] font-bold self-start sm:self-auto cursor-pointer"
                      >
                        Open Mail App ↗
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <span className="text-[11px] text-slate-400 text-center sm:text-left">
                    ✎ Dispatches directly to {emailAddress}
                  </span>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.4)] group cursor-pointer"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Dispatching...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message ⚡</span>
                        <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Right Column: Connection & Social Hub */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Primary Email Card */}
            <div className="p-5 rounded-2xl border border-white/10 bg-[#13141f]/90 backdrop-blur-md sketch-border relative group hover:border-indigo-500/60 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">PRIMARY INBOX</span>
                    <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {emailAddress}
                    </h4>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg bg-[#0c0d12] border border-white/15 text-slate-300 hover:text-white hover:border-indigo-400 transition-all text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 text-[11px]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="text-[11px]">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Grid: LinkedIn & GitHub */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* LinkedIn */}
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl border border-white/10 bg-[#13141f]/90 backdrop-blur-md sketch-border hover:border-sky-500/60 transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-300 transition-colors" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">PROFESSIONAL NETWORK</span>
                  <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                    LinkedIn Profile ↗
                  </h4>
                </div>
              </a>

              {/* GitHub */}
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl border border-white/10 bg-[#13141f]/90 backdrop-blur-md sketch-border hover:border-indigo-500/60 transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-300 transition-colors" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">CODE REPOSITORIES</span>
                  <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                    @vivekbarnaon ↗
                  </h4>
                </div>
              </a>
            </div>

            {/* YouTube & Resume Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* YouTube Channel */}
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl border border-white/10 bg-[#13141f]/90 backdrop-blur-md sketch-border hover:border-rose-500/60 transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                    <YoutubeIcon className="w-4 h-4" />
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-300 transition-colors" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">YOUTUBE CHANNEL</span>
                  <h4 className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors">
                    @TechVivek018 ↗
                  </h4>
                </div>
              </a>

              {/* Official Resume / CV */}
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 backdrop-blur-md sketch-border hover:border-amber-400 transition-all group flex flex-col justify-between shadow-[0_0_15px_rgba(251,191,36,0.1)]"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-300">
                    <FileText className="w-4 h-4" />
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-300 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <span className="text-[10px] text-amber-300/80 block">OFFICIAL RESUME</span>
                  <h4 className="text-sm font-bold text-amber-200 group-hover:text-white transition-colors">
                    View / Download CV ↗
                  </h4>
                </div>
              </a>
            </div>

            {/* Live Location & Local Timecard */}
            <div className="p-4 rounded-2xl border border-white/10 bg-[#13141f]/90 backdrop-blur-md sketch-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block">BASE LOCATION</span>
                  <h4 className="text-xs font-bold text-white">India // Remote &amp; On-Site</h4>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[9px] text-slate-400 flex items-center justify-end gap-1">
                  <Clock className="w-3 h-3 text-indigo-400" /> LOCAL TIME
                </span>
                <span className="text-xs font-bold text-sky-400 font-mono">
                  {localTime || "05:30 PM IST"}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Technical Signature & Return to Top */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span>✎ CRAFTED BY VIVEK KUMAR // SOFTWARE &amp; GEN_AI // 2026</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-indigo-500/30 hover:border-indigo-400 text-indigo-300 hover:bg-indigo-500/10 transition-all text-xs font-bold cursor-pointer"
          >
            <span>[ RETURN_TO_TOP ]</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
