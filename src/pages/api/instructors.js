import Profile from '@/models/Profile';
import db from '@/utils/db';

export default async function handler (req, res) {
    await db.connect();
    if(req.method==='GET') {
        try {
            // Fetch only users with role instructor
            const profiles = await Profile.find().populate({
              path: 'userId',
              match: { role: 'instructor' }, // Fetch only users with role 'instructor'
            });
        
            const instructorProfiles = profiles.filter(profile => profile.userId); // Filter profiles with matching userId
        
            if (instructorProfiles.length === 0) {
              return res.status(404).json({ message: 'No instructor profiles found' });
            }
        
            // Format response
            const formattedProfiles = instructorProfiles.map(profile => ({
              ...profile.toObject(),
            }));
        
            res.status(200).json(formattedProfiles);
          } catch (error) {
            res.status(400).json({ success: false, message: error.message });
          }
    }
    
}
