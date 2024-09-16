import Course from '@/models/Course';
import db from '@/utils/db';

export default async function handler(req, res) {
  await db.connect();

  if (req.method === 'PUT') {
    const { courseId, overview, requirement, chapters } = req.body;
    // const {  } = req.query;

    try {
      // Update course details
      const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        {
          overview,
          requirement,
          chapters, // Update chapters with chapter IDs
        },
        { new: true }
      );

      if (!updatedCourse) {
        return res.status(404).json({ error: 'Course not found' });
      }

      res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
    } catch (error) {
      console.error('Error updating course:', error);
      res.status(500).json({ error: 'Error updating course' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
