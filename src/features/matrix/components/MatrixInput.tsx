import { useState, ChangeEvent } from "react";
import { Matrix } from "@/domain/matrix";

interface MatrixInputProps {
  onMatrixChange: (matrix: Matrix<number> | null) => void;
}

export default function MatrixInput({ onMatrixChange }: MatrixInputProps) {
  const [input, setInput] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);

    try {
      const matrix = JSON.parse(value) as unknown;

      // Validar que sea un array
      if (!Array.isArray(matrix)) {
        onMatrixChange(null);
        return;
      }

      const n = matrix.length;

      if (n === 0) {
        onMatrixChange(null);
        return;
      }

      for (let i = 0; i < n; i++) {
        if (!Array.isArray(matrix[i])) {
          onMatrixChange(null);
          return;
        }

        if (matrix[i].length !== n) {
          onMatrixChange(null);
          return;
        }

        for (let j = 0; j < n; j++) {
          if (typeof matrix[i][j] !== "number") {
            onMatrixChange(null);
            return;
          }
        }
      }

      // Si todo está bien, actualizar la matriz
      onMatrixChange(matrix as Matrix<number>);
    } catch (err) {
      console.error("Error al parsear la matriz:", err);
      onMatrixChange(null);
    }
  };

  return (
    <div className="mb-6">
      <label 
        htmlFor="matrix-input" 
        className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300"
      >
        Ingresa la matriz de tipo NxN (Ej: [[1,2],[3,4]]):
      </label>
      <textarea
        id="matrix-input"
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
        value={input}
        onChange={handleInputChange}
        placeholder="Ejemplo: [[1,2],[3,4]]"
      />
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        La matriz debe ser cuadrada (NxN) y contener solo números.
      </p>
    </div>
  );
}