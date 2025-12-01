import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import connectMongooseDb from "./src/lib/connectMongooseDb.js";

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

app.post("/register", (req, res) => {});

// ---------- server default response ----------
// health check
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Hello World!",
  });
});

// not found route
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Not Found",
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
