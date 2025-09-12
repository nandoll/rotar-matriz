import { render, screen, fireEvent } from '@testing-library/react';
import MatrixInput from '../src/features/matrix/components/MatrixInput';
import MatrixDisplay from '../src/features/matrix/components/MatrixDisplay';

describe('MatrixInput', () => {
  const mockSetInput = jest.fn();

  beforeEach(() => {
    mockSetInput.mockClear();
  });

  test('debe renderizar el componente correctamente', () => {
    render(<MatrixInput input="[[1,2],[3,4]]" setInput={mockSetInput} error={null} />);
    
    expect(screen.getByLabelText(/Ingresa la matriz/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ejemplo: \[\[1,2\],\[3,4\]\]/i)).toBeInTheDocument();
  });

  test('debe llamar a setInput cuando cambia el textarea', () => {
    render(<MatrixInput input="" setInput={mockSetInput} error={null} />);
    
    const textarea = screen.getByPlaceholderText(/Ejemplo: \[\[1,2\],\[3,4\]\]/i);
    fireEvent.change(textarea, { target: { value: '[[1,2],[3,4]]' } });
    
    expect(mockSetInput).toHaveBeenCalledWith('[[1,2],[3,4]]');
  });

  test('debe mostrar error visual cuando hay un error', () => {
    render(<MatrixInput input="" setInput={mockSetInput} error="Error de prueba" />);
    
    const textarea = screen.getByPlaceholderText(/Ejemplo: \[\[1,2\],\[3,4\]\]/i);
    expect(textarea).toHaveClass('border-red-500');
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