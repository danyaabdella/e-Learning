import mongoose from 'mongoose';
import Course from './Course'; 

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  newPassword: { type: String },
  role: { type: String, enum: ['user', 'admin', 'instructor'], default: 'user'},
  eldCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
  isInstructor: {type: Boolean},
});


const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
