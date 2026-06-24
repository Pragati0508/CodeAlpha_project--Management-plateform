
import { useEffect, useState } from "react";
import API from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const [search, setSearch] =
    useState("");

  const [statusFilter,
    setStatusFilter] =
    useState("All");

  const [priorityFilter,
    setPriorityFilter] =
    useState("All");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get(
        "/tasks/all"
      );

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status === "Done"
    ).length;

  const pendingTasks =
    tasks.filter(
      (task) =>
        task.status !== "Done"
    ).length;

  const highPriorityTasks =
    tasks.filter(
      (task) =>
        task.priority === "High"
    ).length;

  const filteredTasks =
    tasks.filter((task) => {

      const matchesSearch =
        task.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "All" ||
        task.status ===
          statusFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        task.priority ===
          priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });

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
            background:
              "linear-gradient(135deg,#fefce8,#eff6ff)",
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
            <h1>
              📋 Task Workspace
            </h1>

            <p>
              Manage, search and
              track all project
              tasks.
            </p>
          </div>

          {/* Stats */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(240px,1fr))",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                background:
                  "linear-gradient(135deg,#2563eb,#3b82f6)",
                color: "white",
                padding: "25px",
                borderRadius: "20px",
              }}
            >
              <h3>Total Tasks</h3>
              <h1>{tasks.length}</h1>
            </div>

            <div
              style={{
                background:
                  "linear-gradient(135deg,#16a34a,#22c55e)",
                color: "white",
                padding: "25px",
                borderRadius: "20px",
              }}
            >
              <h3>Completed</h3>
              <h1>{completedTasks}</h1>
            </div>

            <div
              style={{
                background:
                  "linear-gradient(135deg,#f59e0b,#f97316)",
                color: "white",
                padding: "25px",
                borderRadius: "20px",
              }}
            >
              <h3>Pending</h3>
              <h1>{pendingTasks}</h1>
            </div>

            <div
              style={{
                background:
                  "linear-gradient(135deg,#dc2626,#ef4444)",
                color: "white",
                padding: "25px",
                borderRadius: "20px",
              }}
            >
              <h3>High Priority</h3>
              <h1>{highPriorityTasks}</h1>
            </div>
          </div>

          {/* Search & Filters */}

          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "20px",
              marginBottom: "25px",
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
              boxShadow:
                "0 10px 25px rgba(0,0,0,0.06)",
            }}
          >
            <input
              type="text"
              placeholder="🔍 Search Task..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              style={{
                flex: 1,
                minWidth: "250px",
                padding: "12px",
                borderRadius: "12px",
                border: "1px solid #d1d5db",
              }}
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
              style={{
                padding: "12px",
                borderRadius: "12px",
              }}
            >
              <option>All</option>
              <option>Todo</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) =>
                setPriorityFilter(
                  e.target.value
                )
              }
              style={{
                padding: "12px",
                borderRadius: "12px",
              }}
            >
              <option>All</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          {/* Tasks Grid */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill,minmax(350px,1fr))",
              gap: "20px",
            }}
          >
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <div
                  key={task._id}
                  style={{
                    background: "white",
                    padding: "24px",
                    borderRadius: "22px",
                    boxShadow:
                      "0 10px 25px rgba(0,0,0,0.08)",
                    borderLeft:
                      task.priority === "High"
                        ? "6px solid #ef4444"
                        : task.priority === "Medium"
                        ? "6px solid #f59e0b"
                        : "6px solid #22c55e",
                  }}
                >
                  <h3>{task.title}</h3>

                  <p
                    style={{
                      color: "#64748b",
                    }}
                  >
                    {task.description}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {task.status}
                  </p>

                  <p>
                    <strong>Priority:</strong>{" "}
                    {task.priority}
                  </p>

                  <p>
                    <strong>Assigned:</strong>{" "}
                    {task.assignedTo?.name ||
                      "Unassigned"}
                  </p>

                  <p>
                    <strong>Due:</strong>{" "}
                    {task.dueDate
                      ? new Date(
                          task.dueDate
                        ).toLocaleDateString()
                      : "Not Set"}
                  </p>
                </div>
              ))
            ) : (
              <div
                style={{
                  background: "white",
                  padding: "30px",
                  borderRadius: "20px",
                }}
              >
                No Tasks Found
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default Tasks;