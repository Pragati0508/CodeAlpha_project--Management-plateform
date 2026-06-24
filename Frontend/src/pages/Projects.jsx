import { useEffect, useState } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProjectCard from "../components/ProjectCard";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await API.get("/projects/all");
      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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
        "/projects/create",
        formData
      );

      setFormData({
        title: "",
        description: "",
      });

      fetchProjects();

      alert("✅ Project Created Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProject = async (id) => {
    try {
      await API.delete(`/projects/${id}`);

      fetchProjects();

      alert("🗑️ Project Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          display: "flex",
        }}
      >
        <Sidebar />

        <div
          style={{
            flex: 1,
            padding: "30px",
            background: "#f1f5f9",
            minHeight: "100vh",
          }}
        >
          {/* Header */}

          <div
            style={{
              marginBottom: "30px",
            }}
          >
            <h1
              style={{
                fontSize: "35px",
                color: "#0f172a",
              }}
            >
              📁 Project Management
            </h1>

            <p
              style={{
                color: "#64748b",
                marginTop: "8px",
              }}
            >
              Create and manage projects
              efficiently.
            </p>
          </div>

          {/* Create Project Card */}

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "20px",
              boxShadow:
                "0 6px 20px rgba(0,0,0,0.08)",
              marginBottom: "30px",
            }}
          >
            <h2
              style={{
                marginBottom: "20px",
              }}
            >
              🚀 Create New Project
            </h2>

            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <input
                type="text"
                name="title"
                placeholder="Project Title"
                value={formData.title}
                onChange={handleChange}
                required
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  border:
                    "1px solid #cbd5e1",
                }}
              />

              <input
                type="text"
                name="description"
                placeholder="Project Description"
                value={formData.description}
                onChange={handleChange}
                required
                style={{
                  padding: "12px",
                  borderRadius: "10px",
                  border:
                    "1px solid #cbd5e1",
                }}
              />

              <button
                type="submit"
                style={{
                  background: "#2563eb",
                  color: "white",
                  padding: "12px",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Create Project
              </button>
            </form>
          </div>

          {/* Project Count */}

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "20px",
              marginBottom: "25px",
              boxShadow:
                "0 6px 20px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                color: "#2563eb",
              }}
            >
              📊 Total Projects :
              {projects.length}
            </h2>
          </div>

          {/* Projects Grid */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(300px,1fr))",
              gap: "20px",
            }}
          >
            {projects.length > 0 ? (
              projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  onDelete={deleteProject}
                />
              ))
            ) : (
              <div
                style={{
                  background: "white",
                  padding: "30px",
                  borderRadius: "20px",
                  boxShadow:
                    "0 6px 20px rgba(0,0,0,0.08)",
                }}
              >
                <h3>No Projects Found</h3>

                <p>
                  Create your first project
                  to start managing tasks.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;