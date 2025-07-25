import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, {
        username,
        password,
      });

      const { token, id, username: userName, email, roles } = res.data;
      const roleList = roles.map((r) => r.authority);

      dispatch(setToken(token));
      dispatch(setUser({ id, username: userName, email, roles: roleList }));
      localStorage.setItem("token", token);

      if (roleList.includes("ROLE_ADMIN")) {
        navigate("/admin");
      } else if (roleList.includes("ROLE_MEMBER")) {
        navigate("/member");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login failed", err);
      alert("Login failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900">
      <div className="glass-form max-w-md w-full p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">🔐 Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
          <div className="text-center">
            <button
              type="submit"
              className="btn-glass px-6 py-2"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

