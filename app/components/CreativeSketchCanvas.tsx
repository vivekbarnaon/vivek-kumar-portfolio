"use client";

import React, { useEffect, useRef, useState } from "react";

export default function CreativeSketchCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let angleX = 0.45;
    let angleY = 0;
    let targetAngleY = 0;
    let targetAngleX = 0.45;

    const size = 520;
    const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;

    // 3D Neural Nodes in Sketch Style
    const layers = [
      { z: -140, count: 4, label: "INPUT" },
      { z: -50, count: 5, label: "HIDDEN_1" },
      { z: 40, count: 5, label: "HIDDEN_2" },
      { z: 130, count: 3, label: "OUTPUT" }
    ];

    type Node3D = { x: number; y: number; z: number; layer: number; index: number; pulse: number };
    const nodes: Node3D[] = [];

    layers.forEach((layer, layerIdx) => {
      const spreadY = 170;
      const stepY = spreadY / (layer.count - 1 || 1);
      for (let i = 0; i < layer.count; i++) {
        const y = -spreadY / 2 + i * stepY;
        const x = Math.sin(i * 1.5 + layerIdx) * 24;
        nodes.push({
          x,
          y,
          z: layer.z,
          layer: layerIdx,
          index: i,
          pulse: Math.random() * Math.PI * 2
        });
      }
    });

    // 3D Isometric Sketch Core Geometry
    const chipSize = 150;
    const chipY = 65;
    const chipCorners = [
      { x: -chipSize, y: chipY, z: -chipSize },
      { x: chipSize, y: chipY, z: -chipSize },
      { x: chipSize, y: chipY, z: chipSize },
      { x: -chipSize, y: chipY, z: chipSize },
    ];

    const siliconCoreSize = 75;
    const siliconCorners = [
      { x: -siliconCoreSize, y: chipY - 4, z: -siliconCoreSize },
      { x: siliconCoreSize, y: chipY - 4, z: -siliconCoreSize },
      { x: siliconCoreSize, y: chipY - 4, z: siliconCoreSize },
      { x: -siliconCoreSize, y: chipY - 4, z: siliconCoreSize },
    ];

    const project = (x: number, y: number, z: number, ax: number, ay: number) => {
      const cosY = Math.cos(ay);
      const sinY = Math.sin(ay);
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;

      const cosX = Math.cos(ax);
      const sinX = Math.sin(ax);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;

      const fov = 460;
      const scale = fov / (fov + z2 + 300);
      return {
        x: size / 2 + x1 * scale,
        y: size / 2 + y2 * scale,
        scale,
        depth: z2
      };
    };

    let tick = 0;

    const render = () => {
      tick += 0.015;
      angleY += 0.007;

      angleY += (targetAngleY - angleY) * 0.05;
      angleX += (targetAngleX - angleX) * 0.05;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, size, size);

      // Hand-Drawn Sketch Framing Rings
      ctx.strokeStyle = "rgba(99, 102, 241, 0.25)";
      ctx.lineWidth = 1.2;
      ctx.setLineDash([6, 5]);
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, 230, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(56, 189, 248, 0.2)";
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, 245, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Hand-drawn sketch axis
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(size / 2 - 240, size / 2);
      ctx.lineTo(size / 2 + 240, size / 2);
      ctx.moveTo(size / 2, size / 2 - 240);
      ctx.lineTo(size / 2, size / 2 + 240);
      ctx.stroke();

      // Draw Rotating Isometric Sketch Base
      const projChip = chipCorners.map((p) => project(p.x, p.y, p.z, angleX, angleY));
      
      ctx.beginPath();
      ctx.moveTo(projChip[0].x, projChip[0].y);
      for (let i = 1; i < projChip.length; i++) {
        ctx.lineTo(projChip[i].x, projChip[i].y);
      }
      ctx.closePath();
      ctx.fillStyle = "rgba(99, 102, 241, 0.06)";
      ctx.fill();
      ctx.strokeStyle = "rgba(99, 102, 241, 0.6)";
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Hand-drawn cross-hatch shading on chip
      for (let i = 0; i < 6; i++) {
        const t = i / 6;
        const p1 = project(-chipSize + t * chipSize * 2, chipY, -chipSize, angleX, angleY);
        const p2 = project(chipSize, chipY, -chipSize + t * chipSize * 2, angleX, angleY);
        ctx.strokeStyle = "rgba(99, 102, 241, 0.12)";
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      // Silicon Core
      const projSilicon = siliconCorners.map((p) => project(p.x, p.y, p.z, angleX, angleY));
      ctx.beginPath();
      ctx.moveTo(projSilicon[0].x, projSilicon[0].y);
      for (let i = 1; i < projSilicon.length; i++) {
        ctx.lineTo(projSilicon[i].x, projSilicon[i].y);
      }
      ctx.closePath();
      ctx.fillStyle = "rgba(56, 189, 248, 0.12)";
      ctx.fill();
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Synaptic Connections (Pencil & Ink lines)
      for (let l = 0; l < layers.length - 1; l++) {
        const currentLayerNodes = nodes.filter((n) => n.layer === l);
        const nextLayerNodes = nodes.filter((n) => n.layer === l + 1);

        currentLayerNodes.forEach((n1) => {
          const p1 = project(n1.x, n1.y, n1.z, angleX, angleY);
          nextLayerNodes.forEach((n2) => {
            const p2 = project(n2.x, n2.y, n2.z, angleX, angleY);

            ctx.strokeStyle = "rgba(148, 163, 184, 0.25)";
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();

            // Flowing ink particle pulse
            const pulseT = (tick * 1.3 + n1.index * 0.25 + n2.index * 0.35) % 1;
            const packetX = p1.x + (p2.x - p1.x) * pulseT;
            const packetY = p1.y + (p2.y - p1.y) * pulseT;

            ctx.fillStyle = "#818cf8";
            ctx.beginPath();
            ctx.arc(packetX, packetY, 1.4, 0, Math.PI * 2);
            ctx.fill();
          });
        });
      }

      // Draw Sketch Nodes
      nodes.forEach((n) => {
        const p = project(n.x, n.y, n.z, angleX, angleY);
        const pulseSize = Math.sin(tick * 3 + n.pulse) * 1.5;
        const radius = Math.max(2.5, (4 + pulseSize) * p.scale);

        // Soft halo
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 3.5);
        grad.addColorStop(0, "rgba(99, 102, 241, 0.5)");
        grad.addColorStop(0.6, "rgba(56, 189, 248, 0.15)");
        grad.addColorStop(1, "rgba(99, 102, 241, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Node core
        ctx.fillStyle = n.layer % 2 === 0 ? "#818cf8" : "#38bdf8";
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Hand-drawn sketch ring
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius + 2, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Artistic Annotations
      ctx.font = "10px monospace";
      ctx.fillStyle = "rgba(129, 140, 248, 0.85)";
      ctx.fillText("✎ AI_ARCHITECTURE // SKETCH_v2", 20, 30);
      ctx.fillText("MODEL: DEEP_NEURAL_FABRIC", 20, 46);
      ctx.fillText("COGNITION: GEN_AI_SYSTEMS", 20, 62);

      ctx.fillStyle = "rgba(56, 189, 248, 0.85)";
      ctx.textAlign = "right";
      ctx.fillText("LIVE_PROJECTION // 60fps", size - 20, 30);
      ctx.fillText("CORE: NUMERICAL_OPTIMIZATION", size - 20, 46);
      ctx.textAlign = "left";

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetAngleY = x * 0.75;
      targetAngleX = 0.45 + y * 0.3;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[500px] aspect-square mx-auto flex items-center justify-center p-3 rounded-2xl border border-white/10 bg-[#13141f]/70 backdrop-blur-md sketch-border shadow-[0_15px_40px_rgba(99,102,241,0.12)] group"
    >
      <div className="sketch-tape" />
      {/* Corner sketch tags */}
      <div className="absolute top-3 left-3 text-[10px] text-indigo-400/70 font-mono select-none">
        ✎ [SKETCH #01]
      </div>
      <div className="absolute top-3 right-3 text-[10px] text-sky-400/70 font-mono select-none">
        3D WIREFRAME ✦
      </div>
      <div className="absolute bottom-3 left-3 text-[10px] text-slate-400/60 font-mono select-none">
        + NEURAL-SILICON
      </div>
      <div className="absolute bottom-3 right-3 text-[10px] text-amber-400/70 font-mono select-none">
        INTERACTIVE ↺
      </div>

      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
}
