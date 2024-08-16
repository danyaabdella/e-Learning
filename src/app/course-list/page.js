'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '@/Components/SideBar';
import RightSideBar from '@/Components/RightSideBar';
import UserDiagram from '@/Components/UserDiagram';
import '../../styles/table.css';

export default function ListPage() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get('/api/courses');
        setCourses(response.data);
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
    <>
      <SideBar/>
      <div className="header">
        <h1 className="heading">Courses</h1>
        {isLoading ? (
          <p className="loading-text">Loading courses...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <>
            <UserDiagram />
            <div className="header2">
              <table className="T">
                <thead>
                  <tr>
                    <th className="table-header">Course Name</th>
                    <th className="table-header">Course Code</th>
                    <th className="table-header">Instructor</th>
                   
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, index) => (
                    <tr key={index}>
                      <td className="table-cell">{course.courseName}</td>
                      <td className="table-cell">{course.courseCode}</td>
                      <td className="table-cell">{course.instructor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <RightSideBar/>
    </>
  );
}
