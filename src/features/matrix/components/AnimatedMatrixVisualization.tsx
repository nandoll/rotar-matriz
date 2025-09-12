import { Matrix } from "@/domain/matrix";
import { useState, useEffect } from "react";

interface AnimatedMatrixVisualizationProps {
  originalMatrix: Matrix<number> | null;
  rotatedMatrix: Matrix<number> | null;
  isProcessing: boolean;
}

export function AnimatedMatrixVisualization({
  originalMatrix,
  rotatedMatrix,
  isProcessing,
}: AnimatedMatrixVisualizationProps) {
  const [visibleCells, setVisibleCells] = useState<Set<string>>(new Set());
  const [rotatedVisibleCells, setRotatedVisibleCells] = useState<Set<string>>(
    new Set()
  );
  const [showRotated, setShowRotated] = useState(false);

  // Reiniciar la matriz y también agregar efectos
  useEffect(() => {
    if (originalMatrix && isProcessing) {
      setVisibleCells(new Set());
      setRotatedVisibleCells(new Set());
      setShowRotated(false);

      const totalCells = originalMatrix.length * originalMatrix.length;
      const delayOriginal = 500 / totalCells; // .5s
      const delayRotated = 800 / totalCells; // .8s para panel de rotación

      // Mostrar cuadros del arreglo con animación
      originalMatrix.forEach((row, i) => {
        row.forEach((_, j) => {
          const cellIndex = i * originalMatrix.length + j;
          setTimeout(() => {
            setVisibleCells((prev) => new Set([...prev, `${i}-${j}`]));
          }, cellIndex * delayOriginal);
        });
      });

      // Espera que termine de entrar el primer panel para mostrar panel de rotación
      setTimeout(() => {
        setShowRotated(true);
        if (rotatedMatrix) {
          rotatedMatrix.forEach((row, i) => {
            row.forEach((_, j) => {
              const cellIndex = i * rotatedMatrix.length + j;
              setTimeout(() => {
                setRotatedVisibleCells(
                  (prev) => new Set([...prev, `${i}-${j}`])
                );
              }, cellIndex * delayRotated);
            });
          });
        }
      }, 500);
    }
  }, [originalMatrix, rotatedMatrix, isProcessing]);

  const renderMatrix = (
    matrix: Matrix<number>,
    title: string,
    visibleSet: Set<string>,
    isRotation: boolean = false
  ) => {
    const size = matrix.length;
    const cellSize = size > 6 ? 40 : size > 5 ? 45 : size > 4 ? 50 : 60;
    const gap = size > 5 ? 4 : 6;
    const containerSize = size * cellSize + (size - 1) * gap;

    return (
      <div className="flex flex-col items-center">
        <h3 className="mb-4 text-lg font-bold text-green-400 font-mono">
          {title}
        </h3>
        <div
          className="relative bg-black/50 p-4 rounded-xl border border-green-500/30"
          style={{
            width: containerSize + 32,
            height: containerSize + 32,
          }}
        >
          <div
            className="relative"
            style={{
              width: containerSize,
              height: containerSize,
            }}
          >
            {matrix.flatMap((row, rowIndex) =>
              row.map((value, colIndex) => {
                const isVisible = visibleSet.has(`${rowIndex}-${colIndex}`);
                return (
                  <div
                    key={`${title}-${rowIndex}-${colIndex}`}
                    className={`absolute flex items-center justify-center rounded transition-all ${
                      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    }`}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      left: colIndex * (cellSize + gap),
                      top: rowIndex * (cellSize + gap),
                      backgroundColor: isRotation
                        ? "rgba(0, 200, 0, 0.2)"
                        : "rgba(139, 92, 246, 0.1)",
                      border: isRotation
                        ? "1px solid rgba(74, 222, 128, 0.6)"
                        : "1px solid rgba(34, 197, 94, 0.4)",
                      boxShadow: isRotation
                        ? "0 0 15px rgba(74, 222, 128, 0.3)"
                        : "0 0 10px rgba(34, 197, 94, 0.2)",
                      transitionDuration: "200ms",
                      transitionDelay: `${(rowIndex * size + colIndex) * 15}ms`,
                      transform: isVisible
                        ? "scale(1) rotate(0deg)"
                        : isRotation
                        ? "scale(0) rotate(-90deg)"
                        : "scale(0)",
                    }}
                  >
                    <span
                      className={`text-lg font-semibold  font-mono ${
                        isRotation ? "text-white" : "text-green-600"
                      }`}
                    >
                      {value}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  };

  if (!originalMatrix) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-green-500/60 text-lg font-mono">
            Ingresa una matriz y presiona &quot;Generar&quot; para visualizar
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-6 text-white text-center font-mono">
        Haz rotar la matrix.
      </h2>
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
        <div className="flex flex-col items-center flex-1">
          {renderMatrix(
            originalMatrix,
            "La Realidad Actual",
            visibleCells,
            false
          )}
        </div>

        {showRotated && rotatedMatrix && (
          <>
            <div className="flex items-center justify-center">
              <div className="text-4xl text-green-500/50 animate-pulse">
                <span className="block md:hidden">↓</span>
                <span className="hidden md:block">→</span>
              </div>
            </div>

            <div className="flex flex-col items-center flex-1">
              {renderMatrix(
                rotatedMatrix,
                "La Realidad Alterada",
                rotatedVisibleCells,
                true
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
