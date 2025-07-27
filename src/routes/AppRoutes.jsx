import { Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/auth/Login";
import OAuth2Redirect from "@/pages/auth/OAuth2Redirect";
import AdminBookPage from "@/pages/admin/AdminBookPage";
import AdminMemberPage from "@/pages/admin/AdminMemberPage";
import AdminLoanPage from "@/pages/admin/AdminLoanPage";
import MemberLoanPage from "@/pages/member/MemberLoanPage";
import MemberProfilePage from "@/pages/member/MemberProfilePage";
import MemberQAPage from "@/pages/member/MemberQAPage";
import MemberReviewPage from "@/pages/member/MemberReviewPage";
import MemberBorrowPage from "@/pages/member/MemberBorrowPage";
import BookDetailPage from "@/pages/public/BookDetail";
import ProtectedRoute from "@/components/ProtectedRoute";
import Signup from "@/pages/auth/Signup";
import MemberEmailReminder from "@/pages/member/MemberEmailReminder";
import AdminEmailLogPage from "@/pages/admin/AdminEmailLogPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Navigate to="/books/1" />} />
      <Route path="/books/:id" element={<BookDetailPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/oauth2/redirect" element={<OAuth2Redirect />} />
      <Route path="/register" element={<Signup />} /> 

      {/* Member Protected */}
      <Route path="/member/loans" element={<ProtectedRoute roles={['MEMBER']}><MemberLoanPage /></ProtectedRoute>} />
      <Route path="/member/profile" element={<ProtectedRoute roles={['MEMBER']}><MemberProfilePage /></ProtectedRoute>} />
      <Route path="/member/qa" element={<ProtectedRoute roles={['MEMBER']}><MemberQAPage /></ProtectedRoute>} />
      <Route path="/member/review" element={<ProtectedRoute roles={['MEMBER']}><MemberReviewPage /></ProtectedRoute>} />
      <Route path="/member/borrow" element={<ProtectedRoute roles={['MEMBER']}><MemberBorrowPage /></ProtectedRoute>} />
      <Route path="/member/email-reminders" element={<ProtectedRoute roles={['MEMBER']}><MemberEmailReminder /></ProtectedRoute>} />



      {/* Admin Protected */}
      <Route path="/admin/books" element={<ProtectedRoute roles={['ADMIN']}><AdminBookPage /></ProtectedRoute>} />
      <Route path="/admin/members" element={<ProtectedRoute roles={['ADMIN']}><AdminMemberPage /></ProtectedRoute>} />
      <Route path="/admin/loans" element={<ProtectedRoute roles={['ADMIN']}><AdminLoanPage /></ProtectedRoute>} />
      <Route path="/admin/email-logs" element={<ProtectedRoute roles={['ADMIN']}><AdminEmailLogPage /></ProtectedRoute>} />
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
