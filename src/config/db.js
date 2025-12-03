import mongoose from "mongoose";
import config from "./index.js";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return {
        success: true,
        message: "Already connected to MongoDB using Mongoose",
      };
    }

    if (config.mongoURI) {
      return {
        success: false,
        message: "MONGODB_URI is not defined in environment variables.",
      };
    }

    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
    });

    return {
      success: true,
      message: "Connected to MongoDB using Mongoose",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export default connectDB;
