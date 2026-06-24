import Task from "../models/Task.js";

// CREATE TASK
export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      project,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      dueDate,
      project,
      status: "Todo",
    });

    const populatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email");

    res.status(201).json({
      success: true,
      task: populatedTask,
    });

  } catch (error) {
    console.log("CREATE TASK ERROR =>", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET TASKS BY PROJECT
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      project: req.params.projectId,
    })
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(tasks);

  } catch (error) {
    console.log("GET TASKS ERROR =>", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE STATUS
export const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      { new: true }
    ).populate("assignedTo", "name email");

    res.status(200).json({
      success: true,
      task,
    });

  } catch (error) {
    console.log("UPDATE STATUS ERROR =>", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ASSIGN TASK
export const assignTask = async (req, res) => {
  try {
    const { assignedTo } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        assignedTo,
      },
      {
        new: true,
      }
    ).populate("assignedTo", "name email");

    res.status(200).json({
      success: true,
      task,
    });

  } catch (error) {
    console.log("ASSIGN TASK ERROR =>", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task Deleted Successfully",
    });

  } catch (error) {
    console.log("DELETE TASK ERROR =>", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// GET ALL TASKS

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("project", "title")
      .sort({ createdAt: -1 });

    res.status(200).json(tasks);

  } catch (error) {
    console.log("GET ALL TASKS ERROR =>", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};