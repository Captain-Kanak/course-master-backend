import mongoose from "mongoose";

const connectMongooseDb = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return {
        success: true,
        message: "Already connected to MongoDB using Mongoose",
      };
    }

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables.");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    return { success: true, message: "Connected to MongoDB using Mongoose" };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export default connectMongooseDb;
