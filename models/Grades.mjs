import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
  student_id:{ type: Number, required: true},
  class_id: {type: Number},
  scores: [
    {
      type: { type: String },
      score:{ type: Number},
    },
  ],
});

const Grade = mongoose.model("Grade", gradeSchema);

export default Grade;
