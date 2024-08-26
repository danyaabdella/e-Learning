import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
    email: { type:String },
    courseCode: { type:String },
});
const Wishlist = mongoose.models.Wishlist || mongoose.model('Wishlist', wishlistSchema);
export default Wishlist;