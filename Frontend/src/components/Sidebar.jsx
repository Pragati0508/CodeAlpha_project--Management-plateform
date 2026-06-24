import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menuStyle = (path) => ({
    color:
      location.pathname === path
        ? "#0f172a"
        : "#e2e8f0",

    textDecoration: "none",

    padding: "14px 18px",

    borderRadius: "14px",

    background:
      location.pathname === path
        ? "#f8fafc"
        : "transparent",

    fontWeight: "600",

    transition: "all 0.3s ease",

    display: "flex",

    alignItems: "center",

    gap: "10px",
  });

  return (
    <div
      style={{
        width: "260px",

        minHeight: "100vh",

        background:
          "linear-gradient(180deg,#0f172a,#1e293b)",

        color: "white",

        padding: "25px 18px",

        boxShadow:
          "6px 0 25px rgba(0,0,0,0.15)",

        position: "sticky",

        top: 0,
      }}
    >
      {/* Logo */}

      <div
        style={{
          textAlign: "center",

          marginBottom: "40px",
        }}
      >
        <h1
          style={{
            color: "#38bdf8",

            marginBottom: "5px",
          }}
        >
          🚀 ProjectFlow
        </h1>

        <p
          style={{
            color: "#94a3b8",

            fontSize: "13px",
          }}
        >
          Project Management Suite
        </p>
      </div>

      {/* Menu */}

      <div
        style={{
          display: "flex",

          flexDirection: "column",

          gap: "12px",
        }}
      >
        <Link to="/" style={menuStyle("/")}>
          📊 Dashboard
        </Link>

        <Link
          to="/projects"
          style={menuStyle("/projects")}
        >
          📁 Projects
        </Link>

        <Link
          to="/tasks"
          style={menuStyle("/tasks")}
        >
          📋 Tasks
        </Link>

        <Link
          to="/chat"
          style={menuStyle("/chat")}
        >
          💬 Team Chat
        </Link>

        <Link
          to="/team"
          style={menuStyle("/team")}
        >
          👥 Team Members
        </Link>

        <Link
          to="/analytics"
          style={menuStyle("/analytics")}
        >
          📈 Analytics
        </Link>

        <Link
          to="/notifications"
          style={menuStyle("/notifications")}
        >
          🔔 Notifications
        </Link>

        <Link
          to="/settings"
          style={menuStyle("/settings")}
        >
          ⚙ Settings
        </Link>
      </div>

      {/* Footer */}

      <div
        style={{
          position: "absolute",

          bottom: "25px",

          left: "20px",

          right: "20px",

          background: "#1e293b",

          borderRadius: "15px",

          padding: "15px",

          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "13px",

            color: "#cbd5e1",
          }}
        >
          ProjectFlow v1.0
        </p>
      </div>
    </div>
  );
};

export default Sidebar;