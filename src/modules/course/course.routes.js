import { Router } from "express";
import { courseController } from "./course.controller.js";

const router = Router();

router.post("/", courseController.addCourse);

router.get("/", courseController.getCourses);

export const courseRoutes = router;
