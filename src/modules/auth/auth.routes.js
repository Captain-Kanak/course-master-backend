import { Router } from "express";

const router = Router();

router.post("/login", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "User Registered Successfully",
  });
});

export const authRoutes = router;
