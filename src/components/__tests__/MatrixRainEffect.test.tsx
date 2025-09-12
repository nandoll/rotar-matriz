import { render } from "@testing-library/react";
import MatrixRainEffect from "../MatrixRainEffect";

// Mock de canvas
const mockCanvas = {
  getContext: jest.fn(() => ({
    fillStyle: "",
    font: "",
    fillRect: jest.fn(),
    fillText: jest.fn(),
  })),
  width: 800,
  height: 600,
};

// Mock de requestAnimationFrame
const mockRequestAnimationFrame = jest.fn((callback) => {
  setTimeout(callback, 16);
  return 1;
});

// Mock de window
Object.defineProperty(window, "requestAnimationFrame", {
  value: mockRequestAnimationFrame,
  writable: true,
});

// Mock de HTMLCanvasElement
Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
  value: jest.fn(() => mockCanvas.getContext()),
});

Object.defineProperty(HTMLCanvasElement.prototype, "width", {
  get: () => mockCanvas.width,
  set: (value) => {
    mockCanvas.width = value;
  },
});

Object.defineProperty(HTMLCanvasElement.prototype, "height", {
  get: () => mockCanvas.height,
  set: (value) => {
    mockCanvas.height = value;
  },
});

describe("MatrixRainEffect", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("debe renderizar el canvas correctamente", () => {
    render(<MatrixRainEffect />);

    const canvas = document.querySelector("canvas");
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveClass("absolute", "inset-0", "w-full", "h-full");
  });

  test("debe aplicar blur cuando se especifica", () => {
    render(<MatrixRainEffect blur={true} />);

    const canvas = document.querySelector("canvas");
    expect(canvas).toHaveClass("blur-sm");
  });

  test("debe aplicar opacidad personalizada", () => {
    render(<MatrixRainEffect opacity={0.1} />);

    const canvas = document.querySelector("canvas");
    expect(canvas).toHaveStyle({ opacity: "2" }); // opacity * 20
  });

  test("debe configurar z-index correctamente", () => {
    render(<MatrixRainEffect />);

    const canvas = document.querySelector("canvas");
    expect(canvas).toHaveStyle({ zIndex: "1" });
  });
});
