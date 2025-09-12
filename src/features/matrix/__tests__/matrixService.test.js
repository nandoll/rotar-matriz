import {
  rotateMatrix,
  parseAndValidateMatrix,
  MatrixValidationError,
} from "../services/matrixService";

describe("rotateMatrix", () => {
  test("debe rotar una matriz 2x2 correctamente", () => {
    const input = [
      [1, 2],
      [3, 4],
    ];
    const expected = [
      [2, 4],
      [1, 3],
    ];

    const result = rotateMatrix(input);

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

    const result = rotateMatrix(input);

    expect(result).toEqual(expected);
  });

  test("debe manejar matrices vacías", () => {
    const input = [];
    const expected = [];

    const result = rotateMatrix(input);

    expect(result).toEqual(expected);
  });
});

describe("parseAndValidateMatrix", () => {
  test("debe parsear y validar una matriz correctamente", () => {
    const input = "[[1,2],[3,4]]";
    const expected = [
      [1, 2],
      [3, 4],
    ];

    const result = parseAndValidateMatrix(input);

    expect(result).toEqual(expected);
  });

  test("debe lanzar un error para JSON inválido", () => {
    const input = "entrada inválida";

    expect(() => {
      parseAndValidateMatrix(input);
    }).toThrow(MatrixValidationError);
  });

  test("debe lanzar un error para entrada que no es un array de arrays", () => {
    const input = "[1,2,3]";

    expect(() => {
      parseAndValidateMatrix(input);
    }).toThrow(MatrixValidationError);
  });

  test("debe lanzar un error para matriz no cuadrada", () => {
    const input = "[[1,2,3],[4,5,6]]";

    expect(() => {
      parseAndValidateMatrix(input);
    }).toThrow(MatrixValidationError);
  });

  test("debe lanzar un error para elementos no numéricos", () => {
    const input = '[[1,2],["a",4]]';

    expect(() => {
      parseAndValidateMatrix(input);
    }).toThrow(MatrixValidationError);
  });
});
