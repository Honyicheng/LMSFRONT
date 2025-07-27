// src/pages/admin/AdminEmailLogPage.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/Axios";
import "../../App.css";

export default function AdminEmailLogPage() {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchLogs();
  }, [page]);

  const fetchLogs = () => {
    axiosInstance.get(`/api/admin/email-logs?page=${page}`)
      .then(res => setLogs(res.data))
      .catch(() => console.error("Failed to load logs"));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-4">📩 Email Sending Logs</h1>
      <div className="glass-form p-4">
        {logs.length === 0 ? (
          <p className="text-blue-200">No email logs found.</p>
        ) : (
          <table className="table-glass w-full">
            <thead>
              <tr className="text-left">
                <th className="p-2">Recipient</th>
                <th className="p-2">Subject</th>
                <th className="p-2">Sent At</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id} className="border-t border-gray-600">
                  <td className="p-2">{log.recipient}</td>
                  <td className="p-2">{log.subject}</td>
                  <td className="p-2">{new Date(log.sentAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="flex justify-between mt-4">
          <button onClick={() => setPage(p => Math.max(0, p - 1))} className="btn-glass">⬅ Prev</button>
          <button onClick={() => setPage(p => p + 1)} className="btn-glass">Next ➡</button>
        </div>
      </div>
    </div>
  );
}
