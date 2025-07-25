// src/pages/admin/AdminMemberPage.jsx
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/Axios";
import "../../App.css";

export default function AdminMemberPage() {
  const [members, setMembers] = useState([]);
  const [keyword, setKeyword] = useState("");

  const fetchMembers = () => {
    axiosInstance
      .get("/api/admin/members", { params: { keyword } })
      .then((res) => setMembers(res.data));
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this member?")) {
      axiosInstance.delete("/api/admin/members/" + id).then(fetchMembers);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-white">Member Management</h2>

      <div className="flex items-center gap-2 mb-4">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search by name"
          className="input"
        />
        <button onClick={fetchMembers} className="btn-glass">
          Search
        </button>
      </div>

      <table className="table-glass">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id}>
              <td>{m.username}</td>
              <td>{m.email}</td>
              <td>
                {Array.isArray(m.roles)
                  ? m.roles.map((r) => r.name).join(", ")
                  : m.role?.name || "N/A"}
              </td>
              <td>
                <button
                  onClick={() => alert("Edit feature not implemented yet")}
                  className="btn-glass btn-small"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="btn-glass btn-small danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

