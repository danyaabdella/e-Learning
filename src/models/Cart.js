import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  email: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  isadded: { type: Boolean, default: false },
});

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
export default Cart;
