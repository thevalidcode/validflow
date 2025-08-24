import { useEffect, useState } from "react";
import { api, ErrorLog } from "../lib/api";
import { Loader2, X, RefreshCw } from "lucide-react";

type Props = { onClose: () => void };

export default function ErrorLogs({ onClose }: Props) {
  const [logs, setLogs] = useState<ErrorLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = () => {
    setLoading(true);
    api
      .listErrorLogs()
      .then((data) => setLogs(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center p-4 overflow-auto">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-[0_12px_24px_rgba(0,0,0,0.15)] p-6 relative">
        {/* Close Button */}
        <button
          type="button"
          title="close"
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-yellow-900">Error Logs</h2>
          <button
            type="button"
            onClick={fetchLogs}
            className="flex mr-12 items-center gap-2 bg-yellow-300 text-yellow-900 font-semibold px-4 py-2 rounded-xl shadow-[6px_6px_12px_#d6b54c,-6px_-6px_12px_#ffffd4] hover:scale-105 transition-transform"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center h-60 text-gray-500">
            <Loader2 className="animate-spin mr-2" /> Loading logs...
          </div>
        ) : logs.length === 0 ? (
          <div className="text-gray-500 text-center py-20">
            No error logs found
          </div>
        ) : (
          <div className="max-h-[500px] overflow-auto border border-gray-200 rounded-lg shadow-inner">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-yellow-100 sticky top-0 z-10">
                <tr>
                  <th className="p-2 text-left font-semibold">Timestamp</th>
                  <th className="p-2 text-left font-semibold">Error Name</th>
                  <th className="p-2 text-left font-semibold">Category</th>
                  <th className="p-2 text-left font-semibold">Message</th>
                  <th className="p-2 text-left font-semibold">File Path</th>
                  <th className="p-2 text-left font-semibold">Stack Trace</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-t hover:bg-yellow-50 transition-colors"
                  >
                    <td className="p-2">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="p-2">{log.error_name}</td>
                    <td className="p-2 capitalize">{log.category}</td>
                    <td
                      className="p-2 truncate max-w-[200px]"
                      title={log.message || ""}
                    >
                      {log.message || ""}
                    </td>
                    <td
                      className="p-2 truncate max-w-[200px]"
                      title={log.file_path || ""}
                    >
                      {log.file_path || ""}
                    </td>
                    <td
                      className="p-2 truncate max-w-[200px]"
                      title={log.stack_trace || ""}
                    >
                      {log.stack_trace || ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
