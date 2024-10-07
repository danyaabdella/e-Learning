import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Track learner by user ID
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
  isCompleted: { type: Boolean, default: false }, // Mark chapter completion
  quizScore: { type: Number, default: 0 }, // Store quiz score for each chapter
});

const Progress = mongoose.models.Progress || mongoose.model('Progress', progressSchema);
export default Progress;
