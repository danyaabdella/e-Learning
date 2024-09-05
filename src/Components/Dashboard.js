
'use client'
import  { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/dash.css';


const Dashboard = () => {
  const [coursesCount, setCoursesCount] = useState(0);
  const [studentsCount, setStudentsCount] = useState(0);
  const [instructorsCount, setInstructorsCount] = useState(0);
  

  useEffect(() => {
    // Fetch data for courses, students, and instructors counts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [coursesResponse, usersResponse] = await Promise.all([
        axios.get('/api/courses'),
        axios.get('/api/users')
      ]);

      setCoursesCount(coursesResponse.data.length);
      setStudentsCount(usersResponse.data.filter(user => user.role === 'user').length);
      setInstructorsCount(usersResponse.data.filter(user => user.role === 'admin').length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

 

  return (
    <>
    
    <div className= "dashboard-container">
      <div className= "stat-box" >
        <h3 className= "dashH3">Courses</h3>
        <p  className= "dashParagraph">{coursesCount}</p>
      </div>
      <div className="stat-box" >
        <h3 className= "dashH3">Students</h3>
        <p  className= "dashParagraph">{studentsCount}</p>
      </div>
      <div className="stat-box" >
        <h3 className= "dashH3">Instructors</h3>
        <p  className= "dashParagraph">{instructorsCount}</p>
      </div>
     
    </div>
    
    </>
  );
};

export default Dashboard;
