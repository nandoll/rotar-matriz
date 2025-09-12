import { ChangeEvent, useEffect, useState } from "react";

interface EnhancedMatrixInputProps {
  value: string;
  onChange: (value: string) => void;
  onGenerate: () => void;
  onRandom: () => void;
  error: string | null;
  isProcessing: boolean;
}

export default function EnhancedMatrixInput({
  value,
  onChange,
  onGenerate,
  onRandom,
  error,
  isProcessing,
}: EnhancedMatrixInputProps) {
  const [formattedValue, setFormattedValue] = useState(value);

  useEffect(() => {
    // Formatear JSON cuando cambia el valor
    try {
      if (value.trim()) {
        const parsed = JSON.parse(value);
        // Formato personalizado para matrices - cada fila en una línea
        const formatted = JSON.stringify(parsed, null, 2)
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          .replace(/,\s+(?=\d)/g, ",")
          .replace(/\[\[/g, "[\n  [")
          .replace(/\]\]/g, "]\n]");
        setFormattedValue(formatted);
      } else {
        setFormattedValue(value);
      }
    } catch {
      setFormattedValue(value);
    }
  }, [value]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setFormattedValue(newValue);
    // Intentar compactar JSON antes de guardar
    try {
      const parsed = JSON.parse(newValue);
      onChange(JSON.stringify(parsed));
    } catch {
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-md text-white font-mono">
        Ingresa el Código Fuente
      </label>

      <div className="relative">
        <textarea
          className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300
            bg-black/50 border text-green-400 placeholder-green-600/50 font-mono text-sm
            ${
              error
                ? "border-red-500 focus:ring-red-500"
                : "border-green-500/50 focus:ring-green-400 focus:border-green-400"
            }
          `}
          value={formattedValue}
          onChange={handleInputChange}
          placeholder="Ej: [[5,2,5,7],[9,8,0,8],[0,9,8,8],[9,8,5,1]]"
          rows={6}
          disabled={isProcessing}
          style={{ resize: "vertical", minHeight: "120px" }}
        />

        <div className="flex gap-3 mt-4">
          <button
            onClick={onRandom}
            disabled={isProcessing}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-red-400 hover:bg-red-500 disabled:bg-green-900 disabled:cursor-not-allowed text-white font-bold transition-all duration-200 shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)]"
            title="Generar matriz aleatoria"
          >
            <span className="text-xl">💊</span>
            <span>Píldora Roja</span>
          </button>

          <button
            onClick={onGenerate}
            disabled={isProcessing || !value.trim()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-green-500 hover:bg-green-400 disabled:bg-green-900 disabled:cursor-not-allowed text-black font-bold transition-all duration-200 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]"
          >
            <span>Generar</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-2 p-3 rounded-lg bg-red-900/30 border border-red-500/50">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}
    </div>
  );
}
