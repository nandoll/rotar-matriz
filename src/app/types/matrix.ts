export type Matrix<T> = T[][];

/**
 * Rota una matriz cuadrada NxN en sentido anti-horario (90 grados)
 * @param matrix Matriz cuadrada a rotar
 * @returns Nueva matriz rotada
 * @throws Error si la matriz no es cuadrada
 */
export function rotateMatrixLeft<T>(matrix: Matrix<T>): Matrix<T> {
  if (!matrix.length) {
    return [];
  }

  const n = matrix.length;

  for (let i = 0; i < n; i++) {
    if (matrix[i].length !== n) {
      throw new Error("La matriz debe ser cuadrada (NxN)");
    }
  }

  // Crear nueva matriz
  const result: Matrix<T> = [];
  for (let i = 0; i < n; i++) {
    result.push(new Array(n));
  }

  for (let fila = 0; fila < n; fila++) {
    for (let columna = 0; columna < n; columna++) {
      // El elemento en la posición [fila][columna] de la nueva matriz
      // viene del elemento en la posición [columna][n-1-fila] de la matriz original
      result[fila][columna] = matrix[columna][n - 1 - fila];
    }
  }

  return result;
}
