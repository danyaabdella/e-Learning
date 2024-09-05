import db from '@/utils/db'; // Ensure you have a proper database connection utility
import User from '@/models/User'; // Import your User model
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { userId } = req.query; // Get the userId from the query parameters
    if (!userId) {
      return res.status(400).json({ error: 'No user ID provided' });
    }

    await db.connect(); // Connect to your database

    // Fetch the user's approval status from the database
    const user = await User.findById(userId).select('isapproved');
    console.log('user:', user);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the approval status
    return res.status(200).json({ isApproved: user.isapproved });
  } catch (error) {
    console.error('Error checking approval status:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
