// /pages/api/transcript.js

import db from '@/utils/db';
import Certificate from '@/models/Certificate';

export default async function handler(req, res) {
  await db.connect();
  
  if (req.method === 'POST') {
    try {
      const { userId, courseId } = req.body;

      // Validate the required fields
      if (!userId || !courseId ) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      const certificate = await Certificate.findOne({userId, courseId})
      if(certificate) {
        return('certificate exist');
      }
      // Create a new transcript
      const newTranscript = new Certificate({
        userId,
        courseId,
        // quizScore, 
        completionDate: new Date(),
      });

      await newTranscript.save();

      res.status(201).json({ message: 'Transcript created successfully', newTranscript });
    } catch (error) {
      console.error('Error creating transcript:', error);
      res.status(500).json({ error: 'Failed to create transcript' });
    }
  } else if(req.method==='GET') {
      const { userId } = req.query;
      if(!userId ) {
        res.status(400).json('userId is required');
      }
      const certificate = await Certificate.find({ userId }).populate('courseId', 'courseName');
      res.status(200).json(certificate);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
