import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
});


const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);
export default Task;