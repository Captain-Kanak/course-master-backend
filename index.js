import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import bcrypt from "bcrypt";
import connectMongooseDb from "./src/lib/connectMongooseDb.js";
import User from "./src/models/user.model.js";

// create express app and set port
const app = express();
const port = 5000;

// middleware
app.use(json());
// app.use(
//   cors({
//     origin: [],
//     credentials: true,
//   })
// );

// ===================================================================
// ==================== API ENDPOINTS START HERE =====================
// ===================================================================

//* register user
app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, Email and Password are required",
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//* get all user
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      success: true,
      message: "Users Fetched Successfully",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//* get single user by email query
app.get("/user", async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Fetched Successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//* ---------- server default response ----------
// health check
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome to Course Master Backend API",
  });
});

// not found route
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Not Found",
    route: req.url,
  });
});

// Start server
const startServer = async () => {
  const dbConnectionStatus = await connectMongooseDb();

  // Check if DB connection was successful
  if (dbConnectionStatus.success) {
    console.log(dbConnectionStatus.message);
    // Start the server by listening on the specified port
    app.listen(port, () => {
      console.log("Server Listening On Port:", port);
    });
  } else {
    console.error("Failed to Connect MongoDB:", dbConnectionStatus.message);
    process.exit(1);
  }
};

startServer();
