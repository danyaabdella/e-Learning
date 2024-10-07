// /pages/api/progress.js

import Progress from '@/models/Progress';
import db from '@/utils/db';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  const { courseId, chapterId, userId } = req.body;
  
  if (req.method === 'POST') {
    await db.connect();

    try {
      // Check if progress already exists for this user and chapter
      let progress = await Progress.findOne({ userId, courseId, chapterId });

      if (!progress) {
        // Create new progress if it doesn't exist
        progress = new Progress({
          userId,
          courseId,
          chapterId,
          
        });
      } else {
        // Update existing progress to mark as completed
        progress.isCompleted = true;
      }

      await progress.save();
      res.status(200).json({ success: true, progress });
    } catch (error) {
      res.status(500).json({ error: 'Error updating progress', details: error.message });
    }
  } else if(req.method === 'GET') {
      const { userId, courseId } = req.query;
      if (!userId || !courseId) {
        return res.status(400).json({ error: 'Missing userId or courseId in the query' });
      }
      try {
        const userObjectId = mongoose.Types.ObjectId.isValid(userId) ? new mongoose.Types.ObjectId(userId) : null;
        const courseObjectId = mongoose.Types.ObjectId.isValid(courseId) ? new mongoose.Types.ObjectId(courseId) : null;

        if (!userObjectId || !courseObjectId) {
          return res.status(400).json({ error: 'Invalid userId or courseId' });
        }
        // Find progress for the given userId and courseId
        const progress = await Progress.find({ userId:userObjectId, courseId:courseObjectId });
        
        if (progress.length === 0) {
          return res.status(404).json({ success: false, message: 'No progress found for this user and course' });
        }
  
        res.status(200).json({ success: true, progress });
      } catch (error) {
        res.status(500).json({ error: 'Error fetching progress', details: error.message });
      }
  } else if(req.method === 'PUT') {
    const { userId, chapterId, score } = req.body;

    try {
        // Find the Progress entry by userId and chapterId
        const progress = await Progress.findOne({ userId, chapterId });

        if (!progress) {
            return res.status(404).json({ message: 'Progress not found for the given user and chapter.' });
        }

        // Update the quizScore field with the new score
        progress.quizScore = score;

        // Save the updated progress record
        await progress.save();

        return res.status(200).json({ message: 'Quiz score updated successfully', progress });
    } catch (error) {
        console.error('Error updating quiz score:', error);
        return res.status(500).json({ message: 'Error updating quiz score' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
  
}
