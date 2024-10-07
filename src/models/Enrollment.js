import mongoose from 'mongoose';

// Define the payment status as an enum (if necessary)
const paymentStatusEnum = ['PENDING', 'PAID', 'FAILED']; // Adjust the enum values as per your application's needs

// Create the Enrolment schema
const enrolmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  email: {
    type:String,
    required:true
  },
  courseId: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Course',
    required: true
  }],
  order_number: {
    type: String,
    unique: true,
    required: true
  },
  price: {
    type: Number,
    default: null
  },
  paymentId: {
    type: String,
    default: null
  },
  payment_status: {
    type: String,
    enum: paymentStatusEnum,
    default: 'PENDING'
  },
  status: {
    type: String,
    enum: paymentStatusEnum,
    default: 'PENDING'
  },
  payment_via: {
    type: String,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  isCompleted: {
    type:Boolean,
    default: false
  },
}, {
  timestamps: false // Disables the automatic `createdAt` and `updatedAt` fields
});

// Add compound index for courseId and userId, if required
enrolmentSchema.index({ courseId: 1, userId: 1 });

// Export the model
const Enrollment = mongoose.models.Enrollment || mongoose.model('Enrollment', enrolmentSchema);
  export default Enrollment;
