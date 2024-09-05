import db from '@/utils/db';
import Course from '@/models/Course';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.body;

  await db.connect();

  switch (method) {
    case 'PUT':
      try {
        // Update the ishome attribute for the specific course
        const course = await Course.findById(id);
        console.log('courses:',course);
        if (!course) {
          return res.status(404).json({ success: false, message: 'Course not found' });
        }
        course.ishome = req.body.ishome;
        await course.save();

        res.status(200).json({ success: true, data: course });
      } catch (error) {
        res.status(400).json({ success: false, message: 'Error updating course' });
      }
      break;
    default:
      res.status(400).json({ success: false, message: 'Invalid request method' });
      break;
  }
}
