import { Matrix } from "@/domain/matrix";

/**
 * Custom Error class for specific validation errors within the domain.
 */
export class MatrixValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MatrixValidationError";
  }
}

/**
 * Parses and validates a string input into a square (NxN) matrix of numbers.
 * @param {string} input - The string to parse, e.g., "[[1,2],[3,4]]".
 * @returns {number[][]} The validated NxN matrix.
 * @throws {MatrixValidationError} If the input is invalid.
 */
export const parseAndValidateMatrix = (input: string): Matrix<number> => {
  let parsed: unknown;
  try {
    parsed = JSON.parse(input);
  } catch (error) {
    console.error(error);
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

/**
 * Rotates a square (NxN) matrix 90 degrees anti-clockwise.
 * This function assumes the matrix has already been validated.
 * @param {number[][]} matrix - The NxN matrix to rotate.
 * @returns {number[][]} The new matrix rotated anti-clockwise.
 */
export const rotateMatrix = (matrix: Matrix<number>): Matrix<number> => {
  if (!matrix || matrix.length === 0) {
    return [];
  }

  const n = matrix.length;
  // Create a new matrix filled with zeros to store the result
  const rotatedMatrix: Matrix<number> = Array.from({ length: n }, () =>
    Array(n).fill(0)
  );

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // New row index is (n - 1 - j)
      // New column index is i
      rotatedMatrix[n - 1 - j][i] = matrix[i][j];
    }
  }

  return rotatedMatrix;
};
