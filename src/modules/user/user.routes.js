import { Router } from "express";
import { userControllers } from "./user.controller.js";

const router = Router();

router.get("/", userControllers.getUsers);

router.get("/:id", userControllers.getUserById);

router.patch("/:id", userControllers.updateUser);

export const userRoutes = router;
