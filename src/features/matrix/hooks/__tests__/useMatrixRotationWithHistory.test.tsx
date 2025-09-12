import { renderHook, act } from "@testing-library/react";
import { useMatrixRotationWithHistory } from "../useMatrixRotationWithHistory";

// Mock del servicio de matrices
jest.mock("../../services/matrixService", () => ({
  parseAndValidateMatrix: jest.fn(),
  rotateMatrix: jest.fn(),
}));

import {
  parseAndValidateMatrix,
  rotateMatrix,
} from "../../services/matrixService";

const mockParseAndValidateMatrix =
  parseAndValidateMatrix as jest.MockedFunction<typeof parseAndValidateMatrix>;
const mockRotateMatrix = rotateMatrix as jest.MockedFunction<
  typeof rotateMatrix
>;

describe("useMatrixRotationWithHistory", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("debe inicializar con valores por defecto", () => {
    const { result } = renderHook(() => useMatrixRotationWithHistory());

    expect(result.current.input).toBe("");
    expect(result.current.currentMatrix).toBeNull();
    expect(result.current.rotatedMatrix).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.history).toEqual([]);
    expect(result.current.isProcessing).toBe(false);
  });

  test("debe actualizar el input cuando se llama setInput", () => {
    const { result } = renderHook(() => useMatrixRotationWithHistory());

    act(() => {
      result.current.setInput("[[1,2],[3,4]]");
    });

    expect(result.current.input).toBe("[[1,2],[3,4]]");
  });

  test("debe generar una matriz aleatoria", () => {
    const { result } = renderHook(() => useMatrixRotationWithHistory());

    act(() => {
      result.current.generateRandomMatrix();
    });

    expect(result.current.input).toBeDefined();
    expect(typeof result.current.input).toBe("string");
    expect(() => JSON.parse(result.current.input)).not.toThrow();
  });

  test("debe procesar una matriz válida correctamente", async () => {
    const mockMatrix = [
      [1, 2],
      [3, 4],
    ];
    const mockRotated = [
      [2, 4],
      [1, 3],
    ];

    mockParseAndValidateMatrix.mockReturnValue(mockMatrix);
    mockRotateMatrix.mockReturnValue(mockRotated);

    const { result } = renderHook(() => useMatrixRotationWithHistory());

    act(() => {
      result.current.setInput("[[1,2],[3,4]]");
    });

    let processResult: boolean;
    act(() => {
      processResult = result.current.processMatrix();
    });

    expect(processResult!).toBe(true);
    expect(mockParseAndValidateMatrix).toHaveBeenCalledWith("[[1,2],[3,4]]");
    expect(mockRotateMatrix).toHaveBeenCalledWith(mockMatrix);
    expect(result.current.currentMatrix).toEqual(mockMatrix);
    expect(result.current.rotatedMatrix).toEqual(mockRotated);
    expect(result.current.error).toBeNull();
    expect(result.current.isProcessing).toBe(true);

    // Avanzar el tiempo para simular el procesamiento
    act(() => {
      jest.advanceTimersByTime(1300);
    });

    expect(result.current.isProcessing).toBe(false);
  });

  test("debe manejar errores de validación", () => {
    const errorMessage = "Matriz inválida";
    mockParseAndValidateMatrix.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    const { result } = renderHook(() => useMatrixRotationWithHistory());

    act(() => {
      result.current.setInput("entrada inválida");
    });

    let processResult: boolean;
    act(() => {
      processResult = result.current.processMatrix();
    });

    expect(processResult!).toBe(false);
    expect(result.current.error).toBe(errorMessage);
    expect(result.current.currentMatrix).toBeNull();
    expect(result.current.rotatedMatrix).toBeNull();
  });

  test("debe mostrar error cuando el input está vacío", () => {
    const { result } = renderHook(() => useMatrixRotationWithHistory());

    let processResult: boolean;
    act(() => {
      processResult = result.current.processMatrix();
    });

    expect(processResult!).toBe(false);
    expect(result.current.error).toBe("Por favor ingresa una matriz");
  });

  test("debe agregar entrada al historial después del procesamiento", () => {
    const mockMatrix = [
      [1, 2],
      [3, 4],
    ];
    const mockRotated = [
      [2, 4],
      [1, 3],
    ];

    mockParseAndValidateMatrix.mockReturnValue(mockMatrix);
    mockRotateMatrix.mockReturnValue(mockRotated);

    const { result } = renderHook(() => useMatrixRotationWithHistory());

    act(() => {
      result.current.setInput("[[1,2],[3,4]]");
    });

    act(() => {
      result.current.processMatrix();
    });

    expect(result.current.history).toHaveLength(1);
    expect(result.current.history[0]).toMatchObject({
      input: "[[1,2],[3,4]]",
      matrix: mockMatrix,
      rotatedMatrix: mockRotated,
    });
    expect(result.current.history[0].id).toBeDefined();
    expect(result.current.history[0].timestamp).toBeInstanceOf(Date);
  });

  test("debe limitar el historial a 20 entradas", () => {
    const mockMatrix = [
      [1, 2],
      [3, 4],
    ];
    const mockRotated = [
      [2, 4],
      [1, 3],
    ];

    mockParseAndValidateMatrix.mockReturnValue(mockMatrix);
    mockRotateMatrix.mockReturnValue(mockRotated);

    const { result } = renderHook(() => useMatrixRotationWithHistory());

    // Procesar 25 matrices
    for (let i = 0; i < 25; i++) {
      act(() => {
        result.current.setInput(`[[${i},${i + 1}],[${i + 2},${i + 3}]]`);
      });

      act(() => {
        result.current.processMatrix();
      });

      act(() => {
        jest.advanceTimersByTime(1300);
      });
    }

    expect(result.current.history).toHaveLength(20);
  });

  test("debe limpiar la visualización correctamente", () => {
    const mockMatrix = [
      [1, 2],
      [3, 4],
    ];
    const mockRotated = [
      [2, 4],
      [1, 3],
    ];

    mockParseAndValidateMatrix.mockReturnValue(mockMatrix);
    mockRotateMatrix.mockReturnValue(mockRotated);

    const { result } = renderHook(() => useMatrixRotationWithHistory());

    // Procesar una matriz primero
    act(() => {
      result.current.setInput("[[1,2],[3,4]]");
    });

    act(() => {
      result.current.processMatrix();
    });

    act(() => {
      jest.advanceTimersByTime(1300);
    });

    // Limpiar
    act(() => {
      result.current.clearVisualization();
    });

    expect(result.current.input).toBe("");
    expect(result.current.currentMatrix).toBeNull();
    expect(result.current.rotatedMatrix).toBeNull();
    expect(result.current.error).toBeNull();
  });

  test("debe manejar errores no Error correctamente", () => {
    mockParseAndValidateMatrix.mockImplementation(() => {
      throw "String error";
    });

    const { result } = renderHook(() => useMatrixRotationWithHistory());

    act(() => {
      result.current.setInput("entrada inválida");
    });

    let processResult: boolean;
    act(() => {
      processResult = result.current.processMatrix();
    });

    expect(processResult!).toBe(false);
    expect(result.current.error).toBe("Error desconocido");
  });
});
