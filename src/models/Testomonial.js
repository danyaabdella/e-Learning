import mongoose from 'mongoose';

const TestomonialSchema = new mongoose.Schema({
    name: {type: String, required: true},
    message: {type: String, required: true},
    img: {
        type: String,
     
    }
})
const Testomonial = mongoose.models.Testomonial || mongoose.model('Testomonial',TestomonialSchema);
export default Testomonial;