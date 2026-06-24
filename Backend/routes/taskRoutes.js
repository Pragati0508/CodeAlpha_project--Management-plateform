import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
  createTask,
  getTasks,
  getAllTasks,
  updateTaskStatus,
  assignTask,
  deleteTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  createTask
);

router.get(
  "/all",
  authMiddleware,
  getAllTasks
);

router.get(
  "/:projectId",
  authMiddleware,
  getTasks
);

router.put(
  "/:id",
  authMiddleware,
  updateTaskStatus
);

router.put(
  "/assign/:id",
  authMiddleware,
  assignTask
);

router.delete(
  "/:id",
  authMiddleware,
  deleteTask
);

export default router;