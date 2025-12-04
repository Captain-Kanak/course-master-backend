import { Router } from "express";
import { courseController } from "./course.controller.js";

const router = Router();

router.post("/", courseController.addCourse);

router.get("/", courseController.getCourses);

router.get("/:id", courseController.getCourseById);

export const courseRoutes = router;
