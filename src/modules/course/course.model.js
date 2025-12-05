import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    videoId: { type: String, required: true },
    duration: { type: String, required: true },
  },
  { _id: false }
);

const syllabusSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

const batchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    tags: [
      {
        type: String,
        index: true,
      },
    ],

    price: {
      type: Number,
      required: true,
    },

    instructorName: [
      {
        type: String,
        required: true,
      },
    ],

    syllabus: [syllabusSchema],

    lessons: [lessonSchema],

    batches: [batchSchema],

    enrollCount: {
      type: Number,
      default: 0,
    },
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
