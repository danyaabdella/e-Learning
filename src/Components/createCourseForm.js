// // components/CreateCourseForm.js
// 'use client'
// import React, { useState } from 'react';
// import '../styles/dash.css';

// const CreateCourseForm = ({ onCreate, closeForm }) => {
//   const [courseName, setCourseName] = useState('');
//   const [courseCode, setCourseCode] = useState('');
//   const [instructor, setInstructor] = useState('');
//   const [imageUrl,setImageUrl] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const userId = localStorage.getItem('userId');
//     const courseData = {
//       courseName,
//       courseCode,
//       instructor: userId,
//       image: imageUrl,
//       // Add other fields if needed
//     };
//     await fetch('/api/courses', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(courseData),
//     });

//     onCreate(); // Call the onCreate callback to refresh courses in the parent component
//     closeForm(); // Close the form after submission
//   };

//   return (
//     <div className="updateForm">
//     <div className="div2">
//       <h2 className="upHeading">Create New Course</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label className="HL">Course Name:</label>
//           <input
//             type="text"
//             value={courseName}
//             onChange={(e) => setCourseName(e.target.value)}
//             required
//             className="HI"
//           />
//         </div>
//         <div>
//           <label className="HL">Course Code:</label>
//           <input
//             type="text"
//             value={courseCode}
//             onChange={(e) => setCourseCode(e.target.value)}
//             required
//             className="HI"
//           />
//         </div>
//         {/* <div>
//           <label className="HL">Instructor Name:</label>
//           <input
//             type="text"
//             value={instructor}
//             onChange={(e) => setInstructor(e.target.value)}
//             required
//             className="HI"
//           />
//         </div> */}
//         <div>
//             <label className="HL">Course Image:</label>
//             <input
//               type="text"
//               value={imageUrl}
//               onChange={(e) => setImageUrl(e.target.value)} // Changed to setImageUrl
//               required
//               className="HI"
//             />
//           </div>
//         <div>
//             <label className="HL">Course Video:</label>
//             <input
//               type="text"
//               value={imageUrl}
//               onChange={(e) => setImageUrl(e.target.value)} // Changed to setImageUrl
//               required
//               className="HI"
//             />
//           </div>
//         <button className="upSave" type="submit">Create Course</button>
//         <button className="upCancel" type="button" onClick={closeForm}>Cancel</button>
//       </form>
//     </div>
//     </div>
//   );
// };

// export default CreateCourseForm;
'use client'
import React, { useState } from 'react';
import '../styles/dash.css';

const CreateCourseForm = ({ onCreate, closeForm }) => {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [coursePrice,setCoursePrice] = useState(0);
  const [instructor, setInstructor] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [videoFiles, setVideoFiles] = useState([]);  // Initialize with one empty string
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading when form is submitted

    try {
      const userId = localStorage.getItem('userId');
      const courseData = {
        courseName,
        courseCode,
        coursePrice,
        instructor: userId,
        image: imageUrl,
        videos: videoFiles,
      };

      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });

      if (response.ok) {
        onCreate(); // Refresh courses
        closeForm(); // Close the form
      } else {
        const error = await response.json();
        setErrorMessage(error.message || 'Error creating course');
      }
    } catch (error) {
      setErrorMessage('Network error, please try again later.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleVideoFileChange = (index, file) => {
    if (file && file.type.startsWith('video/')) {
      const updatedFiles = [...videoFiles];
      updatedFiles[index] = file; // Update the specific video file at the given index
      setVideoFiles(updatedFiles);
    } else {
      alert('Please select a valid video file.');
    }
  };

  const addVideoField = () => {
    setVideoFiles([...videoFiles, null]); // Add a new empty file slot
  };

  const removeVideoField = (index) => {
    const updatedFiles = videoFiles.filter((_, i) => i !== index);
    setVideoFiles(updatedFiles);
  };

  return (
    <div className="updateForm">
      <div className="div2">
        <h2 className="upHeading">Create New Course</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="HL">Course Name:</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
              className="HI"
            />
          </div>
          <div>
            <label className="HL">Course Code:</label>
            <input
              type="text"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              required
              className="HI"
            />
          </div>
          <div>
            <label className="HL">Course Image:</label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
              className="HI"
            />
          </div>

          <div>
            <label className="HL">Course Videos:</label>
            {videoFiles.map((_, index) => (
              <div key={index} className="video-input-group">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleVideoFileChange(index, e.target.files[0])}
                  required
                  className="HI"
                />
                {videoFiles.length > 1 && (
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => removeVideoField(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button type="button" className="add-button" onClick={addVideoField}>
              +
            </button>
          </div>
          <div>
            <label className="HL">Course Price:</label>
            <input
              type="Number"
              value={coursePrice}
              onChange={(e) => setCoursePrice(e.target.value)}
              required
              className="HI"
            />
          </div>
          <button className="upSave" type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Course'}
          </button>
          <button className="upCancel" type="button" onClick={closeForm}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourseForm;
