import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import nextConnect from 'next-connect';
import Course from '../../models/Course';
import db from '@/utils/db';

const upload = multer({ dest: '/tmp' }); // Store uploads in a temporary folder

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  },
});

apiRoute.use(upload.single('image'));

apiRoute.post(async (req, res) => {
  await db.connect();

  try {
    const { courseName, courseCode, instructor } = req.body;
    let imageUrl = '';

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    const course = new Course({
      courseName,
      courseCode,
      instructor,
      image: imageUrl, // Save the image URL
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  } 
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, so Multer can handle the `multipart/form-data` content type
  },
};
