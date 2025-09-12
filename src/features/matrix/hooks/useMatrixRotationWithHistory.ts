import { useState, useCallback } from "react";
import { Matrix } from "@/domain/matrix";
import {
  parseAndValidateMatrix,
  rotateMatrix,
} from "@/features/matrix/services/matrixService";

export interface HistoryEntry {
  id: string;
  input: string;
  matrix: Matrix<number>;
  rotatedMatrix: Matrix<number>;
  timestamp: Date;
}

export function useMatrixRotationWithHistory() {
  const [input, setInput] = useState("");
  const [currentMatrix, setCurrentMatrix] = useState<Matrix<number> | null>(
    null
  );
  const [rotatedMatrix, setRotatedMatrix] = useState<Matrix<number> | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Generar matriz aleatoria
  const generateRandomMatrix = useCallback(() => {
    const size = Math.floor(Math.random() * 3) + 3;
    const matrix: number[][] = [];

    for (let i = 0; i < size; i++) {
      const row: number[] = [];
      for (let j = 0; j < size; j++) {
        row.push(Math.floor(Math.random() * 10));
      }
      matrix.push(row);
    }

    const matrixString = JSON.stringify(matrix);
    setInput(matrixString);
    return matrixString;
  }, []);

  // Generar la visualización
  const processMatrix = useCallback(() => {
    try {
      if (!input.trim()) {
        setError("Por favor ingresa una matriz");
        return false;
      }

      const parsed = parseAndValidateMatrix(input);
      const rotated = rotateMatrix(parsed);

      setCurrentMatrix(parsed);
      setRotatedMatrix(rotated);
      setError(null);
      setIsProcessing(true);

      // Crear auditoría
      const entry: HistoryEntry = {
        id: Date.now().toString(),
        input,
        matrix: parsed,
        rotatedMatrix: rotated,
        timestamp: new Date(),
      };

      setHistory((prev) => [entry, ...prev].slice(0, 20));

      // Simular procesamiento
      setTimeout(() => {
        setIsProcessing(false);
      }, 1300);

      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
      setCurrentMatrix(null);
      setRotatedMatrix(null);
      return false;
    }
  }, [input]);

  const clearVisualization = useCallback(() => {
    setCurrentMatrix(null);
    setRotatedMatrix(null);
    setInput("");
    setError(null);
  }, []);

  return {
    input,
    setInput,
    currentMatrix,
    rotatedMatrix,
    error,
    history,
    isProcessing,
    generateRandomMatrix,
    processMatrix,
    clearVisualization,
  };
}
