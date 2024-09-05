import db from '@/utils/db';
import User from '@/models/User';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      await db.connect();

      const { userId } = req.body;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      user.isapproved = true;
      await user.save();

      res.status(200).json({ message: 'User approved successfully' });
    } catch (error) {
      console.error('Error approving user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
