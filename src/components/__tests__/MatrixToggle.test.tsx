import { render, screen, fireEvent } from "@testing-library/react";
import MatrixToggle from "../MatrixToggle";

// Mock de localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("MatrixToggle", () => {
  const mockOnToggle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  test("debe renderizar el botón en estado activo", () => {
    render(<MatrixToggle isActive={true} onToggle={mockOnToggle} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-green-500/20");
    expect(screen.getByText("PAUSE")).toBeInTheDocument();
    expect(screen.getByText("HIGH")).toBeInTheDocument();
  });

  test("debe renderizar el botón en estado inactivo", () => {
    render(<MatrixToggle isActive={false} onToggle={mockOnToggle} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-red-500/20");
    expect(screen.getByText("PLAY")).toBeInTheDocument();
    expect(screen.getByText("LOW")).toBeInTheDocument();
  });

  test("debe llamar onToggle cuando se hace clic", () => {
    render(<MatrixToggle isActive={true} onToggle={mockOnToggle} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockOnToggle).toHaveBeenCalledWith(false);
  });

  test("debe guardar la preferencia en localStorage", () => {
    render(<MatrixToggle isActive={true} onToggle={mockOnToggle} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "matrixEffectEnabled",
      "false"
    );
  });

  test("debe cargar la preferencia desde localStorage al montar", () => {
    localStorageMock.getItem.mockReturnValue("false");

    render(<MatrixToggle isActive={true} onToggle={mockOnToggle} />);

    expect(mockOnToggle).toHaveBeenCalledWith(false);
  });

  test("debe tener el tooltip correcto", () => {
    render(<MatrixToggle isActive={true} onToggle={mockOnToggle} />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute(
      "title",
      "Pausar efecto Matrix (mejora rendimiento)"
    );
  });

  test("debe tener el tooltip correcto cuando está inactivo", () => {
    render(<MatrixToggle isActive={false} onToggle={mockOnToggle} />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("title", "Activar efecto Matrix");
  });

  test("debe aplicar efectos de hover", () => {
    render(<MatrixToggle isActive={true} onToggle={mockOnToggle} />);

    const button = screen.getByRole("button");
    fireEvent.mouseEnter(button);

    expect(button).toHaveClass("scale-105");

    fireEvent.mouseLeave(button);

    expect(button).toHaveClass("scale-100");
  });
});
