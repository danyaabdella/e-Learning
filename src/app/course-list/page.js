'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '@/Components/SideBar';
import UserDiagram from '@/Components/UserDiagram';
import '../../styles/table.css';

export default function ListPage() {
  const [approvedCourses, setApprovedCourses] = useState([]);
  const [newCourses, setNewCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get('/api/courses');
        const courses = response.data;
        setApprovedCourses(courses.filter(course => course.isapproved));
        setNewCourses(courses.filter(course => !course.isapproved));
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching courses. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const approveCourse = async (courseId) => {
    try {
      await axios.put(`/api/courses`, { id: courseId });  // Ensure the ID is sent in the body
      setApprovedCourses(prev => [...prev, ...newCourses.filter(course => course._id === courseId)]);
      setNewCourses(prev => prev.filter(course => course._id !== courseId));
    } catch (error) {
      console.error('Error approving course:', error);
      setError('Error approving course. Please try again later.');
    }
  };
  const addTohome = async (courseId, isHome) => {
    try {
      // Toggle the ishome attribute
      const newIsHome = !isHome;
      await axios.put(`/api/courseIshome`, { id:courseId, ishome: newIsHome });
     
    } catch (error) {
      console.error('Error updating course home status:', error);
      setError('Error updating course. Please try again later.');
    }
  }

  return (
    <>
      <SideBar />
      <div className="header">
        <h1 className="heading">Courses</h1>
        {isLoading ? (
          <p className="loading-text">Loading courses...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <>
            <UserDiagram />

            {/* Container for both tables */}
            <div className="tables-container">
              <div className="table-section">
                <h2>Approved Courses</h2>
                <table className="T">
                  <thead>
                    <tr>
                      <th className="table-header">Course Name</th>
                      <th className="table-header">Course Code</th>
                      <th className="table-header">Instructor</th>
                      <th className= "table-header">Home page</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvedCourses.map((course, index) => (
                      <tr key={index}>
                        <td className="table-cell">{course.courseName}</td>
                        <td className="table-cell">{course.courseCode}</td>
                        <td className="table-cell">{course.instructor}</td>
                        <td className="table-cell">
                        <button 
                            onClick={() => addTohome(course._id, course.ishome)}
                          >
                            {course.ishome ? 'No' : 'Yes'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="table-section">
                <h2>New Arrivals</h2>
                <table className="T">
                  <thead>
                    <tr>
                      <th className="table-header">Course Name</th>
                      <th className="table-header">Course Code</th>
                      <th className="table-header">Instructor</th>
                      <th className="table-header">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newCourses.map((course, index) => (
                      <tr key={index}>
                        <td className="table-cell">{course.courseName}</td>
                        <td className="table-cell">{course.courseCode}</td>
                        <td className="table-cell">{course.instructor}</td>
                        <td className="table-cell">
                          <button onClick={() => approveCourse(course._id)}>Approve</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
     
    </>
  );
}
