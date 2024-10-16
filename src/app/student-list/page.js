'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import SideBar from '@/Components/SideBar';
import UserDiagram from '@/Components/UserDiagram';
import '../../styles/table.css'; // Import your existing styles

export default function ListPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUserId, setEditingUserId] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get('/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching users. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const changeRole = async (userId) => {
    try {
      // Send the selected role to the backend to update the user's role
      await axios.put(`/api/users`, { id: userId, role: selectedRole });
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: selectedRole } : user
        )
      );
      setEditingUserId(null); // Reset after updating
    } catch (error) {
      console.error('Error updating role:', error);
      setError('Error updating role. Please try again later.');
    }
  };
  const changeStatus = async (userId) => {
    try {
      await axios.put('/api/approveUser', { userId });
      alert('User approved successfully');
       
    } catch (error) {
      console.error('Error approving user:', error);
      setError('Error approving user');
    }
  };
  const viewDoc = (email) => {
    // Navigate to the documentation page with the email in the query string
    router.push(`/documentations?email=${email}`);
  };

  const approvedInstructors = users.filter(
    (user) => user.role === 'instructor' && user.isapproved === true
  );
  const newInstructors = users.filter(
    (user) => user.role === 'instructor' && user.isapproved === false
  );
  const regularUsers = users.filter((user) => user.role === 'user');

  return (
    <>
      <SideBar />
      <div className="header">
        <h1 className="heading">Users</h1>

        {isLoading ? (
          <p className="loading-text">Loading users...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : (
          <>
            <UserDiagram />
            {/* Container for both tables */}
            <div className="tables-container">
              {/* First Table for Users and Approved Instructors */}
              <div className="table-section">
                <h2>Users</h2>
                <table className="T">
                  <thead>
                    <tr>
                      <th className="table-header">Users Email</th>
                      <th className="table-header">Role</th>
                      <th className="table-header">Change Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...regularUsers, ...approvedInstructors].map((user, index) => (
                      <tr key={index}>
                        <td className="table-cell">{user.email}</td>
                        <td className="table-cell">{user.role}</td>
                        <td className="table-cell">
                          {editingUserId === user._id ? (
                            <div>
                              <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                              >
                                <option value="">Select Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                                <option value="instructor">Instructor</option>
                              </select>
                              <button className="roleBtn" onClick={() => changeRole(user._id)}>
                                Save
                              </button>
                            </div>
                          ) : (
                            <button className="roleBtn" onClick={() => setEditingUserId(user._id)}>
                              Change
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Second Table for New Instructors */}
              <div className="table-section">
                <h2 className='header2'>New Instructors</h2>
                <table className="T">
                  <thead>
                    <tr>
                      <th className="table-header">Instructor Email</th>
                      <th className="table-header">Role</th>
                      <th colspan="2" className="table-header">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newInstructors.map((user, index) => (
                      <tr key={index}>
                        <td className="table-cell">{user.email}</td>
                        <td className="table-cell">{user.role}</td>
                        <td className="table-cell">
                          <button className="roleBtn" onClick={() => viewDoc(user.email)}>Doc</button>
                        </td>
                        <td>
                          <button className="roleBtn" onClick={() => changeStatus(user._id)}>
                            Approve
                          </button>
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
