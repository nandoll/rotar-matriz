import { HistoryEntry } from "../hooks/useMatrixRotationWithHistory";

interface MatrixHistoryProps {
  history: HistoryEntry[];
  onSelectEntry: (entry: HistoryEntry) => void;
}

export default function MatrixHistory({
  history,
  onSelectEntry,
}: MatrixHistoryProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-sm font-bold text-green-400 mb-3 flex-shrink-0 font-mono">
        Historial ({history.length})
      </h3>
      <div
        className="space-y-2 overflow-y-auto flex-1 pr-2 custom-scrollbar"
        style={{ maxHeight: "calc(100% - 32px)" }}
      >
        {history.map((entry) => (
          <button
            key={entry.id}
            onClick={() => onSelectEntry(entry)}
            className="w-full text-left p-3 rounded-lg bg-black/50 hover:bg-green-900/20 border border-green-500/20 hover:border-green-400/50 transition-all duration-200 group"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-green-300/70 font-mono truncate group-hover:text-green-300">
                  {entry.input}
                </p>
              </div>
              <span className="text-xs text-green-500/50 ml-2 whitespace-nowrap font-mono">
                {formatDate(entry.timestamp)}
              </span>
            </div>
          </button>
        ))}
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 197, 94, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 197, 94, 0.5);
        }
      `}</style>
    </div>
  );
}
