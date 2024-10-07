import Course from '../../models/Course';
import db from '@/utils/db';
import sendEmail from '@/utils/sendEmail';
// import multer from 'multer';
// import { v2 as cloudinary } from 'cloudinary';

export default async (req, res) => {
  const { method } = req;

  await db.connect();
  

  switch (method) {
    case 'GET':
      
      try {
        const courses = await Course.find({})
        res.status(200).json(courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
      break;

    case 'POST':
      

      try {
         const{courseCategory, courseName, courseCode, coursePrice, instructor, image, userId} = req.body;
        const course = new Course({
          courseCategory, courseName, courseCode, instructor, image, userId,
        });
        console.log('course:', course);
        await course.save();

        const adminEmail = 'danqueen670@gmail.com'; // Replace with your admin's email
        const subject = 'New Course Created';
        const text = `A new course named "${course.courseName}" has been created by ${course.instructor}.`;
        const html = `<p>A new course named "<strong>${course.courseName}</strong>" has been created by <strong>${course.instructor}</strong>.</p>`;
        await sendEmail(adminEmail, subject, text, html);
        res.status(201).json(course);
      } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
      }
      // });
      break;

    case 'PUT':
      // try {
      //   const { id, ...data } = req.body;
      //   if (!id) {
      //     res.status(400).json({ message: 'ID is required' });
      //     return;
      //   }
      //   // const updatedCourse = await Course.findByIdAndUpdate(id, data, { new: true });
      //   const course = await Course.findById(id);
        
      //   Object.assign(course, data);
      //   await course.save();
      //   res.status(200).json(course);
      // } catch (error) {
      //   res.status(500).json({ message: 'Internal server error' });
      // }
      // break;
      const {id} = req.body;
      console.log('recieved id:',id);
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

    case 'DELETE':
      try {
        const { id } = req.body;
        await Course.deleteOne( {id: id});
        res.status(200).json({ message: 'Course deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
      }
      break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }

 // await db.disconnect();
};
