import Stripe from "stripe";
import Course from "../course/course.model.js";
import Enrollment from "./enrollment.model.js";
import envConfig from "../../config/index.js";

const stripe = new Stripe(envConfig.stripeSecretKey);

const createPaymentIntent = async (payload) => {
  try {
    const { id: courseId, user } = payload;

    const course = await Course.findById(courseId);

    if (!course) {
      return {
        success: false,
        message: "Course not found",
      };
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: course.price * 100,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        courseId,
        userId: user._id.toString(),
      },
    });

    return {
      success: true,
      message: "Payment intent created successfully",
      data: paymentIntent.client_secret,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

const confirmEnrollment = async (payload) => {
  try {
    const { id: courseId, user } = payload;

    const isExist = await Enrollment.findOne({
      userId: user._id,
      courseId,
    });

    if (isExist) {
      return {
        success: false,
        message: "User already enrolled in this course",
      };
    }

    await Enrollment.create({
      userId: user._id,
      courseId,
    });

    return {
      success: true,
      message: "Enrollment confirmed successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const paymentServices = {
  createPaymentIntent,
  confirmEnrollment,
};
