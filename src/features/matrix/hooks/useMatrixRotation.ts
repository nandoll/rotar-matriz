import { useState, useMemo } from "react";
import { Matrix } from "@/domain/matrix";
import { parseAndValidateMatrix, rotateMatrix, MatrixValidationError } from "../services/matrixService";

interface UseMatrixRotationReturn {
  input: string;
  setInput: (value: string) => void;
  originalMatrix: Matrix<number> | null;
  rotatedMatrix: Matrix<number> | null;
  error: string | null;
}

/**
 * Hook to manage the state and logic for matrix rotation.
 * @param {string} initialMatrixString - The initial string for the matrix input.
 */
export const useMatrixRotation = (initialMatrixString = '[[1,2,3],[4,5,6],[7,8,9]]'): UseMatrixRotationReturn => {
  const [input, setInput] = useState(initialMatrixString);
  const [error, setError] = useState<string | null>(null);

  // useMemo ensures that parsing and rotation only happen when the input changes.
  // This is a performance optimization.
  const { originalMatrix, rotatedMatrix } = useMemo(() => {
    try {
      const parsed = parseAndValidateMatrix(input);
      const rotated = rotateMatrix(parsed);
      setError(null); // Clear previous errors on success
      return { originalMatrix: parsed, rotatedMatrix: rotated };
    } catch (e) {
      if (e instanceof MatrixValidationError) {
        setError(e.message);
      } else {
        setError("Ocurrió un error inesperado.");
      }
      return { originalMatrix: null, rotatedMatrix: null };
    }
  }, [input]);

  return {
    input,
    setInput,
    originalMatrix,
    rotatedMatrix,
    error
  };
};