"use client";

import { useMatrixRotationWithHistory } from "@/features/matrix/hooks/useMatrixRotationWithHistory";
import EnhancedMatrixInput from "@/features/matrix/components/EnhancedMatrixInput";
import MatrixHistory from "@/features/matrix/components/MatrixHistory";
import { AnimatedMatrixVisualization } from "@/features/matrix/components/AnimatedMatrixVisualization";
import MatrixBackground from "@/components/MatrixBackground";
import MatrixToggle from "@/components/MatrixToggle";
import { useState } from "react";

export default function Home() {
  const [isMatrixActive, setIsMatrixActive] = useState(false); // Desactivado temporalmente

  const {
    input,
    setInput,
    currentMatrix,
    rotatedMatrix,
    error,
    history,
    isProcessing,
    generateRandomMatrix,
    processMatrix,
  } = useMatrixRotationWithHistory();

  const handleGenerate = () => {
    processMatrix();
  };

  const handleRandom = () => {
    generateRandomMatrix();
  };

  const handleSelectHistory = (entry: { input: string }) => {
    setInput(entry.input);
  };

  return (
    <div className="min-h-screen bg-black overflow-x-hidden relative">
      {/* Fondo de imagen estático como fallback */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500 ${
          isMatrixActive ? "opacity-20" : "opacity-30"
        }`}
        style={{
          backgroundImage: "url('/bg.webp')",
        }}
      ></div>

      {/* Efecto Matrix animado */}
      <MatrixBackground isActive={isMatrixActive} />

      {/* Gradiente de overlay para mejor legibilidad */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 via-black/20 to-green-900/5"></div>
      </div>

      {/* Control de Matrix Effect */}
      <MatrixToggle isActive={isMatrixActive} onToggle={setIsMatrixActive} />

      <div className="w-full px-4 py-8 pb-20 relative z-10">
        <header className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-4 text-green-400 drop-shadow-[0_0_20px_rgba(74,222,128,0.6)] libre-baskerville-bold tracking-wider">
            THE MATRIX ROTATOR
          </h1>
          <p className="text-green-300/70 max-w-2xl mx-auto text-lg font-mono">
            Libera tu mente.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[40%_58%] gap-4 lg:gap-[2%]">
          {/* Columna 1: Input + Historial */}
          <div className="flex flex-col gap-4 h-full">
            {/* Panel de entrada */}
            <div className="bg-black/10 backdrop-blur rounded-xl p-6 border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
              <EnhancedMatrixInput
                value={input}
                onChange={setInput}
                onGenerate={handleGenerate}
                onRandom={handleRandom}
                error={error}
                isProcessing={isProcessing}
              />
            </div>

            {/* Panel de historial */}
            {history.length > 0 && (
              <div className="bg-black/10 backdrop-blur rounded-xl p-4 border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.2)] h-[400px] overflow-hidden">
                <MatrixHistory
                  history={history}
                  onSelectEntry={handleSelectHistory}
                />
              </div>
            )}
          </div>

          {/* Columna 2: Panel de Visualización */}
          <div className="bg-black/5 backdrop-blur rounded-xl p-6 border border-green-500/30 shadow-[0_0_40px_rgba(34,197,94,0.2)]">
            <AnimatedMatrixVisualization
              originalMatrix={currentMatrix}
              rotatedMatrix={rotatedMatrix}
              isProcessing={isProcessing}
            />
          </div>
        </div>
      </div>

      {/* Footer fijo */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-t border-green-500/20">
        <div className="text-center py-3">
          <p className="text-green-500/60 text-sm font-mono">
            {`<fantezan/>`} 2025
          </p>
        </div>
      </footer>
    </div>
  );
}
