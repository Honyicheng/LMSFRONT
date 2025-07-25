import { useEffect, useState } from "react";
import axiosInstance from "../../utils/Axios";
import "../../App.css";

export default function MemberBorrowPage() {
  const [loans, setLoans] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [blockedReason, setBlockedReason] = useState("");
  const [daysLeft, setDaysLeft] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);

  const fetchLoansAndBooks = async () => {
    try {
      const [loanRes, bookRes] = await Promise.all([
        axiosInstance.get("/api/member/loans"),
        axiosInstance.get("/api/public/books"),
      ]);
      setLoans(loanRes.data);
      setBooks(bookRes.data);
      evaluateBorrowEligibility(loanRes.data);
    } catch (err) {
      console.error("Failed to load data", err);
    }
  };

  const evaluateBorrowEligibility = (loanData) => {
    const activeLoans = loanData.filter((loan) => !loan.returned);
    const overdueLoans = activeLoans.filter(
      (loan) => new Date(loan.dueDate) < new Date()
    );

    // 会员到期判断（从任意 loan 中获取 member 信息）
    if (loanData.length > 0 && loanData[0].member?.membershipDate) {
      const expireDate = new Date(loanData[0].member.membershipDate);
      expireDate.setFullYear(expireDate.getFullYear() + 1);
      const now = new Date();
      const diff = Math.floor((expireDate - now) / (1000 * 60 * 60 * 24));
      setDaysLeft(diff >= 0 ? diff : 0);

      if (diff < 0) {
        setBlockedReason("❌ Your membership has expired.");
        setIsBlocked(true);
        return;
      }
    }

    if (overdueLoans.length > 0) {
      setBlockedReason("❌ You have overdue books.");
      setIsBlocked(true);
    } else if (activeLoans.length >= 3) {
      setBlockedReason("❌ You cannot borrow more than 3 books.");
      setIsBlocked(true);
    } else {
      setBlockedReason("");
      setIsBlocked(false);
    }
  };

  const handleBorrow = async (e) => {
    e.preventDefault();
    if (!selectedBookId) return;
    try {
      await axiosInstance.post("/api/member/loans", null, {
        params: { bookId: selectedBookId },
      });
      alert("Book borrowed successfully!");
      setSelectedBookId("");
      fetchLoansAndBooks();
    } catch (err) {
      console.error("Failed to borrow book", err);
      const msg = err.response?.data || "Borrowing failed.";
      alert("Error: " + msg);
    }
  };

  useEffect(() => {
    fetchLoansAndBooks();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-white mb-4">📚 Borrow a Book</h2>

      {blockedReason ? (
        <p className="text-red-400 mb-4 font-semibold">{blockedReason}</p>
      ) : (
        <p className="text-green-300 mb-4 font-medium">
          ✅ You are eligible to borrow. Remaining days: <b>{daysLeft}</b>
        </p>
      )}

      <form onSubmit={handleBorrow} className="glass-form space-y-3 mb-6">
        <select
          value={selectedBookId}
          onChange={(e) => setSelectedBookId(e.target.value)}
          className="input dark-select"
          required
          disabled={isBlocked}
        >
          <option value="">-- Select a Book --</option>
          {books.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="btn-glass"
          disabled={isBlocked || !selectedBookId}
        >
          Borrow
        </button>
      </form>

      <div className="glass-form p-4">
        <h3 className="text-white font-semibold mb-2">📖 My Current Loans</h3>
        {loans.length === 0 ? (
          <p className="text-blue-100">No current loans.</p>
        ) : (
          <ul className="text-white space-y-2">
            {loans.map((loan) => (
              <li key={loan.id}>
                <strong>{loan.book?.title}</strong> - Due: {loan.dueDate}{" "}
                {loan.returned ? "(Returned)" : ""}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
