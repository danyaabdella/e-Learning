import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  courseCategory:{type: String},
  courseName: { type: String, required: true, unique: true },
  courseCode: { type: String, required: true },
  coursePrice: {type: String},
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  Std_Eld: [{ type:mongoose.Schema.Types.ObjectId, ref: 'User'}],
  image: { type: String},
  ishome: { type: Boolean},
  isapproved: { type: Boolean},
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],
  requirement:{ type: String},
  overview: { type: String},
 
});


const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
export default Course;