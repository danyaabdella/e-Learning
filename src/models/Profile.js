import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User schema
    required: true,
    unique: true
  },
  firstName: { type: String },
  lastName: { type: String},
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  email: { type: String, required: true, unique: true },
  bio: { type: String },
  dateOfBirth: { type: Date },  
  location: { type: String },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  jobTitle:{type: String, default:'student'},
});

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
