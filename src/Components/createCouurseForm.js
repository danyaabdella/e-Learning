// components/CreateCourseForm.js
'use client'
import React, { useState } from 'react';
import '../styles/dash.css';

const CreateCourseForm = ({ onCreate, closeForm }) => {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [instructor, setInstructor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/courses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ courseName, courseCode, instructor }),
    });

    onCreate(); // Call the onCreate callback to refresh courses in the parent component
    closeForm(); // Close the form after submission
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
          <label className="HL">Instructor Name:</label>
          <input
            type="text"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            required
            className="HI"
          />
        </div>
        <button className="upSave" type="submit">Create Course</button>
        <button className="upCancel" type="button" onClick={closeForm}>Cancel</button>
      </form>
    </div>
    </div>
  );
};

export default CreateCourseForm;
