import Course from '../../models/Course';
import db from '@/utils/db';

export default async (req, res) => {
  const { method } = req;

  await db.connect();
  console.log('123');

  switch (method) {
    case 'GET':
      try {
        const courses = await Course.find({});
        res.status(200).json(courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
      break;

    case 'POST':
      try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).json(course);
      } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
      }
      break;

    case 'PUT':
      try {
        const { id, ...data } = req.body;
        if (!id) {
          res.status(400).json({ message: 'ID is required' });
          return;
        }
        // const updatedCourse = await Course.findByIdAndUpdate(id, data, { new: true });
        const course = await Course.findById(id);
        
        Object.assign(course, data);
        await course.save();
        res.status(200).json(course);
      } catch (error) {
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
