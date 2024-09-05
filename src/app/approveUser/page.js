'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import '../../styles/approveUser.css';

const ApproveUser = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [userId, setUserId] = useState(null);
    
  useEffect(() => {
    const id = router.query?.userId;
    if (id) {
      setUserId(id);
    }
  }, [router.query]);

  useEffect(() => {
    if (userId) {
      fetchUser(userId);
    }
  }, [userId]);
  console.log('userId:', userId);
  const fetchUser = async (userId) => {
    try {
      // const response = await axios.get(`/api/users/${userId}`);
      const response = await axios.get(`/api/users/${userId}`);
        // headers: { Authorization: `Bearer ${token}` },
      console.log('user:', response.data);
      setUser(response.data);
    } catch (error) {
      setError('User not found');
    }
  };

  const approveUser = async () => {
    try {
      await axios.put('/api/approveUser', { userId });
      alert('User approved successfully');
      router.push('/dashboard'); // Redirect to admin dashboard after approval
    } catch (error) {
      console.error('Error approving user:', error);
      setError('Error approving user');
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="approve-container">
      <h1 className="text-2xl font-bold mb-4">Approve User</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Instructor:</strong> {user.isInstructor ? 'Yes' : 'No'}</p>
      {/* Add more fields as needed */}
      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        onClick={approveUser}
      >
        Approve User
      </button>
    </div>
  );
};

export default ApproveUser;
