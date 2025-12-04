import { paymentServices } from "./payment.service.js";

const createPaymentIntent = async (req, res) => {
  const { courseId, user } = req.body;
  // const user = req.user;
  try {
    const result = await paymentServices.createPaymentIntent({
      courseId,
      user,
    });

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const confirmEnrollment = async (req, res) => {
  const { courseId } = req.body;
  const user = req.user;
  try {
    const result = await paymentServices.confirmEnrollment({});
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const paymentControllers = {
  createPaymentIntent,
  confirmEnrollment,
};
