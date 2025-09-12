import { render, screen } from "@testing-library/react";
import MatrixBackground from "../MatrixBackground";

// Mock de MatrixRainEffect
jest.mock("../MatrixRainEffect", () => ({
  __esModule: true,
  default: ({
    speedFactor,
    fontSize,
    color,
    opacity,
    blur,
  }: {
    speedFactor?: number;
    fontSize?: number;
    color?: string;
    opacity?: number;
    blur?: boolean;
  }) => (
    <div
      data-testid="matrix-rain-effect"
      data-speed={speedFactor}
      data-font-size={fontSize}
      data-color={color}
      data-opacity={opacity}
      data-blur={blur}
    >
      Matrix Rain Effect
    </div>
  ),
  MatrixOverlay: ({
    fontSize,
    color,
    blinkSpeed,
  }: {
    fontSize?: number;
    color?: string;
    blinkSpeed?: number;
  }) => (
    <div
      data-testid="matrix-overlay"
      data-font-size={fontSize}
      data-color={color}
      data-blink-speed={blinkSpeed}
    >
      Matrix Overlay
    </div>
  ),
}));

describe("MatrixBackground", () => {
  test("debe renderizar todas las capas cuando está activo", () => {
    render(<MatrixBackground isActive={true} />);

    // Debe tener 3 capas de MatrixRainEffect
    const rainEffects = screen.getAllByTestId("matrix-rain-effect");
    expect(rainEffects).toHaveLength(3);

    // Debe tener 1 capa de MatrixOverlay
    const overlay = screen.getByTestId("matrix-overlay");
    expect(overlay).toBeInTheDocument();
  });

  test("no debe renderizar nada cuando está inactivo", () => {
    render(<MatrixBackground isActive={false} />);

    const rainEffects = screen.queryAllByTestId("matrix-rain-effect");
    expect(rainEffects).toHaveLength(0);

    const overlay = screen.queryByTestId("matrix-overlay");
    expect(overlay).not.toBeInTheDocument();
  });

  test("debe renderizar por defecto cuando no se especifica isActive", () => {
    render(<MatrixBackground />);

    const rainEffects = screen.getAllByTestId("matrix-rain-effect");
    expect(rainEffects).toHaveLength(3);
  });

  test("debe configurar las capas con parámetros correctos", () => {
    render(<MatrixBackground isActive={true} />);

    const rainEffects = screen.getAllByTestId("matrix-rain-effect");

    // Primera capa - rápida, caracteres pequeños
    expect(rainEffects[0]).toHaveAttribute("data-speed", "0.9");
    expect(rainEffects[0]).toHaveAttribute("data-font-size", "8");
    expect(rainEffects[0]).toHaveAttribute("data-color", "#0F0");
    expect(rainEffects[0]).toHaveAttribute("data-opacity", "0.05");

    // Segunda capa - velocidad media
    expect(rainEffects[1]).toHaveAttribute("data-speed", "0.6");
    expect(rainEffects[1]).toHaveAttribute("data-font-size", "12");
    expect(rainEffects[1]).toHaveAttribute("data-opacity", "0.03");

    // Tercera capa - lenta con blur
    expect(rainEffects[2]).toHaveAttribute("data-speed", "0.8");
    expect(rainEffects[2]).toHaveAttribute("data-font-size", "12");
    expect(rainEffects[2]).toHaveAttribute("data-opacity", "0.02");
    expect(rainEffects[2]).toHaveAttribute("data-blur", "true");
  });
});
