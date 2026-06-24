import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

connectDB();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Middleware

app.use(cors());
app.use(express.json());

// Routes

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("ProjectFlow API Running...");
});

// ============================
// SOCKET.IO
// ============================

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);
  socket.on("sendFile", (data) => {
  io.emit("receiveFile", data);
});

  // Online Users

  socket.on("join", (username) => {
    const existingUser = onlineUsers.find(
      (user) => user.socketId === socket.id
    );

    if (!existingUser) {
      onlineUsers.push({
        socketId: socket.id,
        username,
      });
    }

    io.emit("onlineUsers", onlineUsers);

    console.log("Online Users:", onlineUsers);
  });

  // Notifications

  socket.on("sendNotification", (notification) => {
    io.emit("receiveNotification", notification);
  });

  // Team Chat

  socket.on("sendMessage", (message) => {
    io.emit("receiveMessage", message);
  });

  // Disconnect

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter(
      (user) => user.socketId !== socket.id
    );

    io.emit("onlineUsers", onlineUsers);

    console.log("User Disconnected:", socket.id);
  });
});

// ============================
// START SERVER
// ============================

server.listen(process.env.PORT || 5000, () => {
  console.log(
    `Server Running on Port ${
      process.env.PORT || 5000
    }`
  );
});