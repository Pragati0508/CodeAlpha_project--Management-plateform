import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();

    const totalTasks = await Task.countDocuments();

    const completedTasks =
      await Task.countDocuments({
        status: "Done",
      });

    const pendingTasks =
      await Task.countDocuments({
        status: { $ne: "Done" },
      });

    res.status(200).json({
      success: true,
      stats: {
        totalProjects,
        totalTasks,
        completedTasks,
        pendingTasks,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};