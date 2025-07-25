import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import MemberReview from "./MemberReviewPage";
import MemberLoanPage from "./MemberLoanPage";
import MemberProfile from "./MemberProfilePage";
import MemberQnA from "./MemberQAPage";
import MemberBorrowPage from "./MemberBorrowPage";
import "../../app.css"; // Adjust if necessary

export default function MemberDashboard() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="relative p-6">
      {/* ✅ 右上角显示 */}
      <div className="absolute top-4 right-6 text-white text-sm font-medium">
        {user?.username && <>👤 {user.username}</>}
      </div>

      <h1 className="text-2xl font-bold mb-6 text-white">Member Dashboard</h1>

      <nav className="glass-form flex flex-wrap gap-4 p-4 mb-6 justify-center font-semibold text-white">
        <Link to="loans" className="btn-glass">My Loans</Link>
        <Link to="borrow" className="btn-glass">Borrow</Link>
        <Link to="profile" className="btn-glass">My Profile</Link>
        <Link to="qa" className="btn-glass">Support</Link>
        <Link to="review" className="btn-glass">My Reviews</Link>
      </nav>

      <div className="glass-form p-4">
        <Routes>
          <Route path="loans" element={<MemberLoanPage />} />
          <Route path="borrow" element={<MemberBorrowPage />} />
          <Route path="profile" element={<MemberProfile />} />
          <Route path="qa" element={<MemberQnA />} />
          <Route path="review" element={<MemberReview />} />
        </Routes>
      </div>
    </div>
  );
}