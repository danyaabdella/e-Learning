// components/Signup.js
'use client'
import { useState } from 'react';
import '../styles/auth.css';

const Signup = ({ setFormType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');

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
      window.location.href = '/dashboard';
    } else {
      alert(data.message);
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
   {/* </div> */}
   </div>
  );
};

 export default Signup;
