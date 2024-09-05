import db from '../../utils/db';
import Profile from '../../models/Profile';
import User from '../../models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { method } = req;

  await db.connect();

  // Extract token from Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  let userId;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is properly set in your environment
    userId = decoded.userId; // Assuming userId is stored in the token payload
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  switch (method) {
    case 'GET':
      try {
        // const profile = await Profile.findOne({ userId });
        const profile = await Profile.findOne({ userId }).populate('userId', 'email');
        if (!profile) {
          return res.status(404).json({ message: 'Profile not found' });
        }
        const userProfile = {
          ...profile.toObject(),
          email: profile.userId.email, // Attach the email from the User model
        };
        res.status(200).json(userProfile);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT':
      try {
        const { email, ...profileData } = req.body;

        const profile = await Profile.findOne({ userId });
        if (!profile) {
          return res.status(404).json({ message: 'Profile not found' });
        }

        // Update the profile fields with new data
        Object.assign(profile, profileData);

        if (req.files && req.files.avatar) {
          profile.avatar = req.files.avatar.path;
        }

        profile.updatedAt = Date.now();

        await profile.save({ runValidators: true });

        if (email) {
          const user = await User.findById(userId);
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          user.email = email;
          await user.save({ runValidators: true });
        }

        const updatedProfile = await Profile.findOne({ userId }).populate('userId', 'email');
        res.status(200).json({ ...updatedProfile.toObject(), email: updatedProfile.userId.email });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;
      case 'POST':
        try {
          const authHeader = req.headers.authorization;
          if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization token missing or malformed' });
          }
    
          const token = authHeader.split(' ')[1];
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const userId = decoded.userId; // Assuming the token contains the user ID
    
          const { firstName, lastName, gender, bio, dateOfBirth, location, jobTitle, email } = req.body;
    
          // Check if a profile for the user already exists
          const existingProfile = await Profile.findOne({ userId });
          if (existingProfile) {
            return res.status(400).json({ message: 'Profile already exists' });
          }
    
          const profile = new Profile({
            userId,
            firstName,
            lastName,
            gender,
            bio,
            dateOfBirth: new Date(dateOfBirth),
            location,
            jobTitle,
            email,
            avatar: '', // Initially set avatar if provided
          });
          const id = profile._id;
          await profile.save();
          res.status(201).json({
            message: 'Profile created successfully',
            profile,
            id
          });
        } catch (error) {
          console.error('Profile creation error:', error);
          res.status(500).json({ message: 'Failed to create profile' });
        }
      
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
