import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";

export default function NavBar() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-logo">📚 LMS</Link>

      {/* 中间区块 */}
      {!token && (
        <div className="nav-buttons">
          <Link to="/login" className="btn-glass">Login</Link>
          <a
            href={`${baseUrl}/oauth2/authorize/github`}
            title="GitHub Login"
            className="btn-glass github-btn"
          >
            <img src="/github-icon.svg" alt="GitHub" className="github-icon" />
          </a>
        </div>
      )}

      {/* 登录后显示不同角色菜单 */}
      {token && user?.roles?.includes("ADMIN") && (
        <div className="nav-buttons">
          <Link to="/admin/books" className="btn-glass">Manage Books</Link>
          <Link to="/admin/members" className="btn-glass">Manage Members</Link>
          <Link to="/admin/loans" className="btn-glass">Manage Loans</Link>
        </div>
      )}
      {token && user?.roles?.includes("MEMBER") && (
        <div className="nav-buttons">
          <Link to="/member/loans" className="btn-glass">My Loans</Link>
          <Link to="/member/profile" className="btn-glass">My Profile</Link>
          <Link to="/member/qa" className="btn-glass">Support</Link>
        </div>
      )}

      {token && (
        <button onClick={handleLogout} className="btn-glass logout-btn">
          Logout
        </button>
      )}

      {/* Register 永远靠最右 */}
      {!token && (
        <Link to="/signup" className="btn-glass-green register-btn">
          Register
        </Link>
      )}
    </nav>
  );
}
