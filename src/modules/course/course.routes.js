import { Router } from "express";
import { courseController } from "./course.controller.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware("admin"), courseController.addCourse);

router.get("/", courseController.getCourses);

router.get("/:id", courseController.getCourseById);

export const courseRoutes = router;
