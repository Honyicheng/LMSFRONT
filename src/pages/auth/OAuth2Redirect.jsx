import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "@/redux/slices/authSlice";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export default function OAuth2Redirect() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    //const token = params.get("token")?.replace("Bearer ", "");
    console.log("token from redirect", token);

    if (token) {
      dispatch(setToken(token));
      localStorage.setItem("token", token);

      axios
        .get(`${BASE_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          dispatch(setUser(res.data));
          const roles = res.data.roles || [];

          // ✅ 根据角色跳转
          if (roles.includes("ROLE_ADMIN")) {
            navigate("/admin");
          } else if (roles.includes("ROLE_MEMBER")) {
            navigate("/member");
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          console.error("Fetching user failed:", err);
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, [location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900">
      <div className="glass-form p-6 rounded-lg shadow-lg text-center">
        <p className="text-white text-xl font-semibold">Logging you in...</p>
      </div>
    </div>
  );
}
