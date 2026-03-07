"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#58CC02", "#FFC800", "#BBF2FF", "#FFB2B2", "#9069CD", "#FF9F40"];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  w: number;
  h: number;
  rotation: number;
  rotSpeed: number;
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

type Props = {
  active: boolean;
  /** アニメーション時間（ms）デフォルト 3000 */
  duration?: number;
};

/**
 * Canvas ベースの紙吹雪エフェクト。
 * active が true になった瞬間に再生され、duration 後に自動で消える。
 */
export function ConfettiEffect({ active, duration = 3000 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = Array.from({ length: 100 }, () => ({
      x: rand(0, canvas.width),
      y: rand(-300, -10),
      vx: rand(-2.5, 2.5),
      vy: rand(4, 9),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      w: rand(7, 13),
      h: rand(4, 8),
      rotation: rand(0, Math.PI * 2),
      rotSpeed: rand(-0.12, 0.12),
    }));

    const startTime = performance.now();

    function draw(now: number) {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const alpha = t > 0.65 ? 1 - (t - 0.65) / 0.35 : 1;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12; // 重力
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }

      if (elapsed < duration) {
        rafRef.current = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [active, duration]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
