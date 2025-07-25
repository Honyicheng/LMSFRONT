import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "@/redux/slices/authSlice";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const doLogout = async () => {
      try {
        await axios.delete(`${BASE_URL}/api/auth/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (err) {
        console.warn("Logout API failed:", err);
      } finally {
        dispatch(logout());
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    doLogout();
  }, [dispatch, navigate, token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900">
      <div className="glass-form p-6 rounded-lg shadow-lg text-center">
        <p className="text-white text-xl font-semibold">Logging out...</p>
      </div>
    </div>
  );
}

