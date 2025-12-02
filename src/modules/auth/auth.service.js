import User from "../user/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/index.js";

const register = async (payload) => {
  const { email, password } = payload;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      ...payload,
      password: hashedPassword,
    });

    return {
      success: true,
      message: "User Registered Successfully!",
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const login = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return {
        success: false,
        message: "User does not exist",
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid Password",
      };
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      config.jwtSecret,
      {
        expiresIn: "1d",
      }
    );

    return {
      success: true,
      message: "User Logged In Successfully!",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const authServices = {
  register,
  login,
};
