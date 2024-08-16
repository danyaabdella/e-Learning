import mongoose from 'mongoose';
import User from './User';

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true, unique: true },
  courseCode: { type: String, required: true },
  instructor: { type: String},
  Std_Eld: [{ type:mongoose.Schema.Types.ObjectId, ref: 'User'}]

});


const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
export default Course;