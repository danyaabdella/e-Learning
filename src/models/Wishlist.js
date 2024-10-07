import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
    email: { type:String },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
});
const Wishlist = mongoose.models.Wishlist || mongoose.model('Wishlist', wishlistSchema);
export default Wishlist;