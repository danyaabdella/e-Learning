// In your API route for fetching courses
import db from '@/utils/db';
import Course from '@/models/Course';
import jwt from 'jsonwebtoken';
export default async (req, res) => {
  await db.connect();
  const { method } = req;
  const {id} = req.query;
    switch(method){  
     
      case 'GET':     
      const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header

      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
      }

      const userId = req.query.userId;
      console.log(userId);              
        try {

          // let courses;
          // if (instructor) {
          const courses = await Course.find({ userId: userId }).populate('instructor');
          console.log('course: ',courses);
          // } else {
          //   courses = await Course.find().populate('instructor');
          // }
          res.status(200).json(courses);
        } catch (error) {
          res.status(500).json({ message: 'Error fetching courses' });
        }
        break;
      case 'PUT':
        try {
          const course = await Course.findById(id);
          console.log('course:',course);
          if (!course) {
            return res.status(404).json({ message: 'Course not found' });
          }
  
          course.isapproved = true;
          await course.save();
  
          res.status(200).json(course);
        } catch (error) {
          console.error('Error approving course:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
        break;
      } 
      
    
    };
  