import { userServices } from "./user.service.js";

const getUsers = async (req, res) => {
  try {
    const result = await userServices.getUsers();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await userServices.getUserById(id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await userServices.updateUser(id, req.body);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const userControllers = {
  getUsers,
  getUserById,
  updateUser,
};
