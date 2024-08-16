// Dashboard.js
'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateForm from './UpdateForm';
import CreateCourseForm from './createCouurseForm';
import '../styles/dash.css';

const Admin = () => {
  const [courses, setCourses] = useState([]);
  const [updatingCourse, setUpdatingCourse] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const updateCourse = (course) => {
    setUpdatingCourse(course);
    setShowUpdateForm(true);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error(error);
    }
  };



  const removeCourse = async (e, courseId) => {
    e.preventDefault();
    const res = await fetch('/api/courses', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      setCourses(courses.filter((course) => course._id !== courseId));
    }
  };
  
  const handleCreateCourse = () => {
    setShowCreateForm(true);
  };

  const closeCreateForm = () => {
    setShowCreateForm(false);
  };

  return (
    <>
     
      <div className="big-div">
      <div className="createc">
      <button className="createc-btn" onClick={handleCreateCourse}>Create new course</button>
    </div>
        {courses.map((course) => (
          <div key={course._id} className="small-div">
            <p className="text">Course name:{course.courseName}</p>
            <p className="text">Course code:{course.courseCode}</p>
            <p className="text">Instructor name:{course.instructor}</p>
            <p className="text">student List:{course.Std_Eld}</p>
            <div className='c'>
            <button className="upCancel" onClick={(e) => removeCourse(e, course._id)}>Remove</button>
            <button className="update" onClick={() => updateCourse(course)}>Update</button>
            </div>
          </div>
        ))}
      </div>
      {showUpdateForm && (
        <UpdateForm
          updatingCourse={updatingCourse}
          setShowUpdateForm={setShowUpdateForm}
          setUpdatingCourse={setUpdatingCourse}
        />
      )}
      {showCreateForm && (
        <CreateCourseForm
          onCreate={fetchCourses} // Pass the fetchCourses function to refresh the course list
          closeForm={closeCreateForm} // Pass the closeCreateForm function to close the form
        />
      )}
    </>
  );
};

export default Admin;