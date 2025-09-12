import { renderHook, act } from '@testing-library/react';
import { useMatrixRotation } from '../src/features/matrix/hooks/useMatrixRotation';

describe('useMatrixRotation', () => {
  test('debe inicializar con valores nulos', () => {
    const { result } = renderHook(() => useMatrixRotation());
    
    expect(result.current.inputMatrix).toBeNull();
    expect(result.current.rotatedMatrix).toBeNull();
    expect(result.current.error).toBeNull();
  });

  test('debe rotar una matriz correctamente', () => {
    const { result } = renderHook(() => useMatrixRotation());
    const matrix = [
      [1, 2],
      [3, 4],
    ];
    const expected = [
      [2, 4],
      [1, 3],
    ];

    act(() => {
      result.current.rotateMatrix(matrix);
    });

    expect(result.current.inputMatrix).toEqual(matrix);
    expect(result.current.rotatedMatrix).toEqual(expected);
    expect(result.current.error).toBeNull();
  });

  test('debe manejar matrices nulas', () => {
    const { result } = renderHook(() => useMatrixRotation());

    act(() => {
      result.current.rotateMatrix(null);
    });

    expect(result.current.inputMatrix).toBeNull();
    expect(result.current.rotatedMatrix).toBeNull();
    expect(result.current.error).toBeNull();
  });

  test('debe manejar errores en la rotación', () => {
    const { result } = renderHook(() => useMatrixRotation());
    const invalidMatrix = [
      [1, 2, 3],
      [4, 5, 6],
    ];

    act(() => {
      result.current.rotateMatrix(invalidMatrix);
    });

    expect(result.current.inputMatrix).toEqual(invalidMatrix);
    expect(result.current.rotatedMatrix).toBeNull();
    expect(result.current.error).toEqual("La matriz debe ser cuadrada (NxN)");
  });
});