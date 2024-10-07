import Chapter from '@/models/Chapter';
import db from '@/utils/db'; // Ensure you have a DB connection utility

export default async function handler(req, res) {
  await db.connect(); // Connect to the database

  if (req.method === 'POST') {
    const { quizData, chapterId } = req.body;

    try {
      // Find the chapter by courseId
      const chapter = await Chapter.findOne({ _id:chapterId });

      if (!chapter) {
        return res.status(404).json({ message: 'Chapter not found' });
      }

      // Append the new quiz data to the chapter
      chapter.quiz.push(...quizData);

      // Save the chapter with the new quiz
      await chapter.save();

      res.status(200).json({ message: 'Quiz updated successfully', chapter });
    } catch (error) {
      res.status(500).json({ message: 'Error updating quiz', error });
    }
  } else if(req.method==='GET') {

    const { _id } = req.query;
    try {
      const chapter = await Chapter.findById({_id});
      if (!chapter) {
        return res.status(404).json({ success: false, message: 'Chapter not found' });
      }
      res.status(200).json({ success: true, data: chapter }); // Return only the quiz part
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }

  } else if(req.method==='DELETE') {
    const {chapterId, quizIndex} = req.query;
    try {
        const chapter = await Chapter.findById({_id:chapterId});
        if (!chapter) {
          return res.status(404).json({ success: false, message: 'Chapter not found' });
        }

        if (quizIndex < 0 || quizIndex >= chapter.quiz.length) {
          return res.status(400).json({ success: false, message: 'Invalid quiz index' });
        }

        // Remove the quiz by index
        chapter.quiz.splice(quizIndex, 1);
        await chapter.save();

        res.status(200).json({ success: true, message: 'Quiz deleted successfully', data: chapter.quiz });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
  
}
