"use client";

import { useState } from "react";
import MatrixInput from "@/components/MatrixInput";
import MatrixDisplay from "@/components/MatrixDisplay";
import { Matrix, rotateMatrixLeft } from "@/types/matrix";

export default function MatrixPage() {
  const [inputMatrix, setInputMatrix] = useState<Matrix<number> | null>(null);
  const [rotatedMatrix, setRotatedMatrix] = useState<Matrix<number> | null>(
    null
  );

  const handleMatrixChange = (matrix: Matrix<number> | null) => {
    setInputMatrix(matrix);

    if (matrix) {
      try {
        const rotated = rotateMatrixLeft(matrix);
        setRotatedMatrix(rotated);
      } catch (error) {
        console.error("Error al rotar la matriz:", error);
        setRotatedMatrix(null);
      }
    } else {
      setRotatedMatrix(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Rotar Matriz en Sentido Anti-horario 🕛
      </h1>

      <MatrixInput onMatrixChange={handleMatrixChange} />

      <div className="flex flex-col md:flex-row md:space-x-8">
        <MatrixDisplay matrix={inputMatrix} title="Matriz Original" />
        <MatrixDisplay matrix={rotatedMatrix} title="Matriz Rotada" />
      </div>

      <div className="mt-6 bg-gray-100 p-4 rounded">
        <h2 className="font-medium mb-2">Ejemplos:</h2>
        <p className="mb-2">
          Ejemplo 2x2: <code>[[1,2],[3,4]]</code>
        </p>
        <p className="mb-2">
          Ejemplo 3x4: <code>[[1,2,3],[4,5,6],[7,8,9]]</code>
        </p>
        <p className="mb-2">
          Ejemplo 4x4:{" "}
          <code>[[1,2,3,5],[4,5,6,7],[7,8,9,10],[11,12,13,14]]</code>
        </p>
      </div>
    </div>
  );
}
