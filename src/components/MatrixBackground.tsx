"use client";

import { useEffect, useRef } from "react";
import MatrixRainEffect, { MatrixOverlay } from "./MatrixRainEffect";

interface MatrixBackgroundProps {
  isActive?: boolean;
}

export default function MatrixBackground({
  isActive = true,
}: MatrixBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add blur animation to overlay canvas
    const overlayCanvas = containerRef.current?.querySelector("#overlayCanvas");
    if (!overlayCanvas) return;

    let lastTime = 0;
    let isBlurred = false;

    const toggleBlur = (timestamp: number) => {
      if (timestamp - lastTime >= 3000) {
        lastTime = timestamp;
        isBlurred = !isBlurred;

        if (isBlurred) {
          overlayCanvas.classList.add("blur-sm");
        } else {
          overlayCanvas.classList.remove("blur-sm");
        }
      }

      requestAnimationFrame(toggleBlur);
    };

    requestAnimationFrame(toggleBlur);
  }, []);

  if (!isActive) {
    return null;
  }

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full">
      {/* First Layer - Fast, small characters */}
      <MatrixRainEffect
        speedFactor={0.9}
        fontSize={8}
        delayFactor={1}
        color="#0F0"
        opacity={0.05}
      />

      {/* Second Layer - Medium speed, medium characters */}
      <MatrixRainEffect
        speedFactor={0.6}
        fontSize={12}
        delayFactor={6}
        color="#0F0"
        opacity={0.03}
      />

      {/* Third Layer - Slower, larger characters with blur */}
      <MatrixRainEffect
        speedFactor={0.8}
        fontSize={12}
        delayFactor={4}
        color="#0F0"
        opacity={0.02}
        blur={true}
      />

      {/* Overlay Layer - Random blinking characters */}
      <div id="overlayCanvas" className="absolute inset-0">
        <MatrixOverlay
          fontSize={12}
          color="rgba(255, 255, 255, 0.8)"
          blinkSpeed={400}
        />
      </div>
    </div>
  );
}
