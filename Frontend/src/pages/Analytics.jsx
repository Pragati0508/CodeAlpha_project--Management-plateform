import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const Analytics = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/dashboard/stats");
      setStats(res.data.stats);
    } catch (error) {
      console.log(error);
    }
  };

  const taskData = [
    {
      name: "Completed",
      value: stats.completedTasks || 0,
    },
    {
      name: "Pending",
      value: stats.pendingTasks || 0,
    },
  ];

  const projectData = [
    {
      name: "Projects",
      value: stats.totalProjects || 0,
    },
    {
      name: "Tasks",
      value: stats.totalTasks || 0,
    },
  ];

  const COLORS = ["#22c55e", "#f97316"];

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div
          style={{
            flex: 1,
            padding: "30px",
            background: "#f1f5f9",
            minHeight: "100vh",
          }}
        >
          <h1
            style={{
              marginBottom: "25px",
              color: "#0f172a",
            }}
          >
            📈 Analytics Dashboard
          </h1>

          {/* Stats Cards */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <div className="stat-card">
              <h3>📁 Projects</h3>
              <h1>{stats.totalProjects}</h1>
            </div>

            <div className="stat-card">
              <h3>📋 Tasks</h3>
              <h1>{stats.totalTasks}</h1>
            </div>

            <div className="stat-card">
              <h3>✅ Completed</h3>
              <h1>{stats.completedTasks}</h1>
            </div>

            <div className="stat-card">
              <h3>⏳ Pending</h3>
              <h1>{stats.pendingTasks}</h1>
            </div>
          </div>

          {/* Charts */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(400px,1fr))",
              gap: "25px",
            }}
          >
            {/* Pie Chart */}

            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "20px",
                boxShadow:
                  "0 6px 20px rgba(0,0,0,0.08)",
              }}
            >
              <h2>Task Status</h2>

              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <PieChart>
                  <Pie
                    data={taskData}
                    dataKey="value"
                    outerRadius={100}
                    label
                  >
                    {taskData.map(
                      (entry, index) => (
                        <Cell
                          key={index}
                          fill={
                            COLORS[
                              index %
                                COLORS.length
                            ]
                          }
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart */}

            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "20px",
                boxShadow:
                  "0 6px 20px rgba(0,0,0,0.08)",
              }}
            >
              <h2>Projects vs Tasks</h2>

              <ResponsiveContainer
                width="100%"
                height={300}
              >
                <BarChart data={projectData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                    fill="#2563eb"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Summary */}

          <div
            style={{
              marginTop: "30px",
              background: "white",
              padding: "25px",
              borderRadius: "20px",
              boxShadow:
                "0 6px 20px rgba(0,0,0,0.08)",
            }}
          >
            <h2>📊 Performance Summary</h2>

            <p>
              Completion Rate:
              <strong>
                {" "}
                {stats.completionRate || 0}%
              </strong>
            </p>

            <p>
              High Priority Tasks:
              <strong>
                {" "}
                {stats.highPriorityTasks || 0}
              </strong>
            </p>

            <p>
              In Progress Tasks:
              <strong>
                {" "}
                {stats.inProgressTasks || 0}
              </strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;