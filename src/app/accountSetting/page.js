
'use client';

import { useState, useEffect } from 'react';
import ViewProfile from '../../Components/Profile/ViewProfile';
import Documentation from '../../Components/Profile/Documentation'; // You'll create this component
import UpdateProfile from '../../Components/Profile/UpdateProfile'; // You'll create this component
import '../../styles/profile.css';
import axios from 'axios';

const AccountSettings = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [role, setRole] = useState('');

  const closeModal = () => setActiveModal(null);

  const handleClickOutside = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  };
  useEffect(()=>{
    fetchUserRole();
  },[]);

  const fetchUserRole = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
      
      const response = await axios.get('/api/auth/login', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      
      const userRole = response.data.role;
      setRole(userRole);
      console.log('Role:', response.data.role);
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };
  return (
    <div className="account-settings-container">
      <h1 className="heading">Account Settings</h1>
      <div className="options">
      {role === 'admin' && (
          <>
            <button onClick={() => setActiveModal('createProfile')} className="option-button-blue">Create Profile</button>
            <button onClick={() => setActiveModal('deleteProfile')} className="option-button-red">Delete Profile</button>
          </>
        )}
        {(role === 'admin' || role === 'instructor' || role === 'user') && (
          <>
            <button onClick={() => setActiveModal('updateProfile')} className="option-button-yellow">Update Profile</button>
            <button onClick={() => setActiveModal('profile')} className="option-button-green">View Profile</button>
          </>
        )}
        {role === 'instructor' && (
          <button onClick={() => setActiveModal('documentation')} className="option-button-blue">Documentation</button>
        )}
      </div>
    

      {activeModal && (
        <div className="modal-overlay" onClick={handleClickOutside}>
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>X</button>
            {activeModal === 'profile' && <ViewProfile />}
            {activeModal === 'documentation' && <Documentation />}
            {activeModal === 'updateProfile' && <UpdateProfile />}
            {activeModal === 'createProfile' && <CreateProfile />}
            {activeModal === 'deleteProfile' && <DeleteProfile />}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;
