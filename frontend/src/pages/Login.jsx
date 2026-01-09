import { useState } from "react";
import { loginUser } from "../utils/authUtils";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] =  useState({
        email: "",
        password : ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name] : e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try{
            await loginUser(formData.email, formData.password);
            navigate("/dashboard");
        }
        catch(err){
            setError(err.response?.data?.message || "Login failed");
        }
        finally{
            setLoading(false);
        }
    }
    return (
  <div
    className="d-flex justify-content-center align-items-center vh-100"
    style={{
      background: "linear-gradient(135deg, #363e5eff, #0f172a)"
    }}
  >
    <div
      className="card border-0 shadow-lg rounded-4"
      style={{
        width: "380px",
        backgroundColor: "#020617"
      }}
    >
      <div className="card-body p-4">

        {/* Brand */}
        <h3
          className="text-center fw-bold mb-1"
          style={{ color: "#87c522ff", letterSpacing: "1px" }}
        >
          BLOGIFY
        </h3>
        <p className="text-center text-secondary mb-4">
          Sign in to continue
        </p>

        {/* Error */}
        {error && (
          <div
            className="alert py-2 text-center"
            style={{
              backgroundColor: "#7f1d1d",
              color: "#fecaca",
              border: "1px solid #991b1b"
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-light">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                color: "#e5e7eb",
                padding: "10px 12px"
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="form-label fw-semibold text-light">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                color: "#e5e7eb",
                padding: "10px 12px"
              }}
            />
          </div>

          {/* Button */}
          <button
            className="btn w-100 fw-semibold"
            type="submit"
            disabled={loading}
            style={{
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              border: "none",
              padding: "10px",
              color: "white"
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

      </div>
    </div>
  </div>
);


};

export default Login;