import { rotateMatrixLeft } from "@/types/matrix";

describe("rotateMatrixLeft", () => {
  test("debe rotar una matriz 2x2 correctamente", () => {
    const input = [
      [1, 2],
      [3, 4],
    ];
    const expected = [
      [2, 4],
      [1, 3],
    ];

    const result = rotateMatrixLeft(input);

    expect(result).toEqual(expected);
  });

  test("debe rotar una matriz 3x3 correctamente", () => {
    const input = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const expected = [
      [3, 6, 9],
      [2, 5, 8],
      [1, 4, 7],
    ];

    const result = rotateMatrixLeft(input);

    expect(result).toEqual(expected);
  });

  test("debe lanzar un error si la matriz no es cuadrada", () => {
    const input = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    expect(() => {
      rotateMatrixLeft(input);
    }).toThrow("La matriz debe ser cuadrada");
  });

  test("debe manejar matrices vacías", () => {
    const input = [];
    const expected = [];

    const result = rotateMatrixLeft(input);

    expect(result).toEqual(expected);
  });
});
