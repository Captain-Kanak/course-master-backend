import express, { json } from "express";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { userRoutes } from "./modules/user/user.routes.js";
import cors from "cors";

//* create express app
const app = express();

//* parse json
app.use(json());
app.use(
  cors({
    origin: [
      "https://course-master-frontend-one.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

//* ---------- routes ----------
app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Course Master Server Running Successfully!",
  });
});

app.get("/api", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Welcome to Course Master Backend API!",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

//* not found route
app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "404 - Route Not Found",
    route: req.url,
  });
});

export default app;
