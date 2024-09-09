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
  const [isApproved, setIsApproved] = useState(null);
  
  const updateCourse = (course) => {
    setUpdatingCourse(course);
    setShowUpdateForm(true);
  };

  useEffect(() => {
    checkApprovalStatus();
  }, []);

  const checkApprovalStatus = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error('No userId found');

      const response = await axios.get('/api/users', {
        // headers: { Authorization: `Bearer ${token}` },
        params: { userId }, 
      });

      setIsApproved(response.data.isapproved);

      if (response.data.isapproved) {
        fetchCourses(); // Fetch courses only if the user is approved
      }
    } catch (error) {
      console.error('Error checking approval status:', error);
    }
  };

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

  if (isApproved === null) {
    return <div>Loading...</div>; // Show a loading message while checking approval status
  }
  if (!isApproved) {
    return (
      <div className="not-approved">
        <h1 className="not-approved h1">You are not approved yet</h1>
        <p className="not-approved p">Please wait for admin approval to create courses.</p>
      </div>
    );
  }

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