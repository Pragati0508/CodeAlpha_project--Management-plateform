import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

router.get(
  "/all",
  authMiddleware,
  async (req, res) => {
    try {
      const users = await User.find()
        .select("-password");

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

export default router;