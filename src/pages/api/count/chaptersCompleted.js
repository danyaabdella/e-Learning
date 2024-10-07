import Progress from '@/models/Progress';
import db from '@/utils/db';

export default async function handler(req, res) {
    await db.connect();
    try {
        const{method} = req;
        const {userId, courseId} = req.query;
        if(method==='GET') {
            if(userId) {
            const completedChapters = await Progress.find({
                userId: userId,
                isCompleted: true

              });
              res.status(200).json({completedChapters}); 
            } else if (userId && courseId) {
                const completedChapters = await Progress.find({
                    courseId: courseId,
                    userId: userId,
                    isCompleted: true
    
                  });
                  res.status(200).json({completedChapters}); 
            } else {
                res.status(400).json('query parameter required');
            }
        } else {
            console.error("Error counting completed chapters:", error);
        }
    } catch(error) {
        res.status(404).json('method not allowed');
    }
}