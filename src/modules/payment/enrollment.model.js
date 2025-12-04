import mongoose from "mongoose";

const EnrollmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["paid"],
      default: "paid",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

if (mongoose.models.Enrollment) {
  delete mongoose.models.Enrollment;
}

const Enrollment = mongoose.model("Enrollment", EnrollmentSchema);

export default Enrollment;
