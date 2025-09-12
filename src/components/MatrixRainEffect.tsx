"use client";

import { useEffect, useRef } from "react";

interface MatrixRainEffectProps {
  opacity?: number;
  blur?: boolean;
  speedFactor?: number;
  fontSize?: number;
  delayFactor?: number;
  color?: string;
}

export default function MatrixRainEffect({
  opacity = 0.05,
  blur = false,
  speedFactor = 0.9,
  fontSize = 16,
  delayFactor = 2,
  color = "#0F0",
}: MatrixRainEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Matrix Rain Characters
    const latinChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()-_=+[]{}|;:',.<>?/`~¡™£¢∞§¶•ªº–≠œ∑´®†¥¨ˆøπ\"'åß∂ƒ©˙∆˚¬Ω≈ç√∫˜µ≤≥÷";
    const japaneseChars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん一二三四五六七八九十零";
    const matrixChars = latinChars + japaneseChars;
    const characters = matrixChars.split("");

    // Utility: Set canvas dimensions to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Set initial canvas size
    resizeCanvas();

    const columns = Math.floor(canvas.width / fontSize);
    const drops = new Array(columns).fill(0);
    const delays = new Array(columns).fill(0);

    const drawMatrix = () => {
      // Clear the canvas with a trailing effect
      ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text style
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // Move the drop down based on delay
        if (delays[i] <= 0) {
          drops[i] += 1;
          delays[i] = Math.random() * (delayFactor / speedFactor);
        } else {
          delays[i] -= 1;
        }

        // Reset drop to the top randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }

      requestAnimationFrame(drawMatrix);
    };

    // Handle window resize
    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);
    drawMatrix();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [opacity, speedFactor, fontSize, delayFactor, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${blur ? "blur-sm" : ""}`}
      style={{
        opacity: opacity * 20, // Convert opacity to CSS opacity
        zIndex: 1,
      }}
    />
  );
}

// Matrix Overlay Component
export function MatrixOverlay({
  fontSize = 16,
  color = "rgba(255, 255, 255, 0.8)",
  blinkSpeed = 400,
}: {
  fontSize?: number;
  color?: string;
  blinkSpeed?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const latinChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()-_=+[]{}|;:',.<>?/`~¡™£¢∞§¶•ªº–≠œ∑´®†¥¨ˆøπ\"'åß∂ƒ©˙∆˚¬Ω≈ç√∫˜µ≤≥÷";
    const japaneseChars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん一二三四五六七八九十零";
    const matrixChars = latinChars + japaneseChars;
    const characters = matrixChars.split("");

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const drawOverlay = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;

      // Draw random characters at random positions
      for (let i = 0; i < 10; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;

        ctx.fillText(text, x, y);
      }

      setTimeout(() => requestAnimationFrame(drawOverlay), blinkSpeed);
    };

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);
    drawOverlay();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [fontSize, color, blinkSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full blur-sm opacity-40"
      style={{ zIndex: 2 }}
    />
  );
}
