import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import BookList from "./pages/public/BookList";
import BookDetail from "./pages/public/BookDetail";
import Login from "./pages/auth/Login";
import Logout from "./pages/auth/Logout";
import OAuth2Redirect from "./pages/auth/OAuth2Redirect";
import AdminDashboard from "./pages/admin/AdminDashboard";
import MemberDashboard from "./pages/member/MemberDashboard";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <NavBar />  {/* ← add this */}
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/oauth2/redirect" element={<OAuth2Redirect />} />
        <Route
          path="/books/:id"
          element={<BookDetail />}
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/member/*"
          element={
            <ProtectedRoute role="MEMBER">
              <MemberDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
