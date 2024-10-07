import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/profile.css';

const UpdateProfile = () => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    location: '',
    bio: '',
    avatar: '', // This will handle file uploads
  });

  const [error, setError] = useState(null); // For tracking errors

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Failed to load profile data');
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfileData({ ...profileData, avatar: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before submitting
    try {
      const token = localStorage.getItem('token');
      const { avatar, ...textData } = profileData;

      console.log('Form data before submission:', textData);
      // If updating the avatar, use FormData
      let response;
      if (avatar) {
        const formData = new FormData();
        // Object.entries(profileData).forEach(([key, value]) => {
        //   formData.append(key, value);
        // });
        formData.append('avatar', avatar); // Ensure this line adds the avatar file
        Object.keys(textData).forEach((key) => {
          formData.append(key, textData[key]);
        });

        response = await axios.put('/api/profile', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // If no avatar, just send JSON data
        response = await axios.put('/api/profile', textData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
      }

      
      if (response.status === 200) {
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile');
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-heading">Update Profile</h1>
      {error && <div className="error-message">{error}</div>}
      <form className="profile-card" onSubmit={handleSubmit}>
        <div className="profile-value">
          <label className="profile-label">First Name</label>
          <input
            type="text"
            name="firstName"
            value={profileData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="profile-value">
          <label className="profile-label">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={profileData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="profile-value">
          <label className="profile-label">Email</label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
          />
        </div>
        <div className="profile-value">
          <label className="profile-label">Gender</label>
          <select
            name="gender"
            value={profileData.gender}
            onChange={handleChange}
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="profile-value">
          <label className="profile-label">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={profileData.dateOfBirth}
            onChange={handleChange}
          />
        </div>
        <div className="profile-value">
          <label className="profile-label">Location</label>
          <input
            type="text"
            name="location"
            value={profileData.location}
            onChange={handleChange}
          />
        </div>
        <div className="profile-value">
          <label className="profile-label">Bio</label>
          <input
            type="text"
            name="bio"
            value={profileData.bio}
            onChange={handleChange}
          />
        </div>
        <div className="profile-value">
          <label className="profile-label">Avatar</label>
          <input type="file" name="avatar" onChange={handleFileChange} />
        </div>
        <div>
          <button type="submit" className="update-button">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
