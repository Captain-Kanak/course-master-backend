import Enrollment from "../payment/enrollment.model.js";
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

const getCourses = async (queryParams) => {
  try {
    let {
      page = 1,
      limit = 10,
      search = "",
      category,
      tags,
      sort,
    } = queryParams;

    page = Number(page);
    limit = Number(limit);

    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { instructorName: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      query.category = category;
    }

    if (tags) {
      const tagArray = tags.split(",");
      query.tags = { $in: tagArray };
    }

    let sortOption = {};

    if (sort === "price_asc") sortOption.price = 1;
    if (sort === "price_desc") sortOption.price = -1;
    if (sort === "newest") sortOption.createdAt = -1;
    if (sort === "popular") sortOption.enrollCount = -1;

    const skip = (page - 1) * limit;

    const courses = await Course.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();

    const total = await Course.countDocuments(query);

    return {
      success: true,
      message: "Courses fetched successfully",
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      data: courses,
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

const getEnrolled = async (id) => {
  try {
    const result = await Enrollment.find({ userId: id }).lean().exec();

    if (!result) {
      return {
        success: false,
        message: "Enrollments not found",
      };
    }

    const courseIds = result.map((enrollment) => enrollment.courseId);

    const courses = await Course.find({ _id: { $in: courseIds } })
      .lean()
      .exec();

    return {
      success: true,
      message: "Enrollments fetched successfully",
      data: courses,
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
  getEnrolled,
};
