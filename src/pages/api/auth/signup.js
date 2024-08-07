import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db';



export default async function handler (req, res) {
  if (req.method === 'POST') {
    try {
      await db.connect();


      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });
      
      if (existingUser) {
        // await db.disconnect();
        return res.status(422).json({ message: 'User already exists!' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({ message: 'User created!' });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Internal server error' });
    } 
    // finally {
    //   await db.disconnect();
    // }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
    console.log('not found');
  }
};

