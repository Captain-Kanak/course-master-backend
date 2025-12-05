import { Router } from "express";
import { userControllers } from "./user.controller.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware("admin"), userControllers.getUsers);

router.get(
  "/:id",
  authMiddleware("admin", "user"),
  userControllers.getUserById
);

router.patch("/:id", authMiddleware("user"), userControllers.updateUser);

export const userRoutes = router;
