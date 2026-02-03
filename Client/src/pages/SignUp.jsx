import { useState, useContext } from "react";
import API, { setAuthToken } from "../axios/axios";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // success message
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/register", form);
      setAuthToken(res.data.token);
      login(res.data.token);

      // Show success + redirect message
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000); // 2 seconds delay
    } catch (err) {
      setError(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-80">
        <h2 className="text-2xl font-bold mb-6">Sign up</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {message && <p className="text-green-500 mb-2">{message}</p>}
        <input className="border p-2 w-full mb-4" type="text" placeholder="Name" name="name" value={form.name} onChange={handleChange} />
        <input className="border p-2 w-full mb-4" type="email" placeholder="Email" name="email" value={form.email} onChange={handleChange} />
        <input className="border p-2 w-full mb-4" type="password" placeholder="Password" name="password" value={form.password} onChange={handleChange} />
        <button
          className="bg-blue-500 text-white py-2 w-full rounded hover:bg-blue-600 mb-4 cursor-pointer"
          disabled={message} // disable button while redirecting
        >
          Sign up
        </button>
        <h1>already have an account <Link to ="/login" className="text-blue-600">clickhere</Link></h1>
      </form>
    </div>
  );
}
