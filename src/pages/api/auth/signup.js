import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';
import db from '../../../utils/db';
import Profile from '../../../models/Profile';
import sendEmail from '@/utils/sendEmail';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await db.connect(); // Ensure the DB connection is established

      const { email, password, isInstructor, role } = req.body;

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(422).json({ message: 'User already exists!' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create the new user
      const newUser = new User({
        email,
        password: hashedPassword,
        isInstructor,
        role,
      });

      // Save the user to the database
      await newUser.save();
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      const userId = newUser._id;
      // const email = newUser.email;
      if (isInstructor) {
        const adminEmail = 'danqueen670@gmail.com'; // Replace with your admin's email
        const subject = 'New Instructor Signup';
        const text = `A new instructor has signed up with the email: ${email}.`;
        const html = `<p>A new instructor has signed up with the email: <strong>${email}</strong>.</p>`;
        await sendEmail(adminEmail, subject, text, userId, email);
      }
      
      // Respond with a success message
      res.status(201).json({ message: 'User and Profile created successfully!', token });

    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    } 
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
