// // pages/api/documentation.js

// import formidable from 'formidable';
// import fs from 'fs';
// import path from 'path';
// import Documentation from '../../models/Documentation';
// import db from '../../utils/db';

// // Disable Next.js body parsing to let formidable handle it
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     await db.connect();

//     // Use formidable as a function
//     const form = formidable({
//       uploadDir: path.join(process.cwd(), 'public', 'uploads'),
//       keepExtensions: true,
//       multiples: true, // If you expect multiple files
//     });

//     // Ensure the upload directory exists
//     fs.mkdirSync(form.uploadDir, { recursive: true });

//     form.parse(req, async (err, fields, files) => {
//       if (err) {
//         console.error('Error parsing form data:', err);
//         return res.status(500).json({ message: 'Error parsing form data' });
//       }

//       try {
//         // Log to check if fields and files are received
//         console.log('Fields:', fields);
//         console.log('Files:', files);

//         // Ensure email is treated as a string
//         let email = fields.email;
//         if (Array.isArray(email)) {
//           email = email[0]; // If it's an array, take the first element
//         }
        
//         if (!email) {
//           return res.status(400).json({ message: 'Email is required' });
//         }

//         // Access files
//         const cvFile = files.cv;
//         const degreeFile = files.degree;

//         if (!cvFile || !degreeFile) {
//           return res.status(400).json({ message: 'Both CV and Degree files are required' });
//         }

//         // Log file details to ensure they are correctly uploaded
//         console.log('CV File:', cvFile);
//         console.log('Degree File:', degreeFile);

//         // Move files to desired location and get file paths
//         const cvFileName = `${Date.now()}_cv_${cvFile.originalFilename}`;
//         const cvFilePath = path.join(form.uploadDir, cvFileName);
//         fs.renameSync(cvFile[0].filepath, cvFilePath);

//         const degreeFileName = `${Date.now()}_degree_${degreeFile.originalFilename}`;
//         const degreeFilePath = path.join(form.uploadDir, degreeFileName);
//         fs.renameSync(degreeFile[0].filepath, degreeFilePath);
        
//         // Log to check if file paths are correct
//         console.log('CV File Path:', cvFilePath);
//         console.log('Degree File Path:', degreeFilePath);

//         // Save to the database
//         const documentation = new Documentation({
//           email,
//           cv: `/uploads/${cvFileName}`, // Save relative paths to the files
//           degree: `/uploads/${degreeFileName}`,
//         });

//         // Log before saving to database
//         console.log('Documentation Object:', documentation);

//         await documentation.save();

//         res.status(201).json({ message: 'Documentation uploaded successfully' });
//       } catch (error) {
//         console.error('Error saving documentation:', error);
//         res.status(500).json({ message: 'Error saving documentation' });
//       }
//     });
//   } else if (req.method === 'GET') {
//     const { email } = req.query;

//     try {
//       await db.connect();
//       const documentation = await Documentation.findOne({ email });

//       if (!documentation) {
//         return res.status(404).json({ message: 'No documentation found for this user.' });
//       }

//       res.status(200).json(documentation);
//     } catch (error) {
//       console.error('Error fetching documentation:', error);
//       res.status(500).json({ message: 'Error fetching documentation' });
//     }
//   }
//   else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import Documentation from '../../models/Documentation';
import db from '../../utils/db';

// Disable Next.js body parsing to let formidable handle it
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await db.connect();

    const form = formidable({
      uploadDir: path.join(process.cwd(), 'public', 'uploads'),
      keepExtensions: true,
      multiples: true, // Support for multiple files
    });

    // Ensure the upload directory exists
    fs.mkdirSync(form.uploadDir, { recursive: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(500).json({ message: 'Error parsing form data' });
      }

      try {
        console.log('Fields:', fields);
        console.log('Files:', files);

        let email = fields.email;
        if (Array.isArray(email)) {
          email = email[0]; // If it's an array, take the first element
        }

        if (!email) {
          return res.status(400).json({ message: 'Email is required' });
        }

        // Handle file access properly (both single file and multiple files cases)
        const cvFile = Array.isArray(files.cv) ? files.cv[0] : files.cv;
        const degreeFile = Array.isArray(files.degree) ? files.degree[0] : files.degree;

        if (!cvFile || !degreeFile) {
          return res.status(400).json({ message: 'Both CV and Degree files are required' });
        }

        console.log('CV File:', cvFile);
        console.log('Degree File:', degreeFile);

        // Generate file names and move files to the uploads directory
        const cvFileName = `${Date.now()}_cv_${cvFile.originalFilename}`;
        const cvFilePath = path.join(form.uploadDir, cvFileName);
        fs.renameSync(cvFile.filepath, cvFilePath);

        const degreeFileName = `${Date.now()}_degree_${degreeFile.originalFilename}`;
        const degreeFilePath = path.join(form.uploadDir, degreeFileName);
        fs.renameSync(degreeFile.filepath, degreeFilePath);

        console.log('CV File Path:', cvFilePath);
        console.log('Degree File Path:', degreeFilePath);

        // Save the relative paths to the database
        const documentation = new Documentation({
          email,
          cv: `/uploads/${cvFileName}`, // Save the correct file path
          degree: `/uploads/${degreeFileName}`,
        });

        console.log('Documentation Object:', documentation);

        await documentation.save();

        res.status(201).json({ message: 'Documentation uploaded successfully' });
      } catch (error) {
        console.error('Error saving documentation:', error);
        res.status(500).json({ message: 'Error saving documentation' });
      }
    });
  } else if (req.method === 'GET') {
    const { email } = req.query;

    try {
      await db.connect();
      const documentation = await Documentation.findOne({ email });

      if (!documentation) {
        return res.status(404).json({ message: 'No documentation found for this user.' });
      }

      res.status(200).json(documentation);
    } catch (error) {
      console.error('Error fetching documentation:', error);
      res.status(500).json({ message: 'Error fetching documentation' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
