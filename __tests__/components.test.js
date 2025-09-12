import { render, screen, fireEvent } from '@testing-library/react';
import MatrixInput from '../src/features/matrix/components/MatrixInput';
import MatrixDisplay from '../src/features/matrix/components/MatrixDisplay';

// Mock para la función onMatrixChange
const mockOnMatrixChange = jest.fn();

describe('MatrixInput', () => {
  beforeEach(() => {
    mockOnMatrixChange.mockClear();
  });

  test('debe renderizar el componente correctamente', () => {
    render(<MatrixInput onMatrixChange={mockOnMatrixChange} />);
    
    expect(screen.getByLabelText(/Ingresa la matriz/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ejemplo: \[\[1,2\],\[3,4\]\]/i)).toBeInTheDocument();
  });

  test('debe llamar a onMatrixChange con la matriz parseada', () => {
    render(<MatrixInput onMatrixChange={mockOnMatrixChange} />);
    
    const textarea = screen.getByPlaceholderText(/Ejemplo: \[\[1,2\],\[3,4\]\]/i);
    fireEvent.change(textarea, { target: { value: '[[1,2],[3,4]]' } });
    
    expect(mockOnMatrixChange).toHaveBeenCalledWith([
      [1, 2],
      [3, 4],
    ]);
  });

  test('debe llamar a onMatrixChange con null para entrada inválida', () => {
    render(<MatrixInput onMatrixChange={mockOnMatrixChange} />);
    
    const textarea = screen.getByPlaceholderText(/Ejemplo: \[\[1,2\],\[3,4\]\]/i);
    fireEvent.change(textarea, { target: { value: 'entrada inválida' } });
    
    expect(mockOnMatrixChange).toHaveBeenCalledWith(null);
  });
});

describe('MatrixDisplay', () => {
  test('no debe renderizar nada si la matriz es null', () => {
    const { container } = render(<MatrixDisplay matrix={null} title="Test" />);
    
    expect(container.firstChild).toBeNull();
  });

  test('debe renderizar la matriz correctamente', () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ];
    
    render(<MatrixDisplay matrix={matrix} title="Matriz de prueba" />);
    
    expect(screen.getByText('Matriz de prueba')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });
});