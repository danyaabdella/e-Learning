import mongoose from 'mongoose';

const documentationSchema = new mongoose.Schema({
    email: { type: String, required:true },
    cv: {type:String},
    degree: {type:String},
})
export default mongoose.models.Documentation || mongoose.model('Documentation',documentationSchema);