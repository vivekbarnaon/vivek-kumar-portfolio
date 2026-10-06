"use client";

import React from "react";

interface VKLogoProps {
  className?: string;
  size?: number;
}

export default function VKLogo({ className = "", size = 36 }: VKLogoProps) {
  return (
    <div
      className={`relative flex items-center justify-center group-hover:scale-105 transition-all duration-300 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer ambient glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500/30 via-sky-500/20 to-amber-500/10 blur-sm group-hover:blur-md transition-all opacity-80 group-hover:opacity-100" />

      {/* SVG Custom Logo: Interlocking V + K with Sketch & Code Aesthetics */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 drop-shadow-[0_2px_10px_rgba(99,102,241,0.5)]"
      >
        <defs>
          <linearGradient id="vkGrad" x1="2" y1="2" x2="42" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#818cf8" />
            <stop offset="0.5" stopColor="#6366f1" />
            <stop offset="1" stopColor="#38bdf8" />
          </linearGradient>
          <linearGradient id="vkAccent" x1="10" y1="10" x2="34" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38bdf8" />
            <stop offset="1" stopColor="#2dd4bf" />
          </linearGradient>
          <radialGradient id="vkCoreGlow" cx="22" cy="22" r="18" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6366f1" stopOpacity="0.25" />
            <stop offset="1" stopColor="#0c0d12" stopOpacity="0.8" />
          </radialGradient>
        </defs>

        {/* Outer Sketch Rounded Hexagon / Shield */}
        <rect
          x="3"
          y="3"
          width="38"
          height="38"
          rx="10"
          fill="url(#vkCoreGlow)"
          stroke="url(#vkGrad)"
          strokeWidth="1.75"
        />

        {/* Hand-drawn corner bracket ticks */}
        <path
          d="M7 13V8H12"
          stroke="#818cf8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />
        <path
          d="M37 31V36H32"
          stroke="#38bdf8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />

        {/* "V" Letter Trace */}
        <path
          d="M11 14L19 30L23 22"
          stroke="url(#vkGrad)"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* "K" Letter Trace (Connecting and Interlocking) */}
        <path
          d="M23 14V30"
          stroke="#ffffff"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M33 14L23 22L33 30"
          stroke="url(#vkAccent)"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Sparkle Node */}
        <circle cx="23" cy="22" r="2.2" fill="#38bdf8" className="animate-pulse" />
      </svg>
    </div>
  );
}
