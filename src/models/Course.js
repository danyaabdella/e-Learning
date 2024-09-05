import mongoose from 'mongoose';
import User from './User';

const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true, unique: true },
  courseCode: { type: String, required: true },
<<<<<<< HEAD
  coursePrice: {type: String},
=======
>>>>>>> upstream/Dan
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  Std_Eld: [{ type:mongoose.Schema.Types.ObjectId, ref: 'User'}],
  image: { type: String},
  ishome: { type: Boolean},
  isapproved: { type: Boolean},
  requirement:{ type: String},
  Overview: { type: String},


});
// courseSchema.pre('save', async function(next) {
//   const user = await User.findById(req.user.id); // assuming req.user.id is the logged-in user's ID
//   this.instructor = user._id;
//   next();
// });


const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
export default Course;