import mongoose from 'mongoose';

const transcriptSchema = new mongoose.Schema({
    userId : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    courseId : {type:mongoose.Schema.Types.ObjectId, ref: 'Course'},
    completionDate: {type:Date, default:Date.now},

}) 
const Certificate = mongoose.models.Certificate || mongoose.model('Certificate', transcriptSchema);
export default Certificate;