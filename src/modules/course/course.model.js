import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: String,
    price: Number,
    instructor: String,
    syllabus: [{ type: String }],
    lessons: [
      {
        title: String,
        videoId: String,
        isCompleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

if (mongoose.models.Course) {
  delete mongoose.models.Course;
}

const Course = mongoose.model("Course", courseSchema);

export default Course;
