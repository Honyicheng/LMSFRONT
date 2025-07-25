import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${BASE_URL}/api/auth/signup`, form)
      .then(() => setSuccess(true))
      .catch(() => alert("注册失败"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900">
      <form onSubmit={handleSubmit} className="glass-form w-full max-w-md p-6 rounded space-y-4">
        <h2 className="text-2xl font-bold text-center text-white">Register New Account</h2>

        {success && (
          <p className="text-green-300 text-center">
            ✅ Registration successful!{" "}
            <Link to="/login" className="underline text-blue-200">Go to login</Link>
          </p>
        )}

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
          type="email"
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
          placeholder="Password"
          required
        />

        <button type="submit" className="btn-glass w-full">Register</button>
        <p className="text-white text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline text-blue-200">Login here</Link>
        </p>
      </form>
    </div>
  );
}
