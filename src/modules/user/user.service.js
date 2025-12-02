import User from "./user.model.js";

const getUsers = async () => {
  try {
    const result = await User.find().lean().select("-password").exec();

    if (!result) {
      return {
        success: false,
        message: "No users found",
      };
    }

    return {
      success: true,
      message: "Users fetched successfully",
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const getUserById = async (id) => {
  try {
    const result = await User.findById(id).lean().select("-password").exec();

    if (!result) {
      return {
        success: false,
        message: "User not found",
      };
    }

    return {
      success: true,
      message: "User fetched successfully",
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const updateUser = async (id, payload) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const result = await User.findByIdAndUpdate(id, payload, { new: true });

    return {
      success: true,
      message: "User updated successfully",
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const userServices = {
  getUsers,
  getUserById,
  updateUser,
};
