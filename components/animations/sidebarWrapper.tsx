"use client";
import React, { useEffect, useRef, useState, ReactNode, useCallback } from "react";
import { createNoise3D } from "simplex-noise";

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarWrapperProps {
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  rangeY?: number;
  particleCount?: number;
  baseHue?: number;
}

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors = ["#000000", "#000000", "#000000"],
  waveWidth = 100,
  backgroundFill = "rgb(0, 0, 0)",
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  rangeY = 800,
  particleCount = 500,
  baseHue = 120,
  ...props
}: SidebarWrapperProps) => {
  const noise = createNoise3D();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const animationSpeed = speed === "fast" ? 0.002 : 0.001;
    let start = 0;
    let animationFrameId: number;

    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { width, height } = canvas;
      ctx.fillStyle = backgroundFill;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < colors.length; i++) {
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x < width; x += 2) {
          const y =
            noise(x * 0.01, start * animationSpeed, i * 100) * waveWidth +
            height * 0.5;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();
        ctx.fillStyle = colors[i];
        ctx.globalAlpha = waveOpacity;
        ctx.fill();
      }

      start++;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [colors, waveWidth, backgroundFill, speed, waveOpacity, noise]);

  useEffect(() => {
    return init();
  }, [init]);

  return (
    <div
      className={containerClassName}
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        style={{
          filter: `blur(${blur}px)`,
        }}
      />
      <div className={className} {...props}>
        {children}
      </div>
    </div>
  );
};

export default WavyBackground;
