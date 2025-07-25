import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import AdminBookPage from "./AdminBookPage";
import AdminMemberPage from "./AdminMemberPage";
import AdminLoanPage from "./AdminLoanPage";
import "../../App.css";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <nav className="space-x-4 mb-4">
        <nav className="glass-form flex flex-wrap gap-4 p-4 mb-6 justify-center font-semibold text-white">
          <Link to="books" className="btn-glass">Manage Books</Link>
          <Link to="members" className="btn-glass">Manage Members</Link>
          <Link to="loans" className="btn-glass">Manage Loans</Link>
        </nav>
      </nav>
      <Routes>
        <Route path="books" element={<AdminBookPage />} />
        <Route path="members" element={<AdminMemberPage />} />
        <Route path="loans" element={<AdminLoanPage />} />
      </Routes>
    </div>
  )
}
