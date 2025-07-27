// src/pages/member/MemberEmailReminder.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/Axios";
import "../../App.css";

export default function MemberEmailReminder() {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    axiosInstance.get("/api/member/email-reminders")
      .then(res => setReminders(res.data))
      .catch(() => console.error("Failed to fetch reminders"));
  }, []);

  return (
    <div className="glass-form p-4 mb-6">
      <h2 className="text-xl font-bold text-white mb-4">📧 Your Email Reminders</h2>
      {reminders.length === 0 ? (
        <p className="text-blue-200">No reminders found.</p>
      ) : (
        <ul className="text-white space-y-3">
          {reminders.map((r) => (
            <li key={r.id} className="border-b border-gray-600 pb-2">
              <p><strong>{r.subject}</strong></p>
              <p className="text-sm">{r.content}</p>
              <p className="text-xs text-blue-300">📅 {new Date(r.sentAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
