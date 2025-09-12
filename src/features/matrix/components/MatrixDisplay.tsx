import { Matrix } from "@/domain/matrix";

interface MatrixDisplayProps {
  matrix: Matrix<number> | null;
  title: string;
}

export default function MatrixDisplay({ matrix, title }: MatrixDisplayProps) {
  if (!matrix) {
    return null;
  }

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-200">
        {title}
      </h3>
      <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div
          className="grid gap-1"
          // style={{
          //   gridTemplateColumns: `repeat(${matrix.length}, minmax(0, 1fr))`,
          // }}
        >
          {matrix.map((row, rowIndex) => (
            <div key={rowIndex} className="flex space-x-1">
              {row.map((cell, cellIndex) => (
                <div
                  key={`${rowIndex}-${cellIndex}`}
                  title={cell.toString()}
                  className="w-12 h-12 flex items-center justify-center border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 overflow-hidden"
                >
                  <span className="truncate text-center w-full px-1 text-gray-800 dark:text-gray-200">
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
