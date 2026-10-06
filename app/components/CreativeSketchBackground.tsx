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
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const colors = [
      "rgba(99, 102, 241, 0.45)",  // indigo sketch
      "rgba(56, 189, 248, 0.45)",  // cyan sketch
      "rgba(251, 191, 36, 0.4)",   // amber pencil
      "rgba(244, 63, 94, 0.35)",   // rose ink
      "rgba(255, 255, 255, 0.25)", // white chalk
    ];

    const types: Doodle["type"][] = ["cube", "lightbulb", "brackets", "sparkle", "arrow", "node", "circle"];

    const doodles: Doodle[] = Array.from({ length: 26 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      type: types[Math.floor(Math.random() * types.length)],
      size: Math.random() * 14 + 14,
      angle: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.006,
      opacity: Math.random() * 0.4 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    // Mouse tracker for interactive sketch drawing
    let mouse = { x: -1000, y: -1000, active: false };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Sketch drawing functions
    const drawDoodle = (d: Doodle) => {
      ctx.save();
      ctx.translate(d.x, d.y);
      ctx.rotate(d.angle);
      ctx.strokeStyle = d.color;
      ctx.fillStyle = d.color;
      ctx.lineWidth = 1.2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      const s = d.size;

      switch (d.type) {
        case "cube": {
          // Hand-drawn 3D wireframe cube
          ctx.beginPath();
          ctx.rect(-s / 2, -s / 2, s * 0.7, s * 0.7);
          ctx.rect(-s / 2 + s * 0.3, -s / 2 - s * 0.3, s * 0.7, s * 0.7);
          ctx.moveTo(-s / 2, -s / 2);
          ctx.lineTo(-s / 2 + s * 0.3, -s / 2 - s * 0.3);
          ctx.moveTo(s * 0.2, -s / 2);
          ctx.lineTo(s * 0.5, -s / 2 - s * 0.3);
          ctx.moveTo(-s / 2, s * 0.2);
          ctx.lineTo(-s / 2 + s * 0.3, -s * 0.1);
          ctx.moveTo(s * 0.2, s * 0.2);
          ctx.lineTo(s * 0.5, -s * 0.1);
          ctx.stroke();
          break;
        }
        case "brackets": {
          // Code bracket sketch: </ >
          ctx.font = `${s * 0.9}px monospace`;
          ctx.fillText("{ ; }", -s * 0.5, s * 0.3);
          break;
        }
        case "sparkle": {
          // 4-point hand-drawn sparkle
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
          // Curly sketch arrow
          ctx.beginPath();
          ctx.arc(0, 0, s * 0.5, Math.PI * 0.2, Math.PI * 1.6);
          ctx.lineTo(s * 0.2, -s * 0.7);
          ctx.moveTo(-s * 0.1, -s * 0.4);
          ctx.lineTo(-s * 0.3, -s * 0.6);
          ctx.stroke();
          break;
        }
        case "lightbulb": {
          // Idea sketch bulb
          ctx.beginPath();
          ctx.arc(0, -s * 0.2, s * 0.4, 0, Math.PI * 2);
          ctx.moveTo(-s * 0.2, s * 0.2);
          ctx.lineTo(s * 0.2, s * 0.2);
          ctx.moveTo(-s * 0.15, s * 0.35);
          ctx.lineTo(s * 0.15, s * 0.35);
          ctx.stroke();
          break;
        }
        case "circle": {
          // Hand-sketched concentric circles with hatch
          ctx.beginPath();
          ctx.arc(0, 0, s * 0.5, 0, Math.PI * 1.9);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(0, 0, s * 0.25, 0, Math.PI * 2);
          ctx.stroke();
          break;
        }
        case "node": {
          // Neural synaptic sketch node
          ctx.beginPath();
          ctx.arc(0, 0, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(s * 0.6, -s * 0.4);
          ctx.lineTo(-s * 0.5, -s * 0.5);
          ctx.stroke();
          break;
        }
      }

      ctx.restore();
    };

    let tick = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick += 0.01;

      // Draw faint graphite pencil web connections between nearby doodles
      ctx.lineWidth = 0.6;
      for (let i = 0; i < doodles.length; i++) {
        for (let j = i + 1; j < doodles.length; j++) {
          const dx = doodles[i].x - doodles[j].x;
          const dy = doodles[i].y - doodles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - dist / 150) * 0.06})`;
            ctx.beginPath();
            ctx.moveTo(doodles[i].x, doodles[i].y);
            ctx.lineTo(doodles[j].x, doodles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw interactive pencil connection to mouse if active
      if (mouse.active) {
        doodles.forEach((d) => {
          const dx = mouse.x - d.x;
          const dy = mouse.y - d.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            ctx.strokeStyle = `rgba(99, 102, 241, ${(1 - dist / 180) * 0.35})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(d.x, d.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        });
      }

      // Update and draw doodles
      doodles.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        d.angle += d.rotSpeed;

        if (d.x < -50) d.x = width + 50;
        if (d.x > width + 50) d.x = -50;
        if (d.y < -50) d.y = height + 50;
        if (d.y > height + 50) d.y = -50;

        drawDoodle(d);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Creative Sketch Paper Grid & Dot Pattern */}
      <div className="absolute inset-0 sketch-grid opacity-75" />
      <div className="absolute inset-0 sketch-dots opacity-50" />

      {/* Atmospheric Creative Glow Orbs */}
      <div className="absolute top-10 right-10 w-[550px] h-[550px] bg-indigo-600/10 rounded-full blur-[140px]" />
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[160px]" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-amber-500/8 rounded-full blur-[150px]" />

      {/* Floating Animated Hand-Drawn Sketch Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
