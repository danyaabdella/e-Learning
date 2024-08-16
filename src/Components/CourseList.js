
'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Replace '/api/courses' with your actual API endpoint
        const response = await axios.get('/api/courses');

        // Check for successful response status
        if (response.status === 200) {
          // Assuming your API endpoint returns JSON data
          const data = await response.json();
          setCourses(data);
        } else {
          setError('Failed to fetch courses. Please try again later.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching courses. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      {isLoading ? (
        <p>Loading courses...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <li key={index} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
              <h2 className="text-lg font-semibold">{course.courseName}</h2>
              {/* Render other course details */}
              <p>Description: {course.description}</p> {/* Example detail */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseList;