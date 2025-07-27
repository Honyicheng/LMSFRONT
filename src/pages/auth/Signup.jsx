import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../index.css";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${BASE_URL}/api/auth/signup`, form)
      .then(() => {
        setSuccess(true);
        setForm({ username: "", email: "", password: "" }); // Clear fields
      })
      .catch(() => alert("Registration failed"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900">
      <form onSubmit={handleSubmit} className="glass-form w-full max-w-md p-6 rounded space-y-4">
        <h2 className="text-2xl font-bold text-center text-white">Create an Account</h2>

        {success && (
          <p className="text-green-300 text-center">
            ✅ Registration successful!{" "}
            <Link to="/login" className="underline text-blue-200">Go to Login</Link>
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
          <Link to="/login" className="underline text-blue-200">Log in here</Link>
        </p>
      </form>
    </div>
  );
}



// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     // Step 1: Register
//     await axios.post(`${BASE_URL}/api/auth/signup`, form);

//     // Step 2: Login
//     const loginRes = await axios.post(`${BASE_URL}/api/auth/login`, {
//       username: form.username,
//       password: form.password
//     });

//     const token = loginRes.data.access_token;
//     localStorage.setItem("token", token);

//     // Optional: Fetch user info
//     const userRes = await axios.get(`${BASE_URL}/api/auth/me`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     // Store in Redux (optional)
//     // dispatch(setToken(token));
//     // dispatch(setUser(userRes.data));

//     // Step 3: Redirect
//     window.location.href = "/member/loans";
//   } catch (err) {
//     console.error("Signup or auto-login failed:", err);
//     alert("Registration or auto-login failed");
//   }
// };

// import { useTranslation } from "react-i18next";
// import "../../i18n";

// export default function Signup() {
//   const { t, i18n } = useTranslation();

//   const toggleLang = () => {
//     i18n.changeLanguage(i18n.language === "en" ? "zh" : "en");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="glass-form">
//       <h2>{t("register_title")}</h2>

//       <input name="username" placeholder={t("username")} />
//       <input name="email" placeholder={t("email")} />
//       <input name="password" placeholder={t("password")} />
//       <button type="submit">{t("register")}</button>

//       <p>{t("already_have_account")} <Link to="/login">{t("login_here")}</Link></p>

//       <button type="button" onClick={toggleLang} className="text-sm text-blue-200 underline">
//         Switch to {i18n.language === "en" ? "中文" : "English"}
//       </button>
//     </form>
//   );
// }