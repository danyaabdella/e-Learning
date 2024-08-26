// Dashboard.js
'use client'
import  { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateForm from './UpdateForm';
import CreateCourseForm from './createCourseForm';
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
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const userId = localStorage.getItem('userId'); // Get the logged-in user's ID
      if (!userId) throw new Error('No user ID found');

      // Fetch courses created by this user
      const response = await axios.get('/api/courseById', {
        headers: { Authorization: `Bearer ${token}` },
        params: { userId }, 
      });

      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
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
    </div>
    <div className="big-div">
        {courses.map((course) => (
          <div key={course._id} className="small-div"
         >
          <div
           style={{ 
            backgroundImage: course.image ? `url(${course.image})` : 'none',
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '150px', // Ensure height is sufficient to show the image
        }}>
        </div>
          {/* {console.log(course.image)} */}
            <p className="text">Course name:{course.courseName}</p>
            <p className="text">Course code:{course.courseCode}</p>
            
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