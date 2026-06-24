import express from "express";

import {
createProject,
getProjects,
deleteProject,
addMember
} from "../controllers/projectController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Project
router.post(
"/create",
authMiddleware,
createProject
);

// Get All Projects
router.get(
"/all",
authMiddleware,
getProjects
);

// Add Member To Project
router.put(
"/add-member/:id",
authMiddleware,
addMember
);

// Delete Project
router.delete(
"/:id",
authMiddleware,
deleteProject
);

export default router;
