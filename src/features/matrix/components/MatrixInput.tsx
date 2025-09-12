import { useState, ChangeEvent } from "react";
import { Matrix } from "@/domain/matrix";

interface MatrixInputProps {
  input: string;
  setInput: (value: string) => void;
  error: string | null;
}

export default function MatrixInput({ input, setInput, error }: MatrixInputProps) {
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
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
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        value={input}
        onChange={handleInputChange}
        placeholder="Ejemplo: [[1,2],[3,4]]"
        aria-invalid={!!error}
        aria-describedby={error ? "matrix-error" : undefined}
      />
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        La matriz debe ser cuadrada (NxN) y contener solo números.
      </p>
    </div>
  );
}