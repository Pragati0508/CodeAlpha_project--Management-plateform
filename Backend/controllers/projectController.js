import Project from "../models/Project.js";

// CREATE PROJECT
export const createProject = async (req, res) => {
  try {
    console.log("CREATE PROJECT HIT");
    console.log("BODY =>", req.body);
    console.log("USER =>", req.user);

    const { title, description } = req.body;

    const project = await Project.create({
      title,
      description,
      owner: req.user.id,
      members: [req.user.id],
    });

    console.log("PROJECT CREATED =>", project);

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    console.log("CREATE PROJECT ERROR =>", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL PROJECTS
export const getProjects = async (req, res) => {
  try {
    console.log("GET PROJECTS HIT");

    const projects = await Project.find();

    console.log("PROJECTS =>", projects);

    res.status(200).json(projects);
  } catch (error) {
    console.log("GET PROJECTS ERROR =>", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADD MEMBER
export const addMember = async (req, res) => {
  try {
    const { userId } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const alreadyMember = project.members.some(
      (member) => member.toString() === userId
    );

    if (!alreadyMember) {
      project.members.push(userId);
      await project.save();
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.log("ADD MEMBER ERROR =>", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE PROJECT
export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Project Deleted Successfully",
    });
  } catch (error) {
    console.log("DELETE PROJECT ERROR =>", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};