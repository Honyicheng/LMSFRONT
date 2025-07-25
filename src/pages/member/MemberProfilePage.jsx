import { useEffect, useState } from "react";
import axiosInstance from "../../utils/Axios";
import { useSelector } from "react-redux"; //  关键：获取当前登录用户
import "../../App.css"; // Adjust the path as necessary
import { setUser } from "@/redux/slices/authSlice";

export default function MemberProfilePage() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const user = useSelector((state) => state.auth.user); // ✅ 关键：当前登录用户
  

  const fetchProfile = () => {
     console.log("Fetching profile for user:", user.username);
    if (!user || !user.username) return; // 确保用户已登录且有用户名
    // 获取当前用户的个人信息
    axiosInstance.get("/api/member/profile/" + user.username)
      .then(res => setForm({ ...res.data, password: "" }))
      .catch(() => alert("Failed to fetch profile"));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.put("/api/member/profile", form)
      .then(res => {
        alert("Profile updated successfully");
        dispatch(setUser(res.data));
      })
      .catch(() => alert("Failed to update profile"));
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-white">My Profile</h2>
      <form onSubmit={handleSubmit} className="glass-form space-y-4">
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          className="input"
          placeholder="Username"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="input"
          placeholder="Email"
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="input"
          placeholder="New Password (optional)"
        />
        <button type="submit" className="btn-glass">Update Profile</button>
      </form>
    </div>
  );
}
