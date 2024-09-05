// components/Signup.js
'use client'
import { useState } from 'react';
import '../styles/auth.css';

const Signup = ({ setFormType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [showProfileForm, setShowProfileForm] = useState(false); // Manage profile form visibility
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    bio: '',
    avatar: '',
    dateOfBirth: '',
    location: '',
    jobTitle: 'student', // default to 'student' or fetch from the user role
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const isInstructor = role === 'instructor' ? 1 : 0; // Map role to isInstructor

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, isInstructor,role}),
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      localStorage.setItem('token', data.token); 

  // Extract userId from response and store it in state
      // setProfileData((prevData) => ({ ...prevData, id: data.id }));
      setShowProfileForm(true);
    } else {
      alert(data.message);
    }

   
  };
  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    setProfileData({ ...profileData, avatar: e.target.files[0] }); // Ensure avatar is an image file
  };

  
  const handleCreateProfile = async (e) => {
    e.preventDefault();
  
    // Submit the profile data first
    const profilePayload = {
      ...profileData,
      email,
    };
  
    try {
      const resProfile = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(profilePayload),
      });
  
      const dataProfile = await resProfile.json();
      if (!resProfile.ok) {
        alert(dataProfile.message);
        return;
      }
  
      alert('Profile created successfully! Now uploading avatar...');
  
      // Now upload the avatar image
      const formData = new FormData();
      formData.append('avatar', profileData.avatar);
      formData.append('_id', dataProfile.profile._id);
  
      try {
        const uploadRes = await fetch('/api/file', {
          method: 'POST',
          body: formData,
        });
  
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok) {
          alert(uploadData.message);
          return;
        }
  
       // Avatar upload is successful, proceed with automatic login
       alert('Avatar uploaded successfully!');
       await autoLogin(email, password); // Correctly use the email and password from the state

     } catch (error) {
       alert('Image upload failed!');
     }
 
   } catch (error) {
     alert('Profile creation failed!');
   }
 };
 const autoLogin = async (email, password) => {
  const loginResponse = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (loginResponse.ok) {
    const data = await loginResponse.json();
    localStorage.setItem('token', data.token); // Store token in localStorage
    localStorage.setItem('Email', data.Email);
    localStorage.setItem('userId', data.userId);
    window.location.href = '/'; // Redirect to dashboard or home page
  } else {
    alert('Login failed! Please try again.');
  }
};
  
  

  return (
    <div>
    {/* <div className="center"> */}
      <form onSubmit={handleSignup} className="form-container">
        <h2>Signup</h2>
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="label">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div>
        <label className="label">Role</label>
       <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="role-field"
          required
        >
          <option value="user">User</option>
          <option value="instructor">Instructor</option>
        </select>
      </div>
        <button type="submit" className="submit-button">
          Sign Up
        </button>
       
      </form>
      {showProfileForm && (
        <div className="modal">
          <form onSubmit={handleCreateProfile} className="create-form-container">
            <h2>Create Profile</h2>
            <input
              type="text"
              name="firstName"
              value={profileData.firstName}
              onChange={handleProfileChange}
              placeholder="First Name"
              className="create-input-field"
              required
            />
            <input
              type="text"
              name="lastName"
              value={profileData.lastName}
              onChange={handleProfileChange}
              placeholder="Last Name"
              className="create-input-field"
              required
            />
            <select
              name="gender"
              value={profileData.gender}
              onChange={handleProfileChange}
              className="select-field"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <textarea
              name="bio"
              value={profileData.bio}
              onChange={handleProfileChange}
              placeholder="Bio"
              className="textarea-field"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="create-input-field"
              required
            />
            <input
              type="date"
              name="dateOfBirth"
              value={profileData.dateOfBirth}
              onChange={handleProfileChange}
              className="create-input-field"
              required
            />
            <input
              type="text"
              name="location"
              value={profileData.location}
              onChange={handleProfileChange}
              placeholder="Location"
              className="create-input-field"
              required
            />
            <button type="submit" className="create-submit-button">
              Create Profile
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
 export default Signup;
