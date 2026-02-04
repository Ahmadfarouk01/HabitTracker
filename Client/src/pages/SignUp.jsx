import { useState, useContext } from "react";
import API, { setAuthToken } from "../axios/axios";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // success message
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/register", form);
      setAuthToken(res.data.token);
      login(res.data.token);

      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-80"
      >
        <h2 className="text-2xl font-bold mb-6">Sign up</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {message && <p className="text-green-500 mb-2">{message}</p>}

        <input
          className="border p-2 w-full mb-4"
          type="text"
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          className="border p-2 w-full mb-4"
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="border p-2 w-full mb-4"
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className={`py-2 w-full rounded mb-4 text-white transition 
            ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="white"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="white"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Signing up...
            </span>
          ) : (
            "Sign up"
          )}
        </button>

        <h1>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Click here
          </Link>
        </h1>
      </form>
    </div>
  );
}
