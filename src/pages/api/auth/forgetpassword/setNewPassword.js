// pages/api/auth/setNewPassword.js
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import db from '@/utils/db';

export default async (req, res) => {
  await db.connect();

  const { email, newPassword } = req.body;
  const existingUser = await User.findOne({ email });

  if (!existingUser ) {
    return res.status(400).json({ message: 'Unauthorized request!' });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  existingUser.password = hashedPassword;
 // existingUser.resetPassword = false;
  await existingUser.save();

  res.status(200).json({ message: 'Password reset successful!' });
};
