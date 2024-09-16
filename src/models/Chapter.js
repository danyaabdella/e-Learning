import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
    courseId:{ type:mongoose.Schema.Types.ObjectId, ref:'Course', required:true},
    title: { type: String, required: true },
    videos: [{ type: String }], // URLs or file paths
    documents: [{ type: String }], // URLs or file paths
    quiz: [{
      question: { type: String, required: true },
      answers: [{ type: String }], // Array of possible answers
      correctAnswer: { type: String, required: true },
    }]
  });
  const Chapter = mongoose.models.Chapter || mongoose.model('Chapter', chapterSchema);
  export default Chapter;