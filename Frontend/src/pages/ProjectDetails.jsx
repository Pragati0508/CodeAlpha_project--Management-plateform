import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentBox from "../components/CommentBox";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import socket from "../socket";

const ProjectDetails = () => {
  const { id } = useParams();

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
  });

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get(`/tasks/${id}`);
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users/all");
      setUsers(res.data);
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
      await API.post("/tasks/create", {
        ...formData,
        project: id,
      });

      socket.emit("sendNotification", {
        message: `New Task Created: ${formData.title}`,
        time: new Date().toLocaleTimeString(),
      });

      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: "",
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (taskId, status) => {
    try {
      await API.put(`/tasks/${taskId}`, {
        status,
      });

      socket.emit("sendNotification", {
        message: `Task moved to ${status}`,
        time: new Date().toLocaleTimeString(),
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const assignUser = async (taskId, userId) => {
    try {
      if (!userId) return;

      await API.put(`/tasks/assign/${taskId}`, {
        assignedTo: userId,
      });

      socket.emit("sendNotification", {
        message: "Task Assigned To User",
        time: new Date().toLocaleTimeString(),
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await API.delete(`/tasks/${taskId}`);

      socket.emit("sendNotification", {
        message: "Task Deleted",
        time: new Date().toLocaleTimeString(),
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const todoTasks = tasks.filter(
    (task) => task.status === "Todo"
  );

  const progressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  );

  const doneTasks = tasks.filter(
    (task) => task.status === "Done"
  );

  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div
          style={{
            flex: 1,
            padding: "30px",
          }}
        >
         <h1
  style={{
    color: "#0f172a",
    marginBottom: "10px",
  }}
>
  📌 Project Board
</h1>

<p
  style={{
    color: "#64748b",
    marginBottom: "25px",
  }}
>
  Manage tasks, assign members and track progress.
</p>
          <h2>Create Task</h2>

          <form
            onSubmit={handleSubmit}
            className="project-form"
          >
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />

            <button type="submit">
              Create Task
            </button>
          </form>

          <hr />

          <h2>Kanban Board</h2>

          <div className="kanban-board">
            
                      {/* TODO */}

            <div className="kanban-column">
              <h3>Todo</h3>

              {todoTasks.map((task) => (
                <div
                  key={task._id}
                  className="kanban-card"
                >
                  <h4>{task.title}</h4>

                  <p>{task.description}</p>

                  <p>
                    <strong>Assigned To:</strong>{" "}
                    {task.assignedTo?.name || "Unassigned"}
                  </p>

                  <select
                    value={task.assignedTo?._id || ""}
                    onChange={(e) =>
                      assignUser(
                        task._id,
                        e.target.value
                      )
                    }
                  >
                    <option value="">
                      Assign User
                    </option>

                    {users.map((user) => (
                      <option
                        key={user._id}
                        value={user._id}
                      >
                        {user.name}
                      </option>
                    ))}
                  </select>

                  <p>
                    <strong>Priority:</strong>{" "}
                    {task.priority}
                  </p>

                  <p>
                    <strong>Due Date:</strong>{" "}
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "Not Set"}
                  </p>

                  <CommentBox taskId={task._id} />

                  <button
                    onClick={() =>
                      updateStatus(
                        task._id,
                        "In Progress"
                      )
                    }
                  >
                    Move →
                  </button>

                  <button
                    onClick={() =>
                      deleteTask(task._id)
                    }
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            {/* IN PROGRESS */}

            <div className="kanban-column">
              <h3>In Progress</h3>

              {progressTasks.map((task) => (
                <div
                  key={task._id}
                  className="kanban-card"
                >
                  <h4>{task.title}</h4>

                  <p>{task.description}</p>

                  <p>
                    <strong>Assigned To:</strong>{" "}
                    {task.assignedTo?.name ||
                      "Unassigned"}
                  </p>

                  <p>
                    <strong>Priority:</strong>{" "}
                    {task.priority}
                  </p>

                  <p>
                    <strong>Due Date:</strong>{" "}
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "Not Set"}
                  </p>

                  <CommentBox taskId={task._id} />

                  <button
                    onClick={() =>
                      updateStatus(
                        task._id,
                        "Done"
                      )
                    }
                  >
                    Complete
                  </button>

                  <button
                    onClick={() =>
                      deleteTask(task._id)
                    }
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

            {/* DONE */}

            <div className="kanban-column">
              <h3>Done</h3>

              {doneTasks.map((task) => (
                <div
                  key={task._id}
                  className="kanban-card"
                >
                  <h4>{task.title}</h4>

                  <p>{task.description}</p>

                  <p>
                    <strong>Assigned To:</strong>{" "}
                    {task.assignedTo?.name ||
                      "Unassigned"}
                  </p>

                  <p>
                    <strong>Priority:</strong>{" "}
                    {task.priority}
                  </p>

                  <p>
                    <strong>Due Date:</strong>{" "}
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "Not Set"}
                  </p>

                  <CommentBox taskId={task._id} />

                  <p>✅ Completed</p>

                  <button
                    onClick={() =>
                      deleteTask(task._id)
                    }
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
          