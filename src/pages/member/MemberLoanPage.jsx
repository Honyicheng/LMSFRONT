import { useEffect, useState } from "react";
import axiosInstance from "../../utils/Axios";

export default function MemberLoanPage() {
  const [loans, setLoans] = useState([]);

  const fetchLoans = () => {
    axiosInstance.get("/api/member/loans")
      .then(res => setLoans(res.data))
      .catch(() => alert("Failed to fetch loan records."));
  };

  const handleReturn = (id) => {
    if (confirm("Confirm to return this book?")) {
      axiosInstance.put(`/api/member/loans/${id}/return`).then(fetchLoans);
    }
  };

  const handleExtend = (id) => {
    axiosInstance.put(`/api/member/loans/${id}/extend`)
      .then(fetchLoans)
      .catch(() => alert("Failed to renew. Please check eligibility."));
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-white">My Borrowing Records</h2>
      <div className="glass-form overflow-x-auto">
        <table className="table-glass w-full">
          <thead>
            <tr>
              <th>Book ID</th>
              <th>Borrow Date</th>
              <th>Due Date</th>
              <th>Fine</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map(loan => (
              <tr key={loan.id}>
                <td>{loan.id}</td>
                <td>{loan.borrowDate}</td>
                <td>{loan.dueDate}</td>
                <td>${loan.fine?.toFixed(2)}</td>
                <td>{loan.returned ? "Returned" : "Borrowing"}</td>
                <td>
                  {!loan.returned && (
                    <div className="flex gap-2">
                      <button onClick={() => handleReturn(loan.id)} className="btn-glass text-sm">Return</button>
                      <button onClick={() => handleExtend(loan.id)} className="btn-glass text-sm">Renew</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
