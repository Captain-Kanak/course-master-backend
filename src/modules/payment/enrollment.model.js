import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    lessonId: { type: String },
    isCompleted: { type: Boolean, default: false },
  },
  { _id: false }
);

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
    progress: [progressSchema],
    assignmentLink: {
      type: String,
      default: "",
    },
    quizScore: {
      type: Number,
      default: null,
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
