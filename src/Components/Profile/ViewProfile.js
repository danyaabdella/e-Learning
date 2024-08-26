'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const ViewProfile = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.get('/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-heading">Account Profile</h1>
      <div className="profile-card">
        <div className="profile-value">
          <label className="profile-label">Username</label>
          <p>{profile.username}</p>
        </div>
        <div className="profile-value">
          <label className="profile-label">Email</label>
          <p>{profile.email}</p>
        </div>
        <div className="profile-value">
          <label className="profile-label">Gender</label>
          <p>{profile.gender}</p>
        </div>
        <div className="profile-value">
          <label className="profile-label">Date of Birth</label>
          <p>{profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : 'N/A'}</p>
        </div>
        <div className="profile-value">
          <label className="profile-label">Location</label>
          <p>{profile.location || 'N/A'}</p>
        </div>
        <div className="profile-value">
          <label className="profile-label">Bio</label>
          <p>{profile.bio || 'N/A'}</p>
        </div>
        <div className="profile-value">
          <label className="profile-label">Avatar</label>
          {profile.avatar ? <img src={profile.avatar} alt="Avatar" className="profile-avatar" /> : <p>N/A</p>}
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
