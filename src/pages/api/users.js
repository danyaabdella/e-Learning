
import User from '@/models/User';
import db from '@/utils/db';

export default async function handler(req, res) {
  await db.connect();

  if (req.method === 'GET') {
    try {
      const { userId } = req.query; // Handle specific user ID if provided
      if (userId) {
        const user = await User.findById(userId).populate('eldCourses');
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
      } else {
        const users = await User.find({});
        res.status(200).json(users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else if (req.method==='PUT') {
    
    try {
      const { id, role } = req.body;
      if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
      }

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update the user's role
      user.role = role;
      await user.save();

      res.status(200).json({ message: 'User role updated successfully', user });
    } catch (error) {
      console.error('Error updating user role:', error);
      res.status(500).json({ message: 'Internal server error' });
      } 
    } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  //await db.disconnect();
}



  
  
  

  //await db.disconnect();



