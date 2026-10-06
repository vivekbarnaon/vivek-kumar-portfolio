"use client";

import React, { useEffect, useRef } from "react";

interface Doodle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: "cube" | "lightbulb" | "brackets" | "sparkle" | "arrow" | "node" | "circle";
  size: number;
  angle: number;
  rotSpeed: number;
  opacity: number;
  color: string;
}

export default function CreativeSketchBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let isRunning = true;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    const handleVisibilityChange = () => {
      isRunning = !document.hidden;
      if (isRunning) {
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const colors = [
      "rgba(99, 102, 241, 0.4)",
      "rgba(56, 189, 248, 0.4)",
      "rgba(251, 191, 36, 0.35)",
      "rgba(255, 255, 255, 0.2)",
    ];

    const types: Doodle["type"][] = ["cube", "brackets", "sparkle", "arrow", "lightbulb", "circle", "node"];

    // 14 lightweight doodle particles
    const doodles: Doodle[] = Array.from({ length: 14 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      type: types[Math.floor(Math.random() * types.length)],
      size: Math.random() * 12 + 12,
      angle: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.004,
      opacity: Math.random() * 0.3 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const drawDoodle = (d: Doodle) => {
      ctx.save();
      ctx.translate(d.x, d.y);
      ctx.rotate(d.angle);
      ctx.strokeStyle = d.color;
      ctx.fillStyle = d.color;
      ctx.lineWidth = 1;
      ctx.lineCap = "round";

      const s = d.size;

      switch (d.type) {
        case "cube": {
          ctx.beginPath();
          ctx.rect(-s / 2, -s / 2, s * 0.7, s * 0.7);
          ctx.rect(-s / 2 + s * 0.25, -s / 2 - s * 0.25, s * 0.7, s * 0.7);
          ctx.moveTo(-s / 2, -s / 2);
          ctx.lineTo(-s / 2 + s * 0.25, -s / 2 - s * 0.25);
          ctx.moveTo(s * 0.2, -s / 2);
          ctx.lineTo(s * 0.45, -s / 2 - s * 0.25);
          ctx.stroke();
          break;
        }
        case "brackets": {
          ctx.font = `${Math.floor(s * 0.85)}px monospace`;
          ctx.fillText("{ ; }", -s * 0.4, s * 0.25);
          break;
        }
        case "sparkle": {
          ctx.beginPath();
          ctx.moveTo(0, -s);
          ctx.quadraticCurveTo(0, 0, s, 0);
          ctx.quadraticCurveTo(0, 0, 0, s);
          ctx.quadraticCurveTo(0, 0, -s, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s);
          ctx.stroke();
          break;
        }
        case "arrow": {
          ctx.beginPath();
          ctx.arc(0, 0, s * 0.4, Math.PI * 0.2, Math.PI * 1.5);
          ctx.lineTo(s * 0.15, -s * 0.6);
          ctx.stroke();
          break;
        }
        case "lightbulb": {
          ctx.beginPath();
          ctx.arc(0, -s * 0.15, s * 0.35, 0, Math.PI * 2);
          ctx.moveTo(-s * 0.15, s * 0.2);
          ctx.lineTo(s * 0.15, s * 0.2);
          ctx.stroke();
          break;
        }
        case "circle": {
          ctx.beginPath();
          ctx.arc(0, 0, s * 0.4, 0, Math.PI * 1.9);
          ctx.stroke();
          break;
        }
        case "node": {
          ctx.beginPath();
          ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
          ctx.fill();
          break;
        }
      }

      ctx.restore();
    };

    const maxDistSq = 140 * 140;

    const render = () => {
      if (!isRunning) return;

      ctx.clearRect(0, 0, width, height);

      // Fast connection lines using squared distance (zero Math.sqrt overhead)
      ctx.lineWidth = 0.6;
      for (let i = 0; i < doodles.length; i++) {
        const d1 = doodles[i];
        for (let j = i + 1; j < doodles.length; j++) {
          const d2 = doodles[j];
          const dx = d1.x - d2.x;
          const dy = d1.y - d2.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistSq) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - distSq / maxDistSq)})`;
            ctx.beginPath();
            ctx.moveTo(d1.x, d1.y);
            ctx.lineTo(d2.x, d2.y);
            ctx.stroke();
          }
        }
      }

      // Update & draw doodles
      for (let i = 0; i < doodles.length; i++) {
        const d = doodles[i];
        d.x += d.vx;
        d.y += d.vy;
        d.angle += d.rotSpeed;

        if (d.x < -30) d.x = width + 30;
        else if (d.x > width + 30) d.x = -30;
        if (d.y < -30) d.y = height + 30;
        else if (d.y > height + 30) d.y = -30;

        drawDoodle(d);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden will-change-transform">
      {/* High-performance CSS background grid */}
      <div className="absolute inset-0 sketch-grid opacity-60" />
      <div className="absolute inset-0 sketch-dots opacity-40" />

      {/* Optimized static atmospheric glows */}
      <div className="absolute top-10 right-10 w-[450px] h-[450px] bg-indigo-600/8 rounded-full blur-[100px] transform-gpu pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-sky-500/8 rounded-full blur-[120px] transform-gpu pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-amber-500/6 rounded-full blur-[100px] transform-gpu pointer-events-none" />

      {/* Lightweight canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full transform-gpu" />
    </div>
  );
}
