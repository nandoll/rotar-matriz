import { useState } from "react";
import { Matrix } from "@/domain/matrix";
import { rotateMatrixLeft } from "../services/matrixService";

interface UseMatrixRotationReturn<T> {
  inputMatrix: Matrix<T> | null;
  rotatedMatrix: Matrix<T> | null;
  error: string | null;
  rotateMatrix: (matrix: Matrix<T> | null) => void;
}

export const useMatrixRotation = <T>(): UseMatrixRotationReturn<T> => {
  const [inputMatrix, setInputMatrix] = useState<Matrix<T> | null>(null);
  const [rotatedMatrix, setRotatedMatrix] = useState<Matrix<T> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const rotateMatrix = (matrix: Matrix<T> | null) => {
    setInputMatrix(matrix);

    if (matrix) {
      try {
        const rotated = rotateMatrixLeft(matrix);
        setRotatedMatrix(rotated);
        setError(null);
      } catch (err) {
        console.error("Error al rotar la matriz:", err);
        setRotatedMatrix(null);
        setError(err instanceof Error ? err.message : "Error desconocido");
      }
    } else {
      setRotatedMatrix(null);
      setError(null);
    }
  };

  return {
    inputMatrix,
    rotatedMatrix,
    error,
    rotateMatrix,
  };
};