// // api/users.js
// import User from '@/models/User';
// import db from '@/utils/db';


// export default async function handler(req, res) {
//   await db.connect();

//   if (req.method === 'GET') {
//     const users = await User.find({});
//     res.status(200).json(users);
//   }
// }
// import User from '@/models/User';
// import db from '@/utils/db';

// export default async function handler(req, res) {
//   await db.connect();

//   if (req.method === 'GET') {
//     try {
//       const { userId } = req.query; // Assuming you pass userId as a query parameter
//       if (userId) {
//         const user = await User.findById(userId).populate('eldCourses'); // Populating the courses
//         if (!user) {
//           return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json(user);
//       } else {
//         const users = await User.find({});
//         res.status(200).json(users);
//       }
//     } catch (error) {
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   }
// }
// pages/api/users.js
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
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  //await db.disconnect();
}


