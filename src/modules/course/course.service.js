import Course from "./course.model.js";

const addCourse = async (payload) => {
  try {
    const result = await Course.create(payload);

    if (!result) {
      return {
        success: false,
        message: "Failed to add course",
      };
    }

    return {
      success: true,
      message: "Course added successfully",
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const getCourses = async () => {
  try {
    const result = await Course.find().lean().exec();

    if (!result) {
      return {
        success: false,
        message: "No courses found",
      };
    }

    return {
      success: true,
      message: "Courses fetched successfully",
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const getCourseById = async (id) => {
  try {
    const result = await Course.findById(id).lean().exec();

    if (!result) {
      return {
        success: false,
        message: "Course not found",
      };
    }

    return {
      success: true,
      message: "Course fetched successfully",
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const courseServices = {
  addCourse,
  getCourses,
  getCourseById,
};
