// pages/api/aboutcontent.js
import db from '../../utils/db'; // Adjust the path as needed
import AboutContent from '../../models/AboutContent'; // Adjust the path as needed

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      await db.connect();
      const data = await AboutContent.findOne({}); // Adjust the query as needed
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      await db.connect();
      const { img, content } = req.body;
       // Check if a document exists
       let updatedContent = await AboutContent.findOne({});
      
       if (updatedContent) {
         // If document exists, update it
         updatedContent.img = img;
         updatedContent.content = content;
         updatedContent = await updatedContent.save();
       } else {
         // If document does not exist, create it
         updatedContent = new AboutContent({ img, content });
         updatedContent = await updatedContent.save();
       }
 
       res.status(200).json(updatedContent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
