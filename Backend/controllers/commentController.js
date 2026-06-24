import Comment from "../models/Comment.js";

export const createComment = async (req, res) => {
  try {
    const { task, message } = req.body;

    const comment = await Comment.create({
      task,
      user: req.user.id,
      message,
    });

    res.status(201).json({
      success: true,
      comment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      task: req.params.taskId,
    }).populate("user", "name email");

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Comment Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};