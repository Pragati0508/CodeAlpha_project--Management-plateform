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
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
  });

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

  const chartData = [
    {
      name: "Completed",
      value: stats.completedTasks,
    },
    {
      name: "Pending",
      value: stats.pendingTasks,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#f97316",
  ];

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div
          style={{
            flex: 1,
            padding: "30px",
            background:
              "linear-gradient(135deg,#f8fafc,#dbeafe)",
            minHeight: "100vh",
          }}
        >
          {/* Hero */}

          <div
            style={{
              background:
                "linear-gradient(135deg,#2563eb,#7c3aed)",
              padding: "35px",
              borderRadius: "25px",
              color: "white",
              marginBottom: "30px",
              boxShadow:
                "0 15px 35px rgba(37,99,235,0.25)",
            }}
          >
            <h1>🚀 Welcome Back</h1>

            <p>
              Manage your projects and team
              efficiently from one dashboard.
            </p>
          </div>

          {/* Stats */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(220px,1fr))",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                background:
                  "linear-gradient(135deg,#2563eb,#3b82f6)",
                color: "white",
                borderRadius: "20px",
                padding: "25px",
              }}
            >
              <h3>📁 Projects</h3>
              <h1>{stats.totalProjects}</h1>
            </div>

            <div
              style={{
                background:
                  "linear-gradient(135deg,#7c3aed,#8b5cf6)",
                color: "white",
                borderRadius: "20px",
                padding: "25px",
              }}
            >
              <h3>📋 Tasks</h3>
              <h1>{stats.totalTasks}</h1>
            </div>

            <div
              style={{
                background:
                  "linear-gradient(135deg,#16a34a,#22c55e)",
                color: "white",
                borderRadius: "20px",
                padding: "25px",
              }}
            >
              <h3>✅ Completed</h3>
              <h1>{stats.completedTasks}</h1>
            </div>

            <div
              style={{
                background:
                  "linear-gradient(135deg,#ea580c,#f97316)",
                color: "white",
                borderRadius: "20px",
                padding: "25px",
              }}
            >
              <h3>⏳ Pending</h3>
              <h1>{stats.pendingTasks}</h1>
            </div>
          </div>
                    {/* Analytics Chart */}

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "20px",
              marginBottom: "25px",
              boxShadow:
                "0 10px 25px rgba(0,0,0,0.06)",
            }}
          >
            <h2
              style={{
                marginBottom: "20px",
              }}
            >
              📊 Task Analytics
            </h2>

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <div>
                <h3>
                  Completion Rate
                </h3>

                <h1
                  style={{
                    color: "#2563eb",
                    fontSize: "50px",
                  }}
                >
                  {stats.totalTasks > 0
                    ? Math.round(
                        (stats.completedTasks /
                          stats.totalTasks) *
                          100
                      )
                    : 0}
                  %
                </h1>

                <p
                  style={{
                    color: "#64748b",
                  }}
                >
                  Tasks completed
                  successfully
                </p>
              </div>

              <div
                style={{
                  width: "350px",
                  height: "250px",
                }}
              >
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      outerRadius={90}
                      label
                    >
                      {chartData.map(
                        (
                          entry,
                          index
                        ) => (
                          <Cell
                            key={index}
                            fill={
                              COLORS[
                                index
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
            </div>
          </div>

          {/* Overview */}

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "20px",
              marginBottom: "20px",
              boxShadow:
                "0 10px 25px rgba(0,0,0,0.06)",
            }}
          >
            <h2>
              🚀 ProjectFlow Overview
            </h2>

            <p
              style={{
                color: "#475569",
                lineHeight: "1.8",
              }}
            >
              ProjectFlow helps
              teams manage
              projects, assign
              tasks, collaborate
              in real time, chat
              with team members
              and track progress
              through analytics.
            </p>
          </div>

          {/* Activity */}

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "20px",
              marginBottom: "20px",
              boxShadow:
                "0 10px 25px rgba(0,0,0,0.06)",
            }}
          >
            <h2>
              📈 Activity Summary
            </h2>

            <ul
              style={{
                lineHeight: "2",
                color: "#475569",
              }}
            >
              <li>
                📁 Projects:
                {" "}
                {
                  stats.totalProjects
                }
              </li>

              <li>
                📋 Tasks:
                {" "}
                {
                  stats.totalTasks
                }
              </li>

              <li>
                ✅ Completed:
                {" "}
                {
                  stats.completedTasks
                }
              </li>

              <li>
                ⏳ Pending:
                {" "}
                {
                  stats.pendingTasks
                }
              </li>
            </ul>
          </div>

          {/* Features */}

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "20px",
              boxShadow:
                "0 10px 25px rgba(0,0,0,0.06)",
            }}
          >
            <h2>
              🌟 Features
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(220px,1fr))",
                gap: "15px",
                marginTop: "15px",
              }}
            >
              <div>
                🔐 Authentication
              </div>

              <div>
                📁 Project
                Management
              </div>

              <div>
                📋 Task
                Assignment
              </div>

              <div>
                📅 Due Dates
              </div>

              <div>
                💬 Team Chat
              </div>

              <div>
                🔔 Notifications
              </div>

              <div>
                📊 Analytics
              </div>

              <div>
                📌 Kanban Board
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Dashboard;