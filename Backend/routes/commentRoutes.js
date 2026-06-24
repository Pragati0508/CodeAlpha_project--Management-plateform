import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  createComment,
  getComments,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  createComment
);

router.get(
  "/:taskId",
  authMiddleware,
  getComments
);

router.delete(
  "/:id",
  authMiddleware,
  deleteComment
);

export default router;