'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '@/Components/SideBar';
import RightSideBar from '@/Components/RightSideBar';
import UserDiagram from '@/Components/UserDiagram';
import '../../styles/table.css';

export default function ListPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get('/api/users');
        setUsers(response.data);
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
        <h1 className="heading">Users</h1>
        {isLoading ? (
          <p className="loading-text">Loading users...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <>
            <UserDiagram />
            <div className="header2">
              <table className="T">
                <thead>
                  <tr>
                    <th className="table-header">Student email</th>
                    <th className="table-header">Courses enrolled</th>
                    
                   
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td className="table-cell">{user.email}</td>
                      <td className="table-cell">{user.eldcourse}</td>
                      
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
