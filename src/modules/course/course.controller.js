import { courseServices } from "./course.service.js";

const addCourse = async (req, res) => {
  try {
    const result = await courseServices.addCourse(req.body);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCourses = async (req, res) => {
  try {
    const result = await courseServices.getCourses(req.query);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await courseServices.getCourseById(id);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const courseController = {
  addCourse,
  getCourses,
  getCourseById,
};
