import { Router } from "express";
import { paymentControllers } from "./payment.controller.js";

const router = Router();

router.post("/create-payment-intent", paymentControllers.createPaymentIntent);

router.post("/confirm-enrollment", paymentControllers.confirmEnrollment);

export const paymentRoutes = router;
