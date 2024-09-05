import mongoose from 'mongoose';

const documentationSchema = new mongoose.Schema({
    email: { type: String },
    cv: {type:File},
    degree: {type:File},
})
export default mongoose.models.Documentation || mongoose.model('Documentation',documentationSchema);