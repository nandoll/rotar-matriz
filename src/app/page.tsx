"use client";

import MatrixInput from "@/features/matrix/components/MatrixInput";
import MatrixDisplay from "@/features/matrix/components/MatrixDisplay";
import { useMatrixRotation } from "@/features/matrix/hooks/useMatrixRotation";

export default function MatrixPage() {
  const { input, setInput, originalMatrix, rotatedMatrix, error } = useMatrixRotation();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        Rotar Matriz en Sentido Anti-horario 🕛
      </h1>

      <MatrixInput input={input} setInput={setInput} error={error} />

      {error && (
        <div 
          id="matrix-error" 
          className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"
          role="alert"
        >
          {error}
        </div>
      )}

      <div className="flex flex-col md:flex-row md:space-x-8">
        <MatrixDisplay matrix={originalMatrix} title="Matriz Original" />
        <MatrixDisplay matrix={rotatedMatrix} title="Matriz Rotada" />
      </div>

      <div className="mt-6 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
        <h2 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Ejemplos:</h2>
        <p className="mb-2 text-gray-700 dark:text-gray-300">
          Ejemplo 2x2: <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">[[1,2],[3,4]]</code>
        </p>
        <p className="mb-2 text-gray-700 dark:text-gray-300">
          Ejemplo 3x3: <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">[[1,2,3],[4,5,6],[7,8,9]]</code>
        </p>
        <p className="mb-2 text-gray-700 dark:text-gray-300">
          Ejemplo 4x4:{" "}
          <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]</code>
        </p>
      </div>
    </div>
  );
}