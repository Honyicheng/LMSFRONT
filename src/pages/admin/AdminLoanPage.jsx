import { useEffect, useState } from "react";
import axiosInstance from "../../utils/Axios";
import "../../app.css"; // Adjust the path as necessary



export default function AdminLoanPage() {
  const [loans, setLoans] = useState([]);
  const [keyword, setKeyword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLoans = () => {
    setLoading(true);
    setError(null);
    axiosInstance.get("/api/admin/loans", { params: { keyword } })
      .then(res => {
        setLoans(res.data);
      })
      .catch(err => {
        console.error("Error fetching loans:", err);
        setError("Failed to load loan records.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  { loading && <p>Loading...</p> }
  { error && <p className="text-red-500">{error}</p> }

  const handleExtend = (id) => {
    axiosInstance.put(`/api/admin/loans/${id}/extend`)
    .then(fetchLoans)
    .then(fetchLoans)
    .catch(err => {
      alert("Failed to extend loan " + err.response?.data?.message || err.message);
      console.log("Error extending loan id:", id);
    });
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this loan record?")) {
      axiosInstance.delete(`/api/admin/loans/${id}`)
        .then(fetchLoans)
        .catch(err => {
          alert("Failed to delete loan: " + (err.response?.data?.message || err.message));
          console.log("Error deleting loan id:", id);
        });
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Loan Records</h2>
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search by Member"
        className="input"
      />
      <button onClick={fetchLoans} className="btn ml-2">Search</button>

      <table className="table-glass">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Member ID</th>
            <th className="p-2">Member Name</th>
            <th className="p-2">Book ID</th>
            <th className="p-2">Borrow Date</th>
            <th className="p-2">Due Date</th>
            <th className="p-2">Fine</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((l) => {
            console.log("l:", l);
            return (
              <tr key={l.id} className="border-t">
                <td className="p-2">{l.userid}</td>
                <td className="p-2">{l.username}</td>
                <td className="p-2">{l.bookId}</td>
                <td className="p-2">{l.borrowDate}</td>
                <td className="p-2">{l.dueDate}</td>
                <td className="p-2">{l.fine}</td>
                <td className="p-2">{l.returned ? "Returned" : "Borrowed"}</td>
                <td className="p-2 space-x-2">
                  <button onClick={() => handleExtend(l.id)} className="btn-glass btn-small">Extend</button>
                  <button onClick={() => handleDelete(l.id)} className="btn-glass btn-small danger">Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>

      </table>
    </div>
  );
}
