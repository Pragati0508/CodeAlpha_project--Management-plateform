import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div
      style={{
        height: "80px",
        background: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 35px",
        borderBottom: "1px solid #e2e8f0",
        boxShadow:
          "0 4px 20px rgba(0,0,0,0.04)",
      }}
    >
      {/* Left Side */}

      <div>
        <h2
          style={{
            margin: 0,
            color: "#0f172a",
            fontWeight: "700",
          }}
        >
          🚀 ProjectFlow
        </h2>

        <small
          style={{
            color: "#64748b",
          }}
        >
          Smart Project Management Platform
        </small>
      </div>

      {/* Right Side */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
        }}
      >
        {/* Notification Icon */}

        <div
          style={{
            fontSize: "22px",
            cursor: "pointer",
          }}
        >
          🔔
        </div>

        {/* User Info */}

        <div
          style={{
            textAlign: "right",
          }}
        >
          <h4
            style={{
              margin: 0,
              color: "#0f172a",
            }}
          >
            Welcome, {user?.name || "User"}
          </h4>

          <small
            style={{
              color: "#64748b",
            }}
          >
            Project Member
          </small>
        </div>

        {/* Avatar */}

        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "#2563eb",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "18px",
            boxShadow:
              "0 5px 15px rgba(37,99,235,0.3)",
          }}
        >
          {user?.name
            ? user.name.charAt(0).toUpperCase()
            : "U"}
        </div>

        {/* Logout */}

        <button
          onClick={logout}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "0.3s",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;