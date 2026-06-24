import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/auth/signup",
        formData
      );

      alert("Account Created Successfully");
      navigate("/login");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Signup Failed"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#eff6ff,#e0e7ff,#fdf2f8)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "white",
          padding: "40px",
          borderRadius: "30px",
          boxShadow:
            "0 20px 50px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              color: "#2563eb",
              marginBottom: "10px",
            }}
          >
            🚀 ProjectFlow
          </h1>

          <h2
            style={{
              color: "#0f172a",
            }}
          >
            Create Account
          </h2>

          <p
            style={{
              color: "#64748b",
            }}
          >
            Join your team and manage projects.
          </p>
        </div>

        <form onSubmit={handleSubmit}>          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <label>Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "14px",
                marginTop: "8px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                fontSize: "15px",
              }}
            />
          </div>

          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "14px",
                marginTop: "8px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                fontSize: "15px",
              }}
            />
          </div>

          <div
            style={{
              marginBottom: "25px",
            }}
          >
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
              style={{
                width: "100%",
                padding: "14px",
                marginTop: "8px",
                borderRadius: "12px",
                border: "1px solid #cbd5e1",
                fontSize: "15px",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "14px",
              background:
                "linear-gradient(135deg,#2563eb,#7c3aed)",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Create Account
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: "25px",
          }}
        >
          <span
            style={{
              color: "#64748b",
            }}
          >
            Already have an account?
          </span>

          <Link
            to="/login"
            style={{
              marginLeft: "8px",
              color: "#2563eb",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;