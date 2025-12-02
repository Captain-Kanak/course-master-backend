import { authServices } from "./auth.service.js";

const register = async (req, res) => {
  try {
    const result = await authServices.register(req.body);

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

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await authServices.login(email, password);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const authControllers = {
  register,
  login,
};
