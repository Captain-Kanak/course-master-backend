import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return {
        success: true,
        message: "Already connected to MongoDB using Mongoose",
      };
    }

    if (!process.env.MONGODB_URI) {
      return {
        success: false,
        message: "MONGODB_URI is not defined in environment variables.",
      };
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("mongoDB connected using mongoose");
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export default connectDB;
