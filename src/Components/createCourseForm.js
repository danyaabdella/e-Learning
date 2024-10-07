
'use client'
import React, { useState, useEffect } from 'react';
import '../styles/dash.css';
import axios from 'axios';

const CreateCourseForm = ({ onCreate, closeForm }) => {
  const [courseCategory, setCourseCategory] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [coursePrice,setCoursePrice] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [instructor, setInstructor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(()=>{
    const fetchInstructor = async () => {
      try {
        const response = await axios.get(`/api/profile?userId=${userId}`);
        if (response.data) {
          setInstructor(response.data.fullName);
        }
      } catch (error) {
        console.error("Failed to fetch instructor", error);
        setErrorMessage("Failed to load instructor data");
      }
    };
  
    if (userId) {
      fetchInstructor();
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading when form is submitted

    try {
      const courseData = {
        userId: userId,
        courseCategory,
        courseName,
        courseCode,
        coursePrice,
        instructor,
        image: imageUrl,
      };
      console.log(courseData);
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

  

  return (
    <div className="updateForm">
      <div className="div2">
        <h2 className="upHeading">Create New Course</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="HL">Course Category:</label>
            <input
              type="text"
              value={courseCategory}
              onChange={(e) => setCourseCategory(e.target.value)}
              required
              className="HI"
            />
          </div>
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
