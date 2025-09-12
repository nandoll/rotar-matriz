"use client";

import { useState, useEffect } from "react";

interface MatrixToggleProps {
  isActive: boolean;
  onToggle: (isActive: boolean) => void;
}

export default function MatrixToggle({
  isActive,
  onToggle,
}: MatrixToggleProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Guardar preferencia en localStorage
  useEffect(() => {
    const savedPreference = localStorage.getItem("matrixEffectEnabled");
    if (savedPreference !== null) {
      const enabled = JSON.parse(savedPreference);
      onToggle(enabled);
    }
  }, [onToggle]);

  const handleToggle = () => {
    const newState = !isActive;
    onToggle(newState);
    localStorage.setItem("matrixEffectEnabled", JSON.stringify(newState));
  };

  return (
    <button
      onClick={handleToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 shadow-lg backdrop-blur-sm border ${
        isActive
          ? "bg-green-500/20 border-green-400/50 text-green-400 hover:bg-green-500/30"
          : "bg-red-500/20 border-red-400/50 text-red-400 hover:bg-red-500/30"
      } ${isHovered ? "scale-105" : "scale-100"}`}
      title={
        isActive
          ? "Pausar efecto Matrix (mejora rendimiento)"
          : "Activar efecto Matrix"
      }
    >
      <div className="flex items-center gap-2">
        {isActive ? (
          <>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-mono font-bold">PAUSE</span>
          </>
        ) : (
          <>
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <span className="text-sm font-mono font-bold">PLAY</span>
          </>
        )}
      </div>

      {/* Indicador de rendimiento */}
      <div className="text-xs opacity-70 font-mono">
        {isActive ? "HIGH" : "LOW"}
      </div>
    </button>
  );
}
