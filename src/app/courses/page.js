
'use client'
import  { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/dash.css';


const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  
  

  useEffect(() => {
    // Fetch data for courses, students, and instructors counts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [coursesResponse] = await Promise.all([
        axios.get('/api/courses'),
        
      ]);

      setCourses(coursesResponse.data);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

 

  return (
    <>
    
    <div className= "dashboard-container">
     
      {courses.map((course, index) => (
         <div className= "stat-box" >
              <div key={index} className="course-item">
                <p className="dashParagraph"> {course.courseName}</p>
                <p className="dashH3">Course code{course.courseCode}</p>
                <p className="dashH3">Instructor:{course.instructor}</p>
              </div>
              </div>
            ))}
        
      
     
    </div>
    
    </>
  );
};

export default Dashboard;
{/* <h3 className= "dashH3">Courses</h3>
        <p  className= "dashParagraph">{coursesCount}</p>
      </div>
      <div className="stat-box" >
        <h3 className= "dashH3">Students</h3>
        <p  className= "dashParagraph">{studentsCount}</p>
      </div>
      <div className="stat-box" >
        <h3 className= "dashH3">Instructors</h3>
        <p  className= "dashParagraph">{instructorsCount}</p> */}