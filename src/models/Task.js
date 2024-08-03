import mongoose, { model } from 'mongoose';

const taskSchema =( {
    title: {
    type: String,
    required: true,
    unique: true
    }, 
    description: {
        type: String,
        required: true,
    },
    dueDate:{
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    }, 
    category: {
        type: String,
        required: true
    }
});

const Task = mongoose.model.user || mongoose.model("Task", taskSchema)
export default Task;
