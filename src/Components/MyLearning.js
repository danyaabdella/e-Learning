'use client'
import React, { useState, useEffect } from 'react';
import '../styles/mylearning.css'; // Import your custom Tailwind CSS file

const MyLearning = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('User is not authenticated');
          return;
        }

        // const userResponse = await fetch('/api/auth/login', {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });

        // const userData = await userResponse.json();
        // const userId = userData._id;
        const userId = localStorage.getItem('userId');

        const response = await fetch(`/api/enroll?userId=${userId}`, {
          method:'GET',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }

        const data = await response.json();
        setCourses(data.data || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Error fetching courses. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, []);

  if (isLoading) {
    return <p className="loading-text">Loading courses...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  return (
    <div className="myLearning-container">
      <h2 className="course-heading">My Learning</h2>
      {courses.length > 0 ? (
        <ul className="course-list">
          {courses.map(enrollment => (
            <li key={enrollment._id} className="course-card">
              <div className="course-card-content">
                <h3 className="course-title">{enrollment.courseId.courseName}</h3>
                <p className="course-code">Code: {enrollment.courseId.courseCode}</p>
                <p className="course-instructor">Instructor: {enrollment.courseId.instructor}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-courses-text">You have not enrolled in any courses yet.</p>
      )}
    </div>
  );
};

export default MyLearning;
