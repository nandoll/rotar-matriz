import { Matrix } from "@/domain/matrix";

export class MatrixValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MatrixValidationError";
  }
}

export const parseAndValidateMatrix = (input: string): Matrix<number> => {
  let parsed: unknown;
  try {
    parsed = JSON.parse(input);
  } catch {
    throw new MatrixValidationError(
      "El formato de entrada no es un JSON válido. Asegúrate de usar corchetes y comas, ej: [[1,2],[3,4]]"
    );
  }

  if (
    !Array.isArray(parsed) ||
    parsed.length === 0 ||
    !parsed.every((row) => Array.isArray(row))
  ) {
    throw new MatrixValidationError(
      "La entrada debe ser un array de arrays, ej: [[1,2],[3,4]]"
    );
  }

  const n = parsed.length;
  for (const row of parsed) {
    if (row.length !== n) {
      throw new MatrixValidationError(
        `La matriz debe ser cuadrada (NxN). Se esperaba que todas las filas tuvieran ${n} elementos.`
      );
    }
    if (!row.every((item) => typeof item === "number" && isFinite(item))) {
      throw new MatrixValidationError(
        "Todos los elementos de la matriz deben ser números."
      );
    }
  }

  return parsed as Matrix<number>;
};

// Logica de Rotación 90° antihorario
export const rotateMatrix = (matrix: Matrix<number>): Matrix<number> => {
  if (!matrix || matrix.length === 0) {
    return [];
  }

  const n = matrix.length;
  const rotatedMatrix: Matrix<number> = Array.from({ length: n }, () =>
    Array(n).fill(0)
  );

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      rotatedMatrix[n - 1 - j][i] = matrix[i][j];
    }
  }

  return rotatedMatrix;
};
