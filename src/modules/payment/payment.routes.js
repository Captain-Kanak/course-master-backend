import { Router } from "express";
import { paymentControllers } from "./payment.controller.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = Router();

router.post(
  "/create-payment-intent",
  authMiddleware("user"),
  paymentControllers.createPaymentIntent
);

router.post(
  "/confirm-enrollment",
  authMiddleware("user"),
  paymentControllers.confirmEnrollment
);

export const paymentRoutes = router;
