import { renderHook, act } from '@testing-library/react';
import { useMatrixRotation } from '../src/features/matrix/hooks/useMatrixRotation';

describe('useMatrixRotation', () => {
  test('debe inicializar con valores por defecto', () => {
    const { result } = renderHook(() => useMatrixRotation());
    
    expect(result.current.input).toBe('[[1,2,3],[4,5,6],[7,8,9]]');
    expect(result.current.originalMatrix).not.toBeNull();
    expect(result.current.rotatedMatrix).not.toBeNull();
    expect(result.current.error).toBeNull();
  });

  test('debe rotar una matriz correctamente', () => {
    const { result } = renderHook(() => useMatrixRotation('[[1,2],[3,4]]'));
    const expectedOriginal = [
      [1, 2],
      [3, 4],
    ];
    const expectedRotated = [
      [2, 4],
      [1, 3],
    ];

    expect(result.current.originalMatrix).toEqual(expectedOriginal);
    expect(result.current.rotatedMatrix).toEqual(expectedRotated);
    expect(result.current.error).toBeNull();
  });

  test('debe manejar errores en la entrada', () => {
    const { result } = renderHook(() => useMatrixRotation('entrada inválida'));

    expect(result.current.originalMatrix).toBeNull();
    expect(result.current.rotatedMatrix).toBeNull();
    expect(result.current.error).not.toBeNull();
  });

  test('debe actualizar la matriz cuando cambia la entrada', () => {
    const { result } = renderHook(() => useMatrixRotation());

    act(() => {
      result.current.setInput('[[1,2],[3,4]]');
    });

    const expectedOriginal = [
      [1, 2],
      [3, 4],
    ];
    const expectedRotated = [
      [2, 4],
      [1, 3],
    ];

    expect(result.current.input).toBe('[[1,2],[3,4]]');
    expect(result.current.originalMatrix).toEqual(expectedOriginal);
    expect(result.current.rotatedMatrix).toEqual(expectedRotated);
    expect(result.current.error).toBeNull();
  });
});