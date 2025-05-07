import { useState, ChangeEvent } from "react";
import { Matrix } from "@/types/matrix";

interface MatrixInputProps {
  onMatrixChange: (matrix: Matrix<number> | null) => void;
}

export default function MatrixInput({ onMatrixChange }: MatrixInputProps) {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);

    try {
      const matrix = JSON.parse(value) as unknown;

      // Validar que sea un array
      if (!Array.isArray(matrix)) {
        setError(
          "La entrada debe ser un array de arrays, por ejemplo: [[1,2],[3,4]]"
        );
        onMatrixChange(null);
        return;
      }

      const n = matrix.length;

      if (n === 0) {
        setError("La matriz no puede estar vacía");
        onMatrixChange(null);
        return;
      }

      for (let i = 0; i < n; i++) {
        if (!Array.isArray(matrix[i])) {
          setError(`La fila ${i + 1} no es un array`);
          onMatrixChange(null);
          return;
        }

        if (matrix[i].length !== n) {
          setError(`La matriz debe ser cuadrada (${n}x${n})`);
          onMatrixChange(null);
          return;
        }

        for (let j = 0; j < n; j++) {
          if (typeof matrix[i][j] !== "number") {
            setError(`El elemento en [${i},${j}] no es un número`);
            onMatrixChange(null);
            return;
          }
        }
      }

      // Si todo está bien, actualizar la matriz
      setError(null);
      onMatrixChange(matrix as Matrix<number>);
    } catch (err) {
      console.error("Error al parsear la matriz:", err);
      setError("Formato JSON inválido");
      onMatrixChange(null);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="matrix-input" className="block text-sm font-medium mb-2">
        Ingresa la matriz de tipo NxN (Ej: [[1,2],[3,4]]):
      </label>
      <textarea
        id="matrix-input"
        className="w-full p-2 border rounded min-h-[100px]"
        value={input}
        onChange={handleInputChange}
        placeholder="Ejemplo: [[1,2],[3,4]]"
      />
      {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
    </div>
  );
}
