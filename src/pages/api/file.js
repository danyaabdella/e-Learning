// import db from '../../utils/db';
// import Profile from '../../models/Profile';
// // import User from '../../models/User';
// import jwt from 'jsonwebtoken';
// import multer from 'multer';
// import path from 'path';

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: './public/uploads/avatars',
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()}_${file.originalname}`);
//     },
//   }),
//   fileFilter: (req, file, cb) => {
//     const ext = path.extname(file.originalname).toLowerCase();
//     if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
//       return cb(new Error('Only images are allowed'), false);
//     }
//     cb(null, true);
//   },
// });

// export default async function handler(req, res) {
//   await db.connect();

//   if (req.method === 'POST') {
//     upload.single('avatar')(req, res, async (err) => {
//       if (err) {
//         return res.status(400).json({ message: err.message });
//       }

//       const authHeader = req.headers.authorization;
//       if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(401).json({ message: 'Authorization token missing or malformed' });
//       }

//       const token = authHeader.split(' ')[1];
//       try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.userId = decoded.userId; // Attach userId to the request object

//         const { firstName, lastName, gender, bio, dateOfBirth, location, jobTitle, email } = req.body;
//         const userId = req.userId;

//         const existingProfile = await Profile.findOne({ userId });
//         if (existingProfile) {
//           return res.status(400).json({ message: 'Profile already exists' });
//         }

//         const avatar = req.file ? `/uploads/avatars/${req.file.filename}` : '';

//         const profile = new Profile({
//           userId,
//           firstName,
//           lastName,
//           gender,
//           bio,
//           dateOfBirth: new Date(dateOfBirth),
//           location,
//           jobTitle,
//           avatar,
//           email,
//         });

//         await profile.save();
//         res.status(201).json({
//           message: 'Profile created successfully',
//           profile,
//         });
//       } catch (error) {
//         res.status(401).json({ message: 'Invalid or expired token' });
//       } 
//     });
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
// import formidable, {errors as formidableErrors} from 'formidable';
// import { promises as fs } from 'fs';
// import path from 'path';
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
// export default async function handler(req, res) {
//   if(req.method !== 'POST') {
//     return res.status(405).json({message: 'Method not allowed'});
//   }
//   const form = formidable({multiples: true});
//   let fields;
//   let files;

//   try {
//     [fields, files] = await form.parse[req];
//     console.log('files', files);
//     const imageFile = files.file[0];
//     console.log('imageFile', imageFile);
//     if(imageFile || imageFile.filepath) {
//       return res.status(400).json({message: 'no image file uploaded'});
//     }

//     const uploadDir = path.join(process.cwd(), 'public', 'uploads');
//     await fs.mkdir(uploadDir, {recursive:true});
//     const uniqueSuffix = Datee.now() + '-' + Math.round(Math.random() + 1e9);
//     const newFileName = `${uniqueSuffix}-${imageFile.originalFilename}`;
//     const newFilePath = `${uploadDir}/${newFileName}`;

//     await fs.rename(imageFile.filepath, newFilePath);
//     console.log('uploaded image:', newFilePath);
//     res.status(200).json({ message: 'Image uploaded successfully', imageUrl:`/uploads/${newFileName}`});

//   } catch(error) {
//     console.error('uploaded error:', error);
//     res.status(500).json({ message: 'failed to upload image'})
//   }

// }

// /pages/api/upload.js
// /pages/api/uploadImage.js

import formidable from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';
import Profile from '@/models/Profile';
import db from '@/utils/db';

export const config = {
  api: {
    bodyParser: false, // Disable body parsing by Next.js
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'avatars');

  // Create the upload directory if it doesn't exist
  await fs.mkdir(uploadDir, { recursive: true });

  const form = formidable({
    multiples: false,
    uploadDir: uploadDir,
    keepExtensions: true,
    filename: (name, ext, part) => `${Date.now()}_${part.originalFilename}`, // Generate unique filename
  });
  console.log('form:', form);

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ message: 'Error uploading image' });
    }

    const imageFile = files.avatar;
    const id = fields._id; 
    console.log('imageFile:',imageFile);
    console.log('id:',id);
    //Ensure the uploaded file is found and has a valid path
    if (!imageFile || !imageFile[0].filepath) {
      console.error('Uploaded file not found or path is undefined.');
      return res.status(400).json({ message: 'No image file uploaded or file path is invalid.' });
    }

    try {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const newFileName = `${uniqueSuffix}-${imageFile.originalFilename}`;
      const newFilePath = path.join(uploadDir, newFileName);

      // Rename (move) the file to the desired directory with the new name
      await fs.rename(imageFile[0].filepath, newFilePath);
      console.log('Uploaded image:', newFilePath);

       // Construct the image URL for storing in the database
       const imageUrl = `/uploads/avatars/${newFileName}`;

       // Connect to the database
       await db.connect();
      
       // Update the user's profile with the new avatar URL
       const existingProfile = await Profile.findById(id);

       if (!existingProfile) {
         console.error('Profile not found.');
         return res.status(404).json({ message: 'Profile not found.' });
       }
 
       // Update the profile object using Object.assign
       Object.assign(existingProfile, { avatar: imageUrl });
 
       // Save the updated profile
       await existingProfile.save();
       res.status(200).json({ message: 'Image uploaded and profile updated successfully', profile: existingProfile });
      } catch (error) {
        console.error('Upload or database error:', error);
        res.status(500).json({ message: 'Failed to upload image or update profile' });
      }
    });
  }


