import { Matrix } from "@/types/matrix";

interface MatrixDisplayProps {
  matrix: Matrix<number> | null;
  title: string;
}

export default function MatrixDisplay({ matrix, title }: MatrixDisplayProps) {
  if (!matrix) {
    return null;
  }

  return (
    <div className="mb-4">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <div className="border rounded p-4 bg-gray-50">
        <div className="grid grid-cols-1 gap-1">
          {matrix.map((row, rowIndex) => (
            <div key={rowIndex} className="flex space-x-2">
              {row.map((cell, cellIndex) => (
                <div
                  key={`${rowIndex}-${cellIndex}`}
                  title={cell.toString()}
                  className="w-10 h-10 flex items-center justify-center border bg-white overflow-hidden"
                >
                  <span className="truncate text-center w-full px-1">
                    {cell}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
