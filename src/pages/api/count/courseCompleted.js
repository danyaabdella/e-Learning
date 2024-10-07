import Course from '@/models/Course';
import Progress from '@/models/Progress';
import Chapter from '@/models/Chapter';
import db from '@/utils/db';

export default async function handler(req, res) {
    await db.connect();
    const { method } = req;
    const { userId, courseId } = req.query;

    try {
        if (method === 'GET') {
            try {
                // Find the course and populate the chapters
                const course = await Course.findById(courseId).populate('chapters');
                if (!course) {
                    return res.status(404).json({ message: 'Course not found' });
                }

                const totalChapters = course.chapters.length;

                // Count the completed chapters for this user and course
                const completedChapters = await Progress.countDocuments({
                    userId: userId,
                    courseId: courseId,
                    isCompleted: true
                });

                const isCompleted = totalChapters === completedChapters;

                // Return the response with course status
                res.status(200).json({
                    totalChapters,
                    completedChapters,
                    isCompleted,
                    message: isCompleted ? 'Course completed' : 'Course not completed'
                });
            } catch (error) {
                console.error("Error checking if course is completed:", error);
                return res.status(500).json({ message: 'Error fetching course completion status' });
            }
        } else {
            res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
