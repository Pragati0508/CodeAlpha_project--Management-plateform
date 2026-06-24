import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "22px",
        boxShadow:
          "0 8px 25px rgba(0,0,0,0.08)",
        transition: "0.3s",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "260px",
      }}
    >
      {/* Header */}

      <div>
        <h2
          style={{
            color: "#0f172a",
            marginBottom: "10px",
          }}
        >
          📁 {project.title}
        </h2>

        <p
          style={{
            color: "#64748b",
            lineHeight: "1.6",
            minHeight: "60px",
          }}
        >
          {project.description}
        </p>
      </div>

      {/* Project Info */}

      <div
        style={{
          marginTop: "15px",
          marginBottom: "20px",
        }}
      >
        <p>
          👤 <strong>Owner:</strong>{" "}
          {project.owner?.name || "Unknown"}
        </p>

        <p>
          👥 <strong>Members:</strong>{" "}
          {project.members?.length || 0}
        </p>
      </div>

      {/* Buttons */}

      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          onClick={() =>
            navigate(`/project/${project._id}`)
          }
          style={{
            flex: 1,
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          🚀 Open Board
        </button>

        <button
          onClick={() =>
            onDelete(project._id)
          }
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "12px 18px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;