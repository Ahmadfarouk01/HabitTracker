import { useState, useContext } from "react";
import API, { setAuthToken } from "../axios/axios";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // success message
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/login", form);
      setAuthToken(res.data.token);
      login(res.data.token);

      // Show success + redirecting message
      setMessage("Login successful! Redirecting to dashboard...");
      setTimeout(() => {
        navigate("/habits"); // or '/dashboard' if you have a dashboard route
      }, 2000); // 2 seconds delay
    } catch (err) {
      setError(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-80">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {message && <p className="text-green-500 mb-2">{message}</p>}
        <input className="border p-2 w-full mb-4" type="email" placeholder="Email" name="email" value={form.email} onChange={handleChange} />
        <input className="border p-2 w-full mb-4" type="password" placeholder="Password" name="password" value={form.password} onChange={handleChange} />
        <button
          className="bg-green-500 text-white py-2 w-full rounded hover:bg-green-600 mb-4 cursor-pointer"
          disabled={message} // disable button while redirecting
        >
          Login
        </button>
        <h1>don't have an account <Link to ="/register" className="text-blue-600">clickhere</Link></h1>
      </form>
    </div>
  );
}
