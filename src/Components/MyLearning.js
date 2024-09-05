'use client'
import React, { useState, useEffect } from 'react';
import '../styles/dash.css';

const MyLearning = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Assuming you store the token in localStorage after login
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('User is not authenticated');
          return;
        }

        // Fetch user data using the token
        const response = await fetch('/api/auth/login', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        const userId = data._id;

        // Fetch the courses the user is enrolled in
        const coursesResponse = await fetch(`/api/users?userId=${userId}`);
        const userData = await coursesResponse.json();

        setCourses(userData.eldCourses || []);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);


  return (
    <div className="myLearning-div">
    <h2 className="course-heading">My Learning</h2>
    {courses.length > 0 ? (
      <ul className="course-unordered">
        {courses.map(course => (
          <li key={course._id} className="course-card">
            <h3 className="course-title">{course.courseName}</h3>
            <p className="course-code">{course.courseCode}</p>
            <p className="course-instructor">Instructor: {course.instructor}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p className="myLearning-text">No courses enrolled yet.</p>
    )}
  </div>
);
};

export default MyLearning;
