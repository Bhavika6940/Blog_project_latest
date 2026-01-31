import { useState } from "react";
import { loginUser } from "../../utils/authUtils";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await loginUser(formData.email, formData.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #2d5883, #060f24)",
      }}
    >
      <div
        className="card rounded-4 shadow-lg border-0"
        style={{
          width: "400px",
          background: "#111827",
          padding: "2rem",
        }}
      >
       
        <div className="text-center mb-4">
          <h2
            className="fw-bold mb-1"
            style={{
              color: "#22c55e",
              letterSpacing: "2px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            BLOGIFY
          </h2>
          <p className="text-gray-400 mb-0">Sign in to your account</p>
        </div>

        
        {error && (
          <div
            className="alert text-center py-2 mb-3"
            style={{
              backgroundColor: "#7f1d1d",
              color: "#fecaca",
              borderRadius: "0.5rem",
            }}
          >
            {error}
          </div>
        )}

        
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label fw-semibold text-light"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="form-control"
              style={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                color: "#f1f5f9",
                padding: "12px",
                borderRadius: "0.6rem",
                transition: "all 0.3s",
              }}
            />
          </div>

          
          <div className="mb-4">
            <label
              htmlFor="password"
              className="form-label fw-semibold text-light"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="form-control"
              style={{
                backgroundColor: "#1e293b",
                border: "1px solid #334155",
                color: "#f1f5f9",
                padding: "12px",
                borderRadius: "0.6rem",
                transition: "all 0.3s",
              }}
            />
          </div>

          
          <button
            type="submit"
            className="btn w-100 fw-bold"
            disabled={loading}
            style={{
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              color: "#fff",
              padding: "12px",
              fontSize: "1rem",
              borderRadius: "0.6rem",
              boxShadow: "0 6px 15px rgba(34,197,94,0.4)",
              transition: "all 0.3s",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        
        <div className="text-center mt-4">
          <p className="text-gray-400 mb-0" style={{ fontSize: "0.9rem" }}>
            Don't have an account?{" "}
            
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
